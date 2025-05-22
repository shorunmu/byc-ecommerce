import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boxerProducts } from '../assets';
import SortByDrop from '../components/SortByDrop';
import ToggleButton from '../components/ToggleButton';

const Boxers = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate(); // React Router's navigate function

  // Add to Wishlist
  const addToWishList = (product) => {
    if (!wishlist.some((item) => item.productCode === product.productCode)) {
      setWishlist([...wishlist, product]);

      // Save to localStorage
      const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      localStorage.setItem('wishlist', JSON.stringify([...existingWishlist, product]));

      alert('Product added to wishlist!');
    } else {
      alert('This item is already in your wishlist!');
    }
  };

  // Navigate to AddToCart Page with Product Details
  const buyNow = (product) => {
    navigate('/addtocart', { state: { product } });
  };

  return (
    <>
      <div className="container my-5">
        <div className="row bg-white">
          {/* Header with Sort Dropdown */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
            <h6 className="mb-0 fw-bold ms-2">Boxers</h6>
            <div className="mb-3">
              <SortByDrop />
            </div>
          </div>

          {/* Products Found and Toggle Button */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
            <small className="mb-0 ms-2">{boxerProducts.length} Products Found</small>
            <div>
              <ToggleButton />
            </div>
          </div>

          {/* Product Cards */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
            {boxerProducts.map((product, index) => (
              <div className="col" key={index}>
                <div className="card h-100 border-0 position-relative camisole-borders">
                  <img src={product.image} className="card-img-top" alt={product.productName || 'Product'} />
                  <div className="card-body framebyc-camisole-card">
                    <h6 className="card-title fw-bold">{product.productName}</h6>
                    <p className="card-text framebyc-camisole-card-paragraph">{product.productCode}</p>
                    <p className="framebyc-camisole-card-small lh-small">{product.productDescription}</p>
                    <p className="fw-bold framebyc-camisole-card-small-p">{product.productPrice.toLocaleString()}</p>
                    <div className="d-flex mb-2 fs-10">
                      <span className="text-warning custom-fonts-ss">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </span>
                      <span className="fs-7 ms-2 custom-fonts-ss">{product.ratings}</span>
                    </div>
                    <div className="d-flex gap-2 mb-2 card-buttons">
                      {/* Wishlist Button */}
                      <a
                        className="btn btn-white white-danger-btn"
                        onClick={() => addToWishList(product)}
                      >
                        <span className="heartandbuy text-danger">
                          <i className="bi bi-heart"></i>
                          <span className="ms-2">Wishlist</span>
                        </span>
                      </a>

                      {/* Buy Now Button */}
                      <a
                        className="btn btn-danger"
                        onClick={() => buyNow(product)}
                      >
                        <span className="heartandbuy">
                          <i className="bi bi-cart3"></i>
                          <span className="ms-2">Buy Now</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Boxers;
