import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-float opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-200 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-200 rounded-full animate-float opacity-50" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-float opacity-60" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-12 space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 animate-pulse-glow relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-spin-slow opacity-75"></div>
              <span className="text-white font-bold text-2xl relative z-10">TMV</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 overflow-hidden whitespace-nowrap border-r-2 border-cyan-400 animate-typing-welcome">
              Welcome
            </h1>
            <p className="text-lg text-blue-200 font-semibold animate-slide-up-delayed">
              Task Management & Verification
            </p>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base animate-slide-up-delayed-2">
              Streamline your workflow and efficiently manage all your task assignments in one unified platform.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3 sm:space-y-4 animate-slide-up-delayed-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:translate-y-0 group relative overflow-hidden"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="w-full px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:translate-y-0 group relative"
            >
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-white/10 text-center animate-slide-up-delayed-4">
            <p className="text-sm text-gray-400">
              Get started in seconds
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-8 text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          © 2025 Task Management System
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
        }
        .animate-float {
          animation: float 15s infinite ease-in;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up-delayed {
          animation: slide-up 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-2 {
          animation: slide-up 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-3 {
          animation: slide-up 0.8s ease-out 0.7s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-4 {
          animation: slide-up 0.8s ease-out 0.9s forwards;
          opacity: 0;
        }

        @keyframes typing {
          0% {
            width: 0;
            border-right-color: rgba(34, 211, 238, 0.75);
          }
          50% {
            border-right-color: rgba(34, 211, 238, 0.75);
          }
          100% {
            width: 100%;
            border-right-color: transparent;
          }
        }

        @keyframes typing-welcome {
          0% {
            width: 0;
            border-right-color: rgba(34, 211, 238, 0.75);
          }
          50% {
            border-right-color: rgba(34, 211, 238, 0.75);
          }
          100% {
            width: 100%;
            border-right-color: transparent;
          }
        }

        .animate-typing-welcome {
          animation: typing-welcome 2.5s steps(7, end) 0.3s forwards;
          width: 0;
        }

        @keyframes blink-caret {
          0%, 50% {
            border-right-color: rgba(34, 211, 238, 0.75);
          }
          100% {
            border-right-color: transparent;
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        @keyframes blob {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.7); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
