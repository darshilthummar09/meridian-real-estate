import React from 'react';
import { motion } from 'motion/react';
import { Layers, ShieldCheck, Compass, Sparkles, Box } from 'lucide-react';
import Architectural3D from '../components/Architectural3D';

export default function ArchitecturalVision() {
  return (
    <section id="architecture-3d" className="py-28 sm:py-36 bg-[#0C0C0B] border-b border-[#262624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Rationale */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
                Structural Geometry
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F3F0EA] leading-tight font-normal">
              Form Follows <br />
              <span className="italic font-cormorant text-[#C5A059]">The Path of Light</span>
            </h2>

            <p className="text-sm font-sans text-[#9B978F] leading-relaxed">
              Our residential floor plates are sculpted mathematically using solar vector models. Cantilevered floor slabs act as natural brise-soleil sunshades, eliminating excessive heat gain while preserving unobstructed 270-degree horizons.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 border border-[#262624] bg-[#161514] flex items-start gap-3">
                <Box className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-[#F3F0EA]">
                    Monolithic Shear Walls
                  </h4>
                  <p className="text-xs font-sans text-[#9B978F] mt-1">
                    Post-tensioned architectural cores that eliminate internal load-bearing walls for total spatial flexibility.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-[#262624] bg-[#161514] flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-[#F3F0EA]">
                    Biophilic Cross-Ventilation
                  </h4>
                  <p className="text-xs font-sans text-[#9B978F] mt-1">
                    Dual-aspect living salons oriented to capture evening coastal or alpine downdrafts naturally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Massing Scene */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
            >
              <Architectural3D interactive={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
