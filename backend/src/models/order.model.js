import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "product" },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        price: { type: Number }
      }
    ],

    amount: { type: Number, required: true },
    subtotal: { type: Number },
    discount: { type: Number, default: 0 },
    couponCode: { type: String, default: "" },
    shippingFee: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },

    address: { type: Object, required: true },

    status: { type: String, default: "Order Placed" },

    paymentMethod: { type: String, required: true, default: "COD" },

    isPaid: { type: Boolean, required: true, default: false },

    paidAt: { type: Date },

    deliveredAt: { type: Date },

    stripeSessionId: { type: String },

    shippingInfo: {
      carrier: { type: String, default: "Delhivery Express" },
      awb: { type: String, default: "" },
      trackingUrl: { type: String, default: "" },
      estimatedDelivery: { type: String, default: "" },
      timeline: [
        {
          status: { type: String, required: true },
          title: { type: String, required: true },
          location: { type: String, default: "" },
          timestamp: { type: Date, default: Date.now },
          note: { type: String, default: "" }
        }
      ]
    }
  },
  { timestamps: true }
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;