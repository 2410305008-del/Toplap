import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { normalizeImageUrl } from '../../utils/formatters';

export default function CompareDock() {
  const { compareList, compareCount, setIsCompareModalOpen, clearCompare } = useCompare();

  if (compareCount === 0) return null;

  return (
    <div className="compare-dock visible" id="compareDock">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
          Comparing (<span id="dockCount">{compareCount}</span>/3):
        </span>
        <div className="dock-items-preview" id="dockItemsPreview">
          {compareList.map(item => (
            <img
              key={item.id}
              src={normalizeImageUrl(item.image)}
              alt={item.name}
              title={item.name}
              style={{
                width: '36px',
                height: '36px',
                objectFit: 'contain',
                borderRadius: '6px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glow)'
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="dock-compare-btn" onClick={() => setIsCompareModalOpen(true)}>
          View Comparison Matrix 📊
        </button>
        <button
          className="drawer-close-btn"
          style={{ width: '30px', height: '30px' }}
          onClick={clearCompare}
          title="Clear all"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
