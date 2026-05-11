import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-[#1A237E] text-white hover:bg-[#0D1453] active:scale-[0.98]',
  accent: 'bg-[#FF6F00] text-white hover:bg-[#E65100] active:scale-[0.98]',
  outline: 'border-2 border-[#1A237E] text-[#1A237E] hover:bg-[#E8EAF6] active:scale-[0.98]',
  ghost: 'text-[#374151] hover:bg-[#F3F4F6] active:scale-[0.98]',
  danger: 'bg-[#C62828] text-white hover:bg-[#B71C1C] active:scale-[0.98]',
  success: 'bg-[#2E7D32] text-white hover:bg-[#1B5E20] active:scale-[0.98]',
  warning: 'bg-[#F9A825] text-white hover:bg-[#F57F17] active:scale-[0.98]',
  white: 'bg-white text-[#1A237E] hover:bg-[#F9FAFB] active:scale-[0.98] shadow-sm',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
  xl: 'px-8 py-4 text-lg rounded-xl gap-3',
  icon: 'p-2 rounded-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
