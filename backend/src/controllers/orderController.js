import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";

/* ================= STRIPE ================= */

const stripe = new Stripe(
process.env.STRIPE_SECRET_KEY
);

/* ================= GLOBAL VARIABLES ================= */

const currency = "usd";

const deliveryCharges = 10;

const taxPercentage = 0.02;

/* ================= PLACE ORDER COD ================= */
/* /api/order/cod */

export const placeOrderCOD = async (req, res) => {

try {

const {
items,
address
} = req.body;

const userId = req.userId;

if (items.length === 0) {

return res.json({

success: false,

message: "Please add product first"

});

}

/* ================= CALCULATE SUBTOTAL ================= */

let subtotal = 0;

for (const item of items) {

const product =
await productModel.findById(item.product);

if (product) {

subtotal +=
product.offerPrice *
item.quantity;

}

}

/* ================= TOTAL ================= */

const taxAmount =
subtotal * taxPercentage;

const totalAmount =
subtotal +
taxAmount +
deliveryCharges;

/* ================= CREATE ORDER ================= */

await orderModel.create({

userId,

items,

amount: totalAmount,

address,

paymentMethod: "COD",

isPaid: false,

status: "Order Placed"

});

/* ================= CLEAR CART ================= */

await userModel.findByIdAndUpdate(

userId,

{
cartData: {}
}

);

/* ================= RESPONSE ================= */

return res.json({

success: true,

message: "Order Placed"

});

} catch (error) {

console.log(error);

res.json({

success: false,

message: error.message

});

}

};

/* ================= PLACE ORDER STRIPE ================= */
/* /api/order/stripe */

export const placeOrderStripe = async (req, res) => {

try {

const {
items,
address
} = req.body;

const userId = req.userId;

if (items.length === 0) {

return res.json({

success: false,

message: "Please add product first"

});

}

/* ================= PRODUCTS ================= */

let line_items = [];

let subtotal = 0;

for (const item of items) {

const product =
await productModel.findById(item.product);

if (product) {

subtotal +=
product.offerPrice *
item.quantity;

/* ================= STRIPE ITEMS ================= */

line_items.push({

price_data: {

currency: "usd",

product_data: {

name: product.name,

images: [product.image[0]]

},

unit_amount:
product.offerPrice * 100

},

quantity: item.quantity

});

}

}

/* ================= TOTAL ================= */

const taxAmount =
subtotal * taxPercentage;

const totalAmount =
subtotal +
taxAmount +
deliveryCharges;

/* ================= CREATE ORDER ================= */

const newOrder =
await orderModel.create({

userId,

items,

amount: totalAmount,

address,

paymentMethod: "stripe",

isPaid: false,

status: "Pending Payment"

});

/* ================= STRIPE SESSION ================= */

const session =
await stripe.checkout.sessions.create({

payment_method_types: ['card'],

line_items,

mode: 'payment',

success_url:
`http://localhost:5173/my-orders?success=true&orderId=${newOrder._id}`,

cancel_url:
`http://localhost:5173/cart`

});

/* ================= SAVE SESSION ID ================= */

newOrder.stripeSessionId =
session.id;

await newOrder.save();

/* ================= CLEAR CART ================= */

await userModel.findByIdAndUpdate(

userId,

{
cartData: {}
}

);

/* ================= RESPONSE ================= */

res.json({

success: true,

url: session.url

});

} catch (error) {

console.log(error);

res.json({

success: false,

message: error.message

});

}

};

/* ================= USER ORDERS ================= */
/* /api/order/userorders */

export const userOrders = async (req, res) => {

try {

const userId = req.userId;

/* ================= STRIPE SUCCESS ================= */

const {
success,
orderId
} = req.query;

if (success === "true" && orderId) {

await orderModel.findByIdAndUpdate(

orderId,

{
isPaid: true,
status: "Order Placed",
paidAt: new Date()
}

);

}

/* ================= GET UPDATED ORDERS ================= */

const orders = await orderModel

.find({
userId
})

.populate("items.product")

.sort({
createdAt: -1
});

res.json({

success: true,

orders

});

} catch (error) {

console.log(error);

res.json({

success: false,

message: error.message

});

}

};

/* ================= ALL ORDERS ADMIN ================= */
/* /api/order/list */

export const allOrders = async (req, res) => {

try {

const orders =
await orderModel

.find({})

.populate("items.product")

.sort({ createdAt: -1 });

res.json({

success: true,

orders

});

} catch (error) {

console.log(error);

res.json({

success: false,

message: error.message

});

}

};

/* ================= UPDATE STATUS ================= */
/* /api/order/status */

export const updateStatus = async (req, res) => {

try {

const {
orderId,
status
} = req.body;

await orderModel.findByIdAndUpdate(

orderId,

{ status }

);

res.json({

success: true,

message: "Order Status Updated"

});

} catch (error) {

console.log(error);

res.json({

success: false,

message: error.message

});

}

};

/* ================= CANCEL ORDER ================= */
/* /api/order/cancel */

export const cancelOrder = async (req, res) => {

try {

const {
orderId
} = req.body;

const order =
await orderModel.findById(orderId);

if (!order) {

return res.json({

success: false,

message: "Order Not Found"

});

}

/* ================= CHECK STATUS ================= */

if (

order.status === "Shipped" ||

order.status === "Delivered"

) {

return res.json({

success: false,

message: "Order cannot be cancelled now"

});

}

/* ================= UPDATE ================= */

order.status = "Cancelled";

await order.save();

/* ================= RESPONSE ================= */

res.json({

success: true,

message: "Order Cancelled Successfully"

});

} catch (error) {

console.log(error);

res.json({

success: false,

message: error.message

});

}

};