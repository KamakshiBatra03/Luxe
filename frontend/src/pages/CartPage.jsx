import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import React from 'react'
import '../css/CartPage.css'

function CartPage() {
    const {removeFromCart,total,updateQuantity,cartItems}=useCart()
   const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL;
  return (
   <div className="cart-screen-overlay">
            <div className="cart-container">
                <h1 className="cart-title">Your Shopping Bag</h1>
                
                {cartItems.length === 0 ? (
                    <div className="empty-cart-message">
                        <p>Your bag is currently empty.</p>
                        <Link to="/" className="continue-shop-btn">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="cart-content"> 
                        {/* LEFT SIDE: ITEMS LIST */}
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item-card">
                                    <div className="cart-item-image">
                                        {item.product_image && (
                                            <img src={`${BASEURL}${item.product_image}`} alt={item.product_name} />
                                        )}
                                    </div>
                                    
                                    <div className="cart-item-details">
                                        <div className="item-info">
                                            <h2>{item.product_name}</h2>
                                            <p className="item-price">₹{item.product_price}</p>
                                        </div>
                                        
                                        <div className="item-controls">
                                            <div className="quantity-selector">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SIDE: SUMMARY BOX */}
                        <div className="cart-summary-card">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free-text">FREE</span>
                            </div>
                            <hr className="summary-divider" />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
                            <Link to="/" className="back-to-shop">Keep Shopping</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
  )
}

export default CartPage