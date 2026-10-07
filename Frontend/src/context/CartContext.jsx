import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('toplap_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCoupon, setActiveCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('toplap_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  const addToCart = (product, variantName = null, customPrice = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.id === product.id && (variantName ? i.variant === variantName : !i.variant)
      );

      const price = customPrice !== null ? customPrice : product.price;

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price,
            image: product.image,
            variant: variantName,
            qty: 1
          }
        ];
      }
    });

    showToast(`⚡ <strong>${product.name}</strong> added to your cart!`);
  };

  const removeFromCart = (id, variantName = null) => {
    setCart(prev => prev.filter(i => !(i.id === id && (variantName ? i.variant === variantName : true))));
    showToast('Item removed from cart.');
  };

  const changeQty = (id, delta, variantName = null) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.id === id && (variantName ? i.variant === variantName : true)) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const applyCoupon = (coupon) => {
    setActiveCoupon(coupon);
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountPercent) {
      discountAmount = Math.round(cartSubtotal * (activeCoupon.discountPercent / 100));
    } else if (activeCoupon.flatDiscount) {
      discountAmount = activeCoupon.flatDiscount;
    }
  }
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartTotal,
        discountAmount,
        activeCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
