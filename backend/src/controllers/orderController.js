import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import couponModel from "../models/coupon.model.js";
import ShippingService from "../services/shippingService.js";
import Stripe from "stripe";

/* ================= STRIPE ================= */
let stripeInstance = null;
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey === "sk_test_your_stripe_secret_key") {
    return null;
  }
  if (!stripeInstance) {
    try {
      stripeInstance = new Stripe(secretKey);
    } catch (err) {
      console.error("Stripe initialization error:", err.message);
      return null;
    }
  }
  return stripeInstance;
};

/* ================= PRICING CONSTANTS ================= */
const DEFAULT_DELIVERY_CHARGES = 99; // Standard express delivery in INR
const FREE_SHIPPING_THRESHOLD = 999; // Free shipping over ₹999
const TAX_PERCENTAGE = 0.05; // 5% GST for fashion apparel

/**
 * Server-authoritative calculation of order amounts
 */
const calculateOrderPricing = async (items, couponCode = "") => {
  let subtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const prodId = item.product || item._id || item.productId;
    const product = await productModel.findById(prodId);
    if (product) {
      const pricePerUnit = Number(product.offerPrice || product.price);
      const qty = Number(item.quantity) || 1;
      subtotal += pricePerUnit * qty;
      verifiedItems.push({
        product: product._id,
        quantity: qty,
        size: item.size || "M",
        price: pricePerUnit
      });
    }
  }

  // Calculate coupon discount server-side
  let discount = 0;
  let appliedCouponCode = "";

  if (couponCode && couponCode.trim()) {
    const code = couponCode.trim().toUpperCase();
    const coupon = await couponModel.findOne({ code, isActive: true });

    if (coupon && (!coupon.expiryDate || new Date(coupon.expiryDate) >= new Date())) {
      if (subtotal >= coupon.minOrderAmount) {
        if (coupon.discountType === "percent") {
          discount = (subtotal * coupon.discountValue) / 100;
          if (coupon.maxDiscountAmount > 0 && discount > coupon.maxDiscountAmount) {
            discount = coupon.maxDiscountAmount;
          }
        } else {
          discount = Math.min(subtotal, coupon.discountValue);
        }
        discount = Math.round(discount);
        appliedCouponCode = coupon.code;

        // Increment usage
        coupon.usageCount = (coupon.usageCount || 0) + 1;
        await coupon.save();
      }
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shippingFee = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || discountedSubtotal === 0 ? 0 : DEFAULT_DELIVERY_CHARGES;
  const taxAmount = Math.round(discountedSubtotal * TAX_PERCENTAGE);
  const totalAmount = Math.round(discountedSubtotal + shippingFee + taxAmount);

  return {
    verifiedItems,
    subtotal,
    discount,
    appliedCouponCode,
    shippingFee,
    taxAmount,
    totalAmount
  };
};

/* ================= PLACE ORDER COD ================= */
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address, couponCode } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Please add products to cart first" });
    }

    if (!address || !address.street || !address.city || !address.phone) {
      return res.status(400).json({ success: false, message: "Complete delivery address and phone number required" });
    }

    /* ================= SERVER-AUTHORITATIVE PRICING ================= */
    const pricing = await calculateOrderPricing(items, couponCode);

    if (pricing.verifiedItems.length === 0) {
      return res.status(400).json({ success: false, message: "Selected products are not available" });
    }

    /* ================= INITIALIZE LOGISTICS SHIPMENT ================= */
    const shippingInfo = ShippingService.createShipment({ address });

    /* ================= CREATE ORDER ================= */
    const newOrder = await orderModel.create({
      userId,
      items: pricing.verifiedItems,
      amount: pricing.totalAmount,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      couponCode: pricing.appliedCouponCode,
      shippingFee: pricing.shippingFee,
      taxAmount: pricing.taxAmount,
      address,
      paymentMethod: "COD",
      isPaid: false,
      status: "Order Placed",
      shippingInfo
    });

    /* ================= UPDATE PRODUCT STOCK COUNTS ================= */
    for (const item of pricing.verifiedItems) {
      await productModel.findByIdAndUpdate(item.product, {
        $inc: { stockCount: -item.quantity }
      });
    }

    /* ================= CLEAR CART ================= */
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({
      success: true,
      message: "Order Placed Successfully! Cash on delivery selected.",
      orderId: newOrder._id
    });
  } catch (error) {
    console.error("Order COD Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= PLACE ORDER STRIPE ================= */
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address, couponCode } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Please add products to cart first" });
    }

    if (!address) {
      return res.status(400).json({ success: false, message: "Delivery address is required" });
    }

    const stripe = getStripeInstance();
    if (!stripe) {
      return res.status(400).json({
        success: false,
        message: "Stripe payment gateway is not configured. Please set a valid STRIPE_SECRET_KEY in backend/.env"
      });
    }

    const frontendOrigin = req.headers.origin || process.env.FRONTEND_URL || "http://localhost:5173";

    /* ================= SERVER PRICING ================= */
    const pricing = await calculateOrderPricing(items, couponCode);

    const shippingInfo = ShippingService.createShipment({ address });

    const newOrder = await orderModel.create({
      userId,
      items: pricing.verifiedItems,
      amount: pricing.totalAmount,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      couponCode: pricing.appliedCouponCode,
      shippingFee: pricing.shippingFee,
      taxAmount: pricing.taxAmount,
      address,
      paymentMethod: "stripe",
      isPaid: false,
      status: "Pending Payment",
      shippingInfo
    });

    /* ================= STRIPE LINE ITEMS ================= */
    let line_items = [];

    for (const item of pricing.verifiedItems) {
      const product = await productModel.findById(item.product);
      if (product) {
        const productImages =
          product.image && product.image.length > 0 && product.image[0].startsWith("http")
            ? [product.image[0]]
            : [];

        line_items.push({
          price_data: {
            currency: "inr",
            product_data: {
              name: `${product.name} (Size: ${item.size})`,
              images: productImages
            },
            unit_amount: Math.round(item.price * 100)
          },
          quantity: item.quantity
        });
      }
    }

    // Add shipping as line item if present
    if (pricing.shippingFee > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Express Delivery & Packaging"
          },
          unit_amount: Math.round(pricing.shippingFee * 100)
        },
        quantity: 1
      });
    }

    // Add tax as line item
    if (pricing.taxAmount > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "GST / Taxes (5%)"
          },
          unit_amount: Math.round(pricing.taxAmount * 100)
        },
        quantity: 1
      });
    }

    // Create Stripe Session (with fallback currency handling if INR card testing)
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${frontendOrigin}/my-orders?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontendOrigin}/cart`
      });
    } catch (stripeErr) {
      // If Stripe account doesn't have INR enabled, fallback to USD
      console.warn("Stripe INR failed, falling back to USD line items:", stripeErr.message);
      const usdLineItems = line_items.map((item) => ({
        ...item,
        price_data: {
          ...item.price_data,
          currency: "usd",
          unit_amount: Math.max(100, Math.round(item.price_data.unit_amount / 85)) // approximate exchange
        }
      }));

      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: usdLineItems,
        mode: "payment",
        success_url: `${frontendOrigin}/my-orders?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontendOrigin}/cart`
      });
    }

    newOrder.stripeSessionId = session.id;
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Order Stripe Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= USER ORDERS ================= */
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const { success, orderId } = req.query;

    if (success === "true" && orderId) {
      const orderToUpdate = await orderModel.findById(orderId);
      if (orderToUpdate && !orderToUpdate.isPaid) {
        orderToUpdate.isPaid = true;
        orderToUpdate.status = "Order Placed";
        orderToUpdate.paidAt = new Date();

        if (orderToUpdate.shippingInfo?.timeline) {
          orderToUpdate.shippingInfo.timeline = ShippingService.appendMilestone(
            orderToUpdate.shippingInfo.timeline,
            "Order Placed",
            "Central Gateway",
            "Payment verified via Stripe. Order queued for fulfillment."
          );
        }
        await orderToUpdate.save();
      }
    }

    const orders = await orderModel
      .find({ userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= ALL ORDERS (ADMIN) ================= */
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE STATUS ================= */
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status, location, note } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;

    if (!order.shippingInfo) {
      order.shippingInfo = ShippingService.createShipment(order);
    }

    // Append shipping milestone
    order.shippingInfo.timeline = ShippingService.appendMilestone(
      order.shippingInfo.timeline,
      status,
      location || order.address?.city || "Regional Logistic Hub",
      note || ""
    );

    if (status === "Delivered") {
      order.deliveredAt = new Date();
      order.isPaid = true;
    }

    await order.save();

    res.json({ success: true, message: `Order status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= CANCEL ORDER ================= */
export const cancelOrder = async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order Not Found" });
    }

    if (order.status === "Shipped" || order.status === "Delivered") {
      return res.status(400).json({ success: false, message: "Order has already been dispatched and cannot be cancelled." });
    }

    order.status = "Cancelled";
    if (order.shippingInfo?.timeline) {
      order.shippingInfo.timeline = ShippingService.appendMilestone(
        order.shippingInfo.timeline,
        "Cancelled",
        "System",
        reason || "Order cancelled by customer."
      );
    }

    // Restore stock
    for (const item of order.items) {
      await productModel.findByIdAndUpdate(item.product, {
        $inc: { stockCount: item.quantity }
      });
    }

    await order.save();

    res.json({ success: true, message: "Order Cancelled Successfully. Inventory restored." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};