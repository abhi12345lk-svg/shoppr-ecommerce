import express from "express";

import { upload } from "../middlewares/multer.js";

import authAdmin from "../middlewares/authAdmin.js";

import {
    addProduct,
    changeStock,
    deleteProduct,
    listProduct,
    singleProduct
} from "../controllers/productController.js";

const productRouter = express.Router();

// ================= PRODUCT ROUTES =================

// Add Product
productRouter.post(
    '/add',
    upload.array(["images"]),
    authAdmin,
    addProduct
);

// Product List
productRouter.get(
    '/list',
    listProduct
);

// Single Product
productRouter.post(
    '/single',
    singleProduct
);

// Change Product Stock
productRouter.post(
    '/stock',
    changeStock
);

// Delete Product
productRouter.post(
    '/delete',
    authAdmin,
    deleteProduct
);

export default productRouter;