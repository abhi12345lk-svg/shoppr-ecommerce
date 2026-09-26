/* ======================= POPULARPRODUCT.JSX — FULLY RESPONSIVE TRENDING CAROUSEL ======================= */

import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";
import Item from "./Item";

const PopularProducts = () => {
  const { products = [], navigate } = useContext(ShopContext);
  const [activeFilter, setActiveFilter] = useState("all");
  const [popularProducts, setPopularProducts] = useState([]);

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
    { id: "all", label: "All" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "footwear", label: "Footwear" },
    { id: "winterwear", label: "Winter" }
  ];

  return (
    <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14 overflow-hidden">
      {/* Header row — stacks on mobile */}
      <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
            <FiTrendingUp />
            <span>Fast Selling Now</span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight">
            Trending{" "}
            <span className="text-gray-400 font-light">Pieces</span>
          </h2>
        </div>

        {/* Filter pills — scroll horizontally on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 -mx-1 px-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper carousel — more visible slides on mobile (1.6), more on desktop (5) */}
      {popularProducts.length > 0 ? (
        <Swiper
          loop={popularProducts.length > 4}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            /* 320px — tiny phone: show 1.6 cards */
            320: { slidesPerView: 1.6, spaceBetween: 10 },
            /* 480px — larger phone: show 2 cards */
            480: { slidesPerView: 2.1, spaceBetween: 12 },
            /* 640px — small tablet: show 2.5 */
            640: { slidesPerView: 2.5, spaceBetween: 14 },
            /* 768px — tablet: show 3 */
            768: { slidesPerView: 3, spaceBetween: 16 },
            /* 1024px — desktop: show 4 */
            1024: { slidesPerView: 4, spaceBetween: 18 },
            /* 1280px — large desktop: show 4.5 */
            1280: { slidesPerView: 4.5, spaceBetween: 20 },
            /* 1536px — 2xl: show 5 */
            1536: { slidesPerView: 5, spaceBetween: 22 }
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
      <div className="mt-6 sm:mt-8 text-center">
        <button
          onClick={() => navigate("/collection")}
          className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black hover:underline"
        >
          <span>Explore Entire Catalog</span>
          <FiArrowRight size={13} />
        </button>
      </div>
    </section>
  );
};

export default PopularProducts;