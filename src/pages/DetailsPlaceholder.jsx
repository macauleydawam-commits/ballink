import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Phone, DollarSign, Award, Trophy, User } from 'lucide-react';
import Logo from '../components/Logo';

export default function DetailsPlaceholder() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Determine type from ID prefix
  const isPitch = id?.startsWith('pitch-');
  const isMatch = id?.startsWith('match-');
  const isTourney = id?.startsWith('tourney-');

  let title = 'Details Page';
  let subtitle = `Viewing item ID: ${id}`;
  let typeLabel = 'Item Details';

  if (isPitch) {
    title = 'Pitch Information';
    subtitle = 'Facility specification, map coordination, and calendar booking.';
    typeLabel = 'PITCH DETAILED VIEW';
  } else if (isMatch) {
    title = 'Match Information';
    subtitle = 'Organiser notes, player roster, starting XI lines, and chat room.';
    typeLabel = 'MATCH DETAILED VIEW';
  } else if (isTourney) {
    title = 'Tournament Arena';
    subtitle = 'Tournament fixtures, teams scoreboard, prize pool structure.';
    typeLabel = 'TOURNAMENT VIEW';
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justify: 'space-between', borderBottom: '1px solid rgba(82,183,136,0.1)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg, #1B4332, #52B788)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(244,163,0,0.2)' }}>
            <svg viewBox="0 0 28 28" width="17" height="17" fill="none">
              <polygon points="14,5 20,11 17,20 11,20 8,11" fill="#F4A300" />
              <circle cx="14" cy="14" r="12" stroke="#52B788" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 22, color: '#F5F5F0', letterSpacing: 3 }}>BALL<span style={{ color: '#F4A300' }}>LINK</span></span>
        </Link>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
            color: 'rgba(245,245,240,0.6)', background: 'none', border: '1px solid rgba(245,245,240,0.1)',
            borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
          }}
        >
          <ArrowLeft size={14} /> Back
        </button>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 24px' }}>
        <div style={{
          width: '100%', maxWidth: 500, background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(82,183,136,0.1)', borderRadius: 28, padding: '36px 28px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Header metadata */}
          <div style={{
            display: 'inline-block', fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            color: '#F4A300', letterSpacing: 2, textTransform: 'uppercase',
            marginBottom: 16, padding: '4px 12px',
            border: '1px solid rgba(244,163,0,0.25)', borderRadius: 100,
            background: 'rgba(244,163,0,0.05)',
          }}>{typeLabel}</div>

          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 44, color: '#F5F5F0', letterSpacing: 2, margin: '0 0 10px', lineHeight: 1 }}>
            {title}
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.6, marginBottom: 28 }}>
            {subtitle}
          </p>

          {/* Details list placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32, padding: 20, background: 'rgba(0,0,0,0.15)', borderRadius: 18, border: '1px solid rgba(255,255,255,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(82,183,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52B788' }}>
                {isPitch ? <MapPin size={16} /> : isMatch ? <Clock size={16} /> : <Trophy size={16} />}
              </div>
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>Reference Code</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, color: '#F5F5F0', fontWeight: 600 }}>{id}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(244,163,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4A300' }}>
                <DollarSign size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>Status / Pricing</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0', fontWeight: 600 }}>Virtual pricing applies — Stage 4 detail wiring</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(230,57,70,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E63946' }}>
                <Award size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>Verification</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#52B788', fontWeight: 600 }}>Verified Jos Community Entry</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                flex: 1, padding: '13px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)', color: '#F5F5F0',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => alert('Full detail view, starting XI formation and real bookings coming in Stage 4.')}
              style={{
                flex: 1, padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                color: '#0D1B2A', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(244,163,0,0.25)',
              }}
            >
              Book / Action
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
