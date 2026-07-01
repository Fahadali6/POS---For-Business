import { motion } from 'framer-motion';
import { CreditCard, Minus, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import products from '../../../data/mock/products.json';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { PageHeader } from '../../../components/ui/PageHeader.jsx';
import { formatCurrency } from '../../../lib/formatters.js';

export function PosPage() {
  const [cart, setCart] = useState([]);

  const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const decrement = (productId) => {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== productId) return [item];
      return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="POS Billing" eyebrow="Checkout" description="A fast, touch-friendly billing screen with visible product discovery and a persistent cart." />
      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <Card className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950" placeholder="Scan barcode or search products" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {products.map((product) => (
              <motion.button
                whileTap={{ scale: 0.98 }}
                key={product.id}
                onClick={() => addToCart(product)}
                className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:bg-indigo-500/10"
              >
                <p className="font-semibold">{product.name}</p>
                <p className="mt-1 text-xs text-slate-500">{product.category}</p>
                <p className="mt-4 text-lg font-bold text-indigo-600 dark:text-indigo-300">{formatCurrency(product.price)}</p>
              </motion.button>
            ))}
          </div>
        </Card>
        <Card className="flex min-h-[620px] flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Current cart</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">{cart.length} items</span>
          </div>
          <div className="mt-4 flex-1 space-y-3">
            {cart.length === 0 ? <p className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">Add products to begin checkout.</p> : null}
            {cart.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex justify-between gap-3">
                  <div><p className="font-medium">{item.name}</p><p className="text-xs text-slate-500">{formatCurrency(item.price)} each</p></div>
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button variant="secondary" className="min-h-8 px-2" onClick={() => decrement(item.id)}><Minus className="h-3 w-3" /></Button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <Button variant="secondary" className="min-h-8 px-2" onClick={() => addToCart(item)}><Plus className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
            <div className="flex justify-between text-2xl font-bold"><span>Total</span><span>{formatCurrency(total)}</span></div>
            <Button className="mt-3 w-full"><CreditCard className="h-4 w-4" /> Pay now</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
