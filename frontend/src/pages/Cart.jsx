import React,{useContext,useEffect,useState}from'react'
import{ShopContext}from'../Context/ShopContext'

import Title from'../components/Title'
import CartTotal from'../components/CartTotal'

import{FaMinus,FaPlus}from'react-icons/fa6'
import{IoClose}from'react-icons/io5'

import Footer from'../components/Footer'

const Cart=()=>{

const{
navigate,
products,
currency,
cartItems,
updateQuantity
}=useContext(ShopContext)

const[cartData,setCartData]=useState([])

useEffect(()=>{

if(products.length>0){

const tempData=[]

for(const itemId in cartItems){

for(const size in cartItems[itemId]){

if(cartItems[itemId][size]>0){

tempData.push({

_id:itemId,

size:size,

quantity:cartItems[itemId][size]

})

}

}

}

setCartData(tempData)

}

},[cartItems,products])

/* ================= INCREMENT ================= */

const increment=async(id,size)=>{

const currQuantity=cartItems[id][size]

await updateQuantity(
id,
size,
currQuantity+1
)

}

/* ================= DECREMENT ================= */

const decrement=async(id,size)=>{

const currQuantity=cartItems[id][size]

if(currQuantity>1){

await updateQuantity(
id,
size,
currQuantity-1
)

}

}

return products.length>0&&cartItems?(

<>

<div className='bg-[#f8f8f8] min-h-screen pt-6 pb-20'>

<div className='w-full px-8 xl:px-16 2xl:px-24'>

{/* ================= HEADING ================= */}

<div className='mb-10'>

<h1 className='text-4xl font-black text-black'>

Shopping
<span className='font-light text-gray-500'>
Cart
</span>

</h1>

<p className='text-gray-500 mt-3 text-lg max-w-2xl'>

Review your selected products before proceeding to checkout.

</p>

</div>

<div className='grid xl:grid-cols-[1.8fr_0.8fr] gap-10'>

{/* ================= LEFT SIDE ================= */}

<div>

{/* ================= TABLE HEADER ================= */}

<div className='hidden md:grid grid-cols-[2fr_120px_160px_120px_80px] bg-white rounded-2xl px-6 py-5 mb-5 shadow-sm border border-gray-100 text-sm font-bold text-gray-600 uppercase tracking-wide'>

<p>
Product
</p>

<p className='text-center'>
Price
</p>

<p className='text-center'>
Quantity
</p>

<p className='text-center'>
Total
</p>

<p className='text-center'>
Remove
</p>

</div>

{/* ================= CART ITEMS ================= */}

<div className='flex flex-col gap-5'>

{

cartData.map((item,i)=>{

const product=
products.find(
(p)=>p._id===item._id
)

if(!product)return null

const quantity=
cartItems[item._id][item.size]

return(

<div

key={i}

className='bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300'

>

<div className='grid md:grid-cols-[2fr_120px_160px_120px_80px] gap-6 items-center'>

{/* ================= PRODUCT ================= */}

<div className='flex items-center gap-5'>

<div className='bg-[#f7f7f7] rounded-2xl p-3'>

<img

src={product.image[0]}

alt='product'

className='w-24 h-24 object-contain'

/>

</div>

<div>

<h3 className='text-lg font-bold text-black leading-tight mb-2'>

{product.name}

</h3>

<div className='flex items-center gap-3 text-sm text-gray-500'>

<span className='bg-gray-100 px-3 py-1 rounded-full font-medium'>

Size : {item.size}

</span>

</div>

</div>

</div>

{/* ================= PRICE ================= */}

<div className='text-center'>

<p className='text-lg font-bold text-black'>

{currency}{product.offerPrice}

</p>

</div>

{/* ================= QUANTITY ================= */}

<div className='flex justify-center'>

<div className='flex items-center bg-[#f8f8f8] rounded-full p-1 border border-gray-200'>

<button

onClick={()=>decrement(item._id,item.size)}

className='w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition'

>

<FaMinus className='text-xs'/>

</button>

<span className='w-12 text-center font-bold text-lg'>

{quantity}

</span>

<button

onClick={()=>increment(item._id,item.size)}

className='w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition'

>

<FaPlus className='text-xs'/>

</button>

</div>

</div>

{/* ================= TOTAL ================= */}

<div className='text-center'>

<p className='text-xl font-extrabold text-black'>

{currency}
{product.offerPrice*quantity}

</p>

</div>

{/* ================= REMOVE ================= */}

<div className='flex justify-center'>

<button

onClick={async()=>{

await updateQuantity(
item._id,
item.size,
0
)

}}

className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition'

>

<IoClose className='text-xl'/>

</button>

</div>

</div>

</div>

)

})

}

</div>

</div>

{/* ================= RIGHT SIDE ================= */}

<div>

<div className='sticky top-28'>

<CartTotal/>

<button

onClick={()=>navigate('/collection')}

className='w-full mt-5 border border-black text-black py-4 rounded-2xl font-bold hover:bg-black hover:text-white transition-all duration-300'

>

Continue Shopping

</button>

</div>

</div>

</div>

</div>

</div>



</>

):null

}

export default Cart 