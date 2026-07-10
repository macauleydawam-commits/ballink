import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [userProfile, setUserProfile] = useState({
    userType: 'player', // 'player' or 'owner'
    // Player onboarding fields
    name: '',
    sex: '',
    position: '',
    location: '',
    skillLevel: '',
    // Owner onboarding fields
    businessName: '',
    contactNumber: '',
  });

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

  return (
    <OnboardingContext.Provider value={{ userProfile, updateProfile, resetProfile }}>
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
