/* ======================= BRANDPROMISE.JSX — FULLY RESPONSIVE TRUST BAR ======================= */

import React from "react";
import { FiTruck, FiPackage, FiShield, FiCreditCard } from "react-icons/fi";

const BrandPromise = () => {
  const features = [
    {
      icon: <FiTruck size={20} className="text-black stroke-[1.6] shrink-0" />,
      title: "FREE SHIPPING",
      subtitle: "On orders above ₹999"
    },
    {
      icon: <FiPackage size={20} className="text-black stroke-[1.6] shrink-0" />,
      title: "EASY RETURNS",
      subtitle: "7 days hassle-free"
    },
    {
      icon: <FiShield size={20} className="text-black stroke-[1.6] shrink-0" />,
      title: "PREMIUM QUALITY",
      subtitle: "Built to last"
    },
    {
      icon: <FiCreditCard size={20} className="text-black stroke-[1.6] shrink-0" />,
      title: "SECURE PAYMENTS",
      subtitle: "100% safe & trusted"
    }
  ];

  return (
    <div className="w-full bg-white border-y border-gray-100">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* 2-col on mobile / 4-col on md+ with dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`group flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 transition-colors hover:bg-gray-50/70 ${
                idx !== features.length - 1
                  ? "border-r border-gray-100"
                  : ""
              } ${idx >= 2 ? "border-t border-gray-100 md:border-t-0" : ""}`}
            >
              {/* Icon bubble */}
              <div className="hidden sm:flex shrink-0 w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-white border border-gray-100 group-hover:border-gray-200 items-center justify-center transition-all">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-display text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-[0.08em] sm:tracking-wider text-black leading-tight truncate">
                  {item.title}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-normal leading-tight mt-0.5 truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandPromise;
