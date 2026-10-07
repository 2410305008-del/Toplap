import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitSupportTicket } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState(null);

  // Experience Center Tabs
  const [activeCenter, setActiveCenter] = useState('bengaluru');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const centers = {
    bengaluru: {
      title: 'Bengaluru Tech Flagship',
      address: '12, Tech Park Lane, Cyber City, Indiranagar, Bengaluru 560001',
      phone: '+91 80 2345 6789',
      hours: 'Mon – Sat: 9:30 AM – 8:30 PM',
      features: [
        'Hands-on demo zone for RTX laptops',
        'Apple M3 Pro / M3 Max benchmark suite',
        'On-site certified hardware diagnostics'
      ]
    },
    mumbai: {
      title: 'Mumbai BKC Atelier',
      address: 'G-04, Horizon Towers, Bandra Kurla Complex, Mumbai 400051',
      phone: '+91 22 8765 4321',
      hours: 'Mon – Sat: 10:00 AM – 9:00 PM',
      features: [
        'Audiophile & color-grading creator workstations',
        'Direct corporate GST consultation lounge',
        'Express 2-hour doorstep pickup hub'
      ]
    },
    delhi: {
      title: 'Delhi NCR Innovation Hub',
      address: 'DLF CyberCity, Phase 2, Gurugram, Haryana 122002',
      phone: '+91 124 9988 7766',
      hours: 'Mon – Sat: 10:00 AM – 8:30 PM',
      features: [
        'High-FPS esports tournament battle station',
        'Thermal liquid metal repasting lab',
        'Full catalog unboxing & testing counter'
      ]
    }
  };

  const faqs = [
    {
      q: "How does TopLap's 2-Year Comprehensive Warranty work?",
      a: "Every device sold on TopLap includes the manufacturer's official 1-year brand warranty plus an additional 1-year TopLap Comprehensive Shield at zero extra charge. This covers hardware defects, screen failures, battery degradation below 80%, and motherboard repairs with free doorstep courier pickup."
    },
    {
      q: 'Are the laptops and MacBooks 100% brand new and factory-sealed?',
      a: 'Yes, absolutely. We strictly prohibit refurbished, open-box, or gray-market units. All devices arrive factory-sealed in their original manufacturer packaging with intact tamper-evident seals and verifiable serial numbers eligible for official manufacturer activation.'
    },
    {
      q: 'What is your 30-Day Return & Refund Policy?',
      a: 'If your device arrives damaged, experiences technical defects, or fails to meet your performance expectations, you can initiate a return within 30 days of delivery. Our courier will inspect and collect the device from your doorstep, and a 100% refund is credited back to your original payment method within 48 hours.'
    },
    {
      q: 'Can I purchase with a corporate GST invoice to claim input tax credit?',
      a: 'Yes! During checkout or by contacting enterprise@toplap.in, you can enter your registered Company Legal Name and 15-digit GSTIN. We will generate an automated GST-compliant tax invoice allowing you to claim up to 18% Input Tax Credit (ITC).'
    },
    {
      q: 'How fast is the shipping transit to non-metro cities?',
      a: 'All orders are air-shipped via priority couriers (Blue Dart Apex / Bluedart Air). Metro cities receive next-day or 2-day delivery; Tier-2 and Tier-3 cities receive delivery within 3 to 4 business days. Real-time SMS and WhatsApp tracking links are dispatched the moment your package is sealed.'
    }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await submitSupportTicket(formData);
      setTicketResult(data);
      showToast(`🎫 Support ticket <strong>#${data.ticketId}</strong> created!`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const currentCenter = centers[activeCenter];

  return (
    <div className="contact-page">
      {/* ===== CONTACT HERO ===== */}
      <div className="contact-hero">
        <div>
          <span className="section-tag">24/7 Concierge</span>
          <h1>Hardware <span>Assistance</span></h1>
          <p>
            Have questions about benchmarks, configurations, or warranty coverage? Connect directly with our engineering team.
          </p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> › <span>Contact & Support</span>
          </div>
        </div>
      </div>

      {/* ===== CONTACT LAYOUT ===== */}
      <div className="contact-layout">
        {/* Info Column */}
        <div className="contact-info">
          <span className="section-tag">Direct Channels</span>
          <h2>We Are Here to <span>Assist</span></h2>
          <p>
            Whether you need custom laptop thermal optimization, enterprise deployment quotes, or delivery updates, our certified advisors respond within 4 business hours.
          </p>

          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div>
              <h4>National Headquarters</h4>
              <p>
                12, Tech Park Lane, Cyber City, Indiranagar<br />
                Bengaluru, Karnataka 560001
              </p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <div>
              <h4>Direct Support Desk</h4>
              <p>
                +91 98765 43210 / +91 80 2345 6789<br />
                <span style={{ fontSize: '0.8rem', color: 'var(--emerald-stock)' }}>
                  ● Toll-free for Indian callers
                </span>
              </p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div>
              <h4>Email Inquiries</h4>
              <p>
                support@toplap.in (General Support)<br />
                enterprise@toplap.in (Corporate GST Orders)
              </p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">⏰</div>
            <div>
              <h4>Operating Hours</h4>
              <p>
                Mon – Sat: 9:00 AM – 8:00 PM IST<br />
                Sunday: Emergency Chat Support Only
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="contact-form">
          <h2>Open a Priority Support Ticket</h2>
          <p>Fill out the form below. You will receive an immediate confirmation ticket number.</p>

          {ticketResult && (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid var(--emerald-stock)',
                padding: '1.2rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                color: '#fff'
              }}
            >
              <h4 style={{ color: 'var(--emerald-stock)', marginBottom: '4px' }}>
                ✓ Ticket #{ticketResult.ticketId} Created Successfully
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-light)' }}>
                {ticketResult.message}
              </p>
            </div>
          )}

          <form onSubmit={handleContactSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aryan Sharma"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="aryan@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Nature of Inquiry *</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="specs">Laptop / Spec Recommendation</option>
                  <option value="warranty">2-Year Warranty Registration / Claim</option>
                  <option value="order">Order Tracking & Delivery Status</option>
                  <option value="returns">30-Day Doorstep Return / Refund</option>
                  <option value="corporate">Corporate & Bulk GST Purchase</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message / Device Details *</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Specify laptop model, benchmark requirements, or order ID..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" disabled={submitting} style={{ padding: '14px 28px' }}>
              {submitting ? 'Submitting Ticket...' : 'Submit Support Request 📨'}
            </button>
          </form>
        </div>
      </div>

      {/* ===== EXPERIENCE CENTERS TABS ===== */}
      <section className="experience-centers-section">
        <div className="section-header">
          <span className="section-tag">Interactive Showrooms</span>
          <h2>Experience Centers & <span>Labs</span></h2>
          <p>Test hardware live in person. Compare OLED vs Mini-LED side by side and feel mechanical keyboards.</p>
        </div>

        <div className="centers-tabs-nav">
          <button
            className={`center-tab-btn ${activeCenter === 'bengaluru' ? 'active' : ''}`}
            onClick={() => setActiveCenter('bengaluru')}
          >
            Bengaluru Flagship
          </button>
          <button
            className={`center-tab-btn ${activeCenter === 'mumbai' ? 'active' : ''}`}
            onClick={() => setActiveCenter('mumbai')}
          >
            Mumbai BKC Atelier
          </button>
          <button
            className={`center-tab-btn ${activeCenter === 'delhi' ? 'active' : ''}`}
            onClick={() => setActiveCenter('delhi')}
          >
            Delhi NCR Hub
          </button>
        </div>

        <div className="centers-content-card" id="experienceCenterCard">
          <div>
            <span className="section-tag" style={{ marginBottom: '0.8rem' }}>
              Flagship Experience Center
            </span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{currentCenter.title}</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>📍 {currentCenter.address}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              📞 {currentCenter.phone} | ⏰ {currentCenter.hours}
            </p>
            <div
              style={{
                background: 'rgba(0,240,255,0.06)',
                borderLeft: '3px solid var(--primary)',
                padding: '1rem',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.88rem',
                color: 'var(--text-light)',
                lineHeight: 1.7
              }}
            >
              {currentCenter.features.map((f, i) => (
                <div key={i}>• {f}</div>
              ))}
            </div>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-md)',
              height: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              padding: '2rem'
            }}
          >
            <span style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>📍</span>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Visit Our Experience Zone</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Walk-ins welcome. Complimentary tech consultation.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Get Directions ↗
            </a>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE FAQ ACCORDION ===== */}
      <section className="faq-section">
        <div className="section-header">
          <span className="section-tag">Clarity</span>
          <h2>Frequently Asked <span>Questions</span></h2>
          <p>Everything you need to know about purchasing, warranty coverage, and returns at TopLap.</p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
