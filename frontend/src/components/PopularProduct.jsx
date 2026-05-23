import React,{
useContext,
useEffect,
useState
} from 'react'

import {
Swiper,
SwiperSlide
} from 'swiper/react'

import 'swiper/css'

import {
Autoplay
} from 'swiper/modules'

import {
ShopContext
} from '../Context/ShopContext'

import Title from './Title'

import Item from './Item'

const PopularProducts=()=>{

const {
products=[]
}=useContext(ShopContext)

const[
popularProducts,
setPopularProducts
]=useState([])

useEffect(()=>{

const data=products.filter(

(item)=>item.popular

)

setPopularProducts(data.slice(0,10))

},[products])

return(

<section
className='
max-w-screen-2xl
mx-auto
px-4
sm:px-6
lg:px-10
xl:px-12
py-16
sm:py-20
overflow-hidden
'
>

{/* ================= TITLE ================= */}

<div className='mb-10 sm:mb-12'>

<Title
title1={"Popular"}
title2={"Products"}
titleStyles={"pb-4 sm:pb-6"}
/>

<p
className='
text-sm
sm:text-base
lg:text-lg
text-gray-500
max-w-2xl
leading-7
'
>

Discover our trending premium fashion products loved by
customers worldwide.

</p>

</div>

{/* ================= SWIPER ================= */}

<Swiper

loop={popularProducts.length>5}

autoplay={{

delay:3500,
disableOnInteraction:false,

}}

breakpoints={{

320:{
slidesPerView:1.2,
spaceBetween:14,
},

480:{
slidesPerView:1.5,
spaceBetween:16,
},

640:{
slidesPerView:2,
spaceBetween:18,
},

900:{
slidesPerView:3,
spaceBetween:20,
},

1200:{
slidesPerView:4,
spaceBetween:22,
},

1536:{
slidesPerView:5,
spaceBetween:24,
},

}}

modules={[Autoplay]}

className='!overflow-visible'

>

{

popularProducts.map((product)=>(

<SwiperSlide
key={product._id}
className='pb-4'
>

<Item product={product}/>

</SwiperSlide>

))

}

</Swiper>

{/* ================= EMPTY ================= */}

{

popularProducts.length===0&&(

<div
className='
bg-white
border
border-gray-200
rounded-[30px]
h-[280px]
sm:h-[340px]
flex
flex-col
items-center
justify-center
text-center
mt-6
shadow-sm
px-5
'
>

<h3
className='
text-2xl
sm:text-3xl
font-black
text-black
'
>

No Popular Products

</h3>

<p
className='
text-gray-500
mt-3
text-sm
sm:text-base
leading-7
max-w-md
'
>

Popular products will appear here once marked as trending
from the admin dashboard.

</p>

</div>

)

}

</section>

)

}

export default PopularProducts