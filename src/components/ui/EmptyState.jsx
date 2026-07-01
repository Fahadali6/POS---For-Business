import { Inbox } from 'lucide-react';
import { cn } from '../../lib/cn.js';

export function EmptyState({ action, className, description, title = 'Nothing here yet' }) {
  return (
    <div className={cn('rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700', className)}>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <Inbox className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-semibold text-slate-950 dark:text-white">{title}</h3>
      {description ? <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
