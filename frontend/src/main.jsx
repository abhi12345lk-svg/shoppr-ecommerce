/* ========================= MAIN.JSX ========================= */

import React from 'react'

import ReactDOM from 'react-dom/client'

import {
BrowserRouter
} from 'react-router-dom'

import {
ToastContainer
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import App from './App'

import './index.css'

import ShopContextProvider from './Context/ShopContext'

import ScrollToTop from './components/ScrollToTop'

ReactDOM.createRoot(

document.getElementById('root')

).render(

<React.StrictMode>

<BrowserRouter>

{/* ================= SCROLL TO TOP ================= */}

<ScrollToTop/>

<ShopContextProvider>

<App />

<ToastContainer
position='bottom-right'
autoClose={2000}
hideProgressBar={false}
newestOnTop
closeOnClick
pauseOnHover
draggable
pauseOnFocusLoss
theme='light'
/>

</ShopContextProvider>

</BrowserRouter>

</React.StrictMode>

)
