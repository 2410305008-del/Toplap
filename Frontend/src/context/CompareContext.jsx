import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('toplap_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('toplap_compare', JSON.stringify(compareList));
    } catch (e) {
      console.error('Error saving compare list:', e);
    }
  }, [compareList]);

  const toggleCompare = (product) => {
    const exists = compareList.some(i => i.id === product.id);
    if (exists) {
      setCompareList(prev => prev.filter(i => i.id !== product.id));
      showToast(`Removed <strong>${product.name}</strong> from comparison.`);
    } else {
      if (compareList.length >= 3) {
        showToast('⚠️ Maximum 3 devices can be compared at once.');
        return;
      }
      setCompareList(prev => [...prev, product]);
      showToast(`📊 Added <strong>${product.name}</strong> to comparison dock.`);
    }
  };

  const isInCompare = (productId) => {
    return compareList.some(i => i.id === productId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        compareCount: compareList.length,
        isCompareModalOpen,
        setIsCompareModalOpen,
        toggleCompare,
        isInCompare,
        clearCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
