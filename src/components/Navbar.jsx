import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BYCLOGO from '../assets/BYCLOGO.png';
import axios from 'axios';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setTimeout(() => {
      if (searchInputRef.current) searchInputRef.current.focus();
    }, 200);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm('');
    setSearchResults([]);
    setSearching(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setSearching(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchResults(res.data || []);
    } catch (err) {
      setSearchResults([]);
    }
  };

  const location = useLocation();
  const path = location.pathname;
  const darkBgPage = ['/wishlist'];
  const isDarkBg = darkBgPage.includes(path);

  const [openMenus, setOpenMenus] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const firstName = userObj ? userObj.name?.split(' ')[0].slice(0, 3) : '';

  // Fetch categories from backend
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Swal.fire({
      title: 'Logout Successful',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/LogIn');
    });
  };

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Swal.fire({
        title: 'Session Expired',
        text: 'You have been logged out due to inactivity.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/LogIn');
      });
    }, 30 * 60 * 1000);

    const resetTimer = () => {
      clearTimeout(logoutTimer);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [navigate]);

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 3000);
    setHoverTimeout(timeout);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Only one submenu open at a time, but keep shopDropdown open
  const toggleSubMenu = (menuKey, event) => {
    event.preventDefault();
    setOpenMenus((prevMenus) => {
      const newMenus = { shopDropdown: true };
      newMenus[menuKey] = !prevMenus[menuKey];
      return newMenus;
    });
  };

  // Filter categories for main menu
  const mainCategories = ['children', 'men', 'women'];
  const filteredCategories = categories.filter(cat =>
    mainCategories.includes(cat.name.toLowerCase())
  );

  // For positioning submenu under each menu item
  const menuRefs = useRef({});

  // Custom styles for submenu spacing
  const submenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    minWidth: '180px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
    zIndex: 2000,
    padding: '10px 0',
    marginTop: '8px'
  };

  const submenuItemStyle = {
    margin: '8px 0',
    fontWeight: 500,
    fontSize: '1rem',
    paddingLeft: '18px',
    paddingRight: '18px',
    letterSpacing: '0.5px',
    lineHeight: '2.2rem',
    whiteSpace: 'nowrap'
  };

  // --- Mobile Shop Products Dropdown State ---
  const [showMobileShopDropdown, setShowMobileShopDropdown] = useState(false);

  return (
    <>
      <nav
        className={`navbar py-4 navbar-expand-lg ${isDarkBg ? 'navbar-dark bg-dark text-white' : 'navbar-light bg-white text-dark'}`}
      >
        <div className="container-fluid position-relative">
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand mx-auto d-lg-none" to="/">
            <img src={BYCLOGO} alt="Logo" style={{ height: '40px' }} />
          </Link>

          <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
            <Link className="navbar-brand" to="/">
              <img src={BYCLOGO} alt="Logo" style={{ height: '50px' }} />
            </Link>
          </div>

          <div className="d-lg-none position-relative">
            {userObj ? (
              <div
                className="user-icon bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: '50px',
                  height: '50px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title="Account"
              >
                {firstName.toUpperCase()}
                {showDropdown && (
                  <div
                    className="user-dropdown-menu position-absolute"
                    style={{
                      top: '60px',
                      right: '0',
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      zIndex: '1000',
                      padding: '10px',
                    }}
                  >
                    <button
                      className="user-dropdown-item text-danger"
                      onClick={handleLogout}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: 'red',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/LogIn">
                <i className="bi bi-person fs-4"></i>
              </Link>
            )}
          </div>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-none d-lg-flex w-100 justify-content-between align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item dropdown me-3" style={{ position: 'relative' }}>
                  <a
                    href="#"
                    className={`nav-link dropdown-toggle ${isDarkBg ? 'text-white' : 'text-dark'}`}
                    role="button"
                    onClick={(e) => toggleSubMenu('shopDropdown', e)}
                  >
                    Shop Products
                  </a>
                  <ul className={`dropdown-menu dropdown-menu-shop ${openMenus['shopDropdown'] ? 'show' : ''}`}>
                    <li>
                      <Link className="dropdown-item my-3 fs-3 fw-bold" to="Allproducts">
                        ALL PRODUCTS
                      </Link>
                    </li>
                    <li
                      className="dropdown-header text-white d-flex py-3 bg-danger"
                      style={{ justifyContent: 'flex-start', gap: '100px', position: 'relative' }}
                    >
                      {filteredCategories.map(cat => (
                        <div
                          key={cat._id}
                          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                          ref={el => menuRefs.current[cat.name] = el}
                        >
                          <a
                            href="#"
                            className="text-white fw-bold fs-6"
                            onClick={e => toggleSubMenu(cat.name, e)}
                            style={{
                              letterSpacing: 1,
                              fontSize: '1.1rem',
                              textDecoration: 'none',
                              padding: '2px 0',
                              borderBottom: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {cat.name.toUpperCase()} <i className={`bi ${openMenus[cat.name] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                          </a>
                          {openMenus[cat.name] && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                ...submenuStyle,
                                left: 0,
                                top: '110%',
                                minWidth: '180px',
                                background: '#f8f9fa',
                              }}
                            >
                              {cat.subcategories && cat.subcategories.map(sub => (
                                <li className="dropdown-item" key={sub} style={submenuItemStyle}>
                                  <Link to={`/products/${cat.name}/${sub}`} style={{ textDecoration: 'none', color: '#212529' }}>
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </li>
                  </ul>
                </li>
                <li className="nav-item me-2">
                  <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="blog">
                    Blog
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="">
                    FAQ
                  </Link>
                </li>
                {/* Admin link only visible to admin beside FAQ */}
                {userObj && userObj.isAdmin && (
                  <li className="nav-item me-2">
                    <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="/admin">
                      Admin
                    </Link>
                  </li>
                )}
              </ul>

              <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item me-2">
                  <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="About">
                    About Us
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="Contact">
                    Contact
                  </Link>
                </li>
                {/* Expanding Search Button */}
                <li className="nav-item me-2 position-relative">
                  {!showSearch && (
                    <a className="nav-link" href="#" onClick={toggleSearch}>
                      <i className="bi bi-search"></i>
                    </a>
                  )}
                </li>
                <li className="nav-item me-2">
                  {userObj ? (
                    <div
                      className="position-relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={toggleDropdown}
                    >
                      <div
                        className="user-icon bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                        title="Account"
                      >
                        {firstName.toUpperCase()}
                      </div>
                      {showDropdown && (
                        <div
                          className="user-dropdown-menu position-absolute"
                          style={{
                            top: '50px',
                            right: '0',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            zIndex: '1000',
                          }}
                        >
                          <button
                            className="user-dropdown-item text-danger"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/LogIn">
                      <i className="bi bi-person fs-4"></i>
                    </Link>
                  )}
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="wishlist">
                    <i className="bi bi-heart"></i>
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="cart">
                    <i className="bi bi-cart"></i>
                  </Link>
                </li>
              </ul>
            </div>

            {/* MOBILE MENU */}
            <div className="d-lg-none mt-3">
              <ul className="navbar-nav">
                {/* Shop Products with categories and subcategories */}
                <li>
                  <span
                    className="nav-link fw-bold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowMobileShopDropdown(prev => !prev)}
                  >
                    Shop Products
                    <i className={`ms-2 bi ${showMobileShopDropdown ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </span>
                  {showMobileShopDropdown && (
                    <ul className="list-unstyled ms-3">
                      <li>
                        <Link className="nav-link fw-bold" to="Allproducts">
                          ALL PRODUCTS
                        </Link>
                      </li>
                      {filteredCategories.map(cat => (
                        <li key={cat._id}>
                          <span className="fw-bold">{cat.name.toUpperCase()}</span>
                          <ul className="list-unstyled ms-3">
                            {cat.subcategories && cat.subcategories.map(sub => (
                              <li key={sub}>
                                <Link to={`/products/${cat.name}/${sub}`} className="nav-link">
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li>
                  <Link className="nav-link" to="blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    FAQ
                  </a>
                </li>
                {/* Admin link only visible to admin beside FAQ in mobile */}
                {userObj && userObj.isAdmin && (
                  <li>
                    <Link className="nav-link" to="/admin">
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Link className="nav-link" to="About">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="Contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <a className="nav-link" href="#" onClick={toggleSearch}>
                    <i className="bi bi-search"></i> Search
                  </a>
                </li>
                <li>
                  <Link className="nav-link" to="LogIn">
                    <i className="bi bi-person"></i> Account
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="wishlist">
                    <i className="bi bi-heart"></i> Wishlist
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="cart">
                    <i className="bi bi-cart"></i> Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Expanding Search Overlay */}
      {showSearch && (
        <div className="search-overlay" onClick={closeSearch}>
          <div className="search-box-animated" onClick={e => e.stopPropagation()}>
            <input
              ref={searchInputRef}
              type="text"
              className="form-control search-input"
              placeholder="Search product..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
              autoFocus
            />
            <button className="btn btn-danger ms-2" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button>
            <button className="btn btn-light ms-2" onClick={closeSearch}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          {/* Search Results Dropdown */}
          {searching && (
            <div className="search-results-dropdown-2">
              {searchResults.length === 0 ? (
                <div className="p-2 text-muted">No products found.</div>
              ) : (
                searchResults.map(product => (
                  <Link
                    key={product._id || product.id}
                    to={`/AddToCart`}
                    state={{ product }}
                    className="dropdown-item"
                    onClick={closeSearch}
                  >
                    {product.productName}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Styles for the animated search */}
      <style>{`
        .dropdown-menu-shop {
          min-width: 300px;
        }
        .dropdown-submenu.show > .dropdown-menu {
          display: block;
        }
        .dropdown-submenu > .dropdown-menu {
          display: none;
        }
        .dropdown-header a,
        .dropdown-menu a {
          text-decoration: none !important;
        }
        .search-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.95);
          z-index: 3000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .search-box-animated {
          margin-top: 80px;
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          padding: 12px 24px;
          width: 90%;
          max-width: 500px;
          animation: expandSearchBox 0.4s;
        }
        @keyframes expandSearchBox {
          from { transform: scaleX(0.7); opacity: 0 }
          to { transform: scaleX(1); opacity: 1 }
        }
        .search-input {
          border: none;
          outline: none;
          font-size: 1.2rem;
          background: transparent;
          width: 100%;
          box-shadow: none;
        }
        .search-results-dropdown-2 {
          margin-top: 10px;
          width: 90%;
          max-width: 500px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          max-height: 300px;
          overflow-y: auto;
        }
        .search-results-dropdown-2 .dropdown-item {
          padding: 14px 24px;
          font-size: 1.1rem;
          border-bottom: 1px solid #f1f1f1;
          color: #212529;
          transition: background 0.2s;
        }
        .search-results-dropdown-2 .dropdown-item:last-child {
          border-bottom: none;
        }
        .search-results-dropdown-2 .dropdown-item:hover {
          background: #f8f9fa;
        }
      `}</style>
    </>
  );
};

export default Navbar;