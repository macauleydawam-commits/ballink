import React from 'react';

/**
 * BallLink Input Component
 * Fully labeled, accessible, with error state support
 */
export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = '',
  required = false,
  disabled = false,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-chalk/80 font-inter"
        >
          {label}
          {required && (
            <span className="text-alert-red ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-chalk/40 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={[
            'w-full bg-pitch-green/20 border rounded-xl px-4 py-3 text-sm text-chalk placeholder:text-chalk/30',
            'font-inter transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-floodlight-gold/50 focus:border-floodlight-gold/50',
            error ? 'border-alert-red/70' : 'border-turf-light/20',
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 text-chalk/40 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-alert-red font-inter">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-chalk/40 font-inter">
          {hint}
        </p>
      )}
    </div>
  );
}
