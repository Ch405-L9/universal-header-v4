/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BADGRTech Brand Colors
        'badgr-primary': '#0066CC',
        'badgr-primary-dark': '#0052A3',
        'badgr-primary-light': '#3385D1',
        'badgr-white': '#FFFFFF',
        'badgr-black': '#000000',
        'badgr-gray': '#666666',
        'badgr-gray-light': '#F8F9FA',
        'badgr-gray-dark': '#343A40',
        
        // Semantic Color Mapping
        primary: '#0066CC',
        secondary: '#343A40',
        accent: '#10b981',
        neutral: '#666666',
      },
      
      fontFamily: {
        // BADGRTech Typography System
        'heading': ['Goldman', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        
        // Responsive Typography
        'responsive-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'responsive-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'responsive-base': 'clamp(1rem, 3vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 3.5vw, 1.5rem)',
        'responsive-xl': 'clamp(1.5rem, 4vw, 2.25rem)',
        'responsive-2xl': 'clamp(2rem, 5vw, 3rem)',
        'responsive-3xl': 'clamp(2.5rem, 6vw, 4rem)',
      },
      
      borderRadius: {
        // 2px Maximum Rule Enforcement
        'none': '0px',
        'sm': '1px',
        'DEFAULT': '2px',
        'md': '2px',
        'lg': '2px',
        'xl': '2px',
        '2xl': '2px',
        '3xl': '2px',
        'full': '9999px', // Exception for circular elements
      },
      
      boxShadow: {
        // Blue-tinted Shadow System
        'sm': '0 1px 2px 0 rgba(0, 102, 204, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 102, 204, 0.1), 0 1px 2px 0 rgba(0, 102, 204, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(0, 102, 204, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 102, 204, 0.1), 0 4px 6px -2px rgba(0, 102, 204, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 102, 204, 0.1), 0 10px 10px -5px rgba(0, 102, 204, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 102, 204, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 102, 204, 0.06)',
        'glow': '0 0 20px rgba(0, 102, 204, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 102, 204, 0.4)',
      },
      
      spacing: {
        // Extended Spacing Scale
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      animation: {
        // BADGRTech Animations
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        bounceSubtle: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
          '50%': {
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          }
        }
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      }
    },
  },
  plugins: [
    // Add any additional plugins here
  ],
}
