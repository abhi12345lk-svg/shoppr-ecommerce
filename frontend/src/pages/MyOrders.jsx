// ======================= MYORDERS.JSX (ORDERS & LIVE TRACKING) =======================

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBox,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiArrowRight,
  FiMapPin
} from "react-icons/fi";
import { FaMoneyBillWave, FaStripe } from "react-icons/fa";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import TrackingModal from "../components/TrackingModal";

const MyOrders = () => {
  const { user, axios, formatPrice, setShowUserLogin } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);

  /* ================= LOAD ORDERS ================= */
  const loadOrderData = async () => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams(window.location.search);
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");

      let url = "/api/order/userorders";
      if (success && orderId) {
        url += `?success=${success}&orderId=${orderId}`;
      }

      const { data } = await axios.get(url);

      if (data.success) {
        setOrders(data.orders || []);
        if (success === "true") {
          toast.success("Payment Successful! Your order has been placed.");
        }
        window.history.replaceState({}, document.title, "/my-orders");
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CANCEL ORDER ================= */
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const { data } = await axios.post("/api/order/cancel", {
        orderId,
        reason: "Customer requested cancellation."
      });

      if (data.success) {
        toast.success(data.message || "Order cancelled successfully");
        loadOrderData();
      } else {
        toast.error(data.message || "Could not cancel order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrderData();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  /* ================= GUEST / NOT LOGGED IN ================= */
  if (!user) {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#fafafa]">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xs text-center max-w-md w-full border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <FiBox size={28} />
          </div>
          <h2 className="font-display text-2xl font-black text-black">
            Sign In to View Orders
          </h2>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm leading-relaxed">
            Please log in with your email to access your past purchases, shipment tracking, and invoice details.
          </p>
          <button
            onClick={() => setShowUserLogin(true)}
            className="mt-6 w-full btn-dark text-xs uppercase tracking-wider"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pt-4 sm:pt-8 pb-24 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Heading */}
        <div className="mb-6 pb-4 border-b border-gray-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
              Order History &amp; Logistics
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
              My <span className="text-gray-400 font-light">Orders</span>
            </h1>
          </div>
          <div className="text-xs sm:text-sm font-bold text-gray-500">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"} Registered
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-6 border border-gray-100 animate-pulse h-48" />
            ))}
          </div>
        )}

        {/* Empty Orders */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-gray-100 max-w-md mx-auto my-10 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <FiBox size={32} />
            </div>
            <h3 className="font-display text-2xl font-black text-black">No Orders Placed Yet</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Looks like your wardrobe is waiting for fresh fits. Explore our curated street collections and place your first order.
            </p>
            <Link to="/collection" className="btn-dark mt-6 inline-flex gap-2 text-xs uppercase tracking-wider">
              <span>Start Shopping</span>
              <FiArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => {
              const shipping = order.shippingInfo || {};
              const awbNumber = shipping.awb || `SHP-${order._id.slice(-8)}`;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Top Bar: Order ID, Date, Badges */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-gray-100 mb-5">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Order ID:
                        </span>
                        <span className="font-mono text-xs font-bold text-black bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-200">
                          {order._id}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">
                          Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Status badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        order.isPaid ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                      }`}>
                        {order.isPaid ? "Payment Verified" : "Payment Pending"}
                      </span>

                      <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-900"
                          : order.status === "Shipped" || order.status === "In Transit"
                          ? "bg-sky-100 text-sky-900"
                          : order.status === "Cancelled"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-neutral-900 text-white"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-gray-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-16 h-20 rounded-2xl bg-neutral-100 shrink-0 border border-gray-100 overflow-hidden">
                            <img
                              src={item.product?.image?.[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"}
                              alt={item.product?.name || "Product"}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80";
                              }}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-display font-bold text-sm sm:text-base text-black uppercase leading-snug truncate">
                              {item.product?.name || "Fashion Product"}
                            </h4>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 font-medium">
                              <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md font-bold">
                                Size: {item.size}
                              </span>
                              <span>Qty: {item.quantity}</span>
                              <span>Price: {formatPrice(item.product?.offerPrice || 0)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="font-display font-black text-sm sm:text-base text-black sm:text-right shrink-0">
                          {formatPrice((item.product?.offerPrice || 0) * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Logistics Action Bar */}
                  <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/70 p-4 rounded-2xl">
                    {/* Carrier & AWB snippet */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiTruck className="text-black shrink-0" size={16} />
                        <span>
                          <strong>Carrier:</strong> {shipping.carrier || "Delhivery Express"}
                        </span>
                      </div>
                      <div>
                        <span>
                          <strong>AWB:</strong> {awbNumber}
                        </span>
                      </div>
                      <div>
                        <span>
                          <strong>Total:</strong> <strong className="text-black font-black text-sm">{formatPrice(order.amount)}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => setSelectedTrackingOrder(order)}
                        className="btn-dark !py-2.5 !px-5 text-xs gap-1.5 flex items-center"
                      >
                        <FiTruck size={14} />
                        <span>Track Shipment</span>
                      </button>

                      {order.status !== "Shipped" &&
                        order.status !== "Delivered" &&
                        order.status !== "Cancelled" && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3.5 py-2.5 rounded-xl border border-rose-200 transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TRACKING MODAL */}
        {selectedTrackingOrder && (
          <TrackingModal
            order={selectedTrackingOrder}
            onClose={() => setSelectedTrackingOrder(null)}
          />
        )}

      </div>
    </div>
  );
};

export default MyOrders;