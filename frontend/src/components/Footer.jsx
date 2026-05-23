import React from 'react'

import {
Link
} from 'react-router-dom'

import {
FaInstagram,
FaFacebookF,
FaYoutube,
FaXTwitter
} from 'react-icons/fa6'

const Footer=()=>{

return(

<footer
className='
bg-[#f5f5f5]
pt-14
sm:pt-16
lg:pt-20
border-t
border-gray-200
overflow-hidden
'
>

<div
className='
max-w-screen-2xl
mx-auto
px-4
sm:px-6
lg:px-10
xl:px-12
'
>

{/* ================= TOP ================= */}

<div
className='
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-[2.5fr_1fr_1fr_1fr]
gap-10
sm:gap-12
lg:gap-16
pb-12
sm:pb-14
'
>

{/* ================= LEFT ================= */}

<div className='max-w-xl'>

<Link

to='/'

className='
inline-block
text-[30px]
sm:text-[36px]
lg:text-[42px]
font-black
tracking-tight
hover:scale-[1.02]
duration-300
break-words
'

>

SHOPPR
<span className='text-gray-500'>.</span>

</Link>

<p
className='
text-gray-500
text-sm
sm:text-base
lg:text-[17px]
leading-7
sm:leading-8
mt-5
sm:mt-6
lg:mt-8
max-w-lg
'
>

Discover stylish clothing and shoes online,
crafted for comfort and quality. Shop fashion-forward
designs that elevate your look and fit every lifestyle.

</p>

{/* NEWSLETTER */}

<div className='mt-8 sm:mt-10'>

<h4
className='
text-lg
sm:text-xl
font-black
mb-4
'
>

Join Our Newsletter

</h4>

<div
className='
flex
flex-col
sm:flex-row
items-stretch
gap-3
'
>

<input

type='email'

placeholder='Enter your email'

className='
flex-1
h-12
sm:h-14
rounded-full
border
border-gray-300
bg-white
px-5
outline-none
text-sm
sm:text-base
focus:border-black
duration-300
min-w-0
'

/>

<button
className='
h-12
sm:h-14
px-6
sm:px-8
rounded-full
bg-black
text-white
font-bold
text-sm
sm:text-base
hover:bg-[#111]
duration-300
shadow-lg
whitespace-nowrap
'
>

Subscribe

</button>

</div>

</div>

{/* SOCIAL ICONS */}

<div className='flex items-center gap-3 sm:gap-4 mt-8'>

<a
href='#'
className='w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm'
>

<FaInstagram/>

</a>

<a
href='#'
className='w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm'
>

<FaXTwitter/>

</a>

<a
href='#'
className='w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm'
>

<FaFacebookF/>

</a>

<a
href='#'
className='w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm'
>

<FaYoutube/>

</a>

</div>

</div>

{/* ================= QUICK LINKS ================= */}

<div>

<h3
className='
text-lg
sm:text-[20px]
font-black
mb-5
sm:mb-8
'
>

Quick Links

</h3>

<ul
className='
flex
flex-col
gap-4
sm:gap-5
text-sm
sm:text-[17px]
text-gray-600
'
>

<li>
<Link
to='/'
className='hover:text-black duration-300'
>
Home
</Link>
</li>

<li>
<Link
to='/collection'
className='hover:text-black duration-300'
>
Best Sellers
</Link>
</li>

<li>
<Link
to='/collection'
className='hover:text-black duration-300'
>
Offers & Deals
</Link>
</li>

<li>
<Link
to='/contact'
className='hover:text-black duration-300'
>
Contact Us
</Link>
</li>

<li>
<Link
to='/'
className='hover:text-black duration-300'
>
FAQs
</Link>
</li>

</ul>

</div>

{/* ================= HELP ================= */}

<div>

<h3
className='
text-lg
sm:text-[20px]
font-black
mb-5
sm:mb-8
'
>

Need Help?

</h3>

<ul
className='
flex
flex-col
gap-4
sm:gap-5
text-sm
sm:text-[17px]
text-gray-600
'
>

<li className='hover:text-black duration-300 cursor-pointer'>
Delivery Information
</li>

<li className='hover:text-black duration-300 cursor-pointer'>
Return & Refund Policy
</li>

<li className='hover:text-black duration-300 cursor-pointer'>
Payment Methods
</li>

<li className='hover:text-black duration-300 cursor-pointer'>
Track your Order
</li>

<li className='hover:text-black duration-300 cursor-pointer'>
Contact Us
</li>

</ul>

</div>

{/* ================= CONTACT ================= */}

<div>

<h3
className='
text-lg
sm:text-[20px]
font-black
mb-5
sm:mb-8
'
>

Contact

</h3>

<div className='flex flex-col gap-5 text-gray-600'>

<div>

<p className='font-semibold text-black mb-1 text-sm sm:text-base'>

Phone

</p>

<p className='text-sm sm:text-[16px] break-words'>

+1 (800) 123-4567

</p>

</div>

<div>

<p className='font-semibold text-black mb-1 text-sm sm:text-base'>

Email

</p>

<p className='text-sm sm:text-[16px] break-all'>

support@shoppr.com

</p>

</div>

<div>

<p className='font-semibold text-black mb-1 text-sm sm:text-base'>

Location

</p>

<p className='text-sm sm:text-[16px] leading-7'>

New York, United States

</p>

</div>

</div>

</div>

</div>

{/* ================= BOTTOM ================= */}

<div
className='
border-t
border-gray-300
py-5
sm:py-6
flex
flex-col
md:flex-row
items-center
justify-between
gap-3
text-gray-500
text-xs
sm:text-sm
lg:text-base
'
>

<p className='text-center md:text-left leading-7'>

Copyright 2025 © SHOPPR.
All Rights Reserved.

</p>

<div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>

<p className='hover:text-black duration-300 cursor-pointer'>

Privacy Policy

</p>

<p className='hover:text-black duration-300 cursor-pointer'>

Terms & Conditions

</p>

<p className='hover:text-black duration-300 cursor-pointer'>

Cookies

</p>

</div>

</div>

</div>

</footer>

)

}

export default Footer