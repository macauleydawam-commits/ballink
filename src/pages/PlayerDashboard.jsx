import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import {
  Home, Users, MessageSquare, User, Search, MapPin, Star,
  Clock, LogOut, ChevronRight, Filter, AlertCircle, Plus, Send,
  Calendar, Trash2, Edit3, X, CheckCircle, Trophy, Minus, Camera
} from 'lucide-react';
import StarRating from '../components/ui/StarRating';
import TeamBuilderPanel from '../components/TeamBuilderPanel';
import {
  NEARBY_PITCHES,
  AVAILABLE_PITCHES_TODAY,
  MATCHES_HAPPENING_TODAY,
  NEED_PLAYERS_GAMES,
  UPCOMING_TOURNAMENTS,
  LIVE_MATCHES
} from '../data/mockData';

const FORMATIONS = {
  '4-3-3': [
    { id: 'gk', label: 'GK', cx: 200, cy: 340 },
    { id: 'ldf', label: 'LDF', cx: 80, cy: 270 },
    { id: 'cdf', label: 'CDF', cx: 200, cy: 270 },
    { id: 'rdf', label: 'RDF', cx: 320, cy: 270 },
    { id: 'lmf', label: 'LMF', cx: 80, cy: 180 },
    { id: 'cmf', label: 'CMF', cx: 200, cy: 180 },
    { id: 'rmf', label: 'RMF', cx: 320, cy: 180 },
    { id: 'lfw', label: 'LFW', cx: 100, cy: 90 },
    { id: 'cfw', label: 'CFW', cx: 200, cy: 90 },
    { id: 'rfw', label: 'RFW', cx: 300, cy: 90 },
  ],
  '4-4-2': [
    { id: 'gk', label: 'GK', cx: 200, cy: 340 },
    { id: 'ldf', label: 'LDF', cx: 80, cy: 270 },
    { id: 'cdf', label: 'CDF', cx: 200, cy: 270 },
    { id: 'rdf', label: 'RDF', cx: 320, cy: 270 },
    { id: 'lmf', label: 'LMF', cx: 80, cy: 190 },
    { id: 'rmf', label: 'RMF', cx: 320, cy: 190 },
    { id: 'lwf', label: 'LWF', cx: 90, cy: 110 },
    { id: 'rwf', label: 'RWF', cx: 310, cy: 110 },
    { id: 'cf1', label: 'CF', cx: 150, cy: 70 },
    { id: 'cf2', label: 'CF', cx: 250, cy: 70 },
    { id: 'cmf', label: 'CMF', cx: 200, cy: 140 },
  ],
};

