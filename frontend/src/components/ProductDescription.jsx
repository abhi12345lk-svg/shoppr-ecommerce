import React,{useState} from 'react'

const ProductDescription=()=>{

  const [activeTab,setActiveTab]=useState('description')

  return(

    <section className='mt-24'>

      {/* Tabs */}
      <div className='flex flex-wrap border-b border-gray-200'>

        <button
          onClick={()=>setActiveTab('description')}

          className={`

            px-8
            py-4
            text-lg
            font-semibold
            duration-300
            border-b-2

            ${

              activeTab==='description'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'

            }

          `}
        >

          Description

        </button>

        <button
          onClick={()=>setActiveTab('color')}

          className={`

            px-8
            py-4
            text-lg
            font-semibold
            duration-300
            border-b-2

            ${

              activeTab==='color'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'

            }

          `}
        >

          Color Guide

        </button>

        <button
          onClick={()=>setActiveTab('size')}

          className={`

            px-8
            py-4
            text-lg
            font-semibold
            duration-300
            border-b-2

            ${

              activeTab==='size'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'

            }

          `}
        >

          Size Guide

        </button>

      </div>

      {/* Content */}
      <div className='bg-gray-50 p-6 sm:p-8 lg:p-10 mt-8'>

        {

          activeTab==='description' && (

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>

              {/* Left */}
              <div>

                <h4 className='text-2xl font-bold mb-5'>

                  Product Details

                </h4>

                <p className='text-gray-500 leading-8 text-base lg:text-lg'>

                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae dicta adipisci nihil deserunt delectus. Dignissimos, numquam eum, voluptates reiciendis ipsa maxime enim quasi praesentium est totam neque dolores quam.

                </p>

                <p className='text-gray-500 leading-8 text-base lg:text-lg mt-5'>

                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptatem magni cupiditate in voluptates non ea.

                </p>

              </div>

              {/* Right */}
              <div>

                <h4 className='text-2xl font-bold mb-5'>

                  Benefits

                </h4>

                <ul className='flex flex-col gap-4 text-gray-500 text-base lg:text-lg'>

                  <li>

                    ✓ High-quality materials ensure durability and comfort.

                  </li>

                  <li>

                    ✓ Designed for modern and active lifestyles.

                  </li>

                  <li>

                    ✓ Premium stitching with trendy fashion styling.

                  </li>

                  <li>

                    ✓ Soft breathable fabric for all-day comfort.

                  </li>

                </ul>

              </div>

            </div>

          )

        }

        {

          activeTab==='color' && (

            <div className='space-y-5'>

              <h4 className='text-2xl font-bold'>

                Color Guide

              </h4>

              <p className='text-gray-500 leading-8 text-base lg:text-lg max-w-4xl'>

                Choose from a wide variety of premium trendy colors designed to match your everyday fashion and lifestyle needs.

              </p>

              <div className='flex flex-wrap gap-5 pt-4'>

                <div className='w-16 h-16 rounded-full bg-black border-4 border-white shadow'/>

                <div className='w-16 h-16 rounded-full bg-red-500 border-4 border-white shadow'/>

                <div className='w-16 h-16 rounded-full bg-blue-500 border-4 border-white shadow'/>

                <div className='w-16 h-16 rounded-full bg-green-500 border-4 border-white shadow'/>

                <div className='w-16 h-16 rounded-full bg-yellow-400 border-4 border-white shadow'/>

              </div>

            </div>

          )

        }

        {

          activeTab==='size' && (

            <div className='space-y-6'>

              <h4 className='text-2xl font-bold'>

                Size Guide

              </h4>

              <p className='text-gray-500 leading-8 text-base lg:text-lg max-w-4xl'>

                Please choose the perfect size according to your body measurements for the best comfort and fitting experience.

              </p>

              <div className='overflow-x-auto'>

                <table className='w-full border border-gray-200'>

                  <thead className='bg-black text-white'>

                    <tr>

                      <th className='p-4 text-left'>

                        Size

                      </th>

                      <th className='p-4 text-left'>

                        Chest

                      </th>

                      <th className='p-4 text-left'>

                        Waist

                      </th>

                      <th className='p-4 text-left'>

                        Length

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr className='border-b'>

                      <td className='p-4'>

                        S

                      </td>

                      <td className='p-4'>

                        38"

                      </td>

                      <td className='p-4'>

                        30"

                      </td>

                      <td className='p-4'>

                        27"

                      </td>

                    </tr>

                    <tr className='border-b bg-gray-50'>

                      <td className='p-4'>

                        M

                      </td>

                      <td className='p-4'>

                        40"

                      </td>

                      <td className='p-4'>

                        32"

                      </td>

                      <td className='p-4'>

                        28"

                      </td>

                    </tr>

                    <tr className='border-b'>

                      <td className='p-4'>

                        L

                      </td>

                      <td className='p-4'>

                        42"

                      </td>

                      <td className='p-4'>

                        34"

                      </td>

                      <td className='p-4'>

                        29"

                      </td>

                    </tr>

                    <tr className='bg-gray-50'>

                      <td className='p-4'>

                        XL

                      </td>

                      <td className='p-4'>

                        44"

                      </td>

                      <td className='p-4'>

                        36"

                      </td>

                      <td className='p-4'>

                        30"

                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          )

        }

      </div>

    </section>

  )

}

export default ProductDescription