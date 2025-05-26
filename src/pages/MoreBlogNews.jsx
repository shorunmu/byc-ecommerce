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

  // Split description into lines (by line break)
  let firstFive = ''
  let rest = ''
  if (blog && blog.blogDescription) {
    const descLines = blog.blogDescription.split(/\r?\n/).filter(line => line.trim() !== '')
    firstFive = descLines.slice(0, 5).join('\n')
    rest = descLines.slice(5).join('\n')
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
            {/* First five lines of description */}
            <div className="col-12 my-4">
              <p className="justify-text amet-minim-moll" style={{ whiteSpace: 'pre-line' }}>
                {firstFive}
              </p>
            </div>
            {/* Blog Image */}
            {blog.blogImage && blog.blogImage[0] && (
              <div className="col-12 mb-4">
                <img src={blog.blogImage[0]} alt="" className="w-100 img-fluid" />
              </div>
            )}
            {/* Rest of the description */}
            {rest && (
              <div className="col-12 my-4">
                <p className="justify-text amet-minim-moll" style={{ whiteSpace: 'pre-line' }}>
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
    </div>
  )
}

export default MoreBlogNews
