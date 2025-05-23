import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Trusted } from '../assets';

const DELIVERY_FEE = 2500;

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], total = 0 } = location.state || {};

  // Step control
  const [step, setStep] = useState(1);

  // Form state
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    country: '',
    city: '',
    state: '',
    phone: '',
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle shipping form submit
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // Helper: get valid order items from cartItems
  const getOrderItems = () =>
    cartItems
      .filter(item => item.product && item.product._id)
      .map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.productPrice,
        size: item.size,
        color: item.color,
      }))
      .filter(item =>
        item.product && typeof item.price === 'number' && !isNaN(item.price) && item.price > 0
      );

  // Async handler for Paystack success
  const handlePaystackSuccess = async (response, token) => {
    setLoading(true);
    const orderItems = getOrderItems();

    try {
      if (orderItems.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No valid products in cart!',
        });
        setLoading(false);
        return;
      }
      // 1. Create Order
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          items: orderItems,
          totalAmount: total + DELIVERY_FEE,
          status: 'Processing',
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // 2. Create Checkout
      await axios.post(
        `${import.meta.env.VITE_API_URL}/checkouts`,
        {
          ...form,
          paymentMethod: 'Secured Online Payment',
          paymentStatus: 'Paid',
          order: orderRes.data._id,
          deliveryFee: DELIVERY_FEE,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // 3. Clear backend cart
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/carts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        // Optionally handle error, but don't block navigation
      }
      // 4. Clear localStorage cart (if used anywhere)
      localStorage.removeItem('cartItems');
      Swal.fire({
        icon: 'success',
        title: 'Order placed and payment successful!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/');
    } catch (err) {
      console.error('Order placement error:', err.response?.data || err.message || err);
      Swal.fire({
        icon: 'error',
        title: 'Order placement failed after payment.',
      });
    }
    setLoading(false);
  };

  // Place order with Paystack or Bank Transfer
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id || user?.id;

    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'User not found. Please log in again.',
      });
      return;
    }

    const orderItems = getOrderItems();
    if (orderItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No valid products in cart!',
      });
      return;
    }

    if (paymentMethod === 'onlinePayment') {
      if (!window.PaystackPop) {
        Swal.fire({
          icon: 'error',
          title: 'Paystack script not loaded!',
        });
        return;
      }
      window.PaystackPop.setup({
        key: 'pk_test_f86d24eb88b8c18a8f38e3e73610b3a78e6557c6',
        email: form.email,
        amount: (total + DELIVERY_FEE) * 100,
        currency: 'NGN',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        callback: function (response) {
          handlePaystackSuccess(response, token);
        },
        onClose: function () {
          Swal.fire({
            icon: 'info',
            title: 'Payment window closed.',
          });
        },
      }).openIframe();
    } else {
      // Bank Transfer: just create order and checkout with status Pending
      const placeBankOrder = async () => {
        setLoading(true);
        try {
          // 1. Create Order
          const orderRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/orders`,
            {
              items: orderItems,
              totalAmount: total + DELIVERY_FEE,
              status: 'Pending',
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          // 2. Create Checkout
          await axios.post(
            `${import.meta.env.VITE_API_URL}/checkouts`,
            {
              ...form,
              paymentMethod: 'Direct Bank Transfer',
              paymentStatus: 'Pending',
              order: orderRes.data._id,
              deliveryFee: DELIVERY_FEE,
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          // 3. Clear backend cart
          try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/carts`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch (err) {
            // Optionally handle error, but don't block navigation
          }
          // 4. Clear localStorage cart (if used anywhere)
          localStorage.removeItem('cartItems');
          Swal.fire({
            icon: 'success',
            title: 'Order placed!',
            text: 'Please check your email for bank transfer instructions.',
            timer: 2500,
            showConfirmButton: false
          });
          navigate('/');
        } catch (err) {
          console.error('Order placement error:', err.response?.data || err.message || err);
          Swal.fire({
            icon: 'error',
            title: 'Order placement failed.',
          });
        }
        setLoading(false);
      };
      placeBankOrder();
    }
  };

  return (
    <div className="container my-5">
      <div className="row border-rounded p-3 cart-conainer checkout-here">
        <div className="border-bottom pb-2">
          <h6 className="my-3 fw-bold ms-3">
            Order Summary {cartItems.length} item(s)
          </h6>
        </div>
        {/* Cart Items */}
        {cartItems.map((item, idx) => (
          <div className="row border-bottom" key={item.product?._id || idx}>
            <div className="col-lg-2 my-5">
              <img
                src={
                  (item.product?.productImage && item.product.productImage[0]) ||
                  'https://via.placeholder.com/150'
                }
                alt={item.product?.productName || 'Product'}
                className="w-100"
              />
            </div>
            <div className="col-lg-5 my-5">
              <div className="border-end">
                <h5 className="fw-bold">{item.product?.productName || 'Unknown Product'}</h5>
                <p><strong>{item.product?.productNumber || 'N/A'}</strong> </p>
                <p className="mb-2">{item.product?.productDescription || 'No description available.'}</p>
                <h5 className="fw-bold mt-4">₦{(item.product?.productPrice || 0).toLocaleString()}</h5>
                <p className="mb-3">
                  Quantity: <span className="ms-3">{item.quantity}</span>
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm btn-large-1"
                  onClick={() => {
                    navigate('/AddToCart', { state: { product: item.product } });
                  }}
                >
                  Modify Cart
                </button>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="mt-5 mb-2 mx-3 border-bottom">
                <p className="d-flex justify-content-between my-3">
                  <span>Subtotal</span>
                  <span className="me-5">
                    ₦{((item.product?.productPrice || 0) * item.quantity).toLocaleString()}
                  </span>
                </p>
                <p className="d-flex justify-content-between my-4">
                  <span>Delivery fee</span>
                  <span className="me-5">₦{DELIVERY_FEE.toLocaleString()}</span>
                </p>
              </div>
              <div>
                <p className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span className="me-5">₦{(total + DELIVERY_FEE).toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <form className="row" onSubmit={handleShippingSubmit}>
            <div className="d-flex align-items-center border-bottom pb-2">
              <h5 className="mt-5 mb-3 fw-bold ms-3">SHIPPING ADDRESS</h5>
              <h5 className="mt-5 mb-3 fw-bold ms-5 checkout-mag">CHECKOUT</h5>
            </div>
            <div className="col-lg-5">
              <div className="mb-2 mx-3 the-email-input">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="mb-2 mx-3 the-email-input">
                <label htmlFor="companyName" className="form-label">Company Name (Optional)</label>
                <input type="text" className="form-control" id="companyName" value={form.companyName} onChange={handleChange} />
              </div>
              <div className="mb-2 mx-3 the-email-input">
                <label htmlFor="country" className="form-label">Country / Region</label>
                <input type="text" className="form-control" id="country" value={form.country} onChange={handleChange} required />
              </div>
              <div className="mb-2 mx-3 the-email-input">
                <label htmlFor="city" className="form-label">Town / City</label>
                <input type="text" className="form-control" id="city" value={form.city} onChange={handleChange} required />
              </div>
              <div className="mb-2 mx-3 the-email-input">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" className="form-control" id="state" value={form.state} onChange={handleChange} required />
              </div>
              <div className="mb-2 mx-3 the-email-input">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="mb-2 mx-3 the-email-input">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mx-3 my-5">
                <button type="submit" className="btn btn-danger w-100 login-btn">
                  Submit Shipping Info
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Payment Section */}
        {step === 2 && (
          <form className="row" onSubmit={handlePlaceOrder}>
            <div className="col-lg-6 mt-4 ms-auto">
              <h5 className="mt-5 mb-3 fw-bold ms-5 checkout-lg-sm">CHECKOUT</h5>
              <div className="bg-light">
                <div className="trusted-section">
                  <input
                    type="radio"
                    id="bankTransfer"
                    name="paymentMethod"
                    value="bankTransfer"
                    checked={paymentMethod === 'bankTransfer'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="bankTransfer" className="form-label">
                    <small className="ms-3">Direct bank transfer</small>
                  </label>
                  <div className="ms-4 mt-3 mx-5">
                    <p className="text-muted small pragrapgh-text text-align bg-white py-3 px-3">
                      Make your payment directly into our bank account. <br />
                      Please use your Order ID as the payment reference. <br />
                      Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  </div>
                  <div className="d-flex my-4 secured-bnk">
                    <div>
                      <input
                        type="radio"
                        id="onlinePayment"
                        name="paymentMethod"
                        value="onlinePayment"
                        checked={paymentMethod === 'onlinePayment'}
                        onChange={handlePaymentChange}
                      />
                      <label htmlFor="onlinePayment">
                        <small className="ms-3">Secured Online Payment</small>
                      </label>
                    </div>
                    <div className="ms-5 trusted-img">
                      <img src={Trusted} alt="" className="" />
                    </div>
                  </div>
                  <div className="personal-data justify-content-center d-flex my-5">
                    <small className="fw-bold your-personal">
                      Your personal data will be used to process your order, support your experience
                      throughout this website, and for other purposes described in our privacy
                      policy.
                    </small>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <button type="submit" className="btn btn-danger w-100 login-btn" disabled={loading}>
                  {loading
                    ? (paymentMethod === 'onlinePayment' ? 'Processing Payment...' : 'Placing Order...')
                    : (paymentMethod === 'onlinePayment' ? 'Pay with Paystack' : 'Place Order')}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
