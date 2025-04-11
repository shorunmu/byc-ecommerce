import React from 'react'

const LogIn = () => {
  return (
    <>
            <div className="container my-5 ">
            <div className="row justify-content-center login-sigmup-rows border-rounded p-3 login-sing-up ">
            {/* <!-- Login Section --> */}
            <div className="col-sm-12 col-md-12 col-lg-6 my-5 border-end h-100 ">
                <h5 className="my-5 text-center fw-bold">Login</h5>
                <form>
                <div className="mb-4 mx-5 the-email-input">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="email" className="form-control" id="email" placeholder=""/>
                </div>
                <div className="mb-4 mx-5 the-email-input">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control custom-red-border" id="password" placeholder=""/>
                </div>
                <div className="form-check mb-4 mx-5 the-email-input">
                    <input type="checkbox" className="form-check-input" id="rememberMe"/>
                    <label className="form-check-label ms-3" for="rememberMe">Remember me</label>
                    <a href="#" className="text-decoration-none text-dark ms-5 remember-me">Forgot your password?</a>
                </div>

                <div className="mx-5"><button type="submit" className="btn btn-danger w-100 login-btn">LOGIN</button></div>
                </form>


            </div>

   

            {/* <!-- Create Account Section --> */}
            <div className="col-sm-12 col-md-12 col-lg-6 text-center my-5 h-100">
                <div className="mx-5 create-section">
                <h5 className="my-5 fw-bold">Create Your Account</h5>
                <p className="my-5">Create your customer account in just a few clicks! <br /> You can register using your e-mail address.</p>
                <button type="button" className="btn btn-danger w-100 mt-5">CREATE AN ACCOUNT VIA E-MAIL</button>
                </div>
                
            </div>
            </div>
        </div>
    </>
  )
}

export default LogIn
