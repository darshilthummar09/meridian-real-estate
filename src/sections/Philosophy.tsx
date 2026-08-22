import React from 'react';
import { motion } from 'motion/react';
import { BRAND } from '../data/brand';

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-28 sm:py-36 md:py-44 bg-[#0C0C0B] border-b border-[#262624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Huge Editorial Serif Headline with Asymmetric Alignment */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
                Our Architecture Manifesto
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F3F0EA] font-normal leading-[1.08]"
            >
              More Than <br />
              <span className="italic font-cormorant text-[#C5A059]">Four Walls</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-20 h-[2px] bg-[#C5A059] origin-left"
            />
          </div>

          {/* Right Column: Architectural Philosophy & Deep Spatial Narrative */}
          <div className="lg:col-span-6 space-y-8 lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cormorant text-2xl sm:text-3xl text-[#EDE8DF] leading-snug italic font-normal"
            >
              {BRAND.manifesto.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-5 text-sm sm:text-base text-[#9B978F] leading-relaxed font-sans"
            >
              <p>{BRAND.manifesto.paragraph1}</p>
              <p>{BRAND.manifesto.paragraph2}</p>
            </motion.div>

            {/* Editorial Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#262624]"
            >
              {BRAND.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-serif-luxury text-2xl sm:text-3xl text-[#F3F0EA] font-semibold">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-sans uppercase tracking-wider text-[#9B978F]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
