    /* ======================= SHOPCONTEXT.JSX ======================= */

    import {createContext,useEffect,useState} from "react";
    import {useNavigate} from "react-router-dom";
    import axios from "axios";
    import {toast} from "react-toastify";

    export const ShopContext=createContext();

    const ShopContextProvider=({children})=>{

    const currency=import.meta.env.VITE_CURRENCY || "$";
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const delivery_charges=40;

    const navigate=useNavigate();

    const[user,setUser]=useState(null);
    const[products,setProducts]=useState([]);
    const[searchQuery,setSearchQuery]=useState("");
    const[showUserLogin,setShowUserLogin]=useState(false);
    const[cartItems,setCartItems]=useState({});
    const[isAdmin,setIsAdmin]=useState(false);

    /* ================= AXIOS ================= */

    axios.defaults.baseURL=backendUrl;
    axios.defaults.withCredentials=true;

    /* ================= FETCH PRODUCTS ================= */

    const fetchProducts=async()=>{

    try{

    const{data}=await axios.get('/api/product/list');

    if(data.success){

    setProducts(data.products);

    }else{

    toast.error(data.message);

    }

    }catch(error){

    toast.error(error.message);

    }

    };

    /* ================= FETCH USER ================= */

    const fetchUser=async()=>{

    try{

    const{data}=await axios.get('/api/user/is-auth');

    if(data.success){

    setUser(data.user);

    const cartResponse=
    await axios.get('/api/user/cart');

    if(cartResponse.data.success){

    setCartItems(
    cartResponse.data.cartData || {}
    );

    }

    }else{

    setUser(null);

    setCartItems({});

    }

    }catch(error){

    setUser(null);

    setCartItems({});

    }

    };

    /* ================= FETCH ADMIN ================= */

    const fetchAdmin=async()=>{

    try{

    const{data}=await axios.get('/api/admin/is-auth');

    setIsAdmin(data.success);

    }catch(error){

    setIsAdmin(false);

    }

    };

    /* ================= LOGIN SUCCESS ================= */

    const handleLoginSuccess=async()=>{

    await fetchUser();

    navigate('/');

    };

    /* ================= LOGOUT ================= */

    const logout=async()=>{

    try{

    const{data}=await axios.post('/api/user/logout');

    if(data.success){

    setUser(null);

    setCartItems({});

    toast.success(data.message);

    navigate('/');

    }else{

    toast.error(data.message);

    }

    }catch(error){

    toast.error(error.message);

    }

    };

    /* ================= ADD TO CART ================= */

    const addToCart=async(itemId,size)=>{

    if(!size){

    toast.error("Select Product Size");

    return;

    }

    let cartData=structuredClone(cartItems);

    if(cartData[itemId]){

    if(cartData[itemId][size]){

    cartData[itemId][size]+=1;

    }else{

    cartData[itemId][size]=1;

    }

    }else{

    cartData[itemId]={};

    cartData[itemId][size]=1;

    }

    setCartItems(cartData);

    toast.success("Added To Cart");

    if(user){

    await axios.post('/api/user/cart',{
    cartData
    });

    }

    };

    /* ================= UPDATE QUANTITY ================= */

    const updateQuantity=async(itemId,size,quantity)=>{

    let cartData=structuredClone(cartItems);

    cartData[itemId][size]=quantity;

    setCartItems(cartData);

    if(user){

    await axios.post('/api/user/cart',{
    cartData
    });

    }

    };

    /* ================= GET CART COUNT ================= */

    const getCartCount=()=>{

    let totalCount=0;

    for(const items in cartItems){

    for(const item in cartItems[items]){

    try{

    if(cartItems[items][item]>0){

    totalCount+=cartItems[items][item];

    }

    }catch(error){

    console.log(error);

    }

    }

    }

    return totalCount;

    };

    /* ================= GET CART AMOUNT ================= */

    const getCartAmount=()=>{

    let totalAmount=0;

    for(const itemId in cartItems){

    let product=products.find(
    (product)=>product._id===itemId
    );

    if(!product)continue;

    for(const size in cartItems[itemId]){

    try{

    if(cartItems[itemId][size]>0){

    totalAmount+=
    product.offerPrice*
    cartItems[itemId][size];

    }

    }catch(error){

    console.log(error);

    }

    }

    }

    return totalAmount;

    };

    /* ================= USE EFFECT ================= */

    useEffect(()=>{

    fetchProducts();
    fetchUser();
    fetchAdmin();

    },[]);

    /* ================= CONTEXT VALUE ================= */

    const value={

    navigate,
    axios,

    user,
    setUser,

    products,
    setProducts,

    currency,

    searchQuery,
    setSearchQuery,

    showUserLogin,
    setShowUserLogin,

    cartItems,
    setCartItems,

    addToCart,
    updateQuantity,

    getCartCount,
    getCartAmount,

    delivery_charges,

    isAdmin,
    setIsAdmin,

    fetchProducts,
    fetchUser,
    fetchAdmin,

    handleLoginSuccess,
    logout,

    backendUrl

    };

    return(

    <ShopContext.Provider value={value}>

    {children}

    </ShopContext.Provider>

    );

    };

    export default ShopContextProvider;