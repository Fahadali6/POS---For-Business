# Modern POS Web Application Architecture

This document is the planning foundation for a premium, scalable React POS portfolio project. It intentionally starts with architecture, folder structure, routing, reusable components, and design-system decisions before feature implementation.

## Product Vision

The application should feel fast, polished, and approachable for non-technical business users. It should support retail stores, supermarkets, cafés, restaurants, pharmacies, salons, and service businesses without forcing each vertical into a completely different product.

Core principles:

- **Speed first:** common cashier actions must be reachable in one or two interactions.
- **Beginner friendly:** clear labels, obvious primary actions, empty states, and helpful validation.
- **Premium but minimal:** modern cards, subtle shadows, fluid motion, consistent spacing, and restrained color usage.
- **Scalable modules:** features are grouped by business domain so mock data can later be replaced with backend APIs.
- **Reusable UI:** shared layouts, form controls, data displays, and feedback components prevent duplication.
- **Accessible defaults:** semantic HTML, keyboard-friendly flows, visible focus states, and sufficient contrast.

## Tech Stack Decisions

- **React + Vite:** fast development, modern build pipeline, and simple deployment.
- **React Router:** route-based module organization, nested layouts, protected pages, and future data loading.
- **Tailwind CSS:** design tokens, responsive utilities, dark mode, and consistent spacing.
- **React Hook Form:** performant forms, clear validation boundaries, and backend-ready payload handling.
- **Framer Motion:** page transitions, sidebar animations, modal motion, and micro-interactions.
- **Mock JSON data:** realistic local data shaped like API responses for easy future migration.

## Recommended Folder Structure

```txt
src/
  app/
    App.jsx
    router.jsx
    providers.jsx
  assets/
    icons/
    images/
  components/
    ui/
      Button.jsx
      Card.jsx
      Input.jsx
      Select.jsx
      Badge.jsx
      Modal.jsx
      Drawer.jsx
      Table.jsx
      EmptyState.jsx
      ThemeToggle.jsx
    feedback/
      Toast.jsx
      ConfirmDialog.jsx
      LoadingState.jsx
    layout/
      AppShell.jsx
      Sidebar.jsx
      Header.jsx
      PageHeader.jsx
      MobileNav.jsx
  config/
    navigation.js
    permissions.js
    theme.js
  data/
    mock/
      products.json
      categories.json
      customers.json
      sales.json
      suppliers.json
      employees.json
  features/
    auth/
      components/
      hooks/
      pages/
      services/
      schemas/
    dashboard/
      components/
      pages/
      utils/
    products/
      components/
      hooks/
      pages/
      services/
      schemas/
    categories/
      components/
      pages/
    customers/
      components/
      pages/
    pos/
      components/
      hooks/
      pages/
      utils/
    inventory/
      components/
      pages/
    purchases/
      components/
      pages/
    suppliers/
      components/
      pages/
    sales/
      components/
      pages/
    returns/
      components/
      pages/
    discounts/
      components/
      pages/
    coupons/
      components/
      pages/
    employees/
      components/
      pages/
    roles/
      components/
      pages/
    reports/
      components/
      pages/
    analytics/
      components/
      pages/
    settings/
      components/
      pages/
  hooks/
    useDebounce.js
    useDisclosure.js
    useLocalStorage.js
    useTheme.js
  lib/
    constants.js
    formatters.js
    validators.js
    cn.js
  services/
    httpClient.js
    mockApi.js
  styles/
    globals.css
  types/
    entities.js
  main.jsx
```

### Structure Rationale

- `app/` contains application composition: providers, router, and the root component.
- `components/ui/` contains reusable visual primitives that do not know about POS business rules.
- `components/layout/` contains shell-level UI shared by authenticated pages.
- `features/` keeps domain-specific pages, hooks, services, and components together.
- `data/mock/` mirrors future API resources so the replacement path is straightforward.
- `services/` abstracts data access; components should not import JSON files directly.
- `lib/` contains framework-agnostic helpers such as currency and date formatting.
- `hooks/` contains generic reusable hooks, while feature hooks stay inside their feature folder.

## Routing Plan

Routes should use nested layouts and protected route boundaries.

```txt
/
  redirect -> /dashboard when authenticated, otherwise /login
/login
/forgot-password
/app
  layout: AppShell
  /dashboard
  /products
  /products/new
  /products/:productId/edit
  /categories
  /customers
  /pos
  /inventory
  /purchases
  /suppliers
  /sales-history
  /returns
  /discounts
  /coupons
  /employees
  /roles
  /reports
  /analytics
  /settings
*
  NotFound
```

### Route Groups by Phase

#### Phase 1

- `/login` and `/forgot-password`
- `/app/dashboard`
- `/app/products`
- `/app/categories`
- `/app/customers`
- `/app/pos`

#### Phase 2

- `/app/inventory`
- `/app/purchases`
- `/app/suppliers`
- `/app/sales-history`
- `/app/returns`
- `/app/discounts`
- `/app/coupons`

