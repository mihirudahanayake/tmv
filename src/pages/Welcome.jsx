import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-blue-600">TMV</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
          <p className="text-blue-100 text-lg">Task Management & Videography</p>
        </div>

        {/* Description */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-8 text-center">
          <p className="text-blue-50 text-sm leading-relaxed">
            Manage your work tasks, assignments, and videography projects efficiently. 
            Sign in to your account or create a new one to get started.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Login Button */}
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Login
          </button>

          {/* Signup Button */}
          <button
            onClick={() => navigate('/signup')}
            className="w-full bg-blue-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-blue-100 text-sm">
          <p>FOT Media | Rajarata University</p>
          <p className="mt-1">Videography Department</p>
        </div>
      </div>
    </div>
  );
}
