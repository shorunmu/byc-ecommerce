import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({
    title: '',
    blogImage: [''],
    blogDescription: '',
    authorImage: [''],
    authorName: '',
    authorOccupation: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editingBlog, setEditingBlog] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/blogs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBlogs(res.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/api/blogs', newBlog, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewBlog({
        title: '',
        blogImage: [''],
        blogDescription: '',
        authorImage: [''],
        authorName: '',
        authorOccupation: '',
      });
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data || 'Failed to add blog');
    }
  };

  // Only send allowed fields to the backend (not _id)
  const handleEditBlog = async (id) => {
    const token = localStorage.getItem('token');
    const {
      title,
      blogImage,
      blogDescription,
      authorImage,
      authorName,
      authorOccupation,
      blogDate,
      likes,
      views
    } = editingBlog;
    const updateData = {
      title,
      blogImage,
      blogDescription,
      authorImage,
      authorName,
      authorOccupation,
      blogDate,
      likes,
      views
    };
    try {
      await axios.put(`http://localhost:3000/api/blogs/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      setEditingBlog({});
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data || 'Failed to update blog');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data || 'Failed to delete blog');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Blogs</h2>
      <form className="mb-4" onSubmit={handleAddBlog}>
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={newBlog.title}
              onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Blog Image URL"
              value={newBlog.blogImage[0]}
              onChange={e => setNewBlog({ ...newBlog, blogImage: [e.target.value] })}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Author Image URL"
              value={newBlog.authorImage[0]}
              onChange={e => setNewBlog({ ...newBlog, authorImage: [e.target.value] })}
              required
            />
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Author Name"
              value={newBlog.authorName}
              onChange={e => setNewBlog({ ...newBlog, authorName: e.target.value })}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Author Occupation"
              value={newBlog.authorOccupation}
              onChange={e => setNewBlog({ ...newBlog, authorOccupation: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col">
            <textarea
              className="form-control"
              placeholder="Blog Description"
              value={newBlog.blogDescription}
              onChange={e => setNewBlog({ ...newBlog, blogDescription: e.target.value })}
              required
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" type="submit">Add Blog</button>
          </div>
        </div>
      </form>
      {loading ? <div className="spinner-border" /> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Blog Image</th>
              <th>Description</th>
              <th>Author</th>
              <th>Author Image</th>
              <th>Occupation</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td>
                  {editingId === blog._id ? (
                    <input
                      type="text"
                      value={editingBlog.title || ''}
                      onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    blog.title
                  )}
                </td>
                <td>
                  <img src={blog.blogImage[0]} alt="Blog" style={{ width: 60, height: 40, objectFit: 'cover' }} />
                </td>
                <td style={{ maxWidth: 200 }}>
                  {editingId === blog._id ? (
                    <textarea
                      value={editingBlog.blogDescription || ''}
                      onChange={e => setEditingBlog({ ...editingBlog, blogDescription: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    <span title={blog.blogDescription}>
                      {blog.blogDescription.length > 60
                        ? blog.blogDescription.slice(0, 60) + '...'
                        : blog.blogDescription}
                    </span>
                  )}
                </td>
                <td>
                  {editingId === blog._id ? (
                    <input
                      type="text"
                      value={editingBlog.authorName || ''}
                      onChange={e => setEditingBlog({ ...editingBlog, authorName: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    blog.authorName
                  )}
                </td>
                <td>
                  <img src={blog.authorImage[0]} alt="Author" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                </td>
                <td>
                  {editingId === blog._id ? (
                    <input
                      type="text"
                      value={editingBlog.authorOccupation || ''}
                      onChange={e => setEditingBlog({ ...editingBlog, authorOccupation: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    blog.authorOccupation
                  )}
                </td>
                <td>{blog.views}</td>
                <td>{blog.likes}</td>
                <td>
                  {editingId === blog._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleEditBlog(blog._id)} title="Save"><FaSave /></button>
                      <button className="btn btn-secondary btn-sm" onClick={() => { setEditingId(null); setEditingBlog({}); }} title="Cancel"><FaTimes /></button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {
                          // Remove _id from editingBlog to avoid backend validation error
                          const { _id, ...rest } = blog;
                          setEditingId(blog._id);
                          setEditingBlog(rest);
                        }}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBlog(blog._id)} title="Delete"><FaTrash /></button>
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

export default BlogList;