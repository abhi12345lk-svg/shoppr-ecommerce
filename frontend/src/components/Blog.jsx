import React from 'react'

import Title from './Title'

import {
blogs
} from '../assets/data'

const Blog=()=>{

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
title1={"Our Expert"}
title2={"Blog"}
titleStyles={"pb-4 sm:pb-6"}
para={"Stay ahead of fashion trends with styling tips, product reviews, and expert advice helping you shop smarter and dress better."}
/>

</div>

{/* ================= BLOG GRID ================= */}

<div
className='
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-4
gap-5
sm:gap-6
'
>

{

blogs.map((blog,index)=>(

<div

key={index}

className='
relative
group
overflow-hidden
rounded-[28px]
bg-white
shadow-sm
hover:shadow-2xl
duration-500
border
border-transparent
hover:border-gray-200
'

>

{/* ================= IMAGE ================= */}

<div className='overflow-hidden relative'>

<img

src={blog.image}

alt={blog.title}

className='
w-full
h-[320px]
sm:h-[360px]
lg:h-[420px]
object-cover
group-hover:scale-110
duration-700
'

/>

{/* OVERLAY */}

<div
className='
absolute
inset-0
bg-gradient-to-t
from-black/80
via-black/20
to-transparent
'
/>

</div>

{/* ================= CONTENT ================= */}

<div
className='
absolute
bottom-0
left-0
w-full
p-5
sm:p-6
text-white
'
>

{/* CATEGORY */}

<div
className='
inline-flex
items-center
justify-center
bg-white/20
backdrop-blur-md
px-4
py-1.5
rounded-full
text-[10px]
sm:text-xs
font-bold
tracking-wide
uppercase
mb-4
'
>

{blog.category}

</div>

{/* TITLE */}

<h3
className='
text-lg
sm:text-[22px]
font-black
leading-snug
line-clamp-2
'
>

{blog.title}

</h3>

{/* BUTTON */}

<button
className='
mt-5
bg-white
text-black
px-5
sm:px-6
h-11
sm:h-12
rounded-full
text-xs
sm:text-sm
font-bold
hover:bg-black
hover:text-white
border
border-white
duration-300
shadow-xl
'
>

Continue Reading

</button>

</div>

</div>

))

}

</div>

</section>

)

}

export default Blog