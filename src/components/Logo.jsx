import React from 'react';

/**
 * BallLink Wordmark Logo
 * size: 'sm' | 'md' | 'lg'
 * showTagline: show/hide the tagline beneath
 */
export default function Logo({ size = 'md', showTagline = false, className = '' }) {
  const sizes = {
    sm: { icon: 24, wordmark: 20, tagline: 10 },
    md: { icon: 32, wordmark: 28, tagline: 11 },
    lg: { icon: 48, wordmark: 42, tagline: 13 },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        {/* Icon: Football with link chain element */}
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer glow ring */}
          <circle cx="24" cy="24" r="23" fill="#1B4332" stroke="#52B788" strokeWidth="1.5" />
          {/* Football pentagon pattern */}
          <circle cx="24" cy="24" r="10" fill="#F4A300" opacity="0.15" />
          <polygon
            points="24,14 30,19 28,26 20,26 18,19"
            fill="#F4A300"
            opacity="0.9"
          />
          {/* Link chain element top-right */}
          <path
            d="M33 12 C36 9, 40 9, 40 13 C40 17, 36 17, 33 14"
            stroke="#52B788"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M36 15 C39 12, 39 12, 36 12"
            stroke="#52B788"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Field lines suggesting a pitch */}
          <line x1="24" y1="8" x2="24" y2="40" stroke="white" strokeWidth="1" opacity="0.2" />
          <line x1="8" y1="24" x2="40" y2="24" stroke="white" strokeWidth="1" opacity="0.2" />
        </svg>

        {/* Wordmark */}
        <span
          className="font-bebas text-chalk tracking-widest leading-none"
          style={{ fontSize: s.wordmark }}
        >
          BALL
          <span className="text-floodlight-gold">LINK</span>
        </span>
      </div>

      {showTagline && (
        <span
          className="font-inter text-chalk/40 tracking-wider uppercase ml-10"
          style={{ fontSize: s.tagline }}
        >
          Find a Pitch. Find Players. Play.
        </span>
      )}
    </div>
  );
}