#### Phase 3

- `/app/employees`
- `/app/roles`
- `/app/reports`
- `/app/analytics`
- `/app/settings`

## Layout Architecture

```txt
App
  Providers
    BrowserRouter
      Routes
        PublicLayout
          LoginPage
          ForgotPasswordPage
        ProtectedRoute
          AppShell
            Sidebar
            Header
            MainContent
              Page
```

### AppShell Responsibilities

- Own responsive sidebar state.
- Render the main navigation.
- Provide consistent page width, padding, and background.
- Keep header and sidebar persistent during route changes.
- Allow the POS billing screen to opt into a wider workspace layout.

### Header Responsibilities

- Global search entry point.
- Store/business switcher placeholder.
- Theme toggle.
- Notifications.
- Current user menu.
- Tablet sidebar trigger.

### Sidebar Responsibilities

- Primary module navigation.
- Phase-aware grouping where useful.
- Active route highlighting.
- Collapsible desktop state.
- Compact tablet behavior.

## UI Design System

### Visual Style

The interface should combine a premium SaaS dashboard style with practical POS ergonomics:

- soft app background in light mode and deep neutral surfaces in dark mode;
- white or near-black elevated cards;
- rounded `2xl` panels for modernity;
- subtle border color instead of heavy dividers;
- restrained shadows for important surfaces;
- clear primary action color;
- meaningful color only for status, alerts, and metrics.

### Suggested Design Tokens

```js
const themeTokens = {
  colors: {
    primary: 'indigo',
    success: 'emerald',
    warning: 'amber',
    danger: 'rose',
    info: 'sky',
    neutral: 'slate',
  },
  radius: {
    card: '1rem',
    control: '0.75rem',
    pill: '999px',
  },
  shadow: {
    card: 'shadow-sm',
    floating: 'shadow-xl shadow-slate-950/10',
  },
};
```

### Typography

- Use one clean sans-serif font stack.
- Page titles: `text-2xl font-semibold tracking-tight`.
- Section titles: `text-lg font-semibold`.
- Body text: `text-sm leading-6`.
- Metadata: `text-xs text-slate-500`.
- Cashier-critical totals: larger, high-contrast typography.

### Spacing

- App shell padding: `p-4 md:p-6`.
- Cards: `p-4 md:p-6`.
- Form field gap: `space-y-2` per field, `gap-4` between fields.
- Page vertical rhythm: `space-y-6`.
- Table rows: comfortable height for touch/tablet use.

### Dark and Light Mode

Use Tailwind class-based dark mode. Persist user preference in local storage through `useTheme`, and apply the class to the document root.

Mode requirements:

- Light: `bg-slate-50`, cards `bg-white`, text `text-slate-950`.
- Dark: `bg-slate-950`, cards `bg-slate-900`, text `text-slate-50`.
- Borders: `border-slate-200` and `dark:border-slate-800`.
- Muted text: `text-slate-500` and `dark:text-slate-400`.

### Motion Guidelines

Use Framer Motion where movement helps comprehension:

- page transitions: fade and slight upward movement;
- modal/drawer: scale or slide with opacity;
- sidebar collapse: width animation;
- POS cart updates: small item enter/exit animation;
- buttons: subtle tap scale only, not distracting bounces.

Avoid animating large lists unnecessarily on low-powered tablets.

## Reusable Component Inventory

### UI Primitives

- `Button`: variants, sizes, loading state, icon positions.
- `Input`: label, hint, error, leading/trailing icons.
- `Select`: label, error, placeholder.
- `Card`: standard panel wrapper.
- `Badge`: status and category labels.
- `Modal`: accessible overlay for forms and confirmations.
- `Drawer`: mobile/tablet side panels and POS cart details.
- `Table`: consistent headers, empty state, row actions.
- `EmptyState`: friendly guidance for first-time users.
- `ThemeToggle`: reusable dark/light control.

### Business Components

- `MetricCard`: dashboard KPIs.
- `SalesChart`: dashboard trend visualization placeholder.
- `ProductGrid`: POS product picker.
- `CartPanel`: POS cart line items and totals.
- `CustomerPicker`: attach customer to sale.
- `PaymentSummary`: subtotal, tax, discount, grand total.
- `ProductForm`: reusable create/edit form.
- `CustomerForm`: reusable customer data form.

## Data and Service Layer Plan

Mock data should be accessed through service functions instead of importing JSON inside pages.

```txt
features/products/services/productService.js
  getProducts(filters)
  getProductById(id)
  createProduct(payload)
  updateProduct(id, payload)
  deleteProduct(id)
```

Later, `productService` can call `httpClient` instead of mock data without changing page components.

### Entity Shape Examples

