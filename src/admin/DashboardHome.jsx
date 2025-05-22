import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => (
  <div>
    <h1 className="mb-4">Admin Dashboard</h1>
    <div className="row">
      <div className="col-lg-3 col-md-6 mb-3">
        <div className="card text-bg-primary">
          <div className="card-body">
            <h5 className="card-title">Products</h5>
            <p className="card-text">Manage all products here.</p>
            <Link to="/admin/products" className="btn btn-light btn-sm mt-2">Go to Products</Link>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <div className="card text-bg-success">
          <div className="card-body">
            <h5 className="card-title">Orders</h5>
            <p className="card-text">View and manage orders.</p>
            <Link to="/admin/orders" className="btn btn-light btn-sm mt-2">Go to Orders</Link>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <div className="card text-bg-warning">
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            <p className="card-text">Manage registered users.</p>
            <Link to="/admin/users" className="btn btn-light btn-sm mt-2">Go to Users</Link>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <div className="card text-bg-info">
          <div className="card-body">
            <h5 className="card-title">Blogs</h5>
            <p className="card-text">Manage blog posts and articles.</p>
            <Link to="/admin/blogs" className="btn btn-light btn-sm mt-2">Go to Blogs</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHome;