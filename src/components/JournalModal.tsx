import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';
import { JournalArticle } from '../types';

interface JournalModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export default function JournalModal({ article, onClose }: JournalModalProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl bg-[#141413] text-[#F3F0EA] border border-[#262624] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-[#141413]/95 backdrop-blur-md border-b border-[#262624] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-sans text-[#C5A059] uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-[#201F1D] text-[#F3F0EA] hover:border-[#C5A059] transition-colors border border-[#262624] cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 md:p-10 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-sans text-[#9B978F]">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> {article.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#C5A059]" /> {article.readTime}</span>
              </div>
              <h1 className="font-serif-luxury text-2xl md:text-4xl text-[#F3F0EA] leading-tight">
                {article.title}
              </h1>
              <p className="font-cormorant italic text-lg text-[#9B978F]">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#262624]">
                <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#0C0C0B] flex items-center justify-center text-xs font-serif font-bold">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-sans font-medium text-[#F3F0EA]">{article.author}</div>
                  <div className="text-[11px] text-[#9B978F]">{article.authorRole}</div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="w-full aspect-[16/9] overflow-hidden border border-[#262624]">
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover brightness-95" />
            </div>

            {/* Quote */}
            {article.keyQuote && (
              <blockquote className="p-6 bg-[#1A1918] border-l-2 border-[#C5A059] font-serif-luxury italic text-lg md:text-xl text-[#EDE8DF]">
                {article.keyQuote}
              </blockquote>
            )}

            {/* Paragraphs */}
            <div className="space-y-5 text-sm md:text-base text-[#EDE8DF] leading-relaxed font-sans">
              {article.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-[#262624] flex items-center justify-between text-xs font-sans text-[#9B978F]">
              <span>Published by Meridian Editorial Atelier</span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard.");
                  }
                }}
                className="flex items-center gap-1.5 text-[#F3F0EA] hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Share Insight</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
