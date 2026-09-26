/* ======================= STYLESPOTLIGHT.JSX — FULLY RESPONSIVE LOOKBOOK GRID ======================= */

import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const StyleSpotlight = () => {
  const styles = [
    {
      title: "Oversized Streetwear",
      tag: "Drop Shoulder Silhouettes",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      link: "/collection?category=men"
    },
    {
      title: "Pure European Linen",
      tag: "Resort & Holiday Fits",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      link: "/collection?category=men"
    },
    {
      title: "Chic Tailored Co-ords",
      tag: "Effortless Power Dressing",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      link: "/collection?category=women"
    },
    {
      title: "Retro Platform Kicks",
      tag: "Chunky Street Footwear",
      image:
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      link: "/collection?category=footwear"
    }
  ];

  return (
    <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-6 sm:mb-8 pb-4 border-b border-gray-100">
        <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
          Curated Aesthetics
        </p>
        <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight">
          Shop By{" "}
          <span className="text-gray-400 font-light">Style</span>
        </h2>
      </div>

      {/* 
        Mobile:  2-column grid (shorter aspect ratio so cards aren't huge)
        Desktop: 4-column grid with taller portrait cards
      */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {styles.map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 shadow-sm hover:shadow-2xl transition-all duration-500 block"
            style={{ aspectRatio: "3 / 4" }}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 text-white flex items-end justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1 truncate">
                  {item.tag}
                </span>
                <h3 className="font-display font-black text-sm sm:text-lg uppercase leading-tight">
                  {item.title}
                </h3>
              </div>

              <div className="shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors text-white">
                <FiArrowUpRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StyleSpotlight;
