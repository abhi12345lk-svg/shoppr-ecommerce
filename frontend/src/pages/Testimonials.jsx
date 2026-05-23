import React from 'react'

import {
FaStar,
FaQuoteLeft
} from 'react-icons/fa'

import {
FiArrowRight
} from 'react-icons/fi'

import user1 from '../assets/testimonials/user1.jpg'
import user2 from '../assets/testimonials/user2.jpg'
import user3 from '../assets/testimonials/user3.jpg'

const Testimonial=()=>{

const testimonials=[

{
name:"Donald Jackman",

role:"Fashion Enthusiast",

date:"22 Jan 2025",

message:
"Absolutely loved the premium quality and fast delivery. The packaging felt luxurious and the products looked even better in real life.",

image:user1,
},

{
name:"Michael Lee",

role:"Verified Buyer",

date:"10 Mar 2025",

message:
"Fantastic shopping experience overall. Smooth ordering process, responsive support team, and excellent product finishing.",

image:user2,
},

{
name:"Sarah Thomas",

role:"Style Creator",

date:"14 Feb 2025",

message:
"This store completely exceeded my expectations. The collection is trendy, premium, and feels just like top ecommerce brands.",

image:user3,
},

]

return(

<section className='w-full min-h-screen bg-[#f8f8f8] pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden relative'>

{/* ================= BG EFFECTS ================= */}

<div className='absolute top-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-black/5 rounded-full blur-3xl'></div>

<div className='absolute bottom-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-black/5 rounded-full blur-3xl'></div>

<div className='max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10'>

{/* ================= HERO ================= */}

<div className='relative bg-white border border-gray-200 rounded-[28px] sm:rounded-[50px] overflow-hidden p-5 sm:p-8 lg:p-14 2xl:p-20 mb-16 sm:mb-24 shadow-sm'>

{/* BG EFFECTS */}

<div className='absolute -top-20 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-black/5 rounded-full blur-3xl'></div>

<div className='absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-black/5 rounded-full blur-3xl'></div>

<div className='relative z-10 grid 2xl:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center'>

{/* ================= LEFT CONTENT ================= */}

<div>

{/* TAG */}

<div className='inline-flex flex-wrap items-center gap-3 bg-black text-white rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8 shadow-lg'>

<div className='flex gap-1'>

{

[...Array(5)].map((_,i)=>(

<FaStar
key={i}
className='text-[#ff532e] text-xs sm:text-sm'
/>

))

}

</div>

<p className='text-xs sm:text-sm font-semibold tracking-[1px] sm:tracking-[2px]'>

Trusted By 12,000+ Customers

</p>

</div>

{/* HEADING */}

<h1 className='text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-[92px] font-black leading-[1]'>

Real Stories <br/>

<span className='text-gray-400 font-light'>

From Real Customers

</span>

</h1>

{/* PARA */}

<p className='text-gray-500 text-sm sm:text-lg 2xl:text-2xl leading-7 sm:leading-10 max-w-5xl mt-6 sm:mt-10'>

Discover how SHOPPR is transforming online shopping
with premium collections, trusted quality, lightning-fast delivery,
and a modern ecommerce experience customers genuinely love.

</p>

{/* FEATURES */}

<div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-8 sm:mt-12'>

<div className='bg-[#f8f8f8] border border-gray-200 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 hover:shadow-lg transition-all duration-300'>

<h3 className='text-3xl sm:text-4xl font-black'>

4.9★

</h3>

<p className='text-gray-500 mt-3 leading-7 text-sm sm:text-lg'>

Average customer rating
across all products

</p>

</div>

<div className='bg-black text-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300'>

<h3 className='text-3xl sm:text-4xl font-black'>

12K+

</h3>

<p className='text-gray-300 mt-3 leading-7 text-sm sm:text-lg'>

Happy customers
worldwide

</p>

</div>

<div className='bg-[#f8f8f8] border border-gray-200 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 hover:shadow-lg transition-all duration-300'>

<h3 className='text-3xl sm:text-4xl font-black'>

98%

</h3>

<p className='text-gray-500 mt-3 leading-7 text-sm sm:text-lg'>

Customers recommend
SHOPPR to friends

</p>

</div>

</div>

{/* CTA */}

<div className='flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-5 mt-10 sm:mt-12'>

<button

className='bg-black hover:bg-[#111] text-white rounded-[20px] sm:rounded-[22px] px-7 sm:px-10 py-4 sm:py-5 font-bold text-sm sm:text-lg shadow-2xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-4 w-full sm:w-fit'

>

Start Shopping

<FiArrowRight className='text-xl sm:text-2xl'/>

</button>

<div className='flex items-center gap-4'>

<div className='flex -space-x-3 sm:-space-x-4'>

<img
src={user1}
alt=''
className='w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover shadow-md'
/>

<img
src={user2}
alt=''
className='w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover shadow-md'
/>

<img
src={user3}
alt=''
className='w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover shadow-md'
/>

</div>

<p className='text-gray-600 text-sm sm:text-lg font-medium leading-6 sm:leading-7'>

Loved by thousands
of fashion shoppers

</p>

</div>

</div>

</div>

{/* ================= RIGHT SIDE ================= */}

<div className='relative hidden 2xl:flex justify-end'>

<div className='relative w-full max-w-[520px] h-[620px]'>

{/* CARD 1 */}

<div className='absolute top-0 left-0 bg-white border border-gray-200 rounded-[36px] p-8 shadow-xl w-[340px] hover:-translate-y-2 transition-all duration-500'>

<div className='flex items-center gap-4 mb-6'>

<img

src={user1}

alt=''

className='w-16 h-16 rounded-full object-cover'

/>

<div>

<h4 className='text-xl font-bold'>

Donald Jackman

</h4>

<p className='text-gray-500'>

Verified Buyer

</p>

</div>

</div>

<p className='text-gray-600 text-lg leading-9'>

\"Absolutely loved the premium quality and luxurious packaging.\"

</p>

</div>

{/* CARD 2 */}

<div className='absolute top-[180px] right-0 bg-black text-white rounded-[36px] p-8 shadow-2xl w-[360px] hover:-translate-y-2 transition-all duration-500 z-10'>

<div className='flex items-center gap-4 mb-6'>

<img

src={user2}

alt=''

className='w-16 h-16 rounded-full object-cover border-2 border-white'

/>

<div>

<h4 className='text-xl font-bold'>

Michael Lee

</h4>

<p className='text-gray-300'>

Fashion Enthusiast

</p>

</div>

</div>

<p className='text-gray-300 text-lg leading-9'>

\"SHOPPR feels like a premium global ecommerce brand experience.\"

</p>

</div>

{/* CARD 3 */}

<div className='absolute bottom-0 left-10 bg-white border border-gray-200 rounded-[36px] p-8 shadow-xl w-[320px] hover:-translate-y-2 transition-all duration-500'>

<div className='flex items-center gap-4 mb-6'>

<img

src={user3}

alt=''

className='w-16 h-16 rounded-full object-cover'

/>

<div>

<h4 className='text-xl font-bold'>

Sarah Thomas

</h4>

<p className='text-gray-500'>

Style Creator

</p>

</div>

</div>

<p className='text-gray-600 text-lg leading-9'>

\"Fast delivery, stylish products, and excellent customer support.\"

</p>

</div>

</div>

</div>

</div>

</div>

{/* ================= TESTIMONIAL GRID ================= */}

<div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-8'>

{

testimonials.map((testimonial,index)=>(

<div

key={index}

className='group relative bg-white border border-gray-200 rounded-[28px] sm:rounded-[40px] p-5 sm:p-8 2xl:p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden'

>

{/* BG EFFECT */}

<div className='absolute top-0 right-0 w-[200px] sm:w-[250px] h-[200px] sm:h-[250px] bg-black/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500'></div>

{/* TOP */}

<div className='flex items-center justify-between relative z-10'>

<div className='flex gap-1'>

{

[...Array(5)].map((_,i)=>(

<FaStar
key={i}
className='text-[#ff532e] text-base sm:text-lg'
/>

))

}

</div>

<div className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f8f8f8] flex items-center justify-center'>

<FaQuoteLeft className='text-black text-base sm:text-lg'/>

</div>

</div>

{/* MESSAGE */}

<p className='text-gray-600 text-sm sm:text-[17px] leading-7 sm:leading-9 mt-6 sm:mt-10 relative z-10 min-h-auto sm:min-h-[180px]'>

\"{testimonial.message}\"

</p>

{/* USER */}

<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-8 sm:mt-10 relative z-10'>

<div className='flex items-center gap-4 sm:gap-5'>

<img

src={testimonial.image}

alt={testimonial.name}

className='w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-lg'

/>

<div>

<h4 className='text-lg sm:text-xl font-bold text-black'>

{testimonial.name}

</h4>

<p className='text-gray-500 mt-1 text-sm sm:text-base'>

{testimonial.role}

</p>

</div>

</div>

<div>

<p className='text-gray-400 font-medium text-sm sm:text-base'>

{testimonial.date}

</p>

</div>

</div>

</div>

))

}

</div>

{/* ================= LARGE CTA ================= */}

<div className='mt-16 sm:mt-24 bg-black rounded-[28px] sm:rounded-[50px] overflow-hidden relative px-5 sm:px-8 lg:px-16 2xl:px-24 py-10 sm:py-16 lg:py-20 shadow-2xl'>

<div className='absolute top-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-white/10 rounded-full blur-3xl'></div>

<div className='absolute bottom-0 left-0 w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] bg-white/5 rounded-full blur-3xl'></div>

<div className='relative z-10 flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between gap-10 sm:gap-14'>

<div>

<p className='uppercase tracking-[3px] sm:tracking-[5px] text-gray-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-5'>

Join SHOPPR Community

</p>

<h2 className='text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black leading-[1.1] text-white max-w-5xl'>

Experience Premium
Fashion Shopping
Like Never Before

</h2>

<p className='text-gray-300 text-sm sm:text-xl leading-7 sm:leading-9 max-w-4xl mt-6 sm:mt-8'>

Join thousands of satisfied customers who trust SHOPPR
for quality products, premium collections, secure payments,
and fast worldwide delivery.

</p>

</div>

<button

className='bg-white hover:bg-[#f5f5f5] text-black rounded-[20px] sm:rounded-[24px] px-7 sm:px-10 py-4 sm:py-6 font-bold text-sm sm:text-lg flex items-center justify-center gap-4 w-full sm:w-fit shadow-2xl hover:scale-[1.03] transition-all duration-300'

>

Start Shopping

<FiArrowRight className='text-xl sm:text-2xl'/>

</button>

</div>

</div>

</div>

</section>

)

}

export default Testimonial