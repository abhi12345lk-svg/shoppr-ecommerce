/* ======================= ADDPRODUCT.JSX ======================= */

import React,{
useContext,
useState
}from 'react'

import{
FaCloudUploadAlt
}from 'react-icons/fa'

import{
toast
}from 'react-toastify'

import{
ShopContext
}from '../../Context/ShopContext'

const AddProduct=()=>{

const[
files,
setFiles
]=useState([])

const[
name,
setName
]=useState('')

const[
description,
setDescription
]=useState('')

const[
price,
setPrice
]=useState('')

const[
offerPrice,
setOfferPrice
]=useState('')

const[
category,
setCategory
]=useState('Men')

const[
popular,
setPopular
]=useState(false)

const[
sizes,
setSizes
]=useState([])

const[
loading,
setLoading
]=useState(false)

const{
axios
}=useContext(ShopContext)

/* ================= SUBMIT ================= */

const onSubmitHandler=async(event)=>{

event.preventDefault()

try{

setLoading(true)

const productData={

name,
description,
category,

price:Number(price),

offerPrice:Number(offerPrice),

sizes,
popular

}

const formData=new FormData()

formData.append(
'productData',
JSON.stringify(productData)
)

for(let i=0;i<files.length;i++){

if(files[i]){

formData.append(
'images',
files[i]
)

}

}

const{data}=await axios.post(
'/api/product/add',
formData
)

if(data.success){

toast.success(data.message)

setName('')
setDescription('')
setPrice('')
setOfferPrice('')
setCategory('Men')
setPopular(false)
setSizes([])
setFiles([])

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}finally{

setLoading(false)

}

}

/* ================= SIZE HANDLER ================= */

const sizeHandler=(size)=>{

setSizes((prev)=>

prev.includes(size)

?prev.filter((item)=>item!==size)

:[...prev,size]

)

}

return(

<div className='w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f5f5f5] to-[#eef2ff] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 relative overflow-hidden'>

{/* ================= BACKGROUND DESIGN ================= */}

<div className='absolute top-0 left-0 w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] bg-purple-200/30 blur-3xl rounded-full'></div>

<div className='absolute bottom-0 right-0 w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] bg-blue-200/30 blur-3xl rounded-full'></div>

<div className='absolute top-[40%] left-[45%] w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] bg-pink-200/20 blur-3xl rounded-full'></div>

<div className='max-w-7xl mx-auto relative z-10'>

{/* ================= TOP ================= */}

<div className='mb-8 sm:mb-10'>

<p className='uppercase tracking-[4px] sm:tracking-[5px] text-gray-500 text-xs sm:text-sm font-bold mb-3'>

Admin Dashboard

</p>

<h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-none'>

Add
<span className='text-gray-400 font-light ml-2 sm:ml-3'>
Product
</span>

</h1>

<p className='text-gray-600 mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg max-w-2xl leading-7 sm:leading-relaxed'>

Create stylish premium products with modern ecommerce dashboard experience.

</p>

</div>

{/* ================= FORM ================= */}

<form

onSubmit={onSubmitHandler}

className='backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_10px_50px_rgba(0,0,0,0.08)] rounded-[28px] sm:rounded-[40px] overflow-hidden'

>

<div className='grid lg:grid-cols-[1.1fr_0.9fr]'>

{/* ================= LEFT ================= */}

<div className='p-5 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col gap-6 sm:gap-7'>

{/* PRODUCT NAME */}

<div>

<label className='text-xs sm:text-sm font-bold uppercase tracking-[2px] text-gray-500 block mb-3'>

Product Name

</label>

<input

type='text'

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder='Enter premium product name'

className='w-full h-12 sm:h-14 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md px-4 sm:px-5 text-sm sm:text-[15px] outline-none focus:border-black focus:shadow-lg transition-all duration-300'

required

/>

</div>

{/* DESCRIPTION */}

<div>

<label className='text-xs sm:text-sm font-bold uppercase tracking-[2px] text-gray-500 block mb-3'>

Product Description

</label>

<textarea

rows={6}

value={description}

onChange={(e)=>setDescription(e.target.value)}

placeholder='Write product description...'

className='w-full rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md px-4 sm:px-5 py-4 text-sm sm:text-[15px] outline-none resize-none focus:border-black focus:shadow-lg transition-all duration-300'

required

/>

</div>

{/* CATEGORY */}

<div>

<label className='text-xs sm:text-sm font-bold uppercase tracking-[2px] text-gray-500 block mb-3'>

Category

</label>

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className='w-full h-12 sm:h-14 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md px-4 sm:px-5 text-sm sm:text-[15px] outline-none focus:border-black focus:shadow-lg transition-all duration-300'

>

<option value='Men'>Men</option>
<option value='Women'>Women</option>
<option value='Kids'>Kids</option>
<option value='Footwear'>Footwear</option>
<option value='Winterwear'>Winterwear</option>

</select>

</div>

{/* SIZES */}

<div>

<label className='text-xs sm:text-sm font-bold uppercase tracking-[2px] text-gray-500 block mb-4'>

Available Sizes

</label>

<div className='flex flex-wrap gap-2 sm:gap-3'>

{

['S','M','L','XL','XXL'].map((size)=>(

<button

type='button'

key={size}

onClick={()=>sizeHandler(size)}

className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border ${
sizes.includes(size)
?'bg-black text-white border-black shadow-xl scale-105'
:'bg-white/80 text-gray-700 border-gray-200 hover:border-black hover:scale-105'
}`}

>

{size}

</button>

))

}

</div>

</div>

{/* POPULAR */}

<div className='flex items-start sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2'>

<input

type='checkbox'

checked={popular}

onChange={()=>setPopular(!popular)}

className='w-4 h-4 sm:w-5 sm:h-5 accent-black cursor-pointer mt-1 sm:mt-0'

/>

<p className='text-sm sm:text-[15px] font-semibold text-gray-700 leading-6'>

Mark as Trending Product

</p>

</div>

</div>

{/* ================= RIGHT ================= */}

<div className='p-5 sm:p-8 lg:p-10 bg-white/40 backdrop-blur-xl flex flex-col gap-6 sm:gap-7'>

{/* PRICE */}

<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

<div>

<label className='text-xs sm:text-sm font-bold uppercase tracking-[2px] text-gray-500 block mb-3'>

Price

</label>

<input

type='number'

value={price}

onChange={(e)=>setPrice(e.target.value)}

placeholder='0'

className='w-full h-12 sm:h-14 rounded-2xl border border-gray-200 bg-white/80 px-4 sm:px-5 text-sm sm:text-[15px] outline-none focus:border-black focus:shadow-lg transition-all duration-300'

required

/>

</div>

<div>

<label className='text-xs sm:text-sm font-bold uppercase tracking-[2px] text-gray-500 block mb-3'>

Offer Price

</label>

<input

type='number'

value={offerPrice}

onChange={(e)=>setOfferPrice(e.target.value)}

placeholder='0'

className='w-full h-12 sm:h-14 rounded-2xl border border-gray-200 bg-white/80 px-4 sm:px-5 text-sm sm:text-[15px] outline-none focus:border-black focus:shadow-lg transition-all duration-300'

required

/>

</div>

</div>

{/* IMAGE UPLOAD */}

<div>

<label className='text-xs sm:text-sm font-bold uppercase tracking-[2px] text-gray-500 block mb-4'>

Upload Product Images

</label>

<div className='grid grid-cols-2 gap-3 sm:gap-4'>

{

Array(4).fill('').map((_,index)=>(

<label

key={index}

htmlFor={`image${index}`}

className='aspect-square rounded-[22px] sm:rounded-3xl border-2 border-dashed border-gray-300 bg-white/80 hover:border-black hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer group'

>

<input

type='file'

id={`image${index}`}

hidden

onChange={(e)=>{

const updatedFiles=[...files]

updatedFiles[index]=e.target.files[0]

setFiles(updatedFiles)

}}

 />

{

files[index]

?<img

src={URL.createObjectURL(files[index])}

alt='preview'

className='w-full h-full object-cover'

/>

:

<div className='flex flex-col items-center text-center px-2'>

<FaCloudUploadAlt className='text-3xl sm:text-5xl text-gray-400 group-hover:text-black duration-300'/>

<p className='text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 font-medium leading-5'>

Upload Image

</p>

</div>

}

</label>

))

}

</div>

</div>

{/* BUTTON */}

<button

type='submit'

disabled={loading}

className='w-full h-12 sm:h-14 rounded-2xl bg-black hover:bg-[#111] shadow-2xl text-white text-sm sm:text-[15px] font-bold tracking-wide transition-all duration-300 mt-auto hover:scale-[1.01] disabled:opacity-60'

>

{
loading
?'Uploading Product...'
:'Add Product'
}

</button>

</div>

</div>

</form>

</div>

</div>

)

}

export default AddProduct