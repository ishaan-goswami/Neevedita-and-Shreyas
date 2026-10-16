import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Events', href: '#events' },
    { name: 'The Seven Vows', href: '#vows' },
    { name: 'Venue & Travel', href: '#venue' },
    { name: 'RSVP', href: '#rsvp', isCta: true },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-ivory-50/90 backdrop-blur-md border-b border-gold/25 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center space-x-2 group focus:outline-none"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center bg-ivory-200 group-hover:border-gold transition-colors">
              <span className="font-serif text-sm font-bold text-maroon">
                {weddingConfig.couple.groom.firstName[0]}
                <span className="text-gold">&</span>
                {weddingConfig.couple.bride.firstName[0]}
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-lg tracking-wider text-charcoal group-hover:text-maroon transition-colors">
                {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-all duration-200 ${
                  link.isCta
                    ? 'px-4 py-1.5 rounded-full bg-maroon text-ivory-50 hover:bg-maroon-dark hover:shadow-md border border-gold/40 font-semibold'
                    : 'text-charcoal-light hover:text-maroon font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold hover:after:w-full after:transition-all'
                }`}
              >
                {link.name}
              </a>
            ))}
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
              className={`block py-2 text-sm tracking-widest uppercase ${
                link.isCta
                  ? 'text-center mt-3 py-2.5 rounded-md bg-maroon text-ivory-50 font-semibold shadow'
                  : 'text-charcoal hover:text-maroon'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 text-center text-xs text-gold-dark font-serif italic flex items-center justify-center space-x-1">
            <Heart className="w-3 h-3 text-vermilion fill-vermilion" />
            <span>{weddingConfig.couple.hashtag}</span>
          </div>
        </div>
      )}
    </nav>
  );
};
