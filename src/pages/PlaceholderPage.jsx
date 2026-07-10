import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PlaceholderPage({ title = 'Coming Soon', subtitle = 'This section is being built.' }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(82,183,136,0.1)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg, #1B4332, #52B788)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(244,163,0,0.2)' }}>
            <svg viewBox="0 0 28 28" width="17" height="17" fill="none">
              <polygon points="14,5 20,11 17,20 11,20 8,11" fill="#F4A300" />
              <circle cx="14" cy="14" r="12" stroke="#52B788" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 22, color: '#F5F5F0', letterSpacing: 3 }}>BALL<span style={{ color: '#F4A300' }}>LINK</span></span>
        </Link>
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
          color: 'rgba(245,245,240,0.6)', textDecoration: 'none',
          border: '1px solid rgba(245,245,240,0.1)', borderRadius: 8, padding: '7px 14px',
        }}>
          <ArrowLeft size={14} /> Back Home
        </Link>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: 'rgba(27,67,50,0.3)', border: '1px solid rgba(82,183,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
          <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
            <polygon points="20,7 27,14 24,25 16,25 13,14" fill="#F4A300" opacity="0.9" />
            <circle cx="20" cy="20" r="17" stroke="#52B788" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 56, color: '#F5F5F0', letterSpacing: 2, margin: '0 0 12px' }}>{title}</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(245,245,240,0.45)', maxWidth: 360, lineHeight: 1.6, margin: '0 0 36px' }}>{subtitle}</p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
          color: '#0D1B2A', textDecoration: 'none',
          background: 'linear-gradient(135deg, #F4A300, #FFB800)',
          padding: '13px 28px', borderRadius: 12,
          boxShadow: '0 6px 24px rgba(244,163,0,0.35)',
        }}>
          Back to Home
        </Link>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'rgba(245,245,240,0.15)', marginTop: 40 }}>BallLink — Stage 1 Build</p>
      </main>
    </div>
  );
}
