import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Search, MapPin } from 'lucide-react';
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
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-between pt-12 sm:pt-16 pb-0 overflow-hidden bg-gradient-to-b from-ivory-50 via-ivory-100 to-sandstone/30">
      {/* Decorative Corner Accents */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold/40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex-1 flex flex-col items-center justify-center">
        {/* Auspicious Emblem */}
        <div className="flex items-center justify-center space-x-4 mb-5">
          <DiyaLamp size={28} />
          <GaneshaEmblem size={44} />
          <DiyaLamp size={28} />
        </div>

        {/* Traditional Invitation Tagline */}
        <p className="text-xs sm:text-sm tracking-widest uppercase font-medium text-charcoal-light mb-2">
          Together with our families, we invite you to celebrate the wedding of
        </p>

        {/* Couple Names: Neevedita & Shreyas */}
        <div className="py-2 mb-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-charcoal tracking-normal font-normal">
            <span className="hover:text-maroon transition-colors">
              {weddingConfig.couple.bride.firstName}
            </span>
            <span className="mx-3 text-gold font-light text-3xl sm:text-5xl">&</span>
            <span className="hover:text-maroon transition-colors">
              {weddingConfig.couple.groom.firstName}
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm font-serif italic text-gold-deep tracking-wider">
            {weddingConfig.couple.hashtag}
          </p>
        </div>

        {/* Date & Location Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2 rounded-full bg-ivory-200/90 border border-gold/40 shadow-xs text-charcoal text-xs sm:text-sm font-medium mb-7">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-4 h-4 text-maroon" />
            <span>{weddingConfig.displayDateText}</span>
          </div>
          <span className="text-gold">•</span>
          <div className="flex items-center space-x-1 text-charcoal-light">
            <MapPin className="w-3.5 h-3.5 text-maroon" />
            <span>{weddingConfig.locationCity}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="w-full max-w-sm mx-auto mb-7">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-ivory-50/90 backdrop-blur-sm border border-gold/35 rounded-xl p-2 sm:p-3 shadow-xs text-center"
              >
                <div className="text-xl sm:text-2xl font-serif font-bold text-maroon">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-charcoal-light mt-0.5 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA: Jump straight to the name search box */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto mb-5">
          <a
            href="#find-events"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-maroon hover:bg-maroon-dark text-ivory-50 font-medium text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 border border-gold/40 text-center flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4 text-gold-light" />
            <span>Enter Name to View Your Events</span>
          </a>
          <a
            href="#overview"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-ivory-50/80 hover:bg-ivory-200 text-charcoal hover:text-maroon font-medium text-xs sm:text-sm tracking-wider uppercase border border-gold/50 shadow-xs transition-all duration-200 text-center"
          >
            Celebration Info
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#find-events"
          className="text-gold-deep hover:text-maroon transition-colors py-1 flex flex-col items-center opacity-75 hover:opacity-100"
          aria-label="Scroll to guest invitation portal"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* Temple Silhouette along the bottom edge */}
      <div className="w-full relative z-0 mt-2">
        <TempleSilhouette className="h-24 sm:h-32 md:h-40" opacity={0.28} />
      </div>
    </section>
  );
};
