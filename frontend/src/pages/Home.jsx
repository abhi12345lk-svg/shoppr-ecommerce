/* ======================= HOME.JSX (LUXURY EDITORIAL HOMEPAGE) ======================= */

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInstagram, FiZap, FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import Hero from "../components/Hero";
import BrandPromise from "../components/BrandPromise";
import Categories from "../components/Category";
import PopularProducts from "../components/PopularProduct";
import StyleSpotlight from "../components/StyleSpotlight";
import Item from "../components/Item";
import { ShopContext } from "../Context/ShopContext";

const Home = () => {
  const { products, navigate } = useContext(ShopContext);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const newArrivals = products.slice(0, 10);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    toast.success(`Coupon code ${code} copied to clipboard! 🎉`);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const instagramShots = [
    {
      img: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=600&q=80",
      handle: "@ananya.fits",
      tag: "Tailored Linen Suit",
      link: "/collection/women?subCategory=Co-ords"
    },
    {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      handle: "@kabir.style",
      tag: "Oversized Acid Wash Tee",
      link: "/collection/men?subCategory=Oversized Tees"
    },
    {
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      handle: "@zoya.aesthetic",
      tag: "Sculpted Square Neck",
      link: "/collection/women?subCategory=Tops & Bodysuits"
    },
    {
      img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80",
      handle: "@rohan_kicks",
      tag: "Retro Chunky Kicks",
      link: "/collection/footwear?subCategory=Sneakers"
    },
    {
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      handle: "@tara_noir",
      tag: "450 GSM Fleece Hoodie",
      link: "/collection/winterwear?subCategory=Hoodies & Sweats"
    },
    {
      img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=600&q=80",
      handle: "@dev_m",
      tag: "Camp Collar Linen",
      link: "/collection/men?subCategory=Shirts"
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-[#fafafa]">
      {/* 1. HERO BANNER */}
      <Hero />

      {/* 2. FLASH DEAL TICKER ON MOBILE */}
      <div className="md:hidden bg-neutral-950 text-white px-4 py-2.5 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
            FLASH DROP
          </span>
          <span className="text-[10px] text-neutral-300 font-medium truncate max-w-[200px]">
            Flat ₹500 OFF with code <strong>WELCOME500</strong>
          </span>
        </div>
        <button
          onClick={() => handleCopyCoupon("WELCOME500")}
          className="text-[10px] font-black uppercase tracking-wider text-amber-300 underline shrink-0 cursor-pointer"
        >
          {copiedCoupon ? "COPIED ✓" : "COPY CODE →"}
        </button>
      </div>

      {/* 3. VALUE PROPOSITIONS */}
      <BrandPromise />

      {/* 4. SHOP BY DEPARTMENT / CATEGORY */}
      <Categories />

      {/* 5. DUAL SPLIT EDITORIAL BANNERS */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Streetwear Edit */}
          <div
            onClick={() => navigate("/collection/men?subCategory=Oversized Tees")}
            className="group relative rounded-3xl overflow-hidden bg-neutral-950 aspect-[16/10] sm:aspect-[16/9] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-10 text-white ring-1 ring-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1200&q=80"
              alt="Streetwear Capsule"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[3px] text-amber-400 mb-2 block">
                LIMITED DROP
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase leading-tight tracking-tight mb-2">
                The Streetwear Edit
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mb-4">
                Heavyweight boxy tees, parachute cargos, and acid-wash hoodies.
              </p>
              <div className="inline-flex items-center gap-2 bg-white text-neutral-950 font-extrabold uppercase text-[11px] tracking-wider px-5 py-2.5 rounded-xl group-hover:bg-neutral-100 transition-colors shadow-md">
                <span>Shop Streetwear</span>
                <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Contemporary Linen */}
          <div
            onClick={() => navigate("/collection/men?subCategory=Shirts")}
            className="group relative rounded-3xl overflow-hidden bg-neutral-950 aspect-[16/10] sm:aspect-[16/9] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-10 text-white ring-1 ring-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
              alt="Contemporary Linen"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[3px] text-amber-400 mb-2 block">
                SUMMER &amp; RESORT
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase leading-tight tracking-tight mb-2">
                European Linen
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mb-4">
                Breathable 100% pure flax shirts and relaxed holiday trousers.
              </p>
              <div className="inline-flex items-center gap-2 bg-white text-neutral-950 font-extrabold uppercase text-[11px] tracking-wider px-5 py-2.5 rounded-xl group-hover:bg-neutral-100 transition-colors shadow-md">
                <span>Shop Linen</span>
                <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRENDING NOW PIECES (CAROUSEL) */}
      <PopularProducts />

      {/* 7. SHOP BY STYLE CURATED LOOKBOOK */}
      <StyleSpotlight />

      {/* 8. NEW SEASON ARRIVALS GRID */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-neutral-200/70">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-neutral-400 mb-1.5">
              Fresh Off The Atelier
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-neutral-950 tracking-tight">
              New <span className="text-neutral-400 font-light">Arrivals</span>
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1 max-w-lg">
              Explore our latest drop of tailored cuts, streetwear essentials, and contemporary silhouettes.
            </p>
          </div>

          <Link
            to="/collection"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 uppercase tracking-wider hover:text-neutral-600 transition-colors"
          >
            <span>View All New Drops</span>
            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
          {newArrivals.map((product) => (
            <Item key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. PROMOTIONAL STATEMENT BANNER WITH 1-CLICK COPY COUPON */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-7 sm:p-14 lg:p-16 border border-neutral-800 shadow-2xl">
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
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/collection")}
                className="sheen-wrapper btn-dark !bg-white !text-neutral-950 hover:!bg-neutral-100 uppercase text-xs tracking-wider"
              >
                Claim Offer &amp; Shop
              </button>
              <button
                onClick={() => handleCopyCoupon("WELCOME500")}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
              >
                {copiedCoupon ? (
                  <>
                    <FiCheck size={14} className="text-emerald-400" />
                    <span>Copied WELCOME500</span>
                  </>
                ) : (
                  <>
                    <FiCopy size={14} />
                    <span>Copy Code: WELCOME500</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-30 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-amber-500/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 10. INSTAGRAM LOOKBOOK FEED (#ShopprSociety) */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-[2px] mb-2">
            <FiInstagram size={14} />
            <span>#ShopprSociety</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-neutral-950 tracking-tight">
            As Seen On You
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            Tag @shoppr.in on Instagram to be featured in our official fashion lookbook feed.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {instagramShots.map((shot, idx) => (
            <div
              key={idx}
              onClick={() => shot.link && navigate(shot.link)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer shadow-xs active:scale-95 transition-transform"
            >
              <img
                src={shot.img}
                alt={shot.tag}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[11px] font-bold truncate">{shot.handle}</span>
                <span className="text-[10px] text-neutral-300 truncate">{shot.tag}</span>
                <span className="text-[9px] font-black uppercase text-amber-300 mt-1 flex items-center gap-1">
                  <span>View Style</span>
                  <FiArrowRight size={10} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;