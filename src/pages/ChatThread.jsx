import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import { ArrowLeft, Send } from 'lucide-react';

export default function ChatThread() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const {
    chats,
    chatMessages,
    markChatRead,
    sendChatMessage,
  } = useOnboarding();

  const chat = chats.find((item) => item.id === chatId);
  const messages = chatMessages[chatId] || [];
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!chat) {
      navigate('/dashboard');
      return;
    }
    markChatRead(chatId);
  }, [chat, chatId, markChatRead, navigate]);

  if (!chat) {
    return null;
  }

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    sendChatMessage(chatId, trimmed);
    setDraft('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F5F0', fontFamily: 'Inter, sans-serif', paddingBottom: 90 }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#0D1B2A', borderBottom: '1px solid rgba(82,183,136,0.12)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'rgba(255,255,255,0.05)', width: 38, height: 38, borderRadius: 12, color: '#F5F5F0', cursor: 'pointer' }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.6)', letterSpacing: 1 }}>Chat</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F0' }}>{chat.name}</div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(82,183,136,0.12)', borderRadius: 28, padding: '22px 20px', minHeight: 520, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.5)', marginBottom: 6 }}>Participants</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {chat.participants.map((participant) => (
                  <span key={participant} style={{ fontSize: 12, padding: '8px 12px', borderRadius: 999, background: 'rgba(82,183,136,0.08)', color: '#F5F5F0' }}>
                    {participant}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>Last active</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F4A300' }}>{chat.lastMessageTime}</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 4 }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: 'rgba(245,245,240,0.5)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(82,183,136,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'rgba(245,245,240,0.35)' }}>
                  <MessageSquare size={28} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#F5F5F0', marginBottom: 6 }}>Begin the conversation</div>
                <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.55)' }}>Send a message to get started—let's get organized.</div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    alignSelf: message.outgoing ? 'flex-end' : 'flex-start',
                    maxWidth: '78%',
                    background: message.outgoing ? 'linear-gradient(135deg, #F4A300, #FFB800)' : 'rgba(255,255,255,0.06)',
                    color: message.outgoing ? '#0D1B2A' : '#F5F5F0',
                    padding: '14px 16px',
                    borderRadius: 20,
                    borderTopLeftRadius: message.outgoing ? 20 : 4,
                    borderTopRightRadius: message.outgoing ? 4 : 20,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{message.sender}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6 }}>{message.text}</div>
                  <div style={{ textAlign: 'right', marginTop: 8, fontSize: 11, color: message.outgoing ? 'rgba(13,27,42,0.65)' : 'rgba(245,245,240,0.45)' }}>{message.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: '#0D1B2A', borderTop: '1px solid rgba(82,183,136,0.12)', padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          style={{
            width: '100%', minHeight: 44, maxHeight: 120, resize: 'none', borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.1)', background: '#111c2a', color: '#F5F5F0', padding: '12px 14px', outline: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13
          }}
        />
        <button
          onClick={handleSend}
          style={{ width: 56, height: 56, borderRadius: 16, border: 'none', background: '#F4A300', color: '#0D1B2A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
