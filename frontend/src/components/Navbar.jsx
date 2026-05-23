/* ======================= NAVBAR.JSX ======================= */

import React from 'react'

import {NavLink} from 'react-router-dom'

const Navbar=({

containerStyles,
setMenuOpened

})=>{

const navLinks=[

{
path:'/',
title:'Home'
},

{
path:'/collection',
title:'Collection'
},

{
path:'/testimonials',
title:'Testimonials'
},

{
path:'/contact',
title:'Contact'
}

]

return(

<nav className={containerStyles}>

{

navLinks.map((link,index)=>(

<NavLink

key={index}

to={link.path}

onClick={()=>setMenuOpened?.(false)}

className={({isActive})=>

`
relative
px-1
py-2
uppercase
text-[13px]
sm:text-[14px]
lg:text-[15px]
font-extrabold
tracking-[1px]
duration-300
whitespace-nowrap

after:absolute
after:left-0
after:-bottom-1
after:h-[2px]
after:bg-black
after:duration-300

${

isActive

?'text-black after:w-full'

:'text-gray-500 hover:text-black after:w-0 hover:after:w-full'

}

`

}

>

{link.title}

</NavLink>

))

}

</nav>

)

}

export default Navbar