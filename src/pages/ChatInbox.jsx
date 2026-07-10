import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export default function ChatInbox() {
  const navigate = useNavigate();
  const { chats, markChatRead } = useOnboarding();

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F5F0', fontFamily: 'Inter, sans-serif', paddingBottom: 90 }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#0D1B2A', borderBottom: '1px solid rgba(82,183,136,0.12)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'rgba(255,255,255,0.05)', width: 38, height: 38, borderRadius: 12, color: '#F5F5F0', cursor: 'pointer' }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.6)', letterSpacing: 1 }}>Inbox</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F0' }}>Chat</div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 80px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, letterSpacing: 1, margin: 0, color: '#F5F5F0' }}>Messages & Groups</h2>
            <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.55)', margin: '8px 0 0' }}>Open a conversation to view full chat history and reply instantly.</p>
          </div>
          <Link
            to="/dashboard"
            style={{ padding: '10px 18px', borderRadius: 14, background: 'rgba(244,163,0,0.16)', color: '#F4A300', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700 }}
          >
            Back to Dashboard
          </Link>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {chats.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', background: '#111c2a', borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(82,183,136,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'rgba(245,245,240,0.35)' }}>
                <MessageSquare size={32} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F0', marginBottom: 10, fontFamily: '"Bebas Neue", sans-serif', letterSpacing: 0.5 }}>Message Center</div>
              <div style={{ fontSize: 14, color: 'rgba(245,245,240,0.6)', marginBottom: 8, maxWidth: 320, margin: '0 auto 8px' }}>Connect with teammates and pitch organizers here.</div>
              <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.45)' }}>Conversations start from your team builder or when you interact with a pitch.</div>
            </div>
          ) : chats.map((chat) => (
            <div
              key={chat.id}
              role="button"
              onClick={() => {
                markChatRead(chat.id);
                navigate(`/chat/${chat.id}`);
              }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                background: '#111c2a', borderRadius: 18, border: '1px solid rgba(255,255,255,0.06)', padding: 18,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(82,183,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52B788', fontWeight: 700, fontSize: 16 }}>
                  {chat.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F0' }}>{chat.name}</span>
                    {chat.isGroup && <MessageSquare size={14} style={{ color: '#52B788' }} />}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.45)', maxWidth: 560 }}>{chat.preview}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.35)', marginBottom: 8 }}>{chat.lastMessageTime}</div>
                {chat.unread > 0 && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 28, padding: '4px 8px', borderRadius: 999, background: '#E63946', color: '#FFF', fontSize: 11, fontWeight: 700 }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
