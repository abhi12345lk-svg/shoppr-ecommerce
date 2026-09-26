/* ======================= HEADER.JSX (EDITORIAL MINIMALIST) ======================= */

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
  FiArrowRight
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
  const searchInputRef = useRef(null);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= FOCUS ON SEARCH ================= */
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchModal]);

  /* ================= LIVE SEARCH MATCHES ================= */
  const searchMatches = searchQuery.trim().length > 1
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
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

  /* ================= MAIN NAVIGATION LINKS ================= */
  const navItems = [
    {
      label: "NEW ARRIVALS",
      path: "/collection",
      isHighlighted: true,
      hasDropdown: false
    },
    {
      label: "MEN",
      path: "/collection/men",
      hasDropdown: true,
      subItems: [
        { label: "Oversized Tees", path: "/collection/men" },
        { label: "Linen & Casual Shirts", path: "/collection/men" },
        { label: "Parachute & Cargos", path: "/collection/men" },
        { label: "Jackets & Overcoats", path: "/collection/winterwear" },
        { label: "View All Men", path: "/collection/men", isBold: true }
      ]
    },
    {
      label: "WOMEN",
      path: "/collection/women",
      hasDropdown: true,
      subItems: [
        { label: "Tops & Baby Tees", path: "/collection/women" },
        { label: "Tailored Co-ords", path: "/collection/women" },
        { label: "Wide Leg Trousers", path: "/collection/women" },
        { label: "Dresses & Rompers", path: "/collection/women" },
        { label: "View All Women", path: "/collection/women", isBold: true }
      ]
    },
    {
      label: "TOPWEAR",
      path: "/collection",
      hasDropdown: true,
      subItems: [
        { label: "Oversized T-Shirts", path: "/collection" },
        { label: "European Linen Shirts", path: "/collection" },
        { label: "Hoodies & Sweatshirts", path: "/collection/winterwear" },
        { label: "Wool Overcoats", path: "/collection/winterwear" },
        { label: "All Topwear", path: "/collection", isBold: true }
      ]
    },
    {
      label: "BOTTOMWEAR",
      path: "/collection",
      hasDropdown: true,
      subItems: [
        { label: "Parachute Pants", path: "/collection" },
        { label: "Multi-Pocket Cargos", path: "/collection" },
        { label: "Relaxed Linen Trousers", path: "/collection" },
        { label: "Selvedge Denim Jeans", path: "/collection" },
        { label: "All Bottomwear", path: "/collection", isBold: true }
      ]
    },
    {
      label: "WINTER WEAR",
      path: "/collection/winterwear",
      hasDropdown: true,
      subItems: [
        { label: "Double-Breasted Overcoats", path: "/collection/winterwear" },
        { label: "450 GSM Heavy Hoodies", path: "/collection/winterwear" },
        { label: "Ribbed Turtlenecks", path: "/collection/winterwear" },
        { label: "Bomber Jackets", path: "/collection/winterwear" },
        { label: "Explore Winter Drop", path: "/collection/winterwear", isBold: true }
      ]
    },
    {
      label: "ACCESSORIES",
      path: "/collection/footwear",
      hasDropdown: true,
      subItems: [
        { label: "Chunky Platform Sneakers", path: "/collection/footwear" },
        { label: "Leather Chelsea Boots", path: "/collection/footwear" },
        { label: "Caps & Beanies", path: "/collection" },
        { label: "Crossbody Bags", path: "/collection" },
        { label: "All Accessories", path: "/collection/footwear", isBold: true }
      ]
    },
    {
      label: "SALE",
      path: "/collection",
      isSale: true,
      hasDropdown: false
    }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 border-b border-gray-200/80 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="h-[68px] sm:h-[72px] flex items-center justify-between gap-4">

            {/* ================= LEFT: LOGO & MOBILE HAMBURGER ================= */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open mobile menu"
                className="xl:hidden p-2 text-black hover:text-gray-600 transition-colors"
              >
                <FiMenu size={22} />
              </button>

              <Link
                to="/"
                className="flex items-center select-none tracking-tight group"
              >
                <span className="font-display text-[26px] sm:text-[30px] font-black uppercase text-black tracking-[-0.5px]">
                  SHOPPR
                </span>
                <span className="text-[26px] sm:text-[30px] font-black text-black leading-none ml-0.5">
                  •
                </span>
              </Link>
            </div>

            {/* ================= CENTER: EXACT NAVBAR LINKS ================= */}
            <nav className="hidden xl:flex items-center justify-center gap-6 lg:gap-7 2xl:gap-8 h-full">
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
                        `flex items-center gap-1 text-[13px] tracking-[0.5px] uppercase font-bold transition-colors py-2 ${
                          item.isSale
                            ? "text-[#e53e3e] hover:text-red-700 font-extrabold"
                            : item.isHighlighted && isCurrentActive
                            ? "text-black relative after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[2px] after:bg-black font-extrabold"
                            : isActive
                            ? "text-black font-extrabold"
                            : "text-neutral-800 hover:text-black"
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <FiChevronDown
                          size={13}
                          className="text-neutral-500 group-hover:rotate-180 transition-transform duration-200 stroke-[2.5]"
                        />
                      )}
                    </NavLink>

                    {/* DROPDOWN MENU */}
                    {item.hasDropdown && activeDropdown === item.label && (
                      <div className="absolute top-[68px] left-0 min-w-[220px] bg-white border border-gray-100 shadow-xl rounded-xl py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex flex-col gap-1">
                          {item.subItems?.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              to={sub.path}
                              onClick={() => setActiveDropdown(null)}
                              className={`px-3 py-2 text-xs uppercase rounded-lg transition-colors flex items-center justify-between ${
                                sub.isBold
                                  ? "font-black text-black bg-neutral-50 hover:bg-neutral-100 mt-1 border-t border-gray-100 pt-2"
                                  : "font-semibold text-neutral-600 hover:text-black hover:bg-neutral-50"
                              }`}
                            >
                              <span>{sub.label}</span>
                              {sub.isBold && <FiArrowRight size={12} />}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ================= RIGHT: SEARCH, USER, BAG ICONS ================= */}
            <div className="flex items-center justify-end gap-4 sm:gap-6 text-black">

              {/* SEARCH ICON */}
              <button
                onClick={() => setShowSearchModal(true)}
                aria-label="Search clothing"
                className="p-1.5 hover:opacity-70 transition-opacity"
              >
                <FiSearch size={21} className="stroke-[1.8]" />
              </button>

              {/* USER PROFILE ICON */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    aria-label="User Account"
                    className="p-1.5 hover:opacity-70 transition-opacity flex items-center"
                  >
                    <FiUser size={21} className="stroke-[1.8]" />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfile && (
                    <div className="absolute right-0 top-11 w-[260px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/70">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Signed in as</p>
                        <h4 className="font-bold text-black text-sm mt-0.5 truncate">{user.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <div className="p-2 flex flex-col gap-1">
                        <button
                          onClick={() => {
                            navigate("/my-orders");
                            setShowProfile(false);
                          }}
                          className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] font-semibold text-gray-700 transition-all"
                        >
                          <FiPackage size={15} />
                          My Orders & Tracking
                        </button>
                        <button
                          onClick={() => {
                            navigate("/wishlist");
                            setShowProfile(false);
                          }}
                          className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] font-semibold text-gray-700 transition-all"
                        >
                          <FiHeart size={15} />
                          Wishlist ({getWishlistCount()})
                        </button>
                        <button
                          onClick={() => {
                            logout();
                            setShowProfile(false);
                          }}
                          className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 text-[13px] font-semibold transition-all"
                        >
                          <FiLogOut size={15} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowUserLogin(true)}
                  aria-label="Login / Sign Up"
                  className="p-1.5 hover:opacity-70 transition-opacity"
                >
                  <FiUser size={21} className="stroke-[1.8]" />
                </button>
              )}

              {/* SHOPPING BAG ICON WITH NUMERIC BADGE */}
              <button
                onClick={() => navigate("/cart")}
                aria-label="Shopping Bag"
                className="relative p-1.5 hover:opacity-70 transition-opacity"
              >
                <FiShoppingBag size={21} className="stroke-[1.8]" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold px-1">
                    {getCartCount()}
                  </span>
                )}
              </button>

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

      {/* ================= MOBILE DRAWER ================= */}
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
                  <span>{item.label}</span>
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