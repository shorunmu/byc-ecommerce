import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogs(response.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-1"></div>
        <div className="col-sm-12 col-md-12 col-lg-10 text-center my-5">
          <h2 className="fw-bold">BYC AFRICA Blog News</h2>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-1"></div>

        {loading ? (
          <p>Loading blogs...</p>
        ) : error ? (
          <p>{error}</p>
        ) : blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          currentBlogs.map((blog, index) => (
            <React.Fragment key={blog._id}>
              <div className="col-sm-12 col-md-12 col-lg-1"></div>
              <div className="col-sm-12 col-md-12 col-lg-10 my-5">
                <div className="card cards-for-blog" style={{ border: "none", borderRadius: "0", boxShadow: "none" }}>
                  <div className="row g-0">
                    {index % 2 === 0 ? (
                      <>
                        <div className="col-md-5">
                          <img
                            src={blog.blogImage[0]}
                            alt=""
                            className="card-img-top h-100 w-100"
                            style={{ objectFit: "cover", borderRadius: "0" }}
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h6 className="card-title fw-bold">{blog.title}</h6>
                            <small className="card-text d-block blog-preview-clamp">
                              {blog.blogDescription}
                            </small>
                            <Link
                              to={`/blog/${blog._id}`}
                              className="btn btn-primary mt-3 btn-read-more fw-bold"
                            >
                              Read more <i className="bi bi-arrow-right fw-bold"></i>
                            </Link>
                            <div className="d-flex align-items-center gap-2 mt-4">
                              <img
                                src={blog.authorImage[0]}
                                alt="Author"
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                              />
                              <p className="mb-0 d-flex align-items-center gap-2 ms-4" style={{ fontSize: "13px" }}>
                                <i className="bi bi-eye"></i> {blog.views}
                              </p>
                              <p className="mb-0 d-flex align-items-center gap-2 ms-2" style={{ fontSize: "12px" }}>
                                <i className="bi bi-heart"></i> {blog.likes}
                              </p>
                            </div>
                            <p className="fw-bold p-small mt-3">
                              {blog.authorName} <small className="ms-4">{blog.authorOccupation}</small>
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h6 className="card-title fw-bold">{blog.title}</h6>
                            <small className="card-text d-block blog-preview-clamp">
                              {blog.blogDescription}
                            </small>
                            <Link
                              to={`/blog/${blog._id}`}
                              className="btn btn-primary mt-3 btn-read-more fw-bold"
                            >
                              Read more <i className="bi bi-arrow-right fw-bold"></i>
                            </Link>
                            <div className="d-flex align-items-center gap-2 mt-4">
                              <img
                                src={blog.authorImage[0]}
                                alt="Author"
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                              />
                              <p className="mb-0 d-flex align-items-center gap-2 ms-4" style={{ fontSize: "13px" }}>
                                <i className="bi bi-eye"></i> {blog.views}
                              </p>
                              <p className="mb-0 d-flex align-items-center gap-2 ms-2" style={{ fontSize: "12px" }}>
                                <i className="bi bi-heart"></i> {blog.likes}
                              </p>
                            </div>
                            <p className="fw-bold p-small mt-3">
                              {blog.authorName} <small className="ms-4">{blog.authorOccupation}</small>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <img
                            src={blog.blogImage[0]}
                            alt=""
                            className="card-img-top h-100 w-100"
                            style={{ objectFit: "cover", borderRadius: "0" }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-1"></div>
            </React.Fragment>
          ))
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {/* CSS for line clamp */}
      <style>
        {`
        .blog-preview-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
        `}
      </style>
    </div>
  );
};

export default Blog;