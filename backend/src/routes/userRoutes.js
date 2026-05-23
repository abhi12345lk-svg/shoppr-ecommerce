/* ======================= USERROUTES.JS ======================= */

import express from "express";

import{

registerUser,

loginUser,

logout,

isAuth,

updateCart,

getCart

}from "../controllers/usercontroller.js";

import authUser from "../middlewares/authUser.js";

const userRouter=express.Router();

/* ================= USER ROUTES ================= */

userRouter.post(
"/register",
registerUser
)

userRouter.post(
"/login",
loginUser
)

userRouter.post(
"/logout",
logout
)

/* ================= AUTH ================= */

userRouter.get(
"/is-auth",
authUser,
isAuth
)

/* ================= CART ================= */

userRouter.post(
"/cart",
authUser,
updateCart
)

userRouter.get(
"/cart",
authUser,
getCart
)

export default userRouter;