```js
product = {
  id: 'prd_001',
  name: 'Arabica Coffee Beans',
  sku: 'COF-ARB-001',
  categoryId: 'cat_beverages',
  barcode: '890000000001',
  price: 18.5,
  cost: 10.25,
  stock: 42,
  reorderLevel: 10,
  status: 'active',
};

sale = {
  id: 'sale_001',
  customerId: 'cus_001',
  cashierId: 'emp_001',
  items: [],
  subtotal: 120,
  discountTotal: 10,
  taxTotal: 8.8,
  grandTotal: 118.8,
  paymentMethod: 'card',
  status: 'completed',
  createdAt: '2026-06-30T09:30:00.000Z',
};
```

## Phase 1 Feature Plans

### Authentication

Purpose: provide a polished login experience and prepare protected routing.

Key components:

- `LoginPage`
- `LoginForm`
- `AuthLayout`
- `ProtectedRoute`

Important UX decisions:

- include a demo account hint for portfolio review;
- show inline validation;
- keep the form compact and visually premium;
- redirect authenticated users to dashboard.

### Dashboard

Purpose: provide business insights at a glance.

Key components:

- `DashboardPage`
- `MetricCardGrid`
- `RevenueOverview`
- `TopProducts`
- `RecentSales`
- `LowStockAlert`

Important UX decisions:

- KPIs should communicate revenue, sales count, average order value, and low-stock items;
- charts can begin as clean mock visualizations;
- cards should guide the user toward POS, products, and inventory actions.

### Product Management

Purpose: let businesses manage sellable products and services.

Key components:

- `ProductsPage`
- `ProductToolbar`
- `ProductTable`
- `ProductFormDrawer`
- `ProductStatusBadge`

Important UX decisions:

- search, category filter, and status filter at the top;
- table on desktop, card list on tablet if needed;
- create/edit should use a drawer to avoid losing context.

### Categories

Purpose: organize catalog browsing and reporting.

Key components:

- `CategoriesPage`
- `CategoryCard`
- `CategoryFormModal`

Important UX decisions:

- display color/icon hints for POS browsing;
- show product count per category;
- make categories easy to reorder in a later phase.

### Customers

Purpose: manage loyalty, contact, and sales relationship data.

Key components:

- `CustomersPage`
- `CustomerTable`
- `CustomerFormDrawer`
- `CustomerProfileSummary`

Important UX decisions:

- show lifetime spend, visit count, and last purchase;
- enable quick customer creation from POS later;
- avoid cluttering the first version with too many fields.

### POS Billing Screen

Purpose: provide the fastest daily-use workflow for checkout.

Key components:

- `PosPage`
- `ProductSearchBar`
- `CategoryTabs`
- `ProductGrid`
- `CartPanel`
- `CartItemRow`
- `DiscountControl`
- `PaymentSummary`
- `PaymentMethodSelector`
- `CheckoutButton`

Important UX decisions:

- product grid and cart visible side-by-side on desktop;
- cart can become a drawer on tablet;
- totals must be visually dominant and impossible to miss;
- search and barcode input should be the primary focus;
- actions should support touch-friendly hit targets.

## Component Hierarchy for Phase 1

```txt
DashboardPage
  PageHeader
  MetricCardGrid
    MetricCard
  DashboardContentGrid
    RevenueOverview
    TopProducts
    RecentSales
    LowStockAlert

ProductsPage
  PageHeader
  ProductToolbar
  ProductTable
    ProductStatusBadge
  ProductFormDrawer
    ProductForm

PosPage
  PosWorkspace
    ProductCatalogPanel
      ProductSearchBar
      CategoryTabs
      ProductGrid
        ProductCard
    CartPanel
      CustomerPicker
      CartItemRow
      DiscountControl
      PaymentSummary
      PaymentMethodSelector
      CheckoutButton
```

## State Management Strategy

Start with local React state and custom hooks. Avoid global state until a real need appears.

Recommended boundaries:

- Auth state: context provider because many routes need it.
- Theme state: context or custom hook with local storage.
- POS cart state: feature-local reducer in `features/pos/hooks/useCart.js`.
- Filters/search: URL search params for pages where sharing/bookmarking matters.
- Mock data: service layer now, query library later if backend APIs are added.

## Backend Migration Strategy

To prepare for a future Node.js backend:

- keep service functions asynchronous from day one;
- shape mock data like API responses;
- centralize formatting and validation;
- avoid hard-coding business rules inside visual components;
- isolate authentication in an auth provider and service;
- keep entity IDs as strings, not array indexes.

## Implementation Order

1. Project scaffold and tooling.
2. Tailwind configuration and global theme styles.
3. Shared UI primitives.
4. Router and layouts.
5. Authentication shell and protected routing.
6. Dashboard with mock insights.
7. Product management.
8. Categories.
9. Customers.
10. POS billing screen.
11. Phase 2 modules.
12. Phase 3 modules.

## Quality Checklist

Each feature should include:

- reusable components;
- clear loading, empty, and error states;
- responsive desktop/tablet layout;
- dark and light mode support;
- accessible labels and keyboard behavior;
- mock service functions that can later become API calls;
- form validation with React Hook Form where applicable;
- clean route registration;
- short notes explaining important implementation choices.
