import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BycBlogNews from '../components/BycBlogNews'
import Pagination from '../components/Pagination'

const MoreBlogNews = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
        setBlog(res.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch blog')
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  return (
    <div className="container">
      <div className="row">
        {/* Blog Details Section */}
        {loading ? (
          <div className="col-12 my-5"><p>Loading blog...</p></div>
        ) : error ? (
          <div className="col-12 my-5"><p>{error}</p></div>
        ) : !blog ? (
          <div className="col-12 my-5"><p>Blog not found.</p></div>
        ) : (
          <>
            {/* Blog Title */}
            <div className="col-12 text-center mt-5">
              <h3 className="fw-bold">{blog.title}</h3>
            </div>
            {/* First 5 visual lines of description */}
            {blog.blogDescription && (
              <div className="col-12 my-4">
                <p className="justify-text amet-minim-moll blog-visual-clamp-5">
                  {blog.blogDescription}
                </p>
              </div>
            )}
            {/* Blog Image */}
            {blog.blogImage && blog.blogImage[0] && (
              <div className="col-12 mb-4">
                <img src={blog.blogImage[0]} alt="" className="w-100 img-fluid" />
              </div>
            )}
            {/* Rest of the description */}
            {/* If you want to show the rest after clicking "Read more", you can implement that logic here */}
          </>
        )}
      </div>

      {/* Always show More Blog News and Pagination */}
      <div className="row">
        <div className="col-12 text-center mt-5">
          <h4 className="fw-bold">More Blog news</h4>
        </div>
        <BycBlogNews />
      </div>
      <div className="row text-center">
        <Pagination />
      </div>
      {/* CSS for 5-line clamp */}
      <style>
        {`
        .blog-visual-clamp-5 {
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
  )
}

export default MoreBlogNews
