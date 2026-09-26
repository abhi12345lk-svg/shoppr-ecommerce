/* ======================= APP.JSX ======================= */
import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

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
import Wishlist from './pages/Wishlist'

/* ================= MODALS & NAV ================= */
import QuickViewModal from './components/QuickViewModal'
import SizeGuideModal from './components/SizeGuideModal'
import MobileBottomNav from './components/MobileBottomNav'

/* ================= CONTEXT ================= */
import { ShopContext } from './Context/ShopContext'

/* ================= ADMIN ================= */
import Sidebar from './components/admin/Sidebar'
import AdminLogin from './components/admin/AdminLogin.jsx'

import AdminDashboard from './pages/admin/AdminDashboard'
import AddProduct from './pages/admin/AddProduct'
import ProductList from './pages/admin/ProductList'
import CategoryManager from './pages/admin/CategoryManager'
import CouponManager from './pages/admin/CouponManager'
import Orders from './pages/admin/Orders'
import ContactMessages from './pages/admin/ContactMessages'

const App = () => {
  const { showUserLogin, isAdmin } = useContext(ShopContext)
  const location = useLocation()
  const isAdminPath = location.pathname.includes('/admin')

  return (
    <main className='overflow-x-hidden text-neutral-900 min-h-screen bg-[#fafafa] flex flex-col justify-between'>

      {/* ================= LOGIN POPUP ================= */}
      {showUserLogin && <Login />}

      {/* ================= GLOBAL MODALS ================= */}
      <QuickViewModal />
      <SizeGuideModal />

      {/* ================= HEADER ================= */}
      {!isAdminPath && <Header />}

      {/* ================= ROUTES ================= */}
      <div className="flex-1 w-full">
        <Routes>

          {/* ================= USER ROUTES ================= */}
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/collection/:category' element={<CategoryCollection />} />
          <Route path='/collection/:category/:id' element={<ProductDetails />} />
          <Route path='/testimonials' element={<Testimonials />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/my-orders' element={<MyOrders />} />

          {/* ================= ADMIN LOGIN ================= */}
          <Route path='/admin' element={<AdminLogin />} />

          {/* ================= PROTECTED ADMIN ================= */}
          <Route
            path='/admin/*'
            element={isAdmin ? <Sidebar /> : <AdminLogin />}
          >
            <Route index element={<AdminDashboard />} />
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='add' element={<AddProduct />} />
            <Route path='list' element={<ProductList />} />
            <Route path='categories' element={<CategoryManager />} />
            <Route path='coupons' element={<CouponManager />} />
            <Route path='orders' element={<Orders />} />
            <Route path='contact-messages' element={<ContactMessages />} />
          </Route>

        </Routes>
      </div>

      {/* ================= FOOTER ================= */}
      {!isAdminPath && <Footer />}

      {/* ================= MOBILE BOTTOM NAV ================= */}
      {!isAdminPath && <MobileBottomNav />}

    </main>
  )
}

export default App