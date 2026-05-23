import express from "express";

import authUser from "../middlewares/authUser.js";

import {
    addToCart,
    updateCart
} from "../controllers/cartController.js";

const cartRouter = express.Router();

// ================= CART ROUTES =================

// Add To Cart
cartRouter.post(
    '/add',
    authUser,
    addToCart
);

// Update Cart
cartRouter.post(
    '/update',
    authUser,
    updateCart
);

export default cartRouter;