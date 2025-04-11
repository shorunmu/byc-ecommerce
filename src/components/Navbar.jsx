import React, {useState} from 'react'
import { Byclogo } from '../assets'

const Navbar = () => {
  
  return (
    <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-head ">
        <div className="container-fluid my-3 ">

            <div className=" col-lg-none" >
              <a className="navbar-brand position-absolute top-50 start-50 translate-middle" href="/"><img src={Byclogo} alt=""  className="navbar-logo"/></a>
            </div>
        
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
              
             
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item">
                <a className="nav-link" href="#">Shop Products</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="Blog">Blog</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">FAQ</a>
                </li>
                
            </ul>

            <div className="text-center mx-auto navbar-brand-for-logo col-md-none col-sm-none " >
              <a className="navbar-brand position-absolute top-50 start-50 translate-middle" href="/"><img src={Byclogo} alt=""  className="navbar-logo"/></a>
            </div>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
                <a className="nav-link" href="About">About Us</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="Contact">Contact</a>
                </li>
                <li className="nav-item">
                  <div className='d-flex align-items-center'>
                    <a className="nav-link" href="#"><i className="bi bi-search"></i></a>
                  </div>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="LogIn"><i className="bi bi-person"></i></a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="Wishlist"><i className="bi bi-heart"></i></a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="Cart"><i className="bi bi-cart"></i></a>
                </li>
                
            </ul>
          
            </div>
        </div>
        </nav>

    </>
  )
}

export default Navbar
