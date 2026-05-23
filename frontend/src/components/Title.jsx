/* ======================= TITLE.JSX ======================= */

import React from 'react'

const Title=({

title1,
title2,

titleStyles='',

title1Styles='',

paraStyles='',

para

})=>{

return(

<div className={`${titleStyles}`}>

<h2 className={`${title1Styles} text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight`}>

{title1}

<span className='text-gray-500 ml-3 font-light'>

{title2}

</span>

</h2>

<p className={`${paraStyles} text-gray-500 mt-4 max-w-[650px] leading-8 text-[15px] sm:text-base`}>

{

para
?para
:"Explore our latest fashion collection and trending products."

}

</p>

</div>

)

}

export default Title