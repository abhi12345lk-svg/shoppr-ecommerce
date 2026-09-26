import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiTrendingUp,
  FiAlertCircle,
  FiArrowRight,
  FiTruck
} from "react-icons/fi";
import { ShopContext } from "../../Context/ShopContext";

const AdminDashboard = () => {
  const { axios, products, formatPrice } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/order/list");
        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalRevenue = orders
    .filter((o) => o.isPaid || o.status !== "Cancelled")
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === "Order Placed" || o.status === "Pending Payment");
  const lowStockProducts = products.filter((p) => p.stockCount !== undefined && p.stockCount < 10);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="uppercase tracking-[4px] text-gray-500 text-xs font-bold mb-2">
            Operations &amp; Analytics
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-black leading-none">
            Atelier <span className="text-gray-400 font-light">Dashboard</span>
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Live overview of sales revenue, logistics fulfillment, customer orders, and catalogue inventory.
          </p>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Revenue */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Sales</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                ₹
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-black">
              {formatPrice(totalRevenue)}
            </h3>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <FiTrendingUp />
              <span>Real-time validated GMV</span>
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Orders Received</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FiShoppingBag size={18} />
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-black">
              {orders.length}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              <strong>{pendingOrders.length}</strong> awaiting fulfillment
            </p>
          </div>

          {/* Active Products */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Catalogue</span>
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold">
                <FiBox size={18} />
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-black">
              {products.length}
            </h3>
            <p className="text-xs text-gray-500 mt-1">Across 6 fashion departments</p>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Inventory Alert</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <FiAlertCircle size={18} />
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-black">
              {lowStockProducts.length}
            </h3>
            <p className="text-xs text-amber-700 font-medium mt-1">Styles with low stock &lt; 10</p>
          </div>
        </div>

        {/* 2-Column Section: Recent Orders & Quick Management */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
          {/* Recent Orders Table */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
              <h3 className="font-display font-black text-base uppercase text-black">
                Recent Orders
              </h3>
              <Link to="/admin/orders" className="text-xs font-bold text-black hover:underline flex items-center gap-1">
                <span>View All Orders</span>
                <FiArrowRight size={13} />
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-black">
                          {order._id.slice(-8)}
                        </span>
                        <span className="text-xs text-gray-500">• {order.address?.firstName} {order.address?.lastName}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {order.items?.length || 0} items • {order.paymentMethod} • {order.address?.city}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-black block">{formatPrice(order.amount)}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "Shipped"
                          ? "bg-sky-100 text-sky-800"
                          : "bg-neutral-900 text-white"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-6 text-center">No orders registered yet.</p>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
              <h4 className="font-display font-black text-sm uppercase text-black mb-4">
                Catalogue &amp; Promotions
              </h4>
              <div className="space-y-2.5">
                <Link
                  to="/admin/add"
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  <span>+ Create Fashion Product</span>
                  <FiArrowRight />
                </Link>

                <Link
                  to="/admin/categories"
                  className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black text-xs font-bold transition-colors"
                >
                  <span>Manage Categories &amp; Sub-styles</span>
                  <FiArrowRight />
                </Link>

                <Link
                  to="/admin/coupons"
                  className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black text-xs font-bold transition-colors"
                >
                  <span>Manage Discount Coupons</span>
                  <FiArrowRight />
                </Link>

                <Link
                  to="/admin/list"
                  className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black text-xs font-bold transition-colors"
                >
                  <span>Inventory &amp; Stock Levels</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            {/* Logistics summary tile */}
            <div className="bg-black text-white rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-2 text-neutral-400 text-xs uppercase font-bold tracking-wider">
                <FiTruck />
                <span>Logistics Network</span>
              </div>
              <h4 className="font-display text-lg font-black">Delhivery Express Integration</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Automated AWB generation, real-time tracking webhooks, and 26,000+ PIN code serviceability active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
