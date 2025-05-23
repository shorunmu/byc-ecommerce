import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const navigate = useNavigate();

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
    setError('');
    setFullName('');
    setEmail('');
    setPassword('');
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth', {
        email,
        password,
      });

      // Handle successful login
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${user.name || email}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setEmail('');
      setPassword('');
      navigate('/');
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data || 'Please try again.',
      });
    }
  };

  // Handle account creation form submission
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        name: fullName,
        email,
        password,
      });

      // Handle successful account creation
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'Your account has been created successfully. Please navigate to the login page to log in.',
        timer: 3000,
        showConfirmButton: true,
      }).then(() => {
        setShowModal(false);
        setFullName('');
        setEmail('');
        setPassword('');
        navigate('/LogIn');
      });
    } catch (err) {
      setError(err.response?.data || 'Account creation failed. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Account Creation Failed',
        text: err.response?.data || 'Please try again.',
      });
    }
  };

  // Handle forgot password form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/password/forgot-password', { email: forgotEmail });
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'If this email exists, a reset link has been sent.',
      });
      setShowForgotModal(false);
      setForgotEmail('');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data || 'Failed to send reset email.',
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setEmail('');
    setPassword('');
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
    navigate('/LogIn');
  };

  // Automatic logout after 30 minutes of inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.removeItem('token');
      setEmail('');
      setPassword('');
      Swal.fire({
        icon: 'info',
        title: 'Session Expired',
        text: 'You have been logged out due to inactivity.',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/LogIn');
    }, 30 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center login-sigmup-rows border-rounded p-3 login-sing-up">
          {/* Login Section */}
          <div className="col-sm-12 col-md-12 col-lg-6 my-5 border-end h-100">
            <h5 className="my-5 text-center fw-bold">Login</h5>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleLogin} autoComplete="off">
              <div className="mb-4 mx-5 the-email-input">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="new-email"
                />
              </div>
              <div className="mb-4 mx-5 the-email-input">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control custom-red-border"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="form-check mb-4 mx-5 the-email-input">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label ms-3" htmlFor="rememberMe">Remember me</label>
                <a
                  href="#"
                  className="text-decoration-none text-dark ms-5 remember-me"
                  onClick={e => { e.preventDefault(); setShowForgotModal(true); }}
                >
                  Forgot your password?
                </a>
              </div>
              <div className="mx-5">
                <button type="submit" className="btn btn-danger w-100 login-btn">LOGIN</button>
              </div>
            </form>
          </div>

          {/* Create Account Section */}
          <div className="col-sm-12 col-md-12 col-lg-6 text-center my-5 h-100">
            <div className="mx-5 create-section">
              <h5 className="my-5 fw-bold">Create Your Account</h5>
              <p className="my-5">Create your customer account in just a few clicks! <br /> You can register using your e-mail address.</p>
              <button
                type="button"
                className="btn btn-danger w-100 mt-5 create-btn"
                onClick={toggleModal}
              >
                CREATE AN ACCOUNT VIA E-MAIL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Account Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Account</h3>
            <form onSubmit={handleCreateAccount} autoComplete="off">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">Create Account</button>
              <button
                type="button"
                className="btn btn-secondary mt-3 ms-2"
                onClick={toggleModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Forgot Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger mt-3">Send Reset Link</button>
              <button
                type="button"
                className="btn btn-secondary mt-3 ms-2"
                onClick={() => setShowForgotModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
