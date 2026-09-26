/* ======================= POPULARPRODUCT.JSX — SAVANA-STYLE TRENDING ======================= */

import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";
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
    <section className="py-8 sm:py-12 lg:py-14 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1900px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
        <div className="flex items-end justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400 mb-0.5">Fast Selling Now</p>
            <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight">
              Trending <span className="text-gray-300 font-light">Pieces</span>
            </h2>
          </div>

          {/* Filter pills — always scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {popularProducts.length > 0 ? (
        <>
          {/* MOBILE: 2-col grid — Savana style, no carousel */}
          <div className="sm:hidden px-3 grid grid-cols-2 gap-2">
            {popularProducts.slice(0, 6).map((product) => (
              <Item key={product._id} product={product} />
            ))}
          </div>

          {/* TABLET / DESKTOP: Swiper carousel */}
          <div className="hidden sm:block max-w-[1900px] mx-auto px-6 lg:px-10 xl:px-16 2xl:px-24">
            <Swiper
              loop={popularProducts.length > 4}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 12 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 18 },
                1280: { slidesPerView: 4.5, spaceBetween: 20 },
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
          </div>
        </>
      ) : (
        <div className="max-w-[1900px] mx-auto px-3 sm:px-6">
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
            <p className="text-gray-400 text-sm">No trending items found.</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="max-w-[1900px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 mt-5 sm:mt-6">
        <button
          onClick={() => navigate("/collection")}
          className="w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black border border-black rounded-lg py-3 px-6 hover:bg-black hover:text-white transition-colors sm:border-0 sm:bg-transparent sm:hover:bg-transparent sm:hover:text-neutral-600 sm:rounded-none sm:py-0 sm:px-0"
        >
          <span>Explore Entire Catalog</span>
          <FiArrowRight size={13} className="hidden sm:block" />
        </button>
      </div>
    </section>
  );
};

export default PopularProducts;
