import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentlyViewed from '../components/RecentlyViewed';
import SortByDrop from '../components/SortByDrop';
import ToggleButton from '../components/ToggleButton';
import axios from 'axios';
import Pagination from '../components/Pagination';
import ProductCard from '../components/Productcard';

const PRODUCTS_PER_PAGE = 25;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    navigate('/AddToCart', { state: { product } });
  };

  // Pagination logic
  const filteredProducts = products.filter(Boolean);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

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
        ) : filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
            {paginatedProducts.map((product, index) => (
              <ProductCard
                key={product._id || product.id || index}
                product={product}
              />
            ))}
          </div>
        )}
        <div className="allproduct-pagination">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
      <RecentlyViewed />
    </div>
  );
};

export default AllProducts;
