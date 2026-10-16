import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, ChevronDown } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import { GaneshaEmblem } from './GaneshaEmblem';
import { DiyaLamp } from './DiyaLamp';
import { TempleSilhouette } from './TempleSilhouette';

export const Hero: React.FC = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between pt-12 sm:pt-16 pb-0 overflow-hidden bg-gradient-to-b from-ivory-50 via-ivory-100 to-sandstone/30">
      {/* Decorative Corner Borders */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold/40 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex-1 flex flex-col items-center justify-center">
        {/* Sacred Invocation (Ganesh Ji & Shloka) */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <DiyaLamp size={32} />
          <GaneshaEmblem size={52} />
          <DiyaLamp size={32} />
        </div>

        <div className="space-y-1 mb-6">
          <h2 className="text-maroon font-serif text-lg sm:text-2xl tracking-widest font-semibold shloka-text">
            {weddingConfig.auspiciousMantra.sanskrit}
          </h2>
          <p className="text-xs sm:text-sm text-gold-dark font-serif italic tracking-wider">
            {weddingConfig.auspiciousMantra.transliteration}
          </p>
        </div>

        {/* Traditional Invitation Opening */}
        <p className="text-xs sm:text-sm tracking-widest uppercase font-medium text-charcoal-light/80 mb-3 max-w-lg mx-auto">
          Under the grace of the Almighty & the blessings of our elders
        </p>

        {/* Couple Names */}
        <div className="py-2 mb-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-charcoal tracking-normal font-normal">
            <span className="block sm:inline hover:text-maroon transition-colors">
              {weddingConfig.couple.groom.firstName}
            </span>
            <span className="mx-3 text-gold font-light text-3xl sm:text-5xl">&</span>
            <span className="block sm:inline hover:text-maroon transition-colors">
              {weddingConfig.couple.bride.firstName}
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm font-serif italic text-gold-deep tracking-wider">
            {weddingConfig.couple.hashtag}
          </p>
        </div>

        {/* Invitation Text */}
        <p className="max-w-xl mx-auto text-sm sm:text-base text-charcoal-light font-serif leading-relaxed mb-6">
          {weddingConfig.invitationNote}
        </p>

        {/* Date & Location Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-ivory-200/90 border border-gold/40 shadow-sm text-charcoal text-xs sm:text-sm font-medium mb-8">
          <span className="flex items-center space-x-1.5 text-maroon">
            <Calendar className="w-4 h-4 text-gold-dark" />
            <span>{weddingConfig.displayDateText.split('•')[0].trim()}</span>
          </span>
          <span className="text-gold">•</span>
          <span className="flex items-center space-x-1.5 text-charcoal-light">
            <MapPin className="w-4 h-4 text-maroon" />
            <span>{weddingConfig.displayDateText.split('•')[1]?.trim() || weddingConfig.venueOverview.cityState}</span>
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="w-full max-w-md mx-auto mb-8">
          <p className="text-xs tracking-widest uppercase font-semibold text-gold-dark mb-3">
            Muhurat Countdown
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-ivory-50/90 backdrop-blur-sm border border-gold/35 rounded-xl p-2.5 sm:p-3.5 shadow-sm text-center transform transition-transform hover:-translate-y-0.5"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-maroon">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-charcoal-light mt-0.5 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm mx-auto mb-6">
          <a
            href="#rsvp"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-maroon hover:bg-maroon-dark text-ivory-50 font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 border border-gold/40 text-center flex items-center justify-center space-x-2"
          >
            <Heart className="w-4 h-4 text-gold-light fill-gold-light" />
            <span>RSVP Attending</span>
          </a>
          <a
            href="#events"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-ivory-50/80 hover:bg-ivory-200 text-charcoal hover:text-maroon font-medium text-sm tracking-wider uppercase border border-gold/50 shadow-sm transition-all duration-200 text-center"
          >
            Celebrations Itinerary
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#story"
          className="text-gold-deep hover:text-maroon transition-colors py-2 flex flex-col items-center opacity-75 hover:opacity-100"
          aria-label="Scroll to story section"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* ================= TEMPLE SILHOUETTE SKYLINE ================= */}
      {/* Placed at the bottom edge of the hero to anchor the Hindu aesthetic */}
      <div className="w-full relative z-0 mt-2">
        <TempleSilhouette className="h-28 sm:h-36 md:h-44" opacity={0.28} />
      </div>
    </section>
  );
};
