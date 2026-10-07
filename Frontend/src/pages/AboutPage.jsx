import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ===== ABOUT HERO ===== */}
      <div className="about-hero">
        <div>
          <span className="section-tag">Engineering Ethos</span>
          <h1>Powering <span>Your Passion</span></h1>
          <p>
            We are a passionate team of hardware architects and tech enthusiasts dedicated to bringing the world's most elite personal computing devices to your doorstep.
          </p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> › <span>About Us</span>
          </div>
        </div>
      </div>

      {/* ===== OUR STORY ===== */}
      <section className="about-story">
        <div className="about-inner">
          <div className="about-text">
            <span className="section-tag">Origins</span>
            <h2>Born from a Passion for <span>Unthrottled Silicon</span></h2>
            <p>
              TopLap was founded in 2019 in Bengaluru by a circle of software engineers and competitive gamers who grew exhausted by confusing spec sheets, inflated dealer margins, and lackluster warranty support.
            </p>
            <p>
              We asked a fundamental question: <em>Why shouldn't buying a ₹1,50,000 workstation feel as refined and transparent as ordering a luxury timepiece?</em>
            </p>
            <p>
              Today, TopLap is an authorized direct distributor partnering with Apple, Dell, ASUS, Lenovo, and Samsung. We have shipped over 50,000 custom-configured laptops, MacBooks, and OLED tablets across 120+ Indian cities—every single device backed by a full 2-year warranty and white-glove support.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn-primary">
                Browse Certified Machines →
              </Link>
              <Link to="/contact" className="btn-outline">
                Visit Our Labs
              </Link>
            </div>
          </div>
          <div className="about-img">
            <img src="/images/macbook.png" alt="TopLap MacBook Showcase" />
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE MILESTONES ROADMAP ===== */}
      <section className="timeline-section">
        <div className="section-header">
          <span className="section-tag">Evolution</span>
          <h2>Our Journey & <span>Milestones</span></h2>
          <p>How a boutique Bangalore hardware collective transformed into India's premier tech platform.</p>
        </div>

        <div className="timeline-track">
          <div className="timeline-item left">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <span className="timeline-year">2019</span>
              <h4>The Inception in Indiranagar</h4>
              <p>Founded as a specialized setup lab helping local AI researchers and game studios procure calibrated, high-TGP laptops.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <span className="timeline-year">2021</span>
              <h4>Apple Silicon & Enterprise Expansion</h4>
              <p>Became an early pioneer in enterprise deployment of Apple M1 & M2 MacBooks with custom zero-touch MDM provisioning.</p>
            </div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <span className="timeline-year">2023</span>
              <h4>50,000 Happy Tech Enthusiasts</h4>
              <p>Crossed 50,000 satisfied customers across India and introduced our signature 2-Year Comprehensive Warranty program.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <span className="timeline-year">2025</span>
              <h4>AI Hardware & Flagship Experience Centers</h4>
              <p>Opened state-of-the-art interactive Experience Centers in Bengaluru, Mumbai, and Delhi NCR with live benchmark testing stations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="features">
        <div className="section-header">
          <span className="section-tag">Core Principles</span>
          <h2>The Pillars of <span>TopLap</span></h2>
          <p>The uncompromising standards that distinguish our platform from generic marketplaces.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>100% Genuine Direct Supply</h3>
            <p>Every motherboard, screen, and charger is serial-verified and authenticated directly from authorized OEM distributors.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Complimentary 2-Year Warranty</h3>
            <p>We back our confidence in hardware by doubling the manufacturer warranty at zero additional cost on all premium tier devices.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Zero Bloatware Guarantee</h3>
            <p>Every Windows laptop we ship can be custom pre-configured with a clean, unbloated OS image for peak benchmark performance out of the box.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Direct Engineer Support</h3>
            <p>No robotic phone scripts. Talk directly to hardware engineers who understand thermal paste, TGP watts, clock speeds, and unified memory architecture.</p>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP TEAM ===== */}
      <section className="features" style={{ background: 'var(--bg-surface)' }}>
        <div className="section-header">
          <span className="section-tag">Architects & Leaders</span>
          <h2>Meet the <span>Hardware Minds</span></h2>
          <p>Hardware veterans passionate about silicon innovation and user delight.</p>
        </div>

        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>👨‍💻</div>
            <h3>Aryan Kapoor</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>Founder & Principal Hardware Architect</p>
          </div>

          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>👩‍🔬</div>
            <h3>Sneha Patel</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>Head of Brand Partnerships & Logistics</p>
          </div>

          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧑‍🎨</div>
            <h3>Karan Joshi</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>Lead Industrial UX & Benchmark Specialist</p>
          </div>

          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧑‍💼</div>
            <h3>Meena Rao</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>VP of Customer Delight & Technical Care</p>
          </div>
        </div>
      </section>

      {/* ===== VERIFIED NUMBERS / STATS ===== */}
      <section className="deals">
        <div className="deals-inner" style={{ justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--primary)' }}>50K+</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Machines Delivered</p>
          </div>
          <div>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--primary)' }}>500+</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Curated Configurations</p>
          </div>
          <div>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--primary)' }}>99.4%</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Customer Satisfaction</p>
          </div>
          <div>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--primary)' }}>6 Years</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Of Hardware Excellence</p>
          </div>
        </div>
      </section>
    </div>
  );
}
