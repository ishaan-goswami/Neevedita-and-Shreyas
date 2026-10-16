import React, { useState } from 'react';
import { Menu, X, Heart, Search, Lock } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';

interface NavbarProps {
  onOpenHostPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHostPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Find My Events', href: '#find-events' },
    { name: 'Venue & Stay', href: '#overview' },
    { name: 'RSVP Portal', href: '#find-events', isCta: true },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-ivory-50/90 backdrop-blur-md border-b border-gold/25 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center space-x-2.5 group focus:outline-none"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center bg-ivory-200 group-hover:border-gold transition-colors">
              <span className="font-serif text-sm font-bold text-maroon">
                S<span className="text-gold">&</span>N
              </span>
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg tracking-wider text-charcoal group-hover:text-maroon transition-colors">
                {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 ${
                  link.isCta
                    ? 'px-4 py-2 rounded-full bg-maroon text-ivory-50 hover:bg-maroon-dark hover:shadow-md border border-gold/40 font-semibold flex items-center space-x-1.5'
                    : 'text-charcoal-light hover:text-maroon font-medium'
                }`}
              >
                {link.isCta && <Search className="w-3.5 h-3.5" />}
                <span>{link.name}</span>
              </a>
            ))}

            {/* Host Portal Link */}
            {onOpenHostPortal && (
              <button
                onClick={onOpenHostPortal}
                type="button"
                className="text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 text-gold-dark hover:text-maroon font-medium flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold bg-ivory-100"
                title="Host Portal (Password Protected)"
              >
                <Lock className="w-3.5 h-3.5 text-gold-dark" />
                <span>Host Portal</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-charcoal hover:text-maroon focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory-100 border-b border-gold/30 px-6 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-xs uppercase tracking-widest ${
                link.isCta
                  ? 'text-center mt-3 py-2.5 rounded-md bg-maroon text-ivory-50 font-semibold shadow'
                  : 'text-charcoal hover:text-maroon'
              }`}
            >
              {link.name}
            </a>
          ))}

          {onOpenHostPortal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHostPortal();
              }}
              type="button"
              className="w-full text-left py-2 text-xs uppercase tracking-widest text-gold-dark hover:text-maroon font-semibold flex items-center space-x-2 border-t border-gold/20 pt-3"
            >
              <Lock className="w-3.5 h-3.5 text-gold-dark" />
              <span>Host Portal</span>
            </button>
          )}

          <div className="pt-2 text-center text-xs text-gold-dark font-serif italic flex items-center justify-center space-x-1">
            <Heart className="w-3 h-3 text-vermilion fill-vermilion" />
            <span>{weddingConfig.couple.hashtag}</span>
          </div>
        </div>
      )}
    </nav>
  );
};
