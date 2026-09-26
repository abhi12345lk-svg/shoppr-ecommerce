// ======================= MOBILE BOTTOM NAV — SAVANA STYLE =======================

import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiGrid, FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const MobileBottomNav = () => {
  const { getCartCount, getWishlistCount, user, setShowUserLogin } = useContext(ShopContext);
  const location = useLocation();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLink = "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors";
  const label = "text-[9px] tracking-wider uppercase font-semibold mt-0.5";

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-2px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch h-[54px]">

        {/* HOME */}
        <NavLink
          to="/"
          end
          className={`${navLink} ${isActive("/") && location.pathname === "/" ? "text-black" : "text-gray-400"}`}
        >
          <FiHome size={22} strokeWidth={isActive("/") && location.pathname === "/" ? 2.2 : 1.6} />
          <span className={label}>Home</span>
        </NavLink>

        {/* SHOP */}
        <NavLink
          to="/collection"
          className={`${navLink} ${isActive("/collection") ? "text-black" : "text-gray-400"}`}
        >
          <FiGrid size={22} strokeWidth={isActive("/collection") ? 2.2 : 1.6} />
          <span className={label}>Shop</span>
        </NavLink>

        {/* WISHLIST */}
        <NavLink
          to="/wishlist"
          className={`${navLink} relative ${isActive("/wishlist") ? "text-black" : "text-gray-400"}`}
        >
          <div className="relative">
            <FiHeart size={22} strokeWidth={isActive("/wishlist") ? 2.2 : 1.6} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[8px] font-black h-[14px] min-w-[14px] px-0.5 rounded-full flex items-center justify-center">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </div>
          <span className={label}>Wishlist</span>
        </NavLink>

        {/* BAG */}
        <NavLink
          to="/cart"
          className={`${navLink} relative ${isActive("/cart") ? "text-black" : "text-gray-400"}`}
        >
          <div className="relative">
            <FiShoppingBag size={22} strokeWidth={isActive("/cart") ? 2.2 : 1.6} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-white text-[8px] font-black h-[14px] min-w-[14px] px-0.5 rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </div>
          <span className={label}>Bag</span>
        </NavLink>

        {/* ACCOUNT */}
        {user ? (
          <NavLink
            to="/my-orders"
            className={`${navLink} ${isActive("/my-orders") ? "text-black" : "text-gray-400"}`}
          >
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-black uppercase">
              {user.name?.[0] || "U"}
            </div>
            <span className={label}>Account</span>
          </NavLink>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className={`${navLink} text-gray-400 hover:text-black`}
          >
            <FiUser size={22} strokeWidth={1.6} />
            <span className={label}>Sign In</span>
          </button>
        )}

      </div>
    </nav>
  );
};

export default MobileBottomNav;