export default function PlayerDashboard() {
  const navigate = useNavigate();
  const {
    userProfile,
    resetProfile,
    teamBuilder,
    updateTeamBuilder,
    assignTeamPlayer,
    clearTeamPosition,
    addBenchPlayer,
    removeBenchPlayer,
    setTeamManager,
    bookings,
    updateBooking,
    cancelBooking,
    chats,
    markChatRead,
    pitches,
    updateProfile,
  } = useOnboarding();

  const [activeTab, setActiveTab] = useState('home'); // 'home', 'matches', 'team', 'chat', 'profile'
  const [activeSlot, setActiveSlot] = useState(null);

  // Search & Filter state
  const [searchArea, setSearchArea] = useState('');
  const [searchTime, setSearchTime] = useState('');

  // Edit booking modal state
  const [showEditBookingModal, setShowEditBookingModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDuration, setEditDuration] = useState(1);

  const currentFormation = FORMATIONS[teamBuilder.formation] || FORMATIONS['4-3-3'];
  const benchPlayers = teamBuilder.bench;
  const availableRoster = teamBuilder.availablePlayers.filter((player) => {
    const alreadyAssigned = Object.values(teamBuilder.squad).includes(player.name);
    const alreadyBenched = teamBuilder.bench.includes(player.name);
    return !alreadyAssigned && !alreadyBenched;
  });

  const activeSlotLabel = activeSlot
    ? (currentFormation.find((pos) => pos.id === activeSlot)?.label || activeSlot)
    : null;

  const assignPlayerToSlot = (playerName, fromBench = false) => {
    if (!activeSlot) return;
    assignTeamPlayer(activeSlot, playerName, fromBench);
    setActiveSlot(null);
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

  // Avatar upload
  const avatarInputRef = useRef(null);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      updateProfile({ avatar: evt.target.result });
    };
    reader.readAsDataURL(file);
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
                {filterPitches(pitches).map(pitch => (
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
                {filterPitches(pitches.filter(p => p.availableSlots && p.availableSlots.length > 0)).map(pitch => (
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
                {filterPitches(pitches).map(pitch => (
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
          <div style={{ display: 'grid', gap: 24 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, color: '#F5F5F0', margin: '0 0 6px' }}>
                  Team Builder
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', maxWidth: 520, margin: 0 }}>
                  Create your squad, assign players to the formation, and manage your bench and manager selection.
                </p>
              </div>
              <Link
                to="/team-builder"
                style={{
                  alignSelf: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '10px 18px', borderRadius: 14, background: 'rgba(244,163,0,0.16)',
                  color: '#F4A300', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                }}
              >
                Open Full Page Builder
              </Link>
            </div>
            <TeamBuilderPanel />
          </div>
        )}

        {/* CHAT TAB VIEW */}
        {activeTab === 'chat' && (
          <div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, color: '#F5F5F0', marginBottom: 18 }}>
              Messages &amp; Groups
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
              <div style={{ minWidth: 200 }}>
                <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', margin: 0 }}>Open a conversation to view full chat history and reply instantly.</p>
              </div>
              <Link
                to="/chat"
                style={{ padding: '10px 18px', borderRadius: 14, background: 'rgba(244,163,0,0.16)', color: '#F4A300', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700 }}
              >
                Open Full Chat Inbox
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {chats.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', background: '#111c2a', borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(82,183,136,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'rgba(245,245,240,0.4)' }}>
                    <MessageSquare size={24} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#F5F5F0', marginBottom: 6 }}>Start a conversation</div>
                  <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.55)', marginBottom: 18, maxWidth: 280, margin: '0 auto 18px' }}>Invite teammates from your builder or reach out to pitch organizers directly.</div>
                  <Link to="/player-dashboard" style={{ padding: '10px 16px', borderRadius: 12, background: 'rgba(82,183,136,0.12)', color: '#52B788', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, display: 'inline-block' }}>
                    Go to Team Builder
                  </Link>
                </div>
              ) : chats.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: '#111c2a',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 16,
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    markChatRead(c.id);
                    navigate(`/chat/${c.id}`);
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(82,183,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52B788', fontWeight: 600 }}>
                      {c.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0' }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', marginTop: 2 }}>{c.preview}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.3)' }}>{c.lastMessageTime}</div>
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
                {/* Tappable avatar with camera badge */}
                <div
                  style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 16px', cursor: 'pointer' }}
                  title="Change profile photo"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    border: '2px solid rgba(244,163,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    {userProfile.avatar
                      ? <img src={userProfile.avatar} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <User size={40} style={{ color: '#F4A300' }} />
                    }
                  </div>
                  {/* Camera badge */}
                  <div style={{
                    position: 'absolute', bottom: 2, right: 2,
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#F4A300',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #0D1B2A',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  }}>
                    <Camera size={12} style={{ color: '#0D1B2A' }} />
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
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
                    <span style={{ color: 'rgba(245,245,240,0.4)' }}>AGE</span>
                    <span style={{ fontWeight: 600 }}>{userProfile.age || '24'}</span>
                  </div>
                  <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(245,245,240,0.4)' }}>PREFERRED FOOT</span>
                    <span style={{ fontWeight: 600 }}>{userProfile.preferredFoot || 'Right'}</span>
                  </div>
                  <div style={{ display: 'flex', justify: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(245,245,240,0.4)' }}>SEX</span>
                    <span style={{ fontWeight: 600 }}>{userProfile.sex || 'Not Specified'}</span>
                  </div>
                </div>

                <div style={{ marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 18, display: 'grid', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.5)' }}>Player Score</div>
                      <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)' }}>Community trust and performance</div>
                    </div>
                    <StarRating rating={userProfile.rating || 0} max={5} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                    {[
                      { label: 'Matches', value: userProfile.stats?.matchesPlayed || 0 },
                      { label: 'Goals', value: userProfile.stats?.goals || 0 },
                      { label: 'Assists', value: userProfile.stats?.assists || 0 },
                      { label: 'MVPs', value: userProfile.stats?.mvpAwards || 0 },
                    ].map((item) => (
                      <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.45)', marginBottom: 8 }}>{item.label}</div>
                        <div style={{ fontWeight: 700, color: '#F5F5F0' }}>{item.value}</div>
                      </div>
                    ))}
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
                  <div style={{ textAlign: 'center', padding: '48px 24px', background: '#111c2a', borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(82,183,136,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'rgba(245,245,240,0.4)' }}>
                      <Calendar size={28} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F0', marginBottom: 8 }}>No bookings yet</div>
                    <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.6)', marginBottom: 20, maxWidth: 300, margin: '0 auto 20px' }}>Browse available pitches in the Home tab and reserve a slot that works for your team.</div>
                    <button onClick={() => setActiveTab('home')} style={{ padding: '11px 18px', borderRadius: 12, background: 'linear-gradient(135deg, #52B788, #1B4332)', color: '#F5F5F0', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700 }}>Find pitches</button>
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
                          <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <span>Date: {b.date}</span>
                            <span>Time: {b.time} ({b.duration} hr)</span>
                            <span style={{ color: '#F4A300', fontFamily: '"JetBrains Mono", monospace' }}>₦{b.totalPrice.toLocaleString()}</span>
                            {b.ownerStatus && (
                              <span style={{ color: b.ownerStatus === 'accepted' ? '#52B788' : b.ownerStatus === 'rejected' ? '#E63946' : '#F4A300', fontWeight: 700 }}>{b.ownerStatus.toUpperCase()}</span>
                            )}
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
          { id: 'matches', label: 'Matches', icon: Trophy },
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
