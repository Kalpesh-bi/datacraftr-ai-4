/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dbe5f1',
          200: '#b8cce4',
          300: '#8aabd2',
          400: '#5a87bc',
          500: '#3a68a3',
          600: '#2a5288',
          700: '#1e3d6b',
          800: '#15294a',
          900: '#0d1b34',
          950: '#070f22',
        },
        accent: {
          50: '#eef4fb',
          100: '#d5e3f4',
          200: '#b0c8e8',
          300: '#7ba4d8',
          400: '#4a82c4',
          500: '#2e64ab',
          600: '#1f4d8e',
          700: '#1a3f74',
          800: '#15294a',
          900: '#0d1b34',
          950: '#070f22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        'radial-fade':
          'radial-gradient(ellipse at top, rgba(42,82,136,0.15), transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-navy': '0 0 40px rgba(42,82,136,0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 8px 30px rgba(0,0,0,0.08)',
        'card-hover': '0 1px 3px rgba(0,0,0,0.05), 0 20px 50px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
