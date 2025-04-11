import React from 'react'
import { Frameonegni, Frameonsvni, Frameonsxni, Viewsandlove } from '../assets'

const BycBlogNews = () => {
  return (
    <>

    {/* this component is a reuseable component and it was used twice */}
      <div className="container my-5 ">
        <div className="row g-3 ">
        <div className="col-sm-12 col-md-12 col-lg-4   ">
        <div className="card blognews-frames " style={{width: '100%'}}>
          <img src={Frameonsxni} className="card-img-top " alt="Fissure in Sandstone" />
          <div className="card-body frames-blognews">  
          <div class="card mb-3  viewsandloveicons bg-primary" style={{maxWidth: "540px"}}>
              <div class="row g-0 ">
                <div class="col-md-4 d-flex gap-4 ">
                  <img src={Viewsandlove} class="img-fluid rounded-start" alt="..."/>
                  <p className='d-flex mt-4 gap-2 ms-4'><i class="bi bi-eye"></i>35</p>
                  <p className='d-flex mt-4 gap-2'><i class="bi bi-heart"></i>23</p>
                </div>

              </div>
          </div>

            <div className='mb-5'><p className='fw-bold p-small '> Wade Warren <small className='ms-4'>Fashion Designer</small></p></div>

            <h5 className="card-title fw-bold mb-4">How important are clothes in your style?</h5>
            <p className="card-text justify-text blognewsframes-p">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            <a href="#" className="btn btn-primary mt-4 mb-5 btn-read-more fw-bold">Read more <i class="bi bi-arrow-right fw-bold"></i></a>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4   ">
        <div className="card blognews-frames " style={{width: '100%'}}>
          <img src={Frameonsvni} className="card-img-top " alt="Fissure in Sandstone" />
          <div className="card-body frames-blognews">  
          <div class="card mb-3  viewsandloveicons bg-primary" style={{maxWidth: "540px"}}>
              <div class="row g-0 ">
                <div class="col-md-4 d-flex gap-4 ">
                  <img src={Viewsandlove} class="img-fluid rounded-start" alt="..."/>
                  <p className='d-flex mt-4 gap-2 ms-4'><i class="bi bi-eye"></i>35</p>
                  <p className='d-flex mt-4 gap-2'><i class="bi bi-heart"></i>23</p>
                </div>

              </div>
          </div>

            <div className='mb-5'><p className='fw-bold p-small '> Wade Warren <small className='ms-4'>Fashion Designer</small></p></div>

            <h5 className="card-title fw-bold mb-4">How important are pants in your style?</h5>
            <p className="card-text justify-text blognewsframes-p">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            <a href="#" className="btn btn-primary mt-4 mb-5 btn-read-more fw-bold">Read more <i class="bi bi-arrow-right fw-bold"></i></a>
          </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4   ">
        <div className="card blognews-frames " style={{width: '100%'}}>
          <img src={Frameonegni} className="card-img-top " alt="Fissure in Sandstone" />
          <div className="card-body frames-blognews">  
          <div class="card mb-3  viewsandloveicons bg-primary" style={{maxWidth: "540px"}}>
              <div class="row g-0 ">
                <div class="col-md-4 d-flex gap-4 ">
                  <img src={Viewsandlove} class="img-fluid rounded-start" alt="..."/>
                  <p className='d-flex mt-4 gap-2 ms-4'><i class="bi bi-eye"></i>35</p>
                  <p className='d-flex mt-4 gap-2'><i class="bi bi-heart"></i>23</p>
                </div>

              </div>
          </div>

            <div className='mb-5'><p className='fw-bold p-small '> Wade Warren <small className='ms-4'>Fashion Designer</small></p></div>

            <h5 className="card-title fw-bold mb-4">How important are shoes in your style?</h5>
            <p className="card-text justify-text blognewsframes-p">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            <a href="MoreBlognews" className="btn btn-primary mt-4 mb-5 btn-read-more fw-bold">Read more <i class="bi bi-arrow-right fw-bold"></i></a>
          </div>
        </div>
        </div>

        </div>
      </div>
    </>
  )
}

export default BycBlogNews
