import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Sparkles, ArrowRight } from 'lucide-react';
import { LIFESTYLE_SPACES } from '../data/lifestyle';

export default function LifestyleGallery() {
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);
  const activeSpace = LIFESTYLE_SPACES[selectedSpaceIndex];

  return (
    <section id="lifestyle" className="py-28 sm:py-36 bg-[#10100F] border-b border-[#262624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#262624]">
          <div>
            <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
              Spatial Tactility
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#F3F0EA] mt-2 font-normal leading-tight">
              Crafted For The <br />
              <span className="italic font-cormorant text-[#C5A059]">Way You Live</span>
            </h2>
          </div>
          <p className="text-sm font-sans text-[#9B978F] max-w-sm mt-4 md:mt-0">
            Intimate living salons, private wellness suites, and culinary ateliers engineered with bespoke European materiality.
          </p>
        </div>

        {/* Room Navigation Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 hide-scrollbar">
          {LIFESTYLE_SPACES.map((space, idx) => (
            <button
              key={space.id}
              onClick={() => setSelectedSpaceIndex(idx)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                selectedSpaceIndex === idx
                  ? 'bg-[#C5A059] text-[#0C0C0B] border-[#C5A059] font-semibold'
                  : 'bg-[#171716] text-[#9B978F] border-[#262624] hover:text-[#F3F0EA] hover:border-[#C5A059]'
              }`}
            >
              0{idx + 1} · {space.title.split(' ')[1] || space.title}
            </button>
          ))}
        </div>

        {/* Dynamic Space Viewfinder */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpace.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#171716] border border-[#262624] p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] items-center"
          >
            {/* Primary Visual */}
            <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden border border-[#262624] bg-[#1D1C1A]">
              <img
                src={activeSpace.image}
                alt={activeSpace.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-104 brightness-90 hover:brightness-100"
              />
              <div className="absolute top-4 left-4 bg-[#0C0C0B]/90 backdrop-blur-md px-3 py-1 text-[11px] font-sans uppercase tracking-widest text-[#F3F0EA] border border-[#262624]">
                {activeSpace.dimensions}
              </div>
            </div>

            {/* Materiality Narrative */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-sans uppercase tracking-widest text-[#C5A059]">
                  Interior Atelier
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F3F0EA]">
                  {activeSpace.title}
                </h3>
                <p className="font-cormorant italic text-base text-[#9B978F]">
                  {activeSpace.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#9B978F] leading-relaxed">
                {activeSpace.description}
              </p>

              <div className="p-4 bg-[#141413] border border-[#262624] space-y-1.5">
                <div className="text-[11px] font-sans uppercase tracking-wider text-[#F3F0EA] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>Curated Material Palette</span>
                </div>
                <p className="text-xs font-sans text-[#9B978F]">
                  {activeSpace.materiality}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
