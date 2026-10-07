const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/db');

// GET /api/products - List products with optional search, category, brand, maxPrice, and sort
router.get('/', (req, res) => {
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

// GET /api/products/:id - Single product details
router.get('/:id', (req, res) => {
  const products = readDb('products.json');
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Device not found in catalog' });
  }

  res.json({ success: true, product });
});

module.exports = router;
