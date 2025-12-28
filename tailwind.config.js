export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
  plugins: [],
}
