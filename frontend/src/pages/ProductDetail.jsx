import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import '../css/ProductDetail.css'


function ProductDetail() {
    const{id}=useParams();
    const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL;
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const [product,setProduct]=useState(null)
    const {addToCart}=useCart()

    const handleAddToCart=()=>{
        if (!localStorage.getItem("access_token")){
            window.location.href='/login'
            return
        }
        addToCart(product.id)
    }
    useEffect(()=>{
        fetch(`${BASEURL}/api/products/${id}/`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("failed to fetch")
            }
            return response.json()
        })
        .then((data)=>{
            setProduct(data)
            setLoading(false)
        })
        .catch((error)=>{
            setError(error)
            setLoading(false)
        })
    },[id,BASEURL])
    if(loading){
        return <div>loading...</div>
    }
    if(error){
        return <div>error:{error}</div>
    }
    if(!product){
        return <div>product not available</div>
    }
  return (
    <div className="detail-page-overlay">
    {/* Centered container card */}
    <div className="dark-product-card">
      
      {/* LEFT: Product Image with focus on the top */}
      <div className="card-image-section">
        <img src={product.image} alt={product.name} className="focused-image" />
      </div>

      {/* RIGHT: Product Details aligned like your reference */}
      <div className="card-info-section">
        <div className="info-top">
          <span className="brand-tag">LUXE EXCLUSIVE</span>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price}</p>
        </div>

        <div className="info-middle">
          <h3 className="label">Description</h3>
          <p className="description-text">{product.description}</p>
        </div>

        {/* Action Row: Quantity and Buttons */}
        <div className="info-bottom">
          <div className="quantity-row">
             <input type="number" defaultValue="1" min="1" className="qty-input" />
          </div>
          
          <div className="button-group">
            <button className="favorite-btn">
              <span className="heart-icon">♡</span> Favorites
            </button>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
               Add to Cart
            </button>
          </div>
        </div>
        
        <Link to="/categories/" className="back-link">← Back to Collection</Link>
      </div>
    </div>
  </div>
  )
}

export default ProductDetail