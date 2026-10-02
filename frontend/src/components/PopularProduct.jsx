/* ======================= POPULARPRODUCT.JSX — FULLY RESPONSIVE TRENDING CAROUSEL ======================= */

import React, { useContext, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FiTrendingUp, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";
import Item from "./Item";

const PopularProducts = () => {
  const { products = [], navigate } = useContext(ShopContext);
  const [activeFilter, setActiveFilter] = useState("all");
  const [popularProducts, setPopularProducts] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    let data = products.filter((item) => item.popular || item.isBestSeller);
    if (data.length < 4) {
      data = products.slice(0, 10);
    }
    if (activeFilter !== "all") {
      data = data.filter(
        (item) => item.category?.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    setPopularProducts(data);
  }, [products, activeFilter]);

  const filterTabs = [
    { id: "all", label: "All Drops" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "footwear", label: "Footwear" },
    { id: "winterwear", label: "Winter Essentials" },
    { id: "sportswear", label: "Sportswear" },
    { id: "kids", label: "Kids" }
  ];

  return (
    <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14 overflow-hidden">
      {/* Header row — stacks on mobile, aligned on desktop */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-600 uppercase tracking-widest mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
            <FiTrendingUp />
            <span>Curated Capsule • Fast Selling Now</span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight">
            Trending{" "}
            <span className="text-gray-400 font-light">Pieces</span>
          </h2>
        </div>

        {/* Right side: Filter pills + Carousel navigation controls */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          {/* Filter pills — scroll horizontally on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 -mx-1 px-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-black text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel arrow controls (hidden on small phone, visible on sm+) */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-2 border-l border-gray-200">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous trending items"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-black hover:text-white hover:border-black text-gray-700 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next trending items"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-black hover:text-white hover:border-black text-gray-700 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Swiper carousel */}
      {popularProducts.length > 0 ? (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={popularProducts.length > 4}
          autoplay={{
            delay: 3800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 2.3, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 14 },
            768: { slidesPerView: 3.5, spaceBetween: 14 },
            1024: { slidesPerView: 4.5, spaceBetween: 16 },
            1280: { slidesPerView: 5.2, spaceBetween: 18 },
            1536: { slidesPerView: 6, spaceBetween: 18 }
          }}
          modules={[Autoplay]}
          className="!overflow-visible"
        >
          {popularProducts.map((product) => (
            <SwiperSlide key={product._id} className="pb-4">
              <Item product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
          <p className="text-gray-500 text-sm">
            No trending items found in this section.
          </p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => navigate("/collection")}
          className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors"
        >
          <span>Explore Entire Catalog</span>
          <FiArrowRight size={13} />
        </button>
      </div>
    </section>
  );
};

export default PopularProducts;