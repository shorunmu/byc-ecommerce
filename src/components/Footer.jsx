import React from 'react'
import { Payments } from '../assets'

const Footer = () => {
  return (
    <>
        <footer className="bg-dark text-center text-lg-start">

          <div className="container p-4 text-white ul-li-contain">

            <div className="row d-flex my-5  ">
     
              <div className="col-sm-12 col-md-12 col-lg-2  my-5">
                <h5 className="">Company Info</h5>

                <ul className="list-unstyled mb-0 ">
                  <li className=''>
                    <a href="#!" className="text-body text-decoration-none">About Us</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none">Affliate</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none">Fashion Blogger</a>
                  </li>
                </ul>
              </div>



              <div className="col-sm-12 col-md-12 col-lg-2 my-5 ">
                <h5 className=" ">Help & Support</h5>

                <ul className="list-unstyled">
                  <li>
                    <a href="#!" className="text-body text-decoration-none">Shipping Info</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none">Refunds</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none">How to Order</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none">How to Track</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none">Size Guides</a>
                  </li>
                </ul>
              </div>



              <div className="col-sm-12 col-md-12 col-lg-2 my-5 ">
                <h5 className="">Customer Care</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-body text-decoration-none">Contact Us</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none">Payment Methods</a>
                  </li>
                  <li>
                    <a href="#!" className="text-body text-decoration-none"><img src={Payments} alt="" /></a>
                  </li>
                </ul>
              </div>



              <div className="col-sm-12 col-md-12  offset-lg-2 col-lg-4 my-5 me-auto ">
                <p className="pt-2">
                <strong>Sign up for our newsletter</strong>
                </p>

                <form  className="email-form" action="/subscribe" method='POST'>
                <input type="email"   name='email' placeholder='Enter Email ' required/>
                <button className=''><i class="bi bi-arrow-right "></i></button>
                </form>
                <div className='mt-5'>
                <a href="" className='text-decoration-none text-white d-block '><i class="bi bi-envelope"></i> bycafrica@gmail.com </a>
                <a href="" className='text-decoration-none text-white '><i class="bi bi-telephone"></i> +2348101375376 ; +2349053403403  </a>

                </div>
               
              </div>
            </div>
            <div className="col-sm-12 col-md-12 offset-lg-1 col-lg-10 my-4 ">
            <hr class="border border-light border-2 opacity-50"/>
            </div>

          </div>

        </footer>
    </>
  )
}

export default Footer
