import { useState } from 'react';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { FaSun, FaMoon, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { auth } from '../firebase/config';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      let methods = null;
      try {
        methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
      } catch {
        // Some Firebase projects may not reveal sign-in methods (anti-enumeration). Don't block reset.
      }

      await sendPasswordResetEmail(auth, normalizedEmail);

      if (methods && methods.length > 0) {
        setInfo('Password reset link sent.');
      } else {
        setInfo('If an account exists for this email, a password reset link has been sent.');
      }
    } catch (err) {
      setError(err?.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
      }`}
    >
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

      <div
        className={`w-full max-w-md rounded-lg shadow-md p-4 sm:p-6 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-slate-900 border border-slate-700 text-gray-100'
            : 'bg-white border border-gray-200 text-gray-800'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            Reset Password
          </h1>
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-2xl p-1"
            title="Back to login"
            aria-label="Back to login"
          >
            <FaArrowLeft />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        {info && (
          <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700 text-sm dark:bg-blue-900 dark:text-blue-200">
            <div className="font-semibold">{info}</div>
            <div className="mt-1">
              Check your inbox. If you don’t see it, please check your <span className="font-semibold">Spam/Junk</span> folder.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
