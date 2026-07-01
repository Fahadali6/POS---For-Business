import { Plus, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Drawer } from '../../../components/ui/Drawer.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { Input } from '../../../components/ui/Input.jsx';
import { PageHeader } from '../../../components/ui/PageHeader.jsx';
import { StatPill } from '../../../components/ui/StatPill.jsx';
import { useDisclosure } from '../../../hooks/useDisclosure.js';
import { formatCurrency } from '../../../lib/formatters.js';
import { ProductForm } from '../components/ProductForm.jsx';
import { useProducts } from '../hooks/useProducts.js';

export function ProductsPage() {
  const drawer = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { filteredProducts, products, query, saveProduct, setQuery, setStatusFilter, statusFilter } = useProducts();
  const lowStockCount = products.filter((product) => product.status === 'low').length;

  const openCreateDrawer = () => {
    setSelectedProduct(null);
    drawer.open();
  };

  const openEditDrawer = (product) => {
    setSelectedProduct(product);
    drawer.open();
  };

  const handleSave = (payload) => {
    saveProduct(payload);
    drawer.close();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        eyebrow="Catalog"
        description="Manage products, services, SKUs, categories, prices, stock levels, and reorder readiness."
        action={<Button onClick={openCreateDrawer}><Plus className="h-4 w-4" /> Add product</Button>}
      />
      <div className="grid gap-3 md:grid-cols-3">
        <StatPill label="Total SKUs" value={products.length} />
        <StatPill label="Low stock" value={lowStockCount} />
        <StatPill label="Visible after filters" value={filteredProducts.length} />
      </div>
      <Card>
        <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, SKU, barcode, or category..." />
          <select
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="low">Low stock</option>
          </select>
          <Button variant="secondary"><SlidersHorizontal className="h-4 w-4" /> More filters</Button>
        </div>
        {filteredProducts.length === 0 ? (
          <EmptyState title="No products match" description="Try adjusting the search or status filter, or create a new catalog item." action={<Button onClick={openCreateDrawer}>Add product</Button>} />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr><th className="px-4 py-3">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th className="text-right pr-4">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-4"><p className="font-semibold">{product.name}</p><p className="text-xs text-slate-500">{product.sku}</p></td>
                    <td>{product.category}</td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>{product.stock}</td>
                    <td><Badge variant={product.status === 'low' ? 'warning' : 'success'}>{product.status}</Badge></td>
                    <td className="pr-4 text-right"><Button variant="ghost" onClick={() => openEditDrawer(product)}>Edit</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <Drawer
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        title={selectedProduct ? 'Edit product' : 'Create product'}
        description="Keep product data clean now so API integration stays simple later."
      >
        <ProductForm initialProduct={selectedProduct} onCancel={drawer.close} onSubmit={handleSave} />
      </Drawer>
    </div>
  );
}
