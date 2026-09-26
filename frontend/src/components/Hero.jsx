/* ======================= HERO.JSX — FULL-SCREEN MOBILE + EDITORIAL DESKTOP ======================= */

import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0d0d] text-white">

      {/* ============================================================
          MOBILE HERO  (< md)  — Full viewport height, portrait style
          Model fills the screen, text pinned to bottom overlay
          ============================================================ */}
      <div
        className="md:hidden relative w-full flex flex-col justify-end"
        style={{ height: "100svh", minHeight: "580px", maxHeight: "900px" }}
      >
        {/* Full-bleed portrait image */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/winter_hero_banner.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            /* Shift RIGHT so the model's face/chest fills the mobile portrait frame */
            backgroundPosition: "82% 8%",
          }}
        />

        {/* Dark gradient from bottom — keeps text readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 35%, rgba(0,0,0,0.28) 65%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Content — pinned to bottom */}
        <div className="relative z-10 px-5 pb-8 pt-32 animate-fadeIn">

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[4px] text-white/70">
              NEW SEASON
            </span>
            <span className="w-8 h-px bg-white/40" />
          </div>

          {/* Headline */}
          <h1
            className="font-display font-black uppercase text-white leading-[0.88] tracking-tight mb-3"
            style={{ fontSize: "clamp(52px, 14vw, 72px)" }}
          >
            WINTER
            <br />
            ESSENTIALS
          </h1>

          {/* Tagline */}
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/75 mb-2">
            Stay Warm. Stay Stylish.
          </p>

          {/* Short body */}
          <p className="text-[13px] text-white/60 leading-relaxed mb-6 max-w-xs">
            Jackets, hoodies &amp; sweaters — only at{" "}
            <span className="font-black text-white">SHOPPR.</span>
          </p>

          {/* CTAs stacked for thumb-friendly tap */}
          <div className="flex flex-col gap-2.5">
            <Link
              to="/collection/winterwear"
              className="flex items-center justify-center gap-2 bg-white text-black font-extrabold uppercase text-[11px] tracking-[0.15em] py-4 w-full active:scale-95 transition-all rounded-sm"
            >
              <span>SHOP COLLECTION</span>
              <FiArrowRight size={14} />
            </Link>
            <Link
              to="/collection"
              className="flex items-center justify-center gap-2 border border-white/40 text-white font-extrabold uppercase text-[11px] tracking-[0.15em] py-4 w-full active:scale-95 transition-all bg-transparent rounded-sm hover:bg-white/10"
            >
              <span>NEW ARRIVALS</span>
              <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Scroll hint dot */}
          <div className="flex justify-center mt-5 gap-1.5">
            <span className="w-5 h-1 rounded-full bg-white opacity-90" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP HERO  (md+) — Left text, right model, landscape
          ============================================================ */}
      <div
        className="hidden md:flex items-center relative w-full"
        style={{ minHeight: "clamp(480px, 55vw, 680px)" }}
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/winter_hero_banner.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "70% 12%",
          }}
        />

        {/* Desktop gradient — darken only left side */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.70) 30%, rgba(0,0,0,0.32) 58%, rgba(0,0,0,0.04) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1900px] mx-auto px-10 lg:px-16 xl:px-20 2xl:px-28 py-16 lg:py-20">
          <div className="max-w-xl lg:max-w-2xl animate-fadeIn">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-[4px] text-white/75">
                NEW SEASON
              </span>
              <span className="w-14 h-px bg-white/40" />
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontSize: "clamp(56px, 7.5vw, 96px)" }}
            >
              WINTER
              <br />
              ESSENTIALS
            </h1>

            {/* Tagline */}
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80 mb-3">
              Stay Warm. Stay Stylish.
            </p>

            {/* Body copy */}
            <p className="text-[14px] sm:text-[15px] text-white/65 leading-relaxed max-w-md mb-9">
              Discover our handpicked collection of jackets, hoodies, sweaters and
              more — only at{" "}
              <span className="font-black text-white">SHOPPR.</span>
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/collection/winterwear"
                className="inline-flex items-center gap-2.5 bg-white text-black hover:bg-neutral-100 active:scale-95 font-extrabold uppercase text-xs tracking-[0.15em] px-8 py-4 transition-all shadow-xl rounded-sm"
              >
                <span>SHOP COLLECTION</span>
                <FiArrowRight size={15} />
              </Link>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2.5 border border-white/40 text-white hover:bg-white/10 active:scale-95 font-extrabold uppercase text-xs tracking-[0.15em] px-8 py-4 transition-all rounded-sm"
              >
                <span>NEW ARRIVALS</span>
                <FiArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;