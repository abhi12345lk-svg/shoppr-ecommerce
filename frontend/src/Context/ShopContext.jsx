/* ======================= SHOPCONTEXT.JSX ======================= */

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

// Ensure clean backend URL without trailing slashes
const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const backendUrl = rawBackendUrl.replace(/\/+$/, "");

/* ================= AXIOS DEFAULT CONFIGURATION ================= */

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 25000;

// Request interceptor: attach token & adminToken
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.token = token;
    }
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      config.headers.adminToken = adminToken;
      config.headers.admintoken = adminToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.warn("Network Error: Could not reach backend at", backendUrl);
    }
    return Promise.reject(error);
  }
);

function ShopContextProvider({ children }) {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const standardDeliveryFee = 99;
  const freeShippingThreshold = 999;
  const taxRate = 0.05; // 5% GST for fashion apparel

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  /* ================= CURRENCY FORMATTER ================= */

  const formatPrice = (amount) => {
    const numeric = Number(amount) || 0;
    return `${currency}${numeric.toLocaleString("en-IN")}`;
  };

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products || []);
      } else {
        toast.error(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Fetch Products Error:", error.message);
    }
  };

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/list");
      if (data.success && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error.message);
    }
  };

  /* ================= FETCH USER ================= */

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success && data.user) {
        setUser(data.user);
        if (data.user.wishlist && Array.isArray(data.user.wishlist)) {
          setWishlist(data.user.wishlist.map((id) => (typeof id === "object" ? id._id : id)));
        }
        try {
          const cartResponse = await axios.get("/api/user/cart");
          if (cartResponse?.data?.success) {
            setCartItems(cartResponse.data.cartData || {});
          }
        } catch {
          // ignore cart errors
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  /* ================= FETCH ADMIN ================= */

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-auth");
      setIsAdmin(Boolean(data?.success && data?.isAdmin));
    } catch {
      setIsAdmin(false);
    }
  };

  /* ================= LOGIN SUCCESS ================= */

  const handleLoginSuccess = async (token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
    await fetchUser();
    navigate("/");
  };

  /* ================= LOGOUT ================= */

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");
      localStorage.removeItem("token");
      setUser(null);
      setCartItems({});
      setAppliedCoupon(null);
      toast.success(data?.message || "Successfully Logged Out");
      navigate("/");
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      setCartItems({});
      setAppliedCoupon(null);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* ================= ADD TO CART ================= */

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size first");
      return false;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Added To Bag");

    if (user) {
      try {
        await axios.post("/api/user/cart", { cartData });
      } catch (err) {
        console.error("Sync Cart Error:", err);
      }
    }
    return true;
  };

  /* ================= UPDATE QUANTITY ================= */

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (user) {
      try {
        await axios.post("/api/user/cart", { cartData });
      } catch (err) {
        console.error("Update Cart Error:", err);
      }
    }
  };

  /* ================= WISHLIST ================= */

  const toggleWishlist = async (productId) => {
    let nextList = [...wishlist];
    const exists = nextList.includes(productId);

    if (exists) {
      nextList = nextList.filter((id) => id !== productId);
      toast.info("Removed from Wishlist");
    } else {
      nextList.push(productId);
      toast.success("Added to Wishlist");
    }

    setWishlist(nextList);
    localStorage.setItem("wishlist", JSON.stringify(nextList));

    if (user) {
      try {
        await axios.post("/api/user/wishlist/toggle", { productId });
      } catch (err) {
        console.error("Wishlist sync error:", err);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  /* ================= CART TOTAL CALCULATIONS ================= */

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const getCartSubtotal = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalAmount += Number(product.offerPrice || product.price) * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  const getCartDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = getCartSubtotal();
    return Math.min(subtotal, appliedCoupon.discount || 0);
  };

  const getDeliveryCharges = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const effectiveAmount = Math.max(0, subtotal - discount);
    if (effectiveAmount === 0 || effectiveAmount >= freeShippingThreshold) {
      return 0;
    }
    return standardDeliveryFee;
  };

  const getTaxAmount = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const effectiveAmount = Math.max(0, subtotal - discount);
    return Math.round(effectiveAmount * taxRate);
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const delivery = getDeliveryCharges();
    const tax = getTaxAmount();
    return Math.max(0, subtotal - discount) + delivery + tax;
  };

  /* ================= COUPON APPLICATION ================= */

  const applyCoupon = async (code) => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) {
      toast.error("Your bag is empty");
      return false;
    }

    try {
      const { data } = await axios.post("/api/coupon/validate", {
        code,
        subtotal
      });

      if (data.success && data.valid) {
        setAppliedCoupon({
          code: data.code,
          discount: data.discount,
          description: data.description
        });
        toast.success(data.message || `Coupon ${data.code} applied!`);
        return true;
      } else {
        toast.error(data.message || "Invalid coupon code");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired coupon code");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  /* ================= PINCODE SERVICEABILITY ================= */

  const checkPincode = async (pincode) => {
    try {
      const { data } = await axios.get(`/api/shipping/check-pincode?pincode=${pincode}`);
      return data;
    } catch (error) {
      return {
        serviceable: false,
        message: error.response?.data?.message || "Unable to check pincode"
      };
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUser();
    fetchAdmin();
  }, []);

  /* ================= CONTEXT VALUE ================= */

  const value = {
    navigate,
    axios,

    user,
    setUser,

    products,
    setProducts,

    categories,
    setCategories,

    currency,
    formatPrice,

    searchQuery,
    setSearchQuery,

    showUserLogin,
    setShowUserLogin,

    cartItems,
    setCartItems,

    addToCart,
    updateQuantity,

    getCartCount,
    getCartSubtotal,
    getCartAmount: getCartSubtotal, // maintain backward compatibility
    getCartDiscount,
    getDeliveryCharges,
    getTaxAmount,
    getCartTotal,

    appliedCoupon,
    applyCoupon,
    removeCoupon,

    wishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistCount,

    quickViewProduct,
    setQuickViewProduct,

    showSizeGuide,
    setShowSizeGuide,

    checkPincode,

    delivery_charges: standardDeliveryFee,
    freeShippingThreshold,

    isAdmin,
    setIsAdmin,

    fetchProducts,
    fetchCategories,
    fetchUser,
    fetchAdmin,

    handleLoginSuccess,
    logout,

    backendUrl
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;