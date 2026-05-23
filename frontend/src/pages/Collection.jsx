// ======================= COLLECTION.JSX =======================

import React,{
useContext,
useEffect,
useState
} from 'react'

import Title from '../components/Title'
import Item from '../components/Item'

import {
ShopContext
} from '../Context/ShopContext'

const Collection=()=>{

const{
products,
searchQuery,
currency
}=useContext(ShopContext)

const[
filteredProducts,
setFilteredProducts
]=useState([])

const[
category,
setCategory
]=useState([])

const[
sortType,
setSortType
]=useState('relevant')

const[
currPage,
setCurrPage
]=useState(1)

const[
priceRange,
setPriceRange
]=useState('all')

const[
inStockOnly,
setInStockOnly
]=useState(false)

const[
showFilters,
setShowFilters
]=useState(false)

const itemsPerPage=8

// ================= DYNAMIC CATEGORY =================

const categories=[
...new Set(
products.map(
(item)=>item.category
)
)
]

// ================= TOGGLE CATEGORY =================

const toggleCategory=(value)=>{

if(category.includes(value)){

setCategory(

prev=>

prev.filter(
item=>item!==value
)

)

}else{

setCategory(prev=>[
...prev,
value
])

}

}

// ================= FILTER PRODUCTS =================

useEffect(()=>{

let productsCopy=[...products]

// ================= SEARCH =================

if(searchQuery?.length>0){

productsCopy=productsCopy.filter(

item=>

item?.name
?.toLowerCase()
.includes(
searchQuery.toLowerCase()
)

)

}

// ================= CATEGORY =================

if(category.length>0){

productsCopy=productsCopy.filter(

item=>

category.includes(
item.category
)

)

}

// ================= PRICE FILTER =================

switch(priceRange){

case 'under500':

productsCopy=productsCopy.filter(
item=>item.offerPrice<500
)

break

case '500to1000':

productsCopy=productsCopy.filter(
item=>
item.offerPrice>=500 &&
item.offerPrice<=1000
)

break

case '1000to5000':

productsCopy=productsCopy.filter(
item=>
item.offerPrice>=1000 &&
item.offerPrice<=5000
)

break

case 'above5000':

productsCopy=productsCopy.filter(
item=>item.offerPrice>5000
)

break

default:
break

}

// ================= STOCK =================

if(inStockOnly){

productsCopy=productsCopy.filter(
item=>item.inStock
)

}

// ================= SORT =================

switch(sortType){

case 'low-high':

productsCopy.sort(
(a,b)=>
a.offerPrice-b.offerPrice
)

break

case 'high-low':

productsCopy.sort(
(a,b)=>
b.offerPrice-a.offerPrice
)

break

case 'a-z':

productsCopy.sort(
(a,b)=>
a.name.localeCompare(b.name)
)

break

case 'z-a':

productsCopy.sort(
(a,b)=>
b.name.localeCompare(a.name)
)

break

default:
break

}

setFilteredProducts(productsCopy)

setCurrPage(1)

},[
products,
category,
sortType,
searchQuery,
priceRange,
inStockOnly
])

// ================= PAGINATION =================

const totalPages=Math.ceil(

filteredProducts.length/
itemsPerPage

)

const startIndex=
(currPage-1)*itemsPerPage

const endIndex=
startIndex+itemsPerPage

const currentProducts=
filteredProducts.slice(
startIndex,
endIndex
)

return(

<section className='w-full bg-[#f8f8f8] min-h-screen pt-6 sm:pt-10 pb-16 overflow-hidden'>

<div className='w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24'>

{/* ================= TOP ================= */}

<div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10 sm:mb-12'>

<div>

<Title
title1={'All'}
title2={'Collections'}
titleStyles={'pb-3'}
/>

<p className='text-gray-500 text-sm sm:text-base lg:text-lg max-w-3xl leading-7'>

Explore premium fashion collections crafted
for modern lifestyle and comfort.

</p>

</div>

<div className='bg-black text-white px-5 sm:px-6 py-4 rounded-2xl w-fit shadow-lg'>

<p className='text-xs sm:text-sm uppercase tracking-[3px] text-gray-300'>

Total Products

</p>

<h3 className='text-2xl sm:text-3xl font-bold mt-1'>

{filteredProducts.length}

</h3>

</div>

</div>

{/* ================= MOBILE FILTER BUTTON ================= */}

<div className='lg:hidden mb-6'>

<button

onClick={()=>
setShowFilters(!showFilters)
}

className='w-full h-14 rounded-2xl bg-black text-white font-bold shadow-lg'

>

{
showFilters
?'Hide Filters'
:'Show Filters'
}

</button>

</div>

{/* ================= MAIN ================= */}

<div className='grid lg:grid-cols-[300px_1fr] gap-6 lg:gap-10'>

{/* ================= SIDEBAR ================= */}

<div
className={`${
showFilters
?'block'
:'hidden'
} lg:block`}
>

<div className='bg-white rounded-[28px] sm:rounded-[32px] border border-gray-200 p-5 sm:p-7 lg:sticky lg:top-28 shadow-sm'>

{/* TOP */}

<div className='flex items-center justify-between mb-8 sm:mb-10'>

<div>

<h3 className='text-2xl sm:text-3xl font-black leading-none'>

Filters

</h3>

<p className='text-gray-500 text-sm mt-2'>

Refine your products

</p>

</div>

<button

onClick={()=>{

setCategory([])
setSortType('relevant')
setPriceRange('all')
setInStockOnly(false)

}}

className='text-sm font-semibold text-red-500 hover:underline'

>

Clear

</button>

</div>

{/* ================= CATEGORY ================= */}

<div className='mb-8 sm:mb-10'>

<h4 className='text-lg font-bold mb-5'>

Categories

</h4>

<div className='space-y-3'>

{

categories.map((item,index)=>(

<label

key={index}

className={`flex items-center justify-between px-4 sm:px-5 py-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
category.includes(item)
?'bg-black text-white border-black shadow-lg'
:'bg-[#f8f8f8] border-gray-200 hover:border-black'
}`}

>

<div className='flex items-center gap-3'>

<input

type='checkbox'

checked={category.includes(item)}

onChange={()=>toggleCategory(item)}

className='w-4 h-4 accent-black'

/>

<span className='text-sm sm:text-[16px] font-semibold'>

{item}

</span>

</div>

</label>

))

}

</div>

</div>

{/* ================= PRICE ================= */}

<div className='mb-8 sm:mb-10'>

<h4 className='text-lg font-bold mb-5'>

Price Range

</h4>

<div className='space-y-3'>

{

[
{
value:'under500',
label:`Under ${currency}500`
},
{
value:'500to1000',
label:`${currency}500 - ${currency}1000`
},
{
value:'1000to5000',
label:`${currency}1000 - ${currency}5000`
},
{
value:'above5000',
label:`Above ${currency}5000`
}
].map((item,index)=>(

<button

key={index}

onClick={()=>setPriceRange(item.value)}

className={`w-full text-left px-4 sm:px-5 py-4 rounded-2xl transition-all duration-300 font-medium border text-sm sm:text-base ${
priceRange===item.value
?'bg-black text-white border-black'
:'bg-[#f8f8f8] border-gray-200 hover:border-black'
}`}

>

{item.label}

</button>

))

}

</div>

</div>

{/* ================= STOCK ================= */}

<div className='mb-8 sm:mb-10'>

<h4 className='text-lg font-bold mb-5'>

Availability

</h4>

<label className='flex items-center justify-between bg-[#f8f8f8] border border-gray-200 px-4 sm:px-5 py-4 rounded-2xl cursor-pointer hover:border-black transition-all duration-300'>

<div className='flex items-center gap-3'>

<input

type='checkbox'

checked={inStockOnly}

onChange={()=>
setInStockOnly(
prev=>!prev
)
}

className='w-4 h-4 accent-black'

/>

<span className='text-sm sm:text-[16px] font-semibold'>

In Stock Only

</span>

</div>

</label>

</div>

{/* ================= SORT ================= */}

<div>

<h4 className='text-lg font-bold mb-5'>

Sort By

</h4>

<select

value={sortType}

onChange={(e)=>
setSortType(e.target.value)
}

className='w-full bg-[#f8f8f8] border border-gray-200 rounded-2xl px-4 sm:px-5 py-4 text-sm sm:text-[16px] outline-none focus:border-black'

>

<option value='relevant'>
Most Relevant
</option>

<option value='low-high'>
Price : Low to High
</option>

<option value='high-low'>
Price : High to Low
</option>

<option value='a-z'>
Name : A to Z
</option>

<option value='z-a'>
Name : Z to A
</option>

</select>

</div>

</div>

</div>

{/* ================= PRODUCTS ================= */}

<div>

{

currentProducts.length>0

?(

<>

<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6'>

{

currentProducts.map((product)=>(

<Item
key={product._id}
product={product}
/>

))

}

</div>

{/* ================= PAGINATION ================= */}

{

totalPages>1&&(

<div className='flex items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-14 flex-wrap'>

<button

disabled={currPage===1}

onClick={()=>
setCurrPage(prev=>prev-1)
}

className='px-4 sm:px-5 py-3 border rounded-2xl bg-white hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-40 text-sm sm:text-base'

>

Prev

</button>

{

Array.from({
length:totalPages
}).map((_,index)=>(

<button

key={index}

onClick={()=>
setCurrPage(index+1)
}

className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border font-semibold transition-all duration-300 text-sm sm:text-base ${
currPage===index+1
?'bg-black text-white border-black'
:'bg-white text-black hover:bg-black hover:text-white'
}`}

>

{index+1}

</button>

))

}

<button

disabled={currPage===totalPages}

onClick={()=>
setCurrPage(prev=>prev+1)
}

className='px-4 sm:px-5 py-3 border rounded-2xl bg-white hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-40 text-sm sm:text-base'

>

Next

</button>

</div>

)

}

</>

)

:(

<div className='flex flex-col items-center justify-center h-[320px] sm:h-[400px] bg-white rounded-[28px] sm:rounded-[32px] border border-gray-200 text-center px-5'>

<h4 className='text-2xl sm:text-3xl font-bold text-black'>

No Products Found

</h4>

<p className='text-gray-500 mt-3 text-sm sm:text-base leading-7'>

Try changing filters or search query

</p>

</div>

)

}

</div>

</div>

</div>

</section>

)

}

export default Collection