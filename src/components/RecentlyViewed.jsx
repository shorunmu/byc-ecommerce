import React, { useEffect, useState } from 'react'
import RecentlyViewedCard from './RecentlyViewedCard'
import axios from 'axios'

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [showAll, setShowAll] = useState(false)

  const user = localStorage.getItem('user')
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token')
      axios.get(`${import.meta.env.VITE_API_URL}/recentlyViews`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setRecentlyViewed(res.data))
      .catch(() => setRecentlyViewed([]))
    }
  }, [user])

  if (!user || !recentlyViewed.length) return null

  const visibleProducts = showAll ? recentlyViewed : recentlyViewed.slice(0, 5)

  return (
    <div className="container mt-5 border-rounded p-3 recently-viewed">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <h6 className="mb-0 fw-bold ms-3">Recently Viewed</h6>
        {recentlyViewed.length > 5 && (
          <button
            className="btn btn-link fw-bold text-danger text-see-all-icon text-decoration-none"
            style={{ boxShadow: 'none' }}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? (
              <>show less <span><i className="bi bi-chevron-up ms-2"></i></span></>
            ) : (
              <>see all <span><i className="bi bi-chevron-right ms-2"></i></span></>
            )}
          </button>
        )}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {visibleProducts.map((product, index) => (
          <RecentlyViewedCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
