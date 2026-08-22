import React from 'react';
import { ArrowUp, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/brand';
import { NAV_ITEMS, OFFICES, SOCIAL_LINKS } from '../data/navigation';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-[#EDE8DF] border-t border-[#262624] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Brand Statement & Back to Top */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-16 border-b border-[#262624] gap-8">
          <div className="max-w-xl space-y-4">
            <div className="flex flex-col">
              <span className="font-cinzel tracking-[0.28em] text-2xl font-bold text-[#F3F0EA]">
                {BRAND.name}
              </span>
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C5A059] mt-1">
                {BRAND.subTitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-[#9B978F] leading-relaxed pt-2">
              An atelier dedicated to creating private residential monuments, alpine sanctuaries, and coastal estates that stand as heirlooms of architectural art.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#9B978F] hover:text-[#C5A059] transition-colors self-start lg:self-auto py-2 group cursor-pointer"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A059] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Middle Tier: Global Presence & Nav Matrix */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-[#262624]">
          {/* Navigation Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#9B978F] hover:text-[#C5A059] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Atelier Offices */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              Global Regional Ateliers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
              {OFFICES.map((office) => (
                <div key={office.city} className="space-y-1">
                  <div className="text-[#F3F0EA] font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    <span>{office.city}</span>
                  </div>
                  <div className="text-[#888] text-[11px] leading-relaxed">
                    {office.address}
                  </div>
                  <div className="text-[#C5A059] text-[11px] pt-0.5 font-mono">
                    {office.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Socials & Registry */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              Dialogue & Media
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9B978F] hover:text-[#C5A059] transition-colors flex items-center justify-between group"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#262624] text-[11px] text-[#777]">
              <div>Direct Inquiries:</div>
              <a href="mailto:concierge@meridianrealty.com" className="text-[#C5A059] hover:underline">
                concierge@meridianrealty.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Legal & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-[#666] gap-4">
          <div>
            © {new Date().getFullYear()} MERIDIAN ATELIER & RESIDENCES. All architectural designs, photography & plans protected.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">RERA Disclaimer</span>
            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Terms of Confidentiality</span>
            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Cookie Preference</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
