import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'

const CartTotal = () => {

  const {
    currency,
    getCartAmount,
    navigate
  } = useContext(ShopContext)

  const subtotal = getCartAmount()

  const shippingFee = subtotal === 0 ? 0 : 10

  const tax = subtotal * 0.02

  const total = subtotal + shippingFee + tax

  return (

    <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-7'>

      {/* Header */}
      <div className='mb-7'>

        <p className='text-sm uppercase tracking-[4px] text-gray-400 font-semibold mb-2'>
          Order Summary
        </p>

        <h2 className='text-3xl font-black text-black'>
          Cart Totals
        </h2>

      </div>

      {/* Price Details */}
      <div className='flex flex-col gap-5'>

        <div className='flex items-center justify-between'>

          <p className='text-gray-500 font-medium'>
            Subtotal
          </p>

          <p className='text-lg font-bold'>
            {currency}{subtotal.toFixed(2)}
          </p>

        </div>

        <div className='flex items-center justify-between'>

          <p className='text-gray-500 font-medium'>
            Shipping Fee
          </p>

          <p className='text-lg font-bold'>
            {currency}{shippingFee.toFixed(2)}
          </p>

        </div>

        <div className='flex items-center justify-between'>

          <p className='text-gray-500 font-medium'>
            Tax (2%)
          </p>

          <p className='text-lg font-bold'>
            {currency}{tax.toFixed(2)}
          </p>

        </div>

        {/* Divider */}
        <div className='border-t border-dashed border-gray-300 pt-5 mt-2'>

          <div className='flex items-center justify-between'>

            <div>

              <h3 className='text-2xl font-black text-black'>
                Total
              </h3>

              <p className='text-sm text-gray-400'>
                Including all taxes
              </p>

            </div>

            <h3 className='text-3xl font-extrabold'>
              {currency}{total.toFixed(2)}
            </h3>

          </div>

        </div>

      </div>

      {/* Coupon */}
      <div className='mt-8'>

        <p className='font-semibold text-gray-700 mb-3'>
          Coupon Code
        </p>

        <div className='flex gap-3'>

          <input
            type='text'
            placeholder='Enter coupon'
            className='w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black transition'
          />

          <button className='bg-black text-white px-5 rounded-2xl font-semibold hover:bg-gray-800 transition'>
            Apply
          </button>

        </div>

      </div>

      {/* Checkout Button */}
      <button
        onClick={() => navigate('/place-order')}
        className='w-full mt-8 bg-black text-white py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 transition-all duration-300 active:scale-[0.98]'
      >

        Proceed To Checkout

      </button>

      {/* Secure */}
      <div className='flex items-center justify-center gap-2 mt-5 text-sm text-gray-500'>

        <span className='text-green-600 text-base'>●</span>

        Secure Payment Guaranteed

      </div>

    </div>

  )

}

export default CartTotal