import React from 'react';
import '../styles/Home.css';
import logo from '../assets/logo.png';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <img src={logo} alt="Smart-Buy Logo" style={{ width: '120px', marginBottom: '1rem' }} />
        <h1 className="hero-title">Welcome to Smart-Buy</h1>
        <p className="hero-subtitle">Discover the best deals, trending products, and a seamless shopping experience.</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
    </div>
  );
} 

export default Home;
