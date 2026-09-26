/* ======================= PRODUCTLIST.JSX ======================= */

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";
import {
  FiBox,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiFilter,
  FiLayers,
  FiTag,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";

const ProductList = () => {
  const { products, currency, fetchProducts, axios, formatPrice } =
    useContext(ShopContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  /* ================= STOCK TOGGLE ================= */
  const toggleStock = async (productId, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", {
        productId,
        inStock,
      });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (productId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this piece from catalogue?"
      );
      if (!confirmDelete) return;

      const { data } = await axios.post("/api/product/delete", { productId });
      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    "all",
    ...new Set(products?.map((p) => p.category).filter(Boolean)),
  ];

  const filteredProducts = (products || []).filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-[#fafafa] px-4 sm:px-6 lg:px-8 py-6 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ================= TOP HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <p className="text-xs uppercase tracking-[3px] font-bold text-gray-400 mb-1">
              Catalogue Management
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-black tracking-tight">
              Product <span className="font-light text-gray-400">Inventory</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Control your Indian fashion drops, variant inventory, prices, and visibility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/add"
              className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <FiPlus size={16} />
              <span>Add New Drop</span>
            </Link>

            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-black">
                <FiBox size={18} />
              </div>
              <div>
                <p className="text-base font-black text-black leading-tight">
                  {products?.length || 0}
                </p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Total Items
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & FILTER BAR ================= */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name, SKU, brand, sub-category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <FiFilter size={13} /> Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs font-bold text-black uppercase rounded-xl px-3 py-2 focus:outline-none focus:border-black cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden lg:block bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-[0.8fr_2.5fr_1.2fr_1.2fr_1fr_0.6fr] items-center px-6 py-4 border-b border-gray-200 bg-neutral-50/80 text-[11px] font-black uppercase tracking-wider text-gray-500">
            <p>Look</p>
            <p>Product & Sizing</p>
            <p>Hierarchy</p>
            <p>Pricing (INR)</p>
            <p>Stock Status</p>
            <p className="text-right">Actions</p>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-[0.8fr_2.5fr_1.2fr_1.2fr_1fr_0.6fr] items-center px-6 py-4 hover:bg-neutral-50/60 transition-colors"
              >
                {/* IMAGE */}
                <div>
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-14 h-18 object-contain rounded-xl border border-gray-200 bg-neutral-50 p-1"
                  />
                </div>

                {/* PRODUCT INFO */}
                <div className="pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {product.brand || "SHOPPR"}
                    </span>
                    {product.sku && (
                      <span className="text-[10px] text-gray-400 font-mono">
                        {product.sku}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-black uppercase leading-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {product.sizes?.map((sz) => (
                      <span
                        key={sz}
                        className="text-[9px] font-bold px-1.5 py-0.5 border border-gray-200 rounded text-gray-600 uppercase"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HIERARCHY */}
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.subCategory && (
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      ↳ {product.subCategory}
                    </p>
                  )}
                </div>

                {/* PRICING */}
                <div>
                  <p className="text-base font-black text-black">
                    {formatPrice ? formatPrice(product.offerPrice) : `${currency}${product.offerPrice}`}
                  </p>
                  {product.price > product.offerPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      {formatPrice ? formatPrice(product.price) : `${currency}${product.price}`}
                    </p>
                  )}
                </div>

                {/* STOCK */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={product.inStock}
                        onChange={() => toggleStock(product._id, !product.inStock)}
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition-colors"></div>
                      <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-xs"></div>
                    </label>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider ${
                        product.inStock ? "text-emerald-600" : "text-rose-500"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Sold Out"}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Units: <strong className="text-black font-semibold">{product.stockCount || 50}</strong>
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    aria-label="Delete product"
                    className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 flex items-center justify-center transition-colors"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="lg:hidden flex flex-col gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs flex flex-col gap-3"
            >
              <div className="flex gap-3">
                <img
                  src={product.image?.[0]}
                  alt={product.name}
                  className="w-20 h-24 object-contain rounded-xl border border-gray-100 bg-neutral-50 p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {product.brand || "SHOPPR"}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-black uppercase line-clamp-2 mt-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-sm font-black text-black">
                      {formatPrice ? formatPrice(product.offerPrice) : `${currency}${product.offerPrice}`}
                    </span>
                    {product.price > product.offerPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        {formatPrice ? formatPrice(product.price) : `${currency}${product.price}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product.inStock}
                      onChange={() => toggleStock(product._id, !product.inStock)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition-colors"></div>
                    <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4 shadow-xs"></div>
                  </label>
                  <span
                    className={`text-[10px] font-black uppercase ${
                      product.inStock ? "text-emerald-600" : "text-rose-500"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Sold Out"}
                  </span>
                </div>

                <button
                  onClick={() => deleteProduct(product._id)}
                  aria-label="Delete product"
                  className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
            <FiBox size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="font-bold text-black text-sm">No items found matching your filters</p>
            <p className="text-xs text-gray-400 mt-1">Try resetting search query or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;