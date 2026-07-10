import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import {
  Home, Users, MessageSquare, User, Search, MapPin, Star,
  Clock, LogOut, ChevronRight, Filter, AlertCircle, Plus, Send,
  Calendar, Trash2, Edit3, X, CheckCircle
} from 'lucide-react';
import {
  NEARBY_PITCHES,
  AVAILABLE_PITCHES_TODAY,
  MATCHES_HAPPENING_TODAY,
  NEED_PLAYERS_GAMES,
  FEATURED_PITCHES,
  UPCOMING_TOURNAMENTS,
  LIVE_MATCHES
} from '../data/mockData';

const FORMATION_POSITIONS = [
  { id: 'gk', label: 'GK', name: 'Goalkeeper', cx: 200, cy: 340 },
  { id: 'ldf', label: 'LDF', name: 'Left Defender', cx: 80, cy: 260 },
  { id: 'cdf', label: 'CDF', name: 'Centre Defender', cx: 200, cy: 270 },
  { id: 'rdf', label: 'RDF', name: 'Right Defender', cx: 320, cy: 260 },
  { id: 'lmf', label: 'LMF', name: 'Left Midfielder', cx: 80, cy: 170 },
  { id: 'cmf', label: 'CMF', name: 'Centre Midfielder', cx: 200, cy: 190 },
  { id: 'rmf', label: 'RMF', name: 'Right Midfielder', cx: 320, cy: 170 },
  { id: 'amf', label: 'AMF', name: 'Attacking Midfielder', cx: 200, cy: 120 },
  { id: 'lfw', label: 'LFW', name: 'Left Forward', cx: 100, cy: 60 },
  { id: 'cfw', label: 'CFW', name: 'Centre Forward', cx: 200, cy: 50 },
  { id: 'rfw', label: 'RFW', name: 'Right Forward', cx: 300, cy: 60 },
];

