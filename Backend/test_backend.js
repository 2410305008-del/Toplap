const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log('🧪 Starting TopLap Modular Backend Verification Test Suite');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Health Check
  await test('GET /api/health', async () => {
    const res = await request({ hostname: 'localhost', port: 5000, path: '/api/health', method: 'GET' });
    if (res.status !== 200 || res.data.status !== 'online') {
      throw new Error(`Expected status 200 online, got ${res.status}`);
    }
    console.log(`   → Service: ${res.data.service} (Version: ${res.data.version})`);
  });

  // 2. Products List
  await test('GET /api/products', async () => {
    const res = await request({ hostname: 'localhost', port: 5000, path: '/api/products', method: 'GET' });
    if (res.status !== 200 || res.data.count !== 15) {
      throw new Error(`Expected 15 products, got ${res.data.count}`);
    }
    console.log(`   → Loaded ${res.data.count} certified devices`);
  });

  // 3. Filtered Products (Category + MaxPrice)
  await test('GET /api/products?category=laptops&maxPrice=150000', async () => {
    const res = await request({ hostname: 'localhost', port: 5000, path: '/api/products?category=laptops&maxPrice=150000', method: 'GET' });
    if (res.status !== 200 || !Array.isArray(res.data.products)) {
      throw new Error(`Filter failed`);
    }
    console.log(`   → Found ${res.data.products.length} laptops under ₹1,50,000`);
  });

  // 4. Single Product by ID
  await test('GET /api/products/7 (MacBook Pro 14 M3 Pro)', async () => {
    const res = await request({ hostname: 'localhost', port: 5000, path: '/api/products/7', method: 'GET' });
    if (res.status !== 200 || res.data.product.name !== 'MacBook Pro 14" M3 Pro') {
      throw new Error(`Product 7 mismatch`);
    }
    console.log(`   → Retrieved: ${res.data.product.name} (Price: ₹${res.data.product.price})`);
  });

  // 5. Coupon Validation
  await test('POST /api/coupons/validate (TOPLAP10)', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/coupons/validate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { code: 'TOPLAP10', subtotal: 150000 });

    if (res.status !== 200 || res.data.coupon.discountPercent !== 10) {
      throw new Error(`Coupon validation failed`);
    }
    console.log(`   → Validated code: ${res.data.coupon.code} (Discount: ₹${res.data.coupon.discountAmount})`);
  });

  // 6. Create Order
  let createdOrderId = null;
  await test('POST /api/orders (Create Order)', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/orders',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      customer: {
        name: 'Siddharth Rao',
        phone: '+91 98450 12345',
        email: 'sid.rao@example.com',
        address: '42, Brigade Road',
        city: 'Bengaluru',
        pin: '560025'
      },
      items: [
        { id: 1, qty: 1, variant: '32GB RAM / 1TB SSD' },
        { id: 11, qty: 1, variant: '256GB Wi-Fi' }
      ],
      promoCode: 'TOPLAP10',
      paymentMethod: 'upi'
    });

    if (res.status !== 201 || !res.data.order || !res.data.order.orderId) {
      throw new Error(`Order placement failed: ${JSON.stringify(res.data)}`);
    }
    createdOrderId = res.data.order.orderId;
    console.log(`   → Order Created: ${createdOrderId} | Total: ₹${res.data.order.pricing.total.toLocaleString('en-IN')}`);
  });

  // 7. Get Order by ID
  await test(`GET /api/orders/${createdOrderId || 'TL-100001'}`, async () => {
    const id = createdOrderId || 'TL-100001';
    const res = await request({ hostname: 'localhost', port: 5000, path: `/api/orders/${id}`, method: 'GET' });
    if (res.status !== 200 || res.data.order.orderId !== id) {
      throw new Error(`Retrieve order failed`);
    }
    console.log(`   → Retrieved Order #${res.data.order.orderId} for ${res.data.order.customer.name}`);
  });

  // 8. Contact Support Ticket
  await test('POST /api/contact (Support Ticket)', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Ananya Deshmukh',
      email: 'ananya.d@example.com',
      phone: '+91 91234 56789',
      subject: 'specs',
      message: 'Need advice on Dell XPS 15 vs MacBook Pro 14 for 4K video rendering.'
    });

    if (res.status !== 201 || !res.data.ticketId) {
      throw new Error(`Ticket submission failed`);
    }
    console.log(`   → Ticket Created: ${res.data.ticketId}`);
  });

  // 9. Newsletter Subscription
  await test('POST /api/newsletter (Subscribe)', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/newsletter',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: `techgeek_${Date.now()}@domain.in`
    });

    if (res.status !== 201 && res.status !== 200) {
      throw new Error(`Newsletter subscription failed`);
    }
    console.log(`   → Newsletter Registered: ${res.data.promoCode}`);
  });

  // 10. Tech Quiz Recommendation
  await test('POST /api/quiz/recommend (Gaming recommendation)', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/quiz/recommend',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      purpose: 'gaming',
      budget: 'flagship',
      os: 'windows'
    });

    if (res.status !== 200 || !res.data.match) {
      throw new Error(`Quiz recommendation failed`);
    }
    console.log(`   → Matched Hardware: ${res.data.match.name} (Score: ${res.data.score}%)`);
  });

  // 11. Stats
  await test('GET /api/stats', async () => {
    const res = await request({ hostname: 'localhost', port: 5000, path: '/api/stats', method: 'GET' });
    if (res.status !== 200 || typeof res.data.stats.totalProducts !== 'number') {
      throw new Error(`Stats endpoint failed`);
    }
    console.log(`   → Platform Stats: ${res.data.stats.totalProducts} products, ${res.data.stats.totalOrders} orders`);
  });

  console.log('\n================================================================');
  console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

// Start backend and run tests
const app = require('./server');
const server = app.listen(5000, async () => {
  try {
    await runTests();
  } finally {
    server.close();
  }
});
