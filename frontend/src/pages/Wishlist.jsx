import React, { useContext } from "react";
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Wishlist = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct
  } = useContext(ShopContext);

  const wishlistProducts = products.filter((p) => wishlist.includes(p._id));

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pt-4 sm:pt-8 pb-24 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[3px] font-bold text-gray-400 mb-1.5">Saved Pieces</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
              My <span className="font-light text-gray-400">Wishlist</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-xl">
              Keep track of items you love and move them directly to your shopping bag anytime.
            </p>
          </div>

          <div className="text-xs sm:text-sm font-bold bg-white px-4 py-2 rounded-2xl border border-gray-200 w-fit">
            <span>{wishlistProducts.length}</span> {wishlistProducts.length === 1 ? "Item" : "Items"} Saved
          </div>
        </div>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-gray-100 max-w-lg mx-auto shadow-xs my-8">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-5">
              <FiHeart size={32} />
            </div>
            <h2 className="font-display text-2xl font-black text-black">Your Wishlist is Empty</h2>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Explore our latest fashion drops, oversized silhouettes, and co-ords. Click the heart icon on any piece to save it here.
            </p>
            <Link to="/collection" className="btn-dark mt-6 inline-flex gap-2">
              <span>Explore Collection</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => {
              const discountPercent =
                product.price > product.offerPrice
                  ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
                  : 0;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-black hover:text-white flex items-center justify-center shadow-xs text-gray-500 transition-colors"
                  >
                    <FiTrash2 size={13} />
                  </button>

                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <span className="absolute top-2.5 left-2.5 z-10 bg-black text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                      {discountPercent}% OFF
                    </span>
                  )}

                  {/* Image */}
                  <Link
                    to={`/collection/${product.category?.toLowerCase()}/${product._id}`}
                    className="aspect-[3/4] bg-neutral-50 overflow-hidden flex items-center justify-center p-3 relative block"
                  >
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Body */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {product.brand || "SHOPPR"} • {product.category}
                    </span>

                    <Link
                      to={`/collection/${product.category?.toLowerCase()}/${product._id}`}
                      className="font-display text-xs sm:text-sm font-bold text-black uppercase line-clamp-1 mt-1 hover:text-gray-600 transition-colors"
                    >
                      {product.name}
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-sm sm:text-base text-black">
                        {formatPrice(product.offerPrice)}
                      </span>
                      {product.price > product.offerPrice && (
                        <span className="text-gray-400 line-through text-xs">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Move to bag CTA */}
                    <div className="mt-auto pt-3">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="w-full btn-dark !py-2.5 !rounded-xl text-xs gap-1.5"
                      >
                        <FiShoppingBag size={13} />
                        <span>Move To Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
