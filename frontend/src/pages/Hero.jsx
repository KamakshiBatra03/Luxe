// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import ProductList from './ProductList';

function Home() {
  return (
    <div>
      <Hero />
      <div style={{ padding: '0 5%' }}></div>
    </div>
  );
}

export default Home;