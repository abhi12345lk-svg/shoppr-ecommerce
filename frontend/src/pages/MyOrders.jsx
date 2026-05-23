// ======================= MYORDERS.JSX =======================

import React,{
useContext,
useEffect,
useState
} from 'react'

import {
ShopContext
} from '../Context/ShopContext'

import {
FaBoxOpen,
FaTruck,
FaCheckCircle,
FaMoneyBillWave
} from 'react-icons/fa'

import {
FaStripe
} from 'react-icons/fa6'

import {
toast
} from 'react-toastify'

const MyOrders=()=>{

const{
currency,
axios,
user,
navigate,
setShowUserLogin
}=useContext(ShopContext)

const[
orders,
setOrders
]=useState([])

const[
loading,
setLoading
]=useState(true)

/* ================= LOAD ORDERS ================= */

const loadOrderData=async()=>{

try{

setLoading(true)

const searchParams=
new URLSearchParams(window.location.search)

const success=
searchParams.get("success")

const orderId=
searchParams.get("orderId")

let url=
'/api/order/userorders'

if(success && orderId){

url+=
`?success=${success}&orderId=${orderId}`

}

const{data}=await axios.get(url)

if(data.success){

setOrders(data.orders)

window.history.replaceState(
{},
document.title,
"/my-orders"
)

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}finally{

setLoading(false)

}

}

/* ================= CANCEL ORDER ================= */

const cancelOrder=async(orderId)=>{

try{

const{data}=await axios.post(

'/api/order/cancel',

{
orderId
}

)

if(data.success){

toast.success(data.message)

loadOrderData()

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

/* ================= USE EFFECT ================= */

useEffect(()=>{

if(user){

loadOrderData()

}else{

setOrders([])
setLoading(false)

}

},[user])

/* ================= LOGIN REQUIRED ================= */

if(!user){

return(

<div className='w-full min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 sm:px-5'>

<div className='bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[40px] shadow-sm text-center max-w-lg w-full border border-gray-200'>

<h2 className='text-2xl sm:text-3xl md:text-4xl font-black text-black'>

Login Required

</h2>

<p className='text-gray-500 mt-4 text-sm sm:text-lg leading-7 sm:leading-relaxed'>

Please login to access your orders and track your purchases.

</p>

<button

onClick={()=>setShowUserLogin(true)}

className='mt-8 bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold duration-300 hover:scale-[1.02] text-sm sm:text-base'

>

Login Now

</button>

</div>

</div>

)

}

return(

<div className='w-full min-h-screen bg-[#f5f5f5] pt-6 sm:pt-10 pb-16 overflow-hidden'>

<div className='w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24'>

{/* ================= TOP ================= */}

<div className='mb-10 sm:mb-12'>

<p className='text-xs sm:text-sm uppercase tracking-[4px] sm:tracking-[5px] text-gray-400 font-semibold mb-3'>

Dashboard

</p>

<h1 className='text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-none text-black'>

My
<span className='font-light text-gray-500 ml-2 sm:ml-3'>

Orders

</span>

</h1>

<p className='text-gray-500 text-sm sm:text-lg mt-4 sm:mt-5 max-w-4xl leading-7 sm:leading-relaxed'>

Track your recent purchases, delivery updates,
payment status, and manage all your shopping
activity in one place.

</p>

</div>

{/* ================= LOADING ================= */}

{

loading&&(

<div className='grid gap-5 sm:gap-6'>

{

[1,2,3].map((item)=>(

<div

key={item}

className='bg-white rounded-[28px] sm:rounded-[35px] p-5 sm:p-8 animate-pulse border border-gray-200'

>

<div className='h-8 bg-gray-200 rounded w-1/3 mb-6'></div>

<div className='space-y-4'>

<div className='h-24 bg-gray-100 rounded-2xl'></div>

<div className='h-24 bg-gray-100 rounded-2xl'></div>

</div>

</div>

))

}

</div>

)

}

{/* ================= EMPTY ================= */}

{

!loading && orders.length===0&&(

<div className='bg-white rounded-[28px] sm:rounded-[40px] p-6 sm:p-12 text-center shadow-sm border border-gray-200'>

<div className='w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-[#f5f5f5] flex items-center justify-center mb-6 sm:mb-8'>

<FaBoxOpen className='text-3xl sm:text-4xl text-gray-400'/>

</div>

<h2 className='text-2xl sm:text-3xl font-black text-black'>

No Orders Found

</h2>

<p className='text-gray-500 mt-4 text-sm sm:text-lg leading-7 sm:leading-relaxed'>

Looks like you haven't placed any orders yet.

</p>

<button

onClick={()=>navigate('/collection')}

className='mt-8 bg-black hover:bg-gray-800 text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-semibold duration-300 hover:scale-[1.02] text-sm sm:text-base'

>

Start Shopping

</button>

</div>

)

}

{/* ================= ORDERS ================= */}

<div className='space-y-6 sm:space-y-8'>

{

orders.map((order)=>(

<div

key={order._id}

className='bg-white border border-gray-200 rounded-[28px] sm:rounded-[40px] p-4 sm:p-6 xl:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden'

>

{/* TOP */}

<div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 pb-6 sm:pb-8 border-b border-gray-100 mb-6 sm:mb-8'>

<div className='overflow-hidden'>

<p className='text-gray-400 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3'>

Order ID

</p>

<h2 className='text-base sm:text-xl xl:text-2xl font-black break-all'>

{order._id}

</h2>

<p className='text-gray-500 mt-3 text-sm sm:text-base'>

Placed On :

<span className='text-black font-semibold ml-2'>

{new Date(order.createdAt).toLocaleDateString()}

</span>

</p>

</div>

<div className='flex flex-wrap gap-3 sm:gap-4'>

<div className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold ${
order.isPaid
?'bg-green-100 text-green-700'
:'bg-yellow-100 text-yellow-700'
}`}>

{
order.isPaid
?'Payment Completed'
:'Payment Pending'
}

</div>

<div className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold ${
order.status==="Delivered"
?'bg-green-100 text-green-700'
:order.status==="Shipped"
?'bg-blue-100 text-blue-700'
:order.status==="Cancelled"
?'bg-red-100 text-red-600'
:'bg-orange-100 text-orange-700'
}`}>

{order.status}

</div>

</div>

</div>

{/* ITEMS */}

<div className='space-y-6 sm:space-y-8'>

{

order.items.map((item,idx)=>(

<div

key={idx}

className='flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-6 sm:gap-8 border-b border-gray-100 pb-6 sm:pb-8'

>

{/* LEFT */}

<div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>

<div

onClick={()=>navigate(
`/collection/${item.product?.category?.toLowerCase()}/${item.product?._id}`
)}

className='bg-[#f7f7f7] rounded-[22px] sm:rounded-[28px] p-4 sm:p-5 cursor-pointer hover:bg-[#efefef] transition-all duration-300 w-fit'

>

<img

src={item.product?.image?.[0]}

alt='productImg'

className='w-20 h-20 sm:w-28 sm:h-28 object-contain'

/>

</div>

<div className='overflow-hidden'>

<h3

onClick={()=>navigate(
`/collection/${item.product?.category?.toLowerCase()}/${item.product?._id}`
)}

className='text-lg sm:text-2xl font-black text-black max-w-2xl leading-snug cursor-pointer hover:text-gray-600 transition-all duration-300 break-words'

>

{item.product?.name}

</h3>

<div className='flex flex-wrap items-center gap-4 sm:gap-5 mt-4 sm:mt-5 text-gray-500'>

<p className='text-sm sm:text-lg'>

Qty :
<span className='font-semibold text-black ml-2'>

{item.quantity}

</span>

</p>

<p className='text-sm sm:text-lg'>

Size :
<span className='font-semibold text-black ml-2 uppercase'>

{item.size}

</span>

</p>

<p className='text-sm sm:text-lg'>

Price :
<span className='font-semibold text-black ml-2'>

{currency}
{item.product?.offerPrice}

</span>

</p>

</div>

</div>

</div>

{/* RIGHT */}

<div className='flex flex-col lg:flex-row gap-6 sm:gap-8 lg:items-center lg:justify-between w-full 2xl:max-w-[700px]'>

<div className='space-y-3 sm:space-y-4'>

<div className='flex items-center gap-3'>

{
order.paymentMethod==="stripe"

?<FaStripe className='text-[#635BFF] text-lg sm:text-xl'/>

:<FaMoneyBillWave className='text-green-500 text-base sm:text-lg'/>
}

<p className='text-gray-600 text-sm sm:text-lg'>

Method :
<span className='font-semibold text-black ml-2 uppercase'>

{order.paymentMethod}

</span>

</p>

</div>

<div className='flex items-center gap-3'>

<FaCheckCircle className='text-green-500 text-base sm:text-lg'/>

<p className='text-gray-600 text-sm sm:text-lg'>

Payment :
<span className='font-semibold text-black ml-2'>

{order.isPaid?'Done':'Pending'}

</span>

</p>

</div>

<div className='flex items-center gap-3'>

<FaTruck className='text-blue-500 text-base sm:text-lg'/>

<p className='text-gray-600 text-sm sm:text-lg'>

Delivery :
<span className='font-semibold text-black ml-2'>

{order.status}

</span>

</p>

</div>

<div className='pt-2'>

<h3 className='text-2xl sm:text-3xl font-black text-black'>

{currency}
{order.amount}

</h3>

</div>

</div>

{/* BUTTONS */}

<div className='flex flex-col gap-3 sm:gap-4 w-full lg:w-fit'>

<button

onClick={()=>
toast.info("Tracking Feature Coming Soon")
}

className='bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] whitespace-nowrap text-sm sm:text-base w-full'

>

Track Order

</button>

{

order.status!=="Cancelled" &&
order.status!=="Shipped" &&
order.status!=="Delivered"&&(

<button

onClick={()=>
cancelOrder(order._id)
}

className='border border-red-200 text-red-500 hover:bg-red-50 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base w-full'

>

Cancel Order

</button>

)

}

</div>

</div>

</div>

))

}

</div>

</div>

))

}

</div>

</div>

</div>

)

}

export default MyOrders