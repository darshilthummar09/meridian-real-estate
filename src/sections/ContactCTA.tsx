import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, Phone, Mail, Clock } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interestedIn: 'The Grove Residences, Gurugram',
    timeline: 'Immediate (Within 30 Days)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 bg-[#080808] text-[#F3F0EA] relative overflow-hidden border-t border-[#262624]">
      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C5A059_1px,transparent_1px),linear-gradient(to_bottom,#C5A059_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Advisory Philosophy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#C5A059]" />
                <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
                  Private Client Advisory
                </span>
              </div>

              <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#F3F0EA] font-normal leading-[1.08]">
                Ready to find <br />
                <span className="italic font-cormorant text-[#C5A059]">your perfect home?</span>
              </h2>

              <p className="text-sm sm:text-base font-sans text-[#9B978F] leading-relaxed max-w-md pt-2">
                Tell us what you're looking for and our team will help you find a residence that feels right.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 pt-4 border-t border-[#262624]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xs bg-[#141413] border border-[#262624] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <div className="text-xs font-sans uppercase tracking-wider text-[#9B978F]">
                    Confidential Desk
                  </div>
                  <div className="text-sm font-sans font-medium text-[#F3F0EA] mt-0.5">
                    +91 (124) 490 8800
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xs bg-[#141413] border border-[#262624] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <div className="text-xs font-sans uppercase tracking-wider text-[#9B978F]">
                    Private Registrar
                  </div>
                  <div className="text-sm font-sans font-medium text-[#F3F0EA] mt-0.5">
                    advisory@meridianrealty.com
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xs bg-[#141413] border border-[#262624] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <div className="text-xs font-sans uppercase tracking-wider text-[#9B978F]">
                    Discretion Assured
                  </div>
                  <div className="text-xs font-sans text-[#777] mt-0.5">
                    All inquiries governed by strict non-disclosure agreements.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Contact Form */}
          <div className="lg:col-span-7 bg-[#141413] border border-[#262624] p-8 sm:p-12 shadow-2xl relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-[#C5A059]/10 border border-[#C5A059] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#F3F0EA]">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#9B978F] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. A dedicated Senior Private Client Director has been assigned to your brief and will connect with you discreetly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      interestedIn: 'The Grove Residences, Gurugram',
                      timeline: 'Immediate (Within 30 Days)',
                      message: '',
                    });
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#201F1D] border border-[#262624] text-xs font-sans uppercase tracking-widest text-[#F3F0EA] hover:border-[#C5A059] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rajan Malhotra"
                      className="w-full bg-[#0C0C0B] border border-[#262624] px-4 py-3 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-2">
                      Direct Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98100 12345"
                      className="w-full bg-[#0C0C0B] border border-[#262624] px-4 py-3 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rajan@malhotracapital.com"
                      className="w-full bg-[#0C0C0B] border border-[#262624] px-4 py-3 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Interested Property */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-2">
                      Interested In
                    </label>
                    <select
                      value={formData.interestedIn}
                      onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                      className="w-full bg-[#0C0C0B] border border-[#262624] px-4 py-3 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none transition-colors"
                    >
                      {PROJECTS.map((p) => (
                        <option key={p.id} value={`${p.name}, ${p.city}`}>
                          {p.name} ({p.city})
                        </option>
                      ))}
                      <option value="Destination Villas (Goa / Uttarakhand)">Destination & Nature Collection</option>
                      <option value="Bespoke Architectural Commission">Bespoke Architectural Commission</option>
                    </select>
                  </div>
                </div>

                {/* Timeline & Notes */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-2">
                    Acquisition Timeline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Immediate (<30d)', '3 to 6 Months', 'Future / Investment'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, timeline: t })}
                        className={`py-2 px-3 text-[11px] font-sans uppercase tracking-wider border transition-colors cursor-pointer ${
                          formData.timeline === t
                            ? 'bg-[#C5A059] text-[#0C0C0B] border-[#C5A059] font-medium'
                            : 'bg-[#0C0C0B] text-[#9B978F] border-[#262624] hover:border-[#C5A059]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-[#9B978F] mb-2">
                    Specific Spatial Requirements or Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="E.g., prefer higher floor plate with golf course orientation and dual master suites..."
                    className="w-full bg-[#0C0C0B] border border-[#262624] px-4 py-3 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#C5A059] text-[#0C0C0B] text-xs font-sans uppercase tracking-[0.22em] font-semibold hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-3 cursor-pointer group shadow-xl"
                >
                  <span>{loading ? 'Submitting Brief...' : 'Request a Callback'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
