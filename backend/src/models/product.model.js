import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    sizes: { type: Array, required: true },
    popular: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },

    // Fashion Catalog Enhancements
    subCategory: { type: String, default: "" },
    brand: { type: String, default: "SHOPPR" },
    sku: { type: String, default: "" },
    color: { type: String, default: "" },
    colorHex: { type: String, default: "#111827" },
    tags: { type: [String], default: [] },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    stockCount: { type: Number, default: 50 },
    fabric: { type: String, default: "100% Breathable Cotton" },
    fit: { type: String, default: "Modern Relaxed Fit" },
    care: { type: String, default: "Machine wash cold. Do not tumble dry." }
  },
  { timestamps: true }
);

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;