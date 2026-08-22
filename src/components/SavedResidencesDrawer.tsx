import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { Residence } from '../types';

interface SavedResidencesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedResidences: Residence[];
  onRemove: (id: string) => void;
  onSelect: (residence: Residence) => void;
}

export default function SavedResidencesDrawer({
  isOpen,
  onClose,
  savedResidences,
  onRemove,
  onSelect,
}: SavedResidencesDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-[#141413] border-l border-[#262624] h-full flex flex-col shadow-2xl text-[#F3F0EA]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#262624] flex items-center justify-between bg-[#141413]">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#C5A059] fill-current" />
              <h3 className="font-serif-luxury text-xl text-[#F3F0EA]">
                Curated Collection
              </h3>
              <span className="text-xs font-sans px-2 py-0.5 bg-[#201F1D] text-[#C5A059] border border-[#262624] rounded-full">
                {savedResidences.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#9B978F] hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedResidences.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Bookmark className="w-8 h-8 text-[#444] mx-auto" />
                <p className="font-serif-luxury text-lg text-[#F3F0EA]">
                  No saved residences yet
                </p>
                <p className="text-xs text-[#9B978F] max-w-xs mx-auto">
                  Click the bookmark icon on any residence to curate your private shortlist.
                </p>
              </div>
            ) : (
              savedResidences.map((res) => (
                <div
                  key={res.id}
                  className="group relative border border-[#262624] bg-[#181716] p-3 flex gap-3 hover:border-[#C5A059] transition-colors"
                >
                  <div className="w-24 h-20 bg-[#1D1C1A] overflow-hidden shrink-0 border border-[#262624]">
                    <img
                      src={res.heroImage}
                      alt={res.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-luxury text-sm text-[#F3F0EA] truncate">
                        {res.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-[#9B978F] mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-[#C5A059]" />
                        <span className="truncate">{res.location}</span>
                      </div>
                      <div className="text-xs font-serif-luxury font-semibold text-[#C5A059] mt-1">
                        {res.priceFrom}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#262624]">
                      <button
                        onClick={() => {
                          onSelect(res);
                          onClose();
                        }}
                        className="text-[11px] font-sans uppercase tracking-wider text-[#EDE8DF] hover:text-[#C5A059] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Portfolio</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={() => onRemove(res.id)}
                        className="text-[#777] hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          {savedResidences.length > 0 && (
            <div className="p-6 border-t border-[#262624] bg-[#0C0C0B] space-y-2">
              <a
                href="#contact"
                onClick={onClose}
                className="w-full py-3 bg-[#C5A059] text-[#0C0C0B] text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
              >
                <span>Inquire For All Saved ({savedResidences.length})</span>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
