// src/pages/About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/About.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="fade-in">Redefining Modern <br /><span>Elegance</span></h1>
        <p className="about-subtitle">Established 2026. Designed for the bold.</p>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="story-image">
          {/* You can replace this placeholder with a high-end fashion/office shot */}
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" alt="Boutique Workshop" />
        </div>
        <div className="story-text">
          <span className="section-label">Our Story</span>
          <h2>The Art of the Minimal</h2>
          <p>
            Born from a desire to strip away the noise, Luxe was founded on the principle 
            that true style doesn't shout; it whispers. We curate pieces that bridge the 
            gap between timeless tradition and contemporary edge.
          </p>
          <p>
            Every product in our collection is a result of meticulous selection, 
            ensuring that what you wear is not just a garment, but a statement of 
            intent.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="about-values">
        <div className="value-item">
          <h3>Ethical Sourcing</h3>
          <p>We partner only with manufacturers who share our commitment to fair labor and sustainable materials.</p>
        </div>
        <div className="value-item">
          <h3>Premium Quality</h3>
          <p>Hand-picked fabrics and precision stitching ensure your pieces last a lifetime, not a season.</p>
        </div>
        <div className="value-item">
          <h3>Modern Fit</h3>
          <p>Our designs are tailored to the modern silhouette, balancing comfort with sharp aesthetic.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Experience the Collection</h2>
        <button className="btn-fill" onClick={() => navigate('/categories')}>
          Explore Shop
        </button>
      </section>
    </div>
  );
}

export default About;