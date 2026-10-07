import React from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { formatPrice, renderStars, normalizeImageUrl } from '../../utils/formatters';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  let badgeClass = '';
  if (product.badge === 'Sale') badgeClass = 'sale';
  else if (product.badge === 'Hot') badgeClass = 'hot';
  else if (product.badge === 'Flagship') badgeClass = 'flagship';

  return (
    <div className="product-card" data-id={product.id} data-cat={product.category} data-brand={product.brand}>
      {product.badge && (
        <div className={`product-badge ${badgeClass}`}>
          {product.badge}
        </div>
      )}

      <div className="product-img">
        <img src={normalizeImageUrl(product.image)} alt={product.name} loading="lazy" />
        <div className="product-actions">
          <button
            className="action-btn"
            title="Quick View"
            onClick={() => onQuickView && onQuickView(product)}
          >
            👁️
          </button>
          <button
            className={`action-btn ${isWishlisted ? 'active-heart' : ''}`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={() => toggleWishlist(product)}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category-brand">
          <span>{product.brand?.toUpperCase()}</span>
          <span className="product-stock-tag">In Stock ({product.stock})</span>
        </div>

        <h3>{product.name}</h3>
        <p className="product-specs-summary">{product.specsSummary}</p>

        <div className="product-meta">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="price-old">{formatPrice(product.oldPrice)}</span>}
          {discountPercent > 0 && (
            <span className="price-discount-pill">-{discountPercent}%</span>
          )}
        </div>

        <div className="product-card-bottom-actions">
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            🛒 Add to Cart
          </button>
          <button
            className={`compare-toggle-btn ${isCompared ? 'active' : ''}`}
            title="Compare Specs"
            onClick={() => toggleCompare(product)}
          >
            {isCompared ? '✓ Compare' : '+ Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}
