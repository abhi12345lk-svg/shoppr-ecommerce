// ======================= ITEM.JSX (LUXURY EDITORIAL PRODUCT CARD) =======================

import React, { useContext, useState } from "react";
import { FiHeart, FiEye, FiPlus, FiCheck } from "react-icons/fi";
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
  const [addedSize, setAddedSize] = useState(null);

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);

  // Safe image fallback
  const firstImage =
    product?.image?.[0] ||
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";
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

  const handleQuickAdd = (e, size) => {
    e.stopPropagation();
    addToCart(product._id, size);
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1200);
  };

  const availableSizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["S", "M", "L", "XL"];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col h-full bg-white rounded-2xl border border-neutral-200/70 hover:border-neutral-300 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden relative"
    >
      {/* ================= IMAGE CONTAINER (LUXURY 4:5 RATIO) ================= */}
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer">
        
        {/* Floating Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5 items-center">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product._id);
            }}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
              inWishlist
                ? "bg-rose-50 text-rose-600 shadow-xs"
                : "bg-white/85 hover:bg-white hover:text-black text-neutral-700 backdrop-blur-md shadow-xs hover:scale-105"
            }`}
          >
            <FiHeart size={14} className={inWishlist ? "fill-rose-600 text-rose-600" : ""} />
          </button>

          {/* Quick View Button (Desktop Hover Only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label="Quick View"
            className="hidden md:flex w-8 h-8 rounded-full bg-white/85 hover:bg-white hover:text-black text-neutral-700 backdrop-blur-md shadow-xs items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105"
          >
            <FiEye size={14} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-neutral-950 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-600/95 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
              New Drop
            </span>
          )}
          {product.popular && !product.isNewArrival && (
            <span className="bg-amber-500/95 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
              Trending
            </span>
          )}
        </div>

        {/* Product Image with smooth cross-fade and scale */}
        <div onClick={handleCardClick} className="w-full h-full overflow-hidden">
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* ================= QUICK SIZE SELECTOR ON HOVER (DESKTOP) ================= */}
        <div className="absolute inset-x-2 bottom-2 z-20 hidden md:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-250 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-1.5 shadow-xl border border-neutral-200/80 flex items-center justify-between gap-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400 pl-1.5">
              Quick Add:
            </span>
            <div className="flex items-center gap-1">
              {availableSizes.slice(0, 5).map((sz, i) => (
                <button
                  key={i}
                  onClick={(e) => handleQuickAdd(e, sz)}
                  className={`h-6.5 min-w-[24px] px-1.5 rounded-md text-[9px] font-black uppercase transition-all flex items-center justify-center ${
                    addedSize === sz
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800"
                  }`}
                  title={`Add size ${sz}`}
                >
                  {addedSize === sz ? <FiCheck size={11} /> : sz}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1">
        
        {/* Brand & Subcategory Tag */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-[1.5px] text-neutral-400 mb-1">
          <span className="truncate max-w-[55%]">{product.brand || "SHOPPR"}</span>
          <span className="truncate max-w-[45%] text-right font-medium text-neutral-500">
            {product.subCategory || product.category}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={handleCardClick}
          className="font-display text-[12px] sm:text-[13px] font-bold text-neutral-950 uppercase leading-snug line-clamp-1 cursor-pointer hover:text-neutral-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Color Hex Swatch indicator if present */}
        {product.colorHex && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full border border-neutral-300 shadow-2xs inline-block"
              style={{ backgroundColor: product.colorHex }}
              title={product.color || "Color"}
            />
            {product.color && (
              <span className="text-[10px] text-neutral-400 truncate font-medium">
                {product.color}
              </span>
            )}
          </div>
        )}

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-auto pt-2.5 flex items-center justify-between gap-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-display font-black text-xs sm:text-sm text-neutral-950">
              {formatPrice(product.offerPrice)}
            </span>
            {product.price > product.offerPrice && (
              <span className="text-neutral-400 line-through text-[10px] sm:text-[11px]">
                {formatPrice(product.price)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="hidden sm:inline text-rose-600 font-bold text-[10px]">
                ({discountPercent}%)
              </span>
            )}
          </div>

          {/* Quick Add Button on Mobile */}
          <button
            onClick={(e) => handleQuickAdd(e, selectedSize)}
            className="md:hidden bg-neutral-950 text-white h-6.5 px-2 rounded-lg text-[9px] font-bold flex items-center gap-1 active:scale-95 shadow-xs shrink-0 hover:bg-neutral-800 transition-colors"
            aria-label="Add to cart"
          >
            {addedSize ? (
              <>
                <FiCheck size={11} className="text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <FiPlus size={11} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Item;