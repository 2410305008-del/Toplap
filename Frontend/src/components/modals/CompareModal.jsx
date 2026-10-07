import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { formatPrice, renderStars, normalizeImageUrl } from '../../utils/formatters';

export default function CompareModal() {
  const { compareList, isCompareModalOpen, setIsCompareModalOpen, toggleCompare } = useCompare();
  const { addToCart } = useCart();

  if (!isCompareModalOpen) return null;

  return (
    <div
      id="compareModal"
      className="drawer-overlay open"
      onClick={() => setIsCompareModalOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className="compare-modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Device <span>Spec Matrix</span>
          </h2>
          <button className="drawer-close-btn" onClick={() => setIsCompareModalOpen(false)}>
            ✕
          </button>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
          Side-by-side technical teardown of your selected machines.
        </p>

        {compareList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <p>No devices selected for comparison.</p>
          </div>
        ) : (
          <div id="compareTableContainer" style={{ overflowX: 'auto' }}>
            <table className="compare-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ minWidth: '160px', textAlign: 'left', padding: '12px' }}>Feature</th>
                  {compareList.map((p) => (
                    <th key={p.id} style={{ minWidth: '220px', textAlign: 'center', padding: '12px' }}>
                      <img
                        src={normalizeImageUrl(p.image)}
                        alt={p.name}
                        style={{ height: '80px', objectFit: 'contain', marginBottom: '8px' }}
                      />
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>{p.name}</div>
                      <div style={{ color: 'var(--primary)', fontWeight: 700, margin: '4px 0' }}>
                        {formatPrice(p.price)}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '8px' }}>
                        <button
                          className="btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          onClick={() => addToCart(p)}
                        >
                          Add to Cart 🛒
                        </button>
                        <button
                          className="drawer-close-btn"
                          style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}
                          onClick={() => toggleCompare(p)}
                          title="Remove from compare"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Rating</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>
                      {renderStars(p.rating)} ({p.reviews})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Processor (CPU)</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.cpu || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Graphics (GPU)</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.gpu || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Memory (RAM)</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.ram || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Storage</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.storage || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Display Panel</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.display || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Battery Endurance</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.battery || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Operating System</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.os || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Device Weight</strong></td>
                  {compareList.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>{p.specs?.weight || 'N/A'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
