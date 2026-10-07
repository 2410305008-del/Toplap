import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';

export default function Footer() {
  const { setIsCompareModalOpen } = useCompare();

  return (
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <Link to="/" class="logo">
            <span class="logo-icon">⚡</span>
            <span class="logo-text-top">Top</span>
            <span class="logo-text-lap">Lap</span>
          </Link>
          <p>
            India's premier high-tech store for enthusiasts, creators, and engineers.
            Sourcing authenticated, brand-new hardware directly from authorized distributors.
          </p>
          <div class="socials">
            <a href="#twitter" class="social-btn" title="Twitter / X" onClick={(e) => e.preventDefault()}>𝕏</a>
            <a href="#instagram" class="social-btn" title="Instagram" onClick={(e) => e.preventDefault()}>📷</a>
            <a href="#linkedin" class="social-btn" title="LinkedIn" onClick={(e) => e.preventDefault()}>in</a>
            <a href="#youtube" class="social-btn" title="YouTube" onClick={(e) => e.preventDefault()}>▶</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Catalog</h4>
          <ul>
            <li><Link to="/shop?cat=laptops">Windows Laptops</Link></li>
            <li><Link to="/shop?cat=macbooks">Apple MacBooks</Link></li>
            <li><Link to="/shop?cat=tablets">Pro Tablets</Link></li>
            <li><Link to="/shop">All Certified Devices</Link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Experience</h4>
          <ul>
            <li><Link to="/about">Our Story & Team</Link></li>
            <li><Link to="/contact">Experience Centers</Link></li>
            <li><Link to="/#quizSection">Interactive Tech Match</Link></li>
            <li>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, font: 'inherit' }}
                onClick={() => setIsCompareModalOpen(true)}
              >
                Side-by-Side Comparison
              </button>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Support & Trust</h4>
          <ul>
            <li><Link to="/contact">Track Order / Ticket</Link></li>
            <li><Link to="/contact">2-Year Warranty Claims</Link></li>
            <li><Link to="/contact">30-Day Doorstep Returns</Link></li>
            <li><Link to="/contact">Enterprise GST Billing</Link></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          © 2025 <span>TopLap High-Performance Tech Technologies Pvt Ltd</span>. All rights reserved. Crafted with ⚡ for tech enthusiasts.
        </p>
      </div>
    </footer>
  );
}
