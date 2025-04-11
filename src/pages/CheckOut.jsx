import React from 'react'
import { Menboxerimgone, Trusted } from '../assets'

const CheckOut = () => {

  return (
    <>
      <div className="container my-5">
        <div className="row border-rounded p-3 cart-conainer checkout-here">

            <div className=" border-bottom pb-2">
                <h6 className="my-3 fw-bold ms-3">Order Summary  1 item(s)  </h6>  
            </div>

            <div className="row  border-bottom ">
                <div className="col-lg-2 my-5"> 
                    <img src={Menboxerimgone} alt="" className='w-100' />
                </div>

                <div className="col-lg-5 my-5">
                    <div className="border-end">
                        <h5 className='fw-bold'>MEN BOXERS <br />BYC 1166</h5>
                        <p className='mb-2 '> 100% Cotton 12 Pieces Of Mens Boxer </p>
                        <h5 className=' fw-bold mt-4'>₦2,800.00</h5>
                        <p className=' mb-3'>Quantity: <span className='ms-3'>1</span></p>
                    </div>
                    <div className=""><button type="button " className="btn btn-danger btn-sm btn-large-1 ">Modify Cart </button></div>
                </div>
                
                <div className="col-lg-5">
                    <div className="mt-5 mb-2 mx-3 border-bottom">
                       <p className=' d-flex justify-content-between my-3'> <span>Subtotal </span> <span className='me-5'>₦2,800.00</span> </p>
                       <p className=' d-flex justify-content-between my-4'> <span>Delivery fee</span> <span className='me-5'>₦2,800.00</span> </p>
                    </div>

                    <div className=''>
                       <p className=' d-flex justify-content-between  fw-bold'> <span>Total</span> <span className='me-5'>₦2,800.00</span> </p>
                    </div>

                </div>

            </div>

            <div className="row ">
            <div className="d-flex  align-items-center border-bottom pb-2">
                <h5 className="mt-5 mb-3 fw-bold ms-3">SHIPPING ADDRESS</h5>  
                <h5 className="mt-5 mb-3 fw-bold ms-3">SHIPPING ADDRESS</h5>  
            </div>
            <div className="col-lg-5">
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">Full Name </label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">Company name (optional)</label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">Country / Region</label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">Town / City</label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">State </label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">State </label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">Phone</label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-2 mx-3  the-email-input">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mx-3 my-5"><button type="submit" className="btn btn-danger w-100 login-btn">submit</button></div>
            </div>

            <div className='d-none d-sm-block d-lg-none'>
                <p>CHECKOUT</p>
            </div>

            <div className="col-lg-6 mt-4 ms-auto">
                <div className='bg-light'>
                <div className=" trusted-section ">
                    <input type="radio" id='bankTranfer' className=''  name='paymentOption' checked />
                    <label htmlFor="bankTransfer" className='form-label'><small className='ms-3'> Direct bank transfer</small></label>
                    <div className='ms-4 mt-3 mx-5'><p className="text-muted small pragrapgh-text text-align bg-white py-3 px-3">Make your payment directly into our bank account. <br />Please use your Order ID as the payment reference. <br />Your order will not be shipped until the funds have cleared in our account.</p></div>
                    <div className='d-flex  my-4'> 
                        <div className=''>
                        <input type="radio" className='' />
                        <label htmlFor=""><small className='ms-3 '>Secured Online Payment</small> </label>
                        </div>
                        <div className='ms-5 trusted-img'><img src={ Trusted} alt="" className='' /></div>
                    </div>
                    <div className=" personal-data justify-content-center d-flex my-5"><small className='fw-bold your-personal'>Your personal data will be used to process your order, support your experience throughout <br />this website, and for other purposes described in our privacy policy.</small></div>

                </div>
                </div>
                <div className=" my-5 "><button type="submit" className="btn btn-danger w-100 login-btn">place order</button></div>

            </div>
            </div>



        </div>
      </div>
    </>
  )
}

export default CheckOut
