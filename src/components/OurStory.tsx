import React from 'react';
import { weddingConfig } from '../weddingConfig';
import { MandalaDivider } from './MandalaDivider';
import { Sparkles, Flower2 } from 'lucide-react';

export const OurStory: React.FC = () => {
  const { couple, ourStory } = weddingConfig;

  return (
    <section id="story" className="py-20 sm:py-28 px-4 bg-ivory-100/60 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            Two Families, One Union
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Our Story & Heritage
          </h2>
          <MandalaDivider className="my-6" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif italic">
            "{ourStory.subtitle}"
          </p>
        </div>

        {/* Family Blessings & Pedigree Cards (Bride & Groom) */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Groom's Family Card */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-ivory-50 border border-gold/30 shadow-sm hover:border-gold/60 transition-all duration-300">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="inline-block p-1.5 rounded-full bg-sandstone/50 border border-gold/40 text-gold-deep">
                <Flower2 className="w-4 h-4" />
              </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-maroon font-semibold mb-1">
              The Groom
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-charcoal mb-4">
              {couple.groom.fullName}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed border-t border-gold/20 pt-4">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-gold-dark font-sans font-semibold">
                  Beloved Son of
                </span>
                <p className="text-charcoal font-medium text-sm sm:text-base">
                  {couple.groom.parents}
                </p>
              </div>

              {couple.groom.grandparents && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-gold-dark font-sans font-semibold">
                    Ancestral Blessings
                  </span>
                  <p className="italic text-charcoal-light">
                    {couple.groom.grandparents}
                  </p>
                </div>
              )}

              <div>
                <span className="block text-[11px] uppercase tracking-wider text-gold-dark font-sans font-semibold">
                  Hometown
                </span>
                <p className="text-charcoal">
                  {couple.groom.hometown}
                </p>
              </div>

              {couple.groom.bio && (
                <p className="pt-2 text-charcoal/80 text-xs italic border-t border-dashed border-gold/20">
                  {couple.groom.bio}
                </p>
              )}
            </div>
          </div>

          {/* Bride's Family Card */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-ivory-50 border border-gold/30 shadow-sm hover:border-gold/60 transition-all duration-300">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="inline-block p-1.5 rounded-full bg-sandstone/50 border border-gold/40 text-gold-deep">
                <Flower2 className="w-4 h-4" />
              </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-maroon font-semibold mb-1">
              The Bride
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-charcoal mb-4">
              {couple.bride.fullName}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed border-t border-gold/20 pt-4">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-gold-dark font-sans font-semibold">
                  Beloved Daughter of
                </span>
                <p className="text-charcoal font-medium text-sm sm:text-base">
                  {couple.bride.parents}
                </p>
              </div>

              {couple.bride.grandparents && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-gold-dark font-sans font-semibold">
                    Ancestral Blessings
                  </span>
                  <p className="italic text-charcoal-light">
                    {couple.bride.grandparents}
                  </p>
                </div>
              )}

              <div>
                <span className="block text-[11px] uppercase tracking-wider text-gold-dark font-sans font-semibold">
                  Hometown
                </span>
                <p className="text-charcoal">
                  {couple.bride.hometown}
                </p>
              </div>

              {couple.bride.bio && (
                <p className="pt-2 text-charcoal/80 text-xs italic border-t border-dashed border-gold/20">
                  {couple.bride.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Narrative Paragraphs */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-20">
          {ourStory.paragraphs.map((p, index) => (
            <p
              key={index}
              className="text-base sm:text-lg font-serif text-charcoal-light leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Timeline Milestones */}
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-6 sm:pl-8 border-l border-gold/40 space-y-10 my-8">
            {ourStory.milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-gold bg-ivory-50 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-maroon" />
                </div>

                <div className="bg-ivory-50/70 p-4 sm:p-5 rounded-xl border border-gold/20 hover:border-gold/50 shadow-sm transition-all duration-300">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark flex items-center space-x-1 mb-1">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span>{milestone.year}</span>
                  </span>
                  <h4 className="text-lg sm:text-xl font-serif text-charcoal font-medium mb-1">
                    {milestone.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
