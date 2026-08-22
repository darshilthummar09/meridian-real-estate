import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Sparkles, Layers } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { Residence } from '../types';

interface LuxuryRedefinedProps {
  onSelectProject: (residence: Residence) => void;
}

export default function LuxuryRedefined({ onSelectProject }: LuxuryRedefinedProps) {
  // Take first 2 featured projects for the editorial showcase
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <section className="py-28 sm:py-36 bg-[#0C0C0B] border-b border-[#262624] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
              Curated Masterpieces
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#F3F0EA] font-normal leading-tight">
            Luxury Redefined
          </h2>
          <p className="text-sm sm:text-base text-[#9B978F] font-sans mt-4 max-w-xl">
            Where structural monumentality meets the serenity of private retreat. Every project represents an uncompromising dialogue between site and silhouette.
          </p>
        </div>

        {/* Alternate Editorial Compositions */}
        <div className="space-y-32">
          {featuredProjects.map((project, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Imagery Cluster */}
                <div
                  className={`lg:col-span-7 relative ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Primary Large Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => onSelectProject(project)}
                    className="relative aspect-[16/11] w-full overflow-hidden border border-[#262624] group cursor-pointer"
                  >
                    <img
                      src={project.heroImage}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4 bg-[#0C0C0B]/90 backdrop-blur-md px-3 py-1 text-[10px] font-sans uppercase tracking-widest text-[#F3F0EA] border border-[#262624]">
                      0{idx + 1} · {project.city}
                    </div>
                  </motion.div>

                  {/* Supporting Vignette Floating Overlap */}
                  {project.architecturalVignette && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`hidden sm:block absolute -bottom-10 w-44 md:w-56 aspect-[4/5] overflow-hidden border-2 border-[#181716] shadow-2xl z-10 ${
                        isReversed ? '-left-6' : '-right-6'
                      }`}
                    >
                      <img
                        src={project.architecturalVignette}
                        alt={`${project.name} Vignette`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#0C0C0B]/90 backdrop-blur-md px-2 py-0.5 text-[9px] text-[#C5A059] uppercase tracking-wider border border-[#262624]">
                        Detail Craft
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Text Storytelling Block */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 text-xs font-sans tracking-widest text-[#C5A059] uppercase">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F3F0EA] leading-tight">
                      {project.name}
                    </h3>

                    <p className="font-cormorant italic text-lg text-[#9B978F]">
                      {project.tagline}
                    </p>

                    <p className="text-sm font-sans text-[#9B978F] leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Meta Specifications */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#262624]">
                      <div>
                        <div className="text-[11px] font-sans uppercase tracking-wider text-[#9B978F]">
                          Configuration
                        </div>
                        <div className="text-xs font-sans font-medium text-[#F3F0EA] mt-0.5">
                          {project.configuration}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-sans uppercase tracking-wider text-[#9B978F]">
                          Scale
                        </div>
                        <div className="text-xs font-sans font-medium text-[#F3F0EA] mt-0.5">
                          {project.areaSqFt}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button with Magnetic Arrow Motion */}
                    <div className="pt-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="group inline-flex items-center gap-3 text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#F3F0EA] hover:text-[#C5A059] transition-colors cursor-pointer py-2"
                      >
                        <span className="relative pb-1">
                          Explore Residence Dossier
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#262624] group-hover:bg-[#C5A059] transition-colors" />
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
