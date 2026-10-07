const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/db');

// POST /api/coupons/validate - Validate promo code
router.post('/validate', (req, res) => {
  const { code, subtotal = 0 } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code is required' });
  }

  const coupons = readDb('coupons.json');
  const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);

  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
  }

  if (subtotal && coupon.minOrder && subtotal < coupon.minOrder) {
    return res.status(400).json({
      success: false,
      message: `Minimum order of ₹${coupon.minOrder.toLocaleString('en-IN')} required for coupon ${coupon.code}`
    });
  }

  let discountAmount = 0;
  if (coupon.discountPercent) {
    discountAmount = Math.round(subtotal * (coupon.discountPercent / 100));
  } else if (coupon.flatDiscount) {
    discountAmount = coupon.flatDiscount;
  }

  res.json({
    success: true,
    coupon: {
      code: coupon.code,
      description: coupon.description,
      discountPercent: coupon.discountPercent || null,
      flatDiscount: coupon.flatDiscount || null,
      discountAmount,
      freeShipping: coupon.freeShipping || false
    }
  });
});

module.exports = router;
