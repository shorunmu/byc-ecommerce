import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Use env variable for backend URL
    axios.get(`${import.meta.env.VITE_API_URL}/orders/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const updateOrderStatus = async (orderId) => {
    const token = localStorage.getItem('token');
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders =>
        orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert('Order status updated!');
    } catch (err) {
      alert('Failed to update order status.');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Orders</h2>
      {loading ? <div className="spinner-border" /> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Products</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer?.name || order.customer?.email || 'N/A'}</td>
                <td>₦{order.totalAmount?.toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="mb-2 d-flex align-items-center">
                      {/* Product Image */}
                      {item.product?.productImage && item.product.productImage[0] && (
                        <img
                          src={item.product.productImage[0]}
                          alt={item.product.productName}
                          style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 8 }}
                        />
                      )}
                      {/* Product Name and Number */}
                      <span>
                        {item.product?.productName || 'Unknown Product'}
                        {item.product?.productNumber && (
                          <> ({item.product.productNumber})</>
                        )}
                        {' '}x{item.quantity}
                      </span>
                      {item.color && <span> | Color: {item.color}</span>}
                      {item.size && <span> | Size: {item.size}</span>}
                    </div>
                  ))}
                </td>
                <td>
                  <select
                    value={statusUpdates[order._id] || order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    onClick={() => updateOrderStatus(order._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;