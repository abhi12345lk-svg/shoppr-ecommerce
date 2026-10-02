import React from "react";
import { FiTrendingUp, FiTruck, FiGift, FiShield, FiPercent } from "react-icons/fi";

const MarqueeBanner = () => {
  const items = [
    {
      badge: "LIMITED",
      badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
      icon: <FiGift className="text-amber-400 text-xs" />,
      text: "FLAT ₹500 OFF ON 1ST ORDER — CODE 'WELCOME500'"
    },
    {
      badge: "EXPRESS",
      badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
      icon: <FiTruck className="text-emerald-400 text-xs" />,
      text: "FREE DOORSTEP SHIPPING ACROSS INDIA OVER ₹999"
    },
    {
      badge: "JUST IN",
      badgeColor: "bg-rose-400/20 text-rose-300 border-rose-400/30",
      icon: <FiTrendingUp className="text-rose-400 text-xs" />,
      text: "NEW SEASON DROP: STREETWEAR, OVERSIZED TEES & CO-ORDS"
    },
    {
      badge: "SAVE 15%",
      badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
      icon: <FiPercent className="text-amber-400 text-xs" />,
      text: "EXTRA 15% OFF WITH CODE 'FASHION15' ON ORDERS ₹999+"
    },
    {
      badge: "ASSURED",
      badgeColor: "bg-sky-400/20 text-sky-300 border-sky-400/30",
      icon: <FiShield className="text-sky-400 text-xs" />,
      text: "7-DAY HASSLE-FREE DOORSTEP EXCHANGES & RETURNS"
    }
  ];

  return (
    <aside
      aria-label="Promotional Announcement"
      className="bg-neutral-950 text-white text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase overflow-hidden py-2 border-b border-neutral-800/80 select-none relative"
    >
      <div className="flex w-max animate-marquee items-center">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 mx-6 sm:mx-8 whitespace-nowrap">
            <span
              className={`text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wider ${item.badgeColor}`}
            >
              {item.badge}
            </span>
            <div className="flex items-center gap-1.5 text-neutral-200">
              {item.icon}
              <span className="font-semibold">{item.text}</span>
            </div>
            <span className="text-neutral-700 ml-4 font-black">✦</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MarqueeBanner;
