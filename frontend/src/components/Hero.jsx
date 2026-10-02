/* ======================= HERO.JSX — LUXURY EDITORIAL HERO ======================= */

import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap, FiStar } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white">

      {/* ============================================================
          1. SAVANA-STYLE MOBILE HERO (< md)
          ============================================================ */}
      <div
        className="md:hidden relative w-full flex flex-col justify-end min-h-[calc(100svh-100px)]"
      >
        {/* Full-bleed portrait image */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/winter_hero_female_8k.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "72% 8%",
          }}
        />

        {/* Gradient shadow for legible text */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(9,9,11,0.98) 0%, rgba(9,9,11,0.76) 38%, rgba(9,9,11,0.24) 68%, rgba(9,9,11,0.06) 100%)",
          }}
        />

        {/* Floating Top Deal Pill on Mobile */}
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
            <span className="w-8 h-px bg-white/40" />
          </div>

          {/* Headline */}
          <h1
            className="font-display font-black uppercase text-white leading-[0.88] tracking-tight mb-2"
            style={{ fontSize: "clamp(46px, 13vw, 64px)" }}
          >
            WINTER
            <br />
            <span className="text-white/90">ESSENTIALS</span>
          </h1>

          {/* Tagline */}
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 mb-2">
            Heavyweight Fleece &amp; Boxy Overcoats
          </p>

          {/* Short description */}
          <p className="text-xs text-white/65 leading-relaxed mb-5 max-w-xs">
            Street-ready cuts and luxury warmth — engineered exclusively by{" "}
            <span className="font-black text-white">SHOPPR.</span>
          </p>

          {/* Thumb-friendly stacked CTAs */}
          <div className="flex flex-col gap-2.5">
            <Link
              to="/collection/winterwear"
              className="sheen-wrapper flex items-center justify-center gap-2 bg-white text-black font-extrabold uppercase text-[11px] tracking-[0.14em] py-3.5 w-full active:scale-95 transition-all rounded-xl shadow-lg"
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

          {/* Story pagination dots */}
          <div className="flex justify-center mt-4 gap-1.5">
            <span className="w-6 h-1 rounded-full bg-white opacity-95" />
            <span className="w-1.5 h-1 rounded-full bg-white/40" />
            <span className="w-1.5 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* ============================================================
          2. DESKTOP EDITORIAL HERO (md+) — 100% FULL SCREEN VIEWPORT
          ============================================================ */}
      <div
        className="hidden md:flex flex-col justify-between relative w-full h-[calc(100vh-102px)] xl:h-[calc(100vh-108px)] min-h-[660px]"
      >
        {/* 8K Ultra-Sharp Female Fashion Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/winter_hero_female_8k.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "80% 10%",
          }}
        />

        {/* High-fashion left-to-right gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.80) 36%, rgba(9,9,11,0.22) 62%, rgba(9,9,11,0.01) 100%)",
          }}
        />

        {/* Ambient radial glow */}
        <div
          aria-hidden="true"
          className="absolute -left-20 top-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Main Content Area — Centered Vertically */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 lg:py-14 my-auto flex-1 flex flex-col justify-center">
          <div className="max-w-xl lg:max-w-2xl animate-fadeIn">

            {/* Editorial Eyebrow Tag */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-[4px] text-amber-400">
                A/W '26 CAPSULE COLLECTION
              </span>
              <span className="w-16 h-px bg-white/40" />
              <span className="flex items-center gap-1 text-[11px] text-neutral-300 font-semibold bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                <FiStar className="text-amber-400 fill-amber-400" size={10} />
                <span>4.9 / 5</span>
              </span>
            </div>

            {/* Luxury Headline */}
            <h1
              className="font-display font-black uppercase text-white leading-[0.88] tracking-tight mb-4"
              style={{ fontSize: "clamp(58px, 7.8vw, 98px)" }}
            >
              WINTER
              <br />
              <span className="text-neutral-200">ESSENTIALS</span>
            </h1>

            {/* Subheading */}
            <p className="text-xs lg:text-sm font-bold uppercase tracking-[0.24em] text-neutral-300 mb-3">
              Crafted for the modern urban silhouette.
            </p>

            {/* Editorial Body */}
            <p className="text-sm lg:text-[15px] text-neutral-300/80 leading-relaxed max-w-md mb-8">
              Discover double-breasted wool overcoats, 450 GSM heavyweight fleece hoodies,
              and tailored layering pieces designed for effortless warmth.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/collection/winterwear"
                className="sheen-wrapper group inline-flex items-center gap-3 bg-white text-black hover:bg-neutral-100 active:scale-95 font-extrabold uppercase text-xs tracking-[0.16em] px-8 py-4 transition-all shadow-xl rounded-xl"
              >
                <span>SHOP COLLECTION</span>
                <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 active:scale-95 font-extrabold uppercase text-xs tracking-[0.16em] px-8 py-4 transition-all rounded-xl"
              >
                <span>EXPLORE ALL DROPS</span>
                <FiArrowRight size={15} />
              </Link>
            </div>

            {/* Quick discovery pills */}
            <div className="mt-8 flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
              <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Popular:</span>
              <Link to="/collection/men?subCategory=Oversized Tees" className="hover:text-white underline underline-offset-4 decoration-neutral-600 transition-colors">
                Oversized Tees
              </Link>
              <span>•</span>
              <Link to="/collection/men?subCategory=Cargo Pants" className="hover:text-white underline underline-offset-4 decoration-neutral-600 transition-colors">
                Parachute Cargos
              </Link>
              <span>•</span>
              <Link to="/collection/women?subCategory=Co-ords" className="hover:text-white underline underline-offset-4 decoration-neutral-600 transition-colors">
                Tailored Co-ords
              </Link>
              <span>•</span>
              <Link to="/collection/footwear" className="hover:text-white underline underline-offset-4 decoration-neutral-600 transition-colors">
                Platform Kicks
              </Link>
            </div>

          </div>
        </div>

        {/* Feature Perks Strip */}
        <div className="relative z-10 w-full border-t border-white/15 bg-black/50 backdrop-blur-md py-4">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between text-[11px] font-bold uppercase tracking-[2px] text-white/75">
            <span className="flex items-center gap-2">
              <span className="text-amber-400">✦</span> 450 GSM Heavyweight Fleece
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="text-amber-400">✦</span> Relaxed Boxy Street Silhouette
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