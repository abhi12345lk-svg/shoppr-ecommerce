/* ======================= ORDERS.JSX ======================= */

import React,{
useContext,
useEffect,
useState
} from 'react'

import{
ShopContext
} from '../../Context/ShopContext'

import{
toast
} from 'react-toastify'

import{
FaBoxOpen,
FaShippingFast,
FaMoneyBillWave,
FaUserAlt
} from 'react-icons/fa'

const Orders=()=>{

const{
currency,
axios
}=useContext(ShopContext)

const[
orders,
setOrders
]=useState([])

/* ================= FETCH ORDERS ================= */

const fetchOrders=async()=>{

try{

const{data}=await axios.get(
'/api/order/list'
)

if(data.success){

setOrders(data.orders)

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

/* ================= UPDATE STATUS ================= */

const updateOrderStatus=async(
orderId,
status
)=>{

try{

const{data}=await axios.post(
'/api/order/status',
{
orderId,
status
}
)

if(data.success){

toast.success(data.message)

fetchOrders()

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

useEffect(()=>{

fetchOrders()

},[])

return(

<div className='w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 relative overflow-hidden'>

{/* ================= BACKGROUND ================= */}

<div className='absolute top-0 left-0 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] bg-blue-200/30 blur-3xl rounded-full'></div>

<div className='absolute bottom-0 right-0 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] bg-purple-200/30 blur-3xl rounded-full'></div>

<div className='relative z-10 max-w-7xl mx-auto'>

{/* ================= TOP ================= */}

<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8 sm:mb-10'>

<div>

<p className='uppercase tracking-[4px] sm:tracking-[5px] text-gray-500 text-xs sm:text-sm font-bold mb-3'>

Admin Dashboard

</p>

<h1 className='text-4xl sm:text-5xl font-black text-black leading-none'>

Customer
<span className='text-gray-400 font-light ml-2 sm:ml-3'>
Orders
</span>

</h1>

<p className='text-gray-600 mt-4 text-sm sm:text-base lg:text-lg max-w-2xl leading-7 sm:leading-relaxed'>

Manage customer orders, delivery updates and payment tracking professionally.

</p>

</div>

<div className='bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl px-5 sm:px-6 py-4 sm:py-5 shadow-lg flex items-center gap-4 w-fit'>

<div className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black text-white flex items-center justify-center text-xl sm:text-2xl'>

<FaBoxOpen/>

</div>

<div>

<h4 className='text-2xl sm:text-3xl font-black text-black'>

{orders?.length}

</h4>

<p className='text-gray-500 text-xs sm:text-sm font-medium'>

Total Orders

</p>

</div>

</div>

</div>

{/* ================= EMPTY ================= */}

{

orders.length===0&&(

<div className='bg-white/70 backdrop-blur-xl border border-white/50 rounded-[28px] sm:rounded-[35px] p-8 sm:p-14 text-center shadow-xl'>

<h2 className='text-2xl sm:text-3xl font-black text-black'>

No Orders Found

</h2>

<p className='text-gray-500 mt-3 text-sm sm:text-lg leading-7'>

No customer orders available right now.

</p>

</div>

)

}

{/* ================= ORDERS ================= */}

<div className='flex flex-col gap-5 sm:gap-8'>

{

orders.map((order,index)=>(

<div

key={index}

className='bg-white/70 backdrop-blur-xl border border-white/60 rounded-[28px] sm:rounded-[35px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.08)]'

>

{/* ================= ORDER TOP ================= */}

<div className='px-4 sm:px-8 py-5 sm:py-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5'>

<div className='min-w-0'>

<p className='text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide'>

Order ID

</p>

<h3 className='text-sm sm:text-xl font-black text-black break-all mt-1'>

{order._id}

</h3>

</div>

<div className='flex flex-wrap gap-3 sm:gap-4'>

<div className='px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-black text-white text-xs sm:text-sm font-semibold'>

{order.paymentMethod}

</div>

<div className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold ${
order.isPaid
?'bg-green-100 text-green-700'
:'bg-yellow-100 text-yellow-700'
}`}>

{

order.isPaid
?'Paid'
:'Pending'

}

</div>

</div>

</div>

{/* ================= PRODUCTS ================= */}

<div className='p-4 sm:p-8 flex flex-col gap-5 sm:gap-6'>

{

order.items.map((item,idx)=>(

<div

key={idx}

className='flex flex-col xl:flex-row xl:items-center justify-between gap-5 sm:gap-6 border-b border-gray-100 pb-5 sm:pb-6 last:border-0'

>

{/* ================= PRODUCT ================= */}

<div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5'>

<img

src={
item.product?.image?.[0] ||
'https://via.placeholder.com/150'
}

alt='productImg'

className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm bg-white shrink-0'

/>

<div className='min-w-0'>

<h2 className='text-lg sm:text-2xl font-black text-black leading-tight break-words'>

{item.product?.name || "Product Deleted"}

</h2>

<div className='flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4'>

<p className='text-gray-500 text-xs sm:text-sm'>

Qty :
<span className='text-black font-bold ml-1'>

{item.quantity}

</span>

</p>

<p className='text-gray-500 text-xs sm:text-sm'>

Size :
<span className='text-black font-bold ml-1 uppercase'>

{item.size}

</span>

</p>

<p className='text-gray-500 text-xs sm:text-sm'>

Price :
<span className='text-black font-bold ml-1'>

{currency}
{item.product?.offerPrice || 0}

</span>

</p>

</div>

</div>

</div>

{/* ================= STATUS ================= */}

<div className='w-full xl:w-[260px]'>

<select

value={order.status}

onChange={(e)=>

updateOrderStatus(
order._id,
e.target.value
)

}

className='w-full h-12 sm:h-14 rounded-2xl border border-gray-200 bg-white px-4 sm:px-5 text-xs sm:text-sm font-semibold outline-none focus:border-black transition-all duration-300'

>

<option value='Order Placed'>

Order Placed

</option>

<option value='Packing'>

Packing

</option>

<option value='Shipped'>

Shipped

</option>

<option value='Out for delivery'>

Out for delivery

</option>

<option value='Delivered'>

Delivered

</option>

</select>

</div>

</div>

))

}

</div>

{/* ================= ORDER META ================= */}

<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-8 bg-white/40 border-t border-gray-100'>

{/* CUSTOMER */}

<div className='bg-white rounded-[24px] sm:rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm'>

<div className='flex items-center gap-3 mb-4'>

<div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0'>

<FaUserAlt/>

</div>

<h4 className='font-black text-black text-base sm:text-lg'>

Customer

</h4>

</div>

<p className='font-bold text-black text-base sm:text-lg break-words'>

{order.address.firstName}
{" "}
{order.address.lastName}

</p>

<p className='text-gray-500 mt-2 text-xs sm:text-sm break-all'>

{order.address.email}

</p>

<p className='text-gray-500 mt-1 text-xs sm:text-sm'>

{order.address.phone}

</p>

</div>

{/* ADDRESS */}

<div className='bg-white rounded-[24px] sm:rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm'>

<div className='flex items-center gap-3 mb-4'>

<div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0'>

<FaShippingFast/>

</div>

<h4 className='font-black text-black text-base sm:text-lg'>

Address

</h4>

</div>

<p className='text-gray-600 leading-6 sm:leading-7 text-xs sm:text-sm break-words'>

{order.address.street},
{" "}
{order.address.city},
{" "}
{order.address.state},
{" "}
{order.address.zipcode},
{" "}
{order.address.country}

</p>

</div>

{/* PAYMENT */}

<div className='bg-white rounded-[24px] sm:rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm'>

<div className='flex items-center gap-3 mb-4'>

<div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0'>

<FaMoneyBillWave/>

</div>

<h4 className='font-black text-black text-base sm:text-lg'>

Payment

</h4>

</div>

<p className='text-gray-600 text-xs sm:text-sm mb-2 break-words'>

Method :
<span className='font-bold text-black ml-2'>

{order.paymentMethod}

</span>

</p>

<p className='text-gray-600 text-xs sm:text-sm mb-2'>

Amount :
<span className='font-bold text-black ml-2'>

{currency}
{order.amount}

</span>

</p>

<p className='text-gray-600 text-xs sm:text-sm'>

Date :
<span className='font-bold text-black ml-2'>

{

new Date(
order.createdAt
).toDateString()

}

</span>

</p>

</div>

{/* STATUS */}

<div className='bg-white rounded-[24px] sm:rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-center'>

<p className='text-gray-500 text-xs sm:text-sm uppercase tracking-wide font-bold mb-3'>

Current Status

</p>

<div className={`w-fit px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold ${
order.status==="Delivered"
?'bg-green-100 text-green-700'
:order.status==="Shipped"
?'bg-blue-100 text-blue-700'
:order.status==="Packing"
?'bg-yellow-100 text-yellow-700'
:'bg-black text-white'
}`}>

{order.status}

</div>

</div>

</div>

</div>

))

}

</div>

</div>

</div>

)

}

export default Orders