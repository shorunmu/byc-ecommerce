import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false); // Sidebar is closed by default
  const isActive = (path) => location.pathname === `/admin${path}`;

  return (
    <>
      {/* Show floating button only when sidebar is closed */}
      {!open && (
        <button
          className="btn btn-outline-secondary m-2"
          onClick={() => setOpen(true)}
          style={{ position: 'absolute', top: 60, left: 20, zIndex: 1050 }}
        >
          Show Menu
        </button>
      )}
      {open && (
        <nav className="bg-dark text-white p-4" style={{ width: 220, minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1040 }}>
          {/* Place the hide button inside the sidebar */}
          <button
            className="btn btn-outline-light mb-4"
            onClick={() => setOpen(false)}
            style={{ width: '100%' }}
          >
            Hide Menu
          </button>
          <h2 className="mb-4">Admin</h2>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/admin" className={`nav-link ${isActive('') ? 'active text-danger' : 'text-white'}`}>Dashboard</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/products" className={`nav-link ${isActive('/products') ? 'active text-danger' : 'text-white'}`}>Products</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/categories" className={`nav-link ${isActive('/categories') ? 'active text-danger' : 'text-white'}`}>Categories</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/orders" className={`nav-link ${isActive('/orders') ? 'active text-danger' : 'text-white'}`}>Orders</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/users" className={`nav-link ${isActive('/users') ? 'active text-danger' : 'text-white'}`}>Users</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/checkouts" className={`nav-link ${isActive('/checkouts') ? 'active text-danger' : 'text-white'}`}>Checkouts</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/blogs" className={`nav-link ${isActive('/blogs') ? 'active text-danger' : 'text-white'}`}>Blogs</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default AdminSidebar;