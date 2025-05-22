import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentlyViewed from '../components/RecentlyViewed';
import SortByDrop from '../components/SortByDrop';
import ToggleButton from '../components/ToggleButton';
import axios from 'axios';
import Pagination from '../components/Pagination';
import ProductCard from '../components/Productcard';

const AllProducts = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // React Router's navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); // Fetch products from API
        setProducts(response.data || []); // Set the response data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add to recently viewed on backend before navigating to AddToCart
  const handleBuyNow = async (product) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(
          'http://localhost:3000/api/recentlyViews',
          { productId: product._id || product.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        // Optionally handle error, but don't block navigation
      }
    }
    navigate('/AddToCart', { state: { product } }); // Pass product data to AddToCart
  };

  return (
    <div className="container my-5">
      <div className="row bg-white row-for-all-products">
        <div className="d-flex justify-content-between align-items-center border-bottom mt-4">
          <h5 className="mb-0 fw-bold ms-2">All Products</h5>
          <div className="mb-3">
            <SortByDrop />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
          <h6 className="mb-0 fw-bold ms-2"> {} </h6>
          <div>
            <ToggleButton />
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                navigate={navigate}
                handleBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}

        <div className="allproduct-pagination">
          <Pagination />
        </div>
      </div>

      <RecentlyViewed />
    </div>
  );
};

export default AllProducts;
