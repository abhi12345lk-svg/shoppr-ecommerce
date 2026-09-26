// ======================= ITEM.JSX (FASHION PRODUCT CARD) =======================

import React, { useContext, useState } from "react";
import { FiHeart, FiEye, FiShoppingBag } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const Item = ({ product }) => {
  const {
    navigate,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useContext(ShopContext);

  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "M");

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);

  // Safe image fallback
  const firstImage = product?.image?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80";
  const secondImage = product?.image?.[1] || firstImage;
  const currentImage = hovered && product?.image?.length > 1 ? secondImage : firstImage;

  /* ================= DISCOUNT PERCENT ================= */
  const discountPercent =
    product?.price > product?.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  const handleCardClick = () => {
    navigate(`/collection/${product?.category?.toLowerCase()}/${product?._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden relative"
    >
      {/* ================= IMAGE CONTAINER ================= */}
      <div className="relative aspect-[3/4] bg-[#f8f8f8] overflow-hidden cursor-pointer">
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            inWishlist
              ? "bg-rose-50 text-rose-600 shadow-sm"
              : "bg-white/80 hover:bg-black hover:text-white text-gray-700 backdrop-blur-sm"
          }`}
        >
          <FiHeart size={14} className={inWishlist ? "fill-rose-600" : ""} />
        </button>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-black text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
              New Drop
            </span>
          )}
          {product.popular && !product.isNewArrival && (
            <span className="bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
              Trending
            </span>
          )}
        </div>

        {/* Product Image */}
        <div onClick={handleCardClick} className="w-full h-full p-2 flex items-center justify-center">
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-contain object-center transition-all duration-500 group-hover:scale-105"
          />
        </div>

        {/* Quick View / Add Hover Overlay (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 z-20 hidden md:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-black hover:text-white backdrop-blur-md text-black h-9 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <FiEye size={13} />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product._id, selectedSize);
            }}
            aria-label="Instant Add"
            className="w-9 h-9 bg-black hover:bg-neutral-800 text-white rounded-xl shadow-md flex items-center justify-center transition-all active:scale-95"
          >
            <FiShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Brand & Subcategory */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          <span>{product.brand || "SHOPPR"}</span>
          <span>{product.subCategory || product.category}</span>
        </div>

        {/* Title */}
        <h3
          onClick={handleCardClick}
          className="font-display text-[13px] sm:text-[14px] font-bold text-black uppercase leading-snug line-clamp-1 cursor-pointer hover:text-neutral-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Available Sizes Pills */}
        <div className="flex items-center gap-1 mt-2 overflow-x-auto scrollbar-none py-0.5">
          {product.sizes?.map((size, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(size);
              }}
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border transition-all ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-sm sm:text-base text-black">
              {formatPrice(product.offerPrice)}
            </span>
            {product.price > product.offerPrice && (
              <span className="text-gray-400 line-through text-xs">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Quick Add CTA for Mobile */}
          <button
            onClick={() => addToCart(product._id, selectedSize)}
            className="md:hidden bg-black text-white h-7 px-2.5 rounded-lg text-[11px] font-bold flex items-center gap-1 active:scale-95"
          >
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;