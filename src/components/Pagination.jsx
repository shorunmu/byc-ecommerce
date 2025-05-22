import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 3; // Maximum number of visible buttons

    // Calculate the range of visible buttons
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust startPage if we're near the end
    const adjustedStartPage = Math.max(1, endPage - maxVisibleButtons + 1);

    // Add the first page if it's not in the visible range
    if (adjustedStartPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );

      if (adjustedStartPage > 2) {
        pageNumbers.push(
          <button key="dots-start" className="pagination-btn dots" disabled>
            ...
          </button>
        );
      }
    }

    // Generate the visible page numbers
    for (let i = adjustedStartPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add the last page if it's not in the visible range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <button key="dots-end" className="pagination-btn dots" disabled>
            ...
          </button>
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container d-flex justify-content-center gap-2 my-4">
      {/* Previous Button */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* Render Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;