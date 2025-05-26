import React, { useEffect, useState } from 'react'
import { Viewsandlove } from '../assets'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BycBlogNews = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err))
  }, [])

  const visibleBlogs = showAll ? blogs : blogs.slice(0, 3)

  // Helper to get first 3.5 lines (show 3 full lines and half of the 4th, then ...)
  const getPreview = (desc) => {
    if (!desc) return ''
    const lines = desc.split(/\r?\n/).filter(line => line.trim() !== '')
    if (lines.length === 0) return ''
    if (lines.length <= 3) return lines.join('\n')
    if (lines.length === 4) {
      // Show 3 full lines and half of the 4th
      const halfLine = lines[3].split(' ').slice(0, Math.ceil(lines[3].split(' ').length / 2)).join(' ')
      return lines.slice(0, 3).join('\n') + '\n' + halfLine + '...'
    }
    // More than 4 lines: show 3 full lines and half of the 4th
    const halfLine = lines[3].split(' ').slice(0, Math.ceil(lines[3].split(' ').length / 2)).join(' ')
    return lines.slice(0, 3).join('\n') + '\n' + halfLine + '...'
  }

  return (
    <div className="container my-5 byc-blog-news">
      <div className="row g-3 ">
        {visibleBlogs.map((blog, idx) => (
          <div className="col-sm-12 col-md-12 col-lg-4" key={blog._id || idx}>
            <div className="card blognews-frames" style={{ width: '100%' }}>
              <img
                src={blog.blogImage && blog.blogImage[0]}
                className="card-img-top"
                alt={blog.title}
              />
              <div className="card-body frames-blognews">
                <div className="card mb-3 viewsandloveicons bg-primary" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4 d-flex gap-4">
                      <img src={Viewsandlove} className="img-fluid rounded-start" alt="views and love" />
                      <p className='d-flex mt-4 gap-2 ms-4'>
                        <i className="bi bi-eye"></i>{blog.views}
                      </p>
                      <p className='d-flex mt-4 gap-2'>
                        <i className="bi bi-heart"></i>{blog.likes}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mb-5'>
                  <p className='fw-bold p-small '>
                    {blog.authorName}
                    <small className='ms-4'>{blog.authorOccupation}</small>
                  </p>
                </div>
                <h5 className="card-title fw-bold mb-4">{blog.title}</h5>
                <p className="card-text justify-text blognewsframes-p">
                  {getPreview(blog.blogDescription)
                    .split('\n')
                    .map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="btn btn-primary mt-4 mb-5 btn-read-more fw-bold"
                >
                  Read more <i className="bi bi-arrow-right fw-bold"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {blogs.length > 3 && (
        <div className="view-btn text-center my-5">
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  )
}

export default BycBlogNews
