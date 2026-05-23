  /* ======================= LOGIN.JSX ======================= */

  import React,{useContext,useState}from'react'
  import{toast}from'react-toastify'
  import{ShopContext}from'../Context/ShopContext'

  const Login=()=>{

  const{
  axios,
  showUserLogin,
  setShowUserLogin,
  handleLoginSuccess,
  fetchUser
  }=useContext(ShopContext)

  const[state,setState]=useState('login')

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const onSubmitHandler=async(event)=>{

  event.preventDefault()

  try{

  const{data}=await axios.post(
  `/api/user/${state}`,
  {
  name,
  email,
  password
  }
  )

  if(data.success){

  toast.success(

  `${state==='register'
  ?'Account Created Successfully'
  :'Login Successful'}`

  )

  await handleLoginSuccess()

  setShowUserLogin(false)

  setName('')
  setEmail('')
  setPassword('')

  }else{

  toast.error(data.message)

  }

  }catch(error){

  toast.error(error.message)

  }

  }

  if(!showUserLogin){

  return null

  }

  return(

  <div

  onClick={()=>setShowUserLogin(false)}

  className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4'

  >

  <form

  onSubmit={onSubmitHandler}

  onClick={(e)=>e.stopPropagation()}

  className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col gap-5 animate-fadeIn'

  >

  {/* ================= TITLE ================= */}

  <div className='text-center'>

  <h2 className='text-3xl font-extrabold text-black'>

  {

  state==="login"
  ?'User Login'
  :'Create Account'

  }

  </h2>

  <p className='text-gray-500 mt-2 text-sm'>

  {

  state==="login"
  ?'Login to continue shopping'
  :'Register your new account'

  }

  </p>

  </div>

  {/* ================= NAME ================= */}

  {

  state==="register"&&(

  <div>

  <p className='text-sm font-medium mb-2 text-gray-700'>

  Full Name

  </p>

  <input

  type='text'

  placeholder='Enter your full name'

  value={name}

  onChange={(e)=>setName(e.target.value)}

  className='w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-black duration-300'

  required

  />

  </div>

  )

  }

  {/* ================= EMAIL ================= */}

  <div>

  <p className='text-sm font-medium mb-2 text-gray-700'>

  Email Address

  </p>

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

  <p className='text-sm font-medium mb-2 text-gray-700'>

  Password

  </p>

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

  {

  state==="login"
  ?'Login'
  :'Create Account'

  }

  </button>

  {/* ================= SWITCH ================= */}

  {

  state==="login"

  ?(

  <p className='text-center text-gray-500 text-sm'>

  Create an account?

  <span

  onClick={()=>setState('register')}

  className='ml-2 text-black font-semibold cursor-pointer hover:underline'

  >

  Click here

  </span>

  </p>

  )

  :(

  <p className='text-center text-gray-500 text-sm'>

  Already have an account?

  <span

  onClick={()=>setState('login')}

  className='ml-2 text-black font-semibold cursor-pointer hover:underline'

  >

  Login here

  </span>

  </p>

  )

  }

  </form>

  </div>

  )

  }

  export default Login