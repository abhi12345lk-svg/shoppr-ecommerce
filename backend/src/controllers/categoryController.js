import categoryModel from "../models/category.model.js";

// ================= DEFAULT FASHION CATALOG HIERARCHY =================
const DEFAULT_CATEGORIES = [
  {
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    description: "Modern street style, oversized tees, formal shirts, chinos & jackets",
    featured: true,
    order: 1,
    subCategories: [
      { name: "Oversized Tees", slug: "oversized-tees" },
      { name: "Shirts", slug: "shirts" },
      { name: "Cargo Pants", slug: "cargo-pants" },
      { name: "Jeans & Trousers", slug: "jeans-trousers" },
      { name: "Jackets & Blazers", slug: "jackets-blazers" }
    ]
  },
  {
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    description: "Trending dresses, chic co-ords, tops, stylish denim & outerwear",
    featured: true,
    order: 2,
    subCategories: [
      { name: "Tops & Bodysuits", slug: "tops-bodysuits" },
      { name: "Dresses & Jumpsuits", slug: "dresses-jumpsuits" },
      { name: "Co-ords", slug: "co-ords" },
      { name: "Jeans & Trousers", slug: "women-jeans" },
      { name: "Blazers & Jackets", slug: "women-blazers" }
    ]
  },
  {
    name: "Footwear",
    slug: "footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    description: "Chunky sneakers, formal loafers, slides & high-tops",
    featured: true,
    order: 3,
    subCategories: [
      { name: "Sneakers", slug: "sneakers" },
      { name: "Loafers & Formals", slug: "loafers" },
      { name: "Boots & High-Tops", slug: "boots" },
      { name: "Slides & Slip-Ons", slug: "slides" }
    ]
  },
  {
    name: "Winterwear",
    slug: "winterwear",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    description: "Oversized hoodies, sweatshirts, wool coats & parkas",
    featured: true,
    order: 4,
    subCategories: [
      { name: "Hoodies & Sweats", slug: "hoodies-sweats" },
      { name: "Trench & Wool Coats", slug: "trench-coats" },
      { name: "Puffers & Parkas", slug: "puffers-parkas" }
    ]
  },
  {
    name: "Sportswear",
    slug: "sportswear",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    description: "Athleisure, gym wear, performance joggers & track jackets",
    featured: false,
    order: 5,
    subCategories: [
      { name: "Performance Tees", slug: "performance-tees" },
      { name: "Shorts & Trackpants", slug: "shorts-trackpants" },
      { name: "Gym Duffels & Gear", slug: "gym-gear" }
    ]
  },
  {
    name: "Kids",
    slug: "kids",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
    description: "Vibrant comfort clothing and activewear for juniors",
    featured: false,
    order: 6,
    subCategories: [
      { name: "Polos & Tees", slug: "kids-tees" },
      { name: "Pants & Chinos", slug: "kids-pants" },
      { name: "Jackets", slug: "kids-jackets" }
    ]
  }
];

// ================= LIST CATEGORIES =================
export const listCategories = async (req, res) => {
  try {
    let categories = await categoryModel.find({ isActive: true }).sort({ order: 1 });

    // Auto-seed if empty
    if (!categories || categories.length === 0) {
      categories = await categoryModel.insertMany(DEFAULT_CATEGORIES);
    }

    res.json({ success: true, categories });
  } catch (error) {
    console.error("List Categories Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ADD CATEGORY =================
export const addCategory = async (req, res) => {
  try {
    const { name, slug, image, description, subCategories, order, featured } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const category = await categoryModel.create({
      name,
      slug: generatedSlug,
      image: image || "",
      description: description || "",
      subCategories: subCategories || [],
      order: Number(order) || 0,
      featured: Boolean(featured)
    });

    res.json({ success: true, message: "Category created successfully", category });
  } catch (error) {
    console.error("Add Category Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE CATEGORY =================
export const updateCategory = async (req, res) => {
  try {
    const { categoryId, name, slug, image, description, subCategories, order, featured, isActive } = req.body;

    const updated = await categoryModel.findByIdAndUpdate(
      categoryId,
      {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(image !== undefined && { image }),
        ...(description !== undefined && { description }),
        ...(subCategories && { subCategories }),
        ...(order !== undefined && { order }),
        ...(featured !== undefined && { featured }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true }
    );

    res.json({ success: true, message: "Category updated", category: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE CATEGORY =================
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    await categoryModel.findByIdAndDelete(categoryId);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
