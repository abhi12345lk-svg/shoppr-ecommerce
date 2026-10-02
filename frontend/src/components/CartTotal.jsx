import React, { useContext, useState } from "react";
import { FiTag, FiCheck, FiX, FiTruck, FiShield } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const CartTotal = () => {
  const {
    formatPrice,
    getCartSubtotal,
    getCartDiscount,
    getDeliveryCharges,
    getTaxAmount,
    getCartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    navigate
  } = useContext(ShopContext);

  const [couponInput, setCouponInput] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const delivery = getDeliveryCharges();
  const tax = getTaxAmount();
  const total = getCartTotal();

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - (subtotal - discount));
  const shippingProgress = Math.min(100, Math.round(((subtotal - discount) / freeShippingThreshold) * 100));

  const handleApplyCoupon = async (e) => {
    e?.preventDefault();
    if (!couponInput.trim()) return;
    setLoadingCoupon(true);
    const success = await applyCoupon(couponInput.trim());
    if (success) {
      setCouponInput("");
    }
    setLoadingCoupon(false);
  };

  const quickCoupons = [
    { code: "WELCOME500", label: "Flat ₹500 OFF on ₹1,999+" },
    { code: "FASHION15", label: "15% OFF on ₹999+" },
    { code: "SNITCH20", label: "20% OFF on Streetwear" }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 sm:p-7">
      {/* Free Shipping Progress Meter */}
      <div className="mb-6 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs font-bold mb-2">
          <FiTruck className="text-black" size={16} />
          {amountNeededForFreeShipping === 0 ? (
            <span className="text-emerald-600">You've unlocked FREE Express Shipping!</span>
          ) : (
            <span>
              Add <strong className="text-black">{formatPrice(amountNeededForFreeShipping)}</strong> more for <strong>FREE Shipping</strong>
            </span>
          )}
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              shippingProgress === 100 ? "bg-emerald-500" : "bg-black"
            }`}
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-5">
        <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-bold mb-1">
          Payment Breakdown
        </p>
        <h3 className="font-display text-xl sm:text-2xl font-black text-black">
          Order Summary
        </h3>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-3.5 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Bag Subtotal</span>
          <span className="font-bold text-black">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 font-semibold bg-emerald-50 px-3 py-2 rounded-xl">
            <span className="flex items-center gap-1.5">
              <FiTag size={13} />
              Coupon ({appliedCoupon?.code})
            </span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-1.5">
            <span>Express Delivery</span>
            {delivery === 0 && (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold uppercase">
                Free
              </span>
            )}
          </div>
          <span className="font-bold text-black">
            {delivery === 0 ? "FREE" : formatPrice(delivery)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Estimated GST (5%)</span>
          <span className="font-bold text-black">{formatPrice(tax)}</span>
        </div>

        {/* Total Divider */}
        <div className="border-t border-dashed border-gray-200 pt-4 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-lg font-black text-black block">Total Payable</span>
              <span className="text-[11px] text-gray-400">All Indian taxes included</span>
            </div>
            <span className="font-display text-2xl font-black text-black">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Coupon Application Box */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
          Promotional Coupon
        </label>

        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-neutral-900 text-white p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <div>
                <p className="text-xs font-black tracking-wider uppercase">{appliedCoupon.code}</p>
                <p className="text-[10px] text-neutral-400">Saved {formatPrice(discount)}</p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 underline font-medium"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 border border-gray-200 rounded-2xl px-3.5 py-2.5 text-xs font-semibold uppercase outline-none focus:border-black"
            />
            <button
              type="submit"
              disabled={loadingCoupon}
              className="btn-dark !py-2.5 !px-4 text-xs font-bold shrink-0"
            >
              {loadingCoupon ? "..." : "Apply"}
            </button>
          </form>
        )}

        {/* Quick Offer Chips */}
        {!appliedCoupon && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {quickCoupons.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyCoupon(c.code)}
                className="text-[10px] font-bold bg-neutral-100 hover:bg-black hover:text-white text-neutral-700 px-2.5 py-1 rounded-lg transition-colors border border-neutral-200"
              >
                🏷️ {c.code}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Checkout CTA */}
      <button
        onClick={() => navigate("/place-order")}
        disabled={subtotal === 0}
        className="sheen-wrapper w-full mt-6 btn-dark !py-4 !rounded-2xl text-xs sm:text-sm uppercase tracking-wider font-black shadow-xl cursor-pointer disabled:opacity-50"
      >
        Proceed to Checkout • {formatPrice(total)}
      </button>

      {/* Trust reassurance */}
      <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-gray-500 font-medium">
        <FiShield className="text-emerald-600" />
        <span>100% Secure Checkout with 256-bit SSL</span>
      </div>

      {/* Payment Partner Badges */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 flex-wrap text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        <span className="px-2 py-0.5 bg-neutral-100 rounded-md text-neutral-600">UPI</span>
        <span className="px-2 py-0.5 bg-neutral-100 rounded-md text-neutral-600">Cards</span>
        <span className="px-2 py-0.5 bg-neutral-100 rounded-md text-neutral-600">NetBanking</span>
        <span className="px-2 py-0.5 bg-neutral-100 rounded-md text-neutral-600">Cash on Delivery</span>
      </div>
    </div>
  );
};

export default CartTotal;