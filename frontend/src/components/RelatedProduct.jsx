import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../Context/ShopContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import Item from './Item'

const RelatedProducts = () => {

  const [popularProducts, setPopularProducts] = useState([])
  const { products } = useContext(ShopContext)

  useEffect(() => {
    const data = products.filter((item) => item.popular)
    setPopularProducts(data.slice(0, 8))
  }, [products])

  return (
    <section className='w-full py-6'>

      <div className='mb-8'>
        <p className='text-xs uppercase tracking-[3px] font-bold text-gray-400 mb-2'>Complete the Look</p>
        <Title
          title1={"Related"}
          title2={"Pieces"}
          titleStyles={"pb-2"}
          para={"Selected fashion pieces that pair effortlessly with this product."}
        />
      </div>

      {/* Slider */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={popularProducts.length > 4}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1536: { slidesPerView: 5 },
        }}
        modules={[Autoplay]}
      >
        {popularProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  )

}

export default RelatedProducts