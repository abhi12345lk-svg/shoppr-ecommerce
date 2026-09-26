import React, { useState, useContext } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const SizeGuideModal = () => {
  const { showSizeGuide, setShowSizeGuide } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("tops");
  const [unit, setUnit] = useState("in"); // "in" or "cm"

  if (!showSizeGuide) return null;

  const topSizes = [
    { size: "S", chest: unit === "in" ? '38"' : "96 cm", length: unit === "in" ? '27"' : "68 cm", shoulder: unit === "in" ? '17.5"' : "44 cm" },
    { size: "M", chest: unit === "in" ? '40"' : "101 cm", length: unit === "in" ? '28"' : "71 cm", shoulder: unit === "in" ? '18.5"' : "47 cm" },
    { size: "L", chest: unit === "in" ? '42"' : "106 cm", length: unit === "in" ? '29"' : "73 cm", shoulder: unit === "in" ? '19.5"' : "49 cm" },
    { size: "XL", chest: unit === "in" ? '44"' : "111 cm", length: unit === "in" ? '30"' : "76 cm", shoulder: unit === "in" ? '20.5"' : "52 cm" },
    { size: "XXL", chest: unit === "in" ? '46"' : "116 cm", length: unit === "in" ? '31"' : "78 cm", shoulder: unit === "in" ? '21.5"' : "54 cm" }
  ];

  const bottomSizes = [
    { size: "S (30)", waist: unit === "in" ? '30"' : "76 cm", hip: unit === "in" ? '38"' : "96 cm", length: unit === "in" ? '40"' : "101 cm" },
    { size: "M (32)", waist: unit === "in" ? '32"' : "81 cm", hip: unit === "in" ? '40"' : "101 cm", length: unit === "in" ? '41"' : "104 cm" },
    { size: "L (34)", waist: unit === "in" ? '34"' : "86 cm", hip: unit === "in" ? '42"' : "106 cm", length: unit === "in" ? '41.5"' : "105 cm" },
    { size: "XL (36)", waist: unit === "in" ? '36"' : "91 cm", hip: unit === "in" ? '44"' : "111 cm", length: unit === "in" ? '42"' : "106 cm" }
  ];

  const shoeSizes = [
    { uk: "UK 6", euro: "40", us: "7", footLength: unit === "in" ? '9.8"' : "25.0 cm" },
    { uk: "UK 7", euro: "41", us: "8", footLength: unit === "in" ? '10.2"' : "26.0 cm" },
    { uk: "UK 8", euro: "42", us: "9", footLength: unit === "in" ? '10.6"' : "27.0 cm" },
    { uk: "UK 9", euro: "43", us: "10", footLength: unit === "in" ? '11.0"' : "28.0 cm" },
    { uk: "UK 10", euro: "44", us: "11", footLength: unit === "in" ? '11.4"' : "29.0 cm" }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 id="size-guide-heading" className="font-display text-xl font-black uppercase tracking-tight text-black">Standard Size Guide</h3>
            <p className="text-xs text-gray-500 mt-0.5">Indian Standard Measurements & Fit Recommendation</p>
          </div>
          <button
            onClick={() => setShowSizeGuide(false)}
            aria-label="Close size guide"
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("tops")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "tops" ? "bg-white text-black shadow-xs" : "text-gray-500"
              }`}
            >
              Tops & Shirts
            </button>
            <button
              onClick={() => setActiveTab("bottoms")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "bottoms" ? "bg-white text-black shadow-xs" : "text-gray-500"
              }`}
            >
              Bottoms
            </button>
            <button
              onClick={() => setActiveTab("shoes")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "shoes" ? "bg-white text-black shadow-xs" : "text-gray-500"
              }`}
            >
              Footwear
            </button>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setUnit("in")}
              className={`px-3 py-1 rounded-lg ${unit === "in" ? "bg-black text-white" : "text-gray-500"}`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 rounded-lg ${unit === "cm" ? "bg-black text-white" : "text-gray-500"}`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-5 overflow-y-auto">
          {activeTab === "tops" && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Size</th>
                  <th className="py-2.5">Chest</th>
                  <th className="py-2.5">Length</th>
                  <th className="py-2.5">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold">
                {topSizes.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-3 font-bold text-black">{row.size}</td>
                    <td className="py-3 text-gray-700">{row.chest}</td>
                    <td className="py-3 text-gray-700">{row.length}</td>
                    <td className="py-3 text-gray-700">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "bottoms" && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Size</th>
                  <th className="py-2.5">Waist</th>
                  <th className="py-2.5">Hip</th>
                  <th className="py-2.5">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold">
                {bottomSizes.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-3 font-bold text-black">{row.size}</td>
                    <td className="py-3 text-gray-700">{row.waist}</td>
                    <td className="py-3 text-gray-700">{row.hip}</td>
                    <td className="py-3 text-gray-700">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "shoes" && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">UK / India</th>
                  <th className="py-2.5">EU</th>
                  <th className="py-2.5">US</th>
                  <th className="py-2.5">Foot Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold">
                {shoeSizes.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-3 font-bold text-black">{row.uk}</td>
                    <td className="py-3 text-gray-700">{row.euro}</td>
                    <td className="py-3 text-gray-700">{row.us}</td>
                    <td className="py-3 text-gray-700">{row.footLength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Sizing tip */}
          <div className="mt-5 p-3.5 bg-amber-50 rounded-2xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
            <FiCheck className="shrink-0 mt-0.5 text-amber-700" />
            <span>
              <strong>Fit Advice:</strong> For oversized streetwear styles, buy your regular size for an authentic slouchy drop-shoulder look. If you prefer a fitted look, choose one size smaller.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
            onClick={() => setShowSizeGuide(false)}
            className="btn-dark !py-2.5 !px-6 text-xs"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
