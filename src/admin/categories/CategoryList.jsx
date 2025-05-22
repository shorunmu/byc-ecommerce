import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', subcategories: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: '', subcategories: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/api/categories', {
        name: newCategory.name,
        subcategories: newCategory.subcategories
          ? newCategory.subcategories.split(',').map(s => s.trim()).filter(Boolean)
          : []
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewCategory({ name: '', subcategories: '' });
      fetchCategories();
    } catch (err) {
      alert(err.response?.data || 'Failed to add category');
    }
  };

  const handleEditCategory = async (id) => {
    if (!editingData.name.trim()) return;
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/api/categories/${id}`, {
        name: editingData.name,
        subcategories: editingData.subcategories
          ? editingData.subcategories.split(',').map(s => s.trim()).filter(Boolean)
          : []
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      setEditingData({ name: '', subcategories: '' });
      fetchCategories();
    } catch (err) {
      alert(err.response?.data || 'Failed to update category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (err) {
      alert(err.response?.data || 'Failed to delete category');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Categories</h2>
      <form className="mb-4 d-flex" onSubmit={handleAddCategory}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="New category name"
          value={newCategory.name}
          onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="Subcategories (comma separated)"
          value={newCategory.subcategories}
          onChange={e => setNewCategory({ ...newCategory, subcategories: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
      {loading ? <div className="spinner-border" /> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Subcategories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat._id}>
                <td>
                  {editingId === cat._id ? (
                    <input
                      type="text"
                      value={editingData.name}
                      onChange={e => setEditingData({ ...editingData, name: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    cat.name
                  )}
                </td>
                <td>
                  {editingId === cat._id ? (
                    <input
                      type="text"
                      value={editingData.subcategories}
                      onChange={e => setEditingData({ ...editingData, subcategories: e.target.value })}
                      className="form-control"
                      placeholder="Subcategories (comma separated)"
                    />
                  ) : (
                    cat.subcategories && cat.subcategories.length > 0
                      ? cat.subcategories.join(', ')
                      : <span className="text-muted">None</span>
                  )}
                </td>
                <td>
                  {editingId === cat._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleEditCategory(cat._id)} title="Save"><FaSave /></button>
                      <button className="btn btn-secondary btn-sm" onClick={() => { setEditingId(null); setEditingData({ name: '', subcategories: '' }); }} title="Cancel"><FaTimes /></button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => { setEditingId(cat._id); setEditingData({ name: cat.name, subcategories: (cat.subcategories || []).join(', ') }); }} title="Edit"><FaEdit /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(cat._id)} title="Delete"><FaTrash /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryList;