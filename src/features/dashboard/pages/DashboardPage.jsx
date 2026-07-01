import { ArrowUpRight, PackageCheck, ReceiptText, ShoppingCart, Users } from 'lucide-react';
import products from '../../../data/mock/products.json';
import customers from '../../../data/mock/customers.json';
import { Card } from '../../../components/ui/Card.jsx';
import { PageHeader } from '../../../components/ui/PageHeader.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { formatCurrency, formatNumber } from '../../../lib/formatters.js';

const metrics = [
  { label: 'Today revenue', value: formatCurrency(8420), detail: '+12.4% from yesterday', icon: ArrowUpRight },
  { label: 'Orders', value: formatNumber(184), detail: '32 awaiting pickup', icon: ReceiptText },
  { label: 'Active customers', value: formatNumber(customers.length), detail: '3 loyalty segments', icon: Users },
  { label: 'Low stock', value: products.filter((product) => product.status === 'low').length, detail: 'Review reorder list', icon: PackageCheck },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Business overview"
        title="Dashboard"
        description="A calm command center for sales performance, stock risks, and the next action your team should take."
        action={<Button><ShoppingCart className="h-4 w-4" /> Open POS</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">{metric.value}</p>
                <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">{metric.detail}</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                <metric.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Revenue pulse</h2>
            <span className="text-xs text-slate-500">Last 7 days</span>
          </div>
          <div className="mt-6 flex h-64 items-end gap-3">
            {[42, 65, 48, 72, 58, 88, 76].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-2xl bg-gradient-to-t from-indigo-600 to-sky-400" style={{ height: `${height}%` }} />
                <span className="text-xs text-slate-400">D{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Low-stock attention</h2>
          <div className="mt-4 space-y-3">
            {products.filter((product) => product.status === 'low').map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl bg-amber-50 p-3 dark:bg-amber-500/10">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{product.sku}</p>
                </div>
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">{product.stock} left</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
