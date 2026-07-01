import { Plus } from 'lucide-react';
import products from '../../../data/mock/products.json';
import { Badge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Input } from '../../../components/ui/Input.jsx';
import { PageHeader } from '../../../components/ui/PageHeader.jsx';
import { formatCurrency } from '../../../lib/formatters.js';

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Products" eyebrow="Catalog" description="Manage products, services, SKUs, categories, prices, and stock readiness." action={<Button><Plus className="h-4 w-4" /> Add product</Button>} />
      <Card>
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <Input placeholder="Search by name, SKU, barcode..." />
          <Button variant="secondary">Filter category</Button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr><th className="px-4 py-3">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {products.map((product) => (
                <tr key={product.id} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-4"><p className="font-semibold">{product.name}</p><p className="text-xs text-slate-500">{product.sku}</p></td>
                  <td>{product.category}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.stock}</td>
                  <td><Badge variant={product.status === 'low' ? 'warning' : 'success'}>{product.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
