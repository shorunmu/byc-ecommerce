import React from 'react'
import { camisoleProducts } from '../assets'
import SortByDrop from '../components/SortByDrop'
import ToggleButton from '../components/ToggleButton'
// import ProductCard from '../components/Productcard'

const Camsole = () => {
  return (
    <>
        <div className="container my-5">
            <div className="row bg-white row-for-all-products camsole-rows">
                {/* Header with Sort Dropdown */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                <h6 className="mb-0 fw-bold ms-2">Camsole</h6>
                <div className="mb-3">
                    <SortByDrop />
                </div>
                </div>

                {/* Products Found and Toggle Button */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                <small className="mb-0 ms-2">{camisoleProducts.length} Products Found</small>
                <div>
                    <ToggleButton />
                </div>
                </div>

                {/* Product Cards */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                {camisoleProducts.map((product, index) => (
                    <div className="col" key={index}>
                    <div className="card h-100 border-0 position-relative camisole-borders">
                        <img src={product.image} className="card-img-top" alt={product.productName || 'Product'} />
                        <div className="card-body framebyc-camisole-card">
                        <h6 className="card-title fw-bold">{product.productName}</h6>
                        <p className="card-text framebyc-camisole-card-paragraph">{product.productCode}</p>
                        <p className="framebyc-camisole-card-small lh-small">{product.productDescription}</p>
                        <p className="fw-bold framebyc-camisole-card-small-p">{product.productPrice}</p>
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
                            <a className="btn btn-white white-danger-btn" href="#" role="button">
                            <span className="heartandbuy text-danger">
                                <i className="bi bi-heart"></i>
                                <span className="ms-2">Wishlist</span>
                            </span>
                            </a>
                            <a className="btn btn-danger" href="#" role="button">
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
  )
}

export default Camsole
