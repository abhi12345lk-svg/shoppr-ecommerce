import React,{
useContext,
useEffect,
useState
} from 'react'

import {
useParams
} from 'react-router-dom'

import {
ShopContext
} from '../Context/ShopContext'

import Item from '../components/Item'

import Title from '../components/Title'

const CategoryCollection=()=>{

const {
products
}=useContext(ShopContext)

const {
category
}=useParams()

const [
filteredProducts,
setFilteredProducts
]=useState([])

useEffect(()=>{

if(category && products?.length>0){

const filtered=products.filter(

(item)=>

item?.category
?.toLowerCase()===
category?.toLowerCase()

)

setFilteredProducts(filtered)

}

},[category,products])

return(

<section
className='
max-w-screen-3xl
mx-auto
px-4
sm:px-6
lg:px-10
xl:px-12
py-16
sm:py-20
lg:py-28
overflow-hidden
'
>

{/* ================= TITLE ================= */}

<div className='mb-10 sm:mb-12'>

<Title
title1={category}
title2={"Collection"}
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

Explore premium products from the
{` ${category} `}
collection designed for modern style and comfort.

</p>

</div>

{/* ================= PRODUCT GRID ================= */}

{

filteredProducts.length>0

?(

<div
className='
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
xl:grid-cols-4
2xl:grid-cols-5
gap-5
sm:gap-6
'
>

{

filteredProducts.map((product)=>(

<Item
key={product._id}
product={product}
/>

))

}

</div>

)

:(

<div
className='
flex
flex-col
items-center
justify-center
bg-white
border
border-gray-200
rounded-[30px]
h-[280px]
sm:h-[350px]
text-center
px-5
shadow-sm
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

No Products Found

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

No products available in this category right now.
Please check back later.

</p>

</div>

)

}

</section>

)

}

export default CategoryCollection