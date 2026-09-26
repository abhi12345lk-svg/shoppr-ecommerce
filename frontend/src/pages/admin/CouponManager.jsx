import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiPlus, FiTrash2, FiTag } from "react-icons/fi";
import { ShopContext } from "../../Context/ShopContext";

const CouponManager = () => {
  const { axios, formatPrice } = useContext(ShopContext);

  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get("/api/coupon/list");
      if (data.success) {
        setCoupons(data.coupons || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!code.trim() || !discountValue) {
      toast.error("Code and discount value required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/coupon/add", {
        code: code.trim().toUpperCase(),
        description: description.trim(),
        discountType,
        discountValue: Number(discountValue),
        minOrderAmount: Number(minOrderAmount) || 0,
        maxDiscountAmount: Number(maxDiscountAmount) || 0
      });

      if (data.success) {
        toast.success(data.message || "Coupon created");
        setCode("");
        setDescription("");
        setDiscountValue("");
        setMinOrderAmount("");
        setMaxDiscountAmount("");
        fetchCoupons();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm("Delete this promotional coupon?")) return;
    try {
      const { data } = await axios.post("/api/coupon/delete", { couponId });
      if (data.success) {
        toast.success("Coupon deleted");
        fetchCoupons();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="uppercase tracking-[4px] text-gray-500 text-xs font-bold mb-2">
            Discounts &amp; Campaigns
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-black leading-none">
            Coupon <span className="text-gray-400 font-light">Engine</span>
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Create promotional discount codes validated server-side to prevent client pricing tampering.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-8 items-start">
          {/* Create Coupon Form */}
          <form
            onSubmit={handleCreateCoupon}
            className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4"
          >
            <h3 className="font-display font-black text-lg uppercase text-black mb-4">
              Add New Coupon
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Promo Code (e.g. FESTIVE20) *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="PROMOCODE"
                className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-black uppercase outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Discount Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-2xl px-3 py-3 text-xs sm:text-sm font-semibold outline-none focus:border-black"
                >
                  <option value="percent">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Discount Value *
                </label>
                <input
                  type="number"
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === "percent" ? "15" : "500"}
                  className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Min Order (₹)
                </label>
                <input
                  type="number"
                  value={minOrderAmount}
                  onChange={(e) => setMinOrderAmount(e.target.value)}
                  placeholder="999"
                  className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Max Cap (₹, 0 = no cap)
                </label>
                <input
                  type="number"
                  value={maxDiscountAmount}
                  onChange={(e) => setMaxDiscountAmount(e.target.value)}
                  placeholder="500"
                  className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Campaign Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 15% instant off on street drops"
                className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-dark !py-3.5 !rounded-2xl text-xs uppercase tracking-wider gap-2"
            >
              <FiPlus size={16} />
              <span>{loading ? "Saving..." : "Create Coupon"}</span>
            </button>
          </form>

          {/* Active Coupons List */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h3 className="font-display font-black text-lg uppercase text-black mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Active Coupons</span>
              <span className="text-xs text-gray-400 font-bold">{coupons.length} Active</span>
            </h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {coupons.map((c) => (
                <div
                  key={c._id || c.code}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                      <FiTag size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm uppercase text-black">
                          {c.code}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {c.discountType === "percent" ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{c.description || "Promotional coupon"}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Min Order: {formatPrice(c.minOrderAmount || 0)}
                        {c.maxDiscountAmount > 0 ? ` • Max Cap: ${formatPrice(c.maxDiscountAmount)}` : ""}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCoupon(c._id)}
                    className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponManager;
