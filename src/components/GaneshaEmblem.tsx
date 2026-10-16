import React from 'react';

interface GaneshaProps {
  className?: string;
  size?: number;
}

export const GaneshaEmblem: React.FC<GaneshaProps> = ({ className = "text-gold", size = 64 }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform duration-500 hover:scale-105"
      >
        {/* Subtle Halo / Aura */}
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

        {/* Auspicious Tilak / Trishul on Forehead */}
        <path
          d="M 50 18 L 50 32 M 45 22 Q 50 28 50 32 M 55 22 Q 50 28 50 32"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="50" cy="35" r="1.5" fill="#B83A24" />

        {/* Stylized Lord Ganesha Head & Ears (Minimalist Swastika / Om Flow) */}
        {/* Left Ear */}
        <path
          d="M 38 32 C 26 28 20 40 25 50 C 29 57 36 55 40 52"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right Ear */}
        <path
          d="M 62 32 C 74 28 80 40 75 50 C 71 57 64 55 60 52"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Crown / Mukut */}
        <path
          d="M 42 22 L 50 12 L 58 22 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="50" cy="11" r="1.5" fill="currentColor" />

        {/* Trunk (Vakratunda) Curving Gently Right with Modak */}
        <path
          d="M 47 40 C 47 52 46 62 52 68 C 56 72 63 71 65 65 C 66 61 62 58 58 60"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Modak (Sweet) in Trunk */}
        <circle cx="58" cy="59" r="2.5" fill="currentColor" />

        {/* Broken Tusk detail */}
        <path d="M 44 48 L 41 51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 56 48 L 60 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

        {/* Auspicious Lotus Base */}
        <path
          d="M 32 78 C 40 73 60 73 68 78 C 62 84 38 84 32 78 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 40 81 C 45 84 55 84 60 81"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
