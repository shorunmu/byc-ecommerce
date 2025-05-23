import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Function to render stars based on the product rating
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

  // Handle "Buy Now" button click
  const handleBuyNow = () => {
    navigate('/AddToCart', { state: { product } });
  };

  // Handle "Add to Wishlist" button click
  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add to wishlist.');
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist/add`,
        { productId: product._id || product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Product added to wishlist!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('This item is already in your wishlist.');
      } else {
        alert('Failed to add product to wishlist.');
      }
    }
  };

  return (
    <div className="col my-3">
      <div className="card h-100 border-0 position-relative camisole-border">
        {/* Product Image */}
        <img
          src={product.productImage[0]}
          className="card-img-top"
          alt={product.productName || 'Product'}
        />

        {/* Product Details */}
        <div className="card-body framebyc-camisole-card">
          <h5 className="card-title fw-bold">{product.productName}</h5>
          <p className="card-text framebyc-camisole-card-paragraph">
            <strong>{product.productNumber}</strong>
          </p>
          <p className="framebyc-camisole-card-small lh-small">{product.productDescription}</p>
          <p className="fw-bold framebyc-camisole-card-small-p">
            ₦{product.productPrice.toLocaleString()}
          </p>

          {/* Product Rating */}
          <div className="d-flex mb-2 fs-10">
            <span className="text-warning custom-fonts-ss">
              {renderStars(product.rating?.average || 0)}
            </span>
            {product.rating?.numberOfRatings > 0 && (
              <span className="fs-7 ms-2 custom-fonts-ss">
                ({product.rating.numberOfRatings})
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2 mb-2 card-buttons">
            <button
              type="button"
              className="btn btn-white white-danger-btn btn-sm"
              onClick={handleAddToWishlist}
            >
              <span className="heartandbuy text-danger">
                <i className="bi bi-heart"></i>
                <span className="ms-2">Wishlist</span>
              </span>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleBuyNow}
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
};

export default ProductCard;