import React from 'react';
import { weddingConfig } from '../weddingConfig';
import { TempleSilhouette } from './TempleSilhouette';
import { GaneshaEmblem } from './GaneshaEmblem';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-ivory-50 via-sandstone/40 to-ivory-200/90 pt-16 pb-12 overflow-hidden border-t border-gold/30">
      {/* Temple Silhouette skyline in the footer */}
      <div className="w-full mb-8">
        <TempleSilhouette className="h-20 sm:h-28" opacity={0.25} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Emblem */}
        <div className="mb-4 flex justify-center">
          <GaneshaEmblem size={44} />
        </div>

        {/* Shanti Mantra */}
        <div className="space-y-1 mb-6">
          <p className="text-maroon font-serif text-base sm:text-lg tracking-widest font-semibold shloka-text">
            || सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ||
          </p>
          <p className="text-xs text-gold-dark font-serif italic">
            "May all beings everywhere be happy, healthy, and blessed with peace."
          </p>
        </div>

        {/* Names & Families gratitude */}
        <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal mb-2">
          {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
        </h3>

        <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-4">
          With Love & Gratitude From Both Families
        </p>

        <p className="text-xs font-serif italic text-charcoal-light max-w-md mx-auto mb-8">
          {weddingConfig.couple.groom.parents} & {weddingConfig.couple.bride.parents}
        </p>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll back to top"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-gold/40 bg-ivory-50 hover:bg-gold-light/20 text-xs font-serif tracking-wider uppercase text-charcoal-light hover:text-maroon transition-colors mb-8"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        {/* Copyright / Attribution */}
        <div className="border-t border-gold/20 pt-6 text-[11px] text-charcoal-light font-sans flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            {weddingConfig.displayDateText}
          </p>
          <p className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-vermilion fill-vermilion inline" />
            <span>for our wedding celebration</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
