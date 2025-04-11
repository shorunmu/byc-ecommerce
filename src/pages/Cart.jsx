import React, {useState} from 'react'
import { Menboxerimgone } from '../assets'
import RecentlyViewed from '../components/RecentlyViewed';


const Cart = () => {
    const [quantity, setQuantity] = useState(1);
    const unitPrice = 2800; // Price per item
    const [totalPrice, setTotalPrice] = useState(unitPrice);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
        setTotalPrice((prev) => prev + unitPrice);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity(prev => prev - 1);
          setTotalPrice((prev) => prev - unitPrice);
        }   
    };

  return (
    <>
       <div className="container my-5 ">
        <div className="row border-rounded p-3 cart-conainer">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                <h6 className="my-2 fw-bold ms-3">Cart 1 item(s) </h6>  
            </div>

        <div className="row  border-bottom ">
            <div className="col-lg-2 my-5"> 
                <img src={Menboxerimgone} alt="" className='w-100' />
            </div>
            <div className="col-lg-5 border-end my-5">
                <h5 className='fw-bold'>MEN BOXERS <br />BYC 1166</h5>
                <p>100% Cotton 12 Pieces Of Mens Boxer </p>
                <div className='d-flex gap-4 carting-btn'>
                <button type="button " className="btn btn-outline-danger btn-sm btn-large-1 "><i class="bi bi-heart"></i><small className='ms-3'>Wishlist</small></button>
                <button type="button" className="btn btn-danger  btn-sm btn-large-2"><i class="bi bi-trash"></i><small className='ms-3'>Remove</small></button>
                </div>
            </div>
            <div className="col-lg-2 border-end my-5">
                <p className='text-center mb-3'>Quantity</p>
                <div className='d-flex increments-btn justify-content-center'>
                   <button type="button" className="btn btn-danger" onClick={handleIncrement}><i class="bi bi-plus"></i></button>
                   <input type="text"  value={quantity} className='form-control text-center fw-bold '  readOnly/>
                   <button type="button" className="btn btn-danger" onClick={handleDecrement}><i class="bi bi-dash"></i></button>
                </div>
            </div>

            <div className="col-lg-2 my-5">
                <p className='text-center'>Unit Price</p>
                <h5 className='text-center fw-bold mt-4'>₦2,800.00</h5>

            </div>
        </div>
        <div className="row cart-totals d-flex justify-content-end">
            <div className="col-lg-5">
                <h5 className='fw-bold my-2'>CART  TOTALS</h5>
                <p className=' d-flex justify-content-between my-3'> <span>Subtotal</span> <span className='me-5'>₦{totalPrice.toLocaleString()}</span> </p>
                <p className=' d-flex justify-content-between mb-5 '><span>Total</span> <span className='me-5'>₦{totalPrice.toLocaleString()}</span> </p>
                <div className='d-flex gap-4 mt-5 '>
                    <button type="button" className="btn btn-outline-danger  btn-sm  btn-large-3 ">Continue Shopping</button>
                    <a href="CheckOut" type="button" className="btn btn-danger btn-sm  btn-large-3 " >Proceed to Checkout</a>
                    
                </div>
            </div>
        </div>
        </div>
        <RecentlyViewed/>
       </div>

       

    
    </>
  )
}

export default Cart
