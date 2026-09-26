import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
  checkPincode,
  getOrderTracking,
  updateTrackingMilestone
} from "../controllers/shippingController.js";

const shippingRouter = express.Router();

shippingRouter.get("/check-pincode", checkPincode);
shippingRouter.post("/check-pincode", checkPincode);
shippingRouter.get("/track/:orderId", getOrderTracking);
shippingRouter.post("/update-milestone", authAdmin, updateTrackingMilestone);

export default shippingRouter;
