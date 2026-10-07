import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice, normalizeImageUrl } from '../../utils/formatters';

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  return (
    <>
      <div
        id="wishlistOverlay"
        className="cart-overlay open"
        onClick={() => setIsWishlistOpen(false)}
      />
      <div id="wishlistSidebar" className="cart-sidebar open" role="dialog" aria-modal="true">
        <div className="cart-sidebar-header">
          <h3>
            <span>💙</span> Saved Wishlist
          </h3>
          <button
            className="close-cart-btn"
            aria-label="Close wishlist"
            onClick={() => setIsWishlistOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="cart-items" id="wishlistItems">
          {wishlist.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-icon">💙</div>
              <h3>Your Wishlist is Empty</h3>
              <p style={{ marginTop: '6px', fontSize: '0.9rem' }}>
                Click the heart icon on any device to save it for later.
              </p>
              <Link
                to="/shop"
                className="btn-primary"
                style={{ marginTop: '1.5rem', display: 'inline-block' }}
                onClick={() => setIsWishlistOpen(false)}
              >
                Browse Devices →
              </Link>
            </div>
          ) : (
            wishlist.map(product => (
              <div className="cart-item" key={product.id}>
                <div className="cart-item-img">
                  <img src={normalizeImageUrl(product.image)} alt={product.name} />
                </div>
                <div class="cart-item-info">
                  <h4>{product.name}</h4>
                  <div class="cart-item-price">{formatPrice(product.price)}</div>
                  <button
                    class="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', marginTop: '4px' }}
                    onClick={() => handleMoveToCart(product)}
                  >
                    Move to Cart 🛒
                  </button>
                </div>
                <button
                  class="remove-item-btn"
                  title="Remove"
                  onClick={() => toggleWishlist(product)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
