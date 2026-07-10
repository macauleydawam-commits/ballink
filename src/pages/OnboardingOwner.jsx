import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Phone, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';

export default function OnboardingOwner() {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useOnboarding();

  const [formData, setFormData] = useState({
    businessName: userProfile.businessName || '',
    contactNumber: userProfile.contactNumber || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.businessName.trim()) {
      tempErrors.businessName = 'Business or facility name is required';
    }
    if (!formData.contactNumber.trim()) {
      tempErrors.contactNumber = 'Provide a contact phone number';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.contactNumber.trim())) {
      tempErrors.contactNumber = 'Please enter a valid phone number';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateProfile({
        ...formData,
        userType: 'owner',
      });
      navigate('/auth');
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
        <Link to="/signup" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
          color: 'rgba(245,245,240,0.6)', textDecoration: 'none',
          border: '1px solid rgba(245,245,240,0.1)', borderRadius: 8, padding: '7px 14px',
        }}>
          <ArrowLeft size={14} /> Back
        </Link>
      </header>

      {/* Main Container */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 24px' }}>
        <div style={{
          width: '100%', maxWidth: 460, background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(82,183,136,0.1)', borderRadius: 28, padding: '32px 24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Header text */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 38, color: '#F5F5F0', letterSpacing: 1.5, margin: '0 0 6px' }}>
              LIST YOUR <span style={{ color: '#F4A300' }}>FACILITY</span>
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.5 }}>
              Register your pitches and turfs to start receiving bookings from football clubs and players in Jos.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Business / Pitch Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="businessName" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Business / Facility Name <span style={{ color: '#E63946' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="e.g. Jos City Premium Turf"
                  value={formData.businessName}
                  onChange={handleChange}
                  style={{
                    width: '100%', padding: '12px 16px 12px 40px', background: 'rgba(255,255,255,0.03)',
                    border: errors.businessName ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                    borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                />
                <Building2 size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,245,240,0.3)' }} />
              </div>
              {errors.businessName && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.businessName}</span>}
            </div>

            {/* Contact Number */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="contactNumber" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Contact Phone Number <span style={{ color: '#E63946' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="e.g. +234 803 123 4567"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  style={{
                    width: '100%', padding: '12px 16px 12px 40px', background: 'rgba(255,255,255,0.03)',
                    border: errors.contactNumber ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                    borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                />
                <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,245,240,0.3)' }} />
              </div>
              {errors.contactNumber && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.contactNumber}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                width: '100%', padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg, #F4A300, #FFB800)',
                border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700,
                color: '#0D1B2A', cursor: 'pointer', marginTop: 10,
                boxShadow: '0 6px 20px rgba(244,163,0,0.3)', transition: 'transform 0.2s',
              }}
            >
              Continue to Account Setup <ArrowRight size={16} />
            </button>
          </form>

          {/* Switch back to Player */}
          <div style={{ marginTop: 24, pt: 20, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <Link to="/signup" style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              color: '#52B788', textDecoration: 'none', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.target.style.color = '#F4A300'}
              onMouseLeave={e => e.target.style.color = '#52B788'}
            >
              Are you a Player? Register as a player instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
