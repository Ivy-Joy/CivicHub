// frontend/src/pages/LandingPage.jsx
import React from 'react';
//import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import JourneySection from '../components/JourneySection';
import TrustStrip from '../components/TrustStrip';
import ConstitutionSection from '../components/ConstitutionSection';
//import TargetAudience from '../components/TargetAudience';

//import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <main>
        <HeroSection />
        <JourneySection />
        <ConstitutionSection />
        <TrustStrip />
      </main>
    </>
  );
}