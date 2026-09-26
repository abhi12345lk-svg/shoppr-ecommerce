import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const MobileBottomNav = () => {
  const { getCartCount, getWishlistCount, user, setShowUserLogin } = useContext(ShopContext);

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around"
    >
      {/* HOME */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            isActive ? "text-black font-bold" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <FiHome size={20} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Home</span>
      </NavLink>

      {/* CATEGORIES / SHOP */}
      <NavLink
        to="/collection"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            isActive ? "text-black font-bold" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <FiGrid size={20} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Shop</span>
      </NavLink>

      {/* WISHLIST */}
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[56px] py-1 relative transition-colors ${
            isActive ? "text-black font-bold" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <div className="relative">
          <FiHeart size={20} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-1 tracking-wider uppercase">Wishlist</span>
      </NavLink>

      {/* BAG */}
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[56px] py-1 relative transition-colors ${
            isActive ? "text-black font-bold" : "text-gray-400 hover:text-gray-700"
          }`
        }
      >
        <div className="relative">
          <FiShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-1 tracking-wider uppercase">Bag</span>
      </NavLink>

      {/* ACCOUNT */}
      {user ? (
        <NavLink
          to="/my-orders"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
              isActive ? "text-black font-bold" : "text-gray-400 hover:text-gray-700"
            }`
          }
        >
          <FiUser size={20} />
          <span className="text-[10px] mt-1 tracking-wider uppercase">Account</span>
        </NavLink>
      ) : (
        <button
          onClick={() => setShowUserLogin(true)}
          className="flex flex-col items-center justify-center min-w-[56px] py-1 text-gray-400 hover:text-black transition-colors"
        >
          <FiUser size={20} />
          <span className="text-[10px] mt-1 tracking-wider uppercase">Sign In</span>
        </button>
      )}
    </nav>
  );
};

export default MobileBottomNav;
