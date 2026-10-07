import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('toplap_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('toplap_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.some(i => i.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(i => i.id !== product.id));
      showToast(`🤍 Removed <strong>${product.name}</strong> from Wishlist.`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`💙 Saved <strong>${product.name}</strong> to your Wishlist!`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(i => i.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
