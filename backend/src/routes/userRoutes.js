/* ======================= USERROUTES.JS ======================= */

import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  isAuth,
  updateCart,
  getCart,
  toggleWishlist,
  getWishlist
} from "../controllers/usercontroller.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

/* ================= USER AUTH ================= */
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logout);
userRouter.get("/is-auth", isAuth);

/* ================= CART ================= */
userRouter.post("/cart", authUser, updateCart);
userRouter.get("/cart", authUser, getCart);

/* ================= WISHLIST ================= */
userRouter.get("/wishlist", authUser, getWishlist);
userRouter.post("/wishlist/toggle", authUser, toggleWishlist);

export default userRouter;