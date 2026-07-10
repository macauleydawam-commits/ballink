import React, { createContext, useContext, useState } from 'react';
import { FEATURED_PITCHES } from '../data/mockData';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [userProfile, setUserProfile] = useState({
    userType: 'player', // 'player' or 'owner'
    name: 'Gyang Pam',
    sex: 'Male',
    position: 'Midfielder',
    location: 'Rayfield',
    skillLevel: 'Intermediate',
    businessName: 'Jos Turf City',
    contactNumber: '+234 803 123 4567',
  });

  // Pitches state (initialized from mock data, editable by users)
  const [pitches, setPitches] = useState(FEATURED_PITCHES);

  // Bookings state (upcoming and past)
  const [bookings, setBookings] = useState([
    {
      id: 'book-101',
      pitchId: 'pitch-002',
      pitchName: 'Rock City Football Centre',
      date: '2026-07-12',
      time: '18:00',
      duration: 2,
      totalPrice: 24000,
      status: 'upcoming',
    },
    {
      id: 'book-102',
      pitchId: 'pitch-004',
      pitchName: 'Naraguta Mini Pitch',
      date: '2026-07-08',
      time: '19:00',
      duration: 1,
      totalPrice: 6000,
      status: 'past',
    }
  ]);

  const updateProfile = (data) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  const resetProfile = () => {
    setUserProfile({
      userType: 'player',
      name: '',
      sex: '',
      position: '',
      location: '',
      skillLevel: '',
      businessName: '',
      contactNumber: '',
    });
  };

  // Pitch actions
  const updatePitch = (id, updatedData) => {
    setPitches(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  // Booking actions
  const addBooking = (newBooking) => {
    setBookings(prev => [
      {
        id: `book-${Date.now()}`,
        status: 'upcoming',
        ...newBooking
      },
      ...prev
    ]);
  };

  const updateBooking = (id, updatedData) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <OnboardingContext.Provider value={{
      userProfile,
      updateProfile,
      resetProfile,
      pitches,
      updatePitch,
      bookings,
      addBooking,
      updateBooking,
      cancelBooking
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
