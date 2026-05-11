import { cn } from '../../lib/utils';

export function Card({ children, className, hover = false, padding = 'md', ...props }) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[#E5E7EB] shadow-sm',
        hover && 'card-hover cursor-pointer',
        paddings[padding] || paddings.md,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, action }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-lg font-bold text-[#111827] font-heading', className)}>
      {children}
    </h3>
  );
}

export function CardSubtitle({ children, className }) {
  return (
    <p className={cn('text-sm text-[#6B7280] mt-0.5', className)}>{children}</p>
  );
}
