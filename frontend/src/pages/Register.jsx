/* ======================= REGISTER.JSX ======================= */

import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { ShopContext } from '../Context/ShopContext'

const Register = () => {
  const { axios, navigate, setShowUserLogin, handleLoginSuccess } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/user/register', {
        name,
        email,
        password
      })
      

      if (data.success) {
        if (data.token) {
          localStorage.setItem('token', data.token)
        }

        toast.success('Account Created Successfully')

        await handleLoginSuccess(data.token)

        navigate('/')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20'>
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg bg-white rounded-[28px] sm:rounded-[32px] shadow-xl p-6 sm:p-10 flex flex-col gap-4 sm:gap-5'
      >

        {/* ================= TITLE ================= */}
        <div className='text-center mb-2'>
          <h1 className='text-3xl sm:text-4xl font-black text-black'>
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => navigate('/')}
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