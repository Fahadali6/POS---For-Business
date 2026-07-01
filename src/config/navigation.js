import { Boxes, CreditCard, FolderTree, LayoutDashboard, Users } from 'lucide-react';

export const navigationItems = [
  { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { label: 'POS Billing', path: '/app/pos', icon: CreditCard },
  { label: 'Products', path: '/app/products', icon: Boxes },
  { label: 'Categories', path: '/app/categories', icon: FolderTree },
  { label: 'Customers', path: '/app/customers', icon: Users },
];
