import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronRight, FiGrid } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";
import Item from "../components/Item";

const CategoryCollection = () => {
  const { products, categories } = useContext(ShopContext);
  const { category } = useParams();

  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [sortType, setSortType] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Find category details from context
  const currentCategoryObj = categories.find(
    (c) => (c.slug || c.name).toLowerCase() === category?.toLowerCase()
  );

  const subCategories = currentCategoryObj?.subCategories?.map((s) => s.name || s) || [];

  useEffect(() => {
    if (category && products?.length > 0) {
      let filtered = products.filter(
        (item) => item?.category?.toLowerCase() === category?.toLowerCase()
      );

      if (selectedSubCategory !== "all") {
        filtered = filtered.filter(
          (item) => item?.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase()
        );
      }

      if (sortType === "low-high") {
        filtered.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
      } else if (sortType === "high-low") {
        filtered.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
      } else if (sortType === "newest") {
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      }

      setFilteredProducts(filtered);
    }
  }, [category, products, selectedSubCategory, sortType]);

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pt-4 sm:pt-6 pb-24 overflow-hidden">
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <FiChevronRight size={12} className="text-gray-400" />
          <Link to="/collection" className="hover:text-black transition-colors">Catalogue</Link>
          <FiChevronRight size={12} className="text-gray-400" />
          <span className="text-black font-bold uppercase">{category}</span>
        </nav>

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-gray-200/80">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1">
              Curated Department
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
              {category} <span className="text-gray-400 font-light">Collection</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Showing <strong>{filteredProducts.length}</strong> pieces designed for modern daily styling.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-black outline-none focus:border-black cursor-pointer shadow-xs"
            >
              <option value="relevant">Recommended</option>
              <option value="newest">Newest Drops</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Subcategory Capsules */}
        {subCategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-6 border-b border-gray-100">
            <button
              onClick={() => setSelectedSubCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedSubCategory === "all"
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-black"
              }`}
            >
              All {category}
            </button>
            {subCategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedSubCategory === sub
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-black"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <Item key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12">
            <FiGrid size={32} className="mx-auto text-gray-400 mb-3" />
            <h3 className="font-display text-2xl font-black text-black">No Products in {category}</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              New season styles for this department are being prepped in our atelier. Check back shortly.
            </p>
            <Link to="/collection" className="btn-dark mt-5 text-xs">
              View All Collections
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryCollection;