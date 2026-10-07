const express = require('express');
const cors = require('cors');

// Import modular routes
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');
const couponsRoutes = require('./routes/coupons.routes');
const contactRoutes = require('./routes/contact.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const quizRoutes = require('./routes/quiz.routes');
const statsRoutes = require('./routes/stats.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'TopLap High-Performance Tech API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// Mount Domain Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/auth', authRoutes);

// Catch-all 404 handler for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// Server listener
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('================================================================');
    console.log(`⚡ TopLap Modular Backend Server Online`);
    console.log(`📡 Local URL:        http://localhost:${PORT}`);
    console.log(`🩺 Health Check:     http://localhost:${PORT}/api/health`);
    console.log(`📦 Products API:     http://localhost:${PORT}/api/products`);
    console.log(`🛒 Orders API:       http://localhost:${PORT}/api/orders`);
    console.log(`🎟️ Coupons API:      http://localhost:${PORT}/api/coupons`);
    console.log(`📬 Contact API:      http://localhost:${PORT}/api/contact`);
    console.log(`📰 Newsletter API:   http://localhost:${PORT}/api/newsletter`);
    console.log(`🧠 Quiz API:         http://localhost:${PORT}/api/quiz`);
    console.log(`📊 Stats API:        http://localhost:${PORT}/api/stats`);
    console.log('================================================================');
  });
}

module.exports = app;
