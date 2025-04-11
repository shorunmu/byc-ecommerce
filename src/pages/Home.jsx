import React, {useState, useEffect} from 'react'
import { Cardone, Cardthree, Cardtwo, Frame166, Frame167, Frame168, Framefive, Framefour, Frameone, Frameonegni, Frameonsvni, Frameonsxni, Framesix, Framethree, Frametwo, Groupeightfour } from '../assets'
import BycBlogNews from '../components/BycBlogNews'

const Home = () => {
  const words = ["yourself", "women", "kids"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentIndex((prevIndex)=>{
        const nextIndex = (prevIndex + 1) % words.length;
        setCurrentWord(words[nextIndex]);
        return nextIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <>

    {/* first section of this homepage that include the words and the buttons */}
      <div className="container my-5 ">
        <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-1"></div>
          <div className="col-sm-12 col-md-12 col-lg-10 text-center">
            <h5 className="">Your body deserve comfort</h5>
            <h2 className="fw-bold fs-1 getthebest">Get the best for <span style={{
              display:"inline-block", 
              width: "100px",
              textAlign:"center"
            }}>{currentWord}</span></h2>
          </div>
        <div className="col-sm-12 col-md-12 col-lg-1"></div>

        <div className="col-sm-12 col-md-12 col-lg-1"></div>
          <div className="col-sm-12 col-md-12 col-lg-10 text-center justify-content-center d-flex gap-4 white-and-black-btn my-3 ">
            <button type="button" className="btn btn-primary btn-lg first-btn">Shop Now</button>
            <button type="button" className="btn btn-secondary btn-lg sec-btn">Learn more</button>
          </div>
        <div className="col-sm-12 col-md-12 col-lg-1"></div>
        </div>
      </div>

      {/* this homepage first section ends here +++++++++++++++++++++++++++++++ */}


     {/* the homepage second section start here it only include the three images on the section  */}
      <div className="container my-5">
        <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-10">
         <img src={Groupeightfour} alt="" className='w-100' />
        </div>
        </div>
        {/* <div className="row justify-content-center ">
          <div className="col-sm-12 col-md-12 col-lg-1"></div>
          <div className="col-sm-12 col-md-12 col-lg-3 frametwo">
            <img src={Frametwo} alt=""  className=" mt-5 mx-4"/>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 framethree">
            <img src={Framethree} alt="" className=" w-100 " />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 frameone">
            <img src={Frameone} alt="" className=" mt-5" />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-1"></div>
        </div> */}
      </div>
      {/* second section of this homepage ends here  */}


     {/* third section of this homepage start here  including the header text and the three images below */}
      <div className="container my-5">
        <div className="row g-2">

        <div className="col-sm-12 col-md-12 col-lg-12 my-5 text-center">
          <h2 className='fw-bold fs-3'>Checkout BYC New Arrivals</h2>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4">
          <img src={Framefour} alt="" className='w-100' />
          <h6 className='fw-bold fs-5 pt-4'>Men Underwears</h6>
          <small className='small-etiam'>Parturient Venenatis Etiam</small>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4">
          <img src={Framefive} alt="" className='w-100'/>
          <h6 className='fw-bold fs-5 pt-4'>Women Underwears</h6>
          <small className='small-etiam'  >Parturient Venenatis Etiam</small>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4">
          <img src={Framesix} alt="" className='w-100' />
          <h6 className='fw-bold fs-5 pt-4'>Underwears</h6>
          <small className='small-etiam'>Parturient Venenatis Etiam</small>
        </div>

        <div className="view-btn text-center my-5">
            <button type="button" className="btn btn-secondary btn-lg  ">View All</button>
        </div>

        </div>
      </div>
      {/* third section of this homepage ends here  */}


{/* fourth section of this homepage start section  */}
      <div className="container mb-5 ">

        <div className="row g-2 justify-content-center">

        <div className="col-sm-12 col-md-12 col-lg-5 ">
        <div className="card the-byc-collections-row four-cards-three-img" style={{width: "100%", height: "100%"}}>
            <div className="card-body text-hfourta ">
              <h4 className="card-subtitle mb-2 text-body-secondary fw-bold ">BYC Collection 2021</h4>
              <h2 className="card-title fw-bold">BYC Collection</h2>
              <p className="card-text ">The best everyday option in a Super Saver range within a <br /> reasonable price. It is our responsibility to keep you <br /> 100 percent stylish. Be smart & trendy with us.</p>
              <a href="#" className=" btn btn-white card-link fw-bold mt-4">Explore</a>
            </div>
        </div>
        </div>
        
        <div className="col-sm-12 col-md-12 col-lg-5">
        <div className="card four-cards-three-img" style={{width: "100%"}}>
          <img src={Frame166} className="card-img-top w-100" alt="..."/>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-5">
        <div className="card four-cards-three-img" style={{width: "100%"}}>
          <img src={Frame167} className="card-img-top w-100" alt="..."/>
        </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-5">
        <div className="card four-cards-three-img" style={{width: "100%"}}>
          <img src={Frame168} className="card-img-top w-100" alt="..."/>
        </div>
        </div>

        <div className="view-btn text-center my-5">
            <button type="button" className="btn btn-secondary btn-lg  ">View All</button>
        </div>

        </div>
      </div>
{/* fourth section of this homepage ends here  */}

 {/* fifth section of this homepage start here  */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
            <h4 className='fw-bold'>Shop By Category</h4>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12  d-flex gap-4 justify-content-center p-rows ">
            <p >For Women</p>
            <p className='secoond-p'> For Men <hr className="border border-danger border-1 opacity-50"></hr></p>
            <p>For Kids</p>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12 d-flex gap-1 justify-content-center style-btn mb-5 ">
            <button className="btn btn-primary btn-text" type="submit">T-Shirt</button>
            <button className="btn btn-primary btn-text" type="submit">Singlet</button>
            <button className="btn btn-primary btn-text pant-text" type="submit">Pants</button>
            <button className="btn btn-primary btn-text" type="submit">Boxers</button>
          </div>
        </div>

        <div className="row d-flex justify-content-center g-0 this-row-images-three">
          <div className="col-sm-12 col-md-12 col-lg-3">
            <img src={Cardone} alt="" className='w-100'/>
            <div className="mt-3 px-3">
              <p className='fw-bold d-inline women-pants-text'>WOWEN PANTS </p>
              <p className='d-inline m-1 byc-fivezero-text'>BYC-501LMS</p>
              <p className='amount-naira'>₦2,800.00</p>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-3 ">
            <img src={Cardthree} alt="" className='w-100'/>
            <div className="mt-3 px-3">
              <p className='fw-bold d-inline women-pants-text'>WOWEN PANTS </p>
              <p className='d-inline ms-1 byc-fivezero-text'>BYC-501LMS</p>
              <p className='amount-naira'>₦2,800.00</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 ">
            <img src={Cardtwo} alt="" className='w-100' />
            <div className="mt-3 px-3">
              <p className='fw-bold d-inline women-pants-text'>WOWEN PANTS </p>
              <p className='d-inline m-1 byc-fivezero-text'>BYC-501LMS</p>
              <p className='amount-naira'>₦2,800.00</p>
            </div>
          </div>


          <div className="view-btn text-center my-5">
            <button type="button" className="btn btn-secondary btn-lg  ">View All</button>
          </div>
        </div>

        </div>
{/* fifth section of this homepage ends here  */}


      <div className="container my-5">
        <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 mt-2 mb-4 text-center">
          <h3 className='fw-bold fs-4'>BYC AFRICA Blog News</h3>
        </div>
        </div>

        <BycBlogNews/>
      

        <div className="view-btn text-center my-5">
            <button type="button" className="btn btn-secondary btn-lg  ">View All</button>
        </div>

      </div>


    </>
  )
}

export default Home
