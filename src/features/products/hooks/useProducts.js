import { useMemo, useState } from 'react';
import seedProducts from '../../../data/mock/products.json';
import { useLocalStorage } from '../../../hooks/useLocalStorage.js';

export function useProducts() {
  const [products, setProducts] = useLocalStorage('pos:products', seedProducts);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesQuery = [product.name, product.sku, product.category].join(' ').toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesQuery && matchesStatus;
  }), [products, query, statusFilter]);

  const saveProduct = (payload) => {
    setProducts((current) => {
      const status = Number(payload.stock) <= Number(payload.reorderLevel || 10) ? 'low' : 'active';
      if (payload.id) return current.map((product) => (product.id === payload.id ? { ...product, ...payload, status } : product));
      return [{ ...payload, id: `prd_${crypto.randomUUID()}`, status }, ...current];
    });
  };

  return { filteredProducts, products, query, saveProduct, setQuery, setStatusFilter, statusFilter };
}
