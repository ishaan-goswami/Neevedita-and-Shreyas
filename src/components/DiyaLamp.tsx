import React from 'react';

interface DiyaLampProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const DiyaLamp: React.FC<DiyaLampProps> = ({
  className = "",
  size = 36,
  glow = true,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute -top-3 w-8 h-8 rounded-full bg-gold-shimmer/30 blur-md animate-pulse pointer-events-none"
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="flameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#C13B2A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <linearGradient id="diyaBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAD598" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8E6822" />
          </linearGradient>
        </defs>

        {/* Animated Flickering Flame */}
        <g className="origin-bottom animate-flame-flicker">
          {/* Flame outer glow */}
          <path
            d="M 30 5 C 23 15 22 25 30 28 C 38 25 37 15 30 5 Z"
            fill="url(#flameGrad)"
            filter="drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))"
          />
          {/* Inner core flame */}
          <path
            d="M 30 12 C 26 19 26 25 30 27 C 34 25 34 19 30 12 Z"
            fill="#FFFBEB"
            opacity="0.9"
          />
        </g>

        {/* Traditional Brass / Terracotta Diya Basin */}
        <path
          d="M 12 28 C 12 40 22 44 30 44 C 38 44 48 40 48 28 C 42 30 36 30 30 30 C 24 30 18 30 12 28 Z"
          fill="url(#diyaBrass)"
          stroke="#7A1C1C"
          strokeWidth="0.8"
        />

        {/* Diya Rim lip */}
        <ellipse
          cx="30"
          cy="28"
          rx="18"
          ry="3.5"
          fill="#B38B3F"
          stroke="#7A1C1C"
          strokeWidth="0.6"
        />

        {/* Base stand */}
        <path
          d="M 24 43 L 20 47 L 40 47 L 36 43 Z"
          fill="url(#diyaBrass)"
          stroke="#7A1C1C"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
};
