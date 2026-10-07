const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/db');

// GET /api/stats - Platform & inventory statistics
router.get('/', (req, res) => {
  const products = readDb('products.json');
  const orders = readDb('orders.json');
  const tickets = readDb('tickets.json');
  const subscribers = readDb('subscribers.json');

  res.json({
    success: true,
    stats: {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalTickets: tickets.length,
      totalSubscribers: subscribers.length
    }
  });
});

module.exports = router;
