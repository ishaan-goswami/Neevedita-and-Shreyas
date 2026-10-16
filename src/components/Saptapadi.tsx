import React from 'react';
import { weddingConfig } from '../weddingConfig';
import { MandalaDivider } from './MandalaDivider';
import { DiyaLamp } from './DiyaLamp';

export const Saptapadi: React.FC = () => {
  const { saptapadi } = weddingConfig;

  return (
    <section id="vows" className="py-20 sm:py-28 px-4 bg-ivory-100/70 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <DiyaLamp size={28} />
          </div>
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            The Vedic Vows Around Agni
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            The Seven Sacred Steps
          </h2>
          <MandalaDivider className="my-6" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif italic">
            "With each step around the holy fire, our minds, hearts, and destinies unite in timeless devotion."
          </p>
        </div>

        {/* 7 Steps Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saptapadi.map((vow) => (
            <div
              key={vow.step}
              className={`p-6 rounded-2xl bg-ivory-50 border border-gold/30 shadow-xs hover:border-gold/70 transition-all duration-300 flex flex-col justify-between ${
                vow.step === 7 ? 'sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-ivory-50 via-gold-light/10 to-ivory-50 border-gold/50' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center font-serif text-xs font-semibold text-maroon bg-ivory-100">
                    {vow.step}
                  </span>
                  <span className="text-xs font-serif text-gold-dark font-semibold tracking-wider">
                    Step {vow.step} of 7
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-semibold text-charcoal mb-1">
                  {vow.vowTitle}
                </h3>

                <p className="text-xs font-serif text-maroon font-medium shloka-text mb-3">
                  {vow.sanskrit}
                </p>

                <p className="text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed">
                  {vow.meaning}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-dashed border-gold/20 flex items-center justify-end">
                <span className="text-[10px] uppercase tracking-widest text-gold-dark font-medium">
                  {vow.step === 7 ? 'Eternal Unity' : 'Sacred Commitment'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
