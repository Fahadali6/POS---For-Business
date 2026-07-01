import { cn } from '../../lib/cn.js';

export function Input({ error, label, className, ...props }) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span> : null}
      <input
        className={cn(
          'min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white',
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-rose-500">{error}</span> : null}
    </label>
  );
}