export default function PlayerDashboard() {
  const navigate = useNavigate();
  const {
    userProfile,
    resetProfile,
    bookings,
    updateBooking,
    cancelBooking
  } = useOnboarding();

  const [activeTab, setActiveTab] = useState('home'); // 'home', 'matches', 'team', 'chat', 'profile'

  // Search & Filter state
  const [searchArea, setSearchArea] = useState('');
  const [searchTime, setSearchTime] = useState('');

  // Starting XI squad state
  const [squad, setSquad] = useState({
    gk: userProfile.position === 'Goalkeeper' ? userProfile.name : 'Tap to assign',
    ldf: 'Tap to assign',
    cdf: userProfile.position === 'Defender' ? userProfile.name : 'Tap to assign',
    rdf: 'Tap to assign',
    lmf: 'Tap to assign',
    cmf: userProfile.position === 'Midfielder' ? userProfile.name : 'Tap to assign',
    rmf: 'Tap to assign',
    amf: 'Tap to assign',
    lfw: 'Tap to assign',
    cfw: userProfile.position === 'Forward' ? userProfile.name : 'Tap to assign',
    rfw: 'Tap to assign',
  });

  // Edit booking modal state
  const [showEditBookingModal, setShowEditBookingModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDuration, setEditDuration] = useState(1);

  const assignPlayer = (posId) => {
    const pName = prompt("Enter player's name to assign to this position:");
    if (pName && pName.trim()) {
      setSquad(prev => ({ ...prev, [posId]: pName.trim() }));
    }
  };

  const handleLogout = () => {
    resetProfile();
    navigate('/');
  };

  const handleStartEditBooking = (booking) => {
    setEditingBooking(booking);
    setEditDate(booking.date);
    setEditTime(booking.time);
    setEditDuration(booking.duration);
    setShowEditBookingModal(true);
  };

  const handleSaveEditedBooking = (e) => {
    e.preventDefault();
    // Calculate new price based on duration change (assuming base hourly rate is static to booking data)
    const baseHourRate = editingBooking.totalPrice / editingBooking.duration;
    const newPrice = baseHourRate * editDuration;

    updateBooking(editingBooking.id, {
      date: editDate,
      time: editTime,
      duration: editDuration,
      totalPrice: newPrice,
    });
    setShowEditBookingModal(false);
    setEditingBooking(null);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(bookingId);
    }
  };

  // Filtered lists based on search
  const filterPitches = (list) => {
    return list.filter(item => {
      const matchArea = searchArea ? item.location.toLowerCase().includes(searchArea.toLowerCase()) : true;
      return matchArea;
    });
  };

  const filterMatches = (list) => {
    return list.filter(item => {
      const matchArea = searchArea ? (item.pitchName.toLowerCase().includes(searchArea.toLowerCase()) || item.name.toLowerCase().includes(searchArea.toLowerCase())) : true;
      const matchTime = searchTime ? item.time.includes(searchTime) : true;
      return matchArea && matchTime;
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F5F0', fontFamily: 'Inter, sans-serif', paddingBottom: 80 }}>
      {/* Top Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: 'rgba(13,27,42,0.9)', backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(82,183,136,0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #1B4332, #52B788)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 28 28" width="16" height="16" fill="none">
              <polygon points="14,5 20,11 17,20 11,20 8,11" fill="#F4A300" />
              <circle cx="14" cy="14" r="12" stroke="#52B788" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, color: '#F5F5F0', letterSpacing: 2 }}>BALL<span style={{ color: '#F4A300' }}>LINK</span></span>
        </div>

        {/* User Card badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F0' }}>{userProfile.name || 'Player'}</div>
            <div style={{ fontSize: 11, color: '#52B788', fontWeight: 500 }}>{userProfile.position || 'Forward'}</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', border: '1px solid rgba(82,183,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={16} style={{ color: '#F4A300' }} />
          </div>
        </div>
      </header>

      {/* Main Tab content */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
        
        {/* TABS CONTROLLERS */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            
            {/* Search and Filters Bar */}
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(82,183,136,0.12)',
              borderRadius: 20, padding: 18, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'
            }}>
              <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,245,240,0.4)' }} />
                <input
                  type="text"
                  placeholder="Search by neighborhood in Jos (e.g. Rayfield, Terminus)..."
                  value={searchArea}
                  onChange={e => setSearchArea(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 12px 12px 40px', background: '#080f18',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12,
                    color: '#F5F5F0', fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none'
                  }}
                />
              </div>
              <div style={{ minWidth: 120, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Time (e.g. 18:00)"
                  value={searchTime}
                  onChange={e => setSearchTime(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 12px 12px 14px', background: '#080f18',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12,
                    color: '#F5F5F0', fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none'
                  }}
                />
              </div>
              <button
                onClick={() => { setSearchArea(''); setSearchTime(''); }}
                style={{
                  padding: '12px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F0',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: 'pointer'
                }}
              >
                Clear
              </button>
            </div>

            {/* SECTION: NEARBY PITCHES */}
            <div>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, color: '#F5F5F0', marginBottom: 14 }}>
                Nearby Pitches
              </h2>
              <div className="horizontal-scroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 10 }}>
                {filterPitches(NEARBY_PITCHES).map(pitch => (
                  <Link key={pitch.id} to={`/pitch/${pitch.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', flexShrink: 0, width: 280 }}>
                    <div style={{ background: '#111c2a', borderRadius: 18, border: '1px solid rgba(82,183,136,0.1)', overflow: 'hidden' }}>
                      <div style={{ height: 120, background: '#1B4332', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(82,183,136,0.2)', border: '1px solid rgba(82,183,136,0.4)', borderRadius: 100, padding: '3px 8px', fontSize: 10, color: '#52B788', fontWeight: 600 }}>AVAILABLE</div>
                      </div>
                      <div style={{ padding: 14 }}>
                        <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 18, margin: '0 0 4px', letterSpacing: 0.5 }}>{pitch.name}</h4>
                        <p style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}><MapPin size={10} /> {pitch.location}</p>
                        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, color: '#F4A300', fontWeight: 600 }}>₦{pitch.pricePerHour}/hr</span>
                          <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.5)' }}>{pitch.surface}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION: AVAILABLE PITCHES TODAY */}
            <div>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, color: '#F5F5F0', marginBottom: 14 }}>
                Available Pitches Today
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {filterPitches(AVAILABLE_PITCHES_TODAY).map(pitch => (
                  <div key={pitch.id} style={{ background: '#111c2a', borderRadius: 18, border: '1px solid rgba(82,183,136,0.1)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 18, margin: 0, letterSpacing: 0.5 }}>{pitch.name}</h4>
                      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, color: '#F4A300', fontWeight: 600 }}>₦{pitch.pricePerHour}/hr</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {pitch.availableSlots.map(time => (
                        <Link key={time} to={`/pitch/${pitch.id}`} style={{
                          fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 600,
                          color: '#52B788', background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.2)',
                          padding: '5px 12px', borderRadius: 8, textDecoration: 'none'
                        }}>{time}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: MATCHES HAPPENING TODAY */}
            <div>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, color: '#F5F5F0', marginBottom: 14 }}>
                Matches Happening Today
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filterMatches(MATCHES_HAPPENING_TODAY).map(match => (
                  <Link key={match.id} to={`/match/${match.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 14, display: 'flex', justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          {match.isLive && <span style={{ padding: '2px 8px', borderRadius: 100, background: 'rgba(230,57,70,0.15)', color: '#E63946', fontSize: 10, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' }}>LIVE</span>}
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600 }}>{match.name}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <MapPin size={10} /> {match.pitchName} • {match.skillLevel}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, color: '#F4A300', fontWeight: 600 }}>{match.time}</div>
                        <div style={{ fontSize: 11, color: '#52B788' }}>{match.spotsLeft} spots remaining</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION: "NEED PLAYERS" GAMES */}
            <div>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, color: '#F5F5F0', marginBottom: 14 }}>
                "Need Players" Games
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {filterMatches(NEED_PLAYERS_GAMES).map(match => {
                  const pct = (match.spotsTaken / match.spotsTotal) * 100;
                  return (
                    <Link key={match.id} to={`/match/${match.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ background: '#111c2a', borderRadius: 18, border: '1px solid rgba(255,255,255,0.06)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div>
                          <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 2px' }}>{match.name}</h4>
                          <p style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>{match.pitchName}</p>
                        </div>
                        <div>
                          <div style={{ display: 'flex', justify: 'space-between', fontSize: 11, color: 'rgba(245,245,240,0.5)', marginBottom: 4 }}>
                            <span>Squad build</span>
                            <span style={{ fontFamily: '"JetBrains Mono", monospace', color: '#52B788' }}>{match.spotsTaken}/{match.spotsTotal} Joined</span>
                          </div>
                          <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: '#52B788' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', pt: 4, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>By {match.organiser}</span>
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#F4A300', fontWeight: 600 }}>₦{match.fee}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* SECTION: FEATURED PITCHES */}
            <div>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, color: '#F5F5F0', marginBottom: 14 }}>
                Featured Pitches
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {filterPitches(FEATURED_PITCHES).map(pitch => (
                  <Link key={pitch.id} to={`/pitch/${pitch.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: '#111c2a', borderRadius: 18, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div style={{ height: 100, background: '#1B4332', display: 'flex', alignItems: 'center', justify: 'center' }}>
                        <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, opacity: 0.15 }}>BALL_LINK</span>
                      </div>
                      <div style={{ padding: 14 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 2px' }}>{pitch.name}</h4>
                        <p style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', marginBottom: 8 }}>{pitch.location}</p>
                        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.5)' }}>{pitch.surface}</span>
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#F4A300', fontWeight: 600 }}>₦{pitch.pricePerHour}/hr</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION: UPCOMING TOURNAMENTS */}
            <div>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, color: '#F5F5F0', marginBottom: 14 }}>
                Upcoming Tournaments in Jos
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {UPCOMING_TOURNAMENTS.map(t => (
                  <Link key={t.id} to={`/tournament/${t.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(82,183,136,0.15)', borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', justify: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 18, letterSpacing: 0.5, margin: 0 }}>{t.name}</h4>
                        <span style={{ fontSize: 10, background: 'rgba(244,163,0,0.15)', color: '#F4A300', padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>{t.format}</span>
                      </div>
                      <div style={{ display: 'flex', justify: 'space-between', fontSize: 12 }}>
                        <span style={{ color: 'rgba(245,245,240,0.4)' }}>Date / Schedule</span>
                        <span style={{ fontWeight: 600 }}>{t.date}</span>
                      </div>
                      <div style={{ display: 'flex', justify: 'space-between', fontSize: 12 }}>
                        <span style={{ color: 'rgba(245,245,240,0.4)' }}>Grand Prize Pool</span>
                        <span style={{ color: '#52B788', fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' }}>{t.prizePool}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MATCHES VIEW */}
        {activeTab === 'matches' && (
          <div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, color: '#F5F5F0', marginBottom: 16 }}>
              All Open Matches in Jos
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filterMatches(LIVE_MATCHES).map(match => {
                const left = match.spotsTotal - match.spotsTaken;
                return (
                  <Link key={match.id} to={`/match/${match.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: '#111c2a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: 16, display: 'flex', justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                      <div>
                        <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, margin: '0 0 4px', letterSpacing: 0.5 }}>{match.name}</h4>
                        <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={10} /> {match.pitchName}</span>
                          <span>Skill: {match.skillLevel}</span>
                          <span>Fee: ₦{match.fee}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 16, color: '#F4A300', fontWeight: 600 }}>{match.time}</div>
                          <div style={{ fontSize: 11, color: '#52B788' }}>{left} spots left</div>
                        </div>
                        <button style={{ padding: '8px 16px', borderRadius: 8, background: '#F4A300', border: 'none', color: '#0D1B2A', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Join</button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* TEAM SIGNATURE VIEW */}
        {activeTab === 'team' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, color: '#F5F5F0', margin: '0 0 6px' }}>
                Squad Builder (Starting XI)
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', maxWidth: 440, margin: '0 auto' }}>
                Tap on any marker on the pitch below to assign your teammates or build your club roster.
              </p>
            </div>

            {/* Interactive Pitch */}
            <div style={{
              maxWidth: 420, margin: '0 auto', background: 'linear-gradient(to bottom, #1e5038, #143628)',
              border: '2px solid rgba(82,183,136,0.3)', borderRadius: 28, overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)', position: 'relative'
            }}>
              <div style={{ padding: '24px 16px' }}>
                <svg viewBox="0 0 400 400" width="100%" style={{ display: 'block', pointerEvents: 'auto' }}>
                  <rect x="10" y="10" width="380" height="380" fill="none" stroke="white" strokeWidth="2.5" opacity="0.4" />
                  <line x1="10" y1="200" x2="390" y2="200" stroke="white" strokeWidth="2" opacity="0.4" />
                  <circle cx="200" cy="200" r="50" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
                  <circle cx="200" cy="200" r="4" fill="white" opacity="0.6" />
                  <rect x="110" y="10" width="180" height="50" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
                  <rect x="110" y="340" width="180" height="50" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />

                  {FORMATION_POSITIONS.map(pos => {
                    const assignedName = squad[pos.id];
                    const isAssigned = assignedName !== 'Tap to assign';
                    return (
                      <g key={pos.id} onClick={() => assignPlayer(pos.id)} style={{ cursor: 'pointer' }}>
                        <circle cx={pos.cx} cy={pos.cy} r="18" fill={isAssigned ? 'rgba(244,163,0,0.15)' : 'rgba(255,255,255,0.05)'} />
                        <circle cx={pos.cx} cy={pos.cy} r="13" fill={isAssigned ? '#F4A300' : '#111c2a'} stroke={isAssigned ? '#FFD166' : 'rgba(82,183,136,0.5)'} strokeWidth="1.5" />
                        <text x={pos.cx} y={pos.cy + 4} textAnchor="middle" fill={isAssigned ? '#0D1B2A' : '#52B788'} fontSize="9" fontWeight="700" fontFamily="Inter">{pos.label}</text>
                        <rect x={pos.cx - 45} y={pos.cy + 18} width="90" height="15" rx="4" fill="rgba(13,27,42,0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                        <text x={pos.cx} y={pos.cy + 29} textAnchor="middle" fill="#F5F5F0" fontSize="8" fontWeight="500" fontFamily="Inter">
                          {assignedName.length > 15 ? assignedName.substring(0, 13) + '..' : assignedName}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* CHAT TAB VIEW */}
        {activeTab === 'chat' && (
          <div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, color: '#F5F5F0', marginBottom: 18 }}>
              Messages &amp; Groups
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Rayfield Friday Ballers Group', msg: 'Organiser: Kick-off is 20:00 sharp, don\'t be late!', time: '11:15 AM', unread: 2 },
                { name: 'Terminus Arena Booking Hub', msg: 'Your slot booking at Terminus Turf was confirmed', time: 'Yesterday', unread: 0 },
                { name: 'Chukwuemeka A. (Organiser)', msg: 'Are you available for the 5-a-side match tonight?', time: 'Yesterday', unread: 1 },
              ].map((c, i) => (
                <div key={i} style={{ background: '#111c2a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 16, display: 'flex', justify: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => alert("Chat logs and message delivery coming in Stage 5.")}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(82,183,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52B788', fontWeight: 600 }}>
                      {c.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0' }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', marginTop: 2 }}>{c.msg}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.3)' }}>{c.time}</div>
                    {c.unread > 0 && <span style={{ display: 'inline-block', marginTop: 4, background: '#E63946', color: '#FFF', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 100 }}>{c.unread}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB VIEW (INCORPORATES MY BOOKINGS LIST) */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: 24 }} className="profile-layout">
            
            {/* Left: Player Card */}
            <div>
              <div style={{
                background: 'linear-gradient(145deg, #1B4332 0%, #0f2a1f 100%)',
                border: '1px solid rgba(82,183,136,0.25)', borderRadius: 24, padding: 28,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)', textAlign: 'center'
              }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(244,163,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <User size={40} style={{ color: '#F4A300' }} />
                </div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, color: '#F5F5F0', margin: '0 0 6px' }}>
                  {userProfile.name || 'Anonymous Player'}
                </h3>
                <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', display: 'flex', justify: 'center', alignItems: 'center', gap: 4, marginBottom: 24 }}>
                  <MapPin size={12} style={{ color: '#52B788' }} /> {userProfile.location || 'Jos, Plateau State'}
                </div>

                {/* Profile Specs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
                  <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(245,245,240,0.4)' }}>POSITION</span>
                    <span style={{ fontWeight: 600, color: '#F4A300' }}>{userProfile.position || 'Forward'}</span>
                  </div>
                  <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(245,245,240,0.4)' }}>EXPERTISE</span>
                    <span style={{ fontWeight: 600, color: '#52B788' }}>{userProfile.skillLevel || 'Intermediate'}</span>
                  </div>
                  <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(245,245,240,0.4)' }}>SEX</span>
                    <span style={{ fontWeight: 600 }}>{userProfile.sex || 'Not Specified'}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 10, background: 'rgba(230,57,70,0.1)',
                    border: '1px solid rgba(230,57,70,0.25)', color: '#E63946',
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', marginTop: 24,
                  }}
                >
                  Log Out Profile
                </button>
              </div>
            </div>

            {/* Right: My Bookings Screen */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 24 }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, color: '#F5F5F0', marginBottom: 16 }}>
                  My Bookings
                </h3>

                {bookings.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(245,245,240,0.4)' }}>
                    <Calendar size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
                    <p style={{ fontSize: 14 }}>No bookings listed. Go to the Home tab to reserve a slot!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {bookings.map(b => (
                      <div key={b.id} style={{
                        padding: 16, background: '#111c2a', borderRadius: 16,
                        border: b.status === 'upcoming' ? '1px solid rgba(82,183,136,0.2)' : '1px solid rgba(255,255,255,0.04)',
                        display: 'flex', justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{
                              padding: '2px 8px', borderRadius: 6, fontSize: 9, fontWeight: 700,
                              background: b.status === 'upcoming' ? 'rgba(82,183,136,0.15)' : 'rgba(255,255,255,0.05)',
                              color: b.status === 'upcoming' ? '#52B788' : 'rgba(245,245,240,0.4)'
                            }}>
                              {b.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0' }}>{b.pitchName}</span>
                          </div>
                          <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span>Date: {b.date}</span>
                            <span>Time: {b.time} ({b.duration} hr)</span>
                            <span style={{ color: '#F4A300', fontFamily: '"JetBrains Mono", monospace' }}>₦{b.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Actions for upcoming bookings */}
                        {b.status === 'upcoming' && (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => handleStartEditBooking(b)}
                              style={{
                                width: 32, height: 32, borderRadius: 8, background: 'rgba(244,163,0,0.1)',
                                border: '1px solid rgba(244,163,0,0.2)', color: '#F4A300',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                              }}
                              title="Edit Booking"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              style={{
                                width: 32, height: 32, borderRadius: 8, background: 'rgba(230,57,70,0.1)',
                                border: '1px solid rgba(230,57,70,0.2)', color: '#E63946',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                              }}
                              title="Cancel Booking"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </main>

      {/* --- EDIT BOOKING MODAL --- */}
      {showEditBookingModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={() => { setShowEditBookingModal(false); setEditingBooking(null); }} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} />
          <div style={{
            position: 'relative', zIndex: 1, width: '100%', maxWidth: 400,
            background: '#111c2a', border: '1px solid rgba(82,183,136,0.3)',
            borderRadius: 24, padding: 28, boxShadow: '0 30px 70px rgba(0,0,0,0.6)'
          }}>
            <button onClick={() => { setShowEditBookingModal(false); setEditingBooking(null); }} style={{ position: 'absolute', right: 18, top: 18, background: 'none', border: 'none', color: 'rgba(245,245,240,0.4)', cursor: 'pointer' }}><X size={20} /></button>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, color: '#F5F5F0', margin: '0 0 6px', letterSpacing: 1 }}>RESCHEDULE BOOKING</h2>
            <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', marginBottom: 20 }}>Adjust slots for <strong>{editingBooking?.pitchName}</strong>.</p>

            <form onSubmit={handleSaveEditedBooking} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Select Date</label>
                <input
                  type="date"
                  value={editDate}
                  onChange={e => setEditDate(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Start Time</label>
                <select
                  value={editTime}
                  onChange={e => setEditTime(e.target.value)}
                  style={{ width: '100%', padding: 12, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, color: '#F5F5F0', outline: 'none' }}
                >
                  {['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>Duration (Hours)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0D1B2A', padding: '6px 12px', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10 }}>
                  <button
                    type="button"
                    onClick={() => setEditDuration(prev => Math.max(1, prev - 1))}
                    style={{ border: 'none', background: 'rgba(255,255,255,0.05)', width: 28, height: 28, borderRadius: 6, color: '#F5F5F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 14, fontWeight: 700 }}>{editDuration} hr</span>
                  <button
                    type="button"
                    onClick={() => setEditDuration(prev => Math.min(8, prev + 1))}
                    style={{ border: 'none', background: 'rgba(255,255,255,0.05)', width: 28, height: 28, borderRadius: 6, color: '#F5F5F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                  border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                  color: '#0D1B2A', cursor: 'pointer', marginTop: 6,
                }}
              >
                Confirm Reschedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Persistent Bottom Navigation Tab Bar */}
      <footer style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
        background: '#0D1B2A', borderTop: '1px solid rgba(82,183,136,0.15)',
        display: 'flex', alignItems: 'center', justify: 'space-around', zIndex: 100
      }}>
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'matches', label: 'Matches', icon: Search },
          { id: 'team', label: 'Team', icon: Users },
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                color: isActive ? '#F4A300' : 'rgba(245,245,240,0.4)',
                fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: isActive ? 600 : 500,
                padding: '8px 12px', transition: 'color 0.2s'
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#F4A300' : 'rgba(245,245,240,0.4)' }} />
              {tab.label}
            </button>
          );
        })}
      </footer>

      <style>{`
        .profile-layout { display: grid; grid-template-columns: 1.2fr 1.8fr; gap: 24px; }
        @media(max-width: 768px) {
          .profile-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
