import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import BycBlogNews from './components/BycBlogNews'
import MoreBlogNews from './pages/MoreBlogNews'
import About from './pages/About'
import Contact from './pages/Contact'
import RecentlyViewed from './components/RecentlyViewed'
import LogIn from './pages/LogIn'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import AddToCart from './pages/AddToCart'
import AllProducts from './pages/AllProducts'
import Boxers from './pages/Boxers'
import Wishlist from './pages/Wishlist'
import Camsole from './pages/Camsole'
import SortByDrop from './components/SortByDrop'
import ToggleButton from './components/ToggleButton'
import BreadCrumb from './components/BreadCrumb'
import ImageCarousel from './components/ImageCarousel'
import AdminApp from './admin/AdminApp'
import CategoryProducts from './pages/CategoryProducts'



const Display = () => {
  return (
    <> 

 
      <BrowserRouter>
      <Navbar/>
        <Routes>
            <Route path = '/' element={<Home/>} />
            <Route path = 'Blog' element={<Blog/>} />
            <Route path = 'BycBlognews' element = {<BycBlogNews/>}/>
            <Route path = '/blog/:id' element = {<MoreBlogNews/>}/>
            <Route path = 'About' element = {<About/>}/>
            <Route path = 'Contact' element = {<Contact/>}/>
            <Route path = 'RecentlyViewed' element = {<RecentlyViewed/>}/>
            <Route path = 'LogIn' element = {<LogIn/>}/>
            <Route path = 'Cart' element = {<Cart/>}/>
            <Route path = 'CheckOut' element = {<CheckOut/>}/>
            <Route path = 'AddToCart' element = {<AddToCart/>}/>
            <Route path = 'AllProducts' element = {<AllProducts/>}/>
            <Route path = 'Boxers' element={<Boxers/>}/>
            <Route path = 'Wishlist' element = {<Wishlist/>}/>  
            <Route path = 'Camsole' element = {<Camsole/>}/>
            <Route path = 'SortByDrop' element = {<SortByDrop/>}/>
            <Route path = 'ToggleButton' element = {<ToggleButton/>}/>
            <Route path = 'BreadCrumb' element = {<BreadCrumb/>}/>
            <Route path = 'ImageCarousel' element = {<ImageCarousel/>}/>
            <Route path = 'admin/*' element={<AdminApp/>} />
            <Route path = 'products/:category/:subcategory' element={<CategoryProducts/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>

    </>
  )
}

export default Display
