// // /** @type {import('tailwindcss').Config} */
// // const plugin = require('tailwindcss/plugin');

// // export default {
// //   content: [
// //     "./index.html",
// //     "./src/**/*.{js,ts,jsx,tsx}",
// //   ],
// //   theme: {
// //     extend: {
// //       // =================================================================
// //       // == THEME FOUNDATION: COLORS & FONTS
// //       // =================================================================
// //       colors: {
// //         'background': {
// //           DEFAULT: '#FBF9F6',
// //           secondary: '#F5F0E6',
// //           tertiary: '#EDE8DA',
// //         },
// //         'menu-overlay': '#2C3E50',
// //         'text': {
// //           DEFAULT: '#435547',
// //           heading: '#3A4A3E',
// //           subtle: '#5A594D',
// //           'on-color': '#FBF9F6',
// //         },
// //         'border': {
// //           soft: '#DCD7C9',
// //           interactive: '#8E8471',
// //         },
// //         'action': {
// //           primary: '#7A6B5C',
// //           'primary-hover': '#5C4E42',
// //           accent: '#A57156',
// //           'accent-hover': '#9C6A50',
// //         },
// //       },
// //       fontFamily: {
// //         'cinzel': ['Cinzel', 'serif'],
// //         'playfair': ['Playfair Display', 'serif'],
// //         'cormorant': ['Cormorant Garamond', 'serif'],
// //         'poppins': ['Poppins', 'sans-serif'],
// //       },

// //       // =================================================================
// //       // == TYPOGRAPHIC SYSTEM
// //       // =================================================================
// //       fontSize: {
// //         'xs': '0.75rem', 'sm': '0.875rem', 'base': '1rem', 'lg': '1.125rem', 'xl': '1.25rem',
// //         'body': ['1.125rem', { lineHeight: '1.7' }],
// //         'h4': ['1.25rem', { lineHeight: '1.4' }],
// //         'h3': ['1.75rem', { lineHeight: '1.3' }],
// //         'h2': ['2.25rem', { lineHeight: '1.2' }],
// //         'h1': ['3rem', { lineHeight: '1.1' }],
// //         'h3-sm': ['1.5rem', { lineHeight: '1.3' }],
// //         'h2-sm': ['1.875rem', { lineHeight: '1.2' }],
// //         'h1-sm': ['2.25rem', { lineHeight: '1.1' }],
// //       },

// //       // =================================================================
// //       // == SPACING, BORDERS, & SHADOWS
// //       // =================================================================
// //       borderRadius: {
// //         'sm': '0.125rem', 'DEFAULT': '0.25rem', 'md': '0.375rem', 'lg': '0.5rem',
// //         'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px',
// //       },
// //       boxShadow: {
// //         'heritage': '0 4px 14px 0 rgba(220, 215, 201, 0.25)',
// //         'heritage-lg': '0 10px 25px 0 rgba(220, 215, 201, 0.35)',
// //         'interactive': '0 0 0 3px rgba(165, 113, 86, 0.4)',
// //       },

// //       // =================================================================
// //       // == ANIMATION SYSTEM (v4)
// //       // =================================================================
// //       keyframes: {
// //         'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
// //         'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
// //         'pulse-subtle': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '.7' } },
// //         'slide-in-from-left': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
// //         'reveal-stagger': { '0%': { transform: 'translateY(100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
// //         // New shimmer animation for a luxury feel on buttons and interactive elements
// //         'shimmer': {
// //             '0%': { backgroundPosition: '-200% 0' },
// //             '100%': { backgroundPosition: '200% 0' },
// //         },
// //       },
// //       animation: {
// //         'fade-in': 'fade-in 0.5s ease-out forwards',
// //         'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
// //         'pulse-subtle': 'pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
// //         'slide-in-left': 'slide-in-from-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
// //         'reveal-stagger': 'reveal-stagger 1s ease-out forwards',
// //         'shimmer': 'shimmer 3s infinite linear',
// //       },
// //     },
// //   },
// //   plugins: [
// //     plugin(function({ addBase, theme }) {
// //       addBase({
// //         'h1': { fontFamily: theme('fontFamily.cinzel'), fontSize: theme('fontSize.h1-sm'), '@screen sm': { fontSize: theme('fontSize.h1') }, color: theme('colors.text.heading'), },
// //         'h2': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h2-sm'), '@screen sm': { fontSize: theme('fontSize.h2') }, color: theme('colors.text.heading'), },
// //         'h3': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h3-sm'), '@screen sm': { fontSize: theme('fontSize.h3') }, color: theme('colors.text.heading'), },
// //         'h4': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h4'), color: theme('colors.text.heading'), },
// //         'p': { fontFamily: theme('fontFamily.cormorant'), fontSize: theme('fontSize.body'), color: theme('colors.text.DEFAULT'), },
// //         'body': { backgroundColor: theme('colors.background.DEFAULT'), }
// //       })
// //     })
// //   ],
// // }



/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // =================================================================
      // == THEME FOUNDATION: COLORS & FONTS
      // =================================================================
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
          // ADDED: New color for active/selected states
          active: '#3A4A3E',
        },
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },

      // =================================================================
      // == TYPOGRAPHIC SYSTEM
      // =================================================================
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

      // =================================================================
      // == SPACING, BORDERS, & SHADOWS
      // =================================================================
      borderRadius: {
        'sm': '0.125rem', 'DEFAULT': '0.25rem', 'md': '0.375rem', 'lg': '0.5rem',
        'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px',
      },
      boxShadow: {
        'heritage': '0 4px 14px 0 rgba(220, 215, 201, 0.25)',
        'heritage-lg': '0 10px 25px 0 rgba(220, 215, 201, 0.35)',
        'interactive': '0 0 0 3px rgba(165, 113, 86, 0.4)',
        // ADDED: New subtle glow for interactive elements
        'interactive-glow': '0 0 15px 0 rgba(165, 113, 86, 0.3)',
      },

      // =================================================================
      // == ANIMATION SYSTEM (v4)
      // =================================================================
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'pulse-subtle': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '.7' } },
        'slide-in-from-left': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
        'reveal-stagger': { '0%': { transform: 'translateY(100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'shimmer': {
            '0%': { backgroundPosition: '-200% 0' },
            '100%': { backgroundPosition: '200% 0' },
        },
        // ADDED: Keyframes for the slide-down animation
        slideDown: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-left': 'slide-in-from-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'reveal-stagger': 'reveal-stagger 1s ease-out forwards',
        'shimmer': 'shimmer 3s infinite linear',
        // ADDED: New animation for expanding dish descriptions
        'slide-down': 'slideDown 0.4s ease-out forwards',
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontFamily: theme('fontFamily.cinzel'), fontSize: theme('fontSize.h1-sm'), '@screen sm': { fontSize: theme('fontSize.h1') }, color: theme('colors.text.heading'), },
        'h2': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h2-sm'), '@screen sm': { fontSize: theme('fontSize.h2') }, color: theme('colors.text.heading'), },
        'h3': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h3-sm'), '@screen sm': { fontSize: theme('fontSize.h3') }, color: theme('colors.text.heading'), },
        'h4': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h4'), color: theme('colors.text.heading'), },
        'p': { fontFamily: theme('fontFamily.cormorant'), fontSize: theme('fontSize.body'), color: theme('colors.text.DEFAULT'), },
        'body': { backgroundColor: theme('colors.background.DEFAULT'), }
      })
    })
  ],
}


