import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { fetchProducts } from '../services/api';
import { formatPrice } from '../utils/formatters';

export default function ShopPage({ onQuickView }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [selectedCats, setSelectedCats] = useState(() => {
    const catParam = searchParams.get('cat');
    return catParam ? [catParam] : ['laptops', 'macbooks', 'tablets'];
  });

  const [selectedBrands, setSelectedBrands] = useState([
    'apple',
    'dell',
    'asus',
    'lenovo',
    'samsung'
  ]);

  const [maxPrice, setMaxPrice] = useState(300000);
  const [sortOrder, setSortOrder] = useState('default');
  const [inlineSearch, setInlineSearch] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync URL cat param if it changes
  useEffect(() => {
    const catParam = searchParams.get('cat');
    if (catParam && !selectedCats.includes(catParam)) {
      setSelectedCats([catParam]);
    }
  }, [searchParams]);

  // Fetch products with active filters
  useEffect(() => {
    let isMounted = true;
    async function loadFilteredProducts() {
      setLoading(true);
      try {
        const filters = {
          category: selectedCats,
          brand: selectedBrands,
          maxPrice: maxPrice < 300000 ? maxPrice : undefined,
          sort: sortOrder,
          search: inlineSearch.trim() || undefined
        };
        const data = await fetchProducts(filters);
        if (isMounted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFilteredProducts();
    return () => {
      isMounted = false;
    };
  }, [selectedCats, selectedBrands, maxPrice, sortOrder, inlineSearch]);

  const handleCategoryToggle = (cat) => {
    setSelectedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCats(['laptops', 'macbooks', 'tablets']);
    setSelectedBrands(['apple', 'dell', 'asus', 'lenovo', 'samsung']);
    setMaxPrice(300000);
    setSortOrder('default');
    setInlineSearch('');
    setSearchParams({});
  };

  return (
    <div className="shop-page">
      {/* ===== SHOP HERO ===== */}
      <div className="shop-hero">
        <div>
          <span className="section-tag">Flagship Inventory</span>
          <h1>Hardware <span>Catalog</span></h1>
          <p>Compare and configure 15+ benchmark-shattering laptops, MacBooks, and OLED tablets.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> › <span>Store Catalog</span>
          </div>
        </div>
      </div>

      {/* ===== SHOP LAYOUT ===== */}
      <div className="shop-layout">
        {/* Filters Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>⚡ Refine Gear</h3>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {[
              { val: 'laptops', label: 'Windows Laptops' },
              { val: 'macbooks', label: 'Apple MacBooks' },
              { val: 'tablets', label: 'Pro Tablets & 2-in-1s' }
            ].map(item => (
              <label className="filter-check" key={item.val}>
                <input
                  type="checkbox"
                  checked={selectedCats.includes(item.val)}
                  onChange={() => handleCategoryToggle(item.val)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Brand Manufacturer</h4>
            {[
              { val: 'apple', label: 'Apple (M2 / M3 Pro / M4)' },
              { val: 'dell', label: 'Dell (XPS / Inspiron)' },
              { val: 'asus', label: 'ASUS (ROG / VivoBook)' },
              { val: 'lenovo', label: 'Lenovo (ThinkPad / Legion)' },
              { val: 'samsung', label: 'Samsung (Galaxy Tab Ultra)' }
            ].map(item => (
              <label className="filter-check" key={item.val}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(item.val)}
                  onChange={() => handleBrandToggle(item.val)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Max Budget</h4>
            <div className="price-range">
              <input
                type="range"
                min="40000"
                max="300000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-labels">
                <span>₹40K</span>
                <span>{formatPrice(maxPrice)}</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h4>Sort Preference</h4>
            <select
              className="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="default">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>

          <button className="clear-filters" onClick={handleResetFilters}>
            ✕ Reset All Filters
          </button>
        </aside>

        {/* Main Catalog View */}
        <div style={{ flex: 1 }}>
          {/* Controls Toolbar */}
          <div className="shop-toolbar">
            <div className="shop-search-inline">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Filter by chip, model, or spec..."
                value={inlineSearch}
                onChange={(e) => setInlineSearch(e.target.value)}
              />
            </div>

            <div className="toolbar-right">
              <p className="results-count">
                Showing {products.length} {products.length === 1 ? 'device' : 'devices'}
              </p>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              Filtering certified machines...
            </div>
          ) : products.length === 0 ? (
            <div className="catalog-empty-state" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3>No Certified Machines Found</h3>
              <p style={{ color: 'var(--text-muted)', margin: '8px 0 1.5rem' }}>
                Try loosening your filters, adjusting the max budget, or resetting all criteria.
              </p>
              <button className="btn-primary" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
