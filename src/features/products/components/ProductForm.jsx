import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button.jsx';
import { Input } from '../../../components/ui/Input.jsx';

const emptyProduct = { name: '', sku: '', category: 'Beverages', price: '', stock: '', reorderLevel: 10 };

export function ProductForm({ initialProduct, onCancel, onSubmit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialProduct || emptyProduct });

  useEffect(() => {
    reset(initialProduct || emptyProduct);
  }, [initialProduct, reset]);

  const submitProduct = (values) => onSubmit({
    ...initialProduct,
    ...values,
    price: Number(values.price),
    stock: Number(values.stock),
    reorderLevel: Number(values.reorderLevel),
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submitProduct)}>
      <Input label="Product name" error={errors.name?.message} {...register('name', { required: 'Product name is required' })} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="SKU" error={errors.sku?.message} {...register('sku', { required: 'SKU is required' })} />
        <Input label="Category" error={errors.category?.message} {...register('category', { required: 'Category is required' })} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Price" type="number" step="0.01" min="0" error={errors.price?.message} {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price cannot be negative' } })} />
        <Input label="Stock" type="number" min="0" error={errors.stock?.message} {...register('stock', { required: 'Stock is required', min: { value: 0, message: 'Stock cannot be negative' } })} />
        <Input label="Reorder level" type="number" min="0" {...register('reorderLevel')} />
      </div>
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save product</Button>
      </div>
    </form>
  );
}
