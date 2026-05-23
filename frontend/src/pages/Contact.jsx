import React,{
useContext,
useState
}from 'react'

import {
FaEnvelope,
FaHeadphones,
FaLocationDot,
FaPhone
} from 'react-icons/fa6'

import {
FiArrowUpRight
} from 'react-icons/fi'

import {
toast
} from 'react-toastify'

import {
ShopContext
} from '../Context/ShopContext'

import Title from '../components/Title'

const Contact=()=>{

const{
axios
}=useContext(ShopContext)

/* ================= STATES ================= */

const[
name,
setName
]=useState('')

const[
email,
setEmail
]=useState('')

const[
phone,
setPhone
]=useState('')

const[
subject,
setSubject
]=useState('')

const[
message,
setMessage
]=useState('')

const[
loading,
setLoading
]=useState(false)

/* ================= SUBMIT ================= */

const submitHandler=async(e)=>{

e.preventDefault()

try{

setLoading(true)

const{data}=await axios.post(

'/api/contact/add',

{
name,
email,
phone,
subject,
message
}

)

if(data.success){

toast.success(data.message)

/* CLEAR FORM */

setName('')
setEmail('')
setPhone('')
setSubject('')
setMessage('')

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}finally{

setLoading(false)

}

}

return(

<section className='w-full bg-[#f8f8f8] pt-10 sm:pt-16 pb-16 sm:pb-20 overflow-hidden min-h-screen'>

<div className='max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24'>

{/* ================= HERO ================= */}

<div className='flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 sm:gap-10 mb-12 sm:mb-16'>

<div className='max-w-4xl'>

<p className='uppercase tracking-[4px] sm:tracking-[5px] text-gray-500 font-semibold text-xs sm:text-sm mb-3 sm:mb-4'>

Contact Us

</p>

<Title
title1={"Let's"}
title2={"Connect"}
titleStyles={"pb-4 sm:pb-5"}
/>

<p className='text-gray-500 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-3xl'>

Have questions about products, orders, shipping, or support?
Our team is always ready to help you with premium customer service
and a seamless shopping experience.

</p>

</div>

{/* RIGHT CARD */}

<div className='bg-black text-white rounded-[28px] sm:rounded-[32px] px-6 sm:px-8 py-6 sm:py-7 shadow-2xl w-full xl:w-fit xl:min-w-[320px]'>

<p className='uppercase tracking-[3px] sm:tracking-[4px] text-gray-400 text-xs sm:text-sm mb-3'>

Support Timing

</p>

<h3 className='text-3xl sm:text-4xl font-black'>

24 / 7

</h3>

<p className='text-gray-300 mt-3 leading-7 text-sm sm:text-base'>

Our support team is available everyday
to assist you anytime.

</p>

</div>

</div>

{/* ================= MAIN GRID ================= */}

<div className='grid xl:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-8 lg:gap-10'>

{/* ================= FORM ================= */}

<div className='relative overflow-hidden bg-white border border-gray-200 rounded-[28px] sm:rounded-[40px] p-5 sm:p-8 lg:p-12 shadow-sm'>

<div className='absolute top-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-black/5 rounded-full blur-3xl'></div>

<div className='relative z-10'>

<div className='mb-8 sm:mb-10'>

<h3 className='text-3xl sm:text-4xl lg:text-5xl font-black leading-tight'>

Send Us A Message

</h3>

<p className='text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-2xl'>

Fill out the form below and our team will get back
to you as quickly as possible.

</p>

</div>

<form
onSubmit={submitHandler}
className='space-y-5 sm:space-y-6'
>

{/* NAME + EMAIL */}

<div className='grid md:grid-cols-2 gap-5 sm:gap-6'>

<div>

<label className='block text-xs sm:text-sm font-semibold uppercase tracking-[2px] text-gray-500 mb-3'>

Full Name

</label>

<input

type='text'

value={name}

onChange={(e)=>
setName(e.target.value)
}

placeholder='Enter your full name'

className='w-full h-14 sm:h-16 rounded-2xl border border-gray-200 bg-[#fafafa] px-4 sm:px-5 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'

required

/>

</div>

<div>

<label className='block text-xs sm:text-sm font-semibold uppercase tracking-[2px] text-gray-500 mb-3'>

Email Address

</label>

<input

type='email'

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

placeholder='Enter your email'

className='w-full h-14 sm:h-16 rounded-2xl border border-gray-200 bg-[#fafafa] px-4 sm:px-5 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'

required

/>

</div>

</div>

{/* PHONE */}

<div>

<label className='block text-xs sm:text-sm font-semibold uppercase tracking-[2px] text-gray-500 mb-3'>

Phone Number

</label>

<input

type='text'

value={phone}

onChange={(e)=>
setPhone(e.target.value)
}

placeholder='Enter phone number'

className='w-full h-14 sm:h-16 rounded-2xl border border-gray-200 bg-[#fafafa] px-4 sm:px-5 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'

required

/>

</div>

{/* SUBJECT */}

<div>

<label className='block text-xs sm:text-sm font-semibold uppercase tracking-[2px] text-gray-500 mb-3'>

Subject

</label>

<input

type='text'

value={subject}

onChange={(e)=>
setSubject(e.target.value)
}

placeholder='Enter subject'

className='w-full h-14 sm:h-16 rounded-2xl border border-gray-200 bg-[#fafafa] px-4 sm:px-5 text-sm sm:text-[16px] outline-none focus:border-black transition-all duration-300'

required

/>

</div>

{/* MESSAGE */}

<div>

<label className='block text-xs sm:text-sm font-semibold uppercase tracking-[2px] text-gray-500 mb-3'>

Message

</label>

<textarea

rows='6'

value={message}

onChange={(e)=>
setMessage(e.target.value)
}

placeholder='Write your message here...'

className='w-full rounded-3xl border border-gray-200 bg-[#fafafa] px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-[16px] resize-none outline-none focus:border-black transition-all duration-300'

required

>

</textarea>

</div>

{/* BUTTON */}

<button

type='submit'

disabled={loading}

className='w-full sm:w-fit bg-black hover:bg-[#111] text-white rounded-2xl px-6 sm:px-8 py-4 sm:py-5 font-bold text-sm sm:text-[15px] tracking-wide shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60'

>

{
loading
?'Sending...'
:'Send Message'
}

<FiArrowUpRight className='text-lg sm:text-xl'/>

</button>

</form>

</div>

</div>

{/* ================= CONTACT DETAILS ================= */}

<div className='flex flex-col gap-5 sm:gap-7'>

{

[
{
icon:<FaLocationDot/>,
label:'Office Address',
title:'Visit Our Store',
content:[
'Mumbai Business Hub,',
'Andheri West,',
'Mumbai, India'
]
},
{
icon:<FaEnvelope/>,
label:'Email Address',
title:'Mail Support',
content:[
'support@shopprr.com',
'sales@shopprr.com'
]
},
{
icon:<FaPhone/>,
label:'Phone Number',
title:'Call Anytime',
content:[
'+91 9876543210',
'+91 9123456780'
]
}
].map((item,index)=>(

<div
key={index}
className='bg-white border border-gray-200 rounded-[28px] sm:rounded-[36px] p-5 sm:p-8 shadow-sm'
>

<div className='flex items-start gap-4 sm:gap-5'>

<div className='w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black text-white flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0'>

{item.icon}

</div>

<div className='overflow-hidden'>

<p className='uppercase tracking-[2px] sm:tracking-[3px] text-gray-400 text-xs sm:text-sm font-semibold mb-2 sm:mb-3'>

{item.label}

</p>

<h3 className='text-xl sm:text-2xl font-black mb-2 sm:mb-3'>

{item.title}

</h3>

{

item.content.map((text,i)=>(

<p
key={i}
className='text-gray-500 text-sm sm:text-lg leading-7 sm:leading-8 break-words'
>

{text}

</p>

))

}

</div>

</div>

</div>

))

}

{/* SUPPORT */}

<div className='bg-black text-white rounded-[28px] sm:rounded-[40px] p-5 sm:p-8 shadow-2xl overflow-hidden relative'>

<div className='relative z-10 flex items-start gap-4 sm:gap-5'>

<div className='w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white text-black flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0'>

<FaHeadphones/>

</div>

<div>

<p className='uppercase tracking-[2px] sm:tracking-[3px] text-gray-400 text-xs sm:text-sm font-semibold mb-2 sm:mb-3'>

Customer Support

</p>

<h3 className='text-2xl sm:text-3xl font-black mb-3 sm:mb-4'>

Premium Assistance

</h3>

<p className='text-gray-300 text-sm sm:text-lg leading-7 sm:leading-8 max-w-md'>

Our dedicated support team is available
24/7 to solve your queries and provide
the best shopping experience.

</p>

</div>

</div>

</div>

</div>

</div>

</div>

</section>

)

}

export default Contact