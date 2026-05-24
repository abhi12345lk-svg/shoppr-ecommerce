import cookieParser from 'cookie-parser';

import 'dotenv/config';

import express from 'express';

import cors from 'cors';

import connectDB from './config/mongodb.js';

import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoutes.js';

import adminRouter from './routes/adminRoute.js';

import productRouter from './routes/productRoutes.js';

import cartRouter from './routes/cartRoutes.js';

import orderRouter from './routes/orderRoutes.js';

import paymentRouter from './routes/paymentRoutes.js';

import contactRouter from "./routes/contactRoutes.js";

const app = express();

const port = process.env.PORT || 4000;

// ================= DATABASE CONNECTION =================

connectDB();

// ================= CLOUDINARY CONNECTION =================

connectCloudinary();

// ================= ALLOWED ORIGINS =================

const allowedOrigins = [
  'http://localhost:5173',
  'https://shoppr-ecommerce-b8wi.vercel.app'
];

// ================= MIDDLEWARE SETUP =================

app.use(express.json());

app.use(cookieParser());

app.use(cors({

  origin: allowedOrigins,

  credentials: true

}));

// ================= API ROUTES =================

app.use('/api/user', userRouter);

app.use('/api/admin', adminRouter);

app.use('/api/product', productRouter);

app.use('/api/cart', cartRouter);

app.use('/api/order', orderRouter);

app.use('/api/payment', paymentRouter);

app.use('/api/contact',contactRouter);

// ================= HOME ROUTE =================

app.get('/', (req, res) => {

  res.send('API sab work krr rha hai bhai letsgooo');

});

// ================= SERVER =================

app.listen(port, () => {

  console.log(

    '\x1b[32m%s\x1b[0m',

    `Server is running on port http://localhost:${port}`

  );

});