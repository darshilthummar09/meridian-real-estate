import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Plane, Navigation, Building2, Trees, Shield, Sparkles } from 'lucide-react';

export default function LocationConnectivity() {
  const [activeHub, setActiveHub] = useState<string>('connectivity');

  const hubData = {
    location: {
      title: "Strategic Prime Corridors",
      description: "Carefully acquired parcels positioned along master-planned green corridors, ensuring low ambient noise, pristine air indexes, and unencumbered natural vistas.",
      bullets: [
        "Direct frontage to championship 18-hole golf courses",
        "Buffered by designated forest and Aravali sanctuary ridges",
        "Underground master utility infrastructure and optic corridors"
      ]
    },
    connectivity: {
      title: "Effortless Transit & Helipad Access",
      description: "Designed for international executives and frequent travelers, with high-speed arterial connections and dedicated private aviation terminals.",
      bullets: [
        "18 minutes to Indira Gandhi International Airport (T3)",
        "10 minutes to Cyber Hub & Horizon Financial Boulevard",
        "Direct regional helicopter landing pad clearance"
      ]
    },
    community: {
      title: "A Gated Sovereign Enclave",
      description: "A sanctuary shared exclusively with like-minded patrons, industrial leaders, diplomats, and celebrated patrons of the arts.",
      bullets: [
        "Private members clubhouses with Michelin-standard culinary salons",
        "Discreet private security details and biometric security zones",
        "Private library, sommelier vault, and cigar lounges"
      ]
    },
    lifestyle: {
      title: "Holistic Wellness & Culture",
      description: "Integrated wellness and leisure spaces that ensure every daily ritual—from morning meditation to evening social galas—is met with perfection.",
      bullets: [
        "Hydrotherapy pavilions, Olympic-length ozone pools",
        "Private equestrian links & tennis lawns nearby",
        "Curated art galleries and private outdoor sculpture gardens"
      ]
    }
  };

  return (
    <section className="py-28 sm:py-36 bg-[#0C0C0B] border-b border-[#262624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
            Strategic Topology
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#F3F0EA] mt-2 font-normal leading-tight">
            Where Life Falls <br />
            <span className="italic font-cormorant text-[#C5A059]">Perfectly Into Place</span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#9B978F] mt-4">
            Uncompromising access to international aviation hubs, financial epicenters, and pristine natural sanctuaries.
          </p>
        </div>

        {/* Minimalist Architectural Map & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Architectural Blueprint Map Visual */}
          <div className="lg:col-span-7 relative aspect-[16/11] bg-[#141413] border border-[#262624] p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Simulated Architectural Contour & Road Lines */}
            <svg className="absolute inset-0 w-full h-full stroke-[#C5A059]/30 fill-none" viewBox="0 0 600 400">
              <path d="M0,80 Q200,60 350,140 T600,200" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M50,400 Q180,260 320,240 T550,60" strokeWidth="2" stroke="#C5A059" strokeOpacity="0.5" />
              <path d="M120,0 Q240,180 400,280 T600,380" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="320" cy="240" r="48" className="stroke-[#C5A059]/40" strokeWidth="1" />
              <circle cx="320" cy="240" r="110" className="stroke-[#C5A059]/20" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Interactive Pulse Points */}
            <div className="absolute top-[60%] left-[53%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#C5A059] opacity-40" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C5A059] border-2 border-[#0C0C0B]" />
              </div>
              <div className="mt-2 bg-[#0C0C0B] text-[#F3F0EA] border border-[#262624] px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-widest whitespace-nowrap shadow-lg">
                Meridian Master Enclave
              </div>
            </div>

            {/* Surrounding Landmark Nodes */}
            <div className="absolute top-[22%] right-[15%] z-10 text-right">
              <div className="flex items-center gap-1.5 justify-end text-[11px] font-sans font-medium text-[#F3F0EA]">
                <Plane className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Intl. Airport T3 (18m)</span>
              </div>
              <span className="text-[10px] text-[#9B978F]">Direct High-Speed Corridor</span>
            </div>

            <div className="absolute bottom-[18%] left-[12%] z-10">
              <div className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-[#F3F0EA]">
                <Trees className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Aravali Biodiversity (12m)</span>
              </div>
              <span className="text-[10px] text-[#9B978F]">Protected Green Canopy</span>
            </div>

            {/* Bottom Meta */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-sans uppercase tracking-widest text-[#9B978F]">
              <span>Cartographic Scale 1:25000</span>
              <span>All Arterial Connections Active</span>
            </div>
          </div>

          {/* Right Information Blocks Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {(['connectivity', 'location', 'community', 'lifestyle'] as const).map((key) => {
              const isActive = activeHub === key;
              const data = hubData[key];

              return (
                <div
                  key={key}
                  onClick={() => setActiveHub(key)}
                  className={`p-6 border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#171716] border-[#C5A059] shadow-lg'
                      : 'bg-[#141413] border-[#262624] hover:border-[#444]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                      {key.toUpperCase()}
                    </span>
                    <span className="text-xs font-sans text-[#9B978F]">0{key === 'connectivity' ? '1' : key === 'location' ? '2' : key === 'community' ? '3' : '4'}</span>
                  </div>

                  <h3 className="font-serif-luxury text-xl text-[#F3F0EA] mt-1">
                    {data.title}
                  </h3>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-3 pt-3 border-t border-[#262624]"
                    >
                      <p className="text-xs font-sans text-[#9B978F] leading-relaxed">
                        {data.description}
                      </p>
                      <ul className="space-y-1.5 text-xs font-sans text-[#F3F0EA]">
                        {data.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
