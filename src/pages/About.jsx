import React from 'react';
import { cardData, Frameoneseveght } from '../assets/index'; // Import cardData and Frameoneseveght from assets
import RecentlyViewed from '../components/RecentlyViewed';
import BreadCrumb from '../components/BreadCrumb';

const About = () => {
  return (
    <>
      <div className="container my-5">
        <BreadCrumb />
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-12 text-center my-5">
            <h2 className="fw-bold">ABOUT US</h2>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5">
            <img src={Frameoneseveght} alt="" className="w-100" />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5">
            <h4 className="fw-bold mt-5 pt-3 pb-3">ABOUT BYC AFRICA</h4>
            <p className="fs-5 we-are-small">
              We are the sole distributor of BYC products in <br /> Africa. We import BYC products from Korea <br /> and distribute them to African countries <br /> through Onamik Holdings Limited.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 text-center my-5">
            <h3 className="fw-bold">WHAT OUR RECORD SAYS</h3>
          </div>
        </div>

        {/* Dynamically Render Cards */}
        <div className="row g-4 gy-4 about-us-page">
          {cardData.map((card) => (
            <div className="col-sm-12 col-md-12 col-lg-4" key={card.id}>
              <div className="card dashicons-wors" style={{ width: "100%" }}>
                <img src={card.image} className="card-img-top mt-4 ms-3 mb-2" alt={card.title} />
                <div className="card-body">
                  <small className="card-text">{card.description}</small>
                  <h5 className="fw-bold mt-4 mb-4">{card.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        <RecentlyViewed />
      </div>
    </>
  );
};

export default About;
