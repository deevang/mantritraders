const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mantritraders')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
console.log('Loading auth routes...');
app.use('/api/auth', require('./routes/auth'));
console.log('Loading products routes...');
app.use('/api/products', require('./routes/products'));
console.log('Loading enquiries routes...');
app.use('/api/enquiries', require('./routes/enquiries'));

// Debug route to test if server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working', routes: ['auth', 'products', 'enquiries'] });
});

// Direct setup route for testing
app.get('/api/setup', async (req, res) => {
  try {
    const User = require('./models/User');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    // Create admin user
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'admin@mantritraders.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    await adminUser.save();

    res.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        email: adminUser.email,
        role: adminUser.role
      }
    });

  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Failed to create admin user' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mantri Traders API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
}); 