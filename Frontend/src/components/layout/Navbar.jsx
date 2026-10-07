import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onOpenSearch }) {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav id="navbar">
      <Link to="/" className="logo" onClick={closeMobileMenu}>
        <span className="logo-icon">⚡</span>
        <span className="logo-text-top">Top</span>
        <span className="logo-text-lap">Lap</span>
      </Link>

      <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="navLinks">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMobileMenu}
          >
            Shop Catalog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMobileMenu}
          >
            Contact & Support
          </NavLink>
        </li>
      </ul>

      <div className="nav-actions">
        {/* Live Search Trigger */}
        <button
          className="nav-search-btn"
          id="searchToggle"
          aria-label="Search devices"
          onClick={onOpenSearch}
        >
          <span>🔍</span>
          <span>Search devices...</span>
          <span className="nav-search-shortcut">/</span>
        </button>

        {/* Wishlist Trigger */}
        <button
          className="icon-badge-btn"
          id="wishlistToggle"
          aria-label="View Wishlist"
          title="Wishlist"
          onClick={() => setIsWishlistOpen(true)}
        >
          ♡
          <span className="badge-count" id="wishlistCount">
            {wishlistCount}
          </span>
        </button>

        {/* Cart Trigger */}
        <button
          className="cart-btn-nav"
          id="cartToggle"
          aria-label="Open Cart"
          onClick={() => setIsCartOpen(true)}
        >
          <span>🛒</span>
          <span>Cart</span>
          <span className="cart-count" id="cartCount">
            {cartCount}
          </span>
        </button>

        {/* User Account / Sign In */}
        <Link
          to="/login"
          className="user-nav-btn"
          title={isAuthenticated ? `Signed in as ${user.name}` : 'Sign In / Register'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            color: isAuthenticated ? 'var(--primary)' : 'var(--text-light)',
            background: 'var(--bg-surface)',
            border: isAuthenticated ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            transition: 'var(--transition-fast)'
          }}
        >
          <span>👤</span>
          <span style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isAuthenticated ? user.name.split(' ')[0] : 'Sign In'}
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          id="hamburger"
          aria-label="Open menu"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
