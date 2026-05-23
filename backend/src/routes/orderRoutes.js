import express from "express";

import authAdmin from "../middlewares/authAdmin.js";
import authUser from "../middlewares/authUser.js";

import {

placeOrderCOD,

placeOrderStripe,

userOrders,

allOrders,

updateStatus,

cancelOrder

} from "../controllers/orderController.js";

const orderRouter=express.Router();

/* ================= USER ORDERS ================= */

orderRouter.get(
'/userorders',
authUser,
userOrders
);

/* ================= PLACE ORDER ================= */

orderRouter.post(
'/cod',
authUser,
placeOrderCOD
);

orderRouter.post(
'/stripe',
authUser,
placeOrderStripe
);

/* ================= CANCEL ORDER ================= */

orderRouter.post(
'/cancel',
authUser,
cancelOrder
);

/* ================= ADMIN ================= */

orderRouter.get(
'/list',
authAdmin,
allOrders
);

orderRouter.post(
'/status',
authAdmin,
updateStatus
);

export default orderRouter;
