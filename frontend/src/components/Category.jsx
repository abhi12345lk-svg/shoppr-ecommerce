/* ======================= CATEGORY.JSX — SAVANA-STYLE RESPONSIVE ======================= */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
            image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
            description: "Oversized tees, shirts & chinos"
          },
          {
            name: "Women",
            slug: "women",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            description: "Co-ords, slip dresses & contour tops"
          },
          {
            name: "Footwear",
            slug: "footwear",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
            description: "Chunky sneakers, loafers & boots"
          },
          {
            name: "Winterwear",
            slug: "winterwear",
            image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
            description: "Fleece hoodies & wool overcoats"
          },
          {
            name: "Sportswear",
            slug: "sportswear",
            image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
            description: "Athleisure, trackpants & gear"
          },
          {
            name: "Kids",
            slug: "kids",
            image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
            description: "Activewear & daily comfort"
          }
        ];

  return (
    <section className="py-6 sm:py-10 lg:py-14">
      {/* Section Header */}
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 mb-4 sm:mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400 mb-0.5">
              Curated Departments
            </p>
            <h2 className="font-display text-lg sm:text-2xl lg:text-3xl font-black uppercase text-black tracking-tight">
              Shop By <span className="text-gray-300 font-light">Category</span>
            </h2>
          </div>
          <Link
            to="/collection"
            className="text-[11px] font-bold text-black uppercase tracking-wider border-b border-black hover:border-gray-400 hover:text-gray-500 transition-colors whitespace-nowrap"
          >
            View All
          </Link>
        </div>
      </div>

      {/* ===================================================
          MOBILE: Horizontal scroll circle/portrait cards (like Savana app)
          DESKTOP: 6-column grid
          =================================================== */}

      {/* Mobile — Horizontal scroll list */}
      <div className="lg:hidden overflow-x-auto scrollbar-none pl-4 sm:pl-6">
        <div className="flex gap-3 sm:gap-4 w-max pr-4 sm:pr-6">
          {displayCategories.map((cat, index) => {
            const categorySlug = (cat.slug || cat.name).toLowerCase();
            return (
              <div
                key={index}
                onClick={() => navigate(`/collection/${categorySlug}`)}
                className="flex flex-col items-center cursor-pointer shrink-0 w-[80px] sm:w-[90px]"
              >
                {/* Circle image */}
                <div className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden bg-gray-100 border-2 border-gray-100 hover:border-gray-400 transition-all active:scale-95">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] font-semibold text-center text-gray-800 mt-2 leading-tight">
                  {cat.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop — 6-col grid with portrait cards */}
      <div className="hidden lg:block max-w-[1900px] mx-auto px-10 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-6 gap-3 xl:gap-4">
          {displayCategories.map((cat, index) => {
            const categorySlug = (cat.slug || cat.name).toLowerCase();
            return (
              <div
                key={index}
                onClick={() => navigate(`/collection/${categorySlug}`)}
                className="group flex flex-col cursor-pointer"
              >
                {/* Portrait image */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-display text-sm font-black uppercase text-white leading-tight">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-[10px] text-white/70 mt-0.5 line-clamp-1">{cat.description}</p>
                    )}
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