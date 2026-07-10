import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import { LogOut, Building2, Phone, Calendar, Plus, MapPin, DollarSign, Settings, CheckCircle, X, Edit3, Trophy, ChevronRight } from 'lucide-react';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const {
    userProfile,
    resetProfile,
    pitches,
    bookings,
    currentOwnerId,
    createPitch,
    updatePitch,
    acceptBooking,
    rejectBooking,
  } = useOnboarding();

  const [activeTab, setActiveTab] = useState('overview');
  const [editingPitchId, setEditingPitchId] = useState(null);
  const [draft, setDraft] = useState({
    name: 'New 5-a-side Pitch',
    location: 'Jos, Plateau State',
    surface: '5-a-side • Artificial turf',
    pricePerHour: '16000',
    tags: ['Floodlit', '4G Turf'],
    availableSlots: ['17:00', '19:00', '21:00'],
    photos: ['Main pitch view'],
    contactNumber: userProfile.contactNumber || '',
  });
  const [editDraft, setEditDraft] = useState(null);

  const ownerPitches = useMemo(
    () => pitches.filter((pitch) => pitch.ownerId === currentOwnerId),
    [pitches, currentOwnerId]
  );

  const ownerBookings = useMemo(
    () => bookings.filter((booking) => booking.ownerId === currentOwnerId),
    [bookings, currentOwnerId]
  );

  const incomingBookings = ownerBookings.filter((booking) => booking.ownerStatus === 'pending');
  const bookingHistory = ownerBookings.filter((booking) => booking.ownerStatus !== 'pending');
  const revenue = ownerBookings
    .filter((booking) => booking.ownerStatus === 'accepted')
    .reduce((sum, booking) => sum + booking.totalPrice, 0);

  const slotOptions = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

  const handleLogout = () => {
    resetProfile();
    navigate('/');
  };

  const handleDraftChange = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditDraftChange = (key, value) => {
    setEditDraft((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSlot = (slot, selected, setter) => {
    setter(selected.includes(slot)
      ? selected.filter((item) => item !== slot)
      : [...selected, slot]);
  };

  const addPhotoPlaceholder = (setter, currentPhotos) => {
    setter([...currentPhotos, `Featured photo ${currentPhotos.length + 1}`]);
  };

  const handleCreatePitch = (event) => {
    event.preventDefault();
    createPitch(draft);
    setDraft({
      name: 'New 5-a-side Pitch',
      location: 'Jos, Plateau State',
      surface: '5-a-side • Artificial turf',
      pricePerHour: '16000',
      tags: ['Floodlit', '4G Turf'],
      availableSlots: ['17:00', '19:00', '21:00'],
      photos: ['Main pitch view'],
      contactNumber: userProfile.contactNumber || '',
    });
    setActiveTab('overview');
  };

  const handleStartEdit = (pitch) => {
    setEditingPitchId(pitch.id);
    setEditDraft({
      ...pitch,
      pricePerHour: String(pitch.pricePerHour),
    });
    setActiveTab('overview');
  };

  const handleUpdatePitch = (event) => {
    event.preventDefault();
    if (!editingPitchId || !editDraft) return;
    updatePitch(editingPitchId, {
      ...editDraft,
      pricePerHour: Number(editDraft.pricePerHour),
    });
    setEditingPitchId(null);
    setEditDraft(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#09131f', color: '#F5F5F0', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#07101c', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #183d28, #4ea87e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={22} style={{ color: '#F4A300' }} />
          </div>
          <div>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 22, letterSpacing: 2 }}>Owner Dashboard</div>
            <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.45)' }}>Manage your pitch listings, bookings, and revenue.</div>
          </div>
        </div>

        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(245,245,240,0.12)', background: 'rgba(245,245,240,0.04)', color: '#F5F5F0', padding: '10px 16px', borderRadius: 14, cursor: 'pointer' }}>
          <LogOut size={14} /> Log Out
        </button>
      </header>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '30px 24px' }}>
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {['overview', 'register', 'bookings', 'revenue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                borderRadius: 999,
                border: activeTab === tab ? '1px solid #52B788' : '1px solid rgba(255,255,255,0.12)',
                background: activeTab === tab ? 'rgba(82,183,136,0.12)' : 'rgba(255,255,255,0.04)',
                color: '#F5F5F0',
                padding: '12px 18px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {tab === 'overview' ? 'Overview' : tab === 'register' ? 'Register Pitch' : tab === 'bookings' ? 'Bookings' : 'Revenue'}
            </button>
          ))}
        </section>

        <div className="owner-dashboard-grid">
          <div>
            {activeTab === 'overview' && (
              <>
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginBottom: 28 }}>
                  <div style={{ background: '#11212f', border: '1px solid rgba(82,183,136,0.18)', borderRadius: 22, padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <Trophy size={18} style={{ color: '#F4A300' }} />
                      <span style={{ fontSize: 12, color: 'rgba(245,245,240,0.7)', fontWeight: 600 }}>Total pitches</span>
                    </div>
                    <div style={{ fontSize: 34, fontWeight: 700, color: '#F5F5F0' }}>{ownerPitches.length}</div>
                  </div>
                  <div style={{ background: '#11212f', border: '1px solid rgba(82,183,136,0.18)', borderRadius: 22, padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <Calendar size={18} style={{ color: '#52B788' }} />
                      <span style={{ fontSize: 12, color: 'rgba(245,245,240,0.7)', fontWeight: 600 }}>Incoming requests</span>
                    </div>
                    <div style={{ fontSize: 34, fontWeight: 700, color: '#F5F5F0' }}>{incomingBookings.length}</div>
                  </div>
                  <div style={{ background: '#11212f', border: '1px solid rgba(82,183,136,0.18)', borderRadius: 22, padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <DollarSign size={18} style={{ color: '#52B788' }} />
                      <span style={{ fontSize: 12, color: 'rgba(245,245,240,0.7)', fontWeight: 600 }}>Accepted revenue</span>
                    </div>
                    <div style={{ fontSize: 34, fontWeight: 700, color: '#F5F5F0', fontFamily: '"JetBrains Mono", monospace' }}>₦{revenue.toLocaleString()}</div>
                  </div>
                </section>

                <section style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div>
                      <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, margin: 0 }}>Your Listings</h2>
                      <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(245,245,240,0.55)' }}>Manage the live pitches on Ballink and keep pricing, availability, and images fresh.</p>
                    </div>
                    <button onClick={() => setActiveTab('register')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 14, border: '1px solid rgba(82,183,136,0.18)', background: 'rgba(82,183,136,0.08)', color: '#F5F5F0', cursor: 'pointer' }}>
                      <Plus size={14} /> Add pitch
                    </button>
                  </div>

                  {ownerPitches.length === 0 ? (
                    <div style={{ background: '#0f1d29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 24, textAlign: 'center' }}>
                      <p style={{ margin: 0, color: 'rgba(245,245,240,0.6)' }}>You do not have any published pitches yet. Create one using the Register Pitch tab.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: 18 }}>
                      {ownerPitches.map((pitch) => (
                        <div key={pitch.id} style={{ background: '#0f1d29', border: '1px solid rgba(82,183,136,0.12)', borderRadius: 24, padding: 22 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F0' }}>{pitch.name}</div>
                              <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.55)', marginTop: 4 }}>{pitch.location}</div>
                            </div>
                            <button onClick={() => handleStartEdit(pitch)} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', color: '#F5F5F0', cursor: 'pointer' }}>
                              <Edit3 size={14} /> Edit
                            </button>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16, fontSize: 13, color: 'rgba(245,245,240,0.65)' }}>
                            <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 999, padding: '6px 12px' }}>{pitch.surface}</span>
                            <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 999, padding: '6px 12px' }}>₦{pitch.pricePerHour.toLocaleString()} / hr</span>
                            <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 999, padding: '6px 12px' }}>{pitch.availableSlots?.length || 0} slot times</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {editingPitchId && editDraft && (
                  <section style={{ background: '#0f1d29', border: '1px solid rgba(82,183,136,0.12)', borderRadius: 24, padding: 24, marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>Edit listing</div>
                        <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.55)' }}>Update the pitch details and availability.</div>
                      </div>
                      <button onClick={() => { setEditingPitchId(null); setEditDraft(null); }} style={{ border: 'none', background: 'transparent', color: 'rgba(245,245,240,0.6)', cursor: 'pointer' }}>
                        <X size={18} />
                      </button>
                    </div>
                    <form onSubmit={handleUpdatePitch} style={{ display: 'grid', gap: 16 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <label style={{ display: 'grid', gap: 8, fontSize: 12, color: '#F5F5F0' }}>
                          Pitch name
                          <input value={editDraft.name} onChange={(e) => handleEditDraftChange('name', e.target.value)} style={inputStyle} />
                        </label>
                        <label style={{ display: 'grid', gap: 8, fontSize: 12, color: '#F5F5F0' }}>
                          Location
                          <input value={editDraft.location} onChange={(e) => handleEditDraftChange('location', e.target.value)} style={inputStyle} />
                        </label>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <label style={{ display: 'grid', gap: 8, fontSize: 12, color: '#F5F5F0' }}>
                          Surface
                          <input value={editDraft.surface} onChange={(e) => handleEditDraftChange('surface', e.target.value)} style={inputStyle} />
                        </label>
                        <label style={{ display: 'grid', gap: 8, fontSize: 12, color: '#F5F5F0' }}>
                          Price per hour
                          <input value={editDraft.pricePerHour} onChange={(e) => handleEditDraftChange('pricePerHour', e.target.value)} style={inputStyle} />
                        </label>
                      </div>
                      <div>
                        <div style={{ marginBottom: 10, fontSize: 12, color: 'rgba(245,245,240,0.7)' }}>Available slots</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                          {slotOptions.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => toggleSlot(slot, editDraft.availableSlots || [], (updated) => handleEditDraftChange('availableSlots', updated))}
                              style={{
                                borderRadius: 999,
                                border: editDraft.availableSlots?.includes(slot) ? '1px solid #52B788' : '1px solid rgba(255,255,255,0.12)',
                                background: editDraft.availableSlots?.includes(slot) ? 'rgba(82,183,136,0.14)' : 'rgba(255,255,255,0.04)',
                                color: '#F5F5F0',
                                padding: '8px 14px',
                                cursor: 'pointer',
                              }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ marginBottom: 10, fontSize: 12, color: 'rgba(245,245,240,0.7)' }}>Photos</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                          {(editDraft.photos || []).map((photo, index) => (
                            <div key={`${photo}-${index}`} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, fontSize: 12 }}>{photo}</div>
                          ))}
                        </div>
                        <button type="button" onClick={() => addPhotoPlaceholder((updated) => handleEditDraftChange('photos', updated), editDraft.photos || [])} style={{ border: '1px dashed rgba(255,255,255,0.25)', background: 'transparent', color: '#F5F5F0', borderRadius: 16, padding: '10px 14px', cursor: 'pointer' }}>
                          Add photo placeholder
                        </button>
                      </div>
                      <button type="submit" style={primaryButtonStyle}>Save changes</button>
                    </form>
                  </section>
                )}
              </>
            )}

            {activeTab === 'register' && (
              <section style={{ background: '#0f1d29', border: '1px solid rgba(82,183,136,0.12)', borderRadius: 24, padding: 28 }}>
                <div style={{ marginBottom: 20 }}>
                  <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, margin: '0 0 8px' }}>Register a new pitch</h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(245,245,240,0.6)' }}>List your pitch and update visibility for players in seconds.</p>
                </div>
                <form onSubmit={handleCreatePitch} style={{ display: 'grid', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <label style={{ display: 'grid', gap: 8, color: '#F5F5F0', fontSize: 13 }}>
                      Pitch name
                      <input value={draft.name} onChange={(e) => handleDraftChange('name', e.target.value)} style={inputStyle} />
                    </label>
                    <label style={{ display: 'grid', gap: 8, color: '#F5F5F0', fontSize: 13 }}>
                      Location
                      <input value={draft.location} onChange={(e) => handleDraftChange('location', e.target.value)} style={inputStyle} />
                    </label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <label style={{ display: 'grid', gap: 8, color: '#F5F5F0', fontSize: 13 }}>
                      Surface
                      <input value={draft.surface} onChange={(e) => handleDraftChange('surface', e.target.value)} style={inputStyle} />
                    </label>
                    <label style={{ display: 'grid', gap: 8, color: '#F5F5F0', fontSize: 13 }}>
                      Price per hour
                      <input value={draft.pricePerHour} onChange={(e) => handleDraftChange('pricePerHour', e.target.value)} style={inputStyle} />
                    </label>
                  </div>
                  <div>
                    <div style={{ marginBottom: 10, fontSize: 12, color: 'rgba(245,245,240,0.7)' }}>Available time slots</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {slotOptions.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleSlot(slot, draft.availableSlots, (updated) => handleDraftChange('availableSlots', updated))}
                          style={{
                            borderRadius: 999,
                            border: draft.availableSlots.includes(slot) ? '1px solid #52B788' : '1px solid rgba(255,255,255,0.12)',
                            background: draft.availableSlots.includes(slot) ? 'rgba(82,183,136,0.14)' : 'rgba(255,255,255,0.04)',
                            color: '#F5F5F0',
                            padding: '8px 14px',
                            cursor: 'pointer',
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ marginBottom: 10, fontSize: 12, color: 'rgba(245,245,240,0.7)' }}>Photos</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                      {draft.photos.map((photo, index) => (
                        <div key={`${photo}-${index}`} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, fontSize: 12 }}>{photo}</div>
                      ))}
                    </div>
                    <button type="button" onClick={() => addPhotoPlaceholder((updated) => handleDraftChange('photos', updated), draft.photos)} style={{ border: '1px dashed rgba(255,255,255,0.25)', background: 'transparent', color: '#F5F5F0', borderRadius: 16, padding: '10px 14px', cursor: 'pointer' }}>
                      Upload photo placeholder
                    </button>
                  </div>
                  <button type="submit" style={primaryButtonStyle}>Publish pitch</button>
                </form>
              </section>
            )}

            {activeTab === 'bookings' && (
              <section style={{ display: 'grid', gap: 20 }}>
                <div style={{ background: '#0f1d29', border: '1px solid rgba(82,183,136,0.12)', borderRadius: 24, padding: 24 }}>
                  <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 26, margin: '0 0 10px' }}>Booking requests</h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(245,245,240,0.6)' }}>Approve or decline slot requests from players.</p>
                </div>

                <div style={{ display: 'grid', gap: 16 }}>
                  {incomingBookings.length === 0 ? (
                    <div style={{ background: '#0f1d29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24, color: 'rgba(245,245,240,0.7)' }}>
                      No new booking requests yet.
                    </div>
                  ) : incomingBookings.map((booking) => (
                    <div key={booking.id} style={{ background: '#0f1d29', border: '1px solid rgba(82,183,136,0.14)', borderRadius: 24, padding: 22, display: 'grid', gap: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F0' }}>{booking.pitchName}</div>
                          <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.6)' }}>{booking.date} • {booking.time} • {booking.duration} hr</div>
                        </div>
                        <span style={{ color: '#F4A300', fontSize: 13, fontWeight: 700 }}>Pending</span>
                      </div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <button type="button" onClick={() => acceptBooking(booking.id)} style={actionButtonPrimary}>Accept</button>
                        <button type="button" onClick={() => rejectBooking(booking.id)} style={actionButtonSecondary}>Reject</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#0f1d29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24 }}>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20, margin: '0 0 12px' }}>Booking history</h3>
                  {bookingHistory.length === 0 ? (
                    <p style={{ margin: 0, fontSize: 13, color: 'rgba(245,245,240,0.6)' }}>You haven’t processed any bookings yet.</p>
                  ) : (
                    <div style={{ display: 'grid', gap: 14 }}>
                      {bookingHistory.map((booking) => (
                        <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: 16, borderRadius: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0' }}>{booking.pitchName}</div>
                            <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.55)' }}>{booking.date} • {booking.time}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F0', fontFamily: '"JetBrains Mono", monospace' }}>₦{booking.totalPrice.toLocaleString()}</div>
                            <div style={{ fontSize: 12, color: booking.ownerStatus === 'accepted' ? '#52B788' : '#E63946' }}>{booking.ownerStatus}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeTab === 'revenue' && (
              <section style={{ display: 'grid', gap: 20 }}>
                <div style={{ background: '#0f1d29', border: '1px solid rgba(82,183,136,0.12)', borderRadius: 24, padding: 28 }}>
                  <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, margin: '0 0 8px' }}>Revenue snapshot</h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(245,245,240,0.6)' }}>Track confirmed revenue from bookings you've approved.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ background: '#11212f', border: '1px solid rgba(82,183,136,0.18)', borderRadius: 22, padding: 24 }}>
                    <span style={{ display: 'block', fontSize: 12, color: 'rgba(245,245,240,0.7)', marginBottom: 10 }}>Confirmed earnings</span>
                    <div style={{ fontSize: 36, fontWeight: 700, color: '#F5F5F0', fontFamily: '"JetBrains Mono", monospace' }}>₦{revenue.toLocaleString()}</div>
                  </div>
                  <div style={{ background: '#11212f', border: '1px solid rgba(82,183,136,0.18)', borderRadius: 22, padding: 24 }}>
                    <span style={{ display: 'block', fontSize: 12, color: 'rgba(245,245,240,0.7)', marginBottom: 10 }}>Open requests</span>
                    <div style={{ fontSize: 36, fontWeight: 700, color: '#F5F5F0' }}>{incomingBookings.length}</div>
                  </div>
                </div>
                <div style={{ background: '#0f1d29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F0' }}>Confirmed bookings</div>
                      <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.6)' }}>List of accepted reservations</div>
                    </div>
                    <ChevronRight size={18} style={{ color: 'rgba(245,245,240,0.45)' }} />
                  </div>
                  {ownerBookings.filter((booking) => booking.ownerStatus === 'accepted').length === 0 ? (
                    <p style={{ margin: 0, fontSize: 13, color: 'rgba(245,245,240,0.6)' }}>No confirmed bookings yet.</p>
                  ) : (
                    <div style={{ display: 'grid', gap: 14 }}>
                      {ownerBookings.filter((booking) => booking.ownerStatus === 'accepted').map((booking) => (
                        <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: 16, borderRadius: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0' }}>{booking.pitchName}</div>
                            <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.55)' }}>{booking.date} • {booking.time}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F0', fontFamily: '"JetBrains Mono", monospace' }}>₦{booking.totalPrice.toLocaleString()}</div>
                            <div style={{ fontSize: 12, color: '#52B788' }}>accepted</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: '#0f1d29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.6)', marginBottom: 6 }}>Business</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F0' }}>{userProfile.businessName}</div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(82,183,136,0.14)', display: 'grid', placeItems: 'center' }}>
                  <Phone size={18} style={{ color: '#52B788' }} />
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.7)' }}>{userProfile.contactNumber}</div>
            </div>

            <div style={{ background: '#0f1d29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 22, display: 'grid', gap: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F0' }}>Listing status</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(82,183,136,0.12)', borderRadius: 999, padding: '8px 12px', color: '#52B788', fontSize: 12 }}>Live</span>
                <span style={{ background: 'rgba(244,163,0,0.12)', borderRadius: 999, padding: '8px 12px', color: '#F4A300', fontSize: 12 }}>Editable</span>
                <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 999, padding: '8px 12px', color: 'rgba(245,245,240,0.75)', fontSize: 12 }}>{ownerPitches.length} pitches</span>
              </div>
            </div>

            <div style={{ background: '#0f1d29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Settings size={18} style={{ color: '#52B788' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F0' }}>Owner tools</div>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(245,245,240,0.6)' }}>Use the tabs to update pitches, manage bookings, and keep your listing revenue in view.</p>
            </div>
          </aside>
        </div>
        <style>{`
          .owner-dashboard-grid {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 24px;
            align-items: flex-start;
          }
          @media (max-width: 900px) {
            .owner-dashboard-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.03)',
  color: '#F5F5F0',
  padding: '14px 16px',
  fontSize: 13,
};

const primaryButtonStyle = {
  borderRadius: 16,
  border: 'none',
  background: 'linear-gradient(135deg, #52B788, #1B4332)',
  color: '#F5F5F0',
  padding: '14px 16px',
  cursor: 'pointer',
  fontWeight: 700,
};

const actionButtonPrimary = {
  borderRadius: 16,
  border: 'none',
  background: '#52B788',
  color: '#0f1d29',
  padding: '12px 18px',
  cursor: 'pointer',
  fontWeight: 700,
};

const actionButtonSecondary = {
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: '#F5F5F0',
  padding: '12px 18px',
  cursor: 'pointer',
  fontWeight: 700,
};
