const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Helper functions for zero-setup JSON database
function readDb(filename, fallback = []) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return fallback;
  }
}

function writeDb(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// ================================================================
// REST API ENDPOINTS
// ================================================================

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'TopLap High-Performance Tech API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 2. Get Products (with Search, Category, Brand, MaxPrice, and Sorting)
app.get('/api/products', (req, res) => {
  let products = readDb('products.json');
  const { category, brand, maxPrice, search, sort } = req.query;

  if (category) {
    const cats = category.toLowerCase().split(',');
    products = products.filter(p => cats.includes(p.category.toLowerCase()));
  }

  if (brand) {
    const brands = brand.toLowerCase().split(',');
    products = products.filter(p => brands.includes(p.brand.toLowerCase()));
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      products = products.filter(p => p.price <= max);
    }
  }

  if (search) {
    const query = search.toLowerCase().trim();
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      (p.specsSummary && p.specsSummary.toLowerCase().includes(query)) ||
      (p.specs && p.specs.cpu && p.specs.cpu.toLowerCase().includes(query))
    );
  }

  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'reviews') {
    products.sort((a, b) => b.reviews - a.reviews);
  }

  res.json({
    success: true,
    count: products.length,
    products
  });
});

// 3. Get Single Product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readDb('products.json');
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Device not found in catalog' });
  }

  res.json({ success: true, product });
});

// 4. Validate Promo Code
app.post('/api/coupons/validate', (req, res) => {
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

// 5. Create Order
app.post('/api/orders', (req, res) => {
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

// 6. Get Order by ID
app.get('/api/orders/:id', (req, res) => {
  const orders = readDb('orders.json');
  const order = orders.find(o => o.orderId === req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, order });
});

// 7. Contact Support Ticket Submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
  }

  const ticketId = 'TL-TICK-' + Math.floor(1000 + Math.random() * 9000);
  const ticketRecord = {
    ticketId,
    createdAt: new Date().toISOString(),
    status: 'open',
    priority: subject === 'warranty' || subject === 'returns' ? 'high' : 'normal',
    name,
    email,
    phone: phone || '',
    subject: subject || 'general',
    message
  };

  const tickets = readDb('tickets.json');
  tickets.unshift(ticketRecord);
  writeDb('tickets.json', tickets);

  console.log(`[TICKET CREATED] #${ticketId} from ${name} (${email}) - Subject: ${subject}`);

  res.status(201).json({
    success: true,
    message: `Support ticket #${ticketId} created successfully. An advisor will contact you within 4 business hours.`,
    ticketId
  });
});

// 8. Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
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

// 9. Tech Quiz Recommendation Engine
app.post('/api/quiz/recommend', (req, res) => {
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

// 10. Dashboard Stats
app.get('/api/stats', (req, res) => {
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

// ================================================================
// STATIC ASSET SERVING
// ================================================================
app.use(express.static(__dirname));

// Fallback to index.html for unknown routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log('================================================================');
  console.log(`⚡ TopLap High-Performance Tech Backend Server Online`);
  console.log(`📡 Local URL:        http://localhost:${PORT}`);
  console.log(`🛍️ Catalog:          http://localhost:${PORT}/shop.html`);
  console.log(`🩺 Health Check:     http://localhost:${PORT}/api/health`);
  console.log(`📦 Products API:     http://localhost:${PORT}/api/products`);
  console.log(`================================================================`);
});
