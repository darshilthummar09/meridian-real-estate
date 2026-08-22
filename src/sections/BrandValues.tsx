import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/brand';

export default function BrandValues() {
  const [activeValue, setActiveValue] = useState<number>(0);

  return (
    <section className="py-24 sm:py-32 bg-[#10100F] border-b border-[#262624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#262624]">
          <div>
            <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
              Foundational Principles
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F3F0EA] font-normal leading-tight">
              The Meridian Standard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9B978F] font-sans max-w-sm mt-4 md:mt-0">
            Three uncompromising pillars that govern every square meter of our master developments.
          </p>
        </div>

        {/* 3 Editorial Value Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BRAND.values.map((val, index) => (
            <motion.div
              key={val.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onMouseEnter={() => setActiveValue(index)}
              className="group relative bg-[#171716] border border-[#262624] p-8 sm:p-10 flex flex-col justify-between hover:border-[#C5A059] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-[#262624]">
                  <span className="font-serif-luxury text-3xl font-light text-[#C5A059]">
                    {val.number}
                  </span>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9B978F]">
                    {val.subtitle}
                  </span>
                </div>

                {/* Main Value Title */}
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F3F0EA] mt-8 mb-4 tracking-wide group-hover:text-[#C5A059] transition-colors">
                  {val.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-sans text-[#9B978F] leading-relaxed mb-8">
                  {val.description}
                </p>
              </div>

              {/* Image Preview vignette */}
              <div className="relative aspect-[16/10] overflow-hidden border border-[#262624]">
                <img
                  src={val.image}
                  alt={val.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
