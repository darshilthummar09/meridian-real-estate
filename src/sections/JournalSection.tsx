import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalArticle } from '../types';

interface JournalSectionProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export default function JournalSection({ onSelectArticle }: JournalSectionProps) {
  return (
    <section id="journal" className="py-28 sm:py-36 bg-[#0C0C0B] border-b border-[#262624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#262624]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-sans tracking-[0.25em] text-[#C5A059] uppercase font-medium">
                The Atelier Journal
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#F3F0EA] font-normal">
              Insights & Stories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9B978F] font-sans max-w-sm mt-4 md:mt-0">
            Critical essays on residential theory, noble materiality, and the evolving paradigm of private sanctuaries.
          </p>
        </div>

        {/* 3 Editorial Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {JOURNAL_ARTICLES.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer flex flex-col justify-between space-y-6 bg-[#161514] border border-[#262624] p-6 hover:border-[#C5A059] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-4">
                {/* Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1D1C1A] border border-[#262624]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute top-3 left-3 bg-[#0C0C0B]/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-widest text-[#F3F0EA] border border-[#262624]">
                    {article.category}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-[11px] font-sans text-[#9B978F]">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Article Headline */}
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F3F0EA] group-hover:text-[#C5A059] transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm font-sans text-[#9B978F] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#262624] flex items-center justify-between">
                <span className="text-xs font-sans text-[#EDE8DF] font-medium">By {article.author}</span>
                <div className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#C5A059] font-medium group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
