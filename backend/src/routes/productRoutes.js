import express from "express";
import { upload } from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import {
  addProduct,
  updateProduct,
  changeStock,
  deleteProduct,
  listProduct,
  singleProduct
} from "../controllers/productController.js";

const productRouter = express.Router();

// Add Product
productRouter.post("/add", upload.array("images"), authAdmin, addProduct);

// Update Product
productRouter.post("/update", authAdmin, updateProduct);

// Product List
productRouter.get("/list", listProduct);

// Single Product
productRouter.post("/single", singleProduct);

// Change Product Stock
productRouter.post("/stock", changeStock);

// Delete Product
productRouter.post("/delete", authAdmin, deleteProduct);

export default productRouter;