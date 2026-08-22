import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import PropertyDetailModal from './components/PropertyDetailModal';
import JournalModal from './components/JournalModal';
import BrochureModal from './components/BrochureModal';
import SavedResidencesDrawer from './components/SavedResidencesDrawer';

import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import BrandValues from './sections/BrandValues';
import LuxuryRedefined from './sections/LuxuryRedefined';
import ResidencesGrid from './sections/ResidencesGrid';
import ArchitecturalVision from './sections/ArchitecturalVision';
import Destinations from './sections/Destinations';
import LocationConnectivity from './sections/LocationConnectivity';
import LifestyleGallery from './sections/LifestyleGallery';
import JournalSection from './sections/JournalSection';
import ContactCTA from './sections/ContactCTA';
import Footer from './sections/Footer';

import { PROJECTS } from './data/projects';
import { Residence, JournalArticle } from './types';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const stored = localStorage.getItem('meridian_theme') || localStorage.getItem('emarat_theme');
      return (stored === 'light' || stored === 'dark') ? stored : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [brochureResidence, setBrochureResidence] = useState<Residence | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('meridian_saved_residences') || localStorage.getItem('emarat_saved_residences');
      return stored ? JSON.parse(stored) : ['the-grove-residences'];
    } catch {
      return ['the-grove-residences'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('meridian_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('meridian_saved_residences', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const savedResidences = PROJECTS.filter((p) => savedIds.includes(p.id));

  const scrollToResidences = () => {
    const el = document.getElementById('residences');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0B] text-[#F3F0EA] relative selection:bg-[#C5A059] selection:text-[#0C0C0B] transition-colors duration-300">
      {/* Non-intrusive luxury cursor on desktop */}
      <CustomCursor />

      {/* Top subtle reading progress line */}
      <ScrollProgress />

      {/* Transparent-to-frosted Navbar */}
      <Navbar
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenContact={scrollToContact}
      />

      <main>
        {/* Fullscreen Cinematic Hero */}
        <Hero onExploreClick={scrollToResidences} />

        {/* Philosophy & Architecture Manifesto ("More Than Four Walls") */}
        <Philosophy />

        {/* Brand Values (01 CRAFTED, 02 DESIGNED, 03 ENDURING) */}
        <BrandValues />

        {/* Major Showcase ("Luxury Redefined" with Asymmetric Editorial Compositions) */}
        <LuxuryRedefined
          onSelectProject={(residence) => setSelectedResidence(residence)}
        />

        {/* Dedicated Filterable Residences ("Our Residences") */}
        <ResidencesGrid
          onSelectProject={(residence) => setSelectedResidence(residence)}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />

        {/* 3D Massing Pavilion & Structural Rationale */}
        <ArchitecturalVision />

        {/* Holiday & Nature Storytelling ("Escape to Nature" Beach, Lake, Mountain) */}
        <Destinations
          onInquireDestination={(title) => {
            scrollToContact();
          }}
        />

        {/* Strategic Location & Connectivity Matrix */}
        <LocationConnectivity />

        {/* Interior & Lifestyle Gallery ("Crafted For The Way You Live") */}
        <LifestyleGallery />

        {/* Editorial Journal ("Insights & Stories") */}
        <JournalSection
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Large Dark Final Contact CTA ("Ready to find your perfect home?") */}
        <ContactCTA />
      </main>

      {/* Minimalist Luxury Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <PropertyDetailModal
        residence={selectedResidence}
        onClose={() => setSelectedResidence(null)}
        isSaved={selectedResidence ? savedIds.includes(selectedResidence.id) : false}
        onToggleSave={toggleSave}
        onRequestBrochure={(res) => {
          setSelectedResidence(null);
          setBrochureResidence(res);
        }}
      />

      <JournalModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <BrochureModal
        residence={brochureResidence}
        onClose={() => setBrochureResidence(null)}
      />

      <SavedResidencesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedResidences={savedResidences}
        onRemove={toggleSave}
        onSelect={(res) => {
          setSelectedResidence(res);
        }}
      />
    </div>
  );
}
