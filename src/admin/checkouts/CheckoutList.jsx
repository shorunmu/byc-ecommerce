import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutList = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_API_URL}/checkouts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCheckouts(res.data))
      .catch(() => setCheckouts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="mb-4">Checkouts</h2>
      {loading ? <div className="spinner-border" /> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map(checkout => (
              <tr key={checkout._id}>
                <td><strong>{checkout.order?._id || checkout.order || '-'}</strong></td>
                <td>{checkout.fullName}</td>
                <td>{checkout.email}</td>
                <td>{checkout.phone}</td>
                <td>{checkout.city}</td>
                <td>{checkout.state}</td>
                <td>{checkout.country}</td>
                <td>{checkout.companyName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckoutList;