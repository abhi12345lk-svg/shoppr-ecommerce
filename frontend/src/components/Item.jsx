// ======================= ITEM.JSX =======================

import React,{
useContext,
useState
} from 'react'

import {
ShopContext
} from '../Context/ShopContext'

const Item=({product})=>{

const {
navigate,
addToCart,
currency
}=useContext(ShopContext)

const [
hovered,
setHovered
]=useState(false)

// ================= SAFE IMAGE =================

const productImage=

product?.image?.length>1 && hovered
?product.image[1]
:product?.image?.[0] || '/placeholder.png'

/* ================= DISCOUNT PERCENT ================= */

const discountPercent=

product?.price>0

?Math.round(

(
(product.price-product.offerPrice)
/product.price
)*100

)

:0

return(

<div
className='
overflow-hidden
bg-white
p-3
sm:p-4
rounded-2xl
shadow-sm
hover:shadow-2xl
duration-300
group
border
border-transparent
hover:border-gray-200
'
>

{/* ================= IMAGE ================= */}

<div

onClick={()=>{

navigate(
`/collection/${product?.category?.toLowerCase()}/${product?._id}`
)

scrollTo(0,0)

}}

onMouseEnter={()=>setHovered(true)}

onMouseLeave={()=>setHovered(false)}

className='
relative
bg-[#f5f5f5]
overflow-hidden
cursor-pointer
rounded-2xl
'
>

{/* ================= DISCOUNT BADGE ================= */}

{

discountPercent>0&&(

<div
className='
absolute
top-3
left-3
z-10
bg-red-500
text-white
text-[10px]
sm:text-xs
font-bold
px-3
py-1
rounded-full
shadow-lg
'
>

{discountPercent}% OFF

</div>

)

}

<img

src={productImage}

alt={product?.name || 'product'}

className='
w-full
h-56
sm:h-64
md:h-72
object-contain
group-hover:scale-105
duration-500
p-2
'

/>

</div>

{/* ================= INFO ================= */}

<div className='pt-4'>

{/* NAME */}

<h4
className='
text-[14px]
sm:text-[16px]
font-black
uppercase
line-clamp-1
leading-tight
'
>

{product?.name}

</h4>

{/* DESCRIPTION */}

<p
className='
text-gray-500
text-xs
sm:text-sm
line-clamp-2
mt-2
leading-6
min-h-[40px]
'
>

{product?.description}

</p>

{/* ================= BOTTOM ================= */}

<div className='flex items-end justify-between mt-5 gap-3'>

{/* CATEGORY */}

<div>

<p
className='
font-bold
text-gray-500
text-[11px]
sm:text-[13px]
uppercase
tracking-wide
'
>

{product?.category}

</p>

{/* PRICE */}

<div className='mt-2'>

<p
className='
text-gray-400
line-through
text-xs
sm:text-sm
'
>

{currency}{product?.price}

</p>

<p
className='
font-black
text-lg
sm:text-xl
text-black
'
>

{currency}{product?.offerPrice}

</p>

</div>

</div>

{/* ================= BUTTON ================= */}

<button

onClick={()=>
addToCart(
product?._id,
product?.sizes?.[0]
)
}

className='
shrink-0
border
border-black
bg-black
text-white
px-3
sm:px-4
h-10
sm:h-11
text-xs
sm:text-sm
font-bold
hover:bg-white
hover:text-black
duration-300
rounded-xl
shadow-lg
'

>

Add

</button>

</div>

</div>

</div>

)

}

export default Item