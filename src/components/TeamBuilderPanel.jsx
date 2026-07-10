import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';

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

export default function TeamBuilderPanel() {
  const navigate = useNavigate();
  const {
    teamBuilder,
    updateTeamBuilder,
    assignTeamPlayer,
    clearTeamPosition,
    addBenchPlayer,
    removeBenchPlayer,
    setTeamManager,
    createNewTeam,
    createChatWithPlayer,
  } = useOnboarding();

  const [activeSlot, setActiveSlot] = useState(null);
  const [showNewTeam, setShowNewTeam] = useState(false);
  const [newTeamDraft, setNewTeamDraft] = useState('');

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

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, color: '#F5F5F0', margin: '0 0 6px' }}>
            Team Builder
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', maxWidth: 520, margin: 0 }}>
            Create your squad, assign players to the formation, and manage your bench and manager selection.
          </p>
        </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {Object.keys(FORMATIONS).map((formation) => (
            <button
              key={formation}
              type="button"
              onClick={() => updateTeamBuilder({ formation })}
              style={{
                padding: '10px 18px', borderRadius: 14,
                background: teamBuilder.formation === formation ? '#F4A300' : 'rgba(255,255,255,0.05)',
                color: teamBuilder.formation === formation ? '#0D1B2A' : '#F5F5F0',
                border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
              }}
            >
              {formation}
            </button>
          ))}
          {/* New Team button */}
          <button
            type="button"
            onClick={() => { setNewTeamDraft(''); setShowNewTeam(true); }}
            style={{
              padding: '10px 18px', borderRadius: 14,
              background: 'rgba(82,183,136,0.1)',
              color: '#52B788',
              border: '1px solid rgba(82,183,136,0.25)',
              cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
            }}
          >
            + New Team
          </button>
        </div>
      </div>

      <div className="team-builder-grid">
        <div style={{ background: 'linear-gradient(to bottom, #1e5038, #143628)', padding: 20, borderRadius: 28, border: '2px solid rgba(82,183,136,0.25)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
          <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ minWidth: 220 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.6)', letterSpacing: 0.6 }}>TEAM NAME</label>
              <input
                value={teamBuilder.teamName}
                onChange={(e) => updateTeamBuilder({ teamName: e.target.value })}
                style={{
                  width: '100%', marginTop: 8, padding: '12px 14px', borderRadius: 14,
                  background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', color: '#F5F5F0', fontFamily: 'Inter, sans-serif', fontSize: 14,
                }}
              />
            </div>
            <div style={{ minWidth: 160 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.6)', letterSpacing: 0.6 }}>MANAGER</label>
              <select
                value={teamBuilder.manager}
                onChange={(e) => setTeamManager(e.target.value)}
                style={{ width: '100%', marginTop: 8, padding: '12px 14px', borderRadius: 14, background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.2)', color: '#F5F5F0', fontFamily: 'Inter, sans-serif', fontSize: 14 }}
              >
                <option value="You">You</option>
                {benchPlayers.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ padding: '18px 14px 12px', textAlign: 'center' }}>
              <div style={{ height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 999, margin: '0 auto 14px', width: '40%' }} />
              <svg viewBox="0 0 400 400" width="100%" style={{ display: 'block' }}>
                <rect x="10" y="10" width="380" height="380" fill="none" stroke="white" strokeWidth="2.5" opacity="0.4" />
                <line x1="10" y1="200" x2="390" y2="200" stroke="white" strokeWidth="2" opacity="0.4" />
                <circle cx="200" cy="200" r="50" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
                <circle cx="200" cy="200" r="4" fill="white" opacity="0.6" />

                {currentFormation.map((pos) => {
                  const assignedName = teamBuilder.squad[pos.id] || 'Tap to assign';
                  const isAssigned = assignedName !== 'Tap to assign';
                  return (
                    <g key={pos.id} style={{ cursor: 'pointer' }} onClick={() => setActiveSlot(pos.id)}>
                      <circle cx={pos.cx} cy={pos.cy} r="20" fill={isAssigned ? 'rgba(244,163,0,0.15)' : 'rgba(255,255,255,0.05)'} />
                      <circle cx={pos.cx} cy={pos.cy} r="14" fill={isAssigned ? '#F4A300' : '#111c2a'} stroke={isAssigned ? '#FFD166' : 'rgba(82,183,136,0.5)'} strokeWidth="1.5" />
                      <text x={pos.cx} y={pos.cy + 4} textAnchor="middle" fill={isAssigned ? '#0D1B2A' : '#52B788'} fontSize="9" fontWeight="700" fontFamily="Inter">{pos.label}</text>
                      <rect x={pos.cx - 45} y={pos.cy + 24} width="90" height="16" rx="4" fill="rgba(13,27,42,0.9)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                      <text x={pos.cx} y={pos.cy + 35} textAnchor="middle" fill="#F5F5F0" fontSize="8" fontWeight="500" fontFamily="Inter">
                        {assignedName.length > 15 ? `${assignedName.slice(0, 13)}..` : assignedName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {activeSlot && (
            <div style={{ marginTop: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(82,183,136,0.15)', padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>Assign to {activeSlotLabel}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F0' }}>{teamBuilder.squad[activeSlot] || 'Tap to assign'}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setActiveSlot(null)}
                    style={{ border: 'none', background: 'rgba(255,255,255,0.06)', color: '#F5F5F0', padding: '10px 14px', borderRadius: 12, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  {teamBuilder.squad[activeSlot] && teamBuilder.squad[activeSlot] !== 'Tap to assign' && (
                    <button
                      type="button"
                      onClick={() => {
                        clearTeamPosition(activeSlot);
                        setActiveSlot(null);
                      }}
                      style={{ border: 'none', background: 'rgba(230,57,70,0.12)', color: '#E63946', padding: '10px 14px', borderRadius: 12, cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                {benchPlayers.map((player) => (
                  <button
                    key={player}
                    type="button"
                    onClick={() => assignPlayerToSlot(player, true)}
                    style={{ padding: '10px 12px', borderRadius: 14, background: '#111c2a', border: '1px solid rgba(82,183,136,0.16)', color: '#F5F5F0', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.5)' }}>Bench</div>
                    <div style={{ fontWeight: 700 }}>{player}</div>
                  </button>
                ))}
                {availableRoster.map((player) => (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => assignPlayerToSlot(player.name)}
                    style={{ padding: '10px 12px', borderRadius: 14, background: '#111c2a', border: '1px solid rgba(255,255,255,0.08)', color: '#F5F5F0', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, color: 'rgba(245,245,240,0.5)' }}>
                      <span>{player.position}</span>
                      <span>{player.foot}</span>
                    </div>
                    <div style={{ fontWeight: 700 }}>{player.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ background: '#111c2a', borderRadius: 24, padding: 20, border: '1px solid rgba(82,183,136,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.5)' }}>Bench</div>
                <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.35)', marginTop: 4 }}>Players ready to step in</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F4A300' }}>{benchPlayers.length} players</div>
            </div>
            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {benchPlayers.map((player) => (
                <div key={player} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{player}</div>
                    <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.45)' }}>Bench</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => {
                        if (!activeSlot) {
                          window.alert('Tap a position on the pitch before assigning a bench player.');
                          return;
                        }
                        assignPlayerToSlot(player, true);
                      }}
                      style={{ padding: '8px 12px', borderRadius: 12, background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.18)', color: '#52B788', cursor: 'pointer', fontSize: 12 }}
                    >
                      Assign
                    </button>
                    <button
                      onClick={() => {
                        const chatId = createChatWithPlayer(player);
                        navigate(`/chat/${chatId}`);
                      }}
                      style={{ padding: '8px 12px', borderRadius: 12, background: 'rgba(244,163,0,0.12)', border: '1px solid rgba(244,163,0,0.2)', color: '#F4A300', cursor: 'pointer', fontSize: 12 }}
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => removeBenchPlayer(player)}
                      style={{ padding: '8px 10px', borderRadius: 12, background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.2)', color: '#E63946', cursor: 'pointer', fontSize: 12 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#111c2a', borderRadius: 24, padding: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.5)', marginBottom: 12 }}>Available Players</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {availableRoster.map((player) => (
                <div key={player.id} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{player.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.45)' }}>{player.position} • {player.foot}</div>
                  </div>
                  <button
                    onClick={() => addBenchPlayer(player.name)}
                    style={{ padding: '8px 12px', borderRadius: 12, background: 'rgba(244,163,0,0.12)', border: '1px solid rgba(244,163,0,0.2)', color: '#F4A300', fontSize: 12, cursor: 'pointer' }}
                  >
                    Add Bench
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <div style={{ background: '#111c2a', borderRadius: 24, padding: 20, border: '1px solid rgba(82,183,136,0.12)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.5)', marginBottom: 12 }}>Formation</div>
          <div style={{ fontWeight: 700, color: '#F5F5F0' }}>{teamBuilder.formation}</div>
        </div>
        <div style={{ background: '#111c2a', borderRadius: 24, padding: 20, border: '1px solid rgba(82,183,136,0.12)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.5)', marginBottom: 12 }}>Manager</div>
          <div style={{ fontWeight: 700, color: '#F5F5F0' }}>{teamBuilder.manager}</div>
        </div>
      </div>

      {/* ── NEW TEAM MODAL ─────────────────────────────────── */}
      {showNewTeam && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          {/* Backdrop */}
          <div
            onClick={() => setShowNewTeam(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          />
          {/* Panel */}
          <div style={{
            position: 'relative', zIndex: 1, width: '100%', maxWidth: 400,
            background: '#111c2a', border: '1px solid rgba(82,183,136,0.3)',
            borderRadius: 24, padding: 28, boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
          }}>
            {/* Close */}
            <button
              onClick={() => setShowNewTeam(false)}
              style={{ position: 'absolute', right: 18, top: 18, background: 'none', border: 'none', color: 'rgba(245,245,240,0.4)', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}
            >✕</button>

            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, color: '#F5F5F0', margin: '0 0 6px', letterSpacing: 1 }}>CREATE NEW TEAM</h2>
            <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.45)', marginBottom: 22 }}>All current squad and bench assignments will be cleared.</p>

            <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,245,240,0.7)', display: 'block', marginBottom: 8 }}>Team Name</label>
            <input
              autoFocus
              value={newTeamDraft}
              onChange={e => setNewTeamDraft(e.target.value)}
              placeholder="e.g. Rayfield FC"
              onKeyDown={e => {
                if (e.key === 'Enter' && newTeamDraft.trim()) {
                  createNewTeam(newTeamDraft.trim());
                  setShowNewTeam(false);
                }
              }}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 12,
                background: '#0D1B2A', border: '1px solid rgba(82,183,136,0.25)',
                color: '#F5F5F0', fontFamily: 'Inter, sans-serif', fontSize: 14,
                outline: 'none', marginBottom: 18, boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowNewTeam(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F5F5F0', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                }}
              >Cancel</button>
              <button
                onClick={() => {
                  if (!newTeamDraft.trim()) return;
                  createNewTeam(newTeamDraft.trim());
                  setShowNewTeam(false);
                }}
                disabled={!newTeamDraft.trim()}
                style={{
                  flex: 2, padding: '12px', borderRadius: 12,
                  background: newTeamDraft.trim() ? 'linear-gradient(135deg, #52B788, #1B4332)' : 'rgba(82,183,136,0.1)',
                  border: 'none', color: '#F5F5F0',
                  cursor: newTeamDraft.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                  boxShadow: newTeamDraft.trim() ? '0 4px 16px rgba(82,183,136,0.3)' : 'none',
                }}
              >Create Team</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .team-builder-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .team-builder-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
