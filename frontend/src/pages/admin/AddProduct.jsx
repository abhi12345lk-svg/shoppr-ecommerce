/* ======================= ADDPRODUCT.JSX (FASHION CATALOG ADMIN) ======================= */

import React, { useContext, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";

const AddProduct = () => {
  const { axios, categories } = useContext(ShopContext);

  const [files, setFiles] = useState([]);
  const [imageUrlInputs, setImageUrlInputs] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Oversized Tees");
  const [brand, setBrand] = useState("SHOPPR NOIR");
  const [sku, setSku] = useState("");
  const [color, setColor] = useState("Washed Black");
  const [colorHex, setColorHex] = useState("#111111");
  const [stockCount, setStockCount] = useState("50");
  const [fabric, setFabric] = useState("100% Combed Cotton (260 GSM)");
  const [fit, setFit] = useState("Boxy Oversized Fit");
  const [care, setCare] = useState("Machine wash cold inside out. Hang dry.");
  const [popular, setPopular] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [sizes, setSizes] = useState(["S", "M", "L", "XL"]);
  const [loading, setLoading] = useState(false);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "UK 7", "UK 8", "UK 9", "UK 10"];

  const sizeHandler = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const handleImageUrlChange = (index, val) => {
    const next = [...imageUrlInputs];
    next[index] = val;
    setImageUrlInputs(next);
  };

  /* ================= SUBMIT ================= */
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const validUrls = imageUrlInputs.filter(Boolean);
      const hasUploadedFiles = files.some(Boolean);

      if (!hasUploadedFiles && validUrls.length === 0) {
        toast.error("Please upload at least one image or provide an image URL");
        setLoading(false);
        return;
      }

      const productData = {
        name,
        description,
        category,
        subCategory,
        brand,
        sku: sku || `SHP-${category.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`,
        color,
        colorHex,
        price: Number(price),
        offerPrice: Number(offerPrice || price),
        stockCount: Number(stockCount) || 50,
        sizes,
        popular,
        isNewArrival,
        isBestSeller,
        fabric,
        fit,
        care,
        image: validUrls
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          formData.append("images", files[i]);
        }
      }

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message || "Fashion product created successfully");
        setName("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setSku("");
        setFiles([]);
        setImageUrlInputs(["", "", "", ""]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <p className="uppercase tracking-[4px] text-gray-500 text-xs font-bold mb-2">
            Catalogue Management
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-black leading-none">
            Add Fashion <span className="text-gray-400 font-light">Product</span>
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Publish fashion apparel, street silhouettes, footwear, and co-ords with rich specifications.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="backdrop-blur-xl bg-white/80 border border-white/60 shadow-lg rounded-3xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left Column: Product Information */}
            <div className="p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 space-y-5">
              {/* Product Name */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Oversized Heavyweight Acid Wash Graphic Tee"
                  className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-xs sm:text-sm font-semibold outline-none focus:border-black"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                  Editorial Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe cut, silhouette, draping and style recommendations..."
                  className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-xs sm:text-sm font-medium outline-none focus:border-black resize-none"
                />
              </div>

              {/* Department & Subcategory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    Department *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-3.5 text-xs sm:text-sm font-semibold outline-none focus:border-black cursor-pointer"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Winterwear">Winterwear</option>
                    <option value="Sportswear">Sportswear</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    Sub-Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    placeholder="e.g. Oversized Tees, Linen Shirts, Cargos"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-xs sm:text-sm font-semibold outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Brand & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    Brand Label
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="SHOPPR NOIR"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-xs sm:text-sm font-semibold outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    SKU Code (Auto if blank)
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="SHP-TEE-098"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-xs sm:text-sm font-mono outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Color & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Washed Charcoal, Vintage Olive"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-xs sm:text-sm font-semibold outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                    placeholder="50"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-xs sm:text-sm font-semibold outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Sizes Multi-Select */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => sizeHandler(sz)}
                      className={`h-10 px-3.5 rounded-xl font-bold text-xs border transition-all ${
                        sizes.includes(sz)
                          ? "bg-black text-white border-black shadow-xs scale-102"
                          : "bg-white text-gray-700 border-gray-200 hover:border-black"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric, Fit, Care */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                    Fabric &amp; Composition
                  </label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="100% Combed Heavy Cotton (260 GSM)"
                    className="w-full h-10 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-medium outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                    Fit Details
                  </label>
                  <input
                    type="text"
                    value={fit}
                    onChange={(e) => setFit(e.target.value)}
                    placeholder="Boxy Oversized Fit"
                    className="w-full h-10 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-medium outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Pricing, Badges & Image Uploads */}
            <div className="p-6 sm:p-8 lg:p-10 bg-gray-50/50 flex flex-col justify-between space-y-6">
              {/* Pricing (INR) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    MRP Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1999"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                    Offer Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="999"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Promotional Badges */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2.5">
                <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="w-4 h-4 accent-black rounded"
                  />
                  <span>Mark as New Drop</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="w-4 h-4 accent-black rounded"
                  />
                  <span>Mark as Trending Now</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="w-4 h-4 accent-black rounded"
                  />
                  <span>Mark as Best Seller</span>
                </label>
              </div>

              {/* Image Uploads / URLs */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Product Image URLs (or Uploads)
                </label>

                <div className="space-y-2">
                  {imageUrlInputs.map((url, i) => (
                    <input
                      key={i}
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(i, e.target.value)}
                      placeholder={`Image URL ${i + 1} (Unsplash / Cloudinary)`}
                      className="w-full h-10 rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium outline-none focus:border-black"
                    />
                  ))}
                </div>

                <div className="mt-3">
                  <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-black bg-white cursor-pointer transition-colors">
                    <FaCloudUploadAlt size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs font-bold text-gray-700">Upload Images from Computer</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      hidden
                      onChange={(e) => setFiles(Array.from(e.target.files))}
                    />
                  </label>
                  {files.length > 0 && (
                    <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                      ✓ {files.length} image file(s) selected
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-dark !py-4 !rounded-2xl text-xs sm:text-sm uppercase tracking-wider font-bold shadow-xl"
              >
                {loading ? "Publishing Product..." : "Publish Fashion Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;