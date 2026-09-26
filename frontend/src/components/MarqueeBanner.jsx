import React from "react";
import { FiTrendingUp, FiTruck, FiGift } from "react-icons/fi";

const MarqueeBanner = () => {
  const items = [
    { icon: <FiGift className="text-amber-300" />, text: "FLAT ₹500 OFF ON 1ST ORDER: USE CODE 'WELCOME500'" },
    { icon: <FiTruck className="text-emerald-300" />, text: "FREE EXPRESS DELIVERY ON ORDERS OVER ₹999" },
    { icon: <FiTrendingUp className="text-rose-300" />, text: "NEW SEASON DROP: STREETWEAR & OVERSIZED TEES LIVE" },
    { icon: <FiGift className="text-amber-300" />, text: "EXTRA 15% OFF WITH CODE 'FASHION15' ON ₹999+" },
    { icon: <FiTruck className="text-sky-300" />, text: "HASSLE-FREE 7-DAY DOORSTEP EXCHANGE ACROSS INDIA" }
  ];

  return (
    <aside aria-label="Promotional Announcement" className="bg-[#0a0a0a] text-white text-[11px] sm:text-xs font-semibold tracking-[1.5px] uppercase overflow-hidden py-2 border-b border-neutral-800 select-none">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 mx-6 sm:mx-10 whitespace-nowrap">
            {item.icon}
            <span>{item.text}</span>
            <span className="text-neutral-600 ml-4 font-black">✦</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MarqueeBanner;
