/* ======================= MOBILEBOTTOMNAV.JSX (SAVANA-STYLE APP BOTTOM BAR) ======================= */

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiZap, FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const MobileBottomNav = () => {
  const { getCartCount, getWishlistCount, user, setShowUserLogin } = useContext(ShopContext);

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <nav
      aria-label="Savana Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-2 py-1 flex items-center justify-around pb-[calc(env(safe-area-inset-bottom,0px)+6px)]"
    >
      {/* 1. HOME */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[54px] py-1 transition-all ${
            isActive ? "text-black font-black scale-105" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <FiHome size={20} className="stroke-[2.2]" />
        <span className="text-[10px] mt-0.5 tracking-wider uppercase">Home</span>
      </NavLink>

      {/* 2. CATEGORIES */}
      <NavLink
        to="/collection"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[54px] py-1 transition-all ${
            isActive ? "text-black font-black scale-105" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <FiGrid size={20} className="stroke-[2.2]" />
        <span className="text-[10px] mt-0.5 tracking-wider uppercase">Categories</span>
      </NavLink>

      {/* 3. TRENDING / DROPS (SAVANA SIGNATURE) */}
      <NavLink
        to="/collection/winterwear"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[54px] py-1 transition-all relative ${
            isActive ? "text-rose-600 font-black scale-105" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <div className="relative">
          <FiZap size={20} className="stroke-[2.2]" />
          <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[7px] font-black uppercase px-1 rounded-full animate-pulse">
            HOT
          </span>
        </div>
        <span className="text-[10px] mt-0.5 tracking-wider uppercase">Drops</span>
      </NavLink>

      {/* 4. WISHLIST */}
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[54px] py-1 relative transition-all ${
            isActive ? "text-black font-black scale-105" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <div className="relative">
          <FiHeart size={20} className="stroke-[2.2]" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-rose-600 text-white text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-wider uppercase">Wishlist</span>
      </NavLink>

      {/* 5. BAG / CART */}
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[54px] py-1 relative transition-all ${
            isActive ? "text-black font-black scale-105" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <div className="relative">
          <FiShoppingBag size={20} className="stroke-[2.2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-black text-white text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-wider uppercase">Bag</span>
      </NavLink>
    </nav>
  );
};

export default MobileBottomNav;
