import "dotenv/config";
import mongoose from "mongoose";
import productModel from "./models/product.model.js";

const FASHION_PRODUCTS = [
  // MEN
  {
    name: "Oversized Heavyweight Acid Wash Graphic Tee",
    description: "Drop shoulder silhouette crafted with 260 GSM French terry cotton. Features distressed ribbing and signature typography.",
    price: 1999,
    offerPrice: 999,
    image: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Men",
    subCategory: "Oversized Tees",
    brand: "SHOPPR NOIR",
    color: "Washed Charcoal",
    colorHex: "#2b2b2b",
    sizes: ["S", "M", "L", "XL", "XXL"],
    popular: true,
    inStock: true,
    isNewArrival: true,
    isBestSeller: true,
    stockCount: 85,
    fabric: "100% Combed Heavy Cotton (260 GSM)",
    fit: "Boxy Oversized Fit",
    care: "Reverse wash cold. Dry in shade.",
    tags: ["Streetwear", "Oversized", "Trending", "Acid Wash"]
  },
  {
    name: "Relaxed Linen Resort Cuban Collar Shirt",
    description: "Breezy pure linen shirt tailored with an open camp collar, pearl shell buttons, and split side hems.",
    price: 2499,
    offerPrice: 1499,
    image: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Men",
    subCategory: "Shirts",
    brand: "SHOPPR LINEN",
    color: "Natural Ecru",
    colorHex: "#e3decb",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    isNewArrival: true,
    stockCount: 60,
    fabric: "100% Breathable European Linen",
    fit: "Relaxed Holiday Fit",
    care: "Gentle machine wash. Iron while damp.",
    tags: ["Linen", "Resort", "Summer", "Casual"]
  },
  {
    name: "Tactical Multi-Pocket Parachute Cargo Pants",
    description: "Technical street parachute pants with bungee toggles at hem, 6 deep utility pockets, and elasticated drawstring waistband.",
    price: 3299,
    offerPrice: 1999,
    image: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Men",
    subCategory: "Cargo Pants",
    brand: "SHOPPR TECH",
    color: "Military Olive",
    colorHex: "#48533b",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 45,
    fabric: "Durable Ripstop Cotton Blend",
    fit: "Loose Baggy Tapered",
    care: "Machine wash cold inside out.",
    tags: ["Parachute", "Cargos", "Baggy", "Utility"]
  },
  {
    name: "Raw Indigo Selvedge Wide-Leg Denim",
    description: "Classic 13.5oz Japanese selvedge denim with contrast chain stitching, copper rivets, and a relaxed straight drape.",
    price: 3999,
    offerPrice: 2499,
    image: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Men",
    subCategory: "Jeans & Trousers",
    brand: "SHOPPR DENIM",
    color: "Deep Indigo",
    colorHex: "#1a233a",
    sizes: ["M", "L", "XL"],
    popular: false,
    inStock: true,
    stockCount: 30,
    fabric: "100% Selvedge Denim Cotton",
    fit: "Wide Straight Leg",
    care: "Hand wash or dry clean to preserve indigo shade.",
    tags: ["Selvedge", "Denim", "Wide Leg", "Vintage"]
  },

  // WOMEN
  {
    name: "Sculpted Ribbed Square Neck Crop Top",
    description: "Double-layered seamless contour fabric designed for an ultra-flattering fit with wide straps and square cut neckline.",
    price: 1499,
    offerPrice: 799,
    image: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Women",
    subCategory: "Tops & Bodysuits",
    brand: "SHOPPR STUDIO",
    color: "Mocha Brown",
    colorHex: "#5c4033",
    sizes: ["XS", "S", "M", "L"],
    popular: true,
    inStock: true,
    isNewArrival: true,
    stockCount: 110,
    fabric: "92% Modal Rayon, 8% Elastane",
    fit: "Form-fitting Contour",
    care: "Hand wash in cold water.",
    tags: ["Basics", "Square Neck", "Minimalist", "Trending"]
  },
  {
    name: "Satin Asymmetric Cowl Neck Slip Dress",
    description: "High-shine liquid satin midi dress featuring a sultry cowl neckline, subtle thigh slit, and adjustable criss-cross back ties.",
    price: 3499,
    offerPrice: 2199,
    image: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Women",
    subCategory: "Dresses & Jumpsuits",
    brand: "SHOPPR LUXE",
    color: "Champagne Gold",
    colorHex: "#d4af37",
    sizes: ["S", "M", "L"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 40,
    fabric: "Silk-feel Premium Satin",
    fit: "Slim Flared Slip",
    care: "Dry clean only.",
    tags: ["Partywear", "Slip Dress", "Satin", "Evening"]
  },
  {
    name: "Tailored Linen Blazer & High-Rise Trouser Co-ord",
    description: "Power dressing reimagined in crisp lightweight summer suiting. Single-breasted relaxed blazer paired with pleated trousers.",
    price: 5499,
    offerPrice: 3299,
    image: [
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Women",
    subCategory: "Co-ords",
    brand: "SHOPPR ATELIER",
    color: "Soft Pistachio",
    colorHex: "#93c572",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    isNewArrival: true,
    stockCount: 35,
    fabric: "70% Viscose, 30% Linen",
    fit: "Relaxed Tailored",
    care: "Steam press only. Dry clean.",
    tags: ["Co-ord", "Blazer", "Power Suit", "Workwear"]
  },

  // FOOTWEAR
  {
    name: "Retro Chunky Platform Street Sneakers",
    description: "High-density cushioned rubber sole with breathable mesh panelling and genuine suede overlays. Engineered for all-day comfort.",
    price: 4499,
    offerPrice: 2499,
    image: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Footwear",
    subCategory: "Sneakers",
    brand: "SHOPPR KICKS",
    color: "Bone White & Forest Green",
    colorHex: "#e8ede0",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 50,
    fabric: "Full Grain Leather & Mesh",
    fit: "True to Size Regular Fit",
    care: "Wipe with damp cloth and sneaker cleaner.",
    tags: ["Sneakers", "Chunky", "Retro", "Streetwear"]
  },
  {
    name: "Burnished Penny Loafers with Lugged Sole",
    description: "Handcrafted artisan leather penny loafers upgraded with a modern commando lug sole for subtle edge and grip.",
    price: 4999,
    offerPrice: 2999,
    image: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Footwear",
    subCategory: "Loafers & Formals",
    brand: "SHOPPR CLASSICS",
    color: "Cognac Brown",
    colorHex: "#7e4a35",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    popular: false,
    inStock: true,
    stockCount: 25,
    fabric: "100% Genuine Hand-buffed Leather",
    fit: "Snug Formal Fit",
    care: "Condition with neutral leather wax.",
    tags: ["Loafers", "Formal", "Handcrafted", "Leather"]
  },

  // WINTERWEAR
  {
    name: "Heavyweight 450 GSM Boxy Fleece Hoodie",
    description: "Ultra-plush brushed fleece hoodie with double-layer crossover hood, hidden kangaroo pocket, and clean drop shoulders.",
    price: 3499,
    offerPrice: 1999,
    image: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Winterwear",
    subCategory: "Hoodies & Sweats",
    brand: "SHOPPR NOIR",
    color: "Pitch Black",
    colorHex: "#111111",
    sizes: ["S", "M", "L", "XL", "XXL"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 75,
    fabric: "450 GSM Heavy Cotton Fleece",
    fit: "Relaxed Boxy Fit",
    care: "Machine wash cold inside out. Hang dry.",
    tags: ["Hoodie", "Fleece", "Winter", "Heavyweight"]
  },
  {
    name: "Double-Breasted Wool Blend Longline Overcoat",
    description: "Impeccably tailored overcoat with wide peak lapels, horn buttons, deep flap pockets, and thermal quilted inner lining.",
    price: 6999,
    offerPrice: 4499,
    image: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Winterwear",
    subCategory: "Trench & Wool Coats",
    brand: "SHOPPR LUXE",
    color: "Camel Beige",
    colorHex: "#c19a6b",
    sizes: ["M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 20,
    fabric: "70% Wool, 30% Polyamide Blend",
    fit: "Tailored Longline",
    care: "Specialist dry clean only.",
    tags: ["Overcoat", "Wool", "Longline", "Luxury"]
  },
  {
    name: "Camel Wool-Blend Tailored Topcoat",
    description: "Signature tailored camel wool-blend coat cut in an elongated fit with sharp notched lapels and structured shoulders.",
    price: 5999,
    offerPrice: 4299,
    image: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80"
    ],
    category: "Winterwear",
    subCategory: "Overcoats & Jackets",
    brand: "SHOPPR ATELIER",
    color: "Camel Tan",
    colorHex: "#c19a6b",
    sizes: ["M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 25,
    fabric: "80% Virgin Wool, 20% Cashmere Blend",
    fit: "Tailored Architectural Fit",
    care: "Dry clean only.",
    tags: ["Topcoat", "Wool", "Overcoat", "Camel"]
  },
  {
    name: "Ribbed Merino Wool Knit Turtleneck Sweater",
    description: "Pure extrafine Merino wool turtleneck crafted in an Ottoman ribbed stitch for exceptional warmth and tactile texture.",
    price: 2999,
    offerPrice: 1899,
    image: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=80"
    ],
    category: "Winterwear",
    subCategory: "Sweaters & Knitwear",
    brand: "SHOPPR",
    color: "Charcoal Heather",
    colorHex: "#2b2b2b",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 40,
    fabric: "100% Extrafine Merino Wool",
    fit: "Regular Structured Fit",
    care: "Hand wash cold or dry clean.",
    tags: ["Sweater", "Turtleneck", "Knitwear", "Merino"]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clean existing products
    const existing = await productModel.find({});
    for (const p of existing) {
      p.name = p.name.replace(/^[\s"']+|[\s"']+$/g, "").trim();
      p.brand = p.brand || "SHOPPR";
      if (!p.subCategory) {
        if (p.category === "Men") p.subCategory = "Shirts";
        else if (p.category === "Women") p.subCategory = "Dresses & Jumpsuits";
        else if (p.category === "Footwear") p.subCategory = "Sneakers";
        else if (p.category === "Winterwear") p.subCategory = "Hoodies & Sweats";
        else p.subCategory = "General";
      }
      p.stockCount = p.stockCount || 50;
      p.tags = p.tags && p.tags.length > 0 ? p.tags : [p.category, "Fashion", "Trending"];
      await p.save();
    }
    console.log(`Cleaned up ${existing.length} existing products.`);

    // Add new fashion products if they don't exist by name
    let addedCount = 0;
    for (const item of FASHION_PRODUCTS) {
      const exists = await productModel.findOne({ name: item.name });
      if (!exists) {
        await productModel.create(item);
        addedCount++;
      }
    }

    console.log(`Successfully added ${addedCount} new modern fashion products!`);
    const totalCount = await productModel.countDocuments();
    console.log(`Total products in database: ${totalCount}`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
