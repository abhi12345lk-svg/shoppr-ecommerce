import express from "express";

import {
stripePayment
} from "../controllers/paymentController.js";

const paymentRouter=express.Router();

paymentRouter.post(
'/stripe',
stripePayment
);

export default paymentRouter;
