// ======================= ITEM.JSX — SAVANA-STYLE PRODUCT CARD =======================

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

  const firstImage = product?.image?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80";
  const secondImage = product?.image?.[1] || firstImage;
  const currentImage = hovered && product?.image?.length > 1 ? secondImage : firstImage;

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
      className="group flex flex-col bg-white relative"
    >
      {/* ===== IMAGE — no padding, full bleed like Savana ===== */}
      <div className="relative aspect-[3/4] bg-[#f4f4f4] overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            inWishlist
              ? "bg-white text-rose-500"
              : "bg-white/85 text-gray-600 hover:text-black"
          }`}
        >
          <FiHeart size={13} className={inWishlist ? "fill-rose-500" : ""} />
        </button>

        {/* Badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-black text-white text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm">
              New
            </span>
          )}
          {product.popular && !product.isNewArrival && (
            <span className="bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm">
              Hot
            </span>
          )}
        </div>

        {/* Product image */}
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
        />

        {/* Desktop hover overlay */}
        <div className="absolute inset-x-0 bottom-0 h-12 hidden md:flex items-center px-2 gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/20 to-transparent">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-black hover:text-white text-black h-8 rounded-lg text-[11px] font-bold shadow transition-all flex items-center justify-center gap-1.5"
          >
            <FiEye size={12} />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product._id, selectedSize);
            }}
            aria-label="Add to bag"
            className="w-8 h-8 bg-black hover:bg-neutral-700 text-white rounded-lg shadow flex items-center justify-center transition-all"
          >
            <FiShoppingBag size={13} />
          </button>
        </div>

        {/* Mobile: Tap-to-add floating button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product._id, selectedSize);
          }}
          aria-label="Add to bag"
          className="md:hidden absolute bottom-2 right-2 z-20 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-black active:scale-95 transition-all"
        >
          <FiPlus size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* ===== PRODUCT INFO ===== */}
      <div className="pt-2 pb-1 px-0.5">
        {/* Brand */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 leading-tight">
          {product.brand || "SHOPPR"}
        </p>

        {/* Name */}
        <h3
          onClick={handleCardClick}
          className="text-[12px] sm:text-[13px] font-semibold text-gray-900 leading-snug mt-0.5 line-clamp-2 cursor-pointer hover:text-black transition-colors"
        >
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="font-bold text-[13px] sm:text-sm text-black">
            {formatPrice(product.offerPrice)}
          </span>
          {product.price > product.offerPrice && (
            <span className="text-gray-400 line-through text-[11px]">
              {formatPrice(product.price)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-rose-500 text-[10px] font-bold ml-auto">
              {discountPercent}% off
            </span>
          )}
        </div>

        {/* Size pills — compact, scrollable */}
        {product.sizes?.length > 0 && (
          <div className="flex items-center gap-1 mt-2 overflow-x-auto scrollbar-none">
            {product.sizes.map((size, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 transition-all ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;