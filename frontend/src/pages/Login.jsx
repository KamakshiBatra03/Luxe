import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { saveToken } from "../utils/auth";
import '../css/Login.css'

import React from 'react'

function Login() {
    const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL;
    const [form,setForm]=useState({username:"",password:""})
    const [msg,setMsg]=useState("")
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
       e.preventDefault()
        setMsg("")
        try{
        const response=await fetch (`${BASEURL}/api/token/`,{
            method:"POST",
            headers:{
            "Content-Type":"application/json",
            },
            body:JSON.stringify(form)
        })
        const data= await response.json()
        if(response.ok){
            saveToken(data)
            setMsg("Login successfully.. Redirecting...")
            setTimeout(() => {
                navigate('/')
            }, 1000);
        }
        else{
            setMsg(data.error || "Login failed...pls try again later")
        }
    }
    catch(error){
        setMsg("an error occured..try later")
    }

    }
  return (
    <div className="login-screen-overlay">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Enter your details to access your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            type="text"
                            name="username"
                            value={form.username}
                            placeholder="e.g. johndoe"
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            name="password"
                            type="password"
                            value={form.password}
                            placeholder="••••••••"
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <button className="login-submit-btn" type="submit">Login</button>
                </form>

                {msg && (
                    <p className={`login-msg ${msg.includes('successful') ? 'success' : 'error'}`}>
                        {msg}
                    </p>
                )}

                <div className="login-footer">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login