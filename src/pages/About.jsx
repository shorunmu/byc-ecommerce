import React from 'react'
import { Dashiconsawards, Frameoneseveght } from '../assets'
import RecentlyViewed from '../components/RecentlyViewed'

const About = () => {
  return (
    <>
      <div className="container my-5  ">
        <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-12 text-center my-5 ">
          <h2 className='fw-bold'>ABOUT US</h2>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-5  ">
          <img src={Frameoneseveght} alt="" className='w-100' />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-5 ">
          <h4 className='fw-bold mt-5 pt-3 pb-3'>ABOUT BYC AFRICA</h4>
          <p className='fs-5'>We are the sole distributor of BYC products in <br /> Africa. We import BYC products from Korea <br /> and distribute them to African countries <br /> through Onamik Holdings Limited.</p>
        </div>
        </div>

        <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 text-center my-5">
          <h3 className='fw-bold'>WHAT OUR RECORD SAYS</h3>
        </div>
        </div>


       <div className="row  g-4 gy-4 about-us-page  ">
        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2  " alt="..."/ >
          <div class="card-body">
            <small class="card-text justify-text ">Gold Prize for the Best Listed Firm awarded <br /> by Daesin Economy Research Institute.</small>
            <h5 className='fw-bold mt-5 mb-4'>Year 1990</h5>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text ">Selected as representaive enterprise of Korea for <br />successful stategies on globalization of Korean brands <br />by Korean Traders Association.</small>
            <h5 className='fw-bold mt-4 mb-4'>Year 1993</h5>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text ">BYC' selected as the most preferred brand for <br />underwear by the Federation of Korean Women <br />Economists..</small>
            <h5 className='fw-bold mt-4 mb-4'>Year 1997</h5>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text justify-text ">Selected as the official commercializer of underwear for <br /> 1988 France Worldcup.</small>
            <h5 className='fw-bold mt-5 mb-4'>Year 1997</h5>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text ">The Prize for Export of Original Brands awarded as <br />recommended by the Korean Assoiatioon of Textile <br />Industries</small>
            <h5 className='fw-bold mt-4 mb-4'>Year 1999</h5>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text justify-text ">"The 10th Prize for the Enterprise of Economical <br /> Justice" by the enterprise Assessment commission.</small>
            <h5 className='fw-bold mt-5 mb-4'>Year 2001</h5>
          </div>
        </div>
        </div>
        
        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text ">The Prize for Export of Original Brands awarded as <br />recommended by the Korean Assoiatioon of Textile <br />Industries</small>
            <h5 className='fw-bold mt-4 mb-4'>Year 2006</h5>
          </div>
        </div>
        </div>
        
        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text ">selected by korea management association as no.1 <br />in brand influence among the men's underwear <br />companies</small>
            <h5 className='fw-bold mt-4 mb-4'>Year 2006</h5>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4  ">
        <div class="card  dashicons-wors " style={{width: "100%"}}>
          <img src={Dashiconsawards} className="card-img-top mt-4 ms-3 mb-2 " alt="..."/ >
          <div class="card-body">
            <small class="card-text justify-text ">Selected as the Best Korean Enterprise of 1992 by <br /> Korean Management Association.</small>
            <h5 className='fw-bold mt-5 mb-4'>Year 2011</h5>
          </div>
        </div>
        </div>

        </div>
      
      <RecentlyViewed/>
      </div>
    </>
  )
}

export default About
