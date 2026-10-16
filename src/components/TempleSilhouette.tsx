import React from 'react';

interface TempleSilhouetteProps {
  className?: string;
  opacity?: number;
}

export const TempleSilhouette: React.FC<TempleSilhouetteProps> = ({
  className = "",
  opacity = 0.22,
}) => {
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden w-full ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full text-gold-deep"
      >
        <defs>
          <linearGradient id="templeGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C5A059" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7A1C1C" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="templeBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E8DCC9" stopOpacity="0.0" />
          </linearGradient>

          <radialGradient id="templeAura" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Warm Golden Aura behind the main Mandir */}
        <ellipse cx="720" cy="180" rx="380" ry="140" fill="url(#templeAura)" />

        {/* ================= BACKGROUND LAYER (DISTANT TEMPLES) ================= */}
        <g fill="url(#templeBackGrad)" opacity="0.6">
          {/* Far Left Subsidiary Temple Spire */}
          <path d="M 120 320 L 120 220 Q 150 160 170 120 Q 190 160 220 220 L 220 320 Z" />
          {/* Kalash on far left */}
          <line x1="170" y1="90" x2="170" y2="120" stroke="#C5A059" strokeWidth="2" />
          <circle cx="170" cy="90" r="3" fill="#C5A059" />

          {/* Far Right Subsidiary Temple Spire */}
          <path d="M 1220 320 L 1220 220 Q 1250 160 1270 120 Q 1290 160 1320 220 L 1320 320 Z" />
          <line x1="1270" y1="90" x2="1270" y2="120" stroke="#C5A059" strokeWidth="2" />
          <circle cx="1270" cy="90" r="3" fill="#C5A059" />

          {/* Distant Temple Towers behind center */}
          <path d="M 540 320 L 540 180 Q 580 110 610 70 Q 640 110 680 180 L 680 320 Z" />
          <line x1="610" y1="50" x2="610" y2="70" stroke="#C5A059" strokeWidth="2" />
          <circle cx="610" cy="50" r="3.5" fill="#C5A059" />

          <path d="M 760 320 L 760 180 Q 800 110 830 70 Q 860 110 900 180 L 900 320 Z" />
          <line x1="830" y1="50" x2="830" y2="70" stroke="#C5A059" strokeWidth="2" />
          <circle cx="830" cy="50" r="3.5" fill="#C5A059" />
        </g>

        {/* ================= FOREGROUND LAYER (MAIN MAHA MANDIR SHIKHARA) ================= */}
        <g fill="url(#templeGoldGrad)">
          {/* Left Wing Mandapa & Arches (260 - 480) */}
          <path d="M 260 320 L 260 240 L 310 210 L 340 160 L 370 210 L 420 240 L 460 220 L 500 240 L 500 320 Z" />
          {/* Left Spires / Kalash */}
          <circle cx="340" cy="155" r="4" fill="#C5A059" />
          <line x1="340" y1="140" x2="340" y2="155" stroke="#C5A059" strokeWidth="2" />
          <polygon points="338,138 342,138 340,130" fill="#B38B3F" />

          {/* Middle-Left Shikhara */}
          <path d="M 450 320 L 450 210 Q 500 130 520 85 Q 540 130 590 210 L 590 320 Z" />
          <circle cx="520" cy="80" r="4.5" fill="#C5A059" />
          <line x1="520" y1="65" x2="520" y2="80" stroke="#C5A059" strokeWidth="2" />
          <polygon points="518,63 522,63 520,53" fill="#D4AF37" />

          {/* ================= CENTRAL GRAND SHIKHARA (THE SANCTUM SPIRE) ================= */}
          {/* Base and tiered curvilinear spire (Ratha projections) */}
          <path
            d="
              M 620 320
              L 620 230
              L 640 220
              L 640 170
              Q 680 90 710 40
              L 720 20
              L 730 40
              Q 760 90 800 170
              L 800 220
              L 820 230
              L 820 320
              Z
            "
          />

          {/* Amalaka (Grooved sun disk crowning the Shikhara) */}
          <ellipse cx="720" cy="22" rx="14" ry="5" fill="#C5A059" stroke="#9F7A2D" strokeWidth="1" />
          {/* Kalash (Golden Pitcher) */}
          <ellipse cx="720" cy="14" rx="7" ry="5" fill="#D4AF37" />
          {/* Temple Flag (Dhwaja) and Finial */}
          <line x1="720" y1="2" x2="720" y2="14" stroke="#D4AF37" strokeWidth="2" />
          <path d="M 720 2 Q 732 5 738 2 Q 730 10 720 8 Z" fill="#B83A24" />

          {/* Middle-Right Shikhara */}
          <path d="M 850 320 L 850 210 Q 900 130 920 85 Q 940 130 990 210 L 990 320 Z" />
          <circle cx="920" cy="80" r="4.5" fill="#C5A059" />
          <line x1="920" y1="65" x2="920" y2="80" stroke="#C5A059" strokeWidth="2" />
          <polygon points="918,63 922,63 920,53" fill="#D4AF37" />

          {/* Right Wing Mandapa & Arches (980 - 1180) */}
          <path d="M 980 320 L 980 240 L 1020 220 L 1070 240 L 1100 160 L 1130 210 L 1180 240 L 1180 320 Z" />
          <circle cx="1100" cy="155" r="4" fill="#C5A059" />
          <line x1="1100" y1="140" x2="1100" y2="155" stroke="#C5A059" strokeWidth="2" />
          <polygon points="1098,138 1102,138 1100,130" fill="#B38B3F" />

          {/* Continuous plinth / base steps at bottom */}
          <rect x="0" y="305" width="1440" height="15" fill="#C5A059" opacity="0.3" />
          <rect x="0" y="312" width="1440" height="8" fill="#7A1C1C" opacity="0.2" />
        </g>

        {/* Architectural Linework Details (Arches, Jali, Columns) */}
        <g stroke="#D4AF37" strokeWidth="1.2" opacity="0.45" fill="none">
          {/* Central Mandapa Grand Arch */}
          <path d="M 675 305 L 675 255 Q 720 220 765 255 L 765 305" />
          <path d="M 685 305 L 685 262 Q 720 232 755 262 L 755 305" />
          {/* Left Arch */}
          <path d="M 490 305 L 490 265 Q 520 240 550 265 L 550 305" />
          {/* Right Arch */}
          <path d="M 890 305 L 890 265 Q 920 240 950 265 L 950 305" />

          {/* Horizontal Urushringa Ribs across the main Shikhara */}
          <line x1="680" y1="190" x2="760" y2="190" />
          <line x1="690" y1="150" x2="750" y2="150" />
          <line x1="700" y1="110" x2="740" y2="110" />
          <line x1="708" y1="75" x2="732" y2="75" />
        </g>

        {/* Auspicious Flying Doves / Birds in the evening temple sky */}
        <g stroke="#C5A059" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M 390 90 Q 396 83 402 90 Q 408 83 414 90" />
          <path d="M 425 75 Q 430 69 435 75 Q 440 69 445 75" />
          <path d="M 1020 95 Q 1026 88 1032 95 Q 1038 88 1044 95" />
        </g>
      </svg>
    </div>
  );
};
