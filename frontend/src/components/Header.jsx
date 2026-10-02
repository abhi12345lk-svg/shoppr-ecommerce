/* ======================= HEADER.JSX (SNITCH DESKTOP + SAVANA MOBILE) ======================= */

import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiPackage,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiArrowRight,
  FiPercent
} from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";
import MarqueeBanner from "./MarqueeBanner";

const Header = () => {
  const location = useLocation();

  const {
    navigate,
    user,
    logout,
    setShowUserLogin,
    getCartCount,
    getWishlistCount,
    searchQuery,
    setSearchQuery,
    products,
    formatPrice
  } = useContext(ShopContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef(null);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= KEYBOARD SHORTCUT (CTRL+K / CMD+K) ================= */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ================= FOCUS ON SEARCH ================= */
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchModal]);

  /* ================= LIVE SEARCH MATCHES ================= */
  const searchMatches =
    searchQuery.trim().length > 1
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.subCategory &&
                p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (p.tags &&
                p.tags.some((t) =>
                  t.toLowerCase().includes(searchQuery.toLowerCase())
                ))
          )
          .slice(0, 5)
      : [];

  const popularSearches = [
    "Winter Essentials",
    "Overcoats",
    "Oversized Tees",
    "Linen Shirts",
    "Parachute Pants",
    "Platform Kicks"
  ];

  /* ================= NAVIGATION ITEMS WITH REAL WORKING ROUTES & FILTERS ================= */
  const navItems = [
    {
      label: "NEW ARRIVALS",
      path: "/collection?filter=new",
      isHighlighted: true,
      hasDropdown: false
    },
    {
      label: "MEN",
      path: "/collection/men",
      hasDropdown: true,
      preview: {
        title: "Streetwear Drops",
        subtitle: "Heavyweight boxy tees, cargos & relaxed layers",
        image:
          "https://images.unsplash.com/photo-1550995694-3f5f4a7e1ed2?auto=format&fit=crop&w=500&q=80",
        tag: "NEW SEASON",
        path: "/collection/men?subCategory=Oversized Tees"
      },
      subItems: [
        { label: "Oversized Tees", path: "/collection/men?subCategory=Oversized Tees" },
        { label: "Casual & Resort Shirts", path: "/collection/men?subCategory=Shirts" },
        { label: "Tactical Cargo Pants", path: "/collection/men?subCategory=Cargo Pants" },
        { label: "Selvedge Jeans & Trousers", path: "/collection/men?subCategory=Jeans & Trousers" },
        { label: "View All Men", path: "/collection/men", isBold: true }
      ]
    },
    {
      label: "WOMEN",
      path: "/collection/women",
      hasDropdown: true,
      preview: {
        title: "Chic Tailored Fits",
        subtitle: "Co-ord sets, contour tops & trousers",
        image:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&q=80",
        tag: "TRENDING NOW",
        path: "/collection/women?subCategory=Co-ords"
      },
      subItems: [
        { label: "Tops & Bodysuits", path: "/collection/women?subCategory=Tops & Bodysuits" },
        { label: "Dresses & Jumpsuits", path: "/collection/women?subCategory=Dresses & Jumpsuits" },
        { label: "Tailored Co-ords", path: "/collection/women?subCategory=Co-ords" },
        { label: "Jeans & Trousers", path: "/collection/women?subCategory=Jeans & Trousers" },
        { label: "View All Women", path: "/collection/women", isBold: true }
      ]
    },
    {
      label: "SHIRTS & TEES",
      path: "/collection?type=topwear",
      hasDropdown: true,
      preview: {
        title: "Pure European Linen",
        subtitle: "Breathable holiday shirts & camp collars",
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80",
        tag: "BESTSELLERS",
        path: "/collection?subCategory=Shirts"
      },
      subItems: [
        { label: "Oversized Graphic Tees", path: "/collection?subCategory=Oversized Tees" },
        { label: "European Linen Shirts", path: "/collection?subCategory=Shirts" },
        { label: "Women's Contour Tops", path: "/collection/women?subCategory=Tops & Bodysuits" },
        { label: "Heavyweight Hoodies", path: "/collection/winterwear?subCategory=Hoodies & Sweats" },
        { label: "All Shirts & Tops", path: "/collection?type=topwear", isBold: true }
      ]
    },
    {
      label: "CARGOS & BOTTOMS",
      path: "/collection?type=bottomwear",
      hasDropdown: true,
      preview: {
        title: "Parachute & Cargos",
        subtitle: "Multi-pocket technical utility",
        image:
          "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=500&q=80",
        tag: "HOT STYLES",
        path: "/collection?subCategory=Cargo Pants"
      },
      subItems: [
        { label: "Parachute & Cargo Pants", path: "/collection?subCategory=Cargo Pants" },
        { label: "Raw Selvedge Denim", path: "/collection?subCategory=Jeans & Trousers" },
        { label: "Relaxed Linen Trousers", path: "/collection?subCategory=Jeans & Trousers" },
        { label: "All Cargos & Bottoms", path: "/collection?type=bottomwear", isBold: true }
      ]
    },
    {
      label: "WINTER WEAR",
      path: "/collection/winterwear",
      hasDropdown: true,
      preview: {
        title: "Winter Essentials",
        subtitle: "Double-breasted overcoats & 450 GSM fleece",
        image:
          "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=500&q=80",
        tag: "LIMITED DROP",
        path: "/collection/winterwear?subCategory=Trench & Wool Coats"
      },
      subItems: [
        { label: "450 GSM Heavy Hoodies", path: "/collection/winterwear?subCategory=Hoodies & Sweats" },
        { label: "Trench & Wool Coats", path: "/collection/winterwear?subCategory=Trench & Wool Coats" },
        { label: "Explore Winter Drop", path: "/collection/winterwear", isBold: true }
      ]
    },
    {
      label: "FOOTWEAR",
      path: "/collection/footwear",
      hasDropdown: true,
      preview: {
        title: "Retro Street Kicks",
        subtitle: "High-density cushioned platforms & leather loafers",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80",
        tag: "RESTOCKED",
        path: "/collection/footwear?subCategory=Sneakers"
      },
      subItems: [
        { label: "Chunky Platform Sneakers", path: "/collection/footwear?subCategory=Sneakers" },
        { label: "Burnished Penny Loafers", path: "/collection/footwear?subCategory=Loafers & Formals" },
        { label: "All Footwear & Kicks", path: "/collection/footwear", isBold: true }
      ]
    },
    {
      label: "SALE",
      path: "/collection?sale=true",
      isSale: true,
      hasDropdown: false
    }
  ];

  return (
    <>
      {/* ================= 1. SNITCH-STYLE DESKTOP TOP TICKER ================= */}
      <MarqueeBanner />

      {/* ================= 2. MAIN HEADER (SNITCH DESKTOP + SAVANA MOBILE) ================= */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-neutral-200/80"
            : "bg-white border-neutral-200/50"
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="h-[60px] sm:h-[70px] xl:h-[76px] flex items-center justify-between gap-3">

            {/* ================= LEFT: LOGO & MOBILE HAMBURGER ================= */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open mobile menu"
                className="xl:hidden p-2 -ml-2 text-neutral-900 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <FiMenu size={22} />
              </button>

              <Link
                to="/"
                className="flex items-center select-none group"
              >
                <span className="font-display text-[22px] sm:text-[27px] font-black uppercase text-neutral-950 tracking-[-0.03em] transition-transform group-hover:scale-[1.01]">
                  SHOPPR
                </span>
                <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block ml-1 group-hover:bg-amber-500 transition-colors" />
                <span className="hidden sm:inline-block ml-2 text-[9px] font-black tracking-[0.2em] uppercase text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                  EST. 2026
                </span>
              </Link>
            </div>

            {/* ================= CENTER: SNITCH-STYLE DESKTOP NAVBAR LINKS ================= */}
            <nav className="hidden xl:flex items-center justify-center gap-6 lg:gap-7 2xl:gap-8 h-full">
              {navItems.map((item, index) => {
                const fullCurrentUrl = `${location.pathname}${location.search}`;
                const isCurrentActive = item.isSale
                  ? location.search.includes("sale=true")
                  : item.label === "NEW ARRIVALS"
                  ? location.search.includes("filter=new")
                  : item.path.includes("?")
                  ? fullCurrentUrl === item.path
                  : location.pathname === item.path && !location.search;

                return (
                  <div
                    key={index}
                    className="relative h-full flex items-center group"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1 text-[13px] tracking-[0.5px] uppercase font-bold transition-all py-2 ${
                          item.isSale
                            ? "text-rose-600 hover:text-rose-700 font-extrabold"
                            : isCurrentActive
                            ? "text-black relative after:absolute after:bottom-[-24px] after:left-0 after:right-0 after:h-[2px] after:bg-black font-extrabold"
                            : "text-neutral-700 hover:text-black"
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <FiChevronDown
                          size={12}
                          className="text-neutral-400 group-hover:rotate-180 transition-transform duration-200 stroke-[2.5]"
                        />
                      )}
                    </NavLink>

                    {/* ================= SNITCH-STYLE MEGA DROPDOWN WITH VISUAL CAMPAIGN PREVIEW ================= */}
                    {item.hasDropdown && activeDropdown === item.label && (
                      <div className="absolute top-[74px] left-0 min-w-[480px] bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 grid grid-cols-2 gap-4">
                        {/* Left Column: Subcategory list */}
                        <div className="flex flex-col gap-1 pr-2 border-r border-neutral-100">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-3 py-1">
                            Curated Categories
                          </p>
                          {item.subItems?.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              to={sub.path}
                              onClick={() => setActiveDropdown(null)}
                              className={`px-3 py-2 text-xs uppercase rounded-xl transition-colors flex items-center justify-between ${
                                sub.isBold
                                  ? "font-black text-black bg-neutral-50 hover:bg-neutral-100 mt-1 border-t border-neutral-100 pt-2"
                                  : "font-semibold text-neutral-600 hover:text-black hover:bg-neutral-50"
                              }`}
                            >
                              <span>{sub.label}</span>
                              {sub.isBold && <FiArrowRight size={12} />}
                            </Link>
                          ))}
                        </div>

                        {/* Right Column: Visual editorial card (Snitch signature) */}
                        {item.preview && (
                          <Link
                            to={item.preview.path || item.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group/card relative rounded-xl overflow-hidden bg-neutral-900 aspect-[4/3] flex flex-col justify-end p-3.5 text-white"
                          >
                            <img
                              src={item.preview.image}
                              alt={item.preview.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                            <div className="relative z-10">
                              <span className="text-[9px] font-black uppercase tracking-[2px] text-amber-300 block mb-1">
                                {item.preview.tag}
                              </span>
                              <h4 className="font-display text-xs font-black uppercase leading-tight">
                                {item.preview.title}
                              </h4>
                              <p className="text-[10px] text-gray-300 line-clamp-1 mt-0.5">
                                {item.preview.subtitle}
                              </p>
                            </div>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ================= RIGHT: SEARCH, USER, WISHLIST, BAG ================= */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-4 text-black">

              {/* SEARCH TRIGGER */}
              <button
                onClick={() => setShowSearchModal(true)}
                aria-label="Search clothing"
                className="hidden xl:flex items-center gap-3 bg-neutral-100/90 hover:bg-neutral-200/90 border border-neutral-200/70 px-4 py-2 rounded-full text-xs text-neutral-500 font-medium transition-all hover:border-neutral-300 shadow-2xs"
              >
                <FiSearch size={14} className="text-neutral-500" />
                <span>Search styles, fits, cargos...</span>
                <span className="text-[10px] font-bold bg-white text-neutral-500 px-1.5 py-0.5 rounded border border-neutral-200 shadow-2xs">
                  ⌘K
                </span>
              </button>

              {/* USER PROFILE ICON */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    aria-label="User Account"
                    className="flex items-center gap-1.5 p-1 rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfile && (
                    <div className="absolute right-0 top-12 w-[270px] bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-black text-sm flex items-center justify-center shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-neutral-900 text-sm truncate">{user.name}</h4>
                            <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 flex flex-col gap-1">
                        <button
                          onClick={() => {
                            navigate("/my-orders");
                            setShowProfile(false);
                          }}
                          className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-[13px] font-semibold text-neutral-700 transition-all"
                        >
                          <FiPackage size={15} />
                          <span>My Orders &amp; Tracking</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate("/wishlist");
                            setShowProfile(false);
                          }}
                          className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-[13px] font-semibold text-neutral-700 transition-all"
                        >
                          <FiHeart size={15} />
                          <span>Wishlist ({getWishlistCount()})</span>
                        </button>
                        <button
                          onClick={() => {
                            logout();
                            setShowProfile(false);
                          }}
                          className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 text-[13px] font-semibold transition-all"
                        >
                          <FiLogOut size={15} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowUserLogin(true)}
                  aria-label="Login / Sign Up"
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-800"
                >
                  <FiUser size={20} className="stroke-[1.8]" />
                </button>
              )}

              {/* WISHLIST ICON (WITH BADGE) */}
              <button
                onClick={() => navigate("/wishlist")}
                aria-label="Wishlist"
                className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-800"
              >
                <FiHeart size={20} className="stroke-[1.8]" />
                {getWishlistCount() > 0 && (
                  <span className="absolute 1 top-0.5 right-0.5 min-w-[18px] h-[18px] rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center font-bold px-1 shadow-xs">
                    {getWishlistCount()}
                  </span>
                )}
              </button>

              {/* SHOPPING BAG ICON (WITH BADGE) */}
              <button
                onClick={() => navigate("/cart")}
                aria-label="Shopping Bag"
                className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-800"
              >
                <FiShoppingBag size={20} className="stroke-[1.8]" />
                {getCartCount() > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] rounded-full bg-neutral-950 text-white text-[9px] flex items-center justify-center font-bold px-1 shadow-xs">
                    {getCartCount()}
                  </span>
                )}
              </button>

            </div>

          </div>

          {/* ================= 3. SAVANA-STYLE PROMINENT MOBILE SEARCH PILL ================= */}
          <div className="xl:hidden pb-2.5 pt-0.5">
            <div
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-2.5 bg-neutral-100 hover:bg-neutral-200/80 active:bg-neutral-200 px-4 py-2.5 rounded-full cursor-pointer transition-colors shadow-2xs border border-neutral-200/60"
            >
              <FiSearch size={16} className="text-neutral-500 shrink-0" />
              <span className="text-xs font-medium text-neutral-500 truncate">
                Search oversize tees, cargos, winter jackets...
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* ================= SEARCH MODAL ================= */}
      {showSearchModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-display font-black text-lg uppercase tracking-tight text-black">
                Search SHOPPR Drops
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                aria-label="Close search"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors text-gray-500"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="relative mt-4">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search winter coats, hoodies, linen shirts, cargos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    setShowSearchModal(false);
                    navigate("/collection");
                  }
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Popular Searches */}
            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Popular Drops
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchQuery(term);
                      setShowSearchModal(false);
                      navigate("/collection");
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-black hover:text-white text-xs font-semibold text-gray-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Results */}
            {searchMatches.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Matching Drops ({searchMatches.length})
                </p>
                <div className="space-y-2">
                  {searchMatches.map((prod) => (
                    <div
                      key={prod._id}
                      onClick={() => {
                        setShowSearchModal(false);
                        navigate(`/collection/${prod.category?.toLowerCase()}/${prod._id}`);
                      }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image?.[0]}
                          alt={prod.name}
                          className="w-10 h-12 object-contain rounded bg-neutral-100 p-0.5"
                        />
                        <div>
                          <p className="text-xs font-bold text-black uppercase">{prod.name}</p>
                          <p className="text-[11px] text-gray-400">{prod.brand || "SHOPPR"} • {prod.category}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-black">{formatPrice(prod.offerPrice)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SAVANA-STYLE MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 xl:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-[85%] max-w-[320px] h-full bg-white flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
                <span className="font-display text-2xl font-black uppercase text-black">
                  SHOPPR
                </span>
                <span className="text-2xl font-black text-black ml-0.5">•</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2 mt-6">
              {navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                      item.isSale
                        ? "text-[#e53e3e] bg-red-50/50"
                        : isActive
                        ? "bg-black text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    {item.isSale && <FiPercent size={14} className="text-red-500" />}
                    {item.label}
                  </span>
                  <FiArrowRight size={14} />
                </NavLink>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-2 text-xs font-semibold text-gray-500">
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="py-2 hover:text-black">
              Wishlist ({getWishlistCount()})
            </Link>
            <Link to="/my-orders" onClick={() => setMenuOpen(false)} className="py-2 hover:text-black">
              Track Orders
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="py-2 hover:text-black">
              Support &amp; Returns
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;