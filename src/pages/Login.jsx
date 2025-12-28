import { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { FaSun, FaMoon, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { initPushForUser } from '../hooks/usePushNotifications';

const Login = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // Setup push for this user
      await initPushForUser(user.uid);

      const profileRef = doc(db, 'users', user.uid);
      const profileSnap = await getDoc(profileRef);

      let userType = 'user';
      if (profileSnap.exists()) {
        const data = profileSnap.data();
        userType = data.userType || 'user';
      }

      if (userType === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
    }`}>
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
      <div className={`w-full max-w-md rounded-lg shadow-md p-4 sm:p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 border border-slate-700 text-gray-100' : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            Log In
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-2xl p-1"
            title="Go back"
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <p className="mt-3 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Do not have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-600 font-semibold cursor-pointer hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
