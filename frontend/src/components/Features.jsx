import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia"
import { MdCurrencyExchange } from "react-icons/md"
import { BiSupport } from "react-icons/bi"
import { TbPackageImport } from "react-icons/tb"

const Features = () => {

  const features = [
    { icon: <LiaShippingFastSolid />, title: "Free Express Shipping", text: "Complimentary delivery on all orders over $100" },
    { icon: <MdCurrencyExchange />, title: "Money-Back Guarantee", text: "30-day hassle-free return and refund policy" },
    { icon: <BiSupport />, title: "24/7 Dedicated Support", text: "Instant live assistance from our expert team" },
    { icon: <TbPackageImport />, title: "Easy Returns & Exchange", text: "Doorstep pickup and swift size replacement" },
  ]

  return (
    <section className='py-12 sm:py-16 bg-white border-y border-gray-100 overflow-hidden'>

      <div className='max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24'>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6'>
          {features.map((item, index) => (
            <div
              key={index}
              className='group flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-gray-50/60 hover:bg-white border border-gray-100/80 hover:border-gray-300 hover:shadow-lg transition-all duration-300'
            >

              {/* ================= ICON BADGE ================= */}

              <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm'>
                {item.icon}
              </div>

              {/* ================= CONTENT ================= */}

              <div className='min-w-0'>
                <h3 className='text-sm sm:text-base font-bold text-black mb-1 leading-snug'>
                  {item.title}
                </h3>
                <p className='text-gray-500 text-xs sm:text-sm leading-relaxed'>
                  {item.text}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  )

}

export default Features