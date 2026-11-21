import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import {
  FaSun,
  FaMoon,
  FaArrowRight,
  FaUserPlus,
  FaTasks,
  FaBoxOpen,
  FaUsersCog,
} from 'react-icons/fa';
import FotMediaLogo from '../components/FotMediaLogo';

const Welcome = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();
  const copyrightSymbol = '\u00A9';

  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: FaTasks,
      label: 'Task Tracking',
      detail: 'Real-time department & crew assignments',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: FaBoxOpen,
      label: 'Smart Inventory',
      detail: 'Instant gear checkout & availability',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: FaUsersCog,
      label: 'Team Sync',
      detail: 'Seamless crew coordination & notifications',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const xPct = ((clientX - left) / width) * 100;
    const yPct = ((clientY - top) / height) * 100;
    setMousePos({ x: xPct, y: yPct });
  };

  const handleCardMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setTilt({
      rotateX: Number((-y * 7).toFixed(2)),
      rotateY: Number((x * 7).toFixed(2)),
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fot-entry relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 select-none"
    >
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(24px, -28px, 0) scale(1.08); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-26px, 22px, 0) scale(0.95); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(240%) skewX(-18deg); }
        }
        .animate-float-slow { animation: floatSlow 11s ease-in-out infinite; }
        .animate-float-reverse { animation: floatReverse 13s ease-in-out infinite; }
        .group:hover .animate-shimmer { animation: shimmerSweep 0.9s ease-out forwards; }
      `}</style>

      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDarkMode
            ? `radial-gradient(520px circle at ${mousePos.x}% ${mousePos.y}%, rgba(56, 189, 248, 0.14), transparent 70%)`
            : `radial-gradient(520px circle at ${mousePos.x}% ${mousePos.y}%, rgba(37, 99, 235, 0.12), transparent 70%)`,
        }}
      />

      {/* Ambient Floating Orbs */}
      <div
        className={`pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl animate-float-slow ${
          isDarkMode ? 'bg-blue-600/20' : 'bg-sky-400/30'
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full blur-3xl animate-float-reverse ${
          isDarkMode ? 'bg-purple-600/20' : 'bg-indigo-400/25'
        }`}
      />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-[0.04] ${
          isDarkMode ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)]' : 'bg-[radial-gradient(#1e3a8a_1px,transparent_1px)]'
        } [background-size:22px_22px]`}
      />

      {/* Dark Mode Toggle Button */}
      <button
        type="button"
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 sm:top-6 sm:right-6 ${
          isDarkMode
            ? 'border-slate-600/80 bg-slate-800/80 hover:bg-slate-700 text-yellow-300 shadow-lg shadow-black/30'
            : 'border-blue-200 bg-white/80 hover:bg-white text-blue-600 shadow-md shadow-blue-900/5'
        }`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="transition-transform duration-500 rotate-0 hover:rotate-45">
          {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
        </span>
      </button>

      {/* Main Interactive 3D Tilt Card (retaining .fot-panel's original media theme bar) */}
      <div
        className={`relative z-10 w-full max-w-md transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
        }`}
        style={{ perspective: '1100px' }}
      >
        <div
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
          }}
          className="fot-panel relative overflow-hidden space-y-6 rounded-3xl p-7 sm:p-10 shadow-2xl"
        >
          {/* Header & Interactive Logo */}
          <div className="text-center space-y-3">
            <div className="group/logo relative mx-auto w-fit cursor-pointer">
              <div
                className={`absolute -inset-3 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover/logo:opacity-100 ${
                  isDarkMode ? 'bg-cyan-400/25' : 'bg-blue-500/20'
                }`}
              />
              <FotMediaLogo
                darkSurface={isDarkMode}
                className="relative mx-auto mb-3 block h-auto w-36 sm:w-40 max-w-full transition-transform duration-500 ease-out group-hover/logo:scale-105 group-hover/logo:-rotate-1"
              />
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all duration-700 delay-100 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              } ${
                isDarkMode
                  ? 'bg-blue-500/15 text-blue-300 border border-blue-400/20'
                  : 'bg-blue-50 text-blue-700 border border-blue-200/80'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Tracking</span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white transition-all duration-700 delay-150 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              Welcome
            </h1>

            <p
              className={`text-base sm:text-lg font-semibold transition-all duration-700 delay-200 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}
            >
              Smart Media Platform
            </p>
          </div>

          {/* Interactive Feature Pills Carousel */}
          <div
            className={`transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="grid grid-cols-3 gap-2">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                const isSelected = activeFeature === idx;
                return (
                  <button
                    key={feat.label}
                    type="button"
                    onClick={() => setActiveFeature(idx)}
                    onMouseEnter={() => setActiveFeature(idx)}
                    className={`group/pill flex flex-col items-center justify-center rounded-2xl p-2.5 text-center border transition-all duration-300 active:scale-95 ${
                      isSelected
                        ? isDarkMode
                          ? 'border-blue-400/50 bg-slate-800/90 shadow-md shadow-blue-500/10 -translate-y-0.5'
                          : 'border-blue-300 bg-blue-50/90 shadow-sm -translate-y-0.5'
                        : isDarkMode
                          ? 'border-slate-700/60 bg-slate-900/40 hover:bg-slate-800/60'
                          : 'border-slate-200/80 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${feat.color} text-white text-xs shadow-sm transition-transform duration-300 ${
                        isSelected ? 'scale-110' : 'group-hover/pill:scale-105'
                      }`}
                    >
                      <Icon />
                    </span>
                    <span
                      className={`text-[11px] font-semibold leading-tight ${
                        isSelected
                          ? isDarkMode
                            ? 'text-white'
                            : 'text-blue-900'
                          : isDarkMode
                            ? 'text-slate-400'
                            : 'text-slate-600'
                      }`}
                    >
                      {feat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Feature Description Box */}
            <div
              className={`mt-2.5 rounded-xl px-3.5 py-2.5 text-center text-xs sm:text-sm transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-900/60 text-gray-300 border border-slate-800'
                  : 'bg-slate-50/90 text-gray-600 border border-slate-200/70'
              }`}
            >
              {features[activeFeature].detail}
            </div>
          </div>

          {/* Interactive CTA Buttons */}
          <div
            className={`space-y-3 sm:space-y-3.5 pt-1 transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="group fot-primary relative w-full overflow-hidden rounded-xl px-6 py-3.5 sm:py-4 font-semibold shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/35 active:translate-y-0 active:scale-[0.99]"
            >
              <span className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Log In</span>
                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className={`group relative w-full overflow-hidden px-6 py-3.5 sm:py-4 font-semibold rounded-xl border transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 active:translate-y-0 active:scale-[0.99]
                ${isDarkMode
                  ? 'bg-white/10 backdrop-blur-md text-white border-white/25 hover:bg-white/15 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20'
                  : 'bg-white text-blue-700 border-blue-400 hover:bg-blue-50/80 hover:border-blue-600 hover:text-blue-800 shadow-sm hover:shadow-md'}
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaUserPlus className="text-sm transition-transform duration-300 group-hover:scale-110" />
                <span>Create Account</span>
              </span>
              {isDarkMode ? (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              ) : null}
            </button>
          </div>
        </div>

        {/* Bottom Accent */}
        <div
          className={`text-center mt-6 text-xs transition-opacity duration-1000 delay-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {copyrightSymbol} {currentYear} FOT Media. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Welcome;