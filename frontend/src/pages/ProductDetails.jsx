// ======================= PRODUCTDETAILS.JSX (PREMIUM FASHION PDP) =======================

import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  TbStarFilled,
  TbStarHalfFilled,
  TbShoppingBagPlus,
  TbTruckDelivery,
  TbShieldCheck,
  TbRefresh,
  TbChevronRight,
  TbHeart,
  TbCheck
} from "react-icons/tb";
import { FiChevronDown, FiChevronUp, FiShare2, FiZap } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";
import RelatedProducts from "../components/RelatedProduct";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const {
    products,
    formatPrice,
    addToCart,
    navigate,
    toggleWishlist,
    isInWishlist,
    setShowSizeGuide,
    checkPincode
  } = useContext(ShopContext);

  const { id } = useParams();
  const product = products.find((item) => item._id === id);

  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, active: false });
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewingCount] = useState(() => Math.floor(Math.random() * 10) + 12);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState("fabric");

  useEffect(() => {
    if (product) {
      setActiveImage(product.image?.[0] || "");
      if (product.sizes?.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 450);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "SHOPPR",
          text: `Check out ${product?.name} on SHOPPR`,
          url: window.location.href
        });
      } catch {
        // user dismissed dialog
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard! 📋");
    }
  };

  if (!product) {
    if (products.length === 0) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Loading Piece Details...</p>
        </div>
      );
    }
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-black mb-3">
          Product Not Found
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          The fashion piece you are looking for might have moved or sold out.
        </p>
        <Link to="/collection" className="btn-dark text-xs">
          Explore All Drops
        </Link>
      </div>
    );
  }

  const discountPercent =
    product.price > product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  const inWishlist = isInWishlist(product._id);

  /* ================= PINCODE ESTIMATE CHECK ================= */
  const handlePincodeCheck = async (e) => {
    e.preventDefault();
    if (!pincodeInput || pincodeInput.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit Indian PIN code");
      return;
    }

    setPincodeLoading(true);
    const result = await checkPincode(pincodeInput);
    setPincodeResult(result);
    setPincodeLoading(false);
  };

  /* ================= BUY NOW FLOW ================= */
  const handleBuyNow = async () => {
    const success = await addToCart(product._id, selectedSize);
    if (success) {
      navigate("/place-order");
    }
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pt-4 pb-24 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* ================= BREADCRUMBS ================= */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 py-3 mb-4 flex-wrap">
          <Link to="/" className="hover:text-black transition-colors font-medium">Home</Link>
          <TbChevronRight size={14} className="text-gray-400" />
          <Link to="/collection" className="hover:text-black transition-colors font-medium">Catalogue</Link>
          <TbChevronRight size={14} className="text-gray-400" />
          <Link to={`/collection/${product.category?.toLowerCase()}`} className="hover:text-black transition-colors font-medium capitalize">
            {product.category}
          </Link>
          <TbChevronRight size={14} className="text-gray-400" />
          <span className="text-black font-bold truncate max-w-[220px]">{product.name}</span>
        </nav>

        {/* ================= MAIN PRODUCT CARD ================= */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 border border-gray-100 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

            {/* ================= LEFT GALLERY (COL 7) ================= */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 lg:sticky lg:top-24">

              {/* Thumbnails */}
              {product.image && product.image.length > 1 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto scrollbar-none shrink-0 pb-2 sm:pb-0">
                  {product.image.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden cursor-pointer bg-neutral-50 p-1 transition-all border-2 ${
                        activeImage === img ? "border-black shadow-xs scale-102" : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}

              {/* Hero Showcase Image with Luxury Zoom on Hover */}
              <div
                className="flex-1 aspect-[3/4] bg-neutral-100 rounded-3xl overflow-hidden relative border border-gray-100 shadow-sm cursor-zoom-in"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomPos({ x, y, active: true });
                }}
                onMouseLeave={() => setZoomPos((prev) => ({ ...prev, active: false }))}
              >
                {discountPercent > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {discountPercent}% OFF
                  </span>
                )}

                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    aria-label="Share product"
                    title="Share piece"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-black hover:text-white text-gray-700 backdrop-blur-sm shadow-xs transition-all cursor-pointer"
                  >
                    <FiShare2 size={16} />
                  </button>

                  <button
                    onClick={() => toggleWishlist(product._id)}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      inWishlist
                        ? "bg-rose-50 text-rose-600 shadow-sm"
                        : "bg-white/90 hover:bg-black hover:text-white text-gray-700 backdrop-blur-sm shadow-xs"
                    }`}
                  >
                    <TbHeart size={18} className={inWishlist ? "fill-rose-600" : ""} />
                  </button>
                </div>

                <img
                  src={
                    activeImage ||
                    product.image?.[0] ||
                    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";
                  }}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: zoomPos.active ? "scale(1.7)" : "scale(1)"
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-200 ease-out pointer-events-none"
                />

                {/* Subtle zoom hint badge on desktop */}
                <div className="hidden sm:block absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg pointer-events-none">
                  Hover to inspect fabric
                </div>
              </div>
            </div>

            {/* ================= RIGHT INFO (COL 5) ================= */}
            <div className="lg:col-span-5 flex flex-col">

              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[2.5px] text-gray-400 mb-2">
                <span>{product.brand || "SHOPPR ATELIER"}</span>
                <span>{product.subCategory || product.category}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight uppercase tracking-tight">
                {product.name}
              </h1>

              {/* SKU & Ratings */}
              <div className="flex items-center gap-3 mt-3 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-1 text-amber-500">
                  <TbStarFilled size={16} />
                  <TbStarFilled size={16} />
                  <TbStarFilled size={16} />
                  <TbStarFilled size={16} />
                  <TbStarHalfFilled size={16} />
                </div>
                <span className="text-xs font-bold text-gray-600">(42 Verified Reviews)</span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-gray-400 font-mono">SKU: {product.sku || `SHP-${product._id.slice(-6)}`}</span>
              </div>

              {/* Pricing Section */}
              <div className="mt-4 pb-5 border-b border-gray-100">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl sm:text-4xl font-black text-black">
                    {formatPrice(product.offerPrice)}
                  </span>
                  {product.price > product.offerPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Save {formatPrice(product.price - product.offerPrice)}
                    </span>
                  )}
                </div>

                {/* Live Social Proof Urgency Ticker */}
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50/90 border border-amber-200/60 px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <FiZap className="text-amber-600 shrink-0" size={13} />
                  <span>Popular: {viewingCount} shoppers are viewing this piece right now</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1 font-medium">
                  Inclusive of all taxes (GST 5%). Free delivery on orders over ₹999.
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-xs sm:text-sm mt-5 leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatch Indicator */}
              {product.color && (
                <div className="mt-5 flex items-center gap-2 text-xs">
                  <span className="font-bold text-gray-700 uppercase">Shade:</span>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300 shadow-xs"
                    style={{ backgroundColor: product.colorHex || "#111" }}
                  />
                  <span className="font-medium text-black">{product.color}</span>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-800">
                    Select Size: <strong className="text-black">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-neutral-500 font-bold underline hover:text-black transition-colors"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 min-w-11 px-4 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black shadow-xs scale-105"
                          : "bg-white text-gray-800 border-gray-200 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Availability */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-emerald-700">
                  {product.inStock
                    ? product.stockCount && product.stockCount < 10
                      ? `Hurry! Only ${product.stockCount} left in stock`
                      : "In Stock & Ready to Dispatch"
                    : "Temporarily Sold Out"}
                </span>
              </div>

              {/* ACTION CTAs: Add to Bag & Buy Now */}
              <div className="flex flex-col sm:flex-row gap-3.5 mt-6">
                <button
                  onClick={() => addToCart(product._id, selectedSize)}
                  disabled={!product.inStock}
                  className="sheen-wrapper flex-1 flex items-center justify-center gap-2.5 bg-neutral-950 text-white h-13 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md active:scale-98 disabled:opacity-50"
                >
                  <TbShoppingBagPlus size={18} />
                  <span>Add To Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 border border-neutral-300 h-13 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all active:scale-98 disabled:opacity-50 shadow-2xs"
                >
                  <FiZap size={16} />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* PINCODE DELIVERY CHECKER */}
              <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-2">
                  <TbTruckDelivery size={18} />
                  <span>Delivery &amp; Serviceability Checker</span>
                </div>

                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit Indian PIN code"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-medium outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    disabled={pincodeLoading}
                    className="btn-dark !py-2.5 !px-5 text-xs shrink-0"
                  >
                    {pincodeLoading ? "Checking..." : "Check"}
                  </button>
                </form>

                {pincodeResult && (
                  <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                    pincodeResult.serviceable ? "bg-emerald-50 border border-emerald-200 text-emerald-900" : "bg-rose-50 border border-rose-200 text-rose-900"
                  }`}>
                    {pincodeResult.serviceable ? (
                      <div>
                        <div className="flex items-center gap-1.5 font-bold">
                          <TbCheck size={14} className="text-emerald-700" />
                          <span>Serviceable via {pincodeResult.carrier}</span>
                        </div>
                        <p className="mt-1">
                          Estimated delivery by <strong>{pincodeResult.estimatedDate}</strong>. Cash on Delivery (COD) is available.
                        </p>
                      </div>
                    ) : (
                      <p>{pincodeResult.message}</p>
                    )}
                  </div>
                )}
              </div>

              {/* TRUST VALUE TILES */}
              <div className="grid grid-cols-3 gap-2.5 mt-6 pt-6 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex flex-col items-center text-center p-2.5 bg-gray-50 rounded-xl">
                  <TbTruckDelivery size={20} className="text-black mb-1" />
                  <span className="font-bold text-black text-[11px]">Free Shipping</span>
                  <span className="text-[10px] text-gray-400">On ₹999+</span>
                </div>
                <div className="flex flex-col items-center text-center p-2.5 bg-gray-50 rounded-xl">
                  <TbShieldCheck size={20} className="text-black mb-1" />
                  <span className="font-bold text-black text-[11px]">100% Quality</span>
                  <span className="text-[10px] text-gray-400">Pre-shrunk fabric</span>
                </div>
                <div className="flex flex-col items-center text-center p-2.5 bg-gray-50 rounded-xl">
                  <TbRefresh size={20} className="text-black mb-1" />
                  <span className="font-bold text-black text-[11px]">7 Days Return</span>
                  <span className="text-[10px] text-gray-400">Doorstep pickup</span>
                </div>
              </div>

              {/* SPECIFICATION ACCORDIONS */}
              <div className="mt-8 divide-y divide-gray-100 border-y border-gray-100">
                {/* Fabric & Material */}
                <div className="py-3.5">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === "fabric" ? "" : "fabric")}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black text-left"
                  >
                    <span>Fabric &amp; Composition</span>
                    {openAccordion === "fabric" ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openAccordion === "fabric" && (
                    <div className="mt-2 text-xs text-gray-600 leading-relaxed space-y-1">
                      <p><strong>Material:</strong> {product.fabric || "100% Combed Terry Cotton (260 GSM)"}</p>
                      <p><strong>Touch Feel:</strong> Soft, breathable, and pre-washed for zero shrinkage.</p>
                    </div>
                  )}
                </div>

                {/* Fit & Sizing */}
                <div className="py-3.5">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === "fit" ? "" : "fit")}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black text-left"
                  >
                    <span>Fit &amp; Silhouette</span>
                    {openAccordion === "fit" ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openAccordion === "fit" && (
                    <div className="mt-2 text-xs text-gray-600 leading-relaxed space-y-1">
                      <p><strong>Cut:</strong> {product.fit || "Modern Boxy Relaxed Fit with Drop Shoulders"}</p>
                      <p>Model is 6'1" wearing size L for an authentic streetwear drape.</p>
                    </div>
                  )}
                </div>

                {/* Wash & Care */}
                <div className="py-3.5">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === "care" ? "" : "care")}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black text-left"
                  >
                    <span>Wash &amp; Garment Care</span>
                    {openAccordion === "care" ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openAccordion === "care" && (
                    <div className="mt-2 text-xs text-gray-600 leading-relaxed space-y-1">
                      <p>{product.care || "Machine wash cold inside out with similar colors. Line dry in shade. Cool iron on reverse."}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        <div className="mt-16">
          <RelatedProducts />
        </div>

      </div>

      {/* ================= STICKY MOBILE CONVERSION BAR ================= */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <img
              src={activeImage || product.image?.[0]}
              alt={product.name}
              className="w-11 h-13 rounded-xl object-cover object-top border border-gray-200 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-black text-black truncate uppercase leading-tight">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-black text-black">{formatPrice(product.offerPrice)}</span>
                {product.price > product.offerPrice && (
                  <span className="text-[10px] text-gray-400 line-through">{formatPrice(product.price)}</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => addToCart(product._id, selectedSize)}
            disabled={!product.inStock}
            className="sheen-wrapper shrink-0 bg-neutral-950 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 disabled:opacity-50"
          >
            <TbShoppingBagPlus size={16} />
            <span>Add {selectedSize ? `(${selectedSize})` : ""}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;