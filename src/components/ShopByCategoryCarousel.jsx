import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const categories = [
  { label: 'For Women', value: 'women' },
  { label: 'For Men', value: 'men' },
  { label: 'For Kids', value: 'children' }
];

const subcategories = ['T-Shirt', 'Singlet', 'Pants', 'Boxers'];

const ShopByCategoryCarousel = () => {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('men');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Singlet');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/products`),
      axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    ]).then(([prodRes, catRes]) => {
      setProducts(prodRes.data || []);
      setCategoryList(catRes.data || []);
      setLoading(false);
    });
  }, []);

  // Map category to name (handles both object and string id)
  const getCategoryName = (cat) => {
    if (cat && typeof cat === 'object' && cat.name) {
      return cat.name.toLowerCase();
    }
    const found = categoryList.find(c => c._id === cat);
    return found ? found.name.toLowerCase() : '';
  };

  // Filter products by selected category and subcategory
  const filtered = products.filter(
    p =>
      getCategoryName(p.category) === selectedCategory.toLowerCase() &&
      p.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase()
  );

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  // Reset showAll when category or subcategory changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 mb-3 text-center">
          <h4 className='fw-bold'>Shop By Category</h4>
        </div>
        <div className="col-12 d-flex gap-4 justify-content-center p-rows">
          {categories.map(cat => (
            <p
              key={cat.value}
              className={selectedCategory === cat.value ? 'fw-bold text-danger' : ''}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </p>
          ))}
        </div>
        <div className="col-12 d-flex gap-1 justify-content-center style-btn mb-5">
          {subcategories.map(sub => (
            <button
              key={sub}
              className={`btn btn-text ${selectedSubcategory === sub ? 'btn-success text-white fw-bold' : 'btn-primary'}`}
              type="button"
              onClick={() => setSelectedSubcategory(sub)}
              style={{
                border: selectedSubcategory === sub ? '2px solid #198754' : '',
                backgroundColor: selectedSubcategory === sub ? '#198754' : '',
                color: selectedSubcategory === sub ? '#fff' : '',
                fontWeight: selectedSubcategory === sub ? 'bold' : '',
                transition: 'all 0.2s'
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <>
            {!showAll ? (
              <>
                <Carousel responsive={responsive} infinite autoPlay={false}>
                  {filtered.map(product => (
                    <div key={product._id} className="p-1">
                      <div
                        className="card h-100"
                        style={{
                          border: 'none',
                          boxShadow: 'none',
                          borderRadius: 0,
                          minHeight: 340
                        }}
                      >
                        <img
                          src={product.productImage?.[0]}
                          alt={product.productName}
                          className="card-img-top"
                          style={{
                            height: 300,
                            objectFit: 'cover',
                            borderRadius: 0,
                            width: '100%'
                          }}
                        />
                        <div className="card-body px-3 py-2">
                          <div className="d-flex align-items-center mb-1">
                            <h6 className="fw-bold mb-0" style={{ fontSize: 16 }}>{product.productName}</h6>
                            <span className="ms-2 text-muted" style={{ fontSize: 14 }}>{product.productNumber}</span>
                          </div>
                          <div>
                            <span className="fw-bold text-danger" style={{ fontSize: 16 }}>
                              ₦{product.productPrice?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
                <div className="view-btn text-center my-4">
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => setShowAll(true)}
                  >
                    View All
                  </button>
                </div>
              </>
            ) : (
              <div className="row">
                {filtered.map(product => (
                  <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div
                      className="card h-100"
                      style={{
                        border: 'none',
                        boxShadow: 'none',
                        borderRadius: 0,
                        minHeight: 340
                      }}
                    >
                      <img
                        src={product.productImage?.[0]}
                        alt={product.productName}
                        className="card-img-top"
                        style={{
                          height: 300,
                          objectFit: 'cover',
                          borderRadius: 0,
                          width: '100%'
                        }}
                      />
                      <div className="card-body px-3 py-2">
                        <div className="d-flex align-items-center mb-1">
                          <h6 className="fw-bold mb-0" style={{ fontSize: 16 }}>{product.productName}</h6>
                          <span className="ms-2 text-muted" style={{ fontSize: 14 }}>{product.productNumber}</span>
                        </div>
                        <div>
                          <span className="fw-bold text-danger" style={{ fontSize: 16 }}>
                            ₦{product.productPrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center my-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowAll(false)}
                  >
                    Show Carousel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Carousel arrow custom CSS */}
      <style>
        {`
        .react-multi-carousel-arrow {
          z-index: 2;
        }
        .react-multi-carousel-arrow--left {
          left: -30px !important;
        }
        .react-multi-carousel-arrow--right {
          right: -30px !important;
        }
        `}
      </style>
    </div>
  );
};

export default ShopByCategoryCarousel;