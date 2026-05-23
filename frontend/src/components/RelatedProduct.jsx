import React,{
  useContext,
  useEffect,
  useState
} from 'react'

import Title from './Title'

import { ShopContext } from '../Context/ShopContext'

import { Swiper,SwiperSlide } from 'swiper/react'

import 'swiper/css'

import { Autoplay } from 'swiper/modules'

import Item from './Item'

const RelatedProducts=()=>{

  const [popularProducts,setPopularProducts]=useState([])

  const { products }=useContext(ShopContext)

  useEffect(()=>{

    const data=products.filter((item)=>item.popular)

    setPopularProducts(data.slice(0,8))

  },[products])

  return(

    <section className='max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-10 py-5'>

      <Title
        title1={"Related"}
        title2={"Products"}
        titleStyles={"pb-12"}
        para={
          "Explore our trending and most loved fashion products chosen by customers for their premium quality and modern style."
        }
      />

      {/* Slider */}
      <Swiper

        slidesPerView={1}

        spaceBetween={20}

        loop={popularProducts.length > 4}

        autoplay={{

          delay:2500,

          disableOnInteraction:false

        }}

        breakpoints={{

          640:{
            slidesPerView:2
          },

          768:{
            slidesPerView:3
          },

          1024:{
            slidesPerView:4
          },

          1536:{
            slidesPerView:5
          }

        }}

        modules={[Autoplay]}
      >

        {

          popularProducts.map((product)=>(

            <SwiperSlide key={product._id}>

              <Item product={product} />

            </SwiperSlide>

          ))

        }

      </Swiper>

    </section>

  )

}

export default RelatedProducts