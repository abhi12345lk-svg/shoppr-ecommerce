import React, { useContext, useState, useEffect } from "react";
import { FiX, FiShoppingBag, FiHeart, FiExternalLink } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setShowSizeGuide,
    navigate
  } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes?.[0] || "");
      setSelectedImage(quickViewProduct.image?.[0] || "");
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const discountPercent =
    quickViewProduct.price > quickViewProduct.offerPrice
      ? Math.round(((quickViewProduct.price - quickViewProduct.offerPrice) / quickViewProduct.price) * 100)
      : 0;

  const inWishlist = isInWishlist(quickViewProduct._id);

  const handleAddAndClose = async () => {
    const success = await addToCart(quickViewProduct._id, selectedSize);
    if (success) {
      setQuickViewProduct(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 grid md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        {/* Product Images */}
        <div className="bg-[#f7f7f7] p-6 flex flex-col justify-between relative">
          <button
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close preview"
            className="md:hidden absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xs"
          >
            <FiX size={18} />
          </button>

          {discountPercent > 0 && (
            <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              {discountPercent}% OFF
            </span>
          )}

          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 relative">
            <img
              src={
                selectedImage ||
                quickViewProduct.image?.[0] ||
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
              }
              alt={quickViewProduct.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80";
              }}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Thumbnails */}
          {quickViewProduct.image?.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {quickViewProduct.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 bg-white p-1 transition-all ${
                    selectedImage === img ? "border-black shadow-xs" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between relative">
          <button
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close preview"
            className="hidden md:flex absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white items-center justify-center transition-colors"
          >
            <FiX size={18} />
          </button>

          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[2.5px] block mb-1">
              {quickViewProduct.brand || "SHOPPR"} • {quickViewProduct.category}
            </span>

            <h2 id="quick-view-title" className="font-display text-xl sm:text-2xl font-black text-black leading-tight uppercase">
              {quickViewProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-2xl font-black text-black">
                {formatPrice(quickViewProduct.offerPrice)}
              </span>
              {quickViewProduct.price > quickViewProduct.offerPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(quickViewProduct.price)}
                </span>
              )}
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Inclusive of GST
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-3 line-clamp-3 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Size Selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Select Size: <strong className="text-black">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-neutral-500 underline hover:text-black font-medium"
                >
                  Size Chart
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes?.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-10 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black shadow-xs scale-105"
                        : "bg-white text-gray-800 border-gray-200 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <button
                onClick={handleAddAndClose}
                className="flex-1 btn-dark !py-3.5 !rounded-2xl gap-2 text-xs uppercase tracking-wider"
              >
                <FiShoppingBag size={16} />
                <span>Add To Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct._id)}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                  inWishlist
                    ? "bg-rose-50 border-rose-200 text-rose-600 shadow-xs"
                    : "border-gray-200 hover:border-black text-gray-700"
                }`}
              >
                <FiHeart size={18} className={inWishlist ? "fill-rose-600" : ""} />
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewProduct(null);
                navigate(`/collection/${quickViewProduct.category?.toLowerCase()}/${quickViewProduct._id}`);
              }}
              className="text-center text-xs font-bold text-gray-500 hover:text-black transition-colors flex items-center justify-center gap-1.5 py-1"
            >
              <span>View Full Details & Specifications</span>
              <FiExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
