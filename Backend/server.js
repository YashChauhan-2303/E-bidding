
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
const { initCronJobs } = require('./cron');
const { PORT } = require('./config/config');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const auctionRoutes = require('./routes/auctions');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:8080'
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

app.use(logger);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'working',
    message: 'E-Bidding API is running successfully',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Test route for debugging
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is reachable',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

// Error handler middleware (must be last)
app.use(errorHandler);

// Initialize cron jobs
initCronJobs();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Access the server at: http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
