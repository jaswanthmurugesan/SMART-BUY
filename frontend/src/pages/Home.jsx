import React from 'react';
import '../styles/Home.css';
// import logo from '../assets/logo.png';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        {/* Temporarily removed logo to fix 404 error */}
        <div style={{ width: '120px', height: '120px', background: '#f7971e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', margin: '0 auto 1rem auto', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>SB</div>
        <h1 className="hero-title">Welcome to Smart-Buy</h1>
        <p className="hero-subtitle">Discover the best deals, trending products, and a seamless shopping experience.</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
    </div>
  );
} 

export default Home;
