/* ======================= SIDEBAR.JSX ======================= */

import React,{
useContext,
useState
} from "react";

import{
Link,
NavLink,
Outlet
}from "react-router-dom";

import{
FaSquarePlus
}from "react-icons/fa6";

import{
FaListAlt,
FaEnvelope,
FaBars
}from "react-icons/fa";

import{
MdFactCheck
}from "react-icons/md";

import{
BiLogOut
}from "react-icons/bi";

import{
IoClose
}from "react-icons/io5";

import{
toast
}from "react-toastify";

import{
ShopContext
}from "../../Context/ShopContext";

const Sidebar=()=>{

const{
navigate,
setIsAdmin,
axios
}=useContext(ShopContext);

/* ================= MOBILE MENU ================= */

const[
menuOpen,
setMenuOpen
]=useState(false);

/* ================= NAVIGATION ITEMS ================= */

const navItems=[

{
path:"/admin/add",
label:"Add Product",
icon:<FaSquarePlus/>
},

{
path:"/admin/list",
label:"Product List",
icon:<FaListAlt/>
},

{
path:"/admin/orders",
label:"Orders",
icon:<MdFactCheck/>
},

{
path:"/admin/contact-messages",
label:"Contact Messages",
icon:<FaEnvelope/>
}

];

/* ================= LOGOUT ================= */

const logout=async()=>{

try{

const{data}=await axios.post(
"/api/admin/logout"
);

if(data.success){

setIsAdmin(false);

toast.success(
data.message || "Logged Out"
);

navigate("/");

}else{

toast.error(data.message);

}

}catch(error){

toast.error(error.message);

}

};

return(

<div className="w-full min-h-screen flex bg-[#f5f5f5] overflow-hidden">

{/* ================= MOBILE TOPBAR ================= */}

<div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-black text-white flex items-center justify-between px-4 z-50 shadow-xl">

<Link
to="/admin/add"
className="text-2xl font-black tracking-tight"
>

SHOPPR
<span className="text-gray-500">.</span>

</Link>

<button

onClick={()=>
setMenuOpen(true)
}

className="text-2xl"

>

<FaBars/>

</button>

</div>

{/* ================= MOBILE OVERLAY ================= */}

<div
onClick={()=>
setMenuOpen(false)
}
className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${
menuOpen
?'opacity-100 visible'
:'opacity-0 invisible'
}`}
></div>

{/* ================= SIDEBAR ================= */}

<div className={`fixed lg:relative top-0 left-0 z-50 lg:z-auto w-[280px] sm:w-[320px] lg:w-[280px] h-screen bg-black text-white flex flex-col justify-between px-5 sm:px-6 py-6 sm:py-8 shadow-2xl transition-all duration-300 ${
menuOpen
?'translate-x-0'
:'-translate-x-full lg:translate-x-0'
}`}>

<div className="overflow-y-auto">

{/* ================= TOP ================= */}

<div className="flex items-center justify-between mb-10 lg:mb-14">

<Link
to="/admin/add"
onClick={()=>
setMenuOpen(false)
}
className="block"
>

<h1 className="text-4xl sm:text-5xl font-black tracking-tight">

SHOPPR
<span className="text-gray-500">.</span>

</h1>

<p className="text-gray-400 text-xs sm:text-sm mt-2 tracking-wide">

Admin Dashboard

</p>

</Link>

{/* MOBILE CLOSE */}

<button

onClick={()=>
setMenuOpen(false)
}

className="lg:hidden text-3xl text-white"

>

<IoClose/>

</button>

</div>

{/* ================= NAV LINKS ================= */}

<div className="flex flex-col gap-3 sm:gap-4">

{

navItems.map((item,index)=>(

<NavLink

key={index}

to={item.path}

onClick={()=>
setMenuOpen(false)
}

className={({isActive})=>

`
group
flex
items-center
gap-4
px-4
sm:px-5
py-3.5
sm:py-4
rounded-2xl
text-sm
sm:text-[15px]
font-semibold
transition-all
duration-300

${

isActive

?"bg-white text-black shadow-lg"

:"text-gray-400 hover:bg-[#161616] hover:text-white"

}

`

}

>

<div className="text-xl sm:text-2xl shrink-0">

{item.icon}

</div>

<p className="tracking-wide">

{item.label}

</p>

</NavLink>

))

}

</div>

</div>

{/* ================= LOGOUT ================= */}

<div className="pt-5">

<button

onClick={logout}

className="w-full flex items-center gap-4 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold text-sm sm:text-[15px]"

>

<BiLogOut className="text-xl sm:text-2xl"/>

<span>

Logout

</span>

</button>

</div>

</div>

{/* ================= PAGE CONTENT ================= */}

<div className="flex-1 h-screen bg-[#f5f5f5] overflow-x-hidden overflow-y-auto pt-16 lg:pt-0">

<div className="w-full h-full p-4 sm:p-6 lg:p-10">

<Outlet/>

</div>

</div>

</div>

);

};

export default Sidebar;