import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, Sun, Waves, Mountain } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface DestinationsProps {
  onInquireDestination: (title: string) => void;
}

export default function Destinations({ onInquireDestination }: DestinationsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentDest = DESTINATIONS[activeTab];

  return (
    <section id="destinations" className="py-28 sm:py-36 bg-[#10100F] border-b border-[#262624] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-6 border-b border-[#262624]">
          <div>
            <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
              Holiday & Destination Folio
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#F3F0EA] mt-2 font-normal">
              Escape to Nature
            </h2>
          </div>
          <p className="text-sm sm:text-base font-sans text-[#9B978F] max-w-lg">
            A curated collection of residences created for slower mornings, open skies and meaningful escapes.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 hide-scrollbar">
          {DESTINATIONS.map((dest, idx) => (
            <button
              key={dest.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.16em] transition-all border cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#C5A059] text-[#0C0C0B] border-[#C5A059] font-semibold'
                  : 'bg-[#171716] text-[#9B978F] border-[#262624] hover:text-[#F3F0EA] hover:border-[#C5A059]'
              }`}
            >
              {dest.category} · {dest.title}
            </button>
          ))}
        </div>

        {/* Active Destination Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#171716] border border-[#262624] p-6 sm:p-10 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            {/* Cinematic Image Frame */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-[#262624] bg-[#1D1C1A]">
              <img
                src={currentDest.image}
                alt={currentDest.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 brightness-90 hover:brightness-100"
              />
              <div className="absolute bottom-4 left-4 bg-[#0C0C0B]/90 backdrop-blur-md px-3 py-1 text-[11px] font-sans uppercase tracking-widest text-[#F3F0EA] border border-[#262624]">
                {currentDest.coordinates}
              </div>
            </div>

            {/* Content Storytelling */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-sans text-[#C5A059] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentDest.location}</span>
                </div>

                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F3F0EA]">
                  {currentDest.title}
                </h3>

                <p className="font-cormorant italic text-lg text-[#9B978F]">
                  {currentDest.subtitle}
                </p>

                <p className="text-sm font-sans text-[#9B978F] leading-relaxed">
                  {currentDest.description}
                </p>
              </div>

              {/* Atmosphere Badges */}
              <div className="space-y-3 py-4 border-y border-[#262624]">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#9B978F]">Climate & Elevation</span>
                  <span className="text-[#F3F0EA] font-medium">{currentDest.elevationOrClimate}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#9B978F]">Atmosphere</span>
                  <span className="text-[#C5A059] font-medium">{currentDest.vibe}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#9B978F]">Active Developments</span>
                  <span className="text-[#F3F0EA] font-medium">{currentDest.projectCount} Enclaves</span>
                </div>
              </div>

              {/* CTA */}
              <div>
                <a
                  href="#contact"
                  onClick={() => onInquireDestination(currentDest.title)}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#C5A059] text-[#0C0C0B] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#D4AF37] transition-colors"
                >
                  <span>Inquire For {currentDest.category} Estates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
