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
import categoryRouter from "./routes/categoryRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import shippingRouter from "./routes/shippingRoutes.js";

const app = express();

const port = process.env.PORT || 4000;

// ================= DATABASE CONNECTION =================

connectDB();

// ================= CLOUDINARY CONNECTION =================

connectCloudinary();

// ================= ALLOWED ORIGINS & CORS CONFIG =================

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://shoppr-ecommerce-b8wi.vercel.app',
  'https://shoppr-ecommerce-b8wi-git-main-abhishekopji.vercel.app',
  'https://shoppr-ecommerce-zh3r.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, mobile or curl requests with no origin
    if (!origin) return callback(null, true);

    // Allow any localhost / 127.0.0.1 port
    const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    // Allow any vercel deployment for this project
    const isVercel = /^https:\/\/.*\.vercel\.app$/.test(origin);

    if (isLocalhost || isVercel || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(null, true); // Permissive in dev to avoid network blockages
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'adminToken'],
  optionsSuccessStatus: 200
};

// ================= MIDDLEWARE SETUP =================

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

// ================= API ROUTES =================

app.use('/api/user', userRouter);

app.use('/api/admin', adminRouter);

app.use('/api/product', productRouter);

app.use('/api/cart', cartRouter);

app.use('/api/order', orderRouter);

app.use('/api/payment', paymentRouter);

app.use('/api/contact', contactRouter);
app.use('/api/category', categoryRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/shipping', shippingRouter);

// ================= HOME ROUTE =================

app.get('/', (req, res) => {
  res.send('API sab work krr rha hai bhai letsgooo');
});

// ================= GLOBAL ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ================= SERVER =================

app.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', `Server is running on port http://localhost:${port}`);
});