import { cn } from '../../lib/utils';

const variants = {
  default: 'bg-[#E5E7EB] text-[#374151]',
  primary: 'bg-[#E8EAF6] text-[#1A237E]',
  accent: 'bg-[#FFF3E0] text-[#E65100]',
  success: 'bg-[#E8F5E9] text-[#2E7D32]',
  warning: 'bg-[#FFFDE7] text-[#F57F17]',
  danger: 'bg-[#FFEBEE] text-[#C62828]',
  paid: 'bg-[#E8F5E9] text-[#2E7D32]',
  pending: 'bg-[#FFFDE7] text-[#F57F17]',
  overdue: 'bg-[#FFEBEE] text-[#C62828]',
  active: 'bg-[#E8F5E9] text-[#2E7D32]',
  inactive: 'bg-[#F3F4F6] text-[#6B7280]',
  urgent: 'bg-[#FFEBEE] text-[#C62828]',
  normal: 'bg-[#E8EAF6] text-[#1A237E]',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function Badge({ children, variant = 'default', size = 'md', className, dot = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full',
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            variant === 'success' || variant === 'paid' || variant === 'active' ? 'bg-[#2E7D32]' :
            variant === 'warning' || variant === 'pending' ? 'bg-[#F9A825]' :
            variant === 'danger' || variant === 'overdue' || variant === 'urgent' ? 'bg-[#C62828]' :
            'bg-current'
          )}
        />
      )}
      {children}
    </span>
  );
}
