import userModel from "../models/user.model.js";

// ================= ADD TO CART =================
// /api/cart/add

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log("Add To Cart Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE CART =================
// /api/cart/update

export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log("Update Cart Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};