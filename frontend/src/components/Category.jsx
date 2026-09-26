/* ======================= CATEGORY.JSX — FULLY RESPONSIVE DEPARTMENT GRID ======================= */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
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
            subCategories: ["Oversized Tees", "Shirts", "Cargos"]
          },
          {
            name: "Women",
            slug: "women",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            description: "Co-ords, slip dresses & contour tops",
            subCategories: ["Dresses", "Co-ords", "Tops"]
          },
          {
            name: "Footwear",
            slug: "footwear",
            image:
              "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
            description: "Chunky sneakers, loafers & boots",
            subCategories: ["Sneakers", "Loafers"]
          },
          {
            name: "Winterwear",
            slug: "winterwear",
            image:
              "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
            description: "Fleece hoodies & wool overcoats",
            subCategories: ["Hoodies", "Overcoats"]
          },
          {
            name: "Sportswear",
            slug: "sportswear",
            image:
              "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
            description: "Athleisure, trackpants & gear",
            subCategories: ["Joggers", "Tees"]
          },
          {
            name: "Kids",
            slug: "kids",
            image:
              "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
            description: "Activewear & daily comfort",
            subCategories: ["Polos", "Pants"]
          }
        ];

  return (
    <section className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-10 sm:py-14 overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-100">
        <div>
          <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
            Curated Departments
          </p>
          <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight">
            Shop By{" "}
            <span className="text-gray-400 font-light">Category</span>
          </h2>
        </div>
        <Link
          to="/collection"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider hover:text-neutral-600 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <span>View All</span>
          <FiArrowRight size={13} />
        </Link>
      </div>

      {/* 
        Mobile:  3-column horizontal scroll (portrait cards feel like app story circles)
        Tablet:  3-col grid
        Desktop: 6-col grid
      */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 lg:gap-5">
        {displayCategories.map((cat, index) => {
          const categorySlug = (cat.slug || cat.name).toLowerCase();
          return (
            <div
              key={index}
              onClick={() => navigate(`/collection/${categorySlug}`)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Card */}
              <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient footer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Label inside card — hidden on very small mobile, visible sm+ */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                  <h3 className="font-display text-xs sm:text-sm font-black uppercase text-white leading-tight tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Label below card on mobile for readability */}
              <p className="text-center text-[10px] sm:hidden font-bold uppercase tracking-wider text-gray-700 mt-1.5">
                {cat.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;