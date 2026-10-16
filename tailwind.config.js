/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F5EFE6',
          300: '#EDE4D8',
        },
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#C5A059',
          deep: '#B38B3F',
          shimmer: '#D4AF37',
          dark: '#8E6822',
        },
        maroon: {
          light: '#9B2C2C',
          DEFAULT: '#7A1C1C',
          dark: '#521010',
          deep: '#3D0A0A',
        },
        vermilion: '#B83A24',
        sandstone: '#E8DCC9',
        sage: '#4A6B5D',
        charcoal: {
          light: '#5A524D',
          DEFAULT: '#2E2825',
          dark: '#1C1816',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Playfair Display', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flame-flicker': 'flame 2.5s ease-in-out infinite',
        'subtle-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        flame: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08) rotate(1.5deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
