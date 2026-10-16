import React, { useMemo } from 'react';

interface FloatingPetalsProps {
  count?: number;
  enabled?: boolean;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  count = 14,
  enabled = true,
}) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const animationDuration = 9 + Math.random() * 12; // 9s to 21s
      const delay = Math.random() * 10;
      const size = 12 + Math.random() * 14;
      const isRose = i % 3 === 0;
      const color = isRose ? '#9B2C2C' : (i % 2 === 0 ? '#F59E0B' : '#EAB308');

      return {
        id: i,
        left: `${left}%`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${delay}s`,
        size,
        color,
        isRose,
      };
    });
  }, [count]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal opacity-0"
          style={{
            left: petal.left,
            top: '-30px',
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
            }}
          >
            {/* Organic curved petal shape */}
            <path
              d="M 10 2 C 3 8 2 16 10 24 C 18 16 17 8 10 2 Z"
              fill={petal.color}
              opacity="0.82"
            />
            {/* Subtle petal vein line */}
            <path
              d="M 10 6 L 10 19"
              stroke="#FFF"
              strokeWidth="0.6"
              opacity="0.35"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
