import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Minus, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import customers from '../../../data/mock/customers.json';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { Input } from '../../../components/ui/Input.jsx';
import { PageHeader } from '../../../components/ui/PageHeader.jsx';
import { formatCurrency } from '../../../lib/formatters.js';
import { useProducts } from '../../products/hooks/useProducts.js';
import { useCart } from '../hooks/useCart.js';

const paymentMethods = ['Card', 'Cash', 'Mobile wallet'];

export function PosPage() {
  const { products } = useProducts();
  const { addToCart, cart, clearCart, decrement, discount, setDiscount, totals } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [customerId, setCustomerId] = useState(customers[0]?.id || 'walk-in');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [receiptNumber, setReceiptNumber] = useState(null);

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], [products]);
  const visibleProducts = products.filter((product) => {
    const matchesQuery = [product.name, product.sku, product.category].join(' ').toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesQuery && matchesCategory;
  });

  const checkout = () => {
    if (cart.length === 0) return;
    setReceiptNumber(`INV-${Date.now().toString().slice(-6)}`);
    clearCart();
    setDiscount(0);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="POS Billing" eyebrow="Checkout" description="A fast, touch-friendly billing screen with product discovery, customer selection, discounts, and payment controls." />
      {receiptNumber ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
          Sale completed successfully. Receipt <span className="font-bold">{receiptNumber}</span> is ready for print or email.
        </div>
      ) : null}
      <div className="grid gap-4 xl:grid-cols-[1fr_430px]">
        <Card className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
              placeholder="Scan barcode or search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <Button key={item} variant={category === item ? 'primary' : 'secondary'} onClick={() => setCategory(item)}>{item}</Button>
            ))}
          </div>
          {visibleProducts.length === 0 ? (
            <EmptyState title="No sellable items found" description="Try another search term or switch category tabs." />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:bg-indigo-500/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{product.category} • {product.sku}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold dark:bg-slate-800">{product.stock}</span>
                  </div>
                  <p className="mt-4 text-lg font-bold text-indigo-600 dark:text-indigo-300">{formatCurrency(product.price)}</p>
                </motion.button>
              ))}
            </div>
          )}
        </Card>
        <Card className="flex min-h-[680px] flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Current cart</h2>
            <Button variant="ghost" onClick={clearCart}><Trash2 className="h-4 w-4" /> Clear</Button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Customer
              <select className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950" value={customerId} onChange={(event) => setCustomerId(event.target.value)}>
                <option value="walk-in">Walk-in customer</option>
                {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
              </select>
            </label>
            <Input label="Discount" type="number" min="0" step="0.01" value={discount} onChange={(event) => setDiscount(event.target.value)} />
          </div>
          <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
            {cart.length === 0 ? <EmptyState title="Cart is empty" description="Tap a product card to start checkout." /> : null}
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }} key={item.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex justify-between gap-3">
                    <div><p className="font-medium">{item.name}</p><p className="text-xs text-slate-500">{formatCurrency(item.price)} each</p></div>
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="secondary" className="min-h-8 px-2" onClick={() => decrement(item.id)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <Button variant="secondary" className="min-h-8 px-2" onClick={() => addToCart(item)}><Plus className="h-3 w-3" /></Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => <Button key={method} variant={paymentMethod === method ? 'primary' : 'secondary'} onClick={() => setPaymentMethod(method)}>{method}</Button>)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span>Discount</span><span>-{formatCurrency(totals.discountTotal)}</span></div>
              <div className="flex justify-between text-sm"><span>Tax</span><span>{formatCurrency(totals.tax)}</span></div>
              <div className="flex justify-between text-2xl font-bold"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
            </div>
            <Button className="w-full" disabled={cart.length === 0} onClick={checkout}><CreditCard className="h-4 w-4" /> Pay with {paymentMethod}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
