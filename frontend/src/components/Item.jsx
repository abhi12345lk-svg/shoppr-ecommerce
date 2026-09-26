// ======================= ITEM.JSX (SNITCH DESKTOP QUICK-SIZE HOVER + SAVANA MOBILE FIT) =======================

import React, { useContext, useState } from "react";
import { FiHeart, FiEye, FiShoppingBag, FiPlus } from "react-icons/fi";
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
  const firstImage =
    product?.image?.[0] ||
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80";
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

  const availableSizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["S", "M", "L", "XL"];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col h-full bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden relative"
    >
      {/* ================= IMAGE CONTAINER (COMPACT 4:5 FASHION RATIO) ================= */}
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer">
        
        {/* Floating Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 items-center">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product._id);
            }}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              inWishlist
                ? "bg-rose-50 text-rose-600 shadow-sm"
                : "bg-white/90 hover:bg-black hover:text-white text-gray-700 backdrop-blur-sm shadow-xs"
            }`}
          >
            <FiHeart size={13} className={inWishlist ? "fill-rose-600" : ""} />
          </button>

          {/* Quick View Button (Desktop Hover Only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label="Quick View"
            className="hidden md:flex w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-black hover:text-white text-gray-700 backdrop-blur-sm shadow-xs items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <FiEye size={13} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-black text-white text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-600 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-xs">
              New Drop
            </span>
          )}
          {product.popular && !product.isNewArrival && (
            <span className="bg-amber-500 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-xs">
              Trending
            </span>
          )}
        </div>

        {/* Product Image with smooth cross-fade */}
        <div onClick={handleCardClick} className="w-full h-full overflow-hidden">
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* ================= SNITCH-STYLE QUICK SIZE SELECTOR ON HOVER (DESKTOP) ================= */}
        <div className="absolute inset-x-1.5 bottom-1.5 z-20 hidden md:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-1 shadow-lg border border-gray-100 flex items-center justify-between gap-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 pl-1">
              Size:
            </span>
            <div className="flex items-center gap-1">
              {availableSizes.slice(0, 5).map((sz, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id, sz);
                  }}
                  className="h-6 min-w-[22px] px-1 rounded bg-gray-100 hover:bg-black hover:text-white text-[9px] font-black text-black transition-colors"
                  title={`Add size ${sz}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ================= PRODUCT DETAILS (COMPACT & CLEAN) ================= */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1">
        
        {/* Brand & Subcategory Tag */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          <span className="truncate max-w-[50%]">{product.brand || "SHOPPR"}</span>
          <span className="truncate max-w-[50%] text-right">{product.subCategory || product.category}</span>
        </div>

        {/* Title */}
        <h3
          onClick={handleCardClick}
          className="font-display text-[11px] sm:text-[13px] font-bold text-black uppercase leading-snug line-clamp-1 cursor-pointer hover:text-neutral-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Pricing & Savana-style Mobile Quick Add */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-display font-black text-xs sm:text-sm text-black">
              {formatPrice(product.offerPrice)}
            </span>
            {product.price > product.offerPrice && (
              <span className="text-gray-400 line-through text-[10px] sm:text-[11px]">
                {formatPrice(product.price)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="hidden sm:inline text-rose-600 font-bold text-[10px]">
                ({discountPercent}%)
              </span>
            )}
          </div>

          {/* Savana Quick Add Button on Mobile */}
          <button
            onClick={() => addToCart(product._id, selectedSize)}
            className="md:hidden bg-black text-white h-6 px-2 rounded-md text-[9px] font-bold flex items-center gap-1 active:scale-95 shadow-xs shrink-0"
            aria-label="Add to cart"
          >
            <FiPlus size={11} />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Item;