import React from 'react'
import { Frameonefiveeight, Frameonefiveseven, Frameonefivesix, Rectangle } from '../assets'
import RecentlyViewed from '../components/RecentlyViewed'
import BreadCrumb from '../components/BreadCrumb'

const Contact = () => {
  return (
    <>
      <div className="container my-5">

        <BreadCrumb/>
        <div className="row ">
        <div className="col-sm-12 col-md-12 col-lg-12  text-center mb-4">
            <h3 className='fw-bold'>CONTACT US</h3>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-12 my-5">
            <img src={Rectangle} alt=""  className='w-100'/>
        </div>

        <div className="row bg-light p-4  frameseight-six">
        <div className="col-sm-12 col-md-12 col-lg-4 d-flex gap-4 address-phone">
          <img src={Frameonefiveeight} alt="" className='' / >
          <div className='mt-2'>
            <h5 className='fw-bold mb-0 '>ADDRESS</h5>
            <small>( Head Office )  <br /> 175 Cameroun Road Aba, Abia State.</small>
          </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4 d-flex gap-4 address-phone">
          <img src={Frameonefiveseven} alt="" className='' / >
          <div className='mt-3'>
            <h5 className='fw-bold mb-0'>PHONE </h5>
            <small>08101375376 09053403403</small>
          </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4 d-flex gap-4 address-phone">
          <img src={Frameonefivesix} alt="" className='' / >
          <div className='mt-3'>
            <h5 className='fw-bold mb-0'>EMAIL ADDRESS</h5>
            <small> BYCAFRICA@gmail.com</small>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-5 my-5 ">
            <div className='mb-5 mt-5'>
            <h3 className='fw-bold'>Drop a Message</h3>
            </div>


            <form>
              <div className="mb-4">
                <label htmlFor="phoneInput" className="form-label">Phone</label>
                <input type="tel" className="form-control form-control-bod" id="phoneInput" aria-describedby="phoneHelp" />
              </div>
              <div className="mb-4">
                <label htmlFor="emailInput" className="form-label">Email Address</label>
                <input type="email" className="form-control form-control-bod" id="emailInput" />
              </div>
              <div className="mb-4">
                <label htmlFor="notesInput" className="form-label">Notes</label>
                <textarea className="form-control form-control-bod p-3" id="notesInput" rows="4"></textarea>
              </div>

              <div className="d-grid my-5">
                <button className="btn btn-danger" type="submit">Submit</button>
              </div>
            </form>
        </div>
        
        </div>
        <RecentlyViewed/>
        
      </div>
    </>
  )
}

export default Contact
