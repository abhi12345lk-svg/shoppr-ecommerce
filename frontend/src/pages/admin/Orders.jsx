/* ======================= ORDERS.JSX (ADMIN LOGISTICS & ORDERS) ======================= */

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaBoxOpen,
  FaShippingFast,
  FaMoneyBillWave,
  FaUserAlt,
  FaTruck
} from "react-icons/fa";
import { ShopContext } from "../../Context/ShopContext";
import TrackingModal from "../../components/TrackingModal";

const Orders = () => {
  const { formatPrice, axios } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [awbInputs, setAwbInputs] = useState({});

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/list");
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post("/api/order/status", {
        orderId,
        status,
        location: "Fulfillment Central Hub"
      });

      if (data.success) {
        toast.success(data.message || "Order Status Updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= UPDATE AWB / TRACKING ================= */
  const handleUpdateAwb = async (orderId) => {
    const awb = awbInputs[orderId];
    if (!awb || !awb.trim()) {
      toast.error("Please enter a valid AWB number");
      return;
    }

    try {
      const { data } = await axios.post("/api/shipping/update-milestone", {
        orderId,
        awb: awb.trim(),
        carrier: "Delhivery Express"
      });

      if (data.success) {
        toast.success("AWB assigned successfully");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8 sm:mb-10">
          <div>
            <p className="uppercase tracking-[4px] text-gray-500 text-xs font-bold mb-2">
              Logistics &amp; Dispatch
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-black leading-none">
              Order <span className="text-gray-400 font-light">Fulfillment</span>
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Dispatch parcels, assign AWB courier tracking, update status milestones, and verify customer payments.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl px-6 py-4 shadow-sm flex items-center gap-4 w-fit">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-xl">
              <FaBoxOpen />
            </div>
            <div>
              <h4 className="text-2xl font-black text-black">{orders.length}</h4>
              <p className="text-gray-500 text-xs font-medium">Total Orders</p>
            </div>
          </div>
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-black">No Customer Orders Yet</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => {
              const shipping = order.shippingInfo || {};
              const awb = shipping.awb || "";

              return (
                <div
                  key={order._id}
                  className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Top Order Metadata */}
                  <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs font-bold text-black bg-white px-2.5 py-1 rounded-xl border border-gray-200">
                        ID: {order._id}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-neutral-900 text-white uppercase">
                        {order.paymentMethod}
                      </span>
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        order.isPaid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {order.isPaid ? "Payment Verified" : "Payment Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-6 divide-y divide-gray-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product?.image?.[0] || "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80"}
                            alt="product"
                            className="w-14 h-16 object-cover rounded-xl bg-neutral-100 border border-gray-200 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-black leading-snug">
                              {item.product?.name || "Product"}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                              <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-black">
                                Size: {item.size}
                              </span>
                              <span>Qty: {item.quantity}</span>
                              <span>Price: {formatPrice(item.product?.offerPrice || 0)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status dropdown */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <span className="text-xs font-bold text-gray-400">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-xs font-bold outline-none focus:border-black shadow-xs cursor-pointer"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Out for delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Returned">Returned</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer, Shipping, and Logistics Bar */}
                  <div className="p-6 bg-gray-50/70 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    {/* Customer */}
                    <div>
                      <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Customer</p>
                      <p className="font-black text-sm text-black">
                        {order.address?.firstName} {order.address?.lastName}
                      </p>
                      <p className="text-gray-500 mt-0.5">{order.address?.email}</p>
                      <p className="text-gray-500 font-semibold">{order.address?.phone}</p>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Destination Address</p>
                      <p className="text-gray-700 leading-relaxed">
                        {order.address?.street}, {order.address?.city}, {order.address?.state} - <strong>{order.address?.zipcode}</strong>
                      </p>
                    </div>

                    {/* Logistics / AWB Input */}
                    <div>
                      <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Logistics (Delhivery / Shiprocket)</p>
                      <div className="flex gap-1.5 mt-1">
                        <input
                          type="text"
                          defaultValue={awb}
                          placeholder="Assign AWB No."
                          onChange={(e) => setAwbInputs({ ...awbInputs, [order._id]: e.target.value })}
                          className="flex-1 border border-gray-200 rounded-xl px-2.5 py-1.5 bg-white text-xs font-mono outline-none focus:border-black"
                        />
                        <button
                          onClick={() => handleUpdateAwb(order._id)}
                          className="btn-dark !py-1.5 !px-3 text-[11px] shrink-0"
                        >
                          Save
                        </button>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="font-bold text-black text-sm">Total: {formatPrice(order.amount)}</span>
                        <button
                          onClick={() => setSelectedTrackingOrder(order)}
                          className="text-xs font-bold text-neutral-800 underline hover:text-black flex items-center gap-1"
                        >
                          <FaTruck size={12} />
                          <span>View Milestones</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tracking modal */}
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

export default Orders;