import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const statsConfig = [
  {
    title: 'Products',
    text: 'Manage all products here.',
    link: '/admin/products',
    color: 'primary',
    icon: 'bi-box-seam'
  },
  {
    title: 'Orders',
    text: 'View and manage orders.',
    link: '/admin/orders',
    color: 'success',
    icon: 'bi-bag-check'
  },
  {
    title: 'Users',
    text: 'Manage registered users.',
    link: '/admin/users',
    color: 'warning',
    icon: 'bi-people'
  },
  {
    title: 'Blogs',
    text: 'Manage blog posts and articles.',
    link: '/admin/blogs',
    color: 'info',
    icon: 'bi-journal-text'
  }
];

const DashboardHome = () => {
  const [stats, setStats] = useState({
    Products: 0,
    Orders: 0,
    Users: 0,
    Blogs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch all counts in parallel
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/products`, { headers }),
      axios.get(`${import.meta.env.VITE_API_URL}/orders`, { headers }),
      axios.get(`${import.meta.env.VITE_API_URL}/users`, { headers }),
      axios.get(`${import.meta.env.VITE_API_URL}/blogs`, { headers }),
    ])
      .then(([productsRes, ordersRes, usersRes, blogsRes]) => {
        setStats({
          Products: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
          Orders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
          Users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
          Blogs: Array.isArray(blogsRes.data) ? blogsRes.data.length : 0,
        });
      })
      .catch(() => {
        setStats({ Products: 0, Orders: 0, Users: 0, Blogs: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  const chartData = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: 'Count',
        data: Object.values(stats),
        backgroundColor: [
          '#0d6efd', // primary
          '#198754', // success
          '#ffc107', // warning
          '#0dcaf0'  // info
        ],
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row mb-4">
        {statsConfig.map((item) => (
          <div className="col-lg-3 col-md-6 mb-3" key={item.title}>
            <div className={`card text-bg-${item.color} shadow-sm h-100`}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <i className={`bi ${item.icon} display-4 mb-2`}></i>
                <h5 className="card-title">{item.title}</h5>
                <h2 className="fw-bold">
                  {loading ? <span className="spinner-border spinner-border-sm" /> : stats[item.title]}
                </h2>
                <p className="card-text">{item.text}</p>
                <Link to={item.link} className="btn btn-light btn-sm mt-2">Go to {item.title}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-4">Overview</h5>
        <div style={{ height: 300 }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;