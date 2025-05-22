import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/Productcard';
import SortByDrop from '../components/SortByDrop';
import ToggleButton from '../components/ToggleButton';
import Pagination from '../components/Pagination';
import RecentlyViewed from '../components/RecentlyViewed';

const CategoryProducts = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('http://localhost:3000/api/products'),
          axios.get('http://localhost:3000/api/categories'),
        ]);
        setProducts(prodRes.data || []);
        setCategories(catRes.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Find the category object by name (case-insensitive)
  const categoryObj = categories.find(
    c => c.name.toLowerCase() === category.toLowerCase()
  );

  // Robust filter for both string and object id
  const filtered = categoryObj
    ? products.filter(p => {
        const prodCat =
          typeof p.category === 'object' && p.category !== null
            ? p.category._id || p.category.$oid || ''
            : p.category;
        return (
          String(prodCat) === String(categoryObj._id) &&
          p.subcategory &&
          p.subcategory.toLowerCase() === subcategory.toLowerCase()
        );
      })
    : [];

  const handleBuyNow = product => {
    navigate('/AddToCart', { state: { product } });
  };

  return (
    <div className="container my-5">
      <div className="row bg-white row-for-all-products">
        <div className="d-flex justify-content-between align-items-center border-bottom mt-4">
          <h5 className="mb-0 fw-bold ms-2">
            {categoryObj ? categoryObj.name : category} / {subcategory}
          </h5>
          <div className="mb-3">
            <SortByDrop />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
          <h6 className="mb-0 fw-bold ms-2">{}</h6>
          <div>
            <ToggleButton />
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filtered.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
            {filtered.map((product, index) => (
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

export default CategoryProducts;