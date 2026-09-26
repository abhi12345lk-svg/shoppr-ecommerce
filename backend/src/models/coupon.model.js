import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, uppercase: true, unique: true, trim: true },
    description: { type: String, default: "" },
    discountType: { type: String, enum: ["percent", "flat"], default: "percent" },
    discountValue: { type: Number, required: true },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number, default: 0 }, // 0 means no cap
    expiryDate: { type: Date },
    usageLimit: { type: Number, default: 1000 },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const couponModel = mongoose.models.coupon || mongoose.model("coupon", couponSchema);

export default couponModel;
