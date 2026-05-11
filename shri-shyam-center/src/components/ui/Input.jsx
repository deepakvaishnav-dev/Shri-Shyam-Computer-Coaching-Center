import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    className,
    containerClassName,
    required,
    type = 'text',
    ...props
  },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-[#374151]">
          {label}
          {required && <span className="text-[#C62828] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none',
            'bg-white text-[#111827] placeholder-[#9CA3AF]',
            'border-[#D1D5DB] focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20',
            error && 'border-[#C62828] focus:border-[#C62828] focus:ring-[#C62828]/20',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="form-error">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && <p className="text-xs text-[#9CA3AF]">{hint}</p>}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, error, children, containerClassName, required, ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-[#374151]">
          {label}
          {required && <span className="text-[#C62828] ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none',
          'bg-white text-[#111827] border-[#D1D5DB]',
          'focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20',
          error && 'border-[#C62828] focus:border-[#C62828] focus:ring-[#C62828]/20'
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, error, containerClassName, required, ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-[#374151]">
          {label}
          {required && <span className="text-[#C62828] ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={4}
        className={cn(
          'w-full px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none resize-none',
          'bg-white text-[#111827] placeholder-[#9CA3AF]',
          'border-[#D1D5DB] focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20',
          error && 'border-[#C62828] focus:border-[#C62828] focus:ring-[#C62828]/20'
        )}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
});
