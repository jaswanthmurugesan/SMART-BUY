import React from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card animate-card">
          <h3>Orders</h3>
          <p>Track your recent orders and status.</p>
        </div>
        <div className="dashboard-card animate-card">
          <h3>Wishlist</h3>
          <p>View and manage your wishlist items.</p>
        </div>
        <div className="dashboard-card animate-card">
          <h3>Account</h3>
          <p>Update your profile and settings.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
