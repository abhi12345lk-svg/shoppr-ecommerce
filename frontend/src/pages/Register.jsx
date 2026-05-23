/* ======================= REGISTER.JSX ======================= */

import React,{
useContext,
useState
}from 'react'

import{
toast
}from 'react-toastify'

import{
ShopContext
}from '../Context/ShopContext'

const Register=()=>{

const{
axios,
navigate,
setShowUserLogin,
handleLoginSuccess
}=useContext(ShopContext)

const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')

const onSubmitHandler=async(event)=>{

event.preventDefault()

try{

const{data}=await axios.post(
'/api/user/register',
{
name,
email,
password
}
)

if(data.success){

toast.success('Account Created Successfully')

await handleLoginSuccess()

navigate('/')

}else{

toast.error(data.message)

}

}catch(error){

toast.error(error.message)

}

}

return(

<div className='w-full min-h-screen bg-[#f5f5f5] flex items-center justify-center px-5 py-20'>

<form

onSubmit={onSubmitHandler}

className='w-full max-w-lg bg-white rounded-[32px] shadow-xl p-8 sm:p-10 flex flex-col gap-5'

>

{/* ================= TITLE ================= */}

<div className='text-center mb-2'>

<h1 className='text-4xl font-black text-black'>

Create Account

</h1>

<p className='text-gray-500 mt-2 text-sm'>

Register to start shopping with SHOPPR.

</p>

</div>

{/* ================= NAME ================= */}

<div>

<label className='text-sm font-semibold text-gray-700 block mb-2'>

Full Name

</label>

<input

type='text'

placeholder='Enter your full name'

value={name}

onChange={(e)=>setName(e.target.value)}

className='w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black duration-300'

required

/>

</div>

{/* ================= EMAIL ================= */}

<div>

<label className='text-sm font-semibold text-gray-700 block mb-2'>

Email Address

</label>

<input

type='email'

placeholder='Enter your email'

value={email}

onChange={(e)=>setEmail(e.target.value)}

className='w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black duration-300'

required

/>

</div>

{/* ================= PASSWORD ================= */}

<div>

<label className='text-sm font-semibold text-gray-700 block mb-2'>

Password

</label>

<input

type='password'

placeholder='••••••••'

value={password}

onChange={(e)=>setPassword(e.target.value)}

className='w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black duration-300'

required

/>

</div>

{/* ================= BUTTON ================= */}

<button

type='submit'

className='w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold duration-300 mt-2'

>

Create Account

</button>

{/* ================= LOGIN ================= */}

<p className='text-center text-gray-500 text-sm mt-2'>

Already have an account?

<span

onClick={()=>navigate('/')}

className='ml-2 text-black font-semibold cursor-pointer hover:underline'

>

Login here

</span>

</p>

</form>

</div>

)

}

export default Register