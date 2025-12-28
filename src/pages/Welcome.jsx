import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Welcome = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center px-4 py-8 overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDarkMode ? (
          <>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
          </>
        ) : (
          <>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>
          </>
        )}

        {/* Floating particles */}
        <div className={`absolute top-1/4 left-1/4 w-1 h-1 rounded-full animate-float opacity-50 ${isDarkMode ? 'bg-blue-300' : 'bg-blue-400'}`}></div>
        <div className={`absolute top-1/3 right-1/4 w-1 h-1 rounded-full animate-float opacity-60 ${isDarkMode ? 'bg-cyan-300' : 'bg-cyan-400'}`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full animate-float opacity-40 ${isDarkMode ? 'bg-blue-200' : 'bg-blue-300'}`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-2/3 right-1/3 w-1 h-1 rounded-full animate-float opacity-50 ${isDarkMode ? 'bg-cyan-200' : 'bg-cyan-300'}`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full animate-float opacity-60 ${isDarkMode ? 'bg-blue-300' : 'bg-blue-400'}`} style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-8 right-8 z-20 p-3 rounded-full transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
            : 'bg-blue-200 hover:bg-blue-300 text-blue-600'
        }`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className={`backdrop-blur-xl border rounded-2xl shadow-2xl p-8 sm:p-12 space-y-8 animate-fade-in transition-colors duration-300 ${
          isDarkMode
            ? 'bg-white/10 border-white/20'
            : 'bg-white/40 border-white/60'
        }`}>
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 animate-pulse-glow relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-spin-slow opacity-75"></div>
              <span className="text-white font-bold text-2xl relative z-10">TMV</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl font-bold text-transparent bg-clip-text overflow-hidden whitespace-nowrap border-r-2 animate-smooth-typing ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 border-cyan-400'
                : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 border-cyan-600'
            }`}>
              Welcome
            </h1>
            <p className={`text-lg font-semibold animate-slide-up-delayed ${
              isDarkMode ? 'text-blue-200' : 'text-blue-700'
            }`}>
              Task Management & Verification
            </p>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className={`leading-relaxed text-sm sm:text-base animate-slide-up-delayed-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Streamline your workflow and efficiently manage all your task assignments in one unified platform.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3 sm:space-y-4 animate-slide-up-delayed-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:translate-y-0 group relative overflow-hidden"
            >
              <span className="relative z-10">Log In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => navigate('/signup')}
              className={`w-full px-6 py-3 sm:py-4 font-semibold rounded-lg border transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:translate-y-0 group relative
                ${isDarkMode
                  ? 'bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-cyan-500/30'
                  : 'bg-white text-blue-700 border-blue-500 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-800 shadow-md'}
              `}
            >
              <span className="relative z-10">Create Account</span>
              {isDarkMode ? (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              ) : null}
            </button>
          </div>

          {/* Footer */}
          <div className={`pt-6 border-t text-center animate-slide-up-delayed-4 ${
            isDarkMode ? 'border-white/10 text-gray-400' : 'border-gray-300 text-gray-600'
          }`}>
            <p className="text-sm">
              Get started in seconds
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className={`text-center mt-8 text-xs animate-fade-in ${
          isDarkMode ? 'text-gray-500' : 'text-gray-600'
        }`} style={{ animationDelay: '1.2s' }}>
          © 2025 Videography Management System
        </div>
      </div>
    </div>
  );
};

export default Welcome;
