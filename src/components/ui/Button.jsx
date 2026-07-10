import React from 'react';

/**
 * BallLink Button Component
 * Variants: primary | secondary | ghost
 * Sizes: sm | md | lg
 */
const variantStyles = {
  primary:
    'bg-floodlight-gold text-night-navy font-semibold hover:bg-amber-400 active:scale-95 shadow-lg shadow-floodlight-gold/20',
  secondary:
    'bg-pitch-green text-chalk border border-turf-light/30 hover:bg-turf-light/20 active:scale-95',
  ghost:
    'bg-transparent text-chalk border border-chalk/20 hover:border-chalk/50 hover:bg-chalk/5 active:scale-95',
  danger:
    'bg-alert-red text-white font-semibold hover:bg-red-600 active:scale-95 shadow-lg shadow-alert-red/20',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-inter transition-all duration-200 cursor-pointer select-none',
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
