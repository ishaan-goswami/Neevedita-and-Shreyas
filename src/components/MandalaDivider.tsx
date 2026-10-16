import React from 'react';

interface MandalaDividerProps {
  className?: string;
  withLotus?: boolean;
}

export const MandalaDivider: React.FC<MandalaDividerProps> = ({
  className = "my-8",
  withLotus = true,
}) => {
  return (
    <div className={`flex items-center justify-center space-x-3 w-full max-w-md mx-auto opacity-70 ${className}`}>
      {/* Left elegant flourish line */}
      <div className="flex-1 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold to-gold" />
        <div className="w-1.5 h-1.5 rotate-45 border border-gold bg-ivory-100 ml-1" />
      </div>

      {/* Center Motif (Lotus or Diamond) */}
      {withLotus ? (
        <svg
          width="28"
          height="28"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gold flex-shrink-0"
        >
          {/* Lotus Petals */}
          <path
            d="M 20 6 C 18 14 14 20 20 28 C 26 20 22 14 20 6 Z"
            fill="#D4AF37"
            opacity="0.85"
          />
          <path
            d="M 12 14 C 11 20 14 26 20 28 C 16 23 15 18 12 14 Z"
            fill="#C5A059"
            opacity="0.6"
          />
          <path
            d="M 28 14 C 29 20 26 26 20 28 C 24 23 25 18 28 14 Z"
            fill="#C5A059"
            opacity="0.6"
          />
          <circle cx="20" cy="29" r="1.5" fill="#7A1C1C" />
        </svg>
      ) : (
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold bg-gold-light/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
        </div>
      )}

      {/* Right elegant flourish line */}
      <div className="flex-1 flex items-center">
        <div className="w-1.5 h-1.5 rotate-45 border border-gold bg-ivory-100 mr-1" />
        <div className="w-full h-px bg-gradient-to-r from-gold via-gold to-transparent" />
      </div>
    </div>
  );
};
