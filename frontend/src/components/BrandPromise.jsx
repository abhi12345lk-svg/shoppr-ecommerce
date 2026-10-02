/* ======================= BRANDPROMISE.JSX — LUXURY VALUE PROPOSITIONS ======================= */

import React from "react";
import { FiTruck, FiPackage, FiShield, FiCreditCard } from "react-icons/fi";

const BrandPromise = () => {
  const features = [
    {
      icon: <FiTruck size={18} className="text-neutral-900 stroke-[1.8] shrink-0" />,
      title: "EXPRESS DOORSTEP DELIVERY",
      subtitle: "Free across India on ₹999+"
    },
    {
      icon: <FiPackage size={18} className="text-neutral-900 stroke-[1.8] shrink-0" />,
      title: "7-DAY EASY EXCHANGES",
      subtitle: "Instant pickup & zero questions"
    },
    {
      icon: <FiShield size={18} className="text-neutral-900 stroke-[1.8] shrink-0" />,
      title: "ATELIER CRAFTSMANSHIP",
      subtitle: "Heavyweight fabrics & premium fit"
    },
    {
      icon: <FiCreditCard size={18} className="text-neutral-900 stroke-[1.8] shrink-0" />,
      title: "100% SECURE CHECKOUT",
      subtitle: "UPI, Cards, NetBanking & COD"
    }
  ];

  return (
    <div className="w-full bg-white border-y border-neutral-200/60 shadow-2xs">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-4.5 sm:py-5.5 transition-all hover:bg-neutral-50/80 ${
                idx !== features.length - 1
                  ? "border-r border-neutral-100"
                  : ""
              } ${idx >= 2 ? "border-t border-neutral-100 md:border-t-0" : ""}`}
            >
              {/* Frosted icon bubble */}
              <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-100/80 group-hover:bg-neutral-900 border border-neutral-200/60 flex items-center justify-center transition-all duration-300 [&>svg]:group-hover:text-white">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-display text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-[0.06em] text-neutral-900 leading-tight truncate">
                  {item.title}
                </span>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium leading-tight mt-0.5 truncate">
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
