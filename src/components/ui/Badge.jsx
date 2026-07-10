import React from 'react';

/**
 * BallLink Badge Component
 * variant: 'available' | 'live' | 'featured' | 'full' | 'neutral'
 */
const variantStyles = {
  available: 'bg-turf-light/20 text-turf-light border border-turf-light/30',
  live: 'bg-alert-red/15 text-alert-red border border-alert-red/30',
  featured: 'bg-floodlight-gold/15 text-floodlight-gold border border-floodlight-gold/30',
  full: 'bg-chalk/10 text-chalk/50 border border-chalk/10',
  neutral: 'bg-pitch-green/30 text-chalk/70 border border-turf-light/10',
};

export default function Badge({ children, variant = 'neutral', className = '', showDot = false }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium font-inter whitespace-nowrap',
        variantStyles[variant] || variantStyles.neutral,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showDot && (
        <span
          className={[
            'w-1.5 h-1.5 rounded-full shrink-0',
            variant === 'live' ? 'bg-alert-red live-dot' : '',
            variant === 'available' ? 'bg-turf-light' : '',
            variant === 'featured' ? 'bg-floodlight-gold' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
