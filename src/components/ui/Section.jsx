import React from 'react';

/**
 * BallLink Section wrapper
 * surface: 'dark' (Night Navy) | 'pitch' (Pitch Green tint) | 'light' (Chalk)
 * Handles padding, max-width centering, and optional heading/subheading
 */
export default function Section({
  children,
  surface = 'dark',
  id,
  heading,
  subheading,
  headingAlign = 'center',
  className = '',
  innerClassName = '',
}) {
  const surfaceStyles = {
    dark: 'bg-night-navy',
    pitch: 'bg-pitch-green',
    light: 'bg-chalk text-night-navy',
    'dark-card': 'bg-[#0a1520]',
  };

  const headingColorStyles = {
    dark: 'text-chalk',
    pitch: 'text-chalk',
    light: 'text-night-navy',
    'dark-card': 'text-chalk',
  };

  const subheadingColorStyles = {
    dark: 'text-chalk/50',
    pitch: 'text-turf-light/80',
    light: 'text-night-navy/60',
    'dark-card': 'text-chalk/50',
  };

  return (
    <section
      id={id}
      className={[
        'w-full py-16 md:py-24',
        surfaceStyles[surface] || surfaceStyles.dark,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${innerClassName}`}>
        {(heading || subheading) && (
          <div
            className={[
              'mb-10 md:mb-14',
              headingAlign === 'center' ? 'text-center' : 'text-left',
            ].join(' ')}
          >
            {heading && (
              <h2
                className={[
                  'text-4xl md:text-5xl font-bebas tracking-wide',
                  headingColorStyles[surface] || headingColorStyles.dark,
                ].join(' ')}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p
                className={[
                  'mt-3 text-base md:text-lg font-inter max-w-xl',
                  headingAlign === 'center' ? 'mx-auto' : '',
                  subheadingColorStyles[surface] || subheadingColorStyles.dark,
                ].join(' ')}
              >
                {subheading}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
