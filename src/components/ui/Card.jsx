import React from 'react';

/**
 * BallLink Card Component
 * surface: 'dark' (pitch-green tint) | 'light' (chalk) | 'glass'
 */
export default function Card({
  children,
  surface = 'dark',
  className = '',
  hover = true,
  onClick,
  ...props
}) {
  const surfaceStyles = {
    dark: 'bg-pitch-green/20 border border-turf-light/10',
    light: 'bg-chalk text-night-navy border border-chalk/20',
    glass: 'glass',
    navy: 'bg-night-navy/80 border border-turf-light/10',
  };

  return (
    <div
      onClick={onClick}
      className={[
        'rounded-2xl overflow-hidden transition-all duration-300',
        surfaceStyles[surface] || surfaceStyles.dark,
        hover && onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-pitch-green/30' : '',
        hover && !onClick ? 'hover:shadow-lg hover:shadow-pitch-green/20' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
