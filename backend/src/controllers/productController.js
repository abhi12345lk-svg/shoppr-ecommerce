import productModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

// ================= ADD PRODUCT =================
// /api/product/add
export const addProduct = async (req, res) => {
  try {
    if (!req.body.productData) {
      return res.status(400).json({ success: false, message: "Product data is required" });
    }

    const productData =
      typeof req.body.productData === "string"
        ? JSON.parse(req.body.productData)
        : req.body.productData;

    const images = req.files || [];

    let imagesUrl = [];

    if (images && images.length > 0) {
      // Upload images to Cloudinary
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          return result.secure_url;
        })
      );
    } else if (productData.image && Array.isArray(productData.image) && productData.image.length > 0) {
      imagesUrl = productData.image;
    } else {
      return res.status(400).json({ success: false, message: "Please upload at least one product image" });
    }

    // Auto-generate SKU if missing
    const generatedSku =
      productData.sku ||
      `SHP-${(productData.category || "GEN").toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;

    const newProduct = await productModel.create({
      ...productData,
      sku: generatedSku,
      image: imagesUrl,
      price: Number(productData.price),
      offerPrice: Number(productData.offerPrice || productData.price),
      stockCount: Number(productData.stockCount) || 50
    });

    res.json({ success: true, message: "Product Added Successfully", product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE PRODUCT =================
// /api/product/update
export const updateProduct = async (req, res) => {
  try {
    const { productId, updateData } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const data = typeof updateData === "string" ? JSON.parse(updateData) : updateData;

    const updated = await productModel.findByIdAndUpdate(productId, data, { new: true });

    res.json({ success: true, message: "Product Updated Successfully", product: updated });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= PRODUCT LIST =================
// /api/product/list
export const listProduct = async (req, res) => {
  try {
    const { category, subCategory, sort } = req.query;

    let query = {};
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
    if (subCategory) {
      query.subCategory = { $regex: new RegExp(`^${subCategory}$`, "i") };
    }

    let sortOption = { createdAt: -1 };
    if (sort === "low-high") sortOption = { offerPrice: 1 };
    if (sort === "high-low") sortOption = { offerPrice: -1 };

    const products = await productModel.find(query).sort(sortOption);
    res.json({ success: true, products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= SINGLE PRODUCT =================
// /api/product/single
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= CHANGE PRODUCT STOCK =================
// /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { productId, inStock } = req.body;
    await productModel.findByIdAndUpdate(productId, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE PRODUCT =================
// /api/product/delete
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    await productModel.findByIdAndDelete(productId);
    res.json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};