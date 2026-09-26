/* ======================= HOME.JSX (SNITCH DESKTOP + SAVANA MOBILE) ======================= */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInstagram, FiZap } from "react-icons/fi";
import Hero from "../components/Hero";
import BrandPromise from "../components/BrandPromise";
import Categories from "../components/Category";
import PopularProducts from "../components/PopularProduct";
import StyleSpotlight from "../components/StyleSpotlight";
import Item from "../components/Item";
import { ShopContext } from "../Context/ShopContext";

const Home = () => {
  const { products, navigate } = useContext(ShopContext);

  const newArrivals = products.slice(0, 10);

  const instagramShots = [
    {
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      handle: "@ananya.fits",
      tag: "Tailored Linen Suit"
    },
    {
      img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
      handle: "@kabir.style",
      tag: "Oversized Acid Wash Tee"
    },
    {
      img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
      handle: "@zoya.aesthetic",
      tag: "Sculpted Square Neck"
    },
    {
      img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
      handle: "@rohan_kicks",
      tag: "Retro Chunky Kicks"
    },
    {
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      handle: "@tara_noir",
      tag: "450 GSM Fleece Hoodie"
    },
    {
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      handle: "@dev_m",
      tag: "Camp Collar Linen"
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-[#fafafa]">
      {/* 1. HERO BANNER (SAVANA MOBILE + SNITCH DESKTOP) */}
      <Hero />

      {/* 2. SAVANA-STYLE FLASH DEAL TICKER ON MOBILE */}
      <div className="md:hidden bg-neutral-900 text-white px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
            FLASH DROP
          </span>
          <span className="text-[10px] text-gray-300 font-medium truncate max-w-[200px]">
            Flat ₹500 OFF with code <strong>WELCOME500</strong>
          </span>
        </div>
        <Link
          to="/collection"
          className="text-[10px] font-black uppercase tracking-wider text-white underline shrink-0"
        >
          CLAIM →
        </Link>
      </div>

      {/* 3. TRUST & REASSURANCE VALUE PROPOSITIONS */}
      <BrandPromise />

      {/* 4. SHOP BY DEPARTMENT / CATEGORY (SAVANA STORY BUBBLES ON MOBILE + SNITCH GRID ON DESKTOP) */}
      <Categories />

      {/* 5. SNITCH-STYLE DUAL SPLIT EDITORIAL BANNERS */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Streetwear Edit */}
          <div
            onClick={() => navigate("/collection/men")}
            className="group relative rounded-3xl overflow-hidden bg-neutral-950 aspect-[16/10] sm:aspect-[16/9] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-10 text-white"
          >
            <img
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80"
              alt="Streetwear Capsule"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[3px] text-amber-400 mb-2 block">
                LIMITED DROP
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase leading-tight tracking-tight mb-2">
                The Streetwear Edit
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm mb-4">
                Heavyweight boxy tees, parachute cargos, and acid-wash hoodies.
              </p>
              <div className="inline-flex items-center gap-2 bg-white text-black font-extrabold uppercase text-[11px] tracking-wider px-5 py-2.5 rounded-xl group-hover:bg-neutral-200 transition-colors">
                <span>Shop Streetwear</span>
                <FiArrowRight size={13} />
              </div>
            </div>
          </div>

          {/* Card 2: Contemporary Linen */}
          <div
            onClick={() => navigate("/collection")}
            className="group relative rounded-3xl overflow-hidden bg-neutral-950 aspect-[16/10] sm:aspect-[16/9] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-10 text-white"
          >
            <img
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80"
              alt="Contemporary Linen"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[3px] text-amber-400 mb-2 block">
                SUMMER &amp; RESORT
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase leading-tight tracking-tight mb-2">
                European Linen
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm mb-4">
                Breathable 100% pure flax shirts and relaxed holiday trousers.
              </p>
              <div className="inline-flex items-center gap-2 bg-white text-black font-extrabold uppercase text-[11px] tracking-wider px-5 py-2.5 rounded-xl group-hover:bg-neutral-200 transition-colors">
                <span>Shop Linen</span>
                <FiArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRENDING NOW PIECES (CAROUSEL) */}
      <PopularProducts />

      {/* 7. SHOP BY STYLE CURATED LOOKBOOK */}
      <StyleSpotlight />

      {/* 8. NEW SEASON ARRIVALS GRID (SAVANA 2-COL MOBILE + SNITCH 4-COL DESKTOP) */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1.5">
              Fresh Off The Rack
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
              New <span className="text-gray-400 font-light">Arrivals</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-lg">
              Explore our latest drop of tailored cuts, streetwear essentials, and contemporary silhouettes.
            </p>
          </div>

          <Link
            to="/collection"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider hover:text-neutral-600 transition-colors"
          >
            <span>View All New Drops</span>
            <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
          {newArrivals.map((product) => (
            <Item key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. PROMOTIONAL STATEMENT BANNER */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-7 sm:p-14 lg:p-16 border border-neutral-800">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[3px] text-amber-400 mb-2 sm:mb-3 block">
              Limited Festive Offer
            </span>
            <h3 className="font-display text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
              Flat ₹500 OFF On Your First Order
            </h3>
            <p className="text-neutral-300 text-xs sm:text-base mt-3 sm:mt-4 leading-relaxed">
              Use code <strong className="text-white border-b border-amber-400 pb-0.5 font-black tracking-wider">WELCOME500</strong> at checkout on orders above ₹1,999. Includes free express delivery.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/collection")}
                className="btn-dark !bg-white !text-black hover:!bg-neutral-200 uppercase text-xs tracking-wider"
              >
                Claim Offer &amp; Shop
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-30 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-amber-500/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 10. INSTAGRAM LOOKBOOK FEED (#ShopprSociety) */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-[2px] mb-2">
            <FiInstagram size={14} />
            <span>#ShopprSociety</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
            As Seen On You
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Tag @shoppr.in on Instagram to be featured in our official fashion lookbook feed.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {instagramShots.map((shot, idx) => (
            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer shadow-xs">
              <img
                src={shot.img}
                alt={shot.tag}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[11px] font-bold truncate">{shot.handle}</span>
                <span className="text-[10px] text-gray-300 truncate">{shot.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;