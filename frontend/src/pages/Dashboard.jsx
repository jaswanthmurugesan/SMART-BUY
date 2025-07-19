import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [apiHealth, setApiHealth] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Test API connection
        const healthResponse = await apiService.healthCheck();
        setApiHealth(healthResponse);
        
        // Fetch products
        const productsResponse = await apiService.getProducts();
        setProducts(productsResponse);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Dashboard</h2>
      
      {/* API Status */}
      <div className="api-status">
        <h3>API Connection Status</h3>
        {loading ? (
          <p>Loading...</p>
        ) : apiHealth ? (
          <p style={{color: 'green'}}>✅ Connected to Backend API - {apiHealth.status}</p>
        ) : (
          <p style={{color: 'red'}}>❌ Backend API Disconnected</p>
        )}
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card animate-card">
          <h3>Orders</h3>
          <p>Track your recent orders and status.</p>
          {apiHealth && <span className="status-badge">API Ready</span>}
        </div>
        <div className="dashboard-card animate-card">
          <h3>Wishlist</h3>
          <p>View and manage your wishlist items.</p>
          {apiHealth && <span className="status-badge">API Ready</span>}
        </div>
        <div className="dashboard-card animate-card">
          <h3>Products</h3>
          <p>{products ? products.message : 'Loading products...'}</p>
          {apiHealth && <span className="status-badge">API Ready</span>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
