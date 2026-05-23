import React,{
useContext,
useEffect,
useState
}from 'react'

import {
TbStarFilled,
TbStarHalfFilled,
TbShoppingBagPlus,
TbHeart,
TbTruckDelivery
}from 'react-icons/tb'

import {
useParams
}from 'react-router-dom'

import {
ShopContext
}from '../Context/ShopContext'

const ProductDetails=()=>{

const{

products,
currency,
addToCart

}=useContext(ShopContext)

const{id}=useParams()

const product=products.find(
(item)=>item._id===id
)

const[
image,
setImage
]=useState(null)

const[
size,
setSize
]=useState('')

useEffect(()=>{

if(product){

setImage(product.image[0])

}

},[product])

if(!product){

return(

<div className='min-h-screen flex items-center justify-center text-xl sm:text-2xl font-semibold px-5 text-center'>

Product Not Found

</div>

)

}

return(

<section className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16 sm:py-20 lg:py-28 overflow-hidden'>

<div className='grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-14'>

{/* ================= LEFT ================= */}

<div className='flex flex-col lg:flex-row gap-4'>

{/* THUMBNAILS */}

<div className='flex lg:flex-col gap-3 overflow-x-auto scrollbar-hide order-2 lg:order-1 pb-2 lg:pb-0'>

{

product.image.map((item,index)=>(

<div

key={index}

onClick={()=>setImage(item)}

className={`min-w-[80px] h-[80px] sm:min-w-24 sm:h-24 lg:w-28 lg:h-28 border-2 rounded-xl overflow-hidden cursor-pointer bg-gray-100 duration-300 flex-shrink-0 ${
image===item
?'border-black'
:'border-gray-200 hover:border-gray-400'
}`}

>

<img

src={item}

alt='product'

className='w-full h-full object-cover'

/>

</div>

))

}

</div>

{/* MAIN IMAGE */}

<div className='flex-1 bg-gray-100 rounded-2xl overflow-hidden order-1 lg:order-2'>

<img

src={image}

alt='product'

className='w-full h-[350px] sm:h-[500px] xl:h-[700px] object-contain hover:scale-105 duration-500'

/>

</div>

</div>

{/* ================= RIGHT ================= */}

<div className='overflow-hidden'>

<h1 className='text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight break-words'>

{product.name}

</h1>

{/* ================= RATING ================= */}

<div className='flex flex-wrap items-center gap-3 sm:gap-4 mt-5'>

<div className='flex items-center gap-1 text-[#ff532e]'>

<TbStarFilled size={20}/>
<TbStarFilled size={20}/>
<TbStarFilled size={20}/>
<TbStarFilled size={20}/>
<TbStarHalfFilled size={20}/>

</div>

<p className='text-gray-500 text-sm sm:text-lg'>

(22 Reviews)

</p>

</div>

{/* ================= PRICE ================= */}

<div className='flex flex-wrap items-center gap-4 sm:gap-5 mt-7'>

<h2 className='text-3xl sm:text-4xl xl:text-5xl font-bold'>

{currency}{product.offerPrice}.00

</h2>

<h3 className='text-xl sm:text-2xl text-gray-400 line-through'>

{currency}{product.price}.00

</h3>

</div>

{/* ================= DESCRIPTION ================= */}

<p className='text-gray-500 leading-7 sm:leading-8 text-sm sm:text-base lg:text-lg mt-7 max-w-2xl'>

{product.description}

</p>

{/* ================= SIZE ================= */}

<div className='mt-10'>

<h4 className='text-lg sm:text-xl font-semibold mb-5'>

Select Size

</h4>

<div className='flex flex-wrap gap-3 sm:gap-4'>

{

[...product.sizes]

.sort((a,b)=>{

const order=['S','M','L','XL','XXL']

return order.indexOf(a)-order.indexOf(b)

})

.map((item,index)=>(

<button

key={index}

onClick={()=>setSize(item)}

className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl border text-sm sm:text-lg font-semibold duration-300 ${
item===size
?'bg-black text-white border-black'
:'bg-white text-black border-gray-300 hover:border-black'
}`}

>

{item}

</button>

))

}

</div>

</div>

{/* ================= BUTTONS ================= */}

<div className='flex flex-wrap items-center gap-4 mt-10 sm:mt-12'>

<button

onClick={async()=>{

await addToCart(
product._id,
size
)

}}

className='flex-1 sm:flex-none flex items-center justify-center gap-3 bg-black text-white px-6 sm:px-8 lg:px-10 h-14 rounded-xl text-sm sm:text-base lg:text-lg font-semibold hover:bg-gray-800 duration-300 min-w-[220px]'

>

Add To Cart

<TbShoppingBagPlus size={24}/>

</button>

<button

className='w-14 h-14 lg:w-16 lg:h-16 rounded-xl border border-gray-300 flex items-center justify-center text-2xl hover:bg-black hover:text-white hover:border-black duration-300'

>

<TbHeart/>

</button>

</div>

{/* ================= DELIVERY ================= */}

<div className='flex flex-col sm:flex-row sm:items-center gap-5 bg-gray-100 p-5 sm:p-6 lg:p-7 mt-10 sm:mt-12 rounded-2xl'>

<TbTruckDelivery size={52}/>

<div>

<h4 className='text-lg lg:text-xl font-bold'>

Free Delivery

</h4>

<p className='text-gray-500 mt-1 text-sm sm:text-base leading-7'>

Free shipping on all orders above {currency}100

</p>

</div>

</div>

</div>

</div>

</section>

)

}

export default ProductDetails