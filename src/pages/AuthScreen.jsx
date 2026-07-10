import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';

export default function AuthScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, updateProfile } = useOnboarding();

  // Check if we arrived here directly from a "Log In" action vs. onboarding
  const isDirectLogin = location.pathname === '/login';

  const [isLoginMode, setIsLoginMode] = useState(isDirectLogin);
  const [showEmailFields, setShowEmailFields] = useState(false);
  
  // Local form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(userProfile.userType || 'player'); // Default role if direct login
  const [errors, setErrors] = useState({});

  const handleOAuth = (provider) => {
    console.log(`[Auth Mock] Authenticating with ${provider} for role: ${userRole}`);
    // Simulate authentication delay
    setTimeout(() => {
      // Direct user to correct dashboard type
      if (userRole === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 800);
  };

  const validate = () => {
    const tempErrors = {};
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(`[Auth Mock] Email Auth: ${email}, Action: ${isLoginMode ? 'Login' : 'Signup'}, Role: ${userRole}`);
      // Simulate success and redirect
      if (userRole === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/dashboard');
      }
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
          {/* Header titles */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 38, color: '#F5F5F0', letterSpacing: 1.5, margin: '0 0 6px' }}>
              {isLoginMode ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.5 }}>
              {isLoginMode
                ? 'Kick-off where you left off. Log in to your profile.'
                : `Complete setup as a ${userRole === 'owner' ? 'Pitch Owner' : 'Player'} to get started.`}
            </p>
          </div>

          {/* User Role Quick Select (Only visible in Direct Login Mode to route users correctly) */}
          {isDirectLogin && (
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', padding: 4, borderRadius: 10, marginBottom: 20 }}>
              <button
                type="button"
                onClick={() => setUserRole('player')}
                style={{
                  flex: 1, padding: '8px 12px', border: 'none', borderRadius: 8,
                  background: userRole === 'player' ? 'rgba(82,183,136,0.15)' : 'transparent',
                  color: userRole === 'player' ? '#52B788' : 'rgba(245,245,240,0.5)',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                Player
              </button>
              <button
                type="button"
                onClick={() => setUserRole('owner')}
                style={{
                  flex: 1, padding: '8px 12px', border: 'none', borderRadius: 8,
                  background: userRole === 'owner' ? 'rgba(82,183,136,0.15)' : 'transparent',
                  color: userRole === 'owner' ? '#52B788' : 'rgba(245,245,240,0.5)',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                Pitch Owner
              </button>
            </div>
          )}

          {/* Social Provider Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Google */}
            <button
              onClick={() => handleOAuth('Google')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', padding: '13px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)', color: '#F5F5F0',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* Apple */}
            <button
              onClick={() => handleOAuth('Apple')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', padding: '13px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)', color: '#F5F5F0',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.58 2.94-1.39" />
              </svg>
              Continue with Apple
            </button>

            {/* Email Expand Trigger */}
            {!showEmailFields && (
              <button
                onClick={() => setShowEmailFields(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  width: '100%', padding: '13px', borderRadius: 12, border: '1px solid rgba(82,183,136,0.2)',
                  background: 'rgba(82,183,136,0.04)', color: '#52B788',
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <Mail size={16} /> Continue with Email
              </button>
            )}
          </div>

          {/* Email + Password Form */}
          {showEmailFields && (
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
              {/* Email */}
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
                      border: errors.email ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                      borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                      outline: 'none',
                    }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,245,240,0.3)' }} />
                </div>
                {errors.email && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.email}</span>}
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="password" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                    Password
                  </label>
                  {isLoginMode && (
                    <Link to="/forgot-password" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#52B788', textDecoration: 'none' }}>
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 16px 12px 40px', background: 'rgba(255,255,255,0.03)',
                      border: errors.password ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                      borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                      outline: 'none',
                    }}
                  />
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,245,240,0.3)' }} />
                </div>
                {errors.password && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.password}</span>}
              </div>

              {/* Submit Email Account */}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                  border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700,
                  color: '#0D1B2A', cursor: 'pointer', marginTop: 6,
                  boxShadow: '0 6px 20px rgba(244,163,0,0.3)',
                }}
              >
                {isLoginMode ? 'Log In with Email' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Toggle Login vs Create Account */}
          <div style={{ marginTop: 24, pt: 20, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              style={{
                background: 'none', border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13,
                fontWeight: 600, color: '#52B788', cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F4A300'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#52B788'; }}
            >
              {isLoginMode ? "New to BallLink? Create account" : 'Already have an account? Log In'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
