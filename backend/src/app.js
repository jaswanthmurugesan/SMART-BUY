// Express backend entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Smart-Buy Backend API is running!' });
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test routes for frontend integration
app.get('/api/products', (req, res) => {
  res.json({ 
    message: 'Products API connected successfully!',
    products: [
      { id: 1, name: 'Sample Product 1', price: 29.99 },
      { id: 2, name: 'Sample Product 2', price: 39.99 }
    ]
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation for demo
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Mock authentication - in real app, check against database
  if (email === 'demo@example.com' && password === 'password') {
    res.json({ 
      message: 'Login successful!',
      user: { email, name: 'Demo User' },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  // Simple validation for demo
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Mock signup - in real app, save to database
  res.status(201).json({ 
    message: 'Account created successfully!',
    user: { name, email }
  });
});

const PORT = process.env.PORT || 5000;

// Start the server first
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Try to connect to MongoDB (optional for development)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB🚀');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.log('Server running without MongoDB connection');
    });
} else {
  console.log('No MONGO_URI provided, running without database');
}
