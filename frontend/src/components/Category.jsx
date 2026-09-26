/* ======================= CATEGORY.JSX — SAVANA MOBILE STORY BUBBLES + SNITCH DESKTOP EDITORIAL GRID ======================= */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const Categories = () => {
  const { categories, navigate } = useContext(ShopContext);

  const displayCategories =
    categories && categories.length > 0
      ? categories
      : [
          {
            name: "Men",
            slug: "men",
            image:
              "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
            description: "Oversized tees, shirts & chinos",
            badge: "HOT"
          },
          {
            name: "Women",
            slug: "women",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            description: "Co-ords, slip dresses & contour tops",
            badge: "TRENDING"
          },
          {
            name: "Winterwear",
            slug: "winterwear",
            image:
              "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
            description: "Fleece hoodies & wool overcoats",
            badge: "COLD DROP"
          },
          {
            name: "Footwear",
            slug: "footwear",
            image:
              "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
            description: "Chunky sneakers, loafers & boots",
            badge: "RESTOCKED"
          },
          {
            name: "Sportswear",
            slug: "sportswear",
            image:
              "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
            description: "Athleisure, trackpants & gear",
            badge: "ACTIVE"
          },
          {
            name: "Kids",
            slug: "kids",
            image:
              "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
            description: "Activewear & daily comfort",
            badge: "NEW"
          }
        ];

  /* Savana Story Bubbles for phone view */
  const storyBubbles = [
    {
      title: "New In",
      slug: "all",
      badge: "🔥",
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80",
      isLive: true
    },
    {
      title: "Men",
      slug: "men",
      img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Women",
      slug: "women",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Winterwear",
      slug: "winterwear",
      badge: "⚡",
      img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Sneakers",
      slug: "footwear",
      img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Oversized",
      slug: "men",
      img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Sale %",
      slug: "all",
      badge: "🏷️",
      isSale: true,
      img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-6 sm:py-12 overflow-hidden">
      
      {/* ============================================================
          1. SAVANA-STYLE MOBILE STORY BUBBLES (< md)
          Circular reels with gradient rings + quick navigation
          ============================================================ */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-black">
              Explore Drops
            </span>
          </div>
          <Link
            to="/collection"
            className="text-[11px] font-bold text-neutral-500 hover:text-black uppercase"
          >
            All Categories →
          </Link>
        </div>

        {/* Horizontal Scrollable Savana Bubbles */}
        <div className="flex items-center gap-3.5 overflow-x-auto scrollbar-none pb-2 pt-1 -mx-4 px-4">
          {storyBubbles.map((bubble, i) => (
            <button
              key={i}
              onClick={() =>
                bubble.slug === "all"
                  ? navigate("/collection")
                  : navigate(`/collection/${bubble.slug}`)
              }
              className="flex flex-col items-center shrink-0 group focus:outline-none"
            >
              {/* Story Circle with Gradient Ring */}
              <div
                className={`relative p-[2.5px] rounded-full transition-transform duration-200 active:scale-95 ${
                  bubble.isSale
                    ? "bg-gradient-to-tr from-rose-600 via-red-500 to-amber-400"
                    : bubble.isLive
                    ? "bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600"
                    : "bg-gradient-to-tr from-black via-neutral-600 to-neutral-300"
                }`}
              >
                <div className="w-[62px] h-[62px] rounded-full overflow-hidden bg-white p-[2px]">
                  <img
                    src={bubble.img}
                    alt={bubble.title}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Floating badge emoji */}
                {bubble.badge && (
                  <span className="absolute -bottom-1 -right-0.5 bg-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border border-gray-100">
                    {bubble.badge}
                  </span>
                )}
              </div>

              {/* Title below bubble */}
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 mt-1.5 max-w-[68px] truncate text-center">
                {bubble.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          2. SNITCH-STYLE DESKTOP CATEGORY SHOWCASE (md+)
          Large vertical cards, zoom on hover, editorial captions
          ============================================================ */}
      <div className="hidden md:block">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
              Curated Departments
            </p>
            <h2 className="font-display text-2xl lg:text-4xl font-black uppercase text-black tracking-tight">
              Shop By <span className="text-gray-400 font-light">Category</span>
            </h2>
          </div>
          <Link
            to="/collection"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider hover:text-neutral-600 transition-colors"
          >
            <span>View All Categories</span>
            <FiArrowRight size={13} />
          </Link>
        </div>

        {/* 6-Column Grid for Desktop */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {displayCategories.map((cat, index) => {
            const categorySlug = (cat.slug || cat.name).toLowerCase();
            return (
              <div
                key={index}
                onClick={() => navigate(`/collection/${categorySlug}`)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Badge if present */}
                {cat.badge && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                    {cat.badge}
                  </span>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 text-white">
                  <h3 className="font-display text-sm sm:text-base font-black uppercase leading-tight tracking-wide mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-gray-300 line-clamp-1 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {cat.description}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                    <span>Shop Now</span>
                    <FiArrowRight size={11} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default Categories;