import React from 'react'

import Hero from '../components/Hero'
import Features from '../components/Features'
import Categories from '../components/Category'
import PopularProducts from '../components/PopularProduct'
import Blog from '../components/Blog'
import Footer from '../components/Footer'

import banner from '../assets/banner.png'

const Home = () => {

  return (

    <>

      <Hero />

      <Features />

      <Categories />

      <PopularProducts />

      <div className='max-w-450 mx-auto lg:py-10 overflow-hidden'>

        <img
          src={banner}
          alt='bannerImg'
          className='rounded w-full object-cover'
        />

      </div>

      <Blog />

      

    </>

  )

}

export default Home