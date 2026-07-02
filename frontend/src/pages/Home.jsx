// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import ProductList from './ProductList';
import '../css/Home.css';
import starImg from '../assets/star.png'

function Home() {
  return (
    <main className="home-wrapper">
      {/* 1. The Big Banner */}
      <Hero />

      {/* 2. Featured Categories Section (Joint Bar Style) */}
      <section className="featured-categories container">
         <div className="cat-card purple-theme">
            <span class="head">50K+</span>
            <span class="headbelow">Happy Customers</span>
         </div>
         <div className="cat-card blue-theme">
            <span class="head">4.9 <img id="star"src={starImg}></img></span>
            <span class="headbelow">Average Rating</span>
         </div>
         <div className="cat-card orange-theme">
            <span class="head">500+</span>
            <span class="headbelow">Premium Products</span>
         </div>
      </section>
      
    </main>
  );
}

export default Home;