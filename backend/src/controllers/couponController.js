import couponModel from "../models/coupon.model.js";

// Default starter coupons for fashion eCommerce
const DEFAULT_COUPONS = [
  {
    code: "WELCOME500",
    description: "Flat ₹500 OFF on your first purchase above ₹1,999",
    discountType: "flat",
    discountValue: 500,
    minOrderAmount: 1999,
    maxDiscountAmount: 500,
    isActive: true
  },
  {
    code: "FASHION15",
    description: "15% Instant Discount on modern fashion apparel",
    discountType: "percent",
    discountValue: 15,
    minOrderAmount: 999,
    maxDiscountAmount: 750,
    isActive: true
  },
  {
    code: "SNITCH20",
    description: "20% OFF on street style & trending collections",
    discountType: "percent",
    discountValue: 20,
    minOrderAmount: 2499,
    maxDiscountAmount: 1000,
    isActive: true
  }
];

// ================= VALIDATE COUPON (SERVER-AUTHORITATIVE) =================
export const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal = 0 } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: "Coupon code is required" });
    }

    const normalizedCode = code.trim().toUpperCase();

    // Check DB
    let coupon = await couponModel.findOne({ code: normalizedCode, isActive: true });

    // Auto-seed default coupons if none found in DB yet
    if (!coupon) {
      const defaultMatch = DEFAULT_COUPONS.find((c) => c.code === normalizedCode);
      if (defaultMatch) {
        coupon = await couponModel.create(defaultMatch);
      }
    }

    if (!coupon) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: "Invalid coupon code. Try WELCOME500 or FASHION15."
      });
    }

    // Expiry check
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, valid: false, message: "This coupon code has expired" });
    }

    // Min Order Amount
    if (subtotal < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Minimum order value of ₹${coupon.minOrderAmount} required for coupon ${coupon.code}`
      });
    }

    // Usage Limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, valid: false, message: "Coupon usage limit reached" });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === "percent") {
      discount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount > 0 && discount > coupon.maxDiscountAmount) {
        discount = coupon.maxDiscountAmount;
      }
    } else {
      discount = Math.min(subtotal, coupon.discountValue);
    }

    discount = Math.round(discount);

    return res.json({
      success: true,
      valid: true,
      code: coupon.code,
      discount,
      description: coupon.description,
      message: `Coupon ${coupon.code} applied! You saved ₹${discount}`
    });
  } catch (error) {
    console.error("Validate Coupon Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= LIST ACTIVE COUPONS =================
export const listCoupons = async (req, res) => {
  try {
    let coupons = await couponModel.find({ isActive: true });

    if (!coupons || coupons.length === 0) {
      coupons = await couponModel.insertMany(DEFAULT_COUPONS);
    }

    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ADD COUPON (ADMIN) =================
export const addCoupon = async (req, res) => {
  try {
    const { code, description, discountType, discountValue, minOrderAmount, maxDiscountAmount, expiryDate } = req.body;

    if (!code || !discountValue) {
      return res.status(400).json({ success: false, message: "Coupon code and discount value are required" });
    }

    const newCoupon = await couponModel.create({
      code: code.trim().toUpperCase(),
      description,
      discountType: discountType || "percent",
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscountAmount: Number(maxDiscountAmount) || 0,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      isActive: true
    });

    res.json({ success: true, message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE COUPON (ADMIN) =================
export const deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.body;
    await couponModel.findByIdAndDelete(couponId);
    res.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
