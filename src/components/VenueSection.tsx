import React from 'react';
import { weddingConfig } from '../weddingConfig';
import { MandalaDivider } from './MandalaDivider';
import { MapPin, Hotel, Navigation, Sparkles } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const { venueOverview } = weddingConfig;

  return (
    <section id="overview" className="py-16 sm:py-24 px-4 bg-ivory-100/60 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            Venue & Guest Arrangements
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Celebration Venue & Directions
          </h2>
          <MandalaDivider className="my-5" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif italic">
            "It is our highest honor and joy to welcome you and celebrate together."
          </p>
        </div>

        {/* Venue Information Card */}
        <div className="bg-ivory-50 rounded-2xl border border-gold/40 shadow-sm overflow-hidden mb-8">
          <div className="p-8 sm:p-10 text-center max-w-2xl mx-auto">
            <span className="inline-flex p-3 rounded-full bg-sandstone/60 border border-gold/30 text-maroon mb-3">
              <MapPin className="w-6 h-6" />
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal mb-2">
              {venueOverview.name}
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-light font-sans max-w-md mx-auto mb-6 leading-relaxed">
              {venueOverview.fullAddress}
            </p>

            <a
              href={venueOverview.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-maroon hover:bg-maroon-dark text-ivory-50 text-xs sm:text-sm font-medium tracking-wider uppercase shadow transition-all duration-200 border border-gold/30"
            >
              <Navigation className="w-4 h-4 text-gold" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Hospitality & Stay Details */}
          <div className="border-t border-gold/30 p-6 sm:p-8 bg-ivory-100/50">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-full bg-ivory-50 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Hotel className="w-4 h-4 text-maroon" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-semibold text-charcoal flex items-center space-x-1.5">
                  <span>Guest Hospitality & Parking</span>
                  <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed">
                  {venueOverview.accommodationsNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
