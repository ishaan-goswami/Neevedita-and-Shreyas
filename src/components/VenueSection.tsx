import React from 'react';
import { weddingConfig } from '../weddingConfig';
import { MandalaDivider } from './MandalaDivider';
import { Hotel, Navigation, Sparkles } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const { venuesList, venueOverview } = weddingConfig;

  return (
    <section id="overview" className="py-16 sm:py-24 px-4 bg-ivory-100/60 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            Atlanta, Georgia Venues & Travel
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Celebration Venues & Directions
          </h2>
          <MandalaDivider className="my-5" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif italic">
            "We look forward to welcoming you to our wedding celebrations in Greater Atlanta."
          </p>
        </div>

        {/* 3 Main Celebration Venues Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {venuesList.map((v, i) => (
            <div
              key={i}
              className="bg-ivory-50 rounded-2xl border border-gold/35 shadow-xs hover:border-gold/70 transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-sandstone/60 border border-gold/30 text-maroon text-[10px] font-semibold uppercase tracking-wider mb-3">
                  {v.role}
                </span>

                <h3 className="text-xl font-serif text-charcoal font-normal mb-2">
                  {v.name}
                </h3>

                <p className="text-xs text-charcoal-light font-sans mb-3 leading-relaxed">
                  {v.address}
                </p>

                {v.note && (
                  <p className="text-xs text-gold-dark font-serif italic mb-5">
                    {v.note}
                  </p>
                )}
              </div>

              <a
                href={v.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-ivory-100 hover:bg-gold-light/30 border border-gold/40 text-xs text-charcoal font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-maroon" />
                <span>Google Maps</span>
              </a>
            </div>
          ))}
        </div>

        {/* Accommodations & Guest Info Card */}
        <div className="bg-ivory-50 rounded-2xl border border-gold/40 p-6 sm:p-8 shadow-xs">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-sandstone/60 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Hotel className="w-5 h-5 text-maroon" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-semibold text-charcoal flex items-center space-x-1.5">
                <span>Guest Accommodations & Stay</span>
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              </h4>
              <p className="text-xs sm:text-sm text-charcoal font-medium">
                {venueOverview.name} • {venueOverview.fullAddress}
              </p>
              <p className="text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed pt-1">
                {venueOverview.accommodationsNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
