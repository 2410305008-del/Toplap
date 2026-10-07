const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');

// POST /api/newsletter - Join VIP tech circle
router.post('/', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email address is required' });
  }

  const subscribers = readDb('subscribers.json');
  const cleanEmail = email.toLowerCase().trim();

  const exists = subscribers.find(s => s.email === cleanEmail);
  if (exists) {
    return res.json({
      success: true,
      message: 'You are already registered with VIP Tech Circle! Use coupon code TOPLAP10 for 10% off.',
      promoCode: 'TOPLAP10'
    });
  }

  subscribers.unshift({
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
    status: 'active'
  });
  writeDb('subscribers.json', subscribers);

  console.log(`[NEWSLETTER] New subscriber: ${cleanEmail}`);

  res.status(201).json({
    success: true,
    message: 'Welcome to the TopLap VIP Tech Circle! Your 10% promo code TOPLAP10 is unlocked.',
    promoCode: 'TOPLAP10'
  });
});

// GET /api/newsletter - List subscribers
router.get('/', (req, res) => {
  const subscribers = readDb('subscribers.json');
  res.json({ success: true, count: subscribers.length, subscribers });
});

module.exports = router;
