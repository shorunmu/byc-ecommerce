import React, { useState } from 'react';

const ImageCarousel = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel" style={{ display: 'block', width: '100%' }}>
      {/* Main Image */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <img
          src={images[activeIndex]}
          alt={`Product ${activeIndex}`}
          style={{
            width: '100%',
            maxWidth: 350,
            height: 300,
            objectFit: 'cover',
            borderRadius: 0
          }}
        />
      </div>
      {/* Thumbnails and Arrows */}
      <div className='mt-5' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {images.length > 1 && (
          <button onClick={handlePrevious} className='nav-button'>
            <i className="bi bi-chevron-left"></i>
          </button>
        )}
        <div className="thumbnail-container" style={{ display: 'flex', gap: 8 }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumb ${index}`}
              className={`thumbnail ${index === activeIndex ? 'highlight' : ''}`}
              style={{
                width: 50,
                height: 50,
                objectFit: 'cover',
                border: index === activeIndex ? '2px solid #198754' : '1px solid #ccc',
                borderRadius: 0,
                cursor: 'pointer'
              }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        {images.length > 1 && (
          <button onClick={handleNext} className='nav-button'>
            <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
