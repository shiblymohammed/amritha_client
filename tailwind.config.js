/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px', // For luxury full-width hero sections
      },
    },
    extend: {
      colors: {
        'background': {
          DEFAULT: '#FBF9F6',
          secondary: '#F5F0E6',
          tertiary: '#EDE8DA',
        },
        'menu-overlay': '#2C3E50',
        'text': {
          DEFAULT: '#435547',
          heading: '#3A4A3E',
          subtle: '#5A594D',
          'on-color': '#FBF9F6',
        },
        'border': {
          soft: '#DCD7C9',
          interactive: '#8E8471',
        },
        'action': {
          primary: '#7A6B5C',
          'primary-hover': '#5C4E42',
          accent: '#A57156',
          'accent-hover': '#9C6A50',
          active: '#3A4A3E',
        },
        // Heritage Palette
        'heritage-burgundy': '#6B2B39',
        'heritage-burgundy-dark': '#501f2a',
        'heritage-blue': '#2c3e50',
        'heritage-sandstone': '#D4A276',
        'heritage-sandstone-light': '#e8d5c4',
        'heritage-green': '#6B7F67',
        'heritage-gold': '#c9a87c',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      fontSize: {
        'xs': '0.75rem', 'sm': '0.875rem', 'base': '1rem', 'lg': '1.125rem', 'xl': '1.25rem',
        'body': ['1.125rem', { lineHeight: '1.7' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'h3': ['1.75rem', { lineHeight: '1.3' }],
        'h2': ['2.25rem', { lineHeight: '1.2' }],
        'h1': ['3rem', { lineHeight: '1.1' }],
        'h3-sm': ['1.5rem', { lineHeight: '1.3' }],
        'h2-sm': ['1.875rem', { lineHeight: '1.2' }],
        'h1-sm': ['2.25rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      borderRadius: {
        'sm': '0.125rem', 'DEFAULT': '0.25rem', 'md': '0.375rem', 'lg': '0.5rem',
        'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px',
      },
      boxShadow: {
        'heritage': '0 4px 14px 0 rgba(107, 43, 57, 0.15)', // Burgundy shadow
        'heritage-lg': '0 10px 25px 0 rgba(107, 43, 57, 0.2)', // Burgundy shadow
        'interactive': '0 0 0 3px rgba(165, 113, 86, 0.4)',
        'interactive-glow': '0 0 15px 0 rgba(165, 113, 86, 0.3)',
        'glow': '0 0 20px 0 rgba(212, 162, 118, 0.5)', // Sandstone glow
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-left': { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        'scale-in': { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'rotate-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'shimmer': { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'slideDown': { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in-left': 'fade-in-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'rotate-slow': 'rotate-slow 50s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite linear',
        'slide-down': 'slideDown 0.4s ease-out forwards',
      },
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-button': `linear-gradient(to right, ${theme('colors.heritage-burgundy')}, ${theme('colors.action.accent')})`,
      }),
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontFamily: theme('fontFamily.playfair'), fontWeight: theme('fontWeight.bold'), fontSize: theme('fontSize.h1-sm'), '@screen sm': { fontSize: theme('fontSize.h1') }, color: theme('colors.text.heading'), },
        'h2': { fontFamily: theme('fontFamily.playfair'), fontWeight: theme('fontWeight.semibold'), fontSize: theme('fontSize.h2-sm'), '@screen sm': { fontSize: theme('fontSize.h2') }, color: theme('colors.text.heading'), },
        'h3': { fontFamily: theme('fontFamily.playfair'), fontWeight: theme('fontWeight.medium'), fontSize: theme('fontSize.h3-sm'), '@screen sm': { fontSize: theme('fontSize.h3') }, color: theme('colors.text.heading'), },
        'h4': { fontFamily: theme('fontFamily.playfair'), fontWeight: theme('fontWeight.medium'), fontSize: theme('fontSize.h4'), color: theme('colors.text.heading'), },
        'body': { fontFamily: theme('fontFamily.inter'), fontWeight: theme('fontWeight.normal'), backgroundColor: theme('colors.background.DEFAULT'), color: theme('colors.text.DEFAULT') },
        'p': { fontFamily: theme('fontFamily.inter'), fontSize: theme('fontSize.body'), color: theme('colors.text.DEFAULT'), },
      })
    })
  ],
}


