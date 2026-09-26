/* ======================= HERO.JSX — SAVANA MOBILE PORTRAIT + SNITCH DESKTOP EDITORIAL ======================= */

import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0d0d] text-white">

      {/* ============================================================
          1. SAVANA-STYLE MOBILE HERO (< md)
          Full-height portrait with Savana badges, bold title & quick shop
          ============================================================ */}
      <div
        className="md:hidden relative w-full flex flex-col justify-end"
        style={{ minHeight: "calc(100svh - 130px)", maxHeight: "780px" }}
      >
        {/* Full-bleed portrait image */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/winter_hero_banner.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "82% 8%",
          }}
        />

        {/* Gradient shadow for legible text */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 36%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Savana Floating Top Deal Pill on Mobile */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <FiZap size={11} />
            <span>FLAT 50% OFF</span>
          </span>
          <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            TRENDING
          </span>
        </div>

        {/* Content pinned to bottom */}
        <div className="relative z-10 px-4 pb-6 pt-28 animate-fadeIn">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[3px] text-amber-400">
              A/W '26 CAPSULE
            </span>
            <span className="w-6 h-px bg-white/40" />
          </div>

          {/* Headline */}
          <h1
            className="font-display font-black uppercase text-white leading-[0.88] tracking-tight mb-2"
            style={{ fontSize: "clamp(46px, 13vw, 64px)" }}
          >
            WINTER
            <br />
            ESSENTIALS
          </h1>

          {/* Tagline */}
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 mb-2">
            Heavyweight Fleece &amp; Boxy Overcoats
          </p>

          {/* Short description */}
          <p className="text-xs text-white/60 leading-relaxed mb-5 max-w-xs">
            Street-ready cuts and luxury warmth — engineered exclusively by{" "}
            <span className="font-black text-white">SHOPPR.</span>
          </p>

          {/* Savana Thumb-friendly stacked CTAs */}
          <div className="flex flex-col gap-2">
            <Link
              to="/collection/winterwear"
              className="flex items-center justify-center gap-2 bg-white text-black font-extrabold uppercase text-[11px] tracking-[0.14em] py-3.5 w-full active:scale-95 transition-all rounded-xl shadow-lg"
            >
              <span>SHOP COLLECTION</span>
              <FiArrowRight size={14} />
            </Link>
            <Link
              to="/collection"
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-extrabold uppercase text-[11px] tracking-[0.14em] py-3.5 w-full active:scale-95 transition-all rounded-xl hover:bg-white/20"
            >
              <span>EXPLORE ALL DROPS</span>
              <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Savana-style story pagination dots */}
          <div className="flex justify-center mt-4 gap-1.5">
            <span className="w-6 h-1 rounded-full bg-white opacity-95" />
            <span className="w-1.5 h-1 rounded-full bg-white/40" />
            <span className="w-1.5 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* ============================================================
          2. SNITCH-STYLE DESKTOP HERO (md+)
          Wide landscape editorial, clean typography & features strip
          ============================================================ */}
      <div
        className="hidden md:flex flex-col justify-between relative w-full"
        style={{ minHeight: "clamp(500px, 52vw, 680px)" }}
      >
        {/* Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/winter_hero_banner.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "72% 12%",
          }}
        />

        {/* Snitch-style dark left-to-right gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.74) 32%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.06) 100%)",
          }}
        />

        {/* Main Content Area */}
        <div className="relative z-10 w-full max-w-[1900px] mx-auto px-10 lg:px-16 xl:px-20 2xl:px-28 py-16 lg:py-24 my-auto">
          <div className="max-w-xl lg:max-w-2xl animate-fadeIn">

            {/* Snitch Eyebrow Tag */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-[4px] text-amber-400">
                A/W '26 CAPSULE COLLECTION
              </span>
              <span className="w-16 h-px bg-white/40" />
            </div>

            {/* Massive Snitch Headline */}
            <h1
              className="font-display font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontSize: "clamp(56px, 7.5vw, 94px)" }}
            >
              WINTER
              <br />
              ESSENTIALS
            </h1>

            {/* Subheading */}
            <p className="text-xs lg:text-sm font-bold uppercase tracking-[0.22em] text-white/80 mb-3">
              Crafted for the modern silhouette.
            </p>

            {/* Editorial Body */}
            <p className="text-sm lg:text-[15px] text-white/65 leading-relaxed max-w-md mb-8">
              Discover double-breasted wool overcoats, 450 GSM heavyweight fleece hoodies,
              and tailored layering pieces designed for urban warmth.
            </p>

            {/* Snitch-style CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/collection/winterwear"
                className="inline-flex items-center gap-2.5 bg-white text-black hover:bg-neutral-200 active:scale-95 font-extrabold uppercase text-xs tracking-[0.16em] px-8 py-4 transition-all shadow-xl rounded-sm"
              >
                <span>SHOP COLLECTION</span>
                <FiArrowRight size={15} />
              </Link>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/40 text-white hover:bg-white/20 active:scale-95 font-extrabold uppercase text-xs tracking-[0.16em] px-8 py-4 transition-all rounded-sm"
              >
                <span>EXPLORE ALL DROPS</span>
                <FiArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>

        {/* Snitch Bottom Feature Perks Strip */}
        <div className="relative z-10 w-full border-t border-white/15 bg-black/40 backdrop-blur-md py-3.5 px-10 lg:px-16 xl:px-20">
          <div className="max-w-[1900px] mx-auto flex items-center justify-between text-[11px] font-bold uppercase tracking-[2px] text-white/70">
            <span className="flex items-center gap-2">
              <span className="text-amber-400">✦</span> 450 GSM Heavy Fleece
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="text-amber-400">✦</span> Relaxed Boxy Fit
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="text-amber-400">✦</span> 100% European Wool Blend
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✦</span> Free Delivery Over ₹999
            </span>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;