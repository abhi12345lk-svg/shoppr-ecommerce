import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiHeart, FiShoppingBag, FiArrowRight, FiMinus, FiPlus, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../components/CartTotal";
import Item from "../components/Item";

const Cart = () => {
  const {
    navigate,
    products,
    cartItems,
    updateQuantity,
    formatPrice,
    toggleWishlist,
    isInWishlist
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const list = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            list.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size]
            });
          }
        }
      }
      setCartData(list);
    } else {
      setCartData([]);
    }
  }, [cartItems, products]);

  const handleIncrement = (id, size) => {
    const curr = cartItems[id]?.[size] || 0;
    updateQuantity(id, size, curr + 1);
  };

  const handleDecrement = (id, size) => {
    const curr = cartItems[id]?.[size] || 0;
    if (curr > 1) {
      updateQuantity(id, size, curr - 1);
    } else {
      updateQuantity(id, size, 0);
    }
  };

  /* ================= EMPTY BAG STATE ================= */
  if (cartData.length === 0) {
    return (
      <div className="bg-[#fafafa] min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xs border border-gray-100 max-w-md w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-5 text-gray-400">
            <FiShoppingBag size={28} />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-black">
            Your Bag is Empty
          </h2>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm leading-relaxed">
            You haven't added any luxury streetwear pieces or clothing to your bag yet.
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="mt-6 w-full btn-dark text-xs uppercase tracking-wider"
          >
            Explore Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pt-4 sm:pt-8 pb-24 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Heading */}
        <div className="mb-6 pb-4 border-b border-gray-200/80 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
              Checkout Bag
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
              Shopping <span className="text-gray-400 font-light">Bag</span>
            </h1>
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-500">
            {cartData.length} {cartData.length === 1 ? "Product" : "Products"} Selected
          </span>
        </div>

        {/* 2-Column Bag Layout */}
        <div className="grid xl:grid-cols-[1.8fr_1fr] gap-8 items-start">

          {/* Left Column: Items List */}
          <div className="flex flex-col gap-4">
            {cartData.map((item, idx) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              const inWishlist = isInWishlist(product._id);
              const pricePerUnit = Number(product.offerPrice || product.price);
              const itemTotal = pricePerUnit * item.quantity;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Thumbnail & Info */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <Link
                      to={`/collection/${product.category?.toLowerCase()}/${product._id}`}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-neutral-100 shrink-0 border border-gray-100 overflow-hidden block"
                    >
                      <img
                        src={
                          product.image?.[0] ||
                          "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-full h-full object-cover object-top"
                      />
                    </Link>

                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        {product.brand || "SHOPPR"} • {product.category}
                      </span>

                      <Link
                        to={`/collection/${product.category?.toLowerCase()}/${product._id}`}
                        className="font-display text-sm sm:text-base font-bold text-black uppercase leading-snug truncate block hover:text-gray-600 transition-colors"
                      >
                        {product.name}
                      </Link>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-neutral-100 text-neutral-800 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-neutral-200">
                          Size: {item.size}
                        </span>
                        <span className="text-xs text-gray-500 font-semibold">
                          {formatPrice(pricePerUnit)} / each
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                        <span>⚡ Express dispatch in 24h</span>
                        <span className="text-gray-300">•</span>
                        <span>7-day returnable</span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                      <button
                        onClick={() => handleDecrement(item._id, item.size)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-colors shadow-xs"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item._id, item.size)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-colors shadow-xs"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    {/* Total Price for this item */}
                    <div className="text-right min-w-[80px]">
                      <span className="font-display font-black text-base sm:text-lg text-black block">
                        {formatPrice(itemTotal)}
                      </span>
                      {product.price > product.offerPrice && (
                        <span className="text-[11px] text-gray-400 line-through">
                          {formatPrice(product.price * item.quantity)}
                        </span>
                      )}
                    </div>

                    {/* Action buttons: Move to Wishlist / Remove */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleWishlist(product._id)}
                        title={inWishlist ? "Saved in Wishlist" : "Move to Wishlist"}
                        aria-label="Wishlist toggle"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          inWishlist ? "text-rose-600 bg-rose-50" : "text-gray-400 hover:text-black hover:bg-gray-100"
                        }`}
                      >
                        <FiHeart size={14} className={inWishlist ? "fill-rose-600" : ""} />
                      </button>

                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        title="Remove from Bag"
                        aria-label="Remove item"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Trust Assurance Banner */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600 shadow-xs">
              <div className="flex items-center gap-2">
                <FiRefreshCw className="text-black shrink-0" size={15} />
                <span><strong>7 Days Return</strong> with doorstep pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-black shrink-0" size={15} />
                <span><strong>100% Genuine</strong> certified luxury fashion</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTruck className="text-black shrink-0" size={15} />
                <span><strong>Express Dispatch</strong> all across India</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:underline"
              >
                <span>Continue Shopping Catalogue</span>
                <FiArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon Engine */}
          <div className="xl:sticky xl:top-24">
            <CartTotal />
          </div>

        </div>

        {/* ================= COMPLETE YOUR LOOK RECOMMENDATIONS ================= */}
        {products.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200/80">
            <div className="flex items-end justify-between mb-6 pb-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-1">
                  You Might Also Like
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
                  Complete Your Look
                </h3>
              </div>
              <Link
                to="/collection"
                className="text-xs font-bold uppercase tracking-wider text-black hover:underline flex items-center gap-1"
              >
                <span>Explore All</span>
                <FiArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.slice(0, 4).map((p) => (
                <Item key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;