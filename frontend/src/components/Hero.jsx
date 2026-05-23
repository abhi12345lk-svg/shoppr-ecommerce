/* ======================= HERO.JSX ======================= */

import React from 'react'

import {Link} from 'react-router-dom'

import bgImg from '../assets/bg2.jpg'

const Hero=()=>{

return(

<section

className='
relative
w-full
min-h-[90vh]
sm:min-h-screen
bg-cover
bg-center
bg-no-repeat
flex
items-center
overflow-hidden
'

style={{

backgroundImage:`url(${bgImg})`

}}

>

{/* ================= OVERLAY ================= */}

<div
className='
absolute
inset-0
bg-black/20
'
/>

{/* ================= CONTENT ================= */}

<div
className='
relative
z-10
max-w-screen-2xl
mx-auto
px-4
sm:px-6
lg:px-10
xl:px-16
2xl:px-24
w-full
'
>

<div
className='
max-w-4xl
py-24
sm:py-28
md:py-32
'
>

{/* ================= TOP TEXT ================= */}

<h3

className='
text-xl
sm:text-3xl
md:text-4xl
lg:text-5xl
text-white
mb-4
sm:mb-5
leading-snug
drop-shadow-xl
'

style={{

fontFamily:"'Pacifico',cursive"

}}

>

Fresh Fits for Frosty Days

</h3>

{/* ================= OFFER ================= */}

<h2
className='
uppercase
text-sm
sm:text-lg
md:text-xl
lg:text-2xl
tracking-[0.15rem]
sm:tracking-[0.25rem]
font-semibold
mb-3
sm:mb-5
text-white
drop-shadow-lg
leading-relaxed
'
>

Get More for Less - 40% Off!

</h2>

{/* ================= MAIN HEADING ================= */}

<h1
className='
text-[42px]
xs:text-[52px]
sm:text-6xl
md:text-7xl
lg:text-8xl
xl:text-9xl
font-black
leading-[0.95]
mb-6
sm:mb-8
text-white
drop-shadow-2xl
max-w-5xl
'
>

on Coats & Jackets

</h1>

{/* ================= PRICE ================= */}

<div
className='
flex
items-center
gap-3
sm:gap-5
flex-wrap
'
>

<h3
className='
text-lg
sm:text-2xl
md:text-3xl
lg:text-5xl
font-semibold
text-white
drop-shadow-lg
'
>

Starting at

</h3>

<span
className='
bg-white
px-4
sm:px-5
py-2
rotate-2
shadow-2xl
rounded-md
flex
items-start
'
>

<span
className='
text-lg
sm:text-xl
relative
top-1
'
>

$

</span>

<span
className='
text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl
font-black
leading-none
mx-1
'
>

99

</span>

<span
className='
text-lg
sm:text-2xl
self-end
mb-1
'
>

.99

</span>

</span>

</div>

{/* ================= BUTTON ================= */}

<Link

to='/collection'

className='
inline-flex
items-center
justify-center
mt-10
sm:mt-12
bg-black
text-white
w-full
xs:w-[220px]
sm:w-56
h-12
sm:h-14
md:h-16
text-base
sm:text-xl
md:text-2xl
font-bold
hover:bg-gray-800
duration-300
rounded-full
shadow-2xl
hover:scale-[1.03]
transition-all
'

>

Shop Now

</Link>

</div>

</div>

</section>

)

}

export default Hero