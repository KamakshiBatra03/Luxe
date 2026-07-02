import React from 'react'
import { Link } from 'react-router-dom'
import '../css/ProductCard.css'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="bento-card-content">
        {/* Top Section: Text and Metadata */}
        <div className="card-info-top">
          <span className="card-badge">Latest Arrival</span>
          <h2 className="card-title">{product.name}</h2>
          <p className="card-price">From ₹{product.price}</p>
          <div className="card-action">
             <button className="pill-button">Shop Now</button>
          </div>
        </div>

        {/* Bottom Section: Image */}
        <div className="img-wrapper">
          <img src={product.image} alt={product.name} className="bento-img" />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard