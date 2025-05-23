import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import RecentlyViewed from '../components/RecentlyViewed';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items from the API
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'You are not logged in.',
          text: 'Redirecting to login...',
        });
        navigate('/login');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/carts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(response.data.items || []);
      setTotalAmount(response.data.totalAmount || 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        Swal.fire({
          icon: 'warning',
          title: 'Unauthorized access.',
          text: 'Please log in again.',
        });
        navigate('/login');
      } else if (error.response?.status === 404) {
        // Cart not found (empty cart)
        setCartItems([]);
        setTotalAmount(0);
        setError('Your cart is empty. Start shopping now!');
      } else {
        setError('Sorry, we could not load your cart. Please try again later.');
        Swal.fire({
          icon: 'error',
          title: 'Error fetching cart',
          text: error.response?.data?.message || error.message,
        });
        console.error('Error fetching cart:', error.response?.data || error.message);
      }
    }
  };

  // Update cart items in the API
  const updateCart = async (updatedItems) => {
    try {
      const token = localStorage.getItem('token');
      const itemsForBackend = updatedItems.map(item => ({
        product: typeof item.product === 'object' ? item.product._id : item.product,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }));
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/carts`,
        {
          items: itemsForBackend,
          totalAmount: calculateTotal(updatedItems),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(response.data.items || []);
      setTotalAmount(response.data.totalAmount || 0);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error updating cart',
        text: error.response?.data?.message || error.message,
      });
      console.error('Error updating cart:', error.response?.data || error.message);
    }
  };

  // Calculate total price
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.product?.productPrice || 0) * item.quantity, 0);
  };

  // Handle incrementing quantity
  const handleIncrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.product && item.product._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // Handle decrementing quantity
  const handleDecrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.product && item.product._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  // Handle removing an item (removes only one item)
  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter((item) => item.product && item.product._id !== id);
        updateCart(updatedCart);
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'Item has been removed from your cart.',
          timer: 1200,
          showConfirmButton: false
        });
      }
    });
  };

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cart is empty',
        text: 'Add some products to your cart before proceeding to checkout.',
      });
      return;
    }
    navigate('/Checkout', { state: { cartItems, total: totalAmount } });
  };

  // Handle Continue Shopping
  const handleContinueShopping = () => {
    navigate('/AllProducts');
  };

  // Clear the cart (removes all items)
  const clearCart = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove all items from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear cart!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`${import.meta.env.VITE_API_URL}/carts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems([]);
          setTotalAmount(0);
          Swal.fire({
            icon: 'success',
            title: 'Cart cleared!',
            timer: 1200,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error clearing cart',
            text: error.response?.data?.message || error.message,
          });
          console.error('Error clearing cart:', error.response?.data || error.message);
        }
      }
    });
  };

  // Add to wishlist using backend API
  const handleAddToWishlist = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Not logged in',
        text: 'You must be logged in to add to wishlist.',
      });
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist/add`,
        { productId: item.product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist!',
        timer: 1200,
        showConfirmButton: false
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'info',
          title: 'Already in Wishlist',
          text: 'This item is already in your wishlist.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to add product to wishlist.',
        });
      }
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container my-5">
        {loading ? (
          <div className="text-center my-5">
            <h5>Loading your cart...</h5>
          </div>
        ) : error ? (
          <div className="text-center my-5">
            <h5>{error}</h5>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center my-5">
            <h5>Your cart is empty.</h5>
          </div>
        ) : (
          <div className="row border-rounded p-3 cart-container">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <h6 className="my-2 fw-bold ms-3">
                Cart {cartItems.length} item(s)
              </h6>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>

            {/* Map through cart items */}
            {cartItems.map((item, idx) =>
              item.product ? (
                <div className="row border-bottom" key={`${item.product._id}-${item.size}-${item.color}-${idx}`}>
                  <div className="col-lg-2 my-5">
                    <img
                      src={
                        (item.product.productImage && item.product.productImage[0]) ||
                        'https://via.placeholder.com/150'
                      }
                      alt={item.product.productName || 'Product'}
                      className="w-100"
                    />
                  </div>
                  <div className="col-lg-5 border-end my-5">
                    <h5 className="fw-bold">{item.product.productName || 'Unknown Product'}</h5>
                    <p><strong>{item.product.productNumber || 'N/A'}</strong></p>
                    <p>{item.product.productDescription || 'No description available.'}</p>
                    <div className="d-flex gap-4 carting-btn">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm btn-large-1"
                        onClick={() => handleAddToWishlist(item)}
                      >
                        <i className="bi bi-heart"></i>
                        <small className="ms-3">Wishlist</small>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm btn-large-2"
                        onClick={() => handleRemove(item.product._id)}
                      >
                        <i className="bi bi-trash"></i>
                        <small className="ms-3">Remove</small>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-2 border-end my-5">
                    <p className="text-center mb-3">Quantity</p>
                    <div className="d-flex increments-btn justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleIncrement(item.product._id)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        className="form-control text-center fw-bold"
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDecrement(item.product._id)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-2 my-5">
                    <p className="text-center">Unit Price</p>
                    <h5 className="text-center fw-bold mt-4">
                      ₦{(item.product.productPrice || 0).toLocaleString()}
                    </h5>
                  </div>
                </div>
              ) : (
                <div key={idx} className="row border-bottom">
                  <p className="text-danger">Invalid product data. Please remove this item.</p>
                </div>
              )
            )}

            {/* Cart Totals Section */}
            <div className="row cart-totals d-flex justify-content-end">
              <div className="col-lg-5">
                <h5 className="fw-bold my-2">CART TOTALS</h5>
                <p className="d-flex justify-content-between my-3">
                  <span>Subtotal</span>
                  <span className="me-5">₦{totalAmount.toLocaleString()}</span>
                </p>
                <p className="d-flex justify-content-between mb-5">
                  <span>Total</span>
                  <span className="me-5">₦{totalAmount.toLocaleString()}</span>
                </p>
                <div className="d-flex gap-4 mt-5 continue-shopping-btn">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm btn-large-3"
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm btn-large-3"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <RecentlyViewed />
      </div>
    </>
  );
};

export default Cart;
