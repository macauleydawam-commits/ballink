import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetError) {
      setError(resetError.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(82,183,136,0.1)' }}>
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

      {/* Main Container */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 24px' }}>
        <div style={{
          width: '100%', maxWidth: 420, background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(82,183,136,0.1)', borderRadius: 28, padding: '32px 24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: 'rgba(82,183,136,0.15)',
                display: 'flex', alignItems: 'center', justify: 'center', border: '1px solid rgba(82,183,136,0.3)',
                color: '#52B788', margin: '0 auto 10px',
              }}>
                <CheckCircle size={32} style={{ margin: 'auto' }} />
              </div>
              <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 32, color: '#F5F5F0', letterSpacing: 1.5, margin: 0 }}>
                RECOVERY LINK SENT
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.6 }}>
                We have sent instructions to reset your password to <strong>{email}</strong>. Check your inbox or spam folder.
              </p>
              <Link to="/login" style={{
                width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                color: '#0D1B2A', cursor: 'pointer', textDecoration: 'none', display: 'block', marginTop: 10,
              }}>
                Return to Login
              </Link>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 34, color: '#F5F5F0', letterSpacing: 1.5, margin: '0 0 6px' }}>
                  RESET PASSWORD
                </h1>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.5 }}>
                  Enter your email address below and we will send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Email Address */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="email" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%', padding: '12px 16px 12px 40px', background: 'rgba(255,255,255,0.03)',
                        border: error ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                        borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                        outline: 'none',
                      }}
                    />
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,245,240,0.3)' }} />
                  </div>
                  {error && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{error}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                    border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700,
                    color: '#0D1B2A', cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(244,163,0,0.3)',
                  }}
                >
                  Send Recovery Link
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
