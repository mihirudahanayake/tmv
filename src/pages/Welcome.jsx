import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import FotMediaLogo from '../components/FotMediaLogo';

const Welcome = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();
  const copyrightSymbol = '\u00A9';

  return (
    <div className="fot-entry relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      {/* Dark Mode Toggle Button */}
      <button
        type="button"
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:top-6 sm:right-6 ${
          isDarkMode
            ? 'border-slate-600 bg-gray-700/80 hover:bg-gray-600 text-yellow-300'
            : 'border-blue-300 bg-blue-200/80 hover:bg-blue-300 text-blue-600'
        }`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="fot-panel space-y-7 rounded-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <FotMediaLogo darkSurface={isDarkMode} className="mx-auto mb-4 block h-auto w-40 max-w-full" />
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
              Welcome
            </h1>
            <p className={`text-lg font-semibold animate-slide-up-delayed ${
              isDarkMode ? 'text-blue-200' : 'text-blue-700'
            }`}>
              Task, Inventory Management & Verification
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
              className="fot-primary w-full rounded-xl px-6 py-3 font-semibold sm:py-4"
            >
              Log In
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

        </div>

        {/* Bottom accent */}
        <div className={`text-center mt-8 text-xs animate-fade-in ${
          isDarkMode ? 'text-gray-500' : 'text-gray-600'
        }`} style={{ animationDelay: '1.2s' }}>
          {copyrightSymbol} {currentYear} Media Inventory Management System
        </div>
      </div>
    </div>
  );
};

export default Welcome;
