const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/db');

// POST /api/quiz/recommend - Tech Quiz Recommendation Engine
router.post('/recommend', (req, res) => {
  const { purpose, budget, os } = req.body;
  const products = readDb('products.json');

  let matched = null;
  let reason = '';

  if (os === 'macos' || (!os && purpose === 'creative')) {
    matched = products.find(p => p.id === (budget === 'premium' ? 7 : 8));
    reason = 'Unrivaled Liquid Retina XDR color grading and silent, power-efficient Apple Silicon performance.';
  } else if (purpose === 'gaming') {
    matched = products.find(p => p.id === (budget === 'budget' ? 6 : 2));
    reason = 'Maximum TGP graphics wattage, high-refresh OLED panel, and dedicated ray tracing hardware.';
  } else if (os === 'tablet') {
    matched = products.find(p => p.id === 11);
    reason = 'Tandem OLED Ultra Retina display with Apple Pencil Pro stylus integration and extreme featherweight mobility.';
  } else if (purpose === 'mobility') {
    matched = products.find(p => p.id === 3);
    reason = 'Legendary carbon-fiber build under 1.1kg with Rapid Charge and enterprise-grade security.';
  } else {
    matched = products.find(p => p.id === 1);
    reason = 'Balanced 3.5K OLED touchscreen, 14th Gen Intel Core i9, and RTX 4060 graphics.';
  }

  if (!matched) matched = products[0];

  res.json({
    success: true,
    match: matched,
    score: 99.2,
    reason
  });
});

module.exports = router;
