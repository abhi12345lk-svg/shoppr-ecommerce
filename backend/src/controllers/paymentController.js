import Stripe from "stripe";

import orderModel from "../models/order.model.js";

import productModel from "../models/product.model.js";

const stripe=new Stripe(
process.env.STRIPE_SECRET_KEY
);

export const stripePayment=async(req,res)=>{

try{

const{
items,
address,
userId
}=req.body;

/* ================= GET PRODUCTS ================= */

let products=[];

for(const item of items){

const product=
await productModel.findById(item.product);

if(product){

products.push({

product:product._id,

name:product.name,

image:product.image,

offerPrice:product.offerPrice,

quantity:item.quantity,

size:item.size

});

}

}

/* ================= STRIPE LINE ITEMS ================= */

const line_items=products.map((item)=>({

price_data:{

currency:"inr",

product_data:{

name:item.name,

images:[item.image[0]]

},

unit_amount:item.offerPrice*100

},

quantity:item.quantity

}));

/* ================= TOTAL ================= */

const amount=products.reduce(

(acc,item)=>

acc+(item.offerPrice*item.quantity),

0

);

/* ================= SAVE ORDER ================= */

const newOrder=await orderModel.create({

userId,

items:products.map((item)=>({
product:item.product,
quantity:item.quantity,
size:item.size
})),

address,

amount,

paymentMethod:"stripe",

isPaid:true,

status:"Order Placed"

});

/* ================= STRIPE SESSION ================= */

const session=
await stripe.checkout.sessions.create({

payment_method_types:["card"],

line_items,

mode:"payment",

success_url:
"http://localhost:5173/my-orders",

cancel_url:
"http://localhost:5173/cart"

});

res.json({

success:true,

url:session.url

});

}catch(error){

console.log(error.message);

res.json({

success:false,

message:error.message

});

}

};
