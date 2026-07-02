// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { authFetch } from "../utils/auth";
import '../css/Profile.css';

function Profile() {
  const [user, setUser] = useState({ username: "Guest", email: "", date_joined: "" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authFetch(`${BASEURL}/api/user/profile/`);
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [BASEURL]);

  if (loading) return <div className="loader">Loading Profile...</div>;

  return (
    <div className="profile-overlay">
      <div className="profile-container">
        {/* Sidebar / User Info */}
        <aside className="profile-sidebar">
          <div className="user-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="username">{user.username}</h2>
          <p className="user-email">{user.email}</p>
          <div className="account-meta">
            <span>Member since: 2026</span>
          </div>
          <button className="logout-btn" onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}>Logout</button>
        </aside>

        {/* Main Content: Order History */}
        <main className="profile-main">
          <h1 className="section-title">Order History</h1>
          <div className="orders-list">
            {orders.length === 0 ? (
              <div className="no-orders">
                <p>You haven't placed any orders yet.</p>
                <button className="shop-now" onClick={() => window.location.href='/categories'}>Start Shopping</button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order ID: #{order.id}</span>
                    <span className="order-date">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="order-details">
                    <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                    <p className="order-total">Total Amount: ₹{order.total_price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;