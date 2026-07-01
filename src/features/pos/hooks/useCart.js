import { useMemo, useState } from 'react';

export function useCart(taxRate = 0.08) {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const decrement = (productId) => {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== productId) return [item];
      return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
    }));
  };

  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountTotal = Math.min(Number(discount || 0), subtotal);
    const taxableAmount = subtotal - discountTotal;
    const tax = taxableAmount * taxRate;
    return { subtotal, discountTotal, tax, total: taxableAmount + tax };
  }, [cart, discount, taxRate]);

  return { addToCart, cart, clearCart, decrement, discount, setDiscount, totals };
}
