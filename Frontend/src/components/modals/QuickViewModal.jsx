import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice, renderStars, normalizeImageUrl } from '../../utils/formatters';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    setSelectedVariantIndex(0);
  }, [product]);

  if (!product) return null;

  const variants = product.variants || [];
  const selectedVariant = variants[selectedVariantIndex] || null;
  const currentPrice = selectedVariant
    ? product.price + (selectedVariant.priceOffset || 0)
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant ? selectedVariant.ram : null, currentPrice);
    onClose();
  };

  return (
    <div
      id="quickViewModal"
      className="drawer-overlay open"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="quick-view-box" onClick={(e) => e.stopPropagation()}>
        <button className="qv-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="qv-content-grid">
          <div className="qv-visual-wrap">
            <img src={normalizeImageUrl(product.image)} alt={product.name} id="qvImg" />
          </div>

          <div className="qv-details-wrap">
            <span className="qv-brand-badge" id="qvBrand">
              {product.brand?.toUpperCase()} • {product.category?.toUpperCase()}
            </span>
            <h2 id="qvTitle">{product.name}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="stars">{renderStars(product.rating)}</span>
              <span className="rating-count">({product.reviews} verified reviews)</span>
            </div>

            <div className="qv-price-row">
              <span className="qv-price-current">{formatPrice(currentPrice)}</span>
              {product.oldPrice && (
                <span className="qv-price-old">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            {variants.length > 0 && (
              <div className="qv-config-options">
                <h4>Select Specification Tier:</h4>
                <div className="qv-variants-grid">
                  {variants.map((v, idx) => (
                    <button
                      key={idx}
                      className={`qv-variant-btn ${idx === selectedVariantIndex ? 'selected' : ''}`}
                      onClick={() => setSelectedVariantIndex(idx)}
                    >
                      <span>{v.ram}</span>
                      <span className="qv-offset-price">
                        {v.priceOffset > 0
                          ? `+${formatPrice(v.priceOffset)}`
                          : v.priceOffset < 0
                          ? `-${formatPrice(Math.abs(v.priceOffset))}`
                          : 'Included'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.specs && (
              <div className="qv-specs-table">
                <h4>Technical Specifications:</h4>
                <div className="specs-grid">
                  {product.specs.cpu && (
                    <div className="spec-row">
                      <span className="spec-label">Processor</span>
                      <span className="spec-value">{product.specs.cpu}</span>
                    </div>
                  )}
                  {product.specs.gpu && (
                    <div className="spec-row">
                      <span className="spec-label">Graphics</span>
                      <span className="spec-value">{product.specs.gpu}</span>
                    </div>
                  )}
                  {product.specs.ram && (
                    <div className="spec-row">
                      <span className="spec-label">Memory</span>
                      <span className="spec-value">{product.specs.ram}</span>
                    </div>
                  )}
                  {product.specs.storage && (
                    <div className="spec-row">
                      <span className="spec-label">Storage</span>
                      <span className="spec-value">{product.specs.storage}</span>
                    </div>
                  )}
                  {product.specs.display && (
                    <div className="spec-row">
                      <span className="spec-label">Display</span>
                      <span className="spec-value">{product.specs.display}</span>
                    </div>
                  )}
                  {product.specs.battery && (
                    <div className="spec-row">
                      <span className="spec-label">Battery</span>
                      <span className="spec-value">{product.specs.battery}</span>
                    </div>
                  )}
                  {product.specs.os && (
                    <div className="spec-row">
                      <span className="spec-label">OS</span>
                      <span className="spec-value">{product.specs.os}</span>
                    </div>
                  )}
                  {product.specs.weight && (
                    <div className="spec-row">
                      <span className="spec-label">Weight</span>
                      <span className="spec-value">{product.specs.weight}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px' }}>
              <button
                className="btn-primary"
                style={{ flex: 1, padding: '12px' }}
                onClick={handleAddToCart}
              >
                🛒 Add Selected Configuration to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
