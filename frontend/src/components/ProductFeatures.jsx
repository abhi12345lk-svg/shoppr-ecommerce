import React from 'react'

import {
  TbArrowBackUp,
  TbTruckDelivery
} from 'react-icons/tb'

import { RiSecurePaymentLine } from 'react-icons/ri'

const ProductFeatures=()=>{

  const features=[

    {
      icon:<TbArrowBackUp className='text-5xl text-yellow-500' />,
      title:'Easy Return',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, iure omnis. Placeat labore optio non.'
    },

    {
      icon:<TbTruckDelivery className='text-5xl text-yellow-500' />,
      title:'Fast Delivery',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, iure omnis. Placeat labore optio non.'
    },

    {
      icon:<RiSecurePaymentLine className='text-5xl text-yellow-500' />,
      title:'Secure Payment',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, iure omnis. Placeat labore optio non.'
    }

  ]

  return(

    <section className='mt-20 bg-white'>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>

        {

          features.map((feature,index)=>(

            <div
              key={index}

              className='

                flex
                items-start
                gap-5
                p-8
                border
                border-gray-200
                rounded-3xl
                hover:shadow-lg
                duration-300
                bg-gray-50

              '
            >

              {/* Icon */}
              <div className='shrink-0'>

                {feature.icon}

              </div>

              {/* Content */}
              <div>

                <h4 className='text-2xl font-semibold capitalize mb-3'>

                  {feature.title}

                </h4>

                <p className='text-gray-500 leading-8 text-base'>

                  {feature.description}

                </p>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  )

}

export default ProductFeatures