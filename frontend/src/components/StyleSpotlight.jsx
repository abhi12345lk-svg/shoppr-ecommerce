/* ======================= STYLESPOTLIGHT.JSX — FULLY RESPONSIVE LOOKBOOK GRID ======================= */

import React, { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiZap } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const StyleSpotlight = () => {
  const { products = [], formatPrice } = useContext(ShopContext);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Styles" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "footwear", label: "Footwear" },
    { id: "winterwear", label: "Winterwear" },
    { id: "sportswear", label: "Sportswear" },
    { id: "kids", label: "Kids" }
  ];

  const allStyles = [
    {
      id: "oversized-tee",
      title: "Oversized Streetwear",
      tag: "Drop Shoulder Graphic Tees",
      category: "men",
      categoryLabel: "Men",
      subCategory: "Oversized Tees",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      link: "/collection/men?subCategory=Oversized Tees",
      badge: "Trending Fit"
    },
    {
      id: "resort-linen",
      title: "Pure European Linen",
      tag: "Resort Cuban Collar Shirts",
      category: "men",
      categoryLabel: "Men",
      subCategory: "Shirts",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      link: "/collection/men?subCategory=Shirts",
      badge: "Summer Drop"
    },
    {
      id: "tactical-cargos",
      title: "Tactical Parachute Cargos",
      tag: "Multi-Pocket Utility Bottoms",
      category: "men",
      categoryLabel: "Men",
      subCategory: "Cargo Pants",
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      link: "/collection/men?subCategory=Cargo Pants",
      badge: "Hot Style"
    },
    {
      id: "tailored-coords",
      title: "Chic Tailored Co-ords",
      tag: "Linen Blazer & Trouser Sets",
      category: "women",
      categoryLabel: "Women",
      subCategory: "Co-ords",
      image:
        "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80",
      link: "/collection/women?subCategory=Co-ords",
      badge: "Power Suit"
    },
    {
      id: "satin-slip",
      title: "Liquid Satin Slip Dresses",
      tag: "Asymmetric Cowl Neckline",
      category: "women",
      categoryLabel: "Women",
      subCategory: "Dresses & Jumpsuits",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      link: "/collection/women?subCategory=Dresses & Jumpsuits",
      badge: "Partywear"
    },
    {
      id: "retro-kicks",
      title: "Retro Platform Kicks",
      tag: "Chunky Cushioned Sneakers",
      category: "footwear",
      categoryLabel: "Footwear",
      subCategory: "Sneakers",
      image:
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      link: "/collection/footwear?subCategory=Sneakers",
      badge: "Best Seller"
    },
    {
      id: "heavy-hoodies",
      title: "450 GSM Heavy Hoodies",
      tag: "Brushed Fleece Winter Drops",
      category: "winterwear",
      categoryLabel: "Winterwear",
      subCategory: "Hoodies & Sweats",
      image:
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
      link: "/collection/winterwear?subCategory=Hoodies & Sweats",
      badge: "Cold Drop"
    },
    {
      id: "active-sets",
      title: "Sculpt Activewear Sets",
      tag: "High-Waisted Gym Leggings",
      category: "sportswear",
      categoryLabel: "Sportswear",
      subCategory: "Performance Tees",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      link: "/collection/sportswear?subCategory=Performance Tees",
      badge: "Performance"
    },
    {
      id: "junior-dungarees",
      title: "Junior Denim Overalls",
      tag: "Brass Buckle Playwear",
      category: "kids",
      categoryLabel: "Kids",
      subCategory: "Pants & Chinos",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
      link: "/collection/kids?subCategory=Pants & Chinos",
      badge: "Junior Drop"
    }
  ];

  // Filtered list based on active tab
  const displayedStyles = useMemo(() => {
    if (selectedFilter === "all") return allStyles;
    return allStyles.filter(
      (item) => item.category.toLowerCase() === selectedFilter.toLowerCase()
    );
  }, [selectedFilter]);

  // Compute live starting prices and counts from product catalog
  const getStyleInfo = (item) => {
    const matching = products.filter((p) => {
      const catMatch = p.category?.toLowerCase() === item.category.toLowerCase();
      const subMatch = item.subCategory
        ? (p.subCategory || "").toLowerCase().includes(item.subCategory.toLowerCase()) ||
          item.subCategory.toLowerCase().includes((p.subCategory || "").toLowerCase())
        : true;
      return catMatch && subMatch;
    });

    if (matching.length === 0) return { count: 0, minPrice: null };

    const minPrice = Math.min(...matching.map((p) => p.offerPrice || p.price));
    return { count: matching.length, minPrice };
  };

  return (
    <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-neutral-200/70">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[3px] font-bold text-neutral-400 mb-1">
            <FiZap className="text-amber-500" />
            <span>Curated Aesthetics • Click To Filter</span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-black uppercase text-neutral-950 tracking-tight">
            Shop By <span className="text-neutral-400 font-light">Style &amp; Fit</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-black text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {displayedStyles.map((item) => {
          const { count, minPrice } = getStyleInfo(item);

          return (
            <Link
              key={item.id}
              to={item.link}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 shadow-sm hover:shadow-2xl transition-all duration-500 block ring-1 ring-white/10"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <span className="bg-white/95 backdrop-blur-md text-neutral-950 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                  {item.badge}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white/90 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 text-white flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-300 block mb-1 truncate">
                    {item.tag}
                  </span>
                  <h3 className="font-display font-black text-sm sm:text-base lg:text-lg uppercase leading-tight mb-1">
                    {item.title}
                  </h3>

                  {/* Pricing / Items Count pill */}
                  <div className="flex items-center gap-2 text-[10px] text-neutral-300 font-medium">
                    {minPrice && (
                      <span className="font-bold text-white">
                        From {formatPrice ? formatPrice(minPrice) : `₹${minPrice}`}
                      </span>
                    )}
                    {count > 0 && (
                      <>
                        <span>•</span>
                        <span>{count} {count === 1 ? "Drop" : "Drops"}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors text-white shadow-xs">
                  <FiArrowUpRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default StyleSpotlight;
