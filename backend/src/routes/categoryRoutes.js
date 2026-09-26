import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
  listCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Public: List categories
categoryRouter.get("/list", listCategories);
categoryRouter.get("/all", listCategories);

// Admin: CRUD
categoryRouter.post("/add", authAdmin, addCategory);
categoryRouter.post("/update", authAdmin, updateCategory);
categoryRouter.post("/delete", authAdmin, deleteCategory);

export default categoryRouter;
