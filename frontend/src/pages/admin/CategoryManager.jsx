import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiPlus, FiTrash2, FiEdit2, FiLayers } from "react-icons/fi";
import { ShopContext } from "../../Context/ShopContext";

const CategoryManager = () => {
  const { categories, fetchCategories, axios } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [subCategoriesInput, setSubCategoriesInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);
      const subList = subCategoriesInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((subName) => ({
          name: subName,
          slug: subName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        }));

      const { data } = await axios.post("/api/category/add", {
        name: name.trim(),
        description: description.trim(),
        image: image.trim(),
        subCategories: subList
      });

      if (data.success) {
        toast.success(data.message || "Category created");
        setName("");
        setDescription("");
        setImage("");
        setSubCategoriesInput("");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const { data } = await axios.post("/api/category/delete", { categoryId });
      if (data.success) {
        toast.success("Category deleted");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="uppercase tracking-[4px] text-gray-500 text-xs font-bold mb-2">
            Catalogue Architecture
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-black leading-none">
            Category <span className="text-gray-400 font-light">Management</span>
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Dynamically create, organize, and manage fashion departments and sub-categories.
          </p>
        </div>

        {/* 2-Column: Create Form + Live Category List */}
        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-8 items-start">
          {/* Create Category Form */}
          <form
            onSubmit={handleCreateCategory}
            className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4"
          >
            <h3 className="font-display font-black text-lg uppercase text-black mb-4">
              Add New Department
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Department Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Athleisure, Unisex, Accessories"
                className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Sub-Categories (Comma Separated)
              </label>
              <input
                type="text"
                value={subCategoriesInput}
                onChange={(e) => setSubCategoriesInput(e.target.value)}
                placeholder="e.g. Joggers, Performance Tees, Gym Shorts"
                className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Separate multiple sub-styles using commas.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Cover / Banner Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Brief Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Editorial style note for this department..."
                className="w-full border border-gray-200 bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-black resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-dark !py-3.5 !rounded-2xl text-xs uppercase tracking-wider gap-2"
            >
              <FiPlus size={16} />
              <span>{loading ? "Creating..." : "Create Category"}</span>
            </button>
          </form>

          {/* Existing Categories Table */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h3 className="font-display font-black text-lg uppercase text-black mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Active Departments</span>
              <span className="text-xs text-gray-400 font-bold">{categories.length} Total</span>
            </h3>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div
                  key={cat._id || cat.name}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-14 h-16 object-cover rounded-xl bg-white border border-gray-200 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-16 rounded-xl bg-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                        <FiLayers size={18} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base uppercase text-black">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{cat.description || "Active department"}</p>
                      {cat.subCategories && cat.subCategories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cat.subCategories.map((sub, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded-md border border-gray-200 text-gray-700"
                            >
                              {sub.name || sub}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
