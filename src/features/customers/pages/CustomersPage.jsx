import customers from '../../../data/mock/customers.json';
import { Badge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { PageHeader } from '../../../components/ui/PageHeader.jsx';
import { formatCurrency } from '../../../lib/formatters.js';

export function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Customers" eyebrow="Relationships" description="Track loyalty, visit history, and contact information without overwhelming cashiers." action={<Button>Add customer</Button>} />
      <div className="grid gap-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
            <div>
              <h2 className="font-semibold">{customer.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{customer.email}</p>
            </div>
            <p className="text-sm"><span className="text-slate-500">Visits:</span> {customer.visits}</p>
            <p className="text-sm"><span className="text-slate-500">Lifetime:</span> {formatCurrency(customer.lifetimeSpend)}</p>
            <Badge variant={customer.status === 'VIP' ? 'info' : 'neutral'}>{customer.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
