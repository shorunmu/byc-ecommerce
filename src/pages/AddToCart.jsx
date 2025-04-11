import React, {useState} from 'react'
import { Boxercart, Frameboxerblue, Frameboxersblack } from '../assets'
import RecentlyViewed from '../components/RecentlyViewed'

const AddToCart = () => {
    const [quantity, setQuantity] = useState(1);
    
        const handleIncrement = () => {
            setQuantity(prev => prev + 1);
        };
    
        const handleDecrement = () => {
            if (quantity > 1) {
              setQuantity(prev => prev - 1);
            }   
        };
  return (
    <>
      <div className="container my-5 ">
      <div className="row border-rounded p-3 cart-conainer">
        <div className="col-lg-4 mt-4">
            <img src={Boxercart} alt="" className='w-100' />

            {/* <div id="carouselExampleControls" className="carousel slide my-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={Frameboxersblack} className="d-block " alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src={Frameboxerblue} className="d-block" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src={Frameboxersblack} className="d-block " alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src={Frameboxerblue} className="d-block " alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> */}
            
        </div>

        <div className="col-lg-6 ms-5 mt-4 mb-5">
          <div className="border-bottom">
          <h5 className='fw-bold'>MEN BOXERS <br />BYC 1166</h5>
          <p>100% Cotton 12 Pieces Of Mens Boxer </p>
          
          <div className="d-flex mb-4 fs-10">
          <span className='text-warning '><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> </span>
          <span  className='fs-6 ms-3 text-grey fw-bold'>  4.05</span>
          </div>

          </div>
          <h5 className='fw-bold mt-4'>₦2,800.00</h5>
          
          <div className="d-flex gap-3 my-4">
            <div>
                <h6 className='fw-bold my-2 ms-1'>Available Sizes</h6>
                <div className="d-flex gap-2" >
                    <button type="button" className="btn btn-white aval-btn fw-bold">S</button>
                    <button type="button" className="btn btn-white aval-btn fw-bold">M</button>
                    <button type="button" className="btn btn-white aval-btn fw-bold">L</button>
                    <button type="button" className="btn btn-white aval-btn fw-bold">XL</button>
                </div>
            </div>
            <div className=''>
                <h6 className='fw-bold my-2 ms-2'>Available Colours</h6>
                <div>
                    <span className='color-circle blue'></span>
                    <span className='color-circle purple'></span>
                    <span className='color-circle orange'></span>
                    <span className='color-circle black'></span>
                </div>
            </div>
          </div>


            <div className="my-3 d-flex gap-4">
                <div className='d-flex '>
                   <button type="button" className="btn btn-danger decre-btn" onClick={handleIncrement}><i class="bi bi-plus"></i></button>
                   <input type="text"  value={quantity} className='form-control text-center fw-bold input-decre '  readOnly/>
                   <button type="button" className="btn btn-danger decre-btn" onClick={handleDecrement}><i class="bi bi-dash"></i></button>
                </div>

                <button type="button " className="btn btn-outline-danger btn-lg btn-large-wish "><i class="bi bi-heart"></i><small className='ms-3'>Wishlist</small></button>
            </div>
            <div className=" my-4">
            <a href="CheckOut" type="button" className="btn btn-danger btn-cart-plus " > <span className='text-start'><i class="bi bi-cart-plus fs-5"></i></span><span className='ms-3 fs-6'>Add to Cart</span></a>
            </div>
        </div>

      </div>

      <div className="row border-rounded p-3 cart-conainer">
        <div className=" border-bottom pb-2">
           <h5 className="mt-3 mb-3 fw-bold ms-3">Product Description</h5>  
        </div>

        <div className='ms-3 mt-4'>
            <p className='this-boxer-set'>This set of boxers will make you feel comfortable. The hem doesn't ravel. It is made from cotton which allows aeration around your body. It suitable for both adults and teenagers. <br />These pair of boxers give good fit and sits appropriately, they ensure there is no unsightly bulge and they also give support to an important part of your body, which overall improves <br />your confidence. It has a comfortable cotton material. It comes in different beautiful colors and patterns.  It has cool and comfortable fit with flexible hem that doesn't ravel and comes <br />tag -free for maximum comfort. Soft breathable fabric for air movement and forms to your body for best Fit. <br />It is made of 100% premium cotton and is perfect for crotch, so you don't have to worry about ugly bumps. <br />For pure organic softness and premium lingerie support, pair this four-in-one suit with yourself or the special man in your life.</p>
        </div>
      </div>

      <div className="row border-rounded p-3 cart-conainer">
        <div className=" border-bottom pb-2">
            <h5 className="mt-3 mb-3 fw-bold ">Customer Reviews</h5>  
        </div>

        <div className=''>
            <p className='fs-6 mt-3'>PRODUCT RATINGS (1129)</p>
        </div>

        <div className='row gap-4 h-100'>
            <div className='col-lg-3 bg-light mb-2 text-center'>
            <p className='fs-2 mt-5'><span className='fw-bold'>4.5</span> <span>/5</span></p>
            <span className='text-warning fs-4'><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i> </span>
            </div>

           
            <div className='col-lg-3 mb-2'>
            <div className='d-flex '>
                <span><i className="bi bi-star-fill text-warning"></i></span>
                <p className='fw-bold ms-3'><strong>5</strong></p>
                <div className="progress w-100  ms-3 mt-2">
                    <div className="progress-bar bg-warning " style={{width: "70%"}}></div>
                </div>       
            </div>

            <div className='d-flex '>
                <span><i className="bi bi-star-fill text-warning"></i></span>
                <p className='fw-bold ms-3'><strong>4</strong></p>
                <div className="progress w-100  ms-3 mt-2">
                    <div className="progress-bar bg-warning " style={{width: "60%"}}></div>
                </div>       
            </div>

            <div className='d-flex '>
                <span><i className="bi bi-star-fill text-warning"></i></span>
                <p className='fw-bold ms-3'><strong>3</strong></p>
                <div className="progress w-100  ms-3 mt-2">
                    <div className="progress-bar bg-warning " style={{width: "50%"}}></div>
                </div>       
            </div>

            <div className='d-flex '>
                <span><i className="bi bi-star-fill text-warning"></i></span>
                <p className='fw-bold ms-3'><strong>2</strong></p>
                <div className="progress w-100  ms-3 mt-2">
                    <div className="progress-bar bg-warning " style={{width: "40%"}}></div>
                </div>       
            </div>

            <div className='d-flex '>
                <span><i className="bi bi-star-half text-warning"></i></span>
                <p className='fw-bold ms-3'><strong>1</strong></p>
                <div className="progress w-100  ms-3 mt-2">
                    <div className="progress-bar bg-warning " style={{width: "30%"}}></div>
                </div>       
            </div>
            </div>

            </div>




        <div className="d-flex justify-content-between align-items-center border-bottom p-2 mt-5">
            <h6 className="mb-0 ">PRODUCT REVIEWS (438)</h6>
            <a href="#" className='btn btn-link fw-bold text-danger text-see-all-icon text-decoration-none'>see all <span><i className="bi bi-chevron-right ms-2"></i></span></a>
        </div>

        <div className="  border-bottom p-2 my-4 good-product">
            <h6 className='fw-bold mb-3'>Good product   </h6>
            <p>The product lasts, the design is perfect I love it</p>
            <div className="d-flex mb-5 fs-10">
                <span className='text-warning custom-fonts-ss'><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i> </span>
                <span  className='fs-7 ms-3 custom-fonts-ss'>12-08-2021 by JAMES JOHN</span>
            </div>
        </div>

        <div className="  border-bottom p-2 good-product">
            <h6 className='fw-bold mb-3'>Good product   </h6>
            <p>The product lasts, the design is perfect I love it</p>
            <div className="d-flex mb-5 fs-10">
                <span className='text-warning custom-fonts-ss'><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i> </span>
                <span  className='fs-7 ms-3 custom-fonts-ss'>12-08-2021 by JAMES JOHN</span>
            </div>
        </div>

        <div className=" p-2 my-2 good-product">
            <h6 className='fw-bold mb-3'>Looks nice</h6>
            <p>The product lasts, the design is perfect I love it</p>
            <div className="d-flex mb-5 fs-10">
                <span className='text-warning custom-fonts-ss'><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i> </span>
                <span  className='fs-7 ms-3 custom-fonts-ss'>12-08-2021 by JAMES JOHN</span>
            </div>
        </div>


      </div>
      <RecentlyViewed/>
      </div>
    </>
  )
}

export default AddToCart
