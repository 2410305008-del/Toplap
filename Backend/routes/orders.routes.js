const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');

// POST /api/orders - Create a new customer order
router.post('/', (req, res) => {
  const { customer, items, paymentMethod = 'upi', promoCode = null } = req.body;

  if (!customer || !customer.name || !customer.phone || !customer.address) {
    return res.status(400).json({ success: false, message: 'Customer name, phone, and address are required' });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must contain at least 1 device item' });
  }

  const catalog = readDb('products.json');
  let calculatedSubtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const p = catalog.find(x => x.id === item.id);
    if (!p) {
      return res.status(400).json({ success: false, message: `Product ID ${item.id} does not exist` });
    }

    let unitPrice = p.price;
    if (item.customPrice && typeof item.customPrice === 'number') {
      unitPrice = item.customPrice;
    }

    const qty = Math.max(1, parseInt(item.qty) || 1);
    const itemTotal = unitPrice * qty;
    calculatedSubtotal += itemTotal;

    verifiedItems.push({
      id: p.id,
      name: p.name,
      variant: item.variant || 'Standard',
      unitPrice,
      qty,
      itemTotal,
      image: p.image
    });
  }

  // Calculate discounts
  let discountAmount = 0;
  if (promoCode) {
    const coupons = readDb('coupons.json');
    const c = coupons.find(x => x.code.toUpperCase() === promoCode.trim().toUpperCase() && x.active);
    if (c) {
      if (c.discountPercent) {
        discountAmount = Math.round(calculatedSubtotal * (c.discountPercent / 100));
      } else if (c.flatDiscount) {
        discountAmount = c.flatDiscount;
      }
    }
  }

  const finalTotal = Math.max(0, calculatedSubtotal - discountAmount);
  const orderId = 'TL-' + Math.floor(100000 + Math.random() * 900000);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const orderRecord = {
    orderId,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
    customer: {
      name: customer.name,
      phone: customer.phone,
      email: customer.email || '',
      address: customer.address,
      city: customer.city || 'Bengaluru',
      pin: customer.pin || '560001'
    },
    items: verifiedItems,
    pricing: {
      subtotal: calculatedSubtotal,
      discountAmount,
      promoCodeApplied: promoCode || null,
      shipping: 0,
      total: finalTotal
    },
    payment: {
      method: paymentMethod,
      status: 'authorized'
    },
    estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  };

  const orders = readDb('orders.json');
  orders.unshift(orderRecord);
  writeDb('orders.json', orders);

  console.log(`[ORDER PLACED] Order #${orderId} confirmed for ${customer.name} — Total: ₹${finalTotal.toLocaleString('en-IN')}`);

  res.status(201).json({
    success: true,
    message: 'Order created and confirmed successfully',
    order: orderRecord
  });
});

// GET /api/orders/:id - Retrieve order details by ID
router.get('/:id', (req, res) => {
  const orders = readDb('orders.json');
  const order = orders.find(o => o.orderId === req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, order });
});

module.exports = router;
