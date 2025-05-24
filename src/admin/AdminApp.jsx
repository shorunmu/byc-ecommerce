import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import DashboardHome from './DashboardHome';
import ProductList from './Products/ProductList';
import OrderList from './Orders/OrderList';
import UserList from './Users/UserList';
import CheckoutList from './checkouts/CheckoutList';
import CategoryList from './categories/CategoryList';
import BlogList from './blogs/BlogList';

const AdminApp = () => (
  <div className="d-flex min-vh-100 mt-5">
    <AdminSidebar />
    <div className="flex-grow-1 p-4 bg-light">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/checkouts" element={<CheckoutList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </div>
);

export default AdminApp;