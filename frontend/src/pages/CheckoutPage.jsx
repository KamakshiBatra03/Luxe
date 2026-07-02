// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { authFetch } from "../utils/auth";
import React from 'react';
import '../css/CheckoutPage.css';

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Success! Your order has been placed.");
                clearCart();
                setTimeout(() => navigate('/'), 2500);
            } else {
                setMessage(data.error || "Failed to place order. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-screen-overlay">
            <div className="checkout-card">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                    <Link to="/cart" className="back-to-cart">Return to Bag</Link>
                </div>

                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Shipping Name</label>
                        <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Delivery Address</label>
                        <textarea name="address" placeholder="Enter full address..." value={form.address} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Payment Method</label>
                        <select name="payment_method" value={form.payment_method} onChange={handleChange}>
                            <option value="COD">Cash on Delivery (COD)</option>
                            <option value="CreditCard">Online Payment</option>
                        </select>
                    </div>

                    <button type="submit" className="place-order-btn" disabled={loading}>
                        {loading ? "Processing..." : "Confirm & Place Order"}
                    </button>

                    {message && (
                        <p className={`checkout-message ${message.includes('Success') ? 'success' : 'error'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CheckoutPage;