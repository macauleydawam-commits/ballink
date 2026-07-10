import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import {
  ArrowLeft, MapPin, Calendar, Clock, Star, Edit, DollarSign,
  AlertCircle, ShieldCheck, CheckCircle2, X, Plus, Minus
} from 'lucide-react';

const STATIC_REVIEWS = [
  { id: 1, author: 'Musa B.', rating: 5, date: '2 days ago', text: 'Best turf in Jos! The lighting is fantastic for evening runs. Clean water was provided.' },
  { id: 2, author: 'Chinedu O.', rating: 4, date: '1 week ago', text: 'Good grass condition. Parking gets tight on Friday nights, but the pitch itself is 10/10.' },
  { id: 3, author: 'Serah Y.', rating: 5, date: '2 weeks ago', text: 'Super friendly management. We booking this slot weekly now!' },
];

export default function PitchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pitches, updatePitch, addBooking } = useOnboarding();

  // Find target pitch in local state
  const pitch = pitches.find(p => p.id === id) || pitches[0];

  // UI state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Booking form state
  const [bookingDate, setBookingDate] = useState('2026-07-12');
  const [bookingTime, setBookingTime] = useState('18:00');
  const [bookingDuration, setBookingDuration] = useState(1);

  // Edit pitch form state
  const [editName, setEditName] = useState(pitch.name);
  const [editLocation, setEditLocation] = useState(pitch.location);
  const [editPrice, setEditPrice] = useState(pitch.pricePerHour);
  const [editSurface, setEditSurface] = useState(pitch.surface);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [id]);

  const renderSkeleton = () => (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ height: 260, borderRadius: 20, background: 'rgba(255,255,255,0.05)', animation: 'skeletonPulse 1.5s infinite ease-in-out' }} />
      <div className="detail-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ width: '60%', height: 48, borderRadius: 8, background: 'rgba(255,255,255,0.05)', animation: 'skeletonPulse 1.5s infinite ease-in-out' }} />
          <div style={{ width: '40%', height: 20, borderRadius: 4, background: 'rgba(255,255,255,0.05)', animation: 'skeletonPulse 1.5s infinite ease-in-out' }} />
          <div style={{ height: 160, borderRadius: 16, background: 'rgba(255,255,255,0.05)', animation: 'skeletonPulse 1.5s infinite ease-in-out' }} />
        </div>
        <div style={{ height: 300, borderRadius: 20, background: 'rgba(255,255,255,0.05)', animation: 'skeletonPulse 1.5s infinite ease-in-out' }} />
      </div>
    </div>
  );

  const calculateTotal = () => {
    return pitch.pricePerHour * bookingDuration;
  };

  const handleBookNowSubmit = (e) => {
    e.preventDefault();
    // Add to global state
    addBooking({
      pitchId: pitch.id,
      pitchName: pitch.name,
      ownerId: pitch.ownerId,
      date: bookingDate,
      time: bookingTime,
      duration: bookingDuration,
      totalPrice: calculateTotal(),
    });
    setShowBookingModal(false);
    setShowSuccessModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updatePitch(pitch.id, {
      name: editName,
      location: editLocation,
      pricePerHour: Number(editPrice),
      surface: editSurface,
    });
    setShowEditModal(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F5F0', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: 'rgba(13,27,42,0.95)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(82,183,136,0.12)'
      }}>
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
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, color: '#F5F5F0', letterSpacing: 2 }}>
          PITCH <span style={{ color: '#F4A300' }}>DETAILS</span>
        </span>
        <button
          onClick={() => setShowEditModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
            color: '#F4A300', background: 'rgba(244,163,0,0.05)', border: '1px solid rgba(244,163,0,0.2)',
            borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
          }}
        >
          <Edit size={14} /> Edit Pitch
        </button>
      </header>

      {loading ? renderSkeleton() : (
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px' }}>
        {/* Photo Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10, height: 260, borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
          {/* Main Photo */}
          <div style={{
            background: 'linear-gradient(135deg, #1B4332, #0d2a1e)',
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg viewBox="0 0 200 100" style={{ width: '60%', opacity: 0.15 }}>
              <rect x="10" y="10" width="180" height="80" fill="none" stroke="white" strokeWidth="2" />
              <line x1="100" y1="10" x2="100" y2="90" stroke="white" strokeWidth="1.5" />
            </svg>
            <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 11, background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: 6, letterSpacing: 1 }}>ARENA EXTERIOR</span>
          </div>
          {/* Sub Photos stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ flex: 1, background: 'linear-gradient(135deg, #1a3a5c, #0f2540)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>FLOODLIGHTS</span>
            </div>
            <div style={{ flex: 1, background: 'linear-gradient(135deg, #2d1b4e, #1a0f30)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>SQUAD BENCH</span>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: 24 }} className="detail-layout">
          {/* Left info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 44, color: '#F5F5F0', margin: '0 0 8px', letterSpacing: 1 }}>{pitch.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(245,245,240,0.5)' }}>
                <MapPin size={14} style={{ color: '#52B788' }} /> {pitch.location}
              </div>
            </div>

            {/* Spec Table */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', marginBottom: 2 }}>SURFACE TYPE</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{pitch.surface || 'Artificial Turf'}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', marginBottom: 2 }}>FACILITY RATING</div>
                <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, color: '#F4A300' }}>
                  <Star size={13} fill="#F4A300" /> {pitch.rating} ({pitch.reviewCount || 0} runs)
                </div>
              </div>
            </div>

            {/* Simulated Map Placeholder */}
            <div>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, color: '#F5F5F0', margin: '0 0 10px', letterSpacing: 0.5 }}>Location Map</h3>
              <div style={{
                height: 160, background: '#111c2a', borderRadius: 16, border: '1px solid rgba(82,183,136,0.15)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'
              }}>
                {/* SVG mock map drawing */}
                <svg viewBox="0 0 400 160" width="100%" height="100%" style={{ position: 'absolute', opacity: 0.3 }}>
                  <line x1="0" y1="40" x2="400" y2="40" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="white" strokeWidth="1" />
                  <line x1="120" y1="0" x2="120" y2="160" stroke="white" strokeWidth="1" />
                  <circle cx="200" cy="80" r="30" fill="none" stroke="#52B788" strokeWidth="2" strokeDasharray="4" />
                </svg>
                <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <MapPin size={24} style={{ color: '#E63946' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#F5F5F0' }}>Map coordinates locked to {pitch.location}</span>
                  <span style={{ fontSize: 10, color: 'rgba(245,245,240,0.4)' }}>Google Maps API integration coming in Stage 6</span>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, color: '#F5F5F0', margin: '0 0 12px', letterSpacing: 0.5 }}>Player Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {STATIC_REVIEWS.map(r => (
                  <div key={r.id} style={{ padding: 14, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 14 }}>
                    <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#52B788' }}>{r.author}</span>
                      <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.3)' }}>{r.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={10} fill={s <= r.rating ? '#F4A300' : 'transparent'} style={{ color: s <= r.rating ? '#F4A300' : 'rgba(245,245,240,0.1)' }} />
                      ))}
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.6)', lineHeight: 1.5, margin: 0 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#111c2a', border: '1px solid rgba(82,183,136,0.15)', borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Hourly Booking Fee</span>
                <div style={{ fontSize: 32, fontFamily: '"JetBrains Mono", monospace', color: '#F4A300', fontWeight: 700, marginTop: 4 }}>
                  ₦{pitch.pricePerHour.toLocaleString()}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', display: 'block', marginBottom: 8 }}>POPULAR SLOTS TODAY</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(pitch.availableSlots || ['17:00', '18:00', '21:00']).map(slot => (
                    <button
                      key={slot}
                      onClick={() => { setBookingTime(slot); setShowBookingModal(true); }}
                      style={{
                        padding: '10px', borderRadius: 10, background: 'rgba(82,183,136,0.08)',
                        border: '1px solid rgba(82,183,136,0.2)', color: '#52B788',
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', textAlign: 'center'
                      }}
                    >
                      {slot} — Book
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                disabled={!pitch.available}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12,
                  background: pitch.available ? 'linear-gradient(135deg, #F4A300, #FFB800)' : 'rgba(255,255,255,0.05)',
                  border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                  color: pitch.available ? '#0D1B2A' : 'rgba(245,245,240,0.3)', cursor: pitch.available ? 'pointer' : 'not-allowed',
                  boxShadow: pitch.available ? '0 4px 16px rgba(244,163,0,0.35)' : 'none',
                }}
              >
                {pitch.available ? 'Book Pitch Now' : 'Fully Booked Today'}
              </button>
            </div>
          </div>
        </div>
      </main>
      )}

      {/* --- BOOKING FLOW MODAL --- */}
      {showBookingModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          {/* Backdrop */}
          <div onClick={() => setShowBookingModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} />
          {/* Panel */}
          <div style={{
            position: 'relative', zIndex: 1, width: '100%', maxWidth: 440,
            background: '#111c2a', border: '1px solid rgba(82,183,136,0.3)',
            borderRadius: 24, padding: 28, boxShadow: '0 30px 70px rgba(0,0,0,0.6)'
          }}>
            <button onClick={() => setShowBookingModal(false)} style={{ position: 'absolute', right: 18, top: 18, background: 'none', border: 'none', color: 'rgba(245,245,240,0.4)', cursor: 'pointer' }}><X size={20} /></button>
            
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, color: '#F5F5F0', margin: '0 0 6px', letterSpacing: 1 }}>RESERVE YOUR SLOT</h2>
            <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', marginBottom: 20 }}>Configure timing options to calculate rates.</p>

            <form onSubmit={handleBookNowSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Select Date */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Select Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                />
              </div>

              {/* Select Time */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Start Time</label>
                <select
                  value={bookingTime}
                  onChange={e => setBookingTime(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                >
                  {['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Duration Counter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Duration (Hours)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0D1B2A', padding: '6px 12px', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10 }}>
                  <button
                    type="button"
                    onClick={() => setBookingDuration(prev => Math.max(1, prev - 1))}
                    style={{ border: 'none', background: 'rgba(255,255,255,0.05)', width: 28, height: 28, borderRadius: 6, color: '#F5F5F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 15, fontWeight: 700 }}>{bookingDuration} hr</span>
                  <button
                    type="button"
                    onClick={() => setBookingDuration(prev => Math.min(8, prev + 1))}
                    style={{ border: 'none', background: 'rgba(255,255,255,0.05)', width: 28, height: 28, borderRadius: 6, color: '#F5F5F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* LIVE PRICING CALCULATION */}
              <div style={{ background: '#0D1B2A', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.03)', display: 'flex', justify: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>TOTAL RATE</span>
                  <div style={{ fontSize: 20, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, color: '#52B788' }}>
                    ₦{calculateTotal().toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 11, color: 'rgba(245,245,240,0.3)' }}>
                  {bookingDuration} hour{bookingDuration > 1 ? 's' : ''} × ₦{pitch.pricePerHour.toLocaleString()}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                  border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                  color: '#0D1B2A', cursor: 'pointer', marginTop: 6,
                  boxShadow: '0 4px 16px rgba(244,163,0,0.35)',
                }}
              >
                Proceed to Payment (Paystack)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MOCK CHECKOUT SUCCESS MODAL --- */}
      {showSuccessModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          {/* Backdrop */}
          <div onClick={() => setShowSuccessModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} />
          {/* Panel */}
          <div style={{
            position: 'relative', zIndex: 1, width: '100%', maxWidth: 400,
            background: '#111c2a', border: '1px solid rgba(82,183,136,0.3)',
            borderRadius: 24, padding: 32, textAlign: 'center',
            boxShadow: '0 30px 70px rgba(0,0,0,0.6)'
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: 'rgba(82,183,136,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(82,183,136,0.3)',
              color: '#52B788', margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={28} />
            </div>

            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, color: '#F5F5F0', margin: '0 0 8px', letterSpacing: 1 }}>BOOKING CONFIRMED!</h2>
            <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', lineHeight: 1.6, marginBottom: 24 }}>
              Your slot at <strong>{pitch.name}</strong> has been secured for {bookingDate} starting at {bookingTime}.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => { setShowSuccessModal(false); navigate('/dashboard'); }}
                style={{
                  width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                  border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                  color: '#0D1B2A', cursor: 'pointer',
                }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT PITCH DETAIL MODAL --- */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          {/* Backdrop */}
          <div onClick={() => setShowEditModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} />
          {/* Panel */}
          <div style={{
            position: 'relative', zIndex: 1, width: '100%', maxWidth: 440,
            background: '#111c2a', border: '1px solid rgba(82,183,136,0.3)',
            borderRadius: 24, padding: 28, boxShadow: '0 30px 70px rgba(0,0,0,0.6)'
          }}>
            <button onClick={() => setShowEditModal(false)} style={{ position: 'absolute', right: 18, top: 18, background: 'none', border: 'none', color: 'rgba(245,245,240,0.4)', cursor: 'pointer' }}><X size={20} /></button>
            
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, color: '#F5F5F0', margin: '0 0 6px', letterSpacing: 1 }}>EDIT PITCH LISTING</h2>
            <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', marginBottom: 20 }}>Update details to rewrite listing specs globally.</p>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Pitch Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Pitch Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                />
              </div>

              {/* Address / Location */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Address/Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={e => setEditLocation(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                />
              </div>

              {/* Price Per Hour */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Price per hour (₦)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={e => setEditPrice(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                />
              </div>

              {/* Surface type */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Surface specification</label>
                <input
                  type="text"
                  value={editSurface}
                  onChange={e => setEditSurface(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                />
              </div>

              {/* Save CTA */}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                  border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                  color: '#0D1B2A', cursor: 'pointer', marginTop: 6,
                }}
              >
                Save Pitch Changes
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .detail-layout { display: grid; grid-template-columns: 2fr 1.2fr; gap: 24px; }
        @media(max-width: 768px) {
          .detail-layout { grid-template-columns: 1fr; }
        }
        @media(max-width: 375px) {
          main { padding: 16px 12px !important; }
          .detail-layout { gap: 16px; }
          h1 { font-size: 32px !important; }
        }
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
