import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
  validateCoupon,
  listCoupons,
  addCoupon,
  deleteCoupon
} from "../controllers/couponController.js";

const couponRouter = express.Router();

couponRouter.post("/validate", validateCoupon);
couponRouter.get("/list", listCoupons);
couponRouter.get("/all", listCoupons);
couponRouter.post("/add", authAdmin, addCoupon);
couponRouter.post("/delete", authAdmin, deleteCoupon);

export default couponRouter;
