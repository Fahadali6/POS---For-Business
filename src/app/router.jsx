import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell.jsx';
import { LoginPage } from '../features/auth/pages/LoginPage.jsx';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage.jsx';
import { ProductsPage } from '../features/products/pages/ProductsPage.jsx';
import { CategoriesPage } from '../features/categories/pages/CategoriesPage.jsx';
import { CustomersPage } from '../features/customers/pages/CustomersPage.jsx';
import { PosPage } from '../features/pos/pages/PosPage.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/app/dashboard" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'pos', element: <PosPage /> },
    ],
  },
]);
