/* ======================= HEADER.JSX ======================= */

import React,{
useContext,
useEffect,
useState
}from 'react'

import{
NavLink,
useLocation
}from 'react-router-dom'

import{
FaSearch,
FaShoppingBag,
FaBars,
FaTimes
}from 'react-icons/fa'

import{
FiUser
}from 'react-icons/fi'

import{
ShopContext
}from '../Context/ShopContext'

const Header=()=>{

const location=useLocation()

const isCollectionPage=
location.pathname.includes('/collection')

const{

navigate,
user,
logout,
setShowUserLogin,
getCartCount,
searchQuery,
setSearchQuery

}=useContext(ShopContext)

const[
menuOpen,
setMenuOpen
]=useState(false)

const[
showSearch,
setShowSearch
]=useState(false)

const[
showProfile,
setShowProfile
]=useState(false)

const[
scrolled,
setScrolled
]=useState(false)

/* ================= SCROLL EFFECT ================= */

useEffect(()=>{

const handleScroll=()=>{

setScrolled(window.scrollY>20)

}

window.addEventListener('scroll',handleScroll)

return()=>window.removeEventListener(
'scroll',
handleScroll
)

},[])

/* ================= SEARCH NAVIGATION ================= */

useEffect(()=>{

if(
searchQuery.trim().length>0
&&!isCollectionPage
){

navigate('/collection')

}

},[searchQuery])

/* ================= NAV LINKS ================= */

const navLinks=[

{
path:'/',
label:'HOME'
},

{
path:'/collection',
label:'COLLECTION'
},

{
path:'/testimonials',
label:'REVIEWS'
},

{
path:'/contact',
label:'CONTACT'
}

]

return(

<header

className={`sticky top-0 z-50 w-full transition-all duration-500
${scrolled
?'bg-white/80 backdrop-blur-2xl border-b border-gray-200 shadow-sm'
:'bg-[#f8f8f8]'
}`}

>

<div
className='max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24'
>

{/* ================= NAVBAR ================= */}

<div className='h-[78px] sm:h-[88px] flex items-center justify-between gap-4'>

{/* ================= LOGO ================= */}

<div className='flex items-center shrink-0'>

<h1

onClick={()=>navigate('/')}

className='text-[26px] sm:text-[32px] xl:text-[42px] font-black cursor-pointer tracking-[-2px] leading-none select-none hover:scale-[1.02] transition-all duration-300'

>

SHOPPR.

</h1>

</div>

{/* ================= CENTER NAV ================= */}

<ul
className='hidden xl:flex items-center justify-center gap-10 2xl:gap-16 font-semibold text-[15px] tracking-[2px]'
>

{

navLinks.map((item,index)=>(

<NavLink

key={index}

to={item.path}

className={({isActive})=>

`relative py-2 uppercase transition-all duration-500
${isActive
?'text-black'
:'text-gray-500 hover:text-black'
}`

}

>

{item.label}

<span

className={`absolute left-0 bottom-0 h-[2px] bg-black rounded-full transition-all duration-500
${location.pathname===item.path
?'w-full'
:'w-0'
}`}

/>

</NavLink>

))

}

</ul>

{/* ================= RIGHT ================= */}

<div className='flex items-center justify-end gap-2 sm:gap-4 shrink-0'>

{/* ================= SEARCH ================= */}

<div className='hidden md:flex items-center relative'>

<div

className={`flex items-center overflow-hidden rounded-full bg-white border border-gray-200 shadow-sm transition-all duration-500
${showSearch
?'w-[220px] lg:w-[300px] xl:w-[380px] 2xl:w-[480px] px-4 lg:px-6'
:'w-0 px-0 border-0 shadow-none'
}`}

>

<input

type='text'

value={searchQuery}

onChange={(e)=>

setSearchQuery(e.target.value)

}

placeholder='Search premium products...'

className='w-full h-12 bg-transparent outline-none text-[14px] lg:text-[15px] font-medium tracking-[0.5px]'

/>

</div>

<button

onClick={()=>setShowSearch(!showSearch)}

className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 hover:bg-[#111] transition-all duration-300 shadow-lg'

>

<FaSearch size={14}/>

</button>

</div>

{/* ================= CART ================= */}

<button

onClick={()=>navigate('/cart')}

className='relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 hover:bg-[#111] transition-all duration-300 shadow-lg'

>

<FaShoppingBag size={15}/>

{

getCartCount()>0&&(

<span
className='absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold px-1'

>

{getCartCount()}

</span>

)

}

</button>

{/* ================= USER ================= */}

{

user

?(

<div className='relative'>

<button

onClick={()=>setShowProfile(!showProfile)}

className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-sm'

>

<FiUser size={18}/>

</button>

{/* ================= PROFILE DROPDOWN ================= */}

{

showProfile&&(

<div
className='absolute right-0 top-14 sm:top-16 w-[260px] sm:w-[290px] bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-2xl'
>

<div className='px-5 sm:px-7 py-5 sm:py-6 border-b border-gray-100 bg-[#fafafa]'>

<h4 className='font-bold text-black text-base sm:text-lg'>

{user.name}

</h4>

<p className='text-sm text-gray-500 truncate mt-2'>

{user.email}

</p>

</div>

<div className='p-3 sm:p-4 flex flex-col gap-3'>

<button

onClick={()=>{

navigate('/my-orders')
setShowProfile(false)

}}

className='w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-2xl hover:bg-[#f5f5f5] text-[14px] sm:text-[15px] font-medium transition-all duration-300'

>

My Orders

</button>

<button

onClick={logout}

className='w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-2xl hover:bg-red-50 text-red-500 text-[14px] sm:text-[15px] font-medium transition-all duration-300'

>

Logout

</button>

</div>

</div>

)

}

</div>

)

:(

<button

onClick={()=>setShowUserLogin(true)}

className='hidden sm:flex items-center justify-center px-5 lg:px-7 h-10 lg:h-12 rounded-full bg-black text-white text-xs lg:text-sm font-semibold hover:bg-[#111] hover:scale-105 transition-all duration-300 shadow-lg tracking-[1px]'

>

LOGIN

</button>

)

}

{/* ================= MOBILE MENU ================= */}

<button

onClick={()=>setMenuOpen(true)}

className='xl:hidden h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg'

>

<FaBars size={16}/>

</button>

</div>

</div>

</div>

{/* ================= MOBILE SIDEBAR ================= */}

{

menuOpen&&(

<div className='fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm xl:hidden'>

<div className='absolute right-0 top-0 h-full w-[88%] max-w-[420px] bg-white p-5 sm:p-7 flex flex-col overflow-y-auto'>

{/* TOP */}

<div className='flex items-center justify-between mb-10'>

<h2 className='text-2xl sm:text-3xl font-black tracking-tight'>

MENU

</h2>

<button

onClick={()=>setMenuOpen(false)}

className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black text-white flex items-center justify-center'

>

<FaTimes/>

</button>

</div>

{/* SEARCH */}

<div className='flex items-center bg-[#f5f5f5] rounded-full px-5 h-12 sm:h-14 mb-8 sm:mb-10 border border-gray-200'>

<input

type='text'

value={searchQuery}

onChange={(e)=>

setSearchQuery(e.target.value)

}

placeholder='Search products...'

className='w-full bg-transparent outline-none text-[14px] sm:text-[15px]'

/>

<FaSearch className='text-gray-500'/>

</div>

{/* NAV */}

<div className='flex flex-col gap-3'>

{

navLinks.map((item,index)=>(

<NavLink

key={index}

to={item.path}

onClick={()=>setMenuOpen(false)}

className={({isActive})=>

`px-5 py-4 rounded-2xl text-[14px] sm:text-[15px] font-bold tracking-wide transition-all duration-300
${isActive
?'bg-black text-white'
:'bg-[#f5f5f5] text-gray-700 hover:bg-black hover:text-white'
}`

}

>

{item.label}

</NavLink>

))

}

</div>

{/* BOTTOM */}

<div className='mt-auto pt-10'>

{

!user&&(

<button

onClick={()=>{

setShowUserLogin(true)
setMenuOpen(false)

}}

className='w-full h-12 sm:h-14 rounded-2xl bg-black text-white font-semibold shadow-xl text-sm sm:text-base'

>

Login To Continue

</button>

)

}

</div>

</div>

</div>

)

}

</header>

)

}

export default Header