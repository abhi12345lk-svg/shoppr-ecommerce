import Stripe from "stripe";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";

let stripeInstance = null;
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey === "sk_test_your_stripe_secret_key") {
    return null;
  }
  if (!stripeInstance) {
    try {
      stripeInstance = new Stripe(secretKey);
    } catch (err) {
      console.error("Stripe initialization error:", err.message);
      return null;
    }
  }
  return stripeInstance;
};

export const stripePayment = async (req, res) => {
  try {
    const stripe = getStripeInstance();
    if (!stripe) {
      return res.status(400).json({
        success: false,
        message: "Stripe payment gateway is not configured. Please set a valid STRIPE_SECRET_KEY in backend/.env"
      });
    }

    const { items, address, userId } = req.body;

    /* ================= GET PRODUCTS ================= */

    let products = [];

    for (const item of items) {
      const product = await productModel.findById(item.product);

      if (product) {
        products.push({
          product: product._id,
          name: product.name,
          image: product.image,
          offerPrice: product.offerPrice,
          quantity: item.quantity,
          size: item.size
        });
      }
    }

    /* ================= STRIPE LINE ITEMS ================= */

    const frontendOrigin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

    const line_items = products.map((item) => {
      const img = item.image && item.image.length > 0 && item.image[0].startsWith('http') 
        ? [item.image[0]] 
        : [];
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: img
          },
          unit_amount: Math.round(item.offerPrice * 100)
        },
        quantity: item.quantity
      };
    });

    /* ================= TOTAL ================= */

    const amount = products.reduce(
      (acc, item) => acc + item.offerPrice * item.quantity,
      0
    );

    /* ================= SAVE ORDER ================= */

    const newOrder = await orderModel.create({
      userId,
      items: products.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        size: item.size
      })),
      address,
      amount,
      paymentMethod: "stripe",
      isPaid: false,
      status: "Pending Payment"
    });

    /* ================= STRIPE SESSION ================= */

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontendOrigin}/my-orders?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendOrigin}/cart`
    });

    newOrder.stripeSessionId = session.id;
    await newOrder.save();

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};