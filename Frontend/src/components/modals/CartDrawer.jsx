import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice, normalizeImageUrl } from '../../utils/formatters';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    changeQty,
    cartSubtotal,
    discountAmount,
    cartTotal,
    activeCoupon,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div
        id="cartOverlay"
        className="cart-overlay open"
        onClick={() => setIsCartOpen(false)}
      />
      <div id="cartSidebar" className="cart-sidebar open" role="dialog" aria-modal="true">
        <div className="cart-sidebar-header">
          <h3>
            <span>🛒</span> Hardware Cart
          </h3>
          <button
            className="close-cart-btn"
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="cart-items" id="cartItems">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Your Cart is Empty</h3>
              <p style={{ marginTop: '6px', fontSize: '0.9rem' }}>
                Explore our high-performance laptops & tablets.
              </p>
              <Link
                to="/shop"
                className="btn-primary"
                style={{ marginTop: '1.5rem', display: 'inline-block' }}
                onClick={() => setIsCartOpen(false)}
              >
                Browse Shop →
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={`${item.id}-${item.variant || 'default'}`}>
                <div className="cart-item-img">
                  <img src={normalizeImageUrl(item.image)} alt={item.name} />
                </div>
                <div class="cart-item-info">
                  <h4>{item.name}</h4>
                  {item.variant && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {item.variant}
                    </p>
                  )}
                  <div class="cart-item-price">{formatPrice(item.price)}</div>
                  <div class="cart-item-controls">
                    <button
                      class="qty-btn"
                      onClick={() => changeQty(item.id, -1, item.variant)}
                    >
                      −
                    </button>
                    <span class="qty-val">{item.qty}</span>
                    <button
                      class="qty-btn"
                      onClick={() => changeQty(item.id, 1, item.variant)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  class="remove-item-btn"
                  title="Remove item"
                  onClick={() => removeFromCart(item.id, item.variant)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div class="cart-footer" id="cartFooter">
            <div class="cart-total-row">
              <span>Subtotal</span>
              <span id="cartTotal">{formatPrice(cartSubtotal)}</span>
            </div>

            {activeCoupon && (
              <div class="cart-total-row" style={{ color: 'var(--emerald-stock)', fontSize: '0.9rem' }}>
                <span>Coupon ({activeCoupon.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div class="cart-total-row" style={{ fontWeight: 'bold', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(cartTotal)}</span>
              </div>
            )}

            <button
              class="checkout-btn"
              id="openCheckoutBtn"
              onClick={handleProceedToCheckout}
            >
              Proceed to Secure Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
