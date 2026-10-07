import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { fetchProducts, getQuizRecommendation, subscribeNewsletter } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';

export default function HomePage({ onQuickView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [quizPurpose, setQuizPurpose] = useState('creative');
  const [quizBudget, setQuizBudget] = useState('premium');
  const [quizOS, setQuizOS] = useState('macos');
  const [quizResult, setQuizResult] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // Newsletter state
  const [nlEmail, setNlEmail] = useState('');
  const [nlSubmitting, setNlSubmitting] = useState(false);

  // Countdown timer for Deal of the Day
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setQuizLoading(true);
    try {
      const data = await getQuizRecommendation({
        purpose: quizPurpose,
        budget: quizBudget,
        os: quizOS
      });
      setQuizResult(data);
    } catch (err) {
      showToast(`Quiz error: ${err.message}`);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlSubmitting(true);
    try {
      const data = await subscribeNewsletter(nlEmail);
      showToast(`🎉 ${data.message}`);
      setNlEmail('');
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    } finally {
      setNlSubmitting(false);
    }
  };

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="home-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>New Gen-14 & M3 Silicon Lineup 2025</span>
          </div>

          <h1>
            Next-Level Tech<br />
            <span>Engineered to Excel</span>
          </h1>
          <p>
            Discover flagship laptops, high-performance MacBooks, and pro-grade tablets engineered for unstoppable creators, gamers, and software engineers.
          </p>

          <div className="hero-btns">
            <Link to="/shop" className="btn-primary">
              Explore Full Catalog →
            </Link>
            <a href="#quizSection" className="btn-outline">
              Take Tech Match Quiz ⚡
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>500<span>+</span></h3>
              <p>Curated Devices</p>
            </div>
            <div className="stat-item">
              <h3>50K<span>+</span></h3>
              <p>Happy Tech Lovers</p>
            </div>
            <div className="stat-item">
              <h3>4.9<span>★</span></h3>
              <p>Verified Rating</p>
            </div>
            <div className="stat-item">
              <h3>2<span>Yr</span></h3>
              <p>Official Warranty</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow-ring"></div>
          <div className="hero-img-wrap">
            <img src="/images/laptop.png" alt="Dell XPS 15 OLED Flagship" />
            <div className="floating-pill pill-1">
              <span>⚡</span>
              <span>RTX 4080 • OLED 240Hz</span>
            </div>
            <div className="floating-pill pill-2">
              <span>🔋</span>
              <span>22-Hour All-Day Battery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="categories">
        <div className="section-header">
          <span className="section-tag">Explore Architectures</span>
          <h2>Tailored For Your <span>Workflow</span></h2>
          <p>Explore specialized silicon engineered for coding, high-refresh gaming, and creative color grading.</p>
        </div>

        <div className="category-grid">
          <Link to="/shop?cat=laptops" className="category-card">
            <div className="category-icon">💻</div>
            <h3>Windows Workstations</h3>
            <p>High-TGP RTX graphics, upgradable DDR5 memory, and vapor chamber cooling for developers & gamers.</p>
            <span className="cat-link">View Laptops →</span>
          </Link>

          <Link to="/shop?cat=macbooks" className="category-card">
            <div className="category-icon">⚡</div>
            <h3>Apple MacBooks</h3>
            <p>Industry-leading Liquid Retina XDR displays, silent thermal designs, and extreme battery life on M3 Max.</p>
            <span className="cat-link">View MacBooks →</span>
          </Link>

          <Link to="/shop?cat=tablets" className="category-card">
            <div className="category-icon">📱</div>
            <h3>Pro Tablets & 2-in-1s</h3>
            <p>Featherweight mobility with OLED stylus digitizers and magnetic magic keyboard workstations.</p>
            <span className="cat-link">View Tablets →</span>
          </Link>
        </div>
      </section>

      {/* ===== TECH QUIZ SECTION ===== */}
      <section className="tech-quiz-section" id="quizSection">
        <div className="section-header">
          <span className="section-tag">AI Hardware Advisor</span>
          <h2>Not Sure Which Device to Choose? <span>Take the 60-Sec Quiz</span></h2>
          <p>Answer 3 quick questions. Our hardware recommendation engine will match your workload to the exact benchmark-verified machine.</p>
        </div>

        <div className="quiz-container">
          <form className="quiz-form" onSubmit={handleQuizSubmit}>
            <div className="quiz-step">
              <label>1. Primary Primary Workload:</label>
              <div className="quiz-options-row">
                {[
                  { val: 'creative', label: '🎨 Video / 3D / Creative' },
                  { val: 'gaming', label: '🎮 High-FPS Gaming' },
                  { val: 'mobility', label: '✈️ Coding & Ultra-Mobility' }
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    className={`quiz-opt-btn ${quizPurpose === opt.val ? 'active' : ''}`}
                    onClick={() => setQuizPurpose(opt.val)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-step">
              <label>2. Target Budget Range:</label>
              <div className="quiz-options-row">
                {[
                  { val: 'budget', label: '₹50,000 – ₹1,00,000' },
                  { val: 'premium', label: '₹1,00,000 – ₹1,80,000' },
                  { val: 'flagship', label: '₹1,80,000+' }
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    className={`quiz-opt-btn ${quizBudget === opt.val ? 'active' : ''}`}
                    onClick={() => setQuizBudget(opt.val)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-step">
              <label>3. Operating System Preference:</label>
              <div className="quiz-options-row">
                {[
                  { val: 'macos', label: '🍎 macOS (Apple Silicon)' },
                  { val: 'windows', label: '🪟 Windows 11 Pro' },
                  { val: 'tablet', label: '📱 iPadOS / Android' }
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    className={`quiz-opt-btn ${quizOS === opt.val ? 'active' : ''}`}
                    onClick={() => setQuizOS(opt.val)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary quiz-submit-btn" disabled={quizLoading}>
              {quizLoading ? 'Analyzing Silicon Benchmarks...' : '⚡ Calculate Best Machine Match'}
            </button>
          </form>

          {quizResult && quizResult.match && (
            <div className="quiz-result-card" style={{ marginTop: '2rem' }}>
              <div className="quiz-match-score">
                <span>99.2% Match Score</span>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <img
                  src={quizResult.match.image}
                  alt={quizResult.match.name}
                  style={{ width: '160px', height: '110px', objectFit: 'contain' }}
                />
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <h3 style={{ fontSize: '1.4rem' }}>{quizResult.match.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0' }}>
                    {quizResult.reason}
                  </p>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', margin: '8px 0' }}>
                    {formatPrice(quizResult.match.price)}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="btn-primary"
                      onClick={() => addToCart(quizResult.match)}
                    >
                      🛒 Add Matched Device
                    </button>
                    <button
                      className="btn-outline"
                      onClick={() => onQuickView && onQuickView(quizResult.match)}
                    >
                      View Full Specs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== FEATURED HARDWARE SECTION ===== */}
      <section className="featured">
        <div className="section-header">
          <span className="section-tag">Handpicked Flags</span>
          <h2>Flagship <span>Hardware Drops</span></h2>
          <p>Top benchmark-performing machines verified by our Bangalore hardware engineers.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading flagship hardware...
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/shop" className="btn-primary" style={{ padding: '14px 36px', fontSize: '1rem' }}>
            Browse All 15+ Machines in Catalog →
          </Link>
        </div>
      </section>

      {/* ===== DEALS SECTION ===== */}
      <section className="deals">
        <div className="deals-inner">
          <div className="deals-content">
            <span className="deals-badge">⚡ Deal of the Day — 20% Off</span>
            <h2>Dell XPS 15 <span>OLED Flagship</span></h2>
            <p>14th Gen Intel Core i9 • RTX 4060 • 3.5K OLED 500-Nit Touchscreen • 32GB DDR5 5600MHz RAM • 1TB NVMe SSD.</p>

            <div className="countdown-timer">
              <div className="time-block">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <p>Hours</p>
              </div>
              <div className="time-block">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <p>Mins</p>
              </div>
              <div className="time-block">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <p>Secs</p>
              </div>
            </div>

            <div className="deals-pricing">
              <span className="deal-curr">₹1,49,999</span>
              <span className="deal-old">₹1,75,000</span>
              <span className="price-discount-pill">-14% OFF</span>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  const dealProduct = products.find(p => p.id === 1);
                  if (dealProduct) addToCart(dealProduct);
                }}
              >
                Claim Deal Now 🛒
              </button>
              <Link to="/shop" className="btn-outline">
                View All Deals
              </Link>
            </div>
          </div>

          <div className="deals-img-wrap">
            <img src="/images/laptop.png" alt="Dell XPS 15 Deal" />
          </div>
        </div>
      </section>

      {/* ===== TRUST PILLARS SECTION ===== */}
      <section className="features">
        <div className="section-header">
          <span className="section-tag">The TopLap Promise</span>
          <h2>Why Elite Creators & <span>Engineers Choose Us</span></h2>
          <p>Unmatched warranty support, authentic supply chain, and doorstep hardware servicing.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>2-Year Comprehensive Warranty</h3>
            <p>Every single machine includes our zero-hassle 2-year warranty with free on-site doorstep diagnostics across 120+ cities.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Free White-Glove Express Delivery</h3>
            <p>Shockproof Pelican-grade packaging with insured 24-48hr courier dispatch across all major Indian metropolitans.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>100% Direct Silicon Authenticity</h3>
            <p>Authorized Tier-1 distributor partnerships with Apple, Dell, Asus, Lenovo, and Samsung. Zero gray market units.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Dedicated Hardware Concierge</h3>
            <p>Real hardware architects available via live chat, WhatsApp, and phone to calibrate specs for your specific IDE or render pipeline.</p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="testimonials">
        <div className="section-header">
          <span className="section-tag">Community Feedback</span>
          <h2>Validated by <span>50,000+ Technologists</span></h2>
          <p>Read what software architects, studio artists, and founders have to say about their TopLap hardware.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>
              "Received my MacBook Pro 16 M3 Max within 26 hours in Indiranagar. Unboxing felt ultra-premium. The custom MDM provisioning worked out of the box."
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">VR</div>
              <div>
                <h4>Vikram Raghavan</h4>
                <p>Staff AI Engineer @ Unicorn Labs</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>
              "The ASUS ROG Zephyrus G16 runs Cyberpunk at 110fps without throttling. TopLap's 2-year warranty gives me total peace of mind for heavy workstation loads."
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">SK</div>
              <div>
                <h4>Siddharth K.</h4>
                <p>Lead Unreal Engine Developer</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>
              "Used the Tech Quiz to find a lightweight machine for travel. The Lenovo ThinkPad X1 Carbon Gen 12 is insanely light and lasts through long transits."
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">PM</div>
              <div>
                <h4>Pooja Mehta</h4>
                <p>Product VP & Angel Investor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <span className="section-tag" style={{ background: 'rgba(0,240,255,0.15)' }}>
            VIP Tech Circle
          </span>
          <h2>Unlock 10% Off Your <span>First Order</span></h2>
          <p>
            Subscribe to receive priority hardware drop notifications, benchmark comparisons, and private VIP promotional codes.
          </p>

          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              value={nlEmail}
              onChange={(e) => setNlEmail(e.target.value)}
            />
            <button type="submit" disabled={nlSubmitting}>
              {nlSubmitting ? 'Joining...' : 'Join & Unlock 10% 🎯'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
