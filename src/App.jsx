import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlaceholderPage from './pages/PlaceholderPage';
import OnboardingPlayer from './pages/OnboardingPlayer';
import OnboardingOwner from './pages/OnboardingOwner';
import AuthScreen from './pages/AuthScreen';
import ForgotPassword from './pages/ForgotPassword';
import PlayerDashboard from './pages/PlayerDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import DetailsPlaceholder from './pages/DetailsPlaceholder';
import { OnboardingProvider } from './context/OnboardingContext';
import './index.css';

export default function App() {
  return (
    <OnboardingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<OnboardingPlayer />} />
          <Route path="/signup/owner" element={<OnboardingOwner />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<PlayerDashboard />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          
          <Route path="/pitch/:id" element={<DetailsPlaceholder />} />
          <Route path="/match/:id" element={<DetailsPlaceholder />} />
          <Route path="/tournament/:id" element={<DetailsPlaceholder />} />

          <Route path="/about" element={<PlaceholderPage title="About BallLink" subtitle="The story of how football in Jos got better." />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact Us" subtitle="Reach us at hello@balllink.ng" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms & Conditions" subtitle="Legal stuff coming soon." />} />
        </Routes>
      </BrowserRouter>
    </OnboardingProvider>
  );
}


