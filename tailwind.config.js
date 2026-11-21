export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'animate-blob',
    'animate-float',
    'animate-fade-in',
    'animate-slide-up',
    'animate-slide-up-delayed',
    'animate-slide-up-delayed-2',
    'animate-slide-up-delayed-3',
    'animate-slide-up-delayed-4',
    'animate-smooth-typing',
    'animate-pulse-glow',
    'animate-spin-slow',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Arial', 'sans-serif'],
      },
      colors: {
        // FOT Media aperture blue and graphite.
        blue: {
          50: '#ecf7fb', 100: '#d7edf5', 200: '#b6ddea', 300: '#85c5da',
          400: '#4ea5c7', 500: '#3385a6', 600: '#256f8c', 700: '#205a72',
          800: '#1c4b60', 900: '#1c3f50', 950: '#122b38',
        },
        slate: {
          50: '#f7f8fa', 100: '#eef0f3', 200: '#dde1e6', 300: '#c8cfd6',
          400: '#9ba5b0', 500: '#697581', 600: '#535e6a', 700: '#424b55',
          800: '#333941', 900: '#262a32', 950: '#191c22',
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        float: 'float 15s infinite ease-in',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-up-delayed': 'slideUp 0.8s ease-out 0.3s forwards',
        'slide-up-delayed-2': 'slideUp 0.8s ease-out 0.5s forwards',
        'slide-up-delayed-3': 'slideUp 0.8s ease-out 0.7s forwards',
        'slide-up-delayed-4': 'slideUp 0.8s ease-out 0.9s forwards',
        'smooth-typing': 'smoothTyping 3s cubic-bezier(0.4, 0.0, 0.2, 1) 0.3s forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 3s linear infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(100px)', opacity: '0' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        smoothTyping: {
          '0%': {
            width: '0',
            'border-right-color': 'rgba(34, 211, 238, 0.75)',
            opacity: '0',
          },
          '10%': { opacity: '1' },
          '85%': { 'border-right-color': 'rgba(34, 211, 238, 0.75)' },
          '100%': {
            width: '100%',
            'border-right-color': 'transparent',
            opacity: '1',
          },
        },
        pulseGlow: {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { 'box-shadow': '0 0 40px rgba(34, 211, 238, 0.7)' },
        },
        spinSlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
