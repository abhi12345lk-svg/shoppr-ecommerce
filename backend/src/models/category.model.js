import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  isActive: { type: Boolean, default: true }
});

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    description: { type: String, default: "" },
    subCategories: [subCategorySchema],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;
