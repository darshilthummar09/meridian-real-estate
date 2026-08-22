import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Bookmark, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, OFFICES } from '../data/navigation';
import { BRAND } from '../data/brand';

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenContact: () => void;
}

export default function Navbar({
  savedCount,
  onOpenSaved,
  onOpenContact,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroTrack = document.getElementById('hero-genesis-track');
      if (heroTrack) {
        const heroBottom = heroTrack.offsetTop + heroTrack.offsetHeight - 80;
        setIsScrolled(window.scrollY >= heroBottom);
      } else {
        setIsScrolled(window.scrollY > 40);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0C0C0B]/95 backdrop-blur-md border-b border-[#262624] py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0C0C0B]/90 via-[#0C0C0B]/30 to-transparent py-4'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Identity / Logo */}
          <a
            href="#"
            className="group flex flex-col items-start focus:outline-none shrink-0"
            aria-label="Meridian Luxury Real Estate Home"
          >
            <span className="font-cinzel tracking-[0.22em] text-base sm:text-lg lg:text-xl font-bold text-[#F3F0EA] group-hover:text-[#C5A059] transition-colors duration-300">
              {BRAND.name}
            </span>
            <span className="font-sans text-[8px] sm:text-[8.5px] tracking-[0.28em] uppercase text-[#C5A059] transition-colors duration-300">
              {BRAND.subTitle}
            </span>
          </a>

          {/* Core Desktop Navigation Links - Shown only on ultra-wide screens to prevent clipping */}
          <nav className="hidden 2xl:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-sans uppercase tracking-[0.16em] transition-all relative py-1 group text-[#9B978F] hover:text-[#F3F0EA]"
              >
                <span>{item.label}</span>
                {item.tag && (
                  <span className="ml-1 px-1.5 py-0.2 text-[8px] bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] font-semibold">
                    {item.tag}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full bg-[#C5A059]" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls - Guaranteed Never to Cut Off */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Curated Shortlist / Saved */}
            <button
              onClick={onOpenSaved}
              className="relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 border border-[#262624] bg-[#141413]/90 hover:border-[#C5A059] text-[#F3F0EA] transition-all flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider cursor-pointer shrink-0"
              aria-label="View saved residences"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-current text-[#C5A059]' : 'text-[#C5A059]'}`} />
              <span className="font-medium">Saved</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#C5A059] text-[#0C0C0B] text-[9px] sm:text-[10px] font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Inquire CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.14em] font-semibold transition-all bg-[#C5A059] text-[#0C0C0B] hover:bg-[#D4AF37] shadow-md shrink-0 whitespace-nowrap"
            >
              <span>Private Inquiries</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile / Fullscreen Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 sm:p-2 border border-[#262624] bg-[#141413]/90 hover:border-[#C5A059] text-[#F3F0EA] hover:text-[#C5A059] transition-colors cursor-pointer shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Compact Luxury Menu Drawer (Right-Aligned Side Panel) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            />

            {/* Compact Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm sm:max-w-md bg-[#10100F] border-l border-[#262624] text-[#F3F0EA] flex flex-col justify-between p-6 sm:p-7 shadow-2xl overflow-y-auto"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#262624]">
                <div className="flex flex-col">
                  <span className="font-cinzel tracking-[0.22em] text-base font-bold text-[#F3F0EA]">
                    {BRAND.name}
                  </span>
                  <span className="font-sans text-[8px] tracking-[0.28em] uppercase text-[#C5A059]">
                    {BRAND.subTitle}
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 border border-[#262624] bg-[#171716] text-[#9B978F] hover:text-[#F3F0EA] hover:border-[#C5A059] transition-colors cursor-pointer"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-4 space-y-1 my-auto">
                <div className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-3">
                  Atelier Directory
                </div>
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.25 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-base sm:text-lg font-serif-luxury text-[#EDE8DF] hover:text-[#C5A059] transition-colors py-2 px-2 rounded-xs hover:bg-[#181716] border-b border-[#262624]/40"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.tag && (
                          <span className="text-[9px] font-sans px-1.5 py-0.2 bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] uppercase font-semibold">
                            {item.tag}
                          </span>
                        )}
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#666] group-hover:text-[#C5A059] group-hover:rotate-45 transition-all" />
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Concierge & Quick Inquiries */}
              <div className="pt-4 border-t border-[#262624] space-y-3.5">
                <div className="p-3 bg-[#141413] border border-[#262624] space-y-1.5 text-xs font-sans">
                  <div className="text-[10px] uppercase tracking-wider text-[#C5A059] font-medium">
                    Private Concierge
                  </div>
                  <div className="text-[#EDE8DF] text-[11px]">
                    Direct: <span className="text-[#C5A059]">+91 (124) 490 8800</span>
                  </div>
                  <div className="text-[#EDE8DF] text-[11px]">
                    Email: <span className="text-[#C5A059]">atelier@meridianrealty.com</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-[#C5A059] text-[#0C0C0B] font-sans text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#D4AF37] transition-colors shadow-md"
                >
                  <span>Request Private Dossier</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <div className="text-center text-[10px] font-sans text-[#666]">
                  © {new Date().getFullYear()} MERIDIAN ATELIER & RESIDENCES
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
