/* ======================= APP.JSX ======================= */

import React,{
useContext
}from 'react'

import{
Route,
Routes,
useLocation
}from 'react-router-dom'

/* ================= COMPONENTS ================= */

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'

/* ================= USER PAGES ================= */

import Home from './pages/Home'
import Collection from './pages/Collection'
import CategoryCollection from './pages/CategoryCollection'
import ProductDetails from './pages/ProductDetails'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import PlaceOrder from './pages/PlaceOrder'

/* ================= CONTEXT ================= */

import{
ShopContext
}from './Context/ShopContext'

/* ================= ADMIN ================= */

import Sidebar from './components/admin/Sidebar'
import AdminLogin from './components/admin/AdminLogin.jsx'

import AddProduct from './pages/admin/AddProduct'
import ProductList from './pages/admin/ProductList'
import Orders from './pages/admin/Orders'
import ContactMessages from './pages/admin/ContactMessages'

const App=()=>{

const{
showUserLogin,
isAdmin
}=useContext(ShopContext)

const location=useLocation()

const isAdminPath=
location.pathname.includes('/admin')

return(

<main className='overflow-hidden text-tertiary min-h-screen bg-[#f5f5f5]'>

{/* ================= LOGIN POPUP ================= */}

{

showUserLogin
&&
<Login/>

}

{/* ================= HEADER ================= */}

{

!isAdminPath
&&
<Header/>

}

{/* ================= ROUTES ================= */}

<Routes>

{/* ================= USER ROUTES ================= */}

<Route
path='/'
element={<Home/>}
/>

<Route
path='/collection'
element={<Collection/>}
/>

<Route
path='/collection/:category'
element={<CategoryCollection/>}
/>

<Route
path='/collection/:category/:id'
element={<ProductDetails/>}
/>

<Route
path='/testimonials'
element={<Testimonials/>}
/>

<Route
path='/contact'
element={<Contact/>}
/>

<Route
path='/cart'
element={<Cart/>}
/>

<Route
path='/place-order'
element={<PlaceOrder/>}
/>

<Route
path='/my-orders'
element={<MyOrders/>}
/>

{/* ================= ADMIN LOGIN ================= */}

<Route
path='/admin'
element={<AdminLogin/>}
/>

{/* ================= PROTECTED ADMIN ================= */}

<Route

path='/admin/*'

element={

isAdmin
?<Sidebar/>
:<AdminLogin/>

}

>

<Route
path='add'
element={<AddProduct/>}
/>

<Route
path='list'
element={<ProductList/>}
/>

<Route
path='orders'
element={<Orders/>}
/>

<Route
path='contact-messages'
element={<ContactMessages/>}
/>

</Route>

</Routes>

{/* ================= FOOTER ================= */}

{

!isAdminPath
&&
<Footer/>

}

</main>

)

}

export default App