import orderModel from "../models/order.model.js";
import ShippingService from "../services/shippingService.js";

// ================= CHECK PINCODE SERVICEABILITY =================
export const checkPincode = async (req, res) => {
  try {
    const pincode = req.query.pincode || req.body?.pincode;

    if (!pincode) {
      return res.status(400).json({ success: false, message: "Pincode is required" });
    }

    const result = ShippingService.checkPincodeServiceability(pincode);
    return res.json({ success: true, ...result });
  } catch (error) {
    console.error("Check Pincode Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= TRACK ORDER =================
export const getOrderTracking = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // If shippingInfo doesn't exist yet, initialize it
    if (!order.shippingInfo || !order.shippingInfo.timeline || order.shippingInfo.timeline.length === 0) {
      order.shippingInfo = ShippingService.createShipment(order);
      await order.save();
    }

    return res.json({
      success: true,
      orderId: order._id,
      status: order.status,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      amount: order.amount,
      shippingInfo: order.shippingInfo,
      items: order.items,
      address: order.address,
      createdAt: order.createdAt
    });
  } catch (error) {
    console.error("Track Order Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE TRACKING / ADD MILESTONE (ADMIN) =================
export const updateTrackingMilestone = async (req, res) => {
  try {
    const { orderId, status, location, note, awb, carrier } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (!order.shippingInfo) {
      order.shippingInfo = ShippingService.createShipment(order);
    }

    if (awb) order.shippingInfo.awb = awb;
    if (carrier) order.shippingInfo.carrier = carrier;

    if (status) {
      order.status = status;
      order.shippingInfo.timeline = ShippingService.appendMilestone(
        order.shippingInfo.timeline,
        status,
        location || order.address?.city || "Regional Fulfillment Hub",
        note || ""
      );

      if (status === "Delivered") {
        order.deliveredAt = new Date();
        order.isPaid = true;
      }
    }

    await order.save();

    res.json({ success: true, message: "Tracking updated successfully", shippingInfo: order.shippingInfo, order });
  } catch (error) {
    console.error("Update Tracking Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
