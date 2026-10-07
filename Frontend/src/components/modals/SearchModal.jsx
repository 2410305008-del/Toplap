import React, { useState, useEffect, useRef } from 'react';
import { fetchProducts } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { formatPrice, normalizeImageUrl } from '../../utils/formatters';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && !isOpen) {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      searchProducts(query);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  const searchProducts = async (searchTerm) => {
    setLoading(true);
    try {
      const data = await fetchProducts({ search: searchTerm });
      setResults(data.products || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    searchProducts(val);
  };

  const handlePillClick = (term) => {
    setQuery(term);
    searchProducts(term);
  };

  if (!isOpen) return null;

  return (
    <div id="searchModal" className="drawer-overlay open" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-header">
          <span style={{ fontSize: '1.3rem' }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            id="globalSearchInput"
            placeholder="Type to search (e.g. MacBook, OLED, RTX, Dell, iPad)..."
            autoComplete="off"
            value={query}
            onChange={handleInputChange}
          />
          <button className="drawer-close-btn" id="searchClose" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="search-tags-row">
          <span className="search-tag-label">Popular Searches:</span>
          <span className="search-tag-pill" onClick={() => handlePillClick('MacBook')}>
            🍎 MacBook M3
          </span>
          <span className="search-tag-pill" onClick={() => handlePillClick('OLED')}>
            ✨ 3.5K OLED
          </span>
          <span className="search-tag-pill" onClick={() => handlePillClick('RTX')}>
            🎮 RTX 4080
          </span>
          <span className="search-tag-pill" onClick={() => handlePillClick('iPad')}>
            📱 iPad Pro M4
          </span>
        </div>

        <div className="search-results-list" id="searchResultsList">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Searching catalog...
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No hardware matched "{query}". Try searching for Dell, Apple, OLED, or RTX.
            </div>
          ) : (
            results.map((product) => (
              <div
                className="cart-item"
                key={product.id}
                style={{ cursor: 'pointer', padding: '12px' }}
                onClick={() => {
                  onSelectProduct && onSelectProduct(product);
                  onClose();
                }}
              >
                <div className="cart-item-img">
                  <img src={normalizeImageUrl(product.image)} alt={product.name} />
                </div>
                <div className="cart-item-info">
                  <h4>{product.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.specsSummary}</p>
                  <div className="cart-item-price">{formatPrice(product.price)}</div>
                </div>
                <button
                  className="btn-primary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add +
                </button>
              </div>
            ))
          )}
        </div>

        <div className="search-footer-hint">
          <span>Tip: Press <strong>ESC</strong> to exit search</span>
          <span>Keyboard Shortcut: <strong>/</strong> or <strong>Ctrl+K</strong></span>
        </div>
      </div>
    </div>
  );
}
