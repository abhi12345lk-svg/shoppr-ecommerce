/* ======================= TITLE.JSX ======================= */

import React from 'react'

const Title = ({ title1, title2, titleStyles = '', title1Styles = '', paraStyles = '', para }) => {

  return (
    <div className={`${titleStyles}`}>
      <h2 className={`${title1Styles} font-display text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight`}>
        {title1}
        <span className='text-gray-400 ml-2.5 font-light'>{title2}</span>
      </h2>
      <p className={`${paraStyles} text-gray-500 mt-3 max-w-2xl leading-relaxed text-sm sm:text-base`}>
        {para ? para : "Explore our latest fashion collection and trending products."}
      </p>
    </div>
  )

}

export default Title