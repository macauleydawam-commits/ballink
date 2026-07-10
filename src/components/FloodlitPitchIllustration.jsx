import React from 'react';

/**
 * FloodlitPitchIllustration
 * CSS/SVG pitch illustration: dark night sky, floodlights, green pitch surface with white line markings.
 * Pure SVG — no images needed.
 */
export default function FloodlitPitchIllustration({ className = '' }) {
  return (
    <div className={`relative w-full select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 420"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Illustration of a floodlit football pitch at night"
      >
        <defs>
          {/* Night sky gradient */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050d18" />
            <stop offset="100%" stopColor="#0D1B2A" />
          </linearGradient>

          {/* Pitch surface gradient */}
          <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B4332" />
            <stop offset="40%" stopColor="#1e5038" />
            <stop offset="100%" stopColor="#143628" />
          </linearGradient>

          {/* Floodlight glow */}
          <radialGradient id="floodLeft" cx="15%" cy="18%" r="35%">
            <stop offset="0%" stopColor="#F4A300" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F4A300" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="floodRight" cx="85%" cy="18%" r="35%">
            <stop offset="0%" stopColor="#F4A300" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F4A300" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pitchGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#52B788" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#52B788" stopOpacity="0" />
          </radialGradient>

          {/* Grass stripe pattern */}
          <pattern id="grassStripes" x="0" y="0" width="40" height="420" patternUnits="userSpaceOnUse">
            <rect width="20" height="420" fill="#1B4332" opacity="0.5" />
            <rect x="20" width="20" height="420" fill="#1e5038" opacity="0.5" />
          </pattern>

          {/* Stars */}
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky background */}
        <rect width="600" height="420" fill="url(#skyGrad)" />

        {/* Stars */}
        {[
          [45, 30], [120, 15], [200, 45], [280, 20], [350, 38],
          [430, 12], [510, 35], [560, 22], [70, 60], [160, 55],
          [390, 50], [480, 58], [540, 70],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={Math.random() > 0.5 ? 1.5 : 1}
            fill="white"
            opacity={0.4 + (i % 4) * 0.15}
            filter="url(#starGlow)"
          />
        ))}

        {/* Floodlight pole — left */}
        <rect x="52" y="60" width="6" height="130" fill="#2a3f55" rx="2" />
        <rect x="44" y="55" width="22" height="8" fill="#3a5068" rx="2" />
        {/* Floodlight head left */}
        <rect x="38" y="48" width="34" height="12" fill="#F4A300" rx="3" opacity="0.9" />
        <rect x="36" y="46" width="38" height="5" fill="#FFD166" rx="2" opacity="0.7" />

        {/* Floodlight pole — right */}
        <rect x="542" y="60" width="6" height="130" fill="#2a3f55" rx="2" />
        <rect x="534" y="55" width="22" height="8" fill="#3a5068" rx="2" />
        {/* Floodlight head right */}
        <rect x="528" y="48" width="34" height="12" fill="#F4A300" rx="3" opacity="0.9" />
        <rect x="526" y="46" width="38" height="5" fill="#FFD166" rx="2" opacity="0.7" />

        {/* Floodlight glow overlays */}
        <rect width="600" height="420" fill="url(#floodLeft)" />
        <rect width="600" height="420" fill="url(#floodRight)" />

        {/* Pitch base */}
        <rect x="40" y="130" width="520" height="270" fill="url(#pitchGrad)" rx="4" />
        <rect x="40" y="130" width="520" height="270" fill="url(#grassStripes)" rx="4" opacity="0.4" />
        <rect x="40" y="130" width="520" height="270" fill="url(#pitchGlow)" rx="4" />

        {/* Pitch border */}
        <rect x="60" y="145" width="480" height="240" fill="none" stroke="white" strokeWidth="2.5" opacity="0.7" />

        {/* Centre line */}
        <line x1="300" y1="145" x2="300" y2="385" stroke="white" strokeWidth="2" opacity="0.6" />

        {/* Centre circle */}
        <circle cx="300" cy="265" r="48" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
        <circle cx="300" cy="265" r="4" fill="white" opacity="0.8" />

        {/* Centre spot highlight */}
        <circle cx="300" cy="265" r="60" fill="white" opacity="0.03" />

        {/* Left penalty box */}
        <rect x="60" y="195" width="100" height="140" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
        {/* Left 6-yard box */}
        <rect x="60" y="225" width="40" height="80" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
        {/* Left penalty spot */}
        <circle cx="140" cy="265" r="3" fill="white" opacity="0.7" />
        {/* Left penalty arc */}
        <path d="M 160 230 A 48 48 0 0 1 160 300" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
        {/* Left goal */}
        <rect x="42" y="238" width="18" height="54" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />

        {/* Right penalty box */}
        <rect x="440" y="195" width="100" height="140" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
        {/* Right 6-yard box */}
        <rect x="500" y="225" width="40" height="80" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
        {/* Right penalty spot */}
        <circle cx="460" cy="265" r="3" fill="white" opacity="0.7" />
        {/* Right penalty arc */}
        <path d="M 440 230 A 48 48 0 0 0 440 300" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
        {/* Right goal */}
        <rect x="540" y="238" width="18" height="54" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />

        {/* Corner arcs */}
        <path d="M 60 145 A 12 12 0 0 1 72 157" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <path d="M 540 145 A 12 12 0 0 0 528 157" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <path d="M 60 385 A 12 12 0 0 0 72 373" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <path d="M 540 385 A 12 12 0 0 1 528 373" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />

        {/* Player silhouettes */}
        {/* Player 1 — mid pitch */}
        <ellipse cx="260" cy="255" rx="6" ry="10" fill="#F4A300" opacity="0.85" />
        <circle cx="260" cy="242" r="5" fill="#F4A300" opacity="0.85" />
        {/* Player 2 */}
        <ellipse cx="340" cy="275" rx="6" ry="10" fill="#52B788" opacity="0.85" />
        <circle cx="340" cy="262" r="5" fill="#52B788" opacity="0.85" />
        {/* Player 3 */}
        <ellipse cx="200" cy="290" rx="6" ry="10" fill="#F4A300" opacity="0.7" />
        <circle cx="200" cy="277" r="5" fill="#F4A300" opacity="0.7" />
        {/* Player 4 */}
        <ellipse cx="400" cy="240" rx="6" ry="10" fill="#52B788" opacity="0.7" />
        <circle cx="400" cy="227" r="5" fill="#52B788" opacity="0.7" />

        {/* Football */}
        <circle cx="295" cy="268" r="7" fill="white" opacity="0.9" />
        <path d="M295 261 L299 265 L297 270 L293 270 L291 265 Z" fill="#1B4332" opacity="0.6" />

        {/* Foreground ground shadow */}
        <rect x="0" y="385" width="600" height="35" fill="url(#skyGrad)" opacity="0.8" />

        {/* Atmospheric haze at pitch level */}
        <rect x="40" y="125" width="520" height="20" fill="#52B788" opacity="0.05" />
      </svg>
    </div>
  );
}
