import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const navigate = useNavigate();

  // Fetch wishlist from backend on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginMsg(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500); // Show message for 2.5 seconds before redirect
      return;
    }
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setWishlistItems(
          (data || []).map((product) => ({
            id: product._id,
            image: product.productImage?.[0] || 'https://via.placeholder.com/150',
            name: product.productName,
            number: product.productNumber,
            description: product.productDescription,
            price: product.productPrice,
            rating: product.rating,
            size: product.size,
            color: product.color,
          }))
        );
      } catch (err) {
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [navigate]);

  // Remove from wishlist using backend
  const handleRemoveFromWishlist = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/remove`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data;
      setWishlistItems(
        (data || []).map((product) => ({
          id: product._id,
          image: product.productImage?.[0] || 'https://via.placeholder.com/150',
          name: product.productName,
          number: product.productNumber,
          description: product.productDescription,
          price: product.productPrice,
          rating: product.rating,
          size: product.size,
          color: product.color,
        }))
      );
      alert('Item removed from wishlist!');
    } catch (err) {
      alert('Failed to remove item from wishlist.');
    }
  };

  // Add to cart using backend API
  const handleAddToCart = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add to cart.');
      return;
    }

    try {
      // 1. Fetch current cart
      let items = [];
      let totalAmount = 0;
      try {
        const cartRes = await axios.get(`${import.meta.env.VITE_API_URL}/carts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cartData = cartRes.data;
        items = cartData.items || [];
      } catch (err) {
        // If cart not found, start with empty cart
      }

      // 2. Add or update the item
      const itemIndex = items.findIndex((cartItem) =>
        ((cartItem.product && cartItem.product._id) || cartItem.product) === (item.id || item._id) &&
        cartItem.size === item.size &&
        cartItem.color === item.color
      );

      if (itemIndex !== -1) {
        items[itemIndex].quantity += 1;
      } else {
        items.push({
          product: item.id || item._id,
          quantity: 1,
          size: item.size,
          color: item.color,
        });
      }

      // 3. Calculate totalAmount
      totalAmount = items.reduce(
        (sum, cartItem) =>
          sum +
          ((cartItem.product && cartItem.product.price
            ? cartItem.product.price
            : item.price || 0) * cartItem.quantity),
        0
      );

      // 4. POST updated cart
      await axios.post(
        `${import.meta.env.VITE_API_URL}/carts`,
        {
          items: items.map((i) => ({
            product: typeof i.product === 'string' ? i.product : i.product._id || i.product,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
          totalAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Item added to cart!');
    } catch (error) {
      alert('Failed to add item to cart.');
    }
  };

  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxStars - filledStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(filledStars)].map((_, i) => (
          <i key={`filled-${i}`} className="bi bi-star-fill text-warning"></i>
        ))}
        {halfStar && <i className="bi bi-star-half text-warning"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
        ))}
      </>
    );
  };

  if (showLoginMsg) {
    return (
      <div className="container my-5">
        <div className="text-center my-5">
          <h5>Please log in to view your wishlist.</h5>
        </div>
      </div>
    );
  }

  // Filter out null/undefined items for safety
  const filteredWishlist = wishlistItems.filter(Boolean);

  return (
    <>
      <div className="container my-5">
        <div className="row bg-white">
          <div className="align-items-center pb-2">
            <h5 className="mb-0 fw-bold ms-2">Wishlist</h5>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
            {loading ? (
              <div className="text-center my-5">
                <h5>Loading...</h5>
              </div>
            ) : filteredWishlist.length > 0 ? (
              filteredWishlist.map((item, index) => {
                // SAFER fallback for rating (handles null rating object)
                const rating =
                  item && item.rating && typeof item.rating.average === 'number'
                    ? item.rating.average
                    : 0;
                return (
                  <div className="col" key={item.id || index}>
                    <div className="card h-100 border-0 camisole-borders">
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.name}
                      />
                      <div className="card-body framebyc-camisole-card">
                        <h6 className="card-title fw-bold">{item.name}</h6>
                        <p className="card-text framebyc-camisole-card-paragraph">
                          <strong>{item.number || 'BYC 1166'}</strong>
                        </p>
                        <p className="framebyc-camisole-card-small lh-small">
                          {item.description || 'No description available.'}
                        </p>
                        <p className="fw-bold framebyc-camisole-card-small-p">
                          ₦{item.price ? item.price.toLocaleString() : '0.00'}
                        </p>
                        <div className="d-flex mb-2 fs-10">
                          <span className="text-warning custom-fonts-ss">
                            {renderStars(rating)}
                          </span>
                          <span className="fs-7 ms-2 custom-fonts-ss">
                            {rating}
                          </span>
                        </div>

                        <div className="d-flex gap-2 mb-2 card-buttons">
                          {/* Remove Button */}
                          <button
                            className="btn btn-white white-danger-btn btn-sm"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <span className="heartandbuy text-danger">
                              <i className="bi bi-x"></i>
                              <span className="ms-2">Remove</span>
                            </span>
                          </button>

                          {/* Buy Now Button */}
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleAddToCart(item)}
                          >
                            <span className="heartandbuy">
                              <i className="bi bi-cart3"></i>
                              <span className="ms-2">Buy Now</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center my-5">
                <h5>Your wishlist is empty.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
