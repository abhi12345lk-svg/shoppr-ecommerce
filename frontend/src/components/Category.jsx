import React,{
useContext
} from 'react'

import Title from './Title'

import {
categories
} from '../assets/data'

import {
ShopContext
} from '../Context/ShopContext'

const Categories=()=>{

const {
navigate
}=useContext(ShopContext)

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

<div className='mb-10 sm:mb-14'>

<Title
title1={"Category"}
title2={"List"}
titleStyles={"pb-4 sm:pb-6"}
paraStyles={"hidden"}
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

Browse premium fashion categories crafted for every season,
style and occasion.

</p>

</div>

{/* ================= CATEGORIES ================= */}

<div
className='
grid
grid-cols-2
sm:grid-cols-3
lg:grid-cols-4
xl:grid-cols-6
gap-5
sm:gap-7
'
>

{

categories.map((cat,index)=>(

<div

key={index}

onClick={()=>
navigate(
`/collection/${cat.name.toLowerCase()}`
)
}

className='
group
flex
flex-col
items-center
cursor-pointer
'

>

{/* ================= IMAGE BOX ================= */}

<div
className='
relative
w-full
aspect-square
bg-[#f5f5f5]
rounded-3xl
overflow-hidden
shadow-sm
group-hover:shadow-2xl
duration-500
border
border-transparent
group-hover:border-gray-200
'
>

{/* OVERLAY */}

<div
className='
absolute
inset-0
bg-black/0
group-hover:bg-black/5
duration-500
z-10
'
/>

<img

src={cat.image}

alt={cat.name}

className='
w-full
h-full
object-cover
group-hover:scale-110
duration-700
'

/>

</div>

{/* ================= NAME ================= */}

<h5
className='
text-sm
sm:text-lg
lg:text-xl
font-black
uppercase
mt-4
sm:mt-5
tracking-wide
text-center
line-clamp-1
'
>

{cat.name}

</h5>

{/* ================= SUBTEXT ================= */}

<p
className='
text-xs
sm:text-sm
text-gray-500
mt-1
text-center
'
>

Explore Collection

</p>

</div>

))

}

</div>

</section>

)

}

export default Categories