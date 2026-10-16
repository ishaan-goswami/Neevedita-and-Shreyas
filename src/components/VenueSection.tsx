import React from 'react';
import { weddingConfig } from '../weddingConfig';
import { MandalaDivider } from './MandalaDivider';
import { MapPin, Plane, Hotel, Navigation } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const { venueOverview } = weddingConfig;

  return (
    <section id="venue" className="py-20 sm:py-28 px-4 bg-ivory-50 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            The Destination & Hospitality
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Venue & Travel Guide
          </h2>
          <MandalaDivider className="my-6" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif italic">
            "अतिथि देवो भव — To welcome you to our celebration is our highest honor."
          </p>
        </div>

        {/* Venue Information Card */}
        <div className="bg-ivory-100 rounded-2xl border border-gold/40 shadow-sm overflow-hidden mb-12">
          <div className="p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <span className="inline-flex p-3 rounded-full bg-sandstone/60 border border-gold/30 text-maroon mb-4">
              <MapPin className="w-6 h-6" />
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal mb-2">
              {venueOverview.name}
            </h3>

            <p className="text-sm sm:text-base text-gold-dark font-serif font-medium mb-4">
              {venueOverview.cityState}
            </p>

            <p className="text-xs sm:text-sm text-charcoal-light font-sans max-w-md mx-auto mb-8 leading-relaxed">
              {venueOverview.fullAddress}
            </p>

            <a
              href={venueOverview.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-maroon hover:bg-maroon-dark text-ivory-50 text-xs sm:text-sm font-medium tracking-wider uppercase shadow transition-all duration-200 border border-gold/30"
            >
              <Navigation className="w-4 h-4 text-gold" />
              <span>Get Google Maps Directions</span>
            </a>
          </div>

          {/* Travel & Stay Details Strip */}
          <div className="grid md:grid-cols-2 border-t border-gold/30 divide-y md:divide-y-0 md:divide-x divide-gold/30 bg-ivory-50/70">
            {/* Airport & Transit info */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-3 text-maroon">
                <Plane className="w-5 h-5 text-gold-dark" />
                <h4 className="font-serif text-lg font-semibold text-charcoal">
                  Nearby Airports & Transit
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal-light font-serif">
                {venueOverview.airportsNearby.map((airport, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>{airport}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accommodation Details */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-3 text-maroon">
                <Hotel className="w-5 h-5 text-gold-dark" />
                <h4 className="font-serif text-lg font-semibold text-charcoal">
                  Guest Accommodations & Stay
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed">
                {venueOverview.accommodationsNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
