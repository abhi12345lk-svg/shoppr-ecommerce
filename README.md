# 🛒 Shoppr E-Commerce Website

A full-stack MERN E-Commerce web application with user authentication, product management, shopping cart, order processing, and Stripe payment integration.

## 🚀 Live Demo

Frontend: https://shoppr-ecommerce-b8wi.vercel.app/

## 📌 Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Search & Filter Products
- Add to Cart
- Update Cart Quantity
- Place Orders
- Order History
- Stripe Payment Gateway
- Responsive Design

### 🛠️ Admin Features
- Admin Login
- Add Products
- Delete Products
- Manage Orders
- Update Order Status
- Product Image Upload via Cloudinary

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

### Third Party Services
- Stripe Payment Gateway
- Cloudinary Image Storage
- Vercel Deployment

---

## 📂 Project Structure

```bash
shoppr-ecommerce/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=4000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

FRONTEND_URL=http://localhost:5173
```

---

## 🔧 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/shoppr-ecommerce.git
cd shoppr-ecommerce
```

### Backend Setup

```bash
cd backend

npm install

npm run server
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Screenshots

### Home Page
(Add Screenshot Here)

### Product Page
(Add Screenshot Here)

### Cart Page
(Add Screenshot Here)

### Admin Dashboard
(Add Screenshot Here)

---

## 🔒 Authentication

- JWT Token Based Authentication
- Protected Routes
- Admin Authorization Middleware
- Secure Password Hashing using Bcrypt

---

## 💳 Payment Integration

Stripe Checkout is integrated for secure online payments.

---

## 🌐 Deployment

### Frontend
- Vercel

### Backend
- Vercel / Render

### Database
- MongoDB Atlas

---

## 👨‍💻 Author

**Abhishek Thakur**

- Full Stack MERN Developer
- LinkedIn: https://www.linkedin.com/in/abhishek-thakur-3618942a3/

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
