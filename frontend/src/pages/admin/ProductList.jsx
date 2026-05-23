/* ======================= PRODUCTLIST.JSX ======================= */

import React,{
useContext,
useEffect
}from 'react'

import{
toast
}from 'react-toastify'

import{
ShopContext
}from '../../Context/ShopContext'

import{
FaBoxOpen,
FaTrash
}from 'react-icons/fa'

const ProductList=()=>{

const{
products,
currency,
fetchProducts,
axios
}=useContext(ShopContext)

/* ================= STOCK TOGGLE ================= */

const toggleStock=async(productId,inStock)=>{

try{

const{data}=await axios.post(
'/api/product/stock',
{
productId,
inStock
}
)

if(data.success){

fetchProducts()

toast.success(data.message)

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

/* ================= DELETE PRODUCT ================= */

const deleteProduct=async(productId)=>{

try{

const confirmDelete=
window.confirm(
"Are you sure you want to delete this product?"
)

if(!confirmDelete){

return

}

const{data}=await axios.post(

'/api/product/delete',

{
productId
}

)

if(data.success){

toast.success(data.message)

fetchProducts()

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

/* ================= FETCH PRODUCTS ================= */

useEffect(()=>{

fetchProducts()

},[])

return(

<div className='w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 relative overflow-hidden'>

{/* ================= BACKGROUND ================= */}

<div className='absolute top-0 left-0 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] bg-blue-200/30 blur-3xl rounded-full'></div>

<div className='absolute bottom-0 right-0 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] bg-purple-200/30 blur-3xl rounded-full'></div>

<div className='relative z-10 max-w-7xl mx-auto'>

{/* ================= TOP ================= */}

<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8 sm:mb-10'>

<div>

<p className='uppercase tracking-[4px] sm:tracking-[5px] text-gray-500 text-xs sm:text-sm font-bold mb-3'>

Admin Dashboard

</p>

<h1 className='text-4xl sm:text-5xl font-black text-black leading-none'>

Product
<span className='text-gray-400 font-light ml-2 sm:ml-3'>
List
</span>

</h1>

<p className='text-gray-600 mt-4 text-sm sm:text-base lg:text-lg max-w-2xl leading-7 sm:leading-relaxed'>

Manage all your ecommerce products, stock availability and pricing from one place.

</p>

</div>

<div className='bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl px-5 sm:px-6 py-4 sm:py-5 shadow-lg flex items-center gap-4 w-fit'>

<div className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black text-white flex items-center justify-center text-xl sm:text-2xl'>

<FaBoxOpen/>

</div>

<div>

<h4 className='text-2xl sm:text-3xl font-black text-black'>

{products?.length}

</h4>

<p className='text-gray-500 text-xs sm:text-sm font-medium'>

Total Products

</p>

</div>

</div>

</div>

{/* ================= DESKTOP TABLE ================= */}

<div className='hidden lg:block backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_10px_50px_rgba(0,0,0,0.08)] rounded-[35px] overflow-hidden'>

{/* HEADER */}

<div className='grid grid-cols-[0.7fr_2.5fr_1fr_1fr_1fr_0.7fr] items-center px-8 py-5 border-b border-gray-100 bg-white/40 text-sm font-bold uppercase tracking-wide text-gray-500'>

<p>Image</p>

<p>Product</p>

<p>Category</p>

<p>Price</p>

<p>Stock</p>

<p>Delete</p>

</div>

{/* PRODUCTS */}

<div className='flex flex-col'>

{

products?.map((product,index)=>(

<div

key={index}

className='grid grid-cols-[0.7fr_2.5fr_1fr_1fr_1fr_0.7fr] items-center px-8 py-5 border-b border-gray-100 hover:bg-white/40 transition-all duration-300'

>

{/* IMAGE */}

<div>

<img

src={product.image[0]}

alt='productImg'

className='w-16 h-16 object-cover rounded-2xl border border-gray-200 shadow-sm bg-white'

/>

</div>

{/* PRODUCT */}

<div>

<h3 className='text-[16px] font-bold text-black leading-tight'>

{product.name}

</h3>

<p className='text-sm text-gray-500 mt-1 line-clamp-1'>

Premium Ecommerce Product

</p>

</div>

{/* CATEGORY */}

<div>

<span className='px-4 py-2 rounded-full bg-black text-white text-xs font-semibold tracking-wide'>

{product.category}

</span>

</div>

{/* PRICE */}

<div>

<h4 className='text-lg font-black text-black'>

{currency}{product.offerPrice}

</h4>

{

product.price&&(

<p className='text-sm text-gray-400 line-through mt-1'>

{currency}{product.price}

</p>

)

}

</div>

{/* STOCK */}

<div>

<label className='relative inline-flex items-center cursor-pointer'>

<input

type='checkbox'

className='sr-only peer'

checked={product.inStock}

onChange={()=>toggleStock(
product._id,
!product.inStock
)}

 />

<div className='w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-black transition-all duration-300'></div>

<div className='absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md'></div>

</label>

</div>

{/* DELETE */}

<div>

<button

onClick={()=>
deleteProduct(product._id)
}

className='w-12 h-12 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110'

>

<FaTrash/>

</button>

</div>

</div>

))

}

</div>

</div>

{/* ================= MOBILE CARDS ================= */}

<div className='lg:hidden flex flex-col gap-5'>

{

products?.map((product,index)=>(

<div

key={index}

className='bg-white/80 backdrop-blur-xl border border-white/60 rounded-[28px] p-4 shadow-lg'

>

<div className='flex gap-4'>

<img

src={product.image[0]}

alt='productImg'

className='w-24 h-24 object-cover rounded-2xl border border-gray-200 bg-white shrink-0'

/>

<div className='flex-1 min-w-0'>

<h3 className='text-[16px] font-bold text-black line-clamp-2'>

{product.name}

</h3>

<p className='text-sm text-gray-500 mt-1'>

{product.category}

</p>

<div className='mt-3'>

<h4 className='text-lg font-black text-black'>

{currency}{product.offerPrice}

</h4>

{

product.price&&(

<p className='text-sm text-gray-400 line-through'>

{currency}{product.price}

</p>

)

}

</div>

</div>

</div>

{/* ACTIONS */}

<div className='flex items-center justify-between mt-5 pt-5 border-t border-gray-200'>

{/* STOCK */}

<div>

<p className='text-xs uppercase font-bold tracking-wide text-gray-500 mb-2'>

Stock

</p>

<label className='relative inline-flex items-center cursor-pointer'>

<input

type='checkbox'

className='sr-only peer'

checked={product.inStock}

onChange={()=>toggleStock(
product._id,
!product.inStock
)}

 />

<div className='w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-black transition-all duration-300'></div>

<div className='absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:translate-x-5 shadow-md'></div>

</label>

</div>

{/* DELETE */}

<button

onClick={()=>
deleteProduct(product._id)
}

className='w-12 h-12 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all duration-300 active:scale-95'

>

<FaTrash/>

</button>

</div>

</div>

))

}

</div>

</div>

</div>

)

}

export default ProductList