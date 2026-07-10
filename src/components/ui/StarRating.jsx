import React from 'react';
import { Star } from 'lucide-react';

/**
 * BallLink StarRating Component
 * Read-only display. Score shown in JetBrains Mono for scoreboard feel.
 * max: total stars (default 5)
 * rating: current rating (float)
 * count: optional review count
 */
export default function StarRating({ rating = 0, max = 5, count, size = 'sm', className = '' }) {
  const starSize = size === 'sm' ? 14 : size === 'md' ? 18 : 22;

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      aria-label={`Rating: ${rating} out of ${max} stars${count ? `, ${count} reviews` : ''}`}
      role="img"
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;

          return (
            <span key={i} className="relative inline-block" style={{ width: starSize, height: starSize }}>
              {/* Background star (empty) */}
              <Star
                size={starSize}
                className="absolute inset-0 text-chalk/15"
                fill="currentColor"
                aria-hidden="true"
              />
              {/* Filled portion */}
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : '50%' }}
                >
                  <Star
                    size={starSize}
                    className="text-floodlight-gold"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>

      <span className="font-mono text-floodlight-gold font-medium leading-none" style={{ fontSize: starSize }}>
        {rating.toFixed(1)}
      </span>

      {count !== undefined && (
        <span className="text-chalk/40 font-inter" style={{ fontSize: starSize - 2 }}>
          ({count})
        </span>
      )}
    </div>
  );
}
