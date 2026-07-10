import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Shield, Info, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import Logo from '../components/Logo';

const JOS_AREAS = [
  'Rayfield',
  'Terminus',
  'Anglo-Jos',
  'Naraguta',
  'Tudun Wada',
  'Lamingo',
  'Hwolshe',
  'Millionaires Quarters',
  'Rantya',
  'Bukuru',
];

export default function OnboardingPlayer() {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useOnboarding();

  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    sex: userProfile.sex || '',
    position: userProfile.position || '',
    location: userProfile.location || '',
    skillLevel: userProfile.skillLevel || '',
    age: userProfile.age || '',
    preferredFoot: userProfile.preferredFoot || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'What should the community call you?';
    if (!formData.sex) tempErrors.sex = 'Please choose a option';
    if (!formData.position) tempErrors.position = 'Select your preferred position on the pitch';
    if (!formData.location) tempErrors.location = 'Which part of Jos do you play in?';
    if (!formData.age || Number(formData.age) <= 0) tempErrors.age = 'Enter your age';
    if (!formData.preferredFoot) tempErrors.preferredFoot = 'Choose a preferred foot';
    if (!formData.skillLevel) tempErrors.skillLevel = 'Choose your skill tier';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await updateProfile({
        ...formData,
        userType: 'player',
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
        <Link to="/" style={{
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
              BUILD YOUR PLAYER <span style={{ color: '#F4A300' }}>CARD</span>
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.5 }}>
              Tell the Jos football community who you are so we can find the right match for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="name" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Full Name / Nickname <span style={{ color: '#E63946' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. John 'Jay-Jay' Pam"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%', padding: '12px 16px 12px 40px', background: 'rgba(255,255,255,0.03)',
                    border: errors.name ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                    borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                />
                <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,245,240,0.3)' }} />
              </div>
              {errors.name && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.name}</span>}
            </div>

            {/* Sex (Segmented Control style) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Sex <span style={{ color: '#E63946' }}>*</span>
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Male', 'Female', 'Prefer not to say'].map((option) => {
                  const isSelected = formData.sex === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect('sex', option)}
                      style={{
                        flex: 1, padding: '12px 8px', borderRadius: 12, border: isSelected ? '1px solid #F4A300' : '1px solid rgba(255,255,255,0.08)',
                        background: isSelected ? 'rgba(244,163,0,0.08)' : 'rgba(255,255,255,0.02)',
                        color: isSelected ? '#F4A300' : 'rgba(245,245,240,0.6)',
                        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: isSelected ? 600 : 500,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {option === 'Prefer not to say' ? 'Other' : option}
                    </button>
                  );
                })}
              </div>
              {errors.sex && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.sex}</span>}
            </div>

            {/* Playing Position */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="position" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Preferred Position <span style={{ color: '#E63946' }}>*</span>
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px', background: '#0D1B2A',
                  border: errors.position ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                  borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
              >
                <option value="">Select your position...</option>
                <option value="Goalkeeper">Goalkeeper (GK)</option>
                <option value="Defender">Defender (DF)</option>
                <option value="Midfielder">Midfielder (MF)</option>
                <option value="Forward">Forward (FW)</option>
              </select>
              {errors.position && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.position}</span>}
            </div>

            {/* Preferred Location in Jos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="location" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Preferred Playing Area in Jos <span style={{ color: '#E63946' }}>*</span>
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px', background: '#0D1B2A',
                  border: errors.location ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                  borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
              >
                <option value="">Select neighborhood...</option>
                {JOS_AREAS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.location && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.location}</span>}
            </div>

            {/* Age */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="age" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Age <span style={{ color: '#E63946' }}>*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="13"
                placeholder="24"
                value={formData.age}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
                  border: errors.age ? '1px solid #E63946' : '1px solid rgba(82,183,136,0.2)',
                  borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5F5F0',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
              />
              {errors.age && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.age}</span>}
            </div>

            {/* Preferred Foot */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Preferred Foot <span style={{ color: '#E63946' }}>*</span>
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Right', 'Left', 'Both'].map((option) => {
                  const isSelected = formData.preferredFoot === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect('preferredFoot', option)}
                      style={{
                        flex: 1, padding: '12px 8px', borderRadius: 12, border: isSelected ? '1px solid #F4A300' : '1px solid rgba(255,255,255,0.08)',
                        background: isSelected ? 'rgba(244,163,0,0.08)' : 'rgba(255,255,255,0.02)',
                        color: isSelected ? '#F4A300' : 'rgba(245,245,240,0.6)',
                        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: isSelected ? 600 : 500,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {errors.preferredFoot && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.preferredFoot}</span>}
            </div>

            {/* Skill Level */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.7)' }}>
                Skill Level / Expertise <span style={{ color: '#E63946' }}>*</span>
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Beginner', 'Intermediate', 'Advanced'].map((tier) => {
                  const isSelected = formData.skillLevel === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => handleSelect('skillLevel', tier)}
                      style={{
                        flex: 1, padding: '12px 8px', borderRadius: 12, border: isSelected ? '1px solid #F4A300' : '1px solid rgba(255,255,255,0.08)',
                        background: isSelected ? 'rgba(244,163,0,0.08)' : 'rgba(255,255,255,0.02)',
                        color: isSelected ? '#F4A300' : 'rgba(245,245,240,0.6)',
                        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: isSelected ? 600 : 500,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {tier}
                    </button>
                  );
                })}
              </div>
              {errors.skillLevel && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E63946' }}>{errors.skillLevel}</span>}
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

          {/* Switch to Pitch Owner */}
          <div style={{ marginTop: 24, pt: 20, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <Link to="/signup/owner" style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              color: '#52B788', textDecoration: 'none', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.target.style.color = '#F4A300'}
              onMouseLeave={e => e.target.style.color = '#52B788'}
            >
              Are you a Pitch / Turf Owner? List your pitch instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
