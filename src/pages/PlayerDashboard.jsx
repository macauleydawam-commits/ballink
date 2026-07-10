import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import { LogOut, User, MapPin, Trophy, Shield, Activity, Search, Calendar, ChevronRight } from 'lucide-react';

export default function PlayerDashboard() {
  const navigate = useNavigate();
  const { userProfile, resetProfile } = useOnboarding();

  const handleLogout = () => {
    resetProfile();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F5F0', fontFamily: 'Inter, sans-serif' }}>
      {/* Header bar */}
      <header style={{ padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(82,183,136,0.1)', background: 'rgba(13,27,42,0.8)', backdropFilter: 'blur(10px)', sticky: 'top', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg, #1B4332, #52B788)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(244,163,0,0.2)' }}>
            <svg viewBox="0 0 28 28" width="17" height="17" fill="none">
              <polygon points="14,5 20,11 17,20 11,20 8,11" fill="#F4A300" />
              <circle cx="14" cy="14" r="12" stroke="#52B788" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 22, color: '#F5F5F0', letterSpacing: 3 }}>BALL<span style={{ color: '#F4A300' }}>LINK</span></span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#52B788', border: '1px solid rgba(82,183,136,0.3)', padding: '2px 8px', borderRadius: 100, background: 'rgba(82,183,136,0.05)', marginLeft: 8 }}>PLAYER</span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
            color: '#E63946', background: 'rgba(230,57,70,0.05)', border: '1px solid rgba(230,57,70,0.15)',
            borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
          }}
        >
          <LogOut size={14} /> Log Out
        </button>
      </header>

      {/* Main Grid */}
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }} className="dash-grid">
          
          {/* Left Column: Player Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              background: 'linear-gradient(145deg, #1B4332 0%, #0f2a1f 100%)',
              border: '1px solid rgba(82,183,136,0.25)', borderRadius: 24, padding: 28,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden'
            }}>
              {/* Pitch grid watermark */}
              <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none' }}>
                <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="2" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="white" strokeWidth="2" />
              </svg>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={32} style={{ color: '#F4A300' }} />
                </div>
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700,
                  background: 'rgba(244,163,0,0.15)', color: '#F4A300', border: '1px solid rgba(244,163,0,0.3)',
                  padding: '4px 10px', borderRadius: 100, textTransform: 'uppercase'
                }}>
                  {userProfile.skillLevel || 'Intermediate'}
                </span>
              </div>

              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, color: '#F5F5F0', letterSpacing: 1, margin: '0 0 6px', textTransform: 'uppercase' }}>
                {userProfile.name || 'Anonymous Player'}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(245,245,240,0.5)', marginBottom: 20 }}>
                <MapPin size={12} style={{ color: '#52B788' }} /> {userProfile.location || 'Jos, Plateau State'}
              </div>

              {/* Attributes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, pt: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'rgba(245,245,240,0.4)' }}>Sex</span>
                  <span style={{ fontWeight: 600, color: '#F5F5F0' }}>{userProfile.sex || 'Not Specified'}</span>
                </div>
                <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'rgba(245,245,240,0.4)' }}>Position</span>
                  <span style={{ fontWeight: 600, color: '#F4A300' }}>{userProfile.position || 'Forward'}</span>
                </div>
                <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'rgba(245,245,240,0.4)' }}>Matches Played</span>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, color: '#52B788' }}>0 Games</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Feed / Welcome */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Quick Actions Card */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 28 }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, color: '#F5F5F0', letterSpacing: 1, margin: '0 0 16px' }}>
                QUICK ACTIONS
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="actions-grid">
                <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 18, background: 'rgba(82,183,136,0.05)', border: '1px solid rgba(82,183,136,0.15)', borderRadius: 16, color: '#F5F5F0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1B4332', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Search size={18} style={{ color: '#52B788' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Find Matches</div>
                    <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>Join local runs in Jos</div>
                  </div>
                </button>

                <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 18, background: 'rgba(244,163,0,0.04)', border: '1px solid rgba(244,163,0,0.15)', borderRadius: 16, color: '#F5F5F0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#4d3300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={18} style={{ color: '#F4A300' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Book Pitches</div>
                    <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>Reserve pitch slot</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Upcoming runs placeholder */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 28, display: 'flex', flexDirection: 'column', justify: 'center', alignItems: 'center', textAlign: 'center', minHeight: 180 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Activity size={20} style={{ color: 'rgba(245,245,240,0.3)' }} />
              </div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: 'rgba(245,245,240,0.8)', margin: '0 0 6px' }}>No matches joined yet</h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(245,245,240,0.4)', maxWidth: 280, margin: '0 0 16px' }}>
                Join local matches in Jos near you to show up on the pitch.
              </p>
              <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F5F5F0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Find Matches
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .dash-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; }
        .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media(max-width:768px) {
          .dash-grid { grid-template-columns: 1fr; }
          .actions-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
