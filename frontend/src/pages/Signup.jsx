// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import React from 'react';
import '../css/Signup.css'; // Make sure to create this file

function Signup() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        if (form.password !== form.password2) {
            setMsg("Passwords do not match!");
            return;
        }
        try {
            const response = await fetch(`${BASEURL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                setMsg("Account created! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                // Handling specific Django rest framework errors
                setMsg(data.username || data.email || data.password || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            setMsg("Signup failed. Please try again later.");
        }
    };

    return (
        <div className="signup-screen-overlay">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Join the Club</h2>
                    <p>Create an account to start your premium experience</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" name="username" value={form.username} placeholder="johndoe123" onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={form.email} placeholder="john@example.com" onChange={handleChange} required />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Password</label>
                            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
                        </div>
                        <div className="input-group">
                            <label>Confirm</label>
                            <input name="password2" type="password" value={form.password2} onChange={handleChange} placeholder="••••••••" required />
                        </div>
                    </div>

                    <button className="signup-submit-btn" type="submit">Create Account</button>
                </form>

                {msg && (
                    <p className={`signup-msg ${msg.includes('created') ? 'success' : 'error'}`}>
                        {msg}
                    </p>
                )}

                <div className="signup-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;