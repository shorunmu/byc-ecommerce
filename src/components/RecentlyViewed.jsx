import React from 'react'
import { Framebycboxer } from '../assets'

const RecentlyViewed = () => {
  return (
    <>
      <div className="container mt-4 border-rounded p-3 recently-viewed ">

        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
            <h6 className="mb-0 fw-bold ms-3">Recently Viewed</h6>
            <a href="#" className='btn btn-link fw-bold text-danger text-see-all-icon text-decoration-none'>see all <span><i class="bi bi-chevron-right ms-2"></i></span></a>
        </div>


        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        <div className="col">
                <div className="card h-100 border-0">
                    <img src={Framebycboxer} className='card-img-top' alt="" />
                    <div className="card-body framebyc-boxer-card">
                        <h6 className="card-title fw-bold">MEN BOXERS</h6>
                        <p className="card-text framebyc-boxer-card-paragraph"> BYC 1163</p>
                        <p className='framebyc-boxer-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                        <p className=' fw-bold framebyc-boxer-card-small-p'>₦1,900.00</p>
                        <div className="d-flex mb-2 fs-10">
                        <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                        <span  className='fs-7 ms-3 custom-fonts-ss'> 4.05</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card h-100 border-0">
                    <img src={Framebycboxer} className='card-img-top' alt="" />
                    <div className="card-body framebyc-boxer-card">
                        <h6 className="card-title fw-bold">MEN BOXERS</h6>
                        <p className="card-text framebyc-boxer-card-paragraph"> BYC 1163</p>
                        <p className='framebyc-boxer-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                        <p className=' fw-bold framebyc-boxer-card-small-p'>₦1,900.00</p>
                        <div className="d-flex mb-2 fs-10">
                        <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                        <span  className='fs-7 ms-3 custom-fonts-ss'> 4.05</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card h-100 border-0">
                    <img src={Framebycboxer} className='card-img-top' alt="" />
                    <div className="card-body framebyc-boxer-card">
                        <h6 className="card-title fw-bold">MEN BOXERS</h6>
                        <p className="card-text framebyc-boxer-card-paragraph"> BYC 1163</p>
                        <p className='framebyc-boxer-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                        <p className=' fw-bold framebyc-boxer-card-small-p'>₦1,900.00</p>
                        <div className="d-flex mb-2 fs-10">
                        <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                        <span  className='fs-7 ms-3 custom-fonts-ss'> 4.05</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card h-100 border-0">
                    <img src={Framebycboxer} className='card-img-top' alt="" />
                    <div className="card-body framebyc-boxer-card">
                        <h6 className="card-title fw-bold">MEN BOXERS</h6>
                        <p className="card-text framebyc-boxer-card-paragraph"> BYC 1163</p>
                        <p className='framebyc-boxer-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                        <p className=' fw-bold framebyc-boxer-card-small-p'>₦1,900.00</p>
                        <div className="d-flex mb-2 fs-10">
                        <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                        <span  className='fs-7 ms-3 custom-fonts-ss'> 4.05</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card h-100 border-0">
                    <img src={Framebycboxer} className='card-img-top' alt="" />
                    <div className="card-body framebyc-boxer-card">
                        <h6 className="card-title fw-bold">MEN BOXERS</h6>
                        <p className="card-text framebyc-boxer-card-paragraph"> BYC 1163</p>
                        <p className='framebyc-boxer-card-small lh-small '>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                        <p className=' fw-bold framebyc-boxer-card-small-p'>₦1,900.00</p>
                        <div className="d-flex mb-2 fs-10">
                        <span className='text-warning custom-fonts-ss'><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
                        <span  className='fs-7 ms-3 custom-fonts-ss'> 4.05</span>
                        </div>

                    </div>
                </div>
            </div>    

        </div>
      </div>
    </>
  )
}

export default RecentlyViewed
