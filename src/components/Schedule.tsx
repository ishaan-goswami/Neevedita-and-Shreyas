import React from 'react';
import { weddingConfig, WeddingEvent } from '../weddingConfig';
import { MandalaDivider } from './MandalaDivider';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Sun,
  Flame,
  Music,
  Sparkles,
  Heart,
  Palette
} from 'lucide-react';

export const Schedule: React.FC = () => {
  const { events } = weddingConfig;

  const getEventIcon = (iconName: WeddingEvent['iconName']) => {
    switch (iconName) {
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-orange-600" />;
      case 'music':
        return <Music className="w-5 h-5 text-emerald-600" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      default:
        return <Heart className="w-5 h-5 text-maroon" />;
    }
  };

  const createGoogleCalendarUrl = (ev: WeddingEvent) => {
    const { calendarEvent } = ev;
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent(calendarEvent.title);
    const details = encodeURIComponent(calendarEvent.description);
    const location = encodeURIComponent(calendarEvent.location);
    const dates = `${calendarEvent.startDate}/${calendarEvent.endDate}`;
    return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section id="events" className="py-20 sm:py-28 px-4 bg-ivory-50 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            Auspicious Ceremonies
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Wedding Celebrations
          </h2>
          <MandalaDivider className="my-6" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif">
            Each sacred ritual honors our heritage, invokes eternal divine blessings, and celebrates the coming together of two families.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((ev, index) => (
            <div
              key={ev.id}
              className="group relative flex flex-col justify-between bg-ivory-100/90 rounded-2xl border border-gold/30 hover:border-gold/70 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: ev.dressCodeColorHex || '#C5A059' }}
              />

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-full bg-ivory-50 border border-gold/40 flex items-center justify-center shadow-xs">
                        {getEventIcon(ev.iconName)}
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-gold-dark font-semibold">
                          Ceremony 0{index + 1}
                        </span>
                        {ev.sanskritSubtitle && (
                          <p className="text-xs font-serif text-maroon font-medium shloka-text">
                            {ev.sanskritSubtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {ev.muhuratNote && (
                      <span className="px-2.5 py-1 rounded-full bg-gold-light/40 border border-gold/40 text-[11px] font-serif font-semibold text-charcoal tracking-wide">
                        {ev.muhuratNote}
                      </span>
                    )}
                  </div>

                  {/* Event Title */}
                  <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal group-hover:text-maroon transition-colors mb-3">
                    {ev.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed mb-6">
                    {ev.description}
                  </p>

                  {/* Date, Time, Venue Details */}
                  <div className="space-y-2.5 text-xs sm:text-sm font-sans mb-6 border-t border-b border-gold/20 py-4">
                    <div className="flex items-center space-x-3 text-charcoal">
                      <Calendar className="w-4 h-4 text-maroon flex-shrink-0" />
                      <span className="font-medium">{ev.date}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-charcoal">
                      <Clock className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      <span>{ev.time}</span>
                    </div>

                    <div className="flex items-start space-x-3 text-charcoal">
                      <MapPin className="w-4 h-4 text-maroon flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">{ev.venueName}</span>
                        <p className="text-charcoal-light text-xs">{ev.address}, {ev.city}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dress Code Section */}
                  <div className="p-3.5 rounded-xl bg-ivory-50 border border-gold/25 mb-6">
                    <div className="flex items-center space-x-2 mb-1">
                      <Palette className="w-3.5 h-3.5 text-gold-dark" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-gold-dark">
                        Suggested Dress Code
                      </span>
                      <span
                        className="w-3 h-3 rounded-full border border-charcoal/20 inline-block ml-auto"
                        style={{ backgroundColor: ev.dressCodeColorHex }}
                        title={ev.dressCode}
                      />
                    </div>
                    <p className="text-xs font-semibold text-charcoal">
                      {ev.dressCode}
                    </p>
                    <p className="text-[11px] text-charcoal-light font-serif italic mt-0.5">
                      {ev.dressCodeSuggestion}
                    </p>
                  </div>
                </div>

                {/* Event Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href={createGoogleCalendarUrl(ev)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[130px] inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-ivory-50 hover:bg-gold-light/30 border border-gold/40 text-xs text-charcoal font-medium transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-maroon" />
                    <span>Add to Calendar</span>
                  </a>

                  <a
                    href={ev.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-lg bg-ivory-50 hover:bg-gold-light/30 border border-gold/40 text-xs text-charcoal font-medium transition-colors"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gold-dark" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
