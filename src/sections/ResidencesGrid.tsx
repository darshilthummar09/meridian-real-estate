import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  ArrowRight,
  Bookmark,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { PropertyCategory, Residence } from '../types';

interface ResidencesGridProps {
  onSelectProject: (residence: Residence) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export default function ResidencesGrid({
  onSelectProject,
  savedIds,
  onToggleSave,
}: ResidencesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>('all');

  const categories: { key: PropertyCategory; label: string }[] = [
    { key: 'all', label: 'All Residences' },
    { key: 'urban', label: 'Urban Mansions' },
    { key: 'coastal', label: 'Coastal Estates' },
    { key: 'mountain', label: 'Alpine Retreats' },
    { key: 'penthouse', label: 'Sky Penthouses' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="residences" className="py-28 sm:py-36 bg-[#10100F] border-b border-[#262624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-6 border-b border-[#262624]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
                The Portfolio
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#F3F0EA] font-normal">
              Our Residences
            </h2>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs font-sans uppercase tracking-wider transition-all shrink-0 cursor-pointer border ${
                  selectedCategory === cat.key
                    ? 'bg-[#C5A059] text-[#0C0C0B] border-[#C5A059] font-semibold'
                    : 'bg-[#171716] text-[#9B978F] border-[#262624] hover:border-[#C5A059] hover:text-[#F3F0EA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isSaved = savedIds.includes(project.id);

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-[#171716] border border-[#262624] flex flex-col justify-between hover:border-[#C5A059] transition-all duration-500 hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1D1C1A]">
                    <img
                      src={project.heroImage}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 brightness-90 group-hover:brightness-100"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#0C0C0B]/90 backdrop-blur-md px-3 py-1 text-[10px] font-sans uppercase tracking-widest text-[#F3F0EA] border border-[#262624]">
                        0{index + 1} · {project.city}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(project.id);
                        }}
                        className={`p-2 backdrop-blur-md border transition-colors pointer-events-auto cursor-pointer ${
                          isSaved
                            ? 'bg-[#C5A059] text-[#0C0C0B] border-[#C5A059]'
                            : 'bg-[#0C0C0B]/80 text-[#F3F0EA] border-[#262624] hover:border-[#C5A059]'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Residence'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Hover Quick View Button */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="px-5 py-2.5 bg-[#C5A059] text-[#0C0C0B] text-xs font-sans uppercase tracking-[0.2em] font-semibold shadow-xl pointer-events-auto cursor-pointer hover:bg-[#D4AF37] transition-colors"
                      >
                        View Residence Folio
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-sans text-[#C5A059] uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F3F0EA] group-hover:text-[#C5A059] transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-xs sm:text-sm font-sans text-[#9B978F] leading-relaxed line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Specs & Pricing Footer */}
                    <div className="pt-4 border-t border-[#262624] flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-sans uppercase tracking-wider text-[#9B978F]">
                          {project.configuration}
                        </div>
                        <div className="font-serif-luxury text-lg font-semibold text-[#F3F0EA] mt-0.5">
                          {project.priceFrom}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="group/btn flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] font-semibold text-[#F3F0EA] hover:text-[#C5A059] transition-colors cursor-pointer py-1"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
