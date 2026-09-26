// ======================= COLLECTION.JSX (FASHION PLP) =======================

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX, FiCheck } from "react-icons/fi";
import Item from "../components/Item";
import { ShopContext } from "../Context/ShopContext";

const Collection = () => {
  const { products, categories, searchQuery, formatPrice } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const initialCategoryParam = searchParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategoryParam ? [initialCategoryParam.toLowerCase()] : []
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [priceRange, setPriceRange] = useState("all");
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  const itemsPerPage = 12;

  // Extract all available subcategories dynamically
  const availableSubCategories = [
    ...new Set(
      products
        .map((p) => p.subCategory)
        .filter((sub) => Boolean(sub && sub.trim()))
    )
  ];

  // Sync query params from URL
  useEffect(() => {
    const cat = searchParams.get("category");
    const sub = searchParams.get("subCategory");
    const filter = searchParams.get("filter");
    const type = searchParams.get("type");
    const sale = searchParams.get("sale");

    if (cat) {
      setSelectedCategories([cat.toLowerCase()]);
    } else {
      setSelectedCategories([]);
    }

    if (sub) {
      setSelectedSubCategories([sub]);
    } else {
      setSelectedSubCategories([]);
    }

    if (sale === "true" || filter === "sale") {
      setMinDiscount(1);
    } else {
      setMinDiscount(0);
    }

    if (filter === "new") {
      setSortType("newest");
    }
  }, [searchParams]);

  const toggleCategory = (cat) => {
    const lower = cat.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower]
    );
  };

  const toggleSubCategory = (sub) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSizes([]);
    setPriceRange("all");
    setMinDiscount(0);
    setInStockOnly(false);
    setSortType("relevant");
    setSearchParams({});
  };

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let list = [...products];

    const type = searchParams.get("type");
    const filter = searchParams.get("filter");

    // Search query
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Type filter (e.g. topwear vs bottomwear)
    if (type === "topwear") {
      const topwearKeywords = ["tee", "shirt", "top", "hoodie", "polo", "sweater", "overcoat", "jacket", "blazer"];
      list = list.filter((p) => {
        const sub = (p.subCategory || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        return topwearKeywords.some((k) => sub.includes(k) || name.includes(k) || cat.includes(k));
      });
    } else if (type === "bottomwear") {
      const bottomwearKeywords = ["cargo", "pant", "jeans", "denim", "trouser", "jogger", "shorts"];
      list = list.filter((p) => {
        const sub = (p.subCategory || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        return bottomwearKeywords.some((k) => sub.includes(k) || name.includes(k) || cat.includes(k));
      });
    }

    // New arrivals filter
    if (filter === "new") {
      const newItems = list.filter((p) => p.isNewArrival);
      if (newItems.length > 0) {
        list = newItems;
      }
    }

    // Category filter
    if (selectedCategories.length > 0) {
      list = list.filter((p) =>
        selectedCategories.includes(p.category?.toLowerCase())
      );
    }

    // Subcategory filter (flexible matching)
    if (selectedSubCategories.length > 0) {
      list = list.filter((p) => {
        if (!p.subCategory) return false;
        const pSub = p.subCategory.toLowerCase().trim();
        return selectedSubCategories.some((sel) => {
          const s = sel.toLowerCase().trim();
          return pSub === s || pSub.includes(s) || s.includes(pSub);
        });
      });
    }

    // Size filter
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.sizes && p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    // Price range (INR)
    switch (priceRange) {
      case "under1000":
        list = list.filter((p) => (p.offerPrice || p.price) < 1000);
        break;
      case "1000to2000":
        list = list.filter((p) => (p.offerPrice || p.price) >= 1000 && (p.offerPrice || p.price) <= 2000);
        break;
      case "2000to3500":
        list = list.filter((p) => (p.offerPrice || p.price) >= 2000 && (p.offerPrice || p.price) <= 3500);
        break;
      case "above3500":
        list = list.filter((p) => (p.offerPrice || p.price) > 3500);
        break;
      default:
        break;
    }

    // Discount filter
    if (minDiscount > 0) {
      list = list.filter((p) => {
        if (!p.price || p.price <= p.offerPrice) return false;
        const disc = Math.round(((p.price - p.offerPrice) / p.price) * 100);
        return disc >= minDiscount;
      });
    }

    // In stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    switch (sortType) {
      case "low-high":
        list.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
        break;
      case "high-low":
        list.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
        break;
      case "newest":
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "discount":
        list.sort((a, b) => {
          const discA = a.price > a.offerPrice ? (a.price - a.offerPrice) / a.price : 0;
          const discB = b.price > b.offerPrice ? (b.price - b.offerPrice) / b.price : 0;
          return discB - discA;
        });
        break;
      default:
        // relevant
        break;
    }

    setFilteredProducts(list);
    setCurrPage(1);
  }, [
    products,
    selectedCategories,
    selectedSubCategories,
    selectedSizes,
    priceRange,
    minDiscount,
    inStockOnly,
    sortType,
    searchQuery,
    searchParams
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange !== "all" ||
    minDiscount > 0 ||
    inStockOnly;

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pt-4 sm:pt-6 pb-24 overflow-hidden">
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">

        {/* ================= TOP PLP HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-gray-200/80">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
              {(() => {
                const f = searchParams.get("filter");
                const s = searchParams.get("sale");
                const t = searchParams.get("type");
                const sub = searchParams.get("subCategory");
                if (f === "new") return "Fresh Off The Atelier";
                if (s === "true" || f === "sale") return "Special Markdowns";
                if (sub) return "Curated Style Drop";
                if (t === "topwear") return "Topwear Capsule";
                if (t === "bottomwear") return "Bottomwear Capsule";
                if (selectedCategories.length === 1) return "Curated Department";
                return "Curated Catalogue";
              })()}
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
              {(() => {
                const f = searchParams.get("filter");
                const s = searchParams.get("sale");
                const t = searchParams.get("type");
                const sub = searchParams.get("subCategory");
                if (f === "new") return <>New <span className="text-gray-400 font-light">Arrivals</span></>;
                if (s === "true" || f === "sale") return <>Sale &amp; <span className="text-gray-400 font-light">Clearance</span></>;
                if (sub) return <>{sub} <span className="text-gray-400 font-light">Collection</span></>;
                if (t === "topwear") return <>Shirts, Tees &amp; <span className="text-gray-400 font-light">Tops</span></>;
                if (t === "bottomwear") return <>Cargos &amp; <span className="text-gray-400 font-light">Bottomwear</span></>;
                if (selectedCategories.length === 1) return <>{selectedCategories[0]} <span className="text-gray-400 font-light">Collection</span></>;
                return <>All <span className="text-gray-400 font-light">Collections</span></>;
              })()}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Showing <strong>{filteredProducts.length}</strong> styles crafted with premium fabrics.
            </p>
          </div>

          {/* Sort Dropdown & Mobile Filter Trigger */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              aria-label="Sort styles"
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-black outline-none focus:border-black cursor-pointer shadow-xs"
            >
              <option value="relevant">Featured &amp; Recommended</option>
              <option value="newest">Newest Drops</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-1.5 bg-black text-white px-3.5 py-2 rounded-xl text-xs font-bold"
            >
              <FiFilter size={13} />
              <span>{showFilters ? "Close" : "Filters"}</span>
            </button>
          </div>
        </div>

        {/* ================= ACTIVE FILTER CHIPS ================= */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-6 pb-3 border-b border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Active:
            </span>

            {selectedCategories.map((c, i) => (
              <button
                key={i}
                onClick={() => toggleCategory(c)}
                className="inline-flex items-center gap-1 bg-black text-white text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
              >
                <span>{c}</span>
                <FiX size={12} />
              </button>
            ))}

            {selectedSubCategories.map((s, i) => (
              <button
                key={i}
                onClick={() => toggleSubCategory(s)}
                className="inline-flex items-center gap-1 bg-black text-white text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                <span>{s}</span>
                <FiX size={12} />
              </button>
            ))}

            {selectedSizes.map((sz, i) => (
              <button
                key={i}
                onClick={() => toggleSize(sz)}
                className="inline-flex items-center gap-1 bg-neutral-800 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                <span>Size: {sz}</span>
                <FiX size={12} />
              </button>
            ))}

            {priceRange !== "all" && (
              <button
                onClick={() => setPriceRange("all")}
                className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                <span>Price Filter</span>
                <FiX size={12} />
              </button>
            )}

            {minDiscount > 0 && (
              <button
                onClick={() => setMinDiscount(0)}
                className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                <span>{minDiscount}%+ OFF</span>
                <FiX size={12} />
              </button>
            )}

            {inStockOnly && (
              <button
                onClick={() => setInStockOnly(false)}
                className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                <span>In Stock Only</span>
                <FiX size={12} />
              </button>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-rose-600 hover:underline ml-2"
            >
              Reset All
            </button>
          </div>
        )}

        {/* ================= MAIN CONTENT: SIDEBAR + GRID ================= */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">

          {/* ================= SIDEBAR FILTERS ================= */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs lg:sticky lg:top-24 space-y-6">

              {/* Top Title */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-display font-black text-sm uppercase tracking-wider text-black">
                  Filters
                </span>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="text-xs font-bold text-rose-500 hover:underline">
                    Clear
                  </button>
                )}
              </div>

              {/* 1. Departments / Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Department
                </h4>
                <div className="space-y-1">
                  {["Men", "Women", "Footwear", "Winterwear", "Sportswear", "Kids"].map((cat, idx) => {
                    const isChecked = selectedCategories.includes(cat.toLowerCase());
                    return (
                      <label
                        key={idx}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          isChecked ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{cat}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategory(cat)}
                          className="sr-only"
                        />
                        {isChecked && <FiCheck size={14} />}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 2. Sub-categories */}
              {availableSubCategories.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                    Category Style
                  </h4>
                  <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                    {availableSubCategories.map((sub, idx) => {
                      const isChecked = selectedSubCategories.includes(sub);
                      return (
                        <label
                          key={idx}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                            isChecked ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="truncate">{sub}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSubCategory(sub)}
                            className="sr-only"
                          />
                          {isChecked && <FiCheck size={13} />}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Sizes */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Size
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {["S", "M", "L", "XL", "XXL", "UK 7", "UK 8", "UK 9", "UK 10"].map((size) => {
                    const isChecked = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`h-8 px-2.5 rounded-lg text-xs font-bold border transition-all ${
                          isChecked
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-200 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Price Ranges (INR) */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Price (INR)
                </h4>
                <div className="space-y-1 text-xs">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under1000", label: "Under ₹1,000" },
                    { id: "1000to2000", label: "₹1,000 - ₹2,000" },
                    { id: "2000to3500", label: "₹2,000 - ₹3,500" },
                    { id: "above3500", label: "Above ₹3,500" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPriceRange(p.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                        priceRange === p.id
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Discount Filter */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Discount
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    { val: 0, label: "All" },
                    { val: 20, label: "20%+" },
                    { val: 30, label: "30%+" },
                    { val: 40, label: "40%+" }
                  ].map((d) => (
                    <button
                      key={d.val}
                      onClick={() => setMinDiscount(d.val)}
                      className={`px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                        minDiscount === d.val
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Stock Only Toggle */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center justify-between text-xs font-bold text-gray-700 cursor-pointer">
                  <span>In-Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-black rounded cursor-pointer"
                  />
                </label>
              </div>

            </div>
          </aside>

          {/* ================= PRODUCT GRID ================= */}
          <div>
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
                  {currentProducts.map((product) => (
                    <Item key={product._id} product={product} />
                  ))}
                </div>

                {/* ================= PAGINATION ================= */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      disabled={currPage === 1}
                      onClick={() => {
                        setCurrPage((p) => p - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold hover:bg-black hover:text-white disabled:opacity-30 transition-colors"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrPage(index + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-9 h-9 rounded-xl border text-xs font-bold transition-all ${
                          currPage === index + 1
                            ? "bg-black text-white border-black shadow-xs"
                            : "bg-white text-black border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      disabled={currPage === totalPages}
                      onClick={() => {
                        setCurrPage((p) => p + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold hover:bg-black hover:text-white disabled:opacity-30 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12">
                <h3 className="font-display text-2xl font-black text-black">No Styles Found</h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  We couldn't find any products matching your selected filters. Try clearing your filters or changing your search term.
                </p>
                <button onClick={clearAllFilters} className="btn-dark mt-5 text-xs">
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Collection;