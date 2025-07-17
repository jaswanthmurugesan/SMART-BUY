import React from 'react';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: '#f7971e', fontWeight: 'bold' }}>Go Home</a>
    </div>
  );
}

export default NotFound;
