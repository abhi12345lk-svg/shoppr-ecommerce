// ======================= PLACEORDER.JSX =======================

import React,{
useContext,
useState
} from 'react'

import {
ShopContext
} from '../Context/ShopContext'

import Footer from '../components/Footer'

import {
toast
} from 'react-toastify'

import {
FaStripe,
FaMoneyBillWave
} from 'react-icons/fa'

const PlaceOrder=()=>{

const{

currency,
getCartAmount,
navigate,
cartItems,
axios,
setCartItems,
delivery_charges

}=useContext(ShopContext)

/* ================= PAYMENT METHOD ================= */

const[
method,
setMethod
]=useState('cod')

/* ================= FORM STATES ================= */

const[
firstName,
setFirstName
]=useState('')

const[
lastName,
setLastName
]=useState('')

const[
email,
setEmail
]=useState('')

const[
phone,
setPhone
]=useState('')

const[
street,
setStreet
]=useState('')

const[
city,
setCity
]=useState('')

const[
state,
setState
]=useState('')

const[
zipcode,
setZipcode
]=useState('')

const[
country,
setCountry
]=useState('')

/* ================= TOTAL ================= */

const subtotal=getCartAmount()

const shippingFee=
subtotal===0
?0
:delivery_charges

const tax=subtotal*0.02

const total=
subtotal+
shippingFee+
tax

/* ================= PLACE ORDER ================= */

const placeOrder=async()=>{

try{

if(subtotal===0){

toast.error("Cart is Empty")
return

}

if(

!firstName||
!lastName||
!email||
!phone||
!street||
!city||
!state||
!zipcode||
!country

){

toast.error("Please fill all fields")
return

}

const address={

firstName,
lastName,
email,
phone,
street,
city,
state,
zipcode,
country

}

let orderItems=[]

for(const itemId in cartItems){

for(const size in cartItems[itemId]){

const quantity=
cartItems[itemId][size]

if(quantity>0){

orderItems.push({

product:itemId,
quantity,
size

})

}

}

}

/* ================= COD ================= */

if(method==="cod"){

const{data}=await axios.post(

'/api/order/cod',

{
items:orderItems,
address
}

)

if(data.success){

toast.success(data.message)

setCartItems({})

navigate('/my-orders')

}else{

toast.error(data.message)

}

}

/* ================= STRIPE ================= */

if(method==="stripe"){

const{data}=await axios.post(

'/api/order/stripe',

{
items:orderItems,
address
}

)

if(data.success){

window.location.href=data.url

}else{

toast.error(data.message)

}

}

}catch(error){

console.log(error)

toast.error(error.message)

}

}

return(

<>

<div className='w-full min-h-screen bg-[#f8f8f8] pt-10 sm:pt-16 lg:pt-24 overflow-hidden'>

<div className='max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24'>

{/* ================= TOP ================= */}

<div className='mb-10 sm:mb-12'>

<p className='uppercase tracking-[4px] text-gray-500 font-semibold text-xs sm:text-sm mb-3 sm:mb-4'>

Secure Checkout

</p>

<h1 className='text-4xl sm:text-5xl xl:text-[72px] font-black leading-none text-black'>

Delivery

<span className='font-light text-gray-400 ml-2 sm:ml-4 block sm:inline'>

Information

</span>

</h1>

<p className='text-sm sm:text-lg xl:text-[20px] text-gray-500 leading-7 sm:leading-relaxed mt-5 sm:mt-6 max-w-4xl'>

Complete your order securely and enjoy premium shopping experience with fast delivery and trusted payment methods.

</p>

</div>

{/* ================= MAIN ================= */}

<div className='grid xl:grid-cols-[1.7fr_0.7fr] gap-6 lg:gap-10 items-start'>

{/* ================= LEFT ================= */}

<div className='bg-white rounded-[28px] sm:rounded-[40px] border border-gray-200 p-5 sm:p-8 xl:p-10 shadow-sm'>

<h2 className='text-2xl sm:text-[34px] font-black mb-6 sm:mb-8'>

Shipping Details

</h2>

<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>

<input
type='text'
placeholder='First Name'
value={firstName}
onChange={(e)=>setFirstName(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

<input
type='text'
placeholder='Last Name'
value={lastName}
onChange={(e)=>setLastName(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

</div>

<div className='space-y-5'>

<input
type='email'
placeholder='Email Address'
value={email}
onChange={(e)=>setEmail(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

<input
type='text'
placeholder='Phone Number'
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

<input
type='text'
placeholder='Street Address'
value={street}
onChange={(e)=>setStreet(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

</div>

<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

<input
type='text'
placeholder='City'
value={city}
onChange={(e)=>setCity(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

<input
type='text'
placeholder='State'
value={state}
onChange={(e)=>setState(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

</div>

<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

<input
type='text'
placeholder='Zip Code'
value={zipcode}
onChange={(e)=>setZipcode(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

<input
type='text'
placeholder='Country'
value={country}
onChange={(e)=>setCountry(e.target.value)}
className='w-full bg-[#fafafa] border border-gray-200 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'
/>

</div>

</div>

{/* ================= RIGHT ================= */}

<div className='xl:sticky xl:top-28'>

<div className='bg-white rounded-[28px] sm:rounded-[40px] border border-gray-200 p-5 sm:p-8 shadow-sm'>

<h2 className='text-2xl sm:text-[34px] font-black leading-none mb-6 sm:mb-8'>

Order Summary

</h2>

{/* PAYMENT */}

<div className='mb-8'>

<h3 className='text-lg sm:text-[22px] font-bold mb-4'>

Payment Method

</h3>

<div className='space-y-4'>

<button

onClick={()=>setMethod('cod')}

className={`w-full flex items-center justify-between rounded-2xl border px-4 sm:px-5 py-4 sm:py-5 transition-all duration-300 ${
method==='cod'
?'bg-black text-white border-black shadow-xl'
:'bg-[#fafafa] border-gray-200 hover:border-black'
}`}

>

<div className='flex items-center gap-4'>

<FaMoneyBillWave className='text-lg sm:text-xl'/>

<div className='text-left'>

<h4 className='font-bold text-sm sm:text-[16px]'>

Cash On Delivery

</h4>

<p className={`text-xs sm:text-sm ${
method==='cod'
?'text-gray-300'
:'text-gray-500'
}`}>

Pay after receiving order

</p>

</div>

</div>

</button>

<button

onClick={()=>setMethod('stripe')}

className={`w-full flex items-center justify-between rounded-2xl border px-4 sm:px-5 py-4 sm:py-5 transition-all duration-300 ${
method==='stripe'
?'bg-[#635BFF] text-white border-[#635BFF] shadow-xl'
:'bg-[#fafafa] border-gray-200 hover:border-[#635BFF]'
}`}

>

<div className='flex items-center gap-4'>

<FaStripe className='text-xl sm:text-2xl'/>

<div className='text-left'>

<h4 className='font-bold text-sm sm:text-[16px]'>

Stripe Payment

</h4>

<p className={`text-xs sm:text-sm ${
method==='stripe'
?'text-gray-200'
:'text-gray-500'
}`}>

Secure online card payment

</p>

</div>

</div>

</button>

</div>

</div>

<hr className='mb-8'/>

<div className='space-y-5'>

<div className='flex items-center justify-between'>

<p className='text-sm sm:text-[18px] font-semibold'>

Subtotal

</p>

<p className='text-sm sm:text-[18px] font-bold text-gray-500'>

{currency}{subtotal.toFixed(2)}

</p>

</div>

<div className='flex items-center justify-between'>

<p className='text-sm sm:text-[18px] font-semibold'>

Shipping Fee

</p>

<p className='text-sm sm:text-[18px] font-bold text-gray-500'>

{currency}{shippingFee.toFixed(2)}

</p>

</div>

<div className='flex items-center justify-between'>

<p className='text-sm sm:text-[18px] font-semibold'>

Tax (2%)

</p>

<p className='text-sm sm:text-[18px] font-bold text-gray-500'>

{currency}{tax.toFixed(2)}

</p>

</div>

<div className='flex items-center justify-between pt-4 border-t border-gray-200'>

<h3 className='text-2xl sm:text-[28px] font-black'>

Total

</h3>

<h3 className='text-3xl sm:text-[34px] font-black text-black'>

{currency}{total.toFixed(2)}

</h3>

</div>

</div>

<button

onClick={placeOrder}

className={`w-full mt-8 py-4 sm:py-5 rounded-2xl text-base sm:text-[18px] font-bold transition-all duration-300 shadow-xl hover:scale-[1.01] ${
method==='stripe'
?'bg-[#635BFF] hover:bg-[#554df7] text-white'
:'bg-black hover:bg-[#111] text-white'
}`}

>

{
method==='stripe'
?'Proceed To Stripe Checkout'
:'Place Order'
}

</button>

</div>

</div>

</div>

</div>
</div>



</>
)

}




export default PlaceOrder