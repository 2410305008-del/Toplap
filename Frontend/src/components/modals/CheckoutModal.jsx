import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { validateCoupon, submitOrder } from '../../services/api';
import { formatPrice } from '../../utils/formatters';

export default function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen
  } = useCart();

  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Bengaluru',
    pin: '560001'
  });
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
    setStep(1);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      showToast('⚠️ Please fill in all required shipping fields.');
      return;
    }
    setStep(2);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const data = await validateCoupon(couponCodeInput.trim(), cartSubtotal);
      applyCoupon(data.coupon);
      showToast(`🎟️ Coupon <strong>${data.coupon.code}</strong> applied successfully!`);
    } catch (err) {
      setCouponError(err.message || 'Invalid coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        customer,
        items: cart.map(item => ({
          id: item.id,
          qty: item.qty,
          variant: item.variant,
          customPrice: item.price
        })),
        promoCode: activeCoupon ? activeCoupon.code : null,
        paymentMethod
      };

      const res = await submitOrder(payload);
      setConfirmedOrder(res.order);
      clearCart();
      showToast(`🎉 Order <strong>#${res.order.orderId}</strong> confirmed!`);
    } catch (err) {
      showToast(`❌ Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="checkoutModal"
      className="drawer-overlay open"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div className="checkout-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div className="logo" style={{ fontSize: '1.4rem' }}>
            <span className="logo-icon" style={{ width: '26px', height: '26px', fontSize: '0.8rem' }}>
              ⚡
            </span>
            <span>Top</span>
            <span style={{ color: 'var(--primary)' }}>Lap</span>{' '}
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              Secure Checkout
            </span>
          </div>
          <button className="drawer-close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        {confirmedOrder ? (
          /* Confirmation Screen */
          <div className="order-success-box" style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--emerald-stock)', marginBottom: '8px' }}>
              Order Confirmed!
            </h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
              Thank you, <strong>{confirmedOrder.customer.name}</strong>. Your authenticated hardware is scheduled for delivery.
            </p>

            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-glow)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                textAlign: 'left',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong>{confirmedOrder.orderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Delivery:</span>
                <span style={{ color: 'var(--emerald-stock)', fontWeight: 600 }}>
                  {confirmedOrder.estimatedDelivery}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping To:</span>
                <span>{confirmedOrder.customer.address}, {confirmedOrder.customer.city}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <span style={{ textTransform: 'uppercase' }}>{confirmedOrder.payment.method}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>Total Paid:</span>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem' }}>
                  {formatPrice(confirmedOrder.pricing.total)}
                </span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '14px' }} onClick={handleClose}>
              Continue Exploring Hardware →
            </button>
          </div>
        ) : (
          /* Multi-step checkout */
          <>
            <div className="checkout-steps-bar">
              <div className={`checkout-step-pill ${step >= 1 ? 'active' : ''}`}>
                <span className="step-num">1</span>
                <span>Shipping</span>
              </div>
              <div className={`checkout-step-pill ${step >= 2 ? 'active' : ''}`}>
                <span className="step-num">2</span>
                <span>Delivery & Promo</span>
              </div>
              <div className={`checkout-step-pill ${step >= 3 ? 'active' : ''}`}>
                <span className="step-num">3</span>
                <span>Payment</span>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="checkout-form">
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Shipping & Customer Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      placeholder="e.g. Aryan Sharma"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="aryan@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Delivery Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                    placeholder="Flat / House No., Street, Landmark"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={customer.city}
                      onChange={handleCustomerChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>PIN Code</label>
                    <input
                      type="text"
                      name="pin"
                      value={customer.pin}
                      onChange={handleCustomerChange}
                      placeholder="560001"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '12px' }}>
                  Next: Delivery & Promo →
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="checkout-form">
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Order Summary & Promo Codes</h3>
                
                <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Items in Cart:</span>
                    <strong>{cart.reduce((s, i) => s + i.qty, 0)} devices</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Cart Subtotal:</span>
                    <strong>{formatPrice(cartSubtotal)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--emerald-stock)' }}>
                    <span>Express Delivery:</span>
                    <span>FREE</span>
                  </div>
                  {activeCoupon && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--emerald-stock)' }}>
                      <span>Discount ({activeCoupon.code}):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '8px' }}>
                    <span style={{ fontWeight: 700 }}>Final Total:</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>Have a Promo Code?</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="e.g. TOPLAP10 or SUPER5K"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      style={{ flex: 1, padding: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff' }}
                    />
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && <p style={{ color: 'var(--rose-badge)', fontSize: '0.8rem', marginTop: '4px' }}>{couponError}</p>}
                  {activeCoupon && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.85rem', color: 'var(--emerald-stock)' }}>
                      <span>✓ Applied: {activeCoupon.description || activeCoupon.code}</span>
                      <button onClick={removeCoupon} style={{ background: 'none', border: 'none', color: 'var(--rose-badge)', cursor: 'pointer' }}>Remove</button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>
                    ← Back
                  </button>
                  <button type="button" className="btn-primary" onClick={() => setStep(3)} style={{ flex: 1 }}>
                    Next: Payment →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-form">
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Select Secure Payment Gateway</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
                  {[
                    { id: 'upi', label: 'UPI / QR / Instant Pay (Google Pay, PhonePe, Paytm)', badge: '⚡ Instant' },
                    { id: 'card', label: 'Credit / Debit Cards (Visa, Mastercard, RuPay)', badge: '2-Year Warranty Safe' },
                    { id: 'emi', label: 'No-Cost EMI (Starting ₹4,999/mo)', badge: '0% Interest' },
                    { id: 'cod', label: 'Doorstep Cash/Card on Delivery', badge: 'Verified OTP' }
                  ].map(method => (
                    <label
                      key={method.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: paymentMethod === method.id ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                        border: paymentMethod === method.id ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                        />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{method.label}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'rgba(0,240,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                        {method.badge}
                      </span>
                    </label>
                  ))}
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Total Amount Payable:</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn-outline" onClick={() => setStep(2)} style={{ flex: 1 }}>
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    style={{ flex: 2, padding: '12px' }}
                  >
                    {isSubmitting ? 'Authorizing & Confirming...' : `Authorize & Place Order (${formatPrice(cartTotal)}) 🚀`}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
