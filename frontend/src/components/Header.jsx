/* ======================= HEADER.JSX — SAVANA-STYLE MOBILE FIRST ======================= */

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
  FiChevronRight
} from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

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
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const searchInputRef = useRef(null);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= FOCUS ON SEARCH ================= */
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchModal]);

  /* ================= CLOSE PROFILE ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const close = () => setShowProfile(false);
    if (showProfile) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showProfile]);

  /* ================= LOCK BODY SCROLL WHEN MENU OPEN ================= */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ================= LIVE SEARCH ================= */
  const searchMatches = searchQuery.trim().length > 1
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
        )
        .slice(0, 6)
    : [];

  const popularSearches = [
    "Winter Essentials", "Overcoats", "Oversized Tees", "Linen Shirts", "Cargos"
  ];

  /* ================= NAV LINKS ================= */
  const navItems = [
    { label: "NEW ARRIVALS", path: "/collection", isHighlighted: true, hasDropdown: false },
    {
      label: "MEN", path: "/collection/men", hasDropdown: true,
      subItems: [
        { label: "Oversized Tees", path: "/collection/men" },
        { label: "Linen & Casual Shirts", path: "/collection/men" },
        { label: "Parachute & Cargos", path: "/collection/men" },
        { label: "Jackets & Overcoats", path: "/collection/winterwear" },
        { label: "View All Men", path: "/collection/men", isBold: true }
      ]
    },
    {
      label: "WOMEN", path: "/collection/women", hasDropdown: true,
      subItems: [
        { label: "Tops & Baby Tees", path: "/collection/women" },
        { label: "Tailored Co-ords", path: "/collection/women" },
        { label: "Wide Leg Trousers", path: "/collection/women" },
        { label: "Dresses & Rompers", path: "/collection/women" },
        { label: "View All Women", path: "/collection/women", isBold: true }
      ]
    },
    {
      label: "TOPWEAR", path: "/collection", hasDropdown: true,
      subItems: [
        { label: "Oversized T-Shirts", path: "/collection" },
        { label: "European Linen Shirts", path: "/collection" },
        { label: "Hoodies & Sweatshirts", path: "/collection/winterwear" },
        { label: "Wool Overcoats", path: "/collection/winterwear" },
        { label: "All Topwear", path: "/collection", isBold: true }
      ]
    },
    {
      label: "BOTTOMWEAR", path: "/collection", hasDropdown: true,
      subItems: [
        { label: "Parachute Pants", path: "/collection" },
        { label: "Multi-Pocket Cargos", path: "/collection" },
        { label: "Relaxed Linen Trousers", path: "/collection" },
        { label: "Selvedge Denim Jeans", path: "/collection" },
        { label: "All Bottomwear", path: "/collection", isBold: true }
      ]
    },
    {
      label: "WINTER WEAR", path: "/collection/winterwear", hasDropdown: true,
      subItems: [
        { label: "Double-Breasted Overcoats", path: "/collection/winterwear" },
        { label: "450 GSM Heavy Hoodies", path: "/collection/winterwear" },
        { label: "Ribbed Turtlenecks", path: "/collection/winterwear" },
        { label: "Bomber Jackets", path: "/collection/winterwear" },
        { label: "Explore Winter Drop", path: "/collection/winterwear", isBold: true }
      ]
    },
    {
      label: "ACCESSORIES", path: "/collection/footwear", hasDropdown: true,
      subItems: [
        { label: "Chunky Platform Sneakers", path: "/collection/footwear" },
        { label: "Leather Chelsea Boots", path: "/collection/footwear" },
        { label: "Caps & Beanies", path: "/collection" },
        { label: "Crossbody Bags", path: "/collection" },
        { label: "All Accessories", path: "/collection/footwear", isBold: true }
      ]
    },
    { label: "SALE", path: "/collection", isSale: true, hasDropdown: false }
  ];

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <>
      {/* ===================================================
          HEADER — Savana-style: logo centered on mobile,
          search+bag icons on right, hamburger on left
          =================================================== */}
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 ${
          scrolled ? "border-b border-gray-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.06)]" : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1900px] mx-auto px-3 sm:px-5 lg:px-10 xl:px-14">
          <div className="h-[56px] sm:h-[64px] lg:h-[72px] flex items-center justify-between relative">

            {/* ===== LEFT: Hamburger (mobile) ===== */}
            <div className="flex items-center gap-1 w-[80px] sm:w-[100px] lg:w-auto">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden p-2 -ml-1 text-black hover:text-gray-500 transition-colors"
              >
                <FiMenu size={22} strokeWidth={1.8} />
              </button>

              {/* Desktop: Search icon on left side of logo area */}
              <button
                onClick={() => setShowSearchModal(true)}
                aria-label="Search"
                className="hidden lg:flex p-2 text-black hover:text-gray-500 transition-colors"
              >
                <FiSearch size={20} strokeWidth={1.8} />
              </button>
            </div>

            {/* ===== CENTER: LOGO (always centered on mobile) ===== */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0">
              <Link
                to="/"
                className="flex items-center select-none tracking-tight"
              >
                <span className="font-display text-[22px] sm:text-[26px] lg:text-[28px] font-black uppercase text-black tracking-[-1px]">
                  SHOPPR
                </span>
                <span className="w-[5px] h-[5px] rounded-full bg-black ml-0.5 mt-[2px]" />
              </Link>
            </div>

            {/* ===== DESKTOP CENTER: NAV ===== */}
            <nav className="hidden xl:flex items-center justify-center gap-5 2xl:gap-7 h-full absolute left-1/2 -translate-x-1/2">
              {navItems.map((item, index) => {
                const isCurrentActive =
                  item.label === "NEW ARRIVALS"
                    ? location.pathname === "/" || location.pathname === "/collection"
                    : location.pathname === item.path;

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
                        `flex items-center gap-0.5 text-[12px] tracking-[0.6px] uppercase font-bold transition-colors py-2 ${
                          item.isSale
                            ? "text-[#e53e3e] font-extrabold"
                            : isActive || isCurrentActive
                            ? "text-black"
                            : "text-neutral-600 hover:text-black"
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <FiChevronDown
                          size={11}
                          className="text-neutral-400 group-hover:rotate-180 transition-transform duration-200 ml-0.5"
                        />
                      )}
                    </NavLink>

                    {/* Underline indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />

                    {/* DROPDOWN */}
                    {item.hasDropdown && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 min-w-[200px] bg-white border border-gray-100 shadow-2xl rounded-xl py-2 px-1.5 z-50 animate-fadeIn">
                        {item.subItems?.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            onClick={() => setActiveDropdown(null)}
                            className={`px-3 py-2 text-[11px] uppercase rounded-lg transition-colors flex items-center justify-between gap-2 ${
                              sub.isBold
                                ? "font-black text-black bg-neutral-50 hover:bg-neutral-100 mt-1 border-t border-gray-100 pt-2"
                                : "font-semibold text-neutral-500 hover:text-black hover:bg-neutral-50"
                            }`}
                          >
                            <span>{sub.label}</span>
                            {sub.isBold && <FiArrowRight size={11} />}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ===== RIGHT: Icons ===== */}
            <div className="flex items-center justify-end gap-0.5 sm:gap-1 w-[80px] sm:w-[100px] lg:w-auto">

              {/* Search — mobile only */}
              <button
                onClick={() => setShowSearchModal(true)}
                aria-label="Search"
                className="lg:hidden p-2 text-black hover:text-gray-500 transition-colors"
              >
                <FiSearch size={20} strokeWidth={1.8} />
              </button>

              {/* Wishlist — hidden on very small mobile, show sm+ */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative hidden sm:flex p-2 text-black hover:text-gray-500 transition-colors"
              >
                <FiHeart size={20} strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-[16px] h-[16px] rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User / Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); }}
                    aria-label="Account"
                    className="p-2 text-black hover:text-gray-500 transition-colors"
                  >
                    <FiUser size={20} strokeWidth={1.8} />
                  </button>

                  {showProfile && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-11 w-[250px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xl z-50 animate-fadeIn"
                    >
                      <div className="px-4 py-3.5 border-b border-gray-100 bg-gray-50/60">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Signed in as</p>
                        <h4 className="font-bold text-black text-sm mt-0.5 truncate">{user.name}</h4>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="p-1.5 flex flex-col gap-0.5">
                        <button
                          onClick={() => { navigate("/my-orders"); setShowProfile(false); }}
                          className="w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] font-semibold text-gray-700 transition-all"
                        >
                          <FiPackage size={14} /> My Orders & Tracking
                        </button>
                        <button
                          onClick={() => { navigate("/wishlist"); setShowProfile(false); }}
                          className="w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] font-semibold text-gray-700 transition-all"
                        >
                          <FiHeart size={14} /> Wishlist ({wishlistCount})
                        </button>
                        <button
                          onClick={() => { logout(); setShowProfile(false); }}
                          className="w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 text-[13px] font-semibold transition-all"
                        >
                          <FiLogOut size={14} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowUserLogin(true)}
                  aria-label="Login"
                  className="p-2 text-black hover:text-gray-500 transition-colors"
                >
                  <FiUser size={20} strokeWidth={1.8} />
                </button>
              )}

              {/* Cart Bag */}
              <button
                onClick={() => navigate("/cart")}
                aria-label="Cart"
                className="relative p-2 text-black hover:text-gray-500 transition-colors"
              >
                <FiShoppingBag size={20} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold px-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ===================================================
          SEARCH MODAL — Full screen on mobile (Savana style)
          =================================================== */}
      {showSearchModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-white flex flex-col animate-fadeIn sm:bg-black/60 sm:backdrop-blur-sm sm:items-start sm:justify-center sm:pt-24 sm:px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowSearchModal(false); }}
        >
          {/* Mobile: full-screen panel */}
          <div className="w-full sm:hidden flex flex-col h-full">
            {/* Search Bar Row */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
              <FiSearch className="text-gray-400 shrink-0" size={18} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search styles, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    setShowSearchModal(false);
                    navigate("/collection");
                  }
                }}
                className="flex-1 text-base font-medium text-black placeholder-gray-400 outline-none bg-transparent"
                autoFocus
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="shrink-0 text-gray-500 font-semibold text-sm"
              >
                Cancel
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {searchMatches.length > 0 ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Results ({searchMatches.length})
                  </p>
                  <div className="space-y-0 divide-y divide-gray-50">
                    {searchMatches.map((prod) => (
                      <div
                        key={prod._id}
                        onClick={() => {
                          setShowSearchModal(false);
                          navigate(`/collection/${prod.category?.toLowerCase()}/${prod._id}`);
                        }}
                        className="flex items-center gap-3 py-3 cursor-pointer active:bg-gray-50 rounded-xl px-1 transition-colors"
                      >
                        <img
                          src={prod.image?.[0]}
                          alt={prod.name}
                          className="w-12 h-14 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-black truncate uppercase">{prod.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{prod.category}</p>
                        </div>
                        <span className="text-sm font-bold text-black shrink-0">{formatPrice(prod.offerPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-col divide-y divide-gray-50">
                    {popularSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSearchQuery(term);
                          setShowSearchModal(false);
                          navigate("/collection");
                        }}
                        className="flex items-center gap-3 py-3.5 text-left text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                      >
                        <FiSearch size={14} className="text-gray-300" />
                        {term}
                        <FiChevronRight size={14} className="ml-auto text-gray-300" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop: Floating modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:block w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-display font-black text-lg uppercase tracking-tight text-black">
                Search SHOPPR
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
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
                placeholder="Search winter coats, hoodies, linen shirts..."
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

            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Popular Drops</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => { setSearchQuery(term); setShowSearchModal(false); navigate("/collection"); }}
                    className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-black hover:text-white text-xs font-semibold text-gray-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {searchMatches.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Matching Drops ({searchMatches.length})
                </p>
                <div className="space-y-1">
                  {searchMatches.map((prod) => (
                    <div
                      key={prod._id}
                      onClick={() => { setShowSearchModal(false); navigate(`/collection/${prod.category?.toLowerCase()}/${prod._id}`); }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={prod.image?.[0]} alt={prod.name} className="w-10 h-12 object-contain rounded bg-neutral-100 p-0.5" />
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

      {/* ===================================================
          MOBILE DRAWER — Full-height slide-in (Savana style)
          Sections expand inline (accordion), not flat list
          =================================================== */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[82%] max-w-[320px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-0.5">
            <span className="font-display text-[22px] font-black uppercase text-black tracking-[-1px]">SHOPPR</span>
            <span className="w-[4px] h-[4px] rounded-full bg-black ml-0.5" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable nav list */}
        <div className="flex-1 overflow-y-auto">
          {/* User greeting */}
          {user && (
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Hello,</p>
              <p className="font-bold text-black text-sm mt-0.5">{user.name}</p>
            </div>
          )}

          {/* Nav Items */}
          <div className="py-2">
            {navItems.map((item, idx) => (
              <div key={idx}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.label ? null : item.label)}
                      className={`w-full flex items-center justify-between px-5 py-3.5 text-[13px] font-bold uppercase tracking-wide transition-colors ${
                        item.isSale ? "text-rose-600" : "text-gray-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      <FiChevronDown
                        size={14}
                        className={`text-gray-400 transition-transform duration-200 ${
                          expandedMobileMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedMobileMenu === item.label && (
                      <div className="bg-gray-50/80 border-y border-gray-100">
                        {item.subItems?.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center justify-between px-8 py-2.5 text-[12px] transition-colors ${
                              sub.isBold
                                ? "font-black text-black border-t border-gray-100 mt-1"
                                : "font-medium text-gray-600"
                            }`}
                          >
                            <span>{sub.label}</span>
                            {sub.isBold && <FiArrowRight size={11} />}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-5 py-3.5 text-[13px] font-bold uppercase tracking-wide transition-colors ${
                        item.isSale
                          ? "text-rose-600"
                          : isActive
                          ? "text-black"
                          : "text-gray-900"
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <FiChevronRight size={14} className="text-gray-300" />
                  </NavLink>
                )}
                <div className="mx-5 h-px bg-gray-100" />
              </div>
            ))}
          </div>

          {/* Extra links */}
          <div className="px-5 pt-4 pb-6 flex flex-col gap-3">
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 text-sm font-semibold text-gray-600 hover:text-black transition-colors">
              <FiHeart size={15} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link to="/my-orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 text-sm font-semibold text-gray-600 hover:text-black transition-colors">
              <FiPackage size={15} /> Track Orders
            </Link>
            {user && (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="flex items-center gap-2.5 text-sm font-semibold text-rose-500 hover:text-rose-700 transition-colors"
              >
                <FiLogOut size={15} /> Logout
              </button>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        {!user && (
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => { setShowUserLogin(true); setMenuOpen(false); }}
              className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider"
            >
              Sign In / Register
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;