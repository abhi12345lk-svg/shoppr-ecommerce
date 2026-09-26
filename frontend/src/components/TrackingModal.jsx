import React from "react";
import { FiX, FiTruck, FiCheckCircle, FiPackage, FiMapPin, FiExternalLink } from "react-icons/fi";

const TrackingModal = ({ order, onClose }) => {
  if (!order) return null;

  const shippingInfo = order.shippingInfo || {};
  const timeline = shippingInfo.timeline || [
    {
      status: order.status || "Order Placed",
      title: order.status || "Order Placed",
      location: order.address?.city || "Fulfillment Center",
      timestamp: order.createdAt || new Date(),
      note: "Order has been processed."
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracking-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#0a0a0a] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <FiTruck size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">Live Shipment Tracking</p>
              <h3 id="tracking-title" className="font-display text-lg font-black tracking-tight">
                AWB: {shippingInfo.awb || `SHP-${order._id?.slice(-8)}`}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tracking"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Courier Details Banner */}
        <div className="p-4 bg-neutral-50 border-b border-gray-100 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-gray-400 block font-semibold">Logistics Partner</span>
            <span className="font-bold text-black text-sm">{shippingInfo.carrier || "Delhivery Express"}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold">Estimated Delivery</span>
            <span className="font-bold text-emerald-700 text-sm">{shippingInfo.estimatedDelivery || "3-4 Business Days"}</span>
          </div>
        </div>

        {/* Destination Address Snippet */}
        <div className="px-5 py-3 border-b border-gray-100 text-xs text-gray-600 flex items-center gap-2">
          <FiMapPin className="text-gray-400 shrink-0" />
          <span className="truncate">
            Delivering to: <strong>{order.address?.firstName} {order.address?.lastName}</strong>, {order.address?.city}, {order.address?.zipcode}
          </span>
        </div>

        {/* Timeline */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
            {timeline.map((step, idx) => {
              const isLatest = idx === timeline.length - 1;
              return (
                <div key={idx} className="relative group">
                  {/* Status dot */}
                  <div
                    className={`absolute -left-[27px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      isLatest
                        ? "bg-black border-black text-white shadow-xs"
                        : "bg-white border-neutral-300 text-neutral-400"
                    }`}
                  >
                    {isLatest ? <FiCheckCircle size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />}
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className={`text-sm font-bold ${isLatest ? "text-black" : "text-gray-600"}`}>
                        {step.title || step.status}
                      </h4>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {step.timestamp ? new Date(step.timestamp).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : ""}
                      </span>
                    </div>

                    {step.location && (
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <FiMapPin size={11} className="text-gray-400" />
                        <span>{step.location}</span>
                      </p>
                    )}

                    {step.note && (
                      <p className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded-xl border border-gray-100">
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          {shippingInfo.trackingUrl ? (
            <a
              href={shippingInfo.trackingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-neutral-700 hover:text-black flex items-center gap-1.5 underline"
            >
              <span>Track on Courier Site</span>
              <FiExternalLink size={12} />
            </a>
          ) : (
            <span className="text-xs text-gray-400">Doorstep Delivery Protected</span>
          )}

          <button onClick={onClose} className="btn-dark !py-2 !px-5 text-xs">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
