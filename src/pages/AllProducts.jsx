import React, {useState} from 'react'
import { Framebycboxer, Imagesetbox, Imagesetboxone, Imagesetboxthree, Imagesetboxtwo } from '../assets'
import RecentlyViewed from '../components/RecentlyViewed'

const AllProducts = () => {

  return (
    <>
      <div className="container my-5">
        <div className="row bg-white row-for-all-products">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
            <h6 className="mb-0 fw-bold ms-2">Recently Viewed</h6>
            <a href="#" className='btn btn-link fw-bold text-danger text-see-all-icon text-decoration-none'>see all <span><i class="bi bi-chevron-right ms-2"></i></span></a>
        </div>

        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
            <h6 className="mb-0 fw-bold ms-2">Recently Viewed</h6>
            <a href="#" className='btn btn-link fw-bold text-danger text-see-all-icon text-decoration-none'>see all <span><i class="bi bi-chevron-right ms-2"></i></span></a>
        </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                    <div className="col">
                        <div className="card h-100 border-0 position-relative camisole-border">
                            <img src={Framebycboxer} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">CAMISOLE</h6>
                                <p className="card-text framebyc-camisole-card-paragraph"> BYC-2598ABC</p>
                                <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>
                            <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Framebycboxer} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">CAMISOLE</h6>
                                <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                               </div>

                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Framebycboxer} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">CAMISOLE</h6>
                                <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                </div> 

                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Framebycboxer} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">CAMISOLE</h6>
                                <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                </div> 

                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Framebycboxer} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">CAMISOLE</h6>
                                <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                </div> 

                            </div>
                        </div>
                    </div>    

            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                    <div className="col">
                            <div className="card h-100 border-0 camisole-border">
                                <img src={Framebycboxer} className='card-img-top' alt="" />
                                <div className="card-body framebyc-camisole-card">
                                    <h6 className="card-title fw-bold">CAMISOLE</h6>
                                    <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                    <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                    <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                    <div className="d-flex mb-2 fs-10">
                                    <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                    <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                    </div>

                                    <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                    <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                    <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                    </div> 
            
                                </div>
                            </div>
                        </div>
            
                        <div className="col">
                            <div className="card h-100 border-0 camisole-border">
                                <img src={Framebycboxer} className='card-img-top' alt="" />
                                <div className="card-body framebyc-camisole-card">
                                    <h6 className="card-title fw-bold">CAMISOLE</h6>
                                    <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                    <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                    <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                    <div className="d-flex mb-2 fs-10">
                                    <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                    <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                    </div>

                                    <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                    <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                    <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                    </div> 
            
                                </div>
                            </div>
                        </div>
            
                        <div className="col">
                            <div className="card h-100 border-0 camisole-border">
                                <img src={Framebycboxer} className='card-img-top' alt="" />
                                <div className="card-body framebyc-camisole-card">
                                    <h6 className="card-title fw-bold">CAMISOLE</h6>
                                    <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                    <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                    <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                    <div className="d-flex mb-2 fs-10">
                                    <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                    <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                    </div>

                                    <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                    <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                    <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                    </div> 
            
                                </div>
                            </div>
                        </div>
            
                        <div className="col">
                            <div className="card h-100 border-0 camisole-border">
                                <img src={Framebycboxer} className='card-img-top' alt="" />
                                <div className="card-body framebyc-camisole-card">
                                    <h6 className="card-title fw-bold">CAMISOLE</h6>
                                    <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                    <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                    <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                    <div className="d-flex mb-2 fs-10">
                                    <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                    <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                    </div>

                                    <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                    <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                    <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                    </div> 
            
                                </div>
                            </div>
                        </div>
            
                        <div className="col">
                            <div className="card h-100 border-0 camisole-border">
                                <img src={Framebycboxer} className='card-img-top' alt="" />
                                <div className="card-body framebyc-camisole-card">
                                    <h6 className="card-title fw-bold">CAMISOLE</h6>
                                    <p className="card-text framebyc-camisole-card-paragraph"> BYC-501LMS</p>
                                    <p className='framebyc-camisole-card-small lh-small '>Long Cotton Adjustable strap Camisole <br /> Tank Top - Black</p>
                                    <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,900.00</p>
                                    <div className="d-flex mb-2 fs-10">
                                    <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                    <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                    </div>

                                    <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                    <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                    <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                    </div> 
            
                                </div>
                            </div>
                        </div>    
            
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 py-5 ">
                    <div className="col">
                        <div className="card h-100 border-0 position-relative camisole-border">
                            <img src={Imagesetbox} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">BOXERS</h6>
                                <p className="card-text framebyc-camisole-card-paragraph">  BYC 1161</p>
                                <p className='framebyc-camisole-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,800.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>
                            <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Imagesetboxthree} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">BOXERS</h6>
                                <p className="card-text framebyc-camisole-card-paragraph">BYC 1201</p>
                                <p className='framebyc-camisole-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦1,800.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                               </div>

                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Imagesetboxtwo} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">BOXERS</h6>
                                <p className="card-text framebyc-camisole-card-paragraph">KBY-3204</p>
                                <p className='framebyc-camisole-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦10,000.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                </div> 

                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Imagesetboxone} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">BOXERS</h6>
                                <p className="card-text framebyc-camisole-card-paragraph">BYL-6709</p>
                                <p className='framebyc-camisole-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦12,000.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                </div> 

                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100 border-0 camisole-border">
                            <img src={Imagesetboxtwo} className='card-img-top' alt="" />
                            <div className="card-body framebyc-camisole-card">
                                <h6 className="card-title fw-bold">BOXERS</h6>
                                <p className="card-text framebyc-camisole-card-paragraph">KBY-3204</p>
                                <p className='framebyc-camisole-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                <p className=' fw-bold framebyc-camisole-card-small-p'>₦10,000.00</p>
                                <div className="d-flex mb-2 fs-10">
                                <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                                <span  className='fs-7 ms-2 custom-fonts-ss'> 4.05</span>
                                </div>

                                <div className='d-flex gap-2 mb-2 card-buttons  d-none'>
                                <a className="btn btn-white white-danger-btn" href="#" role="button"><span className='heartandbuy text-danger'><i class="bi bi-heart"></i><span className='ms-2'>Wishlist</span></span></a>
                                <a className="btn btn-danger" href="#" role="button"><span className='heartandbuy'><i class="bi bi-cart3"></i><span className='ms-2'>Buy Now</span></span></a>
                                </div> 

                            </div>
                        </div>
                    </div>    

            </div>
            
            <div className="row text-center ">
                <div className=" my-5 d-flex justify-content-center gap-1 five-btn-button">
                    <button class="btn btn-light " type="submit"><i class="bi bi-chevron-left"></i></button>
                    <button class="btn btn-light" type="submit">1</button>
                    <button class="btn btn-light" type="submit">2</button>
                    <button class="btn btn-light" type="submit">3</button>
                    <button class="btn btn-light" type="submit"><i class="bi bi-chevron-right"></i></button>
                </div>
            </div>


        </div>

        <RecentlyViewed/>
      </div>
    </>
  )
}

export default AllProducts
