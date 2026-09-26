/* ======================= USERCONTROLLER.JS ======================= */

import userModel from "../models/user.model.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* ================= COOKIE OPTIONS ================= */
const isProd = process.env.APP_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/"
};

/* ================= REGISTER USER ================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      wishlist: []
    });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({
      success: true,
      message: "Account Created Successfully",
      token,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, wishlist: [] }
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= LOGIN USER ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        wishlist: user.wishlist || []
      }
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= CHECK AUTH ================= */
const isAuth = async (req, res) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token && req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res.json({ success: false, isAuth: false, user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.json({ success: false, isAuth: false, user: null });
    }

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.json({ success: false, isAuth: false, user: null });
    }

    return res.json({ success: true, isAuth: true, user });
  } catch (error) {
    return res.json({ success: false, isAuth: false, user: null });
  }
};

/* ================= UPDATE CART ================= */
const updateCart = async (req, res) => {
  try {
    const { userId } = req;
    const { cartData } = req.body;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= GET CART ================= */
const getCart = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId);
    res.json({ success: true, cartData: user?.cartData || {} });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= WISHLIST TOGGLE ================= */
const toggleWishlist = async (req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const wishlist = user.wishlist || [];
    const existsIndex = wishlist.findIndex((id) => id.toString() === productId.toString());

    let isAdded = false;
    if (existsIndex > -1) {
      wishlist.splice(existsIndex, 1);
      isAdded = false;
    } else {
      wishlist.push(productId);
      isAdded = true;
    }

    user.wishlist = wishlist;
    await user.save();

    res.json({
      success: true,
      message: isAdded ? "Added to Wishlist" : "Removed from Wishlist",
      isAdded,
      wishlist
    });
  } catch (error) {
    console.error("Wishlist Toggle Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET WISHLIST ================= */
const getWishlist = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId).populate("wishlist");
    res.json({ success: true, wishlist: user?.wishlist || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= LOGOUT ================= */
const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    return res.json({ success: true, message: "Successfully Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, isAuth, logout, updateCart, getCart, toggleWishlist, getWishlist };