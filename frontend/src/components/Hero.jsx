// src/components/Hero.jsx
import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../css/Hero.css';

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">✨ New Collection 2026</span>
        <h1 className="hero-title">
          Elevate Your <br />
          <span>Everyday Style</span>
        </h1>
        <div className="hero-subtitle">
          <div>Discover curated collections of premium products. </div>
          Timeless designs crafted for the modern individual.
        </div>
        <div className="hero-buttons">
        <button 
            className="btn-fill" 
            onClick={() => navigate('/category/casuals')}
          >
            Shop Collection →
          </button>

          {/* 2. Link to your Categories list page */}
          <button 
            className="btn-outline" 
            onClick={() => navigate('/categories')}
          >
            Browse Categories
          </button>
        </div>
        <div class="dash">___________________________________________________________________________________</div>
      </div>
    </section>
  );
}

export default Hero;