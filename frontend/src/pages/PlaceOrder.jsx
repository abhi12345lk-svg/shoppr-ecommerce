// ======================= PLACEORDER.JSX (HIGH CONVERSION CHECKOUT) =======================

import React, { useContext, useState, useEffect } from "react";
import { FiCheckCircle, FiTruck, FiShield, FiTag } from "react-icons/fi";
import { FaMoneyBillWave, FaStripe } from "react-icons/fa";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const PlaceOrder = () => {
  const {
    formatPrice,
    getCartSubtotal,
    getCartDiscount,
    getDeliveryCharges,
    getTaxAmount,
    getCartTotal,
    appliedCoupon,
    navigate,
    cartItems,
    axios,
    setCartItems,
    user,
    checkPincode
  } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);

  // Address inputs
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Delhi");
  const [zipcode, setZipcode] = useState("");

  const [pincodeFeedback, setPincodeFeedback] = useState(null);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const delivery = getDeliveryCharges();
  const tax = getTaxAmount();
  const total = getCartTotal();

  // Validate pincode on input change (when 6 digits are typed)
  useEffect(() => {
    const clean = zipcode.trim();
    if (clean.length === 6) {
      checkPincode(clean).then((res) => {
        setPincodeFeedback(res);
        if (res.serviceable && res.nearestHub) {
          if (!city) setCity(res.nearestHub.split(" ")[0]);
        }
      });
    } else {
      setPincodeFeedback(null);
    }
  }, [zipcode]);

  /* ================= SUBMIT ORDER ================= */
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (subtotal === 0) {
      toast.error("Your shopping bag is empty");
      return;
    }

    if (!firstName || !lastName || !email || !phone || !street || !city || !state || !zipcode) {
      toast.error("Please fill in all delivery details");
      return;
    }

    // Validate Indian phone number (10 digits)
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit Indian phone number");
      return;
    }

    // Validate 6-digit Indian PIN code
    if (!/^[1-9][0-9]{5}$/.test(zipcode.trim())) {
      toast.error("Please enter a valid 6-digit Indian postal code");
      return;
    }

    try {
      setSubmitting(true);

      const addressPayload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: cleanPhone.slice(-10),
        street: street.trim(),
        landmark: landmark.trim(),
        city: city.trim(),
        state: state.trim(),
        zipcode: zipcode.trim(),
        country: "India"
      };

      const orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            orderItems.push({
              product: itemId,
              quantity,
              size
            });
          }
        }
      }

      const payload = {
        items: orderItems,
        address: addressPayload,
        couponCode: appliedCoupon ? appliedCoupon.code : ""
      };

      /* ================= COD FLOW ================= */
      if (paymentMethod === "cod") {
        const { data } = await axios.post("/api/order/cod", payload);
        if (data.success) {
          toast.success(data.message || "Order Confirmed!");
          setCartItems({});
          navigate(`/my-orders?newOrder=true&orderId=${data.orderId || ""}`);
        } else {
          toast.error(data.message || "Unable to place COD order");
        }
      }

      /* ================= STRIPE FLOW ================= */
      if (paymentMethod === "stripe") {
        const { data } = await axios.post("/api/order/stripe", payload);
        if (data.success && data.url) {
          window.location.href = data.url;
        } else {
          toast.error(data.message || "Stripe gateway error");
        }
      }
    } catch (error) {
      console.error("Place Order Error:", error);
      toast.error(error.response?.data?.message || "Order placement failed. Please verify your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pt-4 sm:pt-8 pb-24 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200/80">
          <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
            Express Checkout
          </p>
          <h1 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Delivery &amp; <span className="text-gray-400 font-light">Payment</span>
          </h1>
        </div>

        {/* 2-Column Form Layout */}
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">

          {/* Left Column: Delivery Form + Payment Options */}
          <div className="space-y-6">

            {/* STEP 1: CONTACT & DELIVERY ADDRESS */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-display text-lg font-black uppercase text-black">
                  Shipping Address (India)
                </h2>
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Aarav"
                    className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sharma"
                    className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aarav@gmail.com"
                    className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Phone (10 Digits) *
                  </label>
                  <div className="flex bg-[#fbfbfb] border border-gray-200 rounded-2xl overflow-hidden focus-within:border-black">
                    <span className="px-3.5 py-3 text-xs font-bold text-gray-500 bg-gray-100 flex items-center border-r border-gray-200">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="9876543210"
                      className="w-full bg-transparent px-3 py-3 text-xs sm:text-sm font-medium outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Street Address */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Flat, House No., Building, Street *
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Apartment 4B, Sector 54, Golf Course Road"
                  className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Landmark */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Near Metro Station or Landmark"
                  className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Pincode, City, State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    PIN Code (6 digits) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value.replace(/\D/g, ""))}
                    placeholder="110001"
                    className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    City / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New Delhi"
                    className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-gray-200 rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black cursor-pointer"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pincode Feedback status */}
              {pincodeFeedback && (
                <div className={`mt-4 p-3 rounded-2xl text-xs flex items-center gap-2 ${
                  pincodeFeedback.serviceable ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}>
                  <FiTruck size={16} />
                  <span>
                    {pincodeFeedback.serviceable
                      ? `Fast delivery available by ${pincodeFeedback.estimatedDate} via ${pincodeFeedback.carrier}`
                      : pincodeFeedback.message}
                  </span>
                </div>
              )}
            </div>

            {/* STEP 2: PAYMENT METHOD SELECTION */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-display text-lg font-black uppercase text-black">
                  Select Payment Option
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-black bg-neutral-50 shadow-xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <FaMoneyBillWave size={20} className="text-emerald-600" />
                      <span className="font-display font-black text-sm uppercase text-black">
                        Cash On Delivery
                      </span>
                    </div>
                    {paymentMethod === "cod" && <FiCheckCircle size={18} className="text-black" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Pay in cash or UPI QR code at your doorstep upon receiving the parcel.
                  </p>
                </div>

                {/* Stripe Online Cards / UPI Ready */}
                <div
                  onClick={() => setPaymentMethod("stripe")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "stripe"
                      ? "border-[#635BFF] bg-[#f8f9ff] shadow-xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <FaStripe size={28} className="text-[#635BFF]" />
                      <span className="font-display font-black text-sm uppercase text-black">
                        Online Cards / Stripe
                      </span>
                    </div>
                    {paymentMethod === "stripe" && <FiCheckCircle size={18} className="text-[#635BFF]" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Secure checkout with Credit / Debit Cards &amp; Global Netbanking.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Place Button */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-xs">
              <h3 className="font-display text-xl font-black uppercase text-black mb-5 pb-4 border-b border-gray-100">
                Order Review
              </h3>

              {/* Items Mini List */}
              <div className="space-y-3.5 text-xs text-gray-600 pb-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-black">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl">
                    <span className="flex items-center gap-1.5">
                      <FiTag size={12} />
                      Coupon ({appliedCoupon?.code})
                    </span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Express Logistics</span>
                  <span className="font-bold text-black">
                    {delivery === 0 ? "FREE" : formatPrice(delivery)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Estimated GST (5%)</span>
                  <span className="font-bold text-black">{formatPrice(tax)}</span>
                </div>
              </div>

              {/* Total Payable */}
              <div className="py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-display text-base font-black text-black block">Total Payable</span>
                  <span className="text-[10px] text-gray-400">All Indian taxes included</span>
                </div>
                <span className="font-display text-2xl font-black text-black">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full mt-6 btn-dark !py-4 !rounded-2xl text-xs sm:text-sm uppercase tracking-wider font-bold shadow-lg transition-all ${
                  paymentMethod === "stripe" ? "!bg-[#635BFF] hover:!bg-[#554df7]" : ""
                }`}
              >
                {submitting
                  ? "Processing Order..."
                  : paymentMethod === "stripe"
                  ? `Proceed to Stripe (${formatPrice(total)})`
                  : `Place COD Order (${formatPrice(total)})`}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <FiShield className="text-emerald-600" />
                <span>Encrypted &amp; Protected Order Placement</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default PlaceOrder;