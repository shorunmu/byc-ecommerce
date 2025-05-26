import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BycBlogNews from '../components/BycBlogNews'
import Pagination from '../components/Pagination'

// Utility to split by visual lines (approximate)
function splitByVisualLines(text, lines = 5, charsPerLine = 80) {
  if (!text) return { first: '', rest: '' };
  const approx = lines * charsPerLine;
  if (text.length <= approx) return { first: text, rest: '' };
  let cutoff = text.lastIndexOf(' ', approx);
  if (cutoff === -1) cutoff = approx;
  return {
    first: text.slice(0, cutoff),
    rest: text.slice(cutoff)
  };
}

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

  let firstFive = ''
  let rest = ''
  if (blog && blog.blogDescription) {
    const split = splitByVisualLines(blog.blogDescription, 5, 80)
    firstFive = split.first
    rest = split.rest
  }

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
            {/* First 5 visual lines (approximate) */}
            {firstFive && (
              <div className="col-12 my-4">
                <p className="justify-text amet-minim-moll blog-visual-clamp-5">
                  {firstFive}
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
            {rest && (
              <div className="col-12 my-4">
                <p className="justify-text amet-minim-moll">
                  {rest}
                </p>
              </div>
            )}
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
      {/* Clamp CSS for first 5 lines */}
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
