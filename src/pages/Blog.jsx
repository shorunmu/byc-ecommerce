import React from 'react'
import { Authorviews, Frameonesvzr, Frameonesvzron, Frameonesvzrtw } from '../assets'

const Blog = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-1"></div>
        <div className="col-sm-12 col-md-12 col-lg-10 text-center my-5">
            <h2 className='fw-bold'>BYC AFRICA Blog News</h2>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-1"></div>

        <div className="col-sm-12 col-md-12 col-lg-1"></div>
        <div className="col-sm-12 col-md-12 col-lg-5 my-5">
            <img src={Frameonesvzr} alt="" className='w-100' />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-5 text-start  author-views my-5">
            <h6 className='mb-4 fw-bold'>Fashion trend forecast for  Summer 2021</h6>
            <small className='justify-text d-block'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet..</small>
            <a href="#" className="btn btn-primary mt-5 btn-read-more fw-bold">Read more <i class="bi bi-arrow-right fw-bold"></i></a>
            <img src={Authorviews} alt="" className='mt-4 mb-3'/>
            <p className='fw-bold p-small '> Wade Warren <small className='ms-4'>Fashion Designer</small></p>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-1"></div>

        <div className="col-sm-12 col-md-12 col-lg-1"></div>
        <div className="col-sm-12 col-md-12 col-lg-5 text-start  author-views my-5">
            <h6 className='mb-4 fw-bold'>Fashion trend forecast for  Summer 2021</h6>
            <small className='justify-text d-block'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet..</small>
            <a href="#" className="btn btn-primary mt-5 btn-read-more fw-bold">Read more <i class="bi bi-arrow-right fw-bold"></i></a>
            <img src={Authorviews} alt="" className='mt-4 mb-3'/>
            <p className='fw-bold p-small '> Wade Warren <small className='ms-4'>Fashion Designer</small></p>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-5 my-5">
            <img src={Frameonesvzron} alt="" className='w-100' />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-1"></div>

        <div className="col-sm-12 col-md-12 col-lg-1"></div>
        <div className="col-sm-12 col-md-12 col-lg-5 my-5">
            <img src={Frameonesvzrtw} alt="" className='w-100' />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-5 text-start  author-views my-5">
            <h6 className='mb-4 fw-bold'>Fashion trend forecast for  Summer 2021</h6>
            <small className='justify-text d-block'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet..</small>
            <a href="#" className="btn btn-primary mt-5 btn-read-more fw-bold">Read more <i class="bi bi-arrow-right fw-bold"></i></a>
            <img src={Authorviews} alt="" className='mt-4 mb-3'/>
            <p className='fw-bold p-small '> Wade Warren <small className='ms-4'>Fashion Designer</small></p>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-1"></div>

        </div>

        <div className="row text-center ">
        <div className=" my-5 d-flex justify-content-center gap-1 five-btn-button">
            <button class="btn btn-light " type="submit"><i class="bi bi-chevron-left"></i></button>
            <button class="btn btn-light" type="submit">1</button>
            <button class="btn btn-light" type="submit">2</button>
            <button class="btn btn-light" type="submit">3</button>
            <button class="btn btn-light" type="submit"><i class="bi bi-chevron-right"></i></button>
        </div>
        </div>
      </div>
    </>
  )
}

export default Blog
