import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Residence } from '../types';

interface BrochureModalProps {
  residence: Residence | null;
  onClose: () => void;
}

export default function BrochureModal({ residence, onClose }: BrochureModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!residence) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloaded(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#141413] border border-[#262624] p-6 md:p-8 shadow-2xl text-[#F3F0EA]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#9B978F] hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Architectural Monograph</span>
          </div>

          <h3 className="font-serif-luxury text-2xl text-[#F3F0EA] mb-1">
            {residence.name}
          </h3>
          <p className="text-xs text-[#9B978F] font-sans mb-6">
            Complete 36-page folio including engineering blueprints, high-resolution renders, and private pricing schedule.
          </p>

          {isDownloaded ? (
            <div className="p-5 border border-[#C5A059] bg-[#C5A059]/10 text-[#F3F0EA] space-y-3">
              <div className="flex items-center gap-2 text-[#C5A059] font-medium text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Monograph Dispatch Initiated</span>
              </div>
              <p className="text-xs text-[#9B978F] leading-relaxed">
                A secure encrypted digital folio has been transmitted to <strong>{email}</strong>. Our senior registrar will also provide you access to the confidential master plan.
              </p>
              <button
                onClick={onClose}
                className="w-full mt-2 py-2.5 bg-[#C5A059] text-[#0C0C0B] text-xs font-sans uppercase tracking-widest hover:bg-[#D4AF37] transition-colors font-semibold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#9B978F] mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181716] border border-[#262624] px-3.5 py-2 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#9B978F] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181716] border border-[#262624] px-3.5 py-2 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none"
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#9B978F] mb-1">
                  Mobile / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181716] border border-[#262624] px-3.5 py-2 text-xs text-[#F3F0EA] focus:border-[#C5A059] focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] text-[#0C0C0B] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Curated Folio (PDF)</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
