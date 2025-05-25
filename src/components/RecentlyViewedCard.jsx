import React from 'react';
import { Boxercart } from '../assets';

// Helper to render stars based on rating
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

const RecentlyViewedCard = ({ product }) => {
  // Support both product.rating (number) and product.rating.average (object)
  const rating =
    typeof product.rating === 'object'
      ? product.rating?.average || 0
      : product.rating || 0;

  return (
    <div className="col">
      <div className="card h-100 border-0 equal-height-card">
        <img
          src={
            product.productImage && product.productImage.length > 0
              ? product.productImage[0]
              : Boxercart
          }
          className="card-img-top"
          alt={product.productName || 'Product'}
        />
        <div className="card-body framebyc-boxer-card d-flex flex-column">
          <h6 className="card-title fw-bold">{product.productName}</h6>
          <p className="card-text framebyc-boxer-card-paragraph">{product.productNumber}</p>
          <p className="framebyc-boxer-card-small lh-small">{product.productDescription}</p>
          <p className="fw-bold framebyc-boxer-card-small-p">₦{product.productPrice}</p>
          <div className="d-flex mb-2 fs-10 mt-auto">
            <span className="text-warning custom-fonts-ss">
              {renderStars(rating)}
            </span>
            <span className="fs-7 ms-3 custom-fonts-ss">
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedCard;