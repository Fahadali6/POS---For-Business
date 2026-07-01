import { LogOut, Menu, Moon, Search, Sun } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { navigationItems } from '../../config/navigation.js';
import { useAuth, useTheme } from '../../app/providers.jsx';
import { Button } from '../ui/Button.jsx';
import { cn } from '../../lib/cn.js';

export function AppShell() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white/90 p-4 backdrop-blur xl:block dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex h-full flex-col">
          <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-white dark:text-slate-950">
            <p className="text-xs font-medium uppercase tracking-[0.3em] opacity-70">TradeFlow</p>
            <p className="mt-2 text-xl font-bold">Premium POS</p>
          </div>
          <nav className="mt-6 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                    isActive && 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <p className="text-sm font-semibold">{user?.business}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{user?.name} • {user?.role}</p>
            <Button variant="ghost" className="mt-3 w-full justify-start" onClick={() => { logout(); navigate('/login'); }}><LogOut className="h-4 w-4" /> Sign out</Button>
          </div>
        </div>
      </aside>
      <div className="xl:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur md:px-6 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="xl:hidden"><Menu className="h-5 w-5" /></Button>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input className="min-h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900" placeholder="Search products, customers, invoices..." />
            </div>
            <Button variant="secondary" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
