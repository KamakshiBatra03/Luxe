import { Link,useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { clearToken,getAccessToken } from "../utils/auth";
import '../css/Navbar.css'
import React from 'react'

function Navbar() {
    const {cartItems}=useCart();
    const navigate=useNavigate()
    const cartCount=cartItems.reduce((total,item)=>total+item.quantity,0)

    const isLoggedIn=!!getAccessToken()

    const handleLogout=()=>{
      clearToken()
      navigate('/login')
    }
  return (
    <header className="main-header">
      <div className="navbar-container">
        {/* Left: Logo */}
        <Link to="/" className="brand-logo">
          LUXE<span>.</span>
        </Link>

        {/* Center: Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/about">About-us</Link></li>
        </ul>

        {/* Right: Actions (Profile & Cart) */}
        <div className="nav-actions">
          <div className="profile-menu">
            <span className="nav-icon">👤</span>
            <div className="dropdown-content">
              {!isLoggedIn ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">SignUp</Link>
                </>
              ) : (
                <>
                  <Link to="/profile">My Profile</Link>
                  <button onClick={() => { clearToken(); navigate('/login'); }}>Logout</button>
                </>
              )}
            </div>
          </div>

          <Link to="/cart" className="cart-icon-wrapper">
            <span className="nav-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar