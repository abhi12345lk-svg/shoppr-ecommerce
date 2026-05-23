import React from 'react'

import {
LiaShippingFastSolid
} from "react-icons/lia"

import {
MdCurrencyExchange
} from "react-icons/md"

import {
BiSupport
} from "react-icons/bi"

import {
TbPackageImport
} from "react-icons/tb"

const Features=()=>{

const features=[

{
icon:<LiaShippingFastSolid/>,
title:"Free Shipping",
text:"On all orders above $100"
},

{
icon:<MdCurrencyExchange/>,
title:"Money Guarantee",
text:"30 Days money back"
},

{
icon:<BiSupport/>,
title:"24/7 Support",
text:"Dedicated customer support"
},

{
icon:<TbPackageImport/>,
title:"Easy Returns",
text:"Hassle free returns"
}

]

return(

<section
className='
py-14
sm:py-16
lg:py-20
bg-white
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

<div
className='
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
sm:gap-6
lg:gap-8
'
>

{

features.map((item,index)=>(

<div

key={index}

className='
group
flex
items-start
gap-5
bg-[#fafafa]
hover:bg-black
border
border-gray-200
rounded-[28px]
p-6
sm:p-7
duration-500
hover:shadow-2xl
'

>

{/* ================= ICON ================= */}

<div
className='
text-4xl
sm:text-5xl
text-black
group-hover:text-white
duration-500
shrink-0
'
>

{item.icon}

</div>

{/* ================= CONTENT ================= */}

<div className='overflow-hidden'>

<h5
className='
text-lg
sm:text-[20px]
font-black
mb-2
group-hover:text-white
duration-500
'
>

{item.title}

</h5>

<p
className='
text-gray-500
group-hover:text-gray-300
duration-500
text-sm
sm:text-[15px]
leading-7
'
>

{item.text}

</p>

</div>

</div>

))

}

</div>

</div>

</section>

)

}

export default Features