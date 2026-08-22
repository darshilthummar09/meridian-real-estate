import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Maximize2,
  Calendar,
  Compass,
  ArrowRight,
  Bookmark,
  Share2,
  CheckCircle,
  FileText,
  Shield,
  Sparkles,
  Waves,
  Wine,
  Trees,
  Coffee,
  Dumbbell,
  Anchor,
  Sun,
  Feather,
  Flame,
  Mountain
} from 'lucide-react';
import { Residence } from '../types';

interface PropertyDetailModalProps {
  residence: Residence | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (residenceId: string) => void;
  onRequestBrochure: (residence: Residence) => void;
}

export default function PropertyDetailModal({
  residence,
  onClose,
  isSaved,
  onToggleSave,
  onRequestBrochure,
}: PropertyDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    privateNotes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!residence) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-5 h-5 text-[#A38259]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#A38259]" />;
      case 'Wine': return <Wine className="w-5 h-5 text-[#A38259]" />;
      case 'Trees': return <Trees className="w-5 h-5 text-[#A38259]" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-[#A38259]" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-[#A38259]" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-[#A38259]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#A38259]" />;
      case 'Feather': return <Feather className="w-5 h-5 text-[#A38259]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#A38259]" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-[#A38259]" />;
      default: return <Shield className="w-5 h-5 text-[#A38259]" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl bg-[#141413] text-[#F3F0EA] border border-[#262624] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-30 bg-[#141413]/95 backdrop-blur-md border-b border-[#262624] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#9B978F]">
                {residence.city} · {residence.country}
              </span>
              <span className="text-[#262624]">|</span>
              <span className="text-[12px] font-sans font-medium text-[#C5A059] uppercase tracking-wider">
                {residence.configuration}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleSave(residence.id)}
                className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider cursor-pointer ${
                  isSaved
                    ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                    : 'border-[#262624] text-[#9B978F] hover:text-[#F3F0EA] hover:border-[#C5A059]'
                }`}
                title="Save Residence"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#C5A059]' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => onRequestBrochure(residence)}
                className="p-2 border border-[#262624] text-[#9B978F] hover:text-[#F3F0EA] hover:border-[#C5A059] transition-colors flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Brochure</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 border border-[#262624] bg-[#201F1D] text-[#F3F0EA] hover:border-[#C5A059] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Modal Body */}
          <div className="overflow-y-auto p-6 md:p-10 space-y-12">
            {/* Header Title & Pricing */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#262624]">
              <div>
                <div className="text-xs font-sans tracking-[0.2em] text-[#C5A059] uppercase mb-2">
                  Architectural Portfolio
                </div>
                <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#F3F0EA] leading-tight">
                  {residence.name}
                </h2>
                <p className="font-cormorant italic text-lg md:text-xl text-[#9B978F] mt-1">
                  {residence.tagline}
                </p>
                <div className="flex items-center gap-2 text-xs font-sans text-[#9B978F] mt-3">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{residence.location}</span>
                </div>
              </div>

              <div className="md:text-right">
                <div className="text-[11px] font-sans uppercase tracking-widest text-[#9B978F]">
                  Starting Acquisition
                </div>
                <div className="font-serif-luxury text-2xl md:text-3xl text-[#F3F0EA] font-semibold mt-1">
                  {residence.priceFrom}
                </div>
                <div className="text-xs font-sans text-[#C5A059] mt-0.5">
                  {residence.areaSqFt}
                </div>
              </div>
            </div>

            {/* Gallery Viewfinder */}
            <div>
              <div className="relative aspect-[16/9] w-full bg-[#1D1C1A] overflow-hidden border border-[#262624]">
                <img
                  src={residence.gallery[activeImageIndex] || residence.heroImage}
                  alt={residence.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 brightness-90 hover:brightness-100"
                />
                <div className="absolute bottom-4 right-4 bg-[#0C0C0B]/90 backdrop-blur-md px-3 py-1 text-xs text-[#F3F0EA] font-sans tracking-widest uppercase border border-[#262624]">
                  Image {activeImageIndex + 1} of {residence.gallery.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-2 hide-scrollbar">
                {residence.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 md:w-28 aspect-[16/10] shrink-0 border overflow-hidden transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]'
                        : 'border-[#262624] opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Overview & Architectural Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] mb-3">
                    Spatial Narrative
                  </h3>
                  <p className="text-base text-[#F3F0EA] leading-relaxed">
                    {residence.overview}
                  </p>
                </div>

                <div className="p-6 bg-[#1A1918] border-l-2 border-[#C5A059] italic font-serif-luxury text-lg text-[#EDE8DF]">
                  {residence.editorialQuote}
                </div>

                <div>
                  <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#F3F0EA] mb-2 font-medium">
                    Architectural Intent
                  </h4>
                  <p className="text-sm text-[#9B978F] leading-relaxed">
                    {residence.architecturalPhilosophy}
                  </p>
                </div>

                {/* Key Features Bullet Points */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-[#F3F0EA] font-medium mb-3">
                    Distinctive Elements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {residence.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-sans text-[#F3F0EA]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specifications & Architects Sidebar */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#181716] p-6 border border-[#262624]">
                  <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#F3F0EA] font-semibold mb-4 pb-2 border-b border-[#262624]">
                    Specifications Matrix
                  </h3>
                  <dl className="space-y-3 text-xs font-sans">
                    {residence.specifications.map((spec, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-[#262624]">
                        <dt className="text-[#9B978F]">{spec.label}</dt>
                        <dd className="text-[#F3F0EA] font-medium text-right">{spec.value}</dd>
                      </div>
                    ))}
                    <div className="flex justify-between py-1.5 border-b border-[#262624]">
                      <dt className="text-[#9B978F]">Master Architect</dt>
                      <dd className="text-[#F3F0EA] font-medium">{residence.architect}</dd>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <dt className="text-[#9B978F]">Estimated Handover</dt>
                      <dd className="text-[#C5A059] font-medium">{residence.completionYear}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Curated Amenities */}
            <div className="pt-6 border-t border-[#262624]">
              <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] mb-2">
                Privileged Living
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#F3F0EA] mb-6">
                Dedicated Amenities & Private Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {residence.amenities.map((amenity, i) => (
                  <div key={i} className="p-5 border border-[#262624] bg-[#181716] space-y-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#201F1D] border border-[#262624]">
                      {getAmenityIcon(amenity.iconName)}
                    </div>
                    <h4 className="font-serif-luxury text-base font-semibold text-[#F3F0EA] pt-1">
                      {amenity.title}
                    </h4>
                    <p className="text-xs text-[#9B978F] leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Connectivity & Strategic Position */}
            <div className="pt-6 border-t border-[#262624]">
              <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] mb-2">
                Strategic Accessibility
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#F3F0EA] mb-6">
                Connectivity & Proximities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {residence.connectivity.map((conn, idx) => (
                  <div key={idx} className="p-4 border border-[#262624] bg-[#181716] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-sans font-medium text-[#F3F0EA]">{conn.destination}</div>
                      <div className="text-[11px] text-[#9B978F] mt-0.5">{conn.distance}</div>
                    </div>
                    <div className="font-serif-luxury text-lg text-[#C5A059] font-bold">
                      {conn.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Private Viewing Form */}
            <div className="pt-6 border-t border-[#262624] bg-[#0C0C0B] text-[#F3F0EA] p-6 md:p-10 -mx-6 md:-mx-10 -mb-6 md:-mb-10">
              <div className="max-w-2xl">
                <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] mb-2">
                  Confidential Concierge
                </div>
                <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#F3F0EA] mb-2">
                  Request a Private On-Site or Virtual Walkthrough
                </h3>
                <p className="text-xs text-[#9B978F] leading-relaxed mb-6 font-sans">
                  Our private client advisory team conducts by-appointment personal tours of {residence.name}.
                </p>

                {submitted ? (
                  <div className="p-6 border border-[#C5A059] bg-[#C5A059]/10 text-[#F3F0EA] flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#C5A059] shrink-0" />
                    <div>
                      <div className="font-serif-luxury text-lg font-medium text-[#F3F0EA]">
                        Viewing Request Registered
                      </div>
                      <p className="text-xs text-[#9B978F] mt-1 font-sans">
                        Thank you. Your personal estate advisor will connect with you within 2 hours to confirm your scheduled walkthrough of {residence.name}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className="w-full bg-[#181716] border border-[#262624] px-3.5 py-2.5 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none"
                          placeholder="Lord / Lady / Mr / Ms..."
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-1">
                          Direct Contact / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full bg-[#181716] border border-[#262624] px-3.5 py-2.5 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          className="w-full bg-[#181716] border border-[#262624] px-3.5 py-2.5 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none"
                          placeholder="client@domain.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={bookingForm.preferredDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                          className="w-full bg-[#181716] border border-[#262624] px-3.5 py-2.5 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A059] text-[#0C0C0B] font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Confirm Private Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
