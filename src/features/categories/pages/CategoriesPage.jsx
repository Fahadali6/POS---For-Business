import categories from '../../../data/mock/categories.json';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { PageHeader } from '../../../components/ui/PageHeader.jsx';

export function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Categories" eyebrow="Organization" description="Create clear catalog groups that make checkout faster and reporting cleaner." action={<Button>Add category</Button>} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id} className="group transition hover:-translate-y-1 hover:shadow-xl">
            <div className={`h-12 w-12 rounded-2xl ${category.color}`} />
            <h2 className="mt-5 text-lg font-semibold">{category.name}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{category.productCount} products available for quick POS browsing.</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
