import "dotenv/config";
import mongoose from "mongoose";
import productModel from "./models/product.model.js";

export const FASHION_PRODUCTS = [
  // ==========================================
  // MEN'S CLOTHING (7 PRODUCTS)
  // ==========================================
  {
    name: "Oversized Heavyweight Acid Wash Graphic Tee",
    description: "Drop shoulder streetwear silhouette crafted with 260 GSM French terry cotton. Features distressed ribbing and signature typography.",
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
    description: "Breezy pure linen shirt tailored with an open camp collar, pearl shell buttons, and split side hems for holiday styling.",
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
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
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
  {
    name: "Classic Minimalist Oxford Button-Down Shirt",
    description: "Tailored Oxford shirt woven from premium two-ply pinpoint cotton with mother-of-pearl buttons and curved hem.",
    price: 2699,
    offerPrice: 1699,
    image: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Men",
    subCategory: "Shirts",
    brand: "SHOPPR CLASSICS",
    color: "Oxford Sky Blue",
    colorHex: "#87ceeb",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 50,
    fabric: "100% Pinpoint Combed Cotton",
    fit: "Structured Slim-Regular Fit",
    care: "Machine wash warm. Medium iron.",
    tags: ["Oxford", "Formal", "Workwear", "Shirts"]
  },
  {
    name: "Urban Minimalist Boxy Bomber Jacket",
    description: "Sleek water-resistant nylon shell with double-zip closure, storm flap pockets, and chunky rib-knit trim.",
    price: 4999,
    offerPrice: 2999,
    image: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Men",
    subCategory: "Jackets & Blazers",
    brand: "SHOPPR NOIR",
    color: "Satin Midnight Black",
    colorHex: "#18181b",
    sizes: ["M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 35,
    fabric: "100% Technical Micro-Nylon",
    fit: "Boxy Dropped-Shoulder Fit",
    care: "Dry clean only.",
    tags: ["Bomber", "Jackets", "Minimalist", "Outerwear"]
  },
  {
    name: "Ottoman Ribbed Knit Polo Sweater",
    description: "Structured knit polo crafted in an open-stitch waffle texture with a notch collar and relaxed hem.",
    price: 2799,
    offerPrice: 1799,
    image: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Men",
    subCategory: "Oversized Tees",
    brand: "SHOPPR ATELIER",
    color: "Camel Tan",
    colorHex: "#c19a6b",
    sizes: ["S", "M", "L", "XL"],
    popular: false,
    inStock: true,
    stockCount: 40,
    fabric: "100% Cotton-Modal Blend Knit",
    fit: "Relaxed Boxy Fit",
    care: "Flat dry. Hand wash cold.",
    tags: ["Knitwear", "Polo", "Retro", "Resort"]
  },

  // ==========================================
  // WOMEN'S CLOTHING (7 PRODUCTS)
  // ==========================================
  {
    name: "Sculpted Ribbed Square Neck Contour Top",
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
    name: "Liquid Silk-Feel Asymmetric Cowl Neck Slip Dress",
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
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
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
  {
    name: "Retro High-Rise Flare Vintage Denim Jeans",
    description: "Authentic 70s-inspired silhouette fitted through the hips with a subtle bell flare at the ankles in vintage wash.",
    price: 3199,
    offerPrice: 1999,
    image: [
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Women",
    subCategory: "Jeans & Trousers",
    brand: "SHOPPR DENIM",
    color: "Vintage Mid Blue",
    colorHex: "#4682b4",
    sizes: ["26", "28", "30", "32"],
    popular: true,
    inStock: true,
    stockCount: 55,
    fabric: "99% Cotton, 1% Comfort Stretch",
    fit: "High Rise Flared Leg",
    care: "Machine wash cold inside out.",
    tags: ["Flared", "Jeans", "Vintage", "Denim"]
  },
  {
    name: "Tiered Floral Bohemian Summer Maxi Dress",
    description: "Flowy breathable chiffon-cotton blend featuring delicate floral motifs, ruffled tiers, and smocked bodice.",
    price: 3799,
    offerPrice: 2299,
    image: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Women",
    subCategory: "Dresses & Jumpsuits",
    brand: "SHOPPR STUDIO",
    color: "Ivory Floral",
    colorHex: "#fffdd0",
    sizes: ["XS", "S", "M", "L"],
    popular: false,
    inStock: true,
    stockCount: 45,
    fabric: "100% Breathable Viscose Crepe",
    fit: "Flowy Tiered Maxi",
    care: "Hand wash cold. Line dry in shade.",
    tags: ["Bohemian", "Maxi Dress", "Floral", "Summer"]
  },
  {
    name: "Cropped Cable-Knit Crewneck Jumper",
    description: "Plush chunky cable knit spun in a soft wool-cashmere touch blend with ribbed cuffs and dropped shoulders.",
    price: 2999,
    offerPrice: 1899,
    image: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Women",
    subCategory: "Tops & Bodysuits",
    brand: "SHOPPR LUXE",
    color: "Oatmeal Cream",
    colorHex: "#f5f5dc",
    sizes: ["S", "M", "L"],
    popular: true,
    inStock: true,
    stockCount: 40,
    fabric: "Wool & Cashmere Blend",
    fit: "Boxy Cropped Silhouette",
    care: "Dry clean or gentle hand wash.",
    tags: ["Knitwear", "Cable Knit", "Cozy", "Autumn"]
  },
  {
    name: "Architectural Longline Belted Trench Coat",
    description: "Double-breasted storm flap trench coat cut from water-repellent cotton twill with statement horn buttons and waist tie belt.",
    price: 6499,
    offerPrice: 3999,
    image: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Women",
    subCategory: "Blazers & Jackets",
    brand: "SHOPPR ATELIER",
    color: "Warm Sand Stone",
    colorHex: "#d2b48c",
    sizes: ["S", "M", "L"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 25,
    fabric: "100% Cotton Gabardine Twill",
    fit: "Oversized Architectural Drape",
    care: "Specialist dry clean only.",
    tags: ["Trench", "Coat", "Luxury", "Workwear"]
  },

  // ==========================================
  // FOOTWEAR (5 PRODUCTS)
  // ==========================================
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
    name: "Burnished Penny Loafers with Commando Lug Sole",
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
  {
    name: "Monochrome Canvas High-Top Skate Kicks",
    description: "Durable 14oz organic cotton canvas upper with vulcanized rubber waffle outsole and reinforced metal eyelets.",
    price: 3299,
    offerPrice: 1899,
    image: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Footwear",
    subCategory: "Boots & High-Tops",
    brand: "SHOPPR KICKS",
    color: "Classic Jet Black",
    colorHex: "#18181b",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    popular: true,
    inStock: true,
    stockCount: 40,
    fabric: "100% Heavyweight Canvas",
    fit: "True to Size Ankle High",
    care: "Spot clean with gentle soap.",
    tags: ["High Tops", "Skate", "Canvas", "Classic"]
  },
  {
    name: "Minimalist Italian Nappa Leather Low-Tops",
    description: "Ultra-clean luxury silhouette handcrafted from buttery soft Italian calfskin leather with margom rubber soles.",
    price: 5299,
    offerPrice: 3499,
    image: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Footwear",
    subCategory: "Sneakers",
    brand: "SHOPPR LUXE",
    color: "Pure Chalk White",
    colorHex: "#f8f9fa",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 30,
    fabric: "Full Grain Italian Calfskin",
    fit: "Sleek Low-Profile Fit",
    care: "Wipe clean with soft leather cloth.",
    tags: ["Luxury", "Leather Sneakers", "Minimalist", "White Kicks"]
  },
  {
    name: "Suede Chelsea Ankle Boots in Desert Sand",
    description: "Refined English silhouette in velvety oiled suede featuring tonal elasticated side gussets and pull-on tab.",
    price: 5799,
    offerPrice: 3699,
    image: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Footwear",
    subCategory: "Boots & High-Tops",
    brand: "SHOPPR CLASSICS",
    color: "Desert Sand Tan",
    colorHex: "#c2b280",
    sizes: ["UK 8", "UK 9", "UK 10"],
    popular: false,
    inStock: true,
    stockCount: 20,
    fabric: "Premium Suede Cowhide",
    fit: "Slim Ankle Cut",
    care: "Use suede protector spray and brass brush.",
    tags: ["Chelsea Boots", "Suede", "Boots", "Footwear"]
  },

  // ==========================================
  // WINTERWEAR (5 PRODUCTS)
  // ==========================================
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
    color: "Charcoal Heather",
    colorHex: "#36454f",
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
    name: "Camel Virgin Wool Tailored Topcoat",
    description: "Signature tailored camel wool-blend coat cut in an elongated fit with sharp notched lapels and structured shoulders.",
    price: 5999,
    offerPrice: 4299,
    image: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Winterwear",
    subCategory: "Trench & Wool Coats",
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
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Winterwear",
    subCategory: "Hoodies & Sweats",
    brand: "SHOPPR",
    color: "Stone Gray",
    colorHex: "#708090",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 40,
    fabric: "100% Extrafine Merino Wool",
    fit: "Regular Structured Fit",
    care: "Hand wash cold or dry clean.",
    tags: ["Sweater", "Turtleneck", "Knitwear", "Merino"]
  },
  {
    name: "Matte Technical Down Puffer Jacket with Storm Collar",
    description: "Thermal insulated 700 fill-power puffer with fleece-lined handwarmer pockets, interior storm cuffs, and detachable hood.",
    price: 6499,
    offerPrice: 3899,
    image: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Winterwear",
    subCategory: "Puffers & Parkas",
    brand: "SHOPPR TECH",
    color: "Matte Arctic Steel",
    colorHex: "#4682b4",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 30,
    fabric: "Windproof Micro-Ripstop Shell",
    fit: "Insulated Boxy Silhouette",
    care: "Gentle machine wash with down wash detergent.",
    tags: ["Puffer", "Down Jacket", "Winterwear", "Warm"]
  },

  // ==========================================
  // SPORTSWEAR (4 PRODUCTS)
  // ==========================================
  {
    name: "Breathable Seamless Quick-Dry Performance Tee",
    description: "Ultra-lightweight micro-mesh athletic tee engineered with 4-way mechanical stretch and moisture-wicking anti-odor weave.",
    price: 1599,
    offerPrice: 899,
    image: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Sportswear",
    subCategory: "Performance Tees",
    brand: "SHOPPR ACTIVE",
    color: "Steel Obsidian",
    colorHex: "#1f2937",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    isNewArrival: true,
    stockCount: 90,
    fabric: "88% Recycled Poly, 12% Spandex",
    fit: "Athletic Compression Fit",
    care: "Machine wash cold. Fast air dry.",
    tags: ["Gym", "Running", "Seamless", "Sportswear"]
  },
  {
    name: "High-Waisted Compressive Sculpt Leggings & Sports Bra Set",
    description: "Squat-proof seamless ribbed activewear set with bonded high-rise waistband and criss-cross strappy medium-support bra.",
    price: 3299,
    offerPrice: 1999,
    image: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Sportswear",
    subCategory: "Performance Tees",
    brand: "SHOPPR ACTIVE",
    color: "Earthy Sage Green",
    colorHex: "#87a96b",
    sizes: ["XS", "S", "M", "L"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 65,
    fabric: "SculptKnit Seamless Fabric",
    fit: "High Compression Contour",
    care: "Machine wash cold delicate.",
    tags: ["Leggings", "Yoga", "Gym Set", "Activewear"]
  },
  {
    name: "Technical Tapered Training Joggers with Zipper Pockets",
    description: "Four-way stretch woven track joggers with articulated knees, zippered waterproof stash pockets, and ribbed cuffs.",
    price: 2599,
    offerPrice: 1599,
    image: [
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Sportswear",
    subCategory: "Shorts & Trackpants",
    brand: "SHOPPR ACTIVE",
    color: "Carbon Heather",
    colorHex: "#374151",
    sizes: ["S", "M", "L", "XL"],
    popular: false,
    inStock: true,
    stockCount: 50,
    fabric: "Breathable Stretch Poly-Spandex",
    fit: "Tapered Athletic Fit",
    care: "Machine wash cold inside out.",
    tags: ["Joggers", "Training", "Trackpants", "Workout"]
  },
  {
    name: "Lightweight Windbreaker Half-Zip Running Jacket",
    description: "Windproof ultralight shell designed for morning jogs with reflective safety strips, packable hood, and venting mesh back.",
    price: 3199,
    offerPrice: 1899,
    image: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Sportswear",
    subCategory: "Shorts & Trackpants",
    brand: "SHOPPR ACTIVE",
    color: "Electric Teal",
    colorHex: "#008080",
    sizes: ["S", "M", "L", "XL"],
    popular: true,
    inStock: true,
    stockCount: 35,
    fabric: "100% Ripstop Nylon",
    fit: "Relaxed Running Fit",
    care: "Hand wash or gentle cycle.",
    tags: ["Windbreaker", "Running", "Jacket", "Activewear"]
  },

  // ==========================================
  // KIDS' CLOTHING (4 PRODUCTS)
  // ==========================================
  {
    name: "Colorblock 100% Organic Cotton Polo Tee",
    description: "Soft combed cotton pique polo with vibrant contrast collar and tipping stripes. Gentle on sensitive young skin.",
    price: 1199,
    offerPrice: 699,
    image: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Kids",
    subCategory: "Polos & Tees",
    brand: "SHOPPR JUNIOR",
    color: "Sunshine Multi",
    colorHex: "#ffbf00",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    popular: true,
    inStock: true,
    isNewArrival: true,
    stockCount: 70,
    fabric: "100% GOTS Certified Organic Cotton",
    fit: "Comfort Kids Fit",
    care: "Gentle machine wash with mild detergent.",
    tags: ["Kids", "Polo", "Organic Cotton", "Summer"]
  },
  {
    name: "Denim Dungarees Overall with Brass Fasteners",
    description: "Classic rugged denim dungarees with adjustable shoulder buckles, front bib pocket, and reinforced knee stitching.",
    price: 1899,
    offerPrice: 1199,
    image: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Kids",
    subCategory: "Pants & Chinos",
    brand: "SHOPPR JUNIOR",
    color: "Washed Indigo Denim",
    colorHex: "#3b5998",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    popular: true,
    inStock: true,
    isBestSeller: true,
    stockCount: 50,
    fabric: "100% Durable Cotton Denim",
    fit: "Relaxed Playroom Fit",
    care: "Wash inside out with similar colors.",
    tags: ["Dungarees", "Overalls", "Kids Denim", "Playwear"]
  },
  {
    name: "Cozy Teddy Fleece Zip-Up Hooded Jacket",
    description: "Ultra-warm sherpa teddy fleece with soft cotton jersey lining, playful animal ear hood, and smooth zipper guard.",
    price: 2199,
    offerPrice: 1299,
    image: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Kids",
    subCategory: "Jackets",
    brand: "SHOPPR JUNIOR",
    color: "Biscuit Caramel",
    colorHex: "#c68b59",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    popular: true,
    inStock: true,
    stockCount: 40,
    fabric: "100% Thermal Sherpa Fleece",
    fit: "Comfort Layered Fit",
    care: "Machine wash cold delicate.",
    tags: ["Sherpa", "Teddy Fleece", "Warm", "Kids Jacket"]
  },
  {
    name: "Vibrant Organic Cotton Summer Tee & Shorts Play Set",
    description: "Two-piece co-ord play set with graphic crewneck tee and elasticated drawstring shorts made from breathable jersey cotton.",
    price: 1499,
    offerPrice: 899,
    image: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Kids",
    subCategory: "Polos & Tees",
    brand: "SHOPPR JUNIOR",
    color: "Sunset Coral & White",
    colorHex: "#ff7f50",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    popular: false,
    inStock: true,
    stockCount: 60,
    fabric: "100% Breathable Combed Cotton",
    fit: "Relaxed Everyday Fit",
    care: "Machine wash warm.",
    tags: ["Play Set", "Kids Summer", "Co-ord", "Casual"]
  }
];

export async function seedProducts() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/shoppr";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for product seeding...");

    // Remove existing products and populate full catalog
    await productModel.deleteMany({});
    console.log("Cleared old products.");

    const inserted = await productModel.insertMany(FASHION_PRODUCTS);
    console.log(`Successfully seeded ${inserted.length} high-fashion products with 100% unique images!`);

    const totalCount = await productModel.countDocuments();
    console.log(`Total products now in database: ${totalCount}`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

// Auto-run if executed directly
if (process.argv[1]?.endsWith("seedFashionData.js")) {
  seedProducts();
}
