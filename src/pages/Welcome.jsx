import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Welcome() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,255,.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="relative">
            {/* Glowing Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>

            {/* Card Content */}
            <div className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-12">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>

              {/* Logo Section */}
              <div className="text-center mb-10">
                {/* Animated Logo */}
                <div className="inline-block mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl w-24 h-24 flex items-center justify-center border border-cyan-400/50">
                    <span className="text-5xl font-black text-white drop-shadow-lg">TMV</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-5xl font-black text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Welcome
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-cyan-300 font-light tracking-widest mb-2">TASK MANAGEMENT</p>
                <p className="text-lg text-purple-300 font-light">& VIDEOGRAPHY PLATFORM</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8"></div>

              {/* Description */}
              <div className="text-center mb-10">
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
                  Experience the future of project management. Seamlessly coordinate your videography assignments, track progress, and collaborate with your team in real-time.
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Login Button */}
                <button
                  onMouseEnter={() => setHoveredButton('login')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => navigate('/login')}
                  className="group relative overflow-hidden rounded-xl py-4 px-6 font-bold text-white transition-all duration-300 transform hover:scale-105"
                >
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gray-900/50 border border-cyan-500/50 group-hover:border-cyan-400 rounded-xl transition-all duration-300"></div>

                  {/* Button Text */}
                  <span className="relative flex items-center justify-center gap-2">
                    <span>LOGIN</span>
                    {hoveredButton === 'login' && <span className="text-lg">→</span>}
                  </span>
                </button>

                {/* Signup Button */}
                <button
                  onMouseEnter={() => setHoveredButton('signup')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => navigate('/signup')}
                  className="group relative overflow-hidden rounded-xl py-4 px-6 font-bold text-white transition-all duration-300 transform hover:scale-105"
                >
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gray-900/50 border border-purple-500/50 group-hover:border-purple-400 rounded-xl transition-all duration-300"></div>

                  {/* Button Text */}
                  <span className="relative flex items-center justify-center gap-2">
                    <span>SIGN UP</span>
                    {hoveredButton === 'signup' && <span className="text-lg">→</span>}
                  </span>
                </button>
              </div>

              {/* Alternative Login */}
              <div className="text-center text-xs text-gray-500 mb-8">
                OR
              </div>

              {/* Social Indicators */}
              <div className="flex justify-center gap-3 mb-8">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-cyan-500/10 pt-8">
                <p className="text-cyan-400 font-semibold text-sm mb-1">FOT MEDIA</p>
                <p className="text-gray-500 text-xs">Rajarata University • Videography Department</p>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-8 text-center text-gray-600 text-xs">
            <p>© 2025 TMV Platform. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
