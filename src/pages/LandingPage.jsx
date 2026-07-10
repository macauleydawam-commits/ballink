import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Users, ArrowRight, ChevronDown, Menu, X,
  Clock, Zap, Shield, Star, TrendingUp, Play,
} from 'lucide-react';
import { FEATURED_PITCHES, LIVE_MATCHES, HOW_IT_WORKS } from '../data/mockData';
import { useOnboarding } from '../context/OnboardingContext';

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(13,27,42,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(82,183,136,0.12)' : '1px solid transparent',
    }}>
      <nav style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #1B4332, #52B788)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(244,163,0,0.3)',
            boxShadow: '0 0 20px rgba(82,183,136,0.2)',
          }}>
            <svg viewBox="0 0 28 28" width="20" height="20" fill="none">
              <polygon points="14,5 20,11 17,20 11,20 8,11" fill="#F4A300" />
              <circle cx="14" cy="14" r="12" stroke="#52B788" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 26, color: '#F5F5F0', letterSpacing: 3 }}>
            BALL<span style={{ color: '#F4A300' }}>LINK</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-desktop">
          {['#how-it-works', '#pitches', '#matches'].map((href, i) => (
            <a key={i} href={href} style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
              color: 'rgba(245,245,240,0.6)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#F5F5F0'}
              onMouseLeave={e => e.target.style.color = 'rgba(245,245,240,0.6)'}
            >
              {['How it Works', 'Pitches', 'Matches'][i]}
            </a>
          ))}
          <Link to="/chat" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
            color: 'rgba(245,245,240,0.6)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#F5F5F0'}
            onMouseLeave={e => e.target.style.color = 'rgba(245,245,240,0.6)'}
          >
            Chat
          </Link>
          <Link to="/owner-dashboard" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
            color: 'rgba(245,245,240,0.6)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#F5F5F0'}
            onMouseLeave={e => e.target.style.color = 'rgba(245,245,240,0.6)'}
          >
            Owner Portal
          </Link>
        </div>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }} className="nav-desktop">
          <Link to="/login" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
            color: 'rgba(245,245,240,0.7)', textDecoration: 'none', padding: '8px 18px',
            border: '1px solid rgba(245,245,240,0.15)', borderRadius: 10,
            transition: 'all 0.2s',
          }}>
            Log In
          </Link>
          <Link to="/signup" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
            color: '#0D1B2A', textDecoration: 'none', padding: '9px 22px',
            background: 'linear-gradient(135deg, #F4A300, #FFB800)',
            borderRadius: 10, letterSpacing: 0.3,
            boxShadow: '0 4px 20px rgba(244,163,0,0.35)',
            transition: 'all 0.2s',
          }}>
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="nav-mobile" style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#F5F5F0', padding: 8,
        }} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(13,27,42,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(82,183,136,0.12)',
          padding: '16px 24px 24px',
        }}>
          {[
            { label: 'How it Works', href: '#how-it-works' },
            { label: 'Pitches', href: '#pitches' },
            { label: 'Matches', href: '#matches' },
          ].map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{
              display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 16,
              color: 'rgba(245,245,240,0.7)', textDecoration: 'none',
              padding: '14px 0', borderBottom: '1px solid rgba(82,183,136,0.08)',
            }}>{label}</a>
          ))}
          <Link to="/chat" onClick={() => setOpen(false)} style={{
            display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 16,
            color: 'rgba(245,245,240,0.7)', textDecoration: 'none',
            padding: '14px 0', borderBottom: '1px solid rgba(82,183,136,0.08)',
          }}>
            Chat
          </Link>
          <Link to="/owner-dashboard" onClick={() => setOpen(false)} style={{
            display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 16,
            color: 'rgba(245,245,240,0.7)', textDecoration: 'none',
            padding: '14px 0', borderBottom: '1px solid rgba(82,183,136,0.08)',
          }}>
            Owner Portal
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            <Link to="/login" onClick={() => setOpen(false)} style={{
              textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500,
              color: '#F5F5F0', textDecoration: 'none', padding: '13px',
              border: '1px solid rgba(245,245,240,0.2)', borderRadius: 12,
            }}>Log In</Link>
            <Link to="/signup" onClick={() => setOpen(false)} style={{
              textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600,
              color: '#0D1B2A', textDecoration: 'none', padding: '13px',
              background: 'linear-gradient(135deg, #F4A300, #FFB800)', borderRadius: 12,
            }}>Get Started — Free</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
        @media (min-width: 769px) { .nav-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i += 3; setCount(Math.min(i, 240)); if (i >= 240) clearInterval(t); }, 20);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      minHeight: '100vh', background: '#0D1B2A', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Grid pattern background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(82,183,136,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(82,183,136,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} aria-hidden="true" />

      {/* Radial glows */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 800,
        background: 'radial-gradient(ellipse, rgba(27,67,50,0.5) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', bottom: 0, right: '-10%',
        width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(244,163,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Content */}
      <div style={{
        flex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingTop: 100, paddingBottom: 60,
      }}>
        <div className="hero-grid">

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Live pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.3)',
                borderRadius: 100, padding: '6px 14px',
              }}>
                <span style={{
                  width: 7, height: 7, background: '#E63946', borderRadius: '50%',
                  animation: 'livePulse 1.5s ease-in-out infinite',
                }} aria-hidden="true" />
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 600,
                  color: '#E63946', letterSpacing: 1, textTransform: 'uppercase',
                }}>12 Matches Live Now</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(60px, 10vw, 110px)',
                lineHeight: 0.92, color: '#F5F5F0', letterSpacing: 2, margin: 0,
              }}>
                FIND A<br />
                <span style={{
                  background: 'linear-gradient(135deg, #F4A300 20%, #FFD166 80%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>PITCH.</span><br />
                PLAY<br />
                FOOTBALL.
              </h1>
            </div>

            {/* Sub */}
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.65,
              color: 'rgba(245,245,240,0.55)', maxWidth: 420, margin: 0,
            }}>
              Jos's first platform connecting players, teams, and pitch owners.
              Book a turf, join an open match, or fill your squad — in seconds.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/signup" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700,
                color: '#0D1B2A', textDecoration: 'none',
                background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                padding: '15px 30px', borderRadius: 14,
                boxShadow: '0 8px 32px rgba(244,163,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
                letterSpacing: 0.3, transition: 'all 0.2s',
              }}>
                Get Started — It's Free <ArrowRight size={16} />
              </Link>
              <a href="#pitches" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500,
                color: 'rgba(245,245,240,0.8)', textDecoration: 'none',
                padding: '15px 28px', borderRadius: 14,
                border: '1px solid rgba(245,245,240,0.15)',
                background: 'rgba(245,245,240,0.04)',
                backdropFilter: 'blur(10px)',
              }}>
                <Play size={14} fill="currentColor" /> Watch How It Works
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 32, paddingTop: 8, flexWrap: 'wrap' }}>
              {[
                { val: `${count}+`, label: 'Players' },
                { val: '18', label: 'Pitches' },
                { val: '₦0', label: 'To Join' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 28, fontWeight: 700,
                    color: '#F4A300', lineHeight: 1,
                  }}>{val}</div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 12,
                    color: 'rgba(245,245,240,0.35)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Pitch Card */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '100%', position: 'relative',
              animation: 'float 6s ease-in-out infinite',
            }}>
              {/* Main pitch card */}
              <div style={{
                background: 'linear-gradient(145deg, #1B4332 0%, #0f2a1f 50%, #0D1B2A 100%)',
                borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(82,183,136,0.2)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(82,183,136,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
                position: 'relative',
              }}>
                {/* Pitch SVG illustration */}
                <PitchCard3D />

                {/* Overlay gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
                  background: 'linear-gradient(to top, rgba(13,27,42,0.9), transparent)',
                }} aria-hidden="true" />

                {/* Bottom info bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                }}>
                  <div>
                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 22, color: '#F5F5F0', letterSpacing: 1 }}>
                      Terminus Turf Arena
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(245,245,240,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={10} /> Terminus Road, Jos
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 20, color: '#F4A300', fontWeight: 700 }}>
                      ₦8,500
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>per hour</div>
                  </div>
                </div>
              </div>

              {/* Floating live card */}
              <div style={{
                position: 'absolute', top: -16, right: -16,
                background: 'rgba(13,27,42,0.9)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(230,57,70,0.3)', borderRadius: 16,
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              }}>
                <div style={{
                  width: 8, height: 8, background: '#E63946', borderRadius: '50%',
                  animation: 'livePulse 1.5s ease-in-out infinite',
                }} aria-hidden="true" />
                <div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#E63946', fontWeight: 700, letterSpacing: 1 }}>LIVE MATCH</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(245,245,240,0.7)' }}>2 spots left</div>
                </div>
              </div>

              {/* Floating booking card */}
              <div style={{
                position: 'absolute', bottom: -18, left: -16,
                background: 'rgba(13,27,42,0.9)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(82,183,136,0.2)', borderRadius: 16,
                padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, background: 'rgba(82,183,136,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Clock size={16} style={{ color: '#52B788' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.4)', marginBottom: 2 }}>Next slot open</div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, color: '#F5F5F0', fontWeight: 600 }}>18:00 Today</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 28, animation: 'bounce 2s infinite' }}>
        <a href="#how-it-works" aria-label="Scroll down" style={{ color: 'rgba(245,245,240,0.2)', lineHeight: 1 }}>
          <ChevronDown size={26} />
        </a>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}

// ─── PITCH SVG (hero card) ────────────────────────────────────────────────────
function PitchCard3D() {
  return (
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e5038" />
          <stop offset="100%" stopColor="#143628" />
        </linearGradient>
        <pattern id="gs2" x="0" y="0" width="30" height="280" patternUnits="userSpaceOnUse">
          <rect width="15" height="280" fill="#1B4332" />
          <rect x="15" width="15" height="280" fill="#1e5038" />
        </pattern>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#52B788" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#52B788" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="280" fill="url(#pg2)" />
      <rect width="480" height="280" fill="url(#gs2)" opacity="0.5" />
      <rect width="480" height="280" fill="url(#glow2)" />
      {/* Pitch lines */}
      <rect x="30" y="20" width="420" height="240" fill="none" stroke="white" strokeWidth="2" opacity="0.55" />
      <line x1="240" y1="20" x2="240" y2="260" stroke="white" strokeWidth="1.5" opacity="0.55" />
      <circle cx="240" cy="140" r="44" fill="none" stroke="white" strokeWidth="1.5" opacity="0.55" />
      <circle cx="240" cy="140" r="4" fill="white" opacity="0.7" />
      {/* Left goal box */}
      <rect x="30" y="80" width="70" height="120" fill="none" stroke="white" strokeWidth="1.5" opacity="0.45" />
      <rect x="30" y="105" width="28" height="70" fill="none" stroke="white" strokeWidth="1" opacity="0.35" />
      <circle cx="110" cy="140" r="3" fill="white" opacity="0.5" />
      {/* Right goal box */}
      <rect x="380" y="80" width="70" height="120" fill="none" stroke="white" strokeWidth="1.5" opacity="0.45" />
      <rect x="422" y="105" width="28" height="70" fill="none" stroke="white" strokeWidth="1" opacity="0.35" />
      <circle cx="370" cy="140" r="3" fill="white" opacity="0.5" />
      {/* Players */}
      <circle cx="190" cy="120" r="9" fill="#F4A300" opacity="0.9" />
      <ellipse cx="190" cy="134" rx="7" ry="11" fill="#F4A300" opacity="0.85" />
      <circle cx="280" cy="155" r="9" fill="#52B788" opacity="0.9" />
      <ellipse cx="280" cy="169" rx="7" ry="11" fill="#52B788" opacity="0.85" />
      <circle cx="155" cy="165" r="8" fill="#F4A300" opacity="0.7" />
      <circle cx="320" cy="118" r="8" fill="#52B788" opacity="0.7" />
      {/* Ball */}
      <circle cx="235" cy="143" r="7" fill="white" opacity="0.95" />
      <path d="M235 136 L239 140 L237 145 L233 145 L231 140 Z" fill="#1B4332" opacity="0.5" />
      {/* Corner arcs */}
      <path d="M30 20 A10 10 0 0 1 40 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <path d="M450 20 A10 10 0 0 0 440 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <path d="M30 260 A10 10 0 0 0 40 250" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <path d="M450 260 A10 10 0 0 1 440 250" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', icon: MapPin, color: '#52B788', bg: 'rgba(82,183,136,0.1)', border: 'rgba(82,183,136,0.25)', title: 'Find a Pitch or Match', desc: 'Browse pitches and open matches near you across Jos — sorted by distance, price, and availability.' },
    { n: '02', icon: Users, color: '#F4A300', bg: 'rgba(244,163,0,0.08)', border: 'rgba(244,163,0,0.25)', title: 'Book or Join in One Tap', desc: 'Grab a spot in an open match instantly, or reserve a full pitch slot for your squad. Secure payment via Paystack.' },
    { n: '03', icon: Zap, color: '#E63946', bg: 'rgba(230,57,70,0.08)', border: 'rgba(230,57,70,0.2)', title: 'Show Up and Play', desc: 'Get your confirmation, arrive at kick-off, and ball out. Rate the pitch and organiser after to help the community.' },
  ];

  return (
    <section id="how-it-works" style={{ background: '#0a1520', padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Faint pitch lines in bg */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="50%" cy="50%" r="300" fill="none" stroke="white" strokeWidth="2" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="2" />
      </svg>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            color: '#52B788', letterSpacing: 3, textTransform: 'uppercase',
            marginBottom: 16, padding: '6px 16px',
            border: '1px solid rgba(82,183,136,0.25)', borderRadius: 100,
            background: 'rgba(82,183,136,0.05)',
          }}>The Process</div>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(44px, 6vw, 72px)',
            color: '#F5F5F0', letterSpacing: 2, margin: '0 0 16px',
          }}>
            From Search to Kick-Off<br />
            <span style={{ color: '#F4A300' }}>in Under 2 Minutes</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="steps-grid">
          {steps.map(({ n, icon: Icon, color, bg, border, title, desc }) => (
            <div key={n} style={{
              background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(82,183,136,0.1)`,
              borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${border}`; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(82,183,136,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              {/* Step number watermark */}
              <div style={{
                position: 'absolute', top: -10, right: 16,
                fontFamily: '"Bebas Neue", sans-serif', fontSize: 120, color: 'rgba(255,255,255,0.025)',
                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
              }}>{n}</div>

              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: bg, border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <Icon size={24} style={{ color }} />
              </div>

              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color,
                letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10,
              }}>Step {n}</div>

              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif', fontSize: 26, color: '#F5F5F0',
                letterSpacing: 1, marginBottom: 12, lineHeight: 1.1,
              }}>{title}</h3>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7,
                color: 'rgba(245,245,240,0.5)', margin: 0,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; } @media(max-width:768px){.steps-grid{grid-template-columns:1fr;}}`}</style>
    </section>
  );
}

// ─── FEATURED PITCHES ─────────────────────────────────────────────────────────
function FeaturedPitches() {
  const { pitches } = useOnboarding();
  return (
    <section id="pitches" style={{ background: '#0D1B2A', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#52B788',
              letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12,
            }}>Top Rated in Jos</div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(40px, 5vw, 64px)',
              color: '#F5F5F0', letterSpacing: 2, margin: 0, lineHeight: 1,
            }}>Featured Pitches</h2>
          </div>
          <Link to="/signup" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
            color: '#52B788', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid rgba(82,183,136,0.25)', borderRadius: 10, padding: '10px 18px',
            background: 'rgba(82,183,136,0.06)',
          }}>
            See all 18 pitches <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="pitch-grid">
          {pitches.map((p, i) => (
            <PitchCardUI key={p.id} pitch={p} featured={i === 0} pitches={pitches} />
          ))}
        </div>
      </div>
      <style>{`.pitch-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;} @media(max-width:1024px){.pitch-grid{grid-template-columns:repeat(2,1fr);}} @media(max-width:560px){.pitch-grid{grid-template-columns:1fr;}}`}</style>
    </section>
  );
}

const PITCH_GRADIENTS = [
  'linear-gradient(145deg, #1B4332, #0f2a1f)',
  'linear-gradient(145deg, #1a3a5c, #0f2540)',
  'linear-gradient(145deg, #2d1b4e, #1a0f30)',
  'linear-gradient(145deg, #1b3a1b, #0d2a0d)',
];

function PitchCardUI({ pitch, featured, pitches }) {
  const [hovered, setHovered] = useState(false);
  const idx = pitches ? pitches.indexOf(pitch) : 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111c2a', borderRadius: 20, overflow: 'hidden',
        border: hovered ? '1px solid rgba(244,163,0,0.35)' : '1px solid rgba(82,183,136,0.1)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.3s', transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* Image area */}
      <div style={{
        height: 160, background: PITCH_GRADIENTS[idx % 4], position: 'relative', overflow: 'hidden',
      }}>
        {/* Mini pitch lines */}
        <svg viewBox="0 0 280 160" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }} aria-hidden="true">
          <rect x="15" y="12" width="250" height="136" fill="none" stroke="white" strokeWidth="1.5" />
          <line x1="140" y1="12" x2="140" y2="148" stroke="white" strokeWidth="1" />
          <circle cx="140" cy="80" r="30" fill="none" stroke="white" strokeWidth="1" />
          <rect x="15" y="50" width="45" height="60" fill="none" stroke="white" strokeWidth="1" />
          <rect x="220" y="50" width="45" height="60" fill="none" stroke="white" strokeWidth="1" />
        </svg>
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(17,28,42,0.8))' }} />
        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {featured && (
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700,
              color: '#0D1B2A', background: '#F4A300', borderRadius: 6, padding: '3px 8px',
              letterSpacing: 0.5, textTransform: 'uppercase',
            }}>⚡ Top Pick</span>
          )}
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
            color: pitch.available ? '#52B788' : 'rgba(245,245,240,0.5)',
            background: pitch.available ? 'rgba(82,183,136,0.15)' : 'rgba(245,245,240,0.07)',
            border: `1px solid ${pitch.available ? 'rgba(82,183,136,0.35)' : 'rgba(245,245,240,0.12)'}`,
            borderRadius: 100, padding: '3px 10px',
            marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: pitch.available ? '#52B788' : 'rgba(245,245,240,0.3)', display: 'inline-block' }} />
            {pitch.available ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 18px 20px' }}>
        <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, color: '#F5F5F0', letterSpacing: 1, margin: '0 0 4px' }}>{pitch.name}</h3>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
          <MapPin size={10} style={{ color: '#52B788' }} /> {pitch.location}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={12} fill={s <= Math.floor(pitch.rating) ? '#F4A300' : 'transparent'} style={{ color: s <= Math.floor(pitch.rating) ? '#F4A300' : 'rgba(245,245,240,0.15)' }} />
            ))}
          </div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#F4A300', fontWeight: 600 }}>{pitch.rating}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.3)' }}>({pitch.reviewCount})</span>
        </div>

        {/* Price + Surface row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 19, color: '#F4A300', fontWeight: 700 }}>
              ₦{pitch.pricePerHour.toLocaleString()}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.35)', marginLeft: 4 }}>/hr</span>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.4)', textAlign: 'right' }}>{pitch.surface}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {pitch.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500,
              color: 'rgba(245,245,240,0.5)', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '3px 8px',
            }}>{t}</span>
          ))}
        </div>

        <Link to="/signup" style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
          color: pitch.available ? '#0D1B2A' : 'rgba(245,245,240,0.4)',
          textDecoration: 'none',
          background: pitch.available ? 'linear-gradient(135deg, #F4A300, #FFB800)' : 'rgba(255,255,255,0.04)',
          border: pitch.available ? 'none' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '11px',
          boxShadow: pitch.available ? '0 4px 16px rgba(244,163,0,0.3)' : 'none',
          pointerEvents: pitch.available ? 'auto' : 'none',
        }}>
          {pitch.available ? 'Book This Pitch' : 'Join Waitlist'}
        </Link>
      </div>
    </div>
  );
}

// ─── LIVE MATCHES ─────────────────────────────────────────────────────────────
function LiveMatches() {
  return (
    <section id="matches" style={{ background: '#0a1520', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#E63946', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
              Happening Now &amp; Soon
            </div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(40px, 5vw, 64px)', color: '#F5F5F0', letterSpacing: 2, margin: 0 }}>
              Open Matches
            </h2>
          </div>
          <Link to="/signup" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
            color: '#E63946', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid rgba(230,57,70,0.25)', borderRadius: 10, padding: '10px 18px',
            background: 'rgba(230,57,70,0.06)',
          }}>
            Browse all matches <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LIVE_MATCHES.map((m) => <MatchRow key={m.id} match={m} />)}
        </div>
      </div>
    </section>
  );
}

function MatchRow({ match }) {
  const left = match.spotsTotal - match.spotsTaken;
  const full = left === 0;
  const pct = (match.spotsTaken / match.spotsTotal) * 100;
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        padding: '20px 24px', borderRadius: 18,
        background: hov ? 'rgba(27,67,50,0.2)' : 'rgba(255,255,255,0.025)',
        border: hov ? '1px solid rgba(82,183,136,0.2)' : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.25s',
      }}
    >
      {/* Time */}
      <div style={{ minWidth: 62, textAlign: 'center' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 22, fontWeight: 700, color: '#F4A300', lineHeight: 1 }}>{match.time}</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.35)', marginTop: 3 }}>{match.date}</div>
      </div>

      <div style={{ width: 1, height: 40, background: 'rgba(82,183,136,0.15)', flexShrink: 0 }} className="match-divider" />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
          {match.isLive && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
              color: '#E63946', background: 'rgba(230,57,70,0.12)',
              border: '1px solid rgba(230,57,70,0.3)', borderRadius: 100, padding: '3px 10px',
              letterSpacing: 1,
            }}>
              <span style={{ width: 5, height: 5, background: '#E63946', borderRadius: '50%', animation: 'livePulse 1.5s ease-in-out infinite' }} />
              LIVE
            </span>
          )}
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, color: '#F5F5F0', letterSpacing: 0.5 }}>{match.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={10} style={{ color: '#52B788' }} /> {match.pitchName}
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(245,245,240,0.35)' }}>{match.skillLevel}</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#F4A300', fontWeight: 600 }}>₦{match.fee.toLocaleString()}/head</span>
        </div>
      </div>

      {/* Spots */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 110 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: full ? '#E63946' : 'rgba(245,245,240,0.5)', fontWeight: full ? 600 : 400, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={11} style={{ color: full ? '#E63946' : '#52B788' }} />
            {full ? 'Full' : `${left} left`}
          </span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'rgba(245,245,240,0.25)' }}>{match.spotsTaken}/{match.spotsTotal}</span>
        </div>
        <div style={{ width: '100%', height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: full ? '#E63946' : '#52B788', borderRadius: 10, transition: 'width 0.8s ease' }} />
        </div>
      </div>

      {/* CTA */}
      <Link to="/signup" style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
        color: full ? 'rgba(245,245,240,0.3)' : '#0D1B2A',
        textDecoration: 'none', padding: '10px 20px',
        background: full ? 'rgba(255,255,255,0.04)' : 'linear-gradient(135deg, #F4A300, #FFB800)',
        border: full ? '1px solid rgba(255,255,255,0.08)' : 'none',
        borderRadius: 10, pointerEvents: full ? 'none' : 'auto',
        whiteSpace: 'nowrap',
        boxShadow: full ? 'none' : '0 4px 16px rgba(244,163,0,0.25)',
      }}>
        {full ? 'Squad Full' : 'Join Match'}
      </Link>

      <style>{`@media(max-width:600px){.match-divider{display:none;}}`}</style>
    </div>
  );
}

// ─── CTA BAND ────────────────────────────────────────────────────────────────
function CTABand() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #1B4332 0%, #143628 50%, #0f2a1f 100%)',
      padding: '96px 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="50%" cy="50%" r="280" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="180" fill="none" stroke="white" strokeWidth="1.5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="2" />
        <rect x="15%" y="20%" width="70%" height="60%" fill="none" stroke="white" strokeWidth="2" />
      </svg>
      {/* Gold glow */}
      <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(244,163,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
          color: '#52B788', background: 'rgba(82,183,136,0.1)',
          border: '1px solid rgba(82,183,136,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 28,
        }}>
          <Shield size={13} /> Free to join as a player
        </div>

        <h2 style={{
          fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(48px, 8vw, 88px)',
          color: '#F5F5F0', letterSpacing: 2, lineHeight: 0.95, margin: '0 0 24px',
        }}>
          Your Next Game<br />
          <span style={{ color: '#F4A300' }}>Starts Here.</span>
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.7,
          color: 'rgba(245,245,240,0.6)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px',
        }}>
          Join hundreds of players already using BallLink to find their next game across Jos. Create your profile in under 60 seconds.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700,
            color: '#0D1B2A', textDecoration: 'none',
            background: 'linear-gradient(135deg, #F4A300, #FFB800)',
            padding: '16px 36px', borderRadius: 14,
            boxShadow: '0 8px 32px rgba(244,163,0,0.45)',
            letterSpacing: 0.3,
          }}>
            Create Free Account <ArrowRight size={16} />
          </Link>
          <Link to="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500,
            color: 'rgba(245,245,240,0.8)', textDecoration: 'none',
            padding: '16px 32px', borderRadius: 14,
            border: '1px solid rgba(245,245,240,0.2)',
            background: 'rgba(245,245,240,0.05)',
          }}>
            Already have an account
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#080f18', borderTop: '1px solid rgba(82,183,136,0.08)', padding: '64px 24px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1B4332, #52B788)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(244,163,0,0.2)' }}>
                <svg viewBox="0 0 28 28" width="18" height="18" fill="none">
                  <polygon points="14,5 20,11 17,20 11,20 8,11" fill="#F4A300" />
                  <circle cx="14" cy="14" r="12" stroke="#52B788" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, color: '#F5F5F0', letterSpacing: 3 }}>BALL<span style={{ color: '#F4A300' }}>LINK</span></span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(245,245,240,0.35)', lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
              The football connection platform built for Jos, Plateau State, Nigeria.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 7, height: 7, background: '#52B788', borderRadius: '50%', animation: 'livePulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#52B788' }}>System operational</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'rgba(245,245,240,0.3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>Platform</div>
            {['Find Pitches', 'Browse Matches', 'Build a Team', 'List Your Pitch'].map(l => (
              <Link key={l} to="/signup" style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.45)', textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#F5F5F0'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,245,240,0.45)'}
              >{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'rgba(245,245,240,0.3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>Company</div>
            {[{ l: 'About BallLink', to: '/about' }, { l: 'Contact Us', to: '/contact' }, { l: 'Terms & Conditions', to: '/terms' }].map(({ l, to }) => (
              <Link key={l} to={to} style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.45)', textDecoration: 'none', marginBottom: 12 }}
                onMouseEnter={e => e.target.style.color = '#F5F5F0'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,245,240,0.45)'}
              >{l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'rgba(245,245,240,0.3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>Get in Touch</div>
            <a href="mailto:hello@balllink.ng" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#52B788', textDecoration: 'none', display: 'block', marginBottom: 8 }}>hello@balllink.ng</a>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(245,245,240,0.25)', margin: 0 }}>Jos, Plateau State, Nigeria</p>
          </div>
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(245,245,240,0.2)', margin: 0 }}>
            © {new Date().getFullYear()} BallLink. Built for football in Jos.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[{ l: 'Terms', to: '/terms' }, { l: 'Contact', to: '/contact' }, { l: 'About', to: '/about' }].map(({ l, to }) => (
              <Link key={l} to={to} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(245,245,240,0.25)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`.footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px;} @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr;}} @media(max-width:480px){.footer-grid{grid-template-columns:1fr;}}`}</style>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A' }}>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedPitches />
        <LiveMatches />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
