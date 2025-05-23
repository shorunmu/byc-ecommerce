import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Boxercart } from '../assets';
import RecentlyViewed from '../components/RecentlyViewed';
import ImageCarousel from '../components/ImageCarousel';

const AddToCart = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(false);

  // Save to recently viewed on backend when product changes
  useEffect(() => {
    if (!product) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.post(
      `${import.meta.env.VITE_API_URL}/recentlyViews`,
      { productId: product._id || product.id },
      { headers: { Authorization: `Bearer ${token}` } }
    ).catch(() => {});
  }, [product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Size & Color',
        text: 'Please select a size and color before adding to cart.',
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'You must be logged in to add to cart.',
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Fetch current cart
      let items = [];
      let totalAmount = 0;
      try {
        const cartRes = await axios.get(`${import.meta.env.VITE_API_URL}/carts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        items = cartRes.data.items || [];
      } catch (err) {
        // If cart not found, start with empty cart
        if (!err.response || err.response.status !== 404) throw err;
      }

      // 2. Add or update the item
      const itemIndex = items.findIndex((item) => {
        let itemProductId = null;
        if (item.product && typeof item.product === 'object') {
          itemProductId = item.product._id;
        } else if (item.product) {
          itemProductId = item.product;
        }
        const currentProductId = product._id || product.id;
        return (
          itemProductId === currentProductId &&
          item.size === selectedSize &&
          item.color === selectedColor
        );
      });

      if (itemIndex !== -1) {
        items[itemIndex].quantity += quantity;
      } else {
        items.push({
          product: product._id || product.id,
          quantity,
          size: selectedSize,
          color: selectedColor
        });
      }

      // 3. Calculate totalAmount
      totalAmount = items.reduce(
        (sum, item) =>
          sum +
          ((item.product && item.product.price
            ? item.product.price
            : product.productPrice || 0) * item.quantity),
        0
      );

      // 4. POST updated cart
      await axios.post(
        `${import.meta.env.VITE_API_URL}/carts`,
        {
          items: items
            .filter(i =>
              (typeof i.product === 'string' && i.product) ||
              (i.product && typeof i.product === 'object' && i.product._id)
            )
            .map(i => ({
              product:
                typeof i.product === 'string'
                  ? i.product
                  : i.product && i.product._id
                    ? i.product._id
                    : '',
              quantity: i.quantity,
              size: i.size,
              color: i.color
            })),
          totalAmount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: 'Product added to cart successfully!',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response
          ? `Backend error: ${JSON.stringify(error.response.data)}`
          : 'Failed to add product to cart.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add to wishlist using backend API
  const handleAddToWishlist = async () => {
    if (!selectedSize || !selectedColor) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Size & Color',
        text: 'Please select a size and color before adding to wishlist.',
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'You must be logged in to add to wishlist.',
      });
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist/add`,
        { productId: product._id || product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist',
        text: 'Product added to wishlist successfully!',
        timer: 1500,
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

  if (!product) {
    Swal.fire({
      icon: 'error',
      title: 'No Product Selected',
      text: 'Please go back and select a product.',
    });
    return <p>No product selected. Please go back and select a product.</p>;
  }

  return (
    <>
      <div className="container my-5">
        <div className="row border-rounded p-3 cart-conainer">
          <div className="col-lg-4 mt-4">
            <ImageCarousel images={product.productImage && product.productImage.length > 0 ? product.productImage : [Boxercart]} />
          </div>

          <div className="col-lg-6 ms-5 mt-4 mb-5 men-boxer-text">
            <div className="border-bottom">
              <h5 className="fw-bold">{product.productName || 'MEN BOXERS'}</h5>
              <p>
                <strong>{product.productNumber || 'BYC 1166'}</strong>
              </p>
              <p>{product.productDescription || '100% Cotton 12 Pieces Of Mens Boxer'}</p>

              <div className="d-flex mb-4 fs-10">
                <span className="text-warning">{renderStars(product.rating?.average || 0)}</span>
                <span className="fs-6 ms-3 text-grey fw-bold">
                  {product.rating?.average || 0}
                </span>
              </div>
            </div>
            <h5 className="fw-bold mt-4">₦{product.productPrice?.toLocaleString() || '2,800.00'}</h5>

            <div className="d-flex gap-3 my-4 color-btn-size-btn">
              <div className="sizes-section">
                <h6 className="fw-bold my-2 ms-1">Available Sizes</h6>
                <div className="d-flex gap-2 size-btns">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`btn btn-white aval-btn fw-bold ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="colors-section">
                <h6 className="fw-bold my-2 ms-2 available-colors">Available Colours</h6>
                <div className="size-btns">
                  {['blue', 'purple', 'orange', 'black'].map((color) => (
                    <span
                      key={color}
                      className={`color-circle ${color} ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        cursor: 'pointer',
                        border: selectedColor === color ? '2px solid black' : 'none',
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-3 d-flex gap-4 button-fx-btn">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-danger decre-btn"
                  onClick={handleDecrement}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <input
                  type="text"
                  value={quantity}
                  className="form-control text-center fw-bold input-decre"
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-danger decre-btn"
                  onClick={handleIncrement}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              <button
                type="button"
                className="btn btn-outline-danger btn-lg btn-large-wish"
                onClick={handleAddToWishlist}
              >
                <i className="bi bi-heart"></i>
                <small className="ms-3">Wishlist</small>
              </button>
            </div>
            <div className="my-4">
              <button
                type="button"
                className="btn btn-danger btn-cart-plus"
                onClick={handleAddToCart}
                disabled={loading}
              >
                <span className="text-start">
                  <i className="bi bi-cart-plus fs-5"></i>
                </span>
                <span className="ms-3 fs-6 add-to-cart">
                  {loading ? 'Adding...' : 'Add to Cart'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="row border-rounded p-3 cart-conainer">
          <div className="border-bottom pb-2">
            <h5 className="mt-3 mb-3 fw-bold ms-3">Product Description</h5>
          </div>

          <div className="ms-3 mt-4 boxer-sext">
            <p className="this-boxer-set">
              {product.productDetails || "No details available for this product."}
            </p>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="row border-rounded p-3 cart-conainer">
          <div className="border-bottom pb-2">
            <h5 className="mt-3 mb-3 fw-bold ">Customer Reviews</h5>
          </div>

          <div className="">
            <p className="fs-6 mt-3">PRODUCT RATINGS (1129)</p>
          </div>

          <div className="row gap-4 h-100">
            <div className="col-lg-3 bg-light mb-2 text-center">
              <p className="fs-2 mt-5">
                <span className="fw-bold">4.5</span> <span>/5</span>
              </p>
              <span className="text-warning fs-4">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>{" "}
              </span>
            </div>

            <div className="col-lg-3 mb-2">
              <div className="d-flex ">
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <p className="fw-bold ms-3">
                  <strong>5</strong>
                </p>
                <div className="progress w-100  ms-3 mt-2">
                  <div
                    className="progress-bar bg-warning "
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>

              <div className="d-flex ">
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <p className="fw-bold ms-3">
                  <strong>4</strong>
                </p>
                <div className="progress w-100  ms-3 mt-2">
                  <div
                    className="progress-bar bg-warning "
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div className="d-flex ">
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <p className="fw-bold ms-3">
                  <strong>3</strong>
                </p>
                <div className="progress w-100  ms-3 mt-2">
                  <div
                    className="progress-bar bg-warning "
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>

              <div className="d-flex ">
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <p className="fw-bold ms-3">
                  <strong>2</strong>
                </p>
                <div className="progress w-100  ms-3 mt-2">
                  <div
                    className="progress-bar bg-warning "
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>

              <div className="d-flex ">
                <span>
                  <i className="bi bi-star-half text-warning"></i>
                </span>
                <p className="fw-bold ms-3">
                  <strong>1</strong>
                </p>
                <div className="progress w-100  ms-3 mt-2">
                  <div
                    className="progress-bar bg-warning "
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center border-bottom p-2 mt-5">
            <h6 className="mb-0 ">PRODUCT REVIEWS (438)</h6>
            <a
              href="#"
              className="btn btn-link fw-bold text-danger text-see-all-icon text-decoration-none"
            >
              see all{" "}
              <span>
                <i className="bi bi-chevron-right ms-2"></i>
              </span>
            </a>
          </div>

          <div className="border-bottom p-2 my-4 good-product">
            <h6 className="fw-bold mb-3">Good product </h6>
            <p>The product lasts, the design is perfect I love it</p>
            <div className="d-flex mb-5 fs-10">
              <span className="text-warning custom-fonts-ss">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>{" "}
              </span>
              <span className="fs-7 ms-3 custom-fonts-ss">
                12-08-2021 by JAMES JOHN
              </span>
            </div>
          </div>

          <div className="border-bottom p-2 good-product">
            <h6 className="fw-bold mb-3">Good product </h6>
            <p>The product lasts, the design is perfect I love it</p>
            <div className="d-flex mb-5 fs-10">
              <span className="text-warning custom-fonts-ss">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>{" "}
              </span>
              <span className="fs-7 ms-3 custom-fonts-ss">
                12-08-2021 by JAMES JOHN
              </span>
            </div>
          </div>

          <div className="p-2 my-2 good-product">
            <h6 className="fw-bold mb-3">Looks nice</h6>
            <p>The product lasts, the design is perfect I love it</p>
            <div className="d-flex mb-5 fs-10">
              <span className="text-warning custom-fonts-ss">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>{" "}
              </span>
              <span className="fs-7 ms-3 custom-fonts-ss">
                12-08-2021 by JAMES JOHN
              </span>
            </div>
          </div>
        </div>
        <RecentlyViewed />
      </div>
    </>
  );
};

export default AddToCart;
