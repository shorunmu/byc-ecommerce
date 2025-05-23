import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  productName: '',
  productNumber: '',
  productPrice: '',
  productStock: '',
  productImage: '',
  productDescription: '',
  productDetails: '',
  categoryId: '',
  subcategory: '',
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [refresh]);

  // Fetch categories
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  // Handle form input
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'categoryId') {
      setForm(f => ({
        ...f,
        categoryId: value,
        subcategory: '' // Reset subcategory only when category changes
      }));
    } else {
      setForm(f => ({
        ...f,
        [name]: value
      }));
    }
  };

  // Get subcategories for selected category (ensure string comparison)
  const subcategories =
    categories.find(cat => String(cat._id) === String(form.categoryId))?.subcategories || [];

  // Open form for create or edit
  const openForm = (product = null) => {
    if (product) {
      setForm({
        productName: product.productName,
        productNumber: product.productNumber,
        productPrice: product.productPrice,
        productStock: product.productStock,
        productImage: product.productImage.join(','),
        productDescription: product.productDescription,
        productDetails: product.productDetails || '',
        categoryId: product.category?._id || '',
        subcategory: product.subcategory || '',
      });
      setEditingId(product._id);
    } else {
      setForm(initialForm);
      setEditingId(null);
    }
    setError('');
    setShowForm(true);
  };

  // Submit form (create or update)
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        productImage: form.productImage.split(',').map(v => v.trim()),
        categoryId: form.categoryId,
        subcategory: form.subcategory,
      };
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/products/${editingId}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/products`, payload);
      }
      setShowForm(false);
      setRefresh(r => !r);
    } catch (err) {
      setError(err.response?.data || 'Error saving product');
    }
  };

  // Delete product
  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setRefresh(r => !r);
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Products</h2>
      <button className="btn btn-primary mb-3" onClick={() => openForm()}>
        <i className="bi bi-plus-circle me-2"></i>Add Product
      </button>
      {loading ? <div className="spinner-border" /> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Images</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td>{prod.productName}</td>
                <td>{prod.productNumber}</td>
                <td>₦{prod.productPrice?.toLocaleString()}</td>
                <td>{prod.productStock}</td>
                <td style={{ whiteSpace: 'pre-line', wordBreak: 'break-word', maxWidth: 200 }}>
                  {prod.productDescription}
                </td>
                <td>
                  {prod.productImage?.map((img, i) => (
                    <img key={i} src={img} alt="" style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 4 }} />
                  ))}
                </td>
                <td>{prod.category?.name || ''}</td>
                <td>{prod.subcategory || ''}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    title="Edit"
                    onClick={() => openForm(prod)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Delete"
                    onClick={() => handleDelete(prod._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for create/update */}
      {showForm && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? 'Edit' : 'Add'} Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)} />
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input name="productName" value={form.productName} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Number</label>
                  <input name="productNumber" value={form.productNumber} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Price</label>
                  <input name="productPrice" type="number" value={form.productPrice} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Stock</label>
                  <input name="productStock" type="number" value={form.productStock} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Description</label>
                  <textarea name="productDescription" value={form.productDescription} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Details</label>
                  <textarea name="productDetails" value={form.productDetails} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Image URLs (comma separated)</label>
                  <input name="productImage" value={form.productImage} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Category</label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Subcategory</label>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    className="form-control"
                    required={false}
                    disabled={!form.categoryId}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;