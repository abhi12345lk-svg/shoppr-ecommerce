/* ======================= ADMINLOGIN.JSX ======================= */

import React,{
useContext,
useState
}from 'react'

import{
toast
}from 'react-toastify'

import{
ShopContext
}from '../../Context/ShopContext'

const AdminLogin=()=>{

const{
setIsAdmin,
navigate,
axios
}=useContext(ShopContext)

const[
email,
setEmail
]=useState('')

const[
password,
setPassword
]=useState('')

const[
loading,
setLoading
]=useState(false)

/* ================= LOGIN SUBMIT ================= */

const onSubmitHandler=async(event)=>{

event.preventDefault()

try{

setLoading(true)

const{data}=await axios.post(

`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,

{
email,
password
},

{
withCredentials:true
}

)

if(data.success){

setIsAdmin(true)

toast.success(
data.message||'Admin Login Successful'
)

navigate('/admin/add')

}else{

toast.error(
data.message||'Invalid Credentials'
)

}

}catch(error){

console.log(error)

toast.error(

error.response?.data?.message
||
error.message
||
'Something went wrong'

)

}finally{

setLoading(false)

}

}

return(

<div className='min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 sm:px-6 py-8 overflow-hidden'>

<div className='w-full max-w-md'>

{/* ================= LOGO ================= */}

<div className='text-center mb-6 sm:mb-8'>

<h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight break-words'>

SHOPPR
<span className='text-gray-400'>.</span>

</h1>

<p className='text-gray-500 mt-2 text-xs sm:text-sm'>

Admin Dashboard Access

</p>

</div>

{/* ================= LOGIN FORM ================= */}

<form

onSubmit={onSubmitHandler}

className='bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl border border-gray-100 p-5 sm:p-8 lg:p-10 flex flex-col gap-5'

>

{/* ================= ICON ================= */}

<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-black flex items-center justify-center text-white text-2xl sm:text-3xl'>

🔒

</div>

{/* ================= TITLE ================= */}

<div className='text-center'>

<h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-black'>

Admin Login

</h2>

<p className='text-gray-500 mt-2 text-xs sm:text-sm leading-6'>

Login to manage products & orders

</p>

</div>

{/* ================= EMAIL ================= */}

<div>

<label className='text-sm font-medium text-gray-700 mb-2 block'>

Email Address

</label>

<input

type='email'

autoComplete='email'

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder='admin@gmail.com'

className='w-full border border-gray-300 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:border-black duration-200'

required

/>

</div>

{/* ================= PASSWORD ================= */}

<div>

<label className='text-sm font-medium text-gray-700 mb-2 block'>

Password

</label>

<input

type='password'

autoComplete='current-password'

value={password}

onChange={(e)=>setPassword(e.target.value)}

placeholder='••••••••'

className='w-full border border-gray-300 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:border-black duration-200'

required

/>

</div>

{/* ================= BUTTON ================= */}

<button

type='submit'

disabled={loading}

className='w-full bg-black hover:bg-[#111] text-white py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold duration-300 disabled:opacity-70 hover:scale-[1.01]'

>

{

loading
?'Please wait...'
:'Login'

}

</button>

</form>

</div>

</div>

)

}

export default AdminLogin