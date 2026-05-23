/* ======================= CONTACTMESSAGES.JSX ======================= */

import React,{
useContext,
useEffect,
useState
}from 'react'

import {
ShopContext
} from '../../Context/ShopContext'

import {
toast
} from 'react-toastify'

import {
FaEnvelope,
FaTrash,
FaUser
} from 'react-icons/fa'

const ContactMessages=()=>{

const{
axios
}=useContext(ShopContext)

const[
messages,
setMessages
]=useState([])

/* ================= FETCH MESSAGES ================= */

const fetchMessages=async()=>{

try{

const{data}=await axios.get(
'/api/contact/list'
)

if(data.success){

setMessages(data.messages)

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

/* ================= UPDATE STATUS ================= */

const updateStatus=async(
messageId,
status
)=>{

try{

const{data}=await axios.post(

'/api/contact/status',

{
messageId,
status
}

)

if(data.success){

toast.success(data.message)

fetchMessages()

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

/* ================= DELETE MESSAGE ================= */

const deleteMessage=async(messageId)=>{

try{

const confirmDelete=
window.confirm(
"Delete this message?"
)

if(!confirmDelete){

return

}

const{data}=await axios.post(

'/api/contact/delete',

{
messageId
}

)

if(data.success){

toast.success(data.message)

fetchMessages()

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

/* ================= USE EFFECT ================= */

useEffect(()=>{

fetchMessages()

},[])

return(

<div className='w-full min-h-screen bg-[#f8f8f8] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 overflow-hidden'>

<div className='max-w-7xl mx-auto'>

{/* ================= TOP ================= */}

<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8 sm:mb-10'>

<div>

<p className='uppercase tracking-[4px] sm:tracking-[5px] text-gray-500 text-xs sm:text-sm font-bold mb-3'>

Admin Dashboard

</p>

<h1 className='text-4xl sm:text-5xl font-black text-black leading-none'>

Customer
<span className='text-gray-400 font-light ml-2 sm:ml-3'>
Messages
</span>

</h1>

<p className='text-gray-600 mt-4 text-sm sm:text-base lg:text-lg max-w-2xl leading-7 sm:leading-relaxed'>

Manage customer support queries, complaints, and ecommerce contact requests professionally.

</p>

</div>

<div className='bg-black text-white rounded-3xl px-5 sm:px-7 py-4 sm:py-5 shadow-xl w-fit'>

<h3 className='text-2xl sm:text-3xl font-black'>

{messages.length}

</h3>

<p className='text-gray-300 text-xs sm:text-sm mt-1'>

Total Messages

</p>

</div>

</div>

{/* ================= EMPTY ================= */}

{

messages.length===0&&(

<div className='bg-white rounded-[28px] sm:rounded-[35px] p-8 sm:p-14 text-center border border-gray-200'>

<h2 className='text-2xl sm:text-3xl font-black'>

No Messages Found

</h2>

<p className='text-gray-500 mt-4 text-sm sm:text-lg leading-7'>

No customer queries available right now.

</p>

</div>

)

}

{/* ================= MESSAGE LIST ================= */}

<div className='flex flex-col gap-5 sm:gap-8'>

{

messages.map((item,index)=>(

<div

key={index}

className='bg-white border border-gray-200 rounded-[28px] sm:rounded-[35px] overflow-hidden shadow-sm'

>

{/* ================= TOP ================= */}

<div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 p-5 sm:p-8 border-b border-gray-100'>

<div className='min-w-0'>

<p className='text-gray-400 uppercase tracking-[3px] text-xs sm:text-sm font-bold mb-2'>

Message ID

</p>

<h2 className='text-sm sm:text-xl font-black break-all'>

{item._id}

</h2>

</div>

<div className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold w-fit ${
item.status==="Resolved"
?'bg-green-100 text-green-700'
:item.status==="In Progress"
?'bg-yellow-100 text-yellow-700'
:'bg-red-100 text-red-600'
}`}>

{item.status}

</div>

</div>

{/* ================= CONTENT ================= */}

<div className='p-5 sm:p-8 grid lg:grid-cols-2 gap-6 sm:gap-8'>

{/* LEFT */}

<div className='min-w-0'>

<div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-6'>

<div className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black text-white flex items-center justify-center text-lg sm:text-xl shrink-0'>

<FaUser/>

</div>

<div className='min-w-0'>

<h3 className='text-xl sm:text-2xl font-black break-words'>

{item.name}

</h3>

<p className='text-gray-500 text-sm sm:text-base break-all'>

{item.email}

</p>

</div>

</div>

<div className='space-y-4'>

<p className='text-gray-700 text-sm sm:text-lg break-words leading-7'>

<span className='font-black text-black'>

Phone :

</span>

{" "}
{item.phone}

</p>

<p className='text-gray-700 text-sm sm:text-lg break-words leading-7'>

<span className='font-black text-black'>

Subject :

</span>

{" "}
{item.subject}

</p>

<p className='text-gray-700 leading-7 sm:leading-8 text-sm sm:text-lg break-words'>

<span className='font-black text-black'>

Message :

</span>

<br/>

{item.message}

</p>

</div>

</div>

{/* RIGHT */}

<div className='flex flex-col justify-between gap-6 sm:gap-8'>

<div>

<p className='uppercase tracking-[3px] text-gray-400 text-xs sm:text-sm font-bold mb-3'>

Update Status

</p>

<select

value={item.status}

onChange={(e)=>
updateStatus(
item._id,
e.target.value
)
}

className='w-full h-12 sm:h-14 rounded-2xl border border-gray-200 px-4 sm:px-5 text-sm sm:text-base outline-none focus:border-black'

>

<option value='Pending'>

Pending

</option>

<option value='In Progress'>

In Progress

</option>

<option value='Resolved'>

Resolved

</option>

</select>

</div>

<div>

<p className='text-gray-500 mb-3 text-sm sm:text-base'>

Received On

</p>

<h3 className='text-lg sm:text-xl font-black break-words'>

{
new Date(
item.createdAt
).toLocaleDateString()
}

</h3>

</div>

<button

onClick={()=>
deleteMessage(item._id)
}

className='w-full sm:w-fit bg-red-50 hover:bg-red-100 text-red-500 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 text-sm sm:text-base active:scale-95'

>

<FaTrash/>

Delete Message

</button>

</div>

</div>

</div>

))

}

</div>

</div>

</div>

)

}

export default ContactMessages