import { useEffect, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { FaSun, FaMoon, FaArrowLeft, FaEye, FaEyeSlash, FaSignInAlt, FaSpinner } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { initPushForUser } from '../hooks/usePushNotifications';
import { normalizeRole, SITE_ADMIN_EMAIL } from '../utils/authz';

const getLoginErrorMessage = (error) => {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'The email or password you entered is incorrect.';
    case 'auth/user-disabled':
      return 'This account is disabled. Please contact an administrator.';
    case 'auth/too-many-requests':
      return 'There have been too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'We could not connect. Check your internet connection and try again.';
    default:
      return error?.message || 'We could not sign you in. Please try again.';
  }
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    const message = location?.state?.info;
    if (typeof message === 'string' && message.trim()) {
      setInfo(message);
      // Clear route state so it doesn't reappear on back/refresh.
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setError('');
    setInfo('');
    setShowResendVerification(false);
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setShowResendVerification(false);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const user = userCredential.user;
      if (!user.emailVerified) {
        await signOut(auth);
        setShowResendVerification(true);
        setError('Please verify your email address using the link we sent before logging in.');
        return;
      }

      // Setup push for this user
      await initPushForUser(user.uid);

      const profileRef = doc(db, 'users', user.uid);
      const profileSnap = await getDoc(profileRef);

      let userType = 'user';
      let role = 'member';
      let userData = { uid: user.uid, email: user.email };
      if (profileSnap.exists()) {
        const data = profileSnap.data();
        userType = data.userType || 'user';
        role = normalizeRole(data);
        userData = { ...userData, ...data };
      }

      // Store user info in localStorage with uid
      localStorage.setItem('user', JSON.stringify(userData));

      if ((user.email || '').toLowerCase() === SITE_ADMIN_EMAIL) {
        navigate('/site-admin');
        return;
      }

      if (role === 'superAdmin') {
        navigate('/super-admin');
      } else if (userType === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setError('');
    setInfo('');
    setResendingVerification(true);
    let verificationUser = null;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );
      verificationUser = userCredential.user;

      if (verificationUser.emailVerified) {
        setShowResendVerification(false);
        setInfo('Your email is already verified. You can sign in now.');
        return;
      }

      await sendEmailVerification(verificationUser);
      setInfo(`A new verification link was sent to ${verificationUser.email || form.email.trim()}. Check your inbox and spam folder.`);
    } catch (resendError) {
      setError(getLoginErrorMessage(resendError));
    } finally {
      if (verificationUser && auth.currentUser?.uid === verificationUser.uid) {
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error('Failed to sign out after resending a verification email.', signOutError);
          setInfo('');
          setError('We could not safely end this sign-in session. Reload the page before continuing.');
        }
      }
      setResendingVerification(false);
    }
  };

  return (
    <div className={`relative flex min-h-screen items-center justify-center overflow-hidden px-3 py-16 transition-colors duration-300 sm:px-6 sm:py-20 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100'
        : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-slate-900'
    }`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl ${
          isDarkMode ? 'bg-indigo-700/20' : 'bg-indigo-300/40'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full blur-3xl ${
          isDarkMode ? 'bg-cyan-700/20' : 'bg-cyan-200/60'
        }`}
      />

      <button
        type="button"
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:top-6 sm:right-6 ${
          isDarkMode
            ? 'border-slate-600 bg-slate-800 text-amber-300 hover:bg-slate-700'
            : 'border-white bg-white text-indigo-600 shadow-sm hover:bg-indigo-50'
        }`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <main className="relative z-10 w-full max-w-md">
        <section className={`rounded-3xl border p-5 shadow-2xl backdrop-blur-md transition-colors duration-300 sm:p-8 ${
          isDarkMode
            ? 'border-slate-700/80 bg-slate-900/95 shadow-black/30'
            : 'border-white/80 bg-white/95 shadow-slate-900/10'
        }`}>
          <button
            type="button"
            onClick={() => navigate('/')}
            className={`mb-7 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
              isDarkMode
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FaArrowLeft />
            Back to welcome
          </button>

          <div className="mb-7">
            <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg ${
              isDarkMode ? 'bg-indigo-400/10 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
            }`}>
              <FaSignInAlt />
            </div>
            <p className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${
              isDarkMode ? 'text-indigo-300' : 'text-indigo-700'
            }`}>
              Welcome back
            </p>
            <h1 className={`text-2xl font-bold tracking-tight sm:text-3xl ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Sign in to your account
            </h1>
            <p className={`mt-2 text-sm leading-6 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Enter your details to continue to your workspace.
            </p>
          </div>

          {error ? (
            <div
              role="alert"
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                isDarkMode
                  ? 'border-rose-900/70 bg-rose-950/50 text-rose-200'
                  : 'border-rose-200 bg-rose-50 text-rose-700'
              }`}
            >
              {error}
            </div>
          ) : null}

          {showResendVerification ? (
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={loading || resendingVerification}
              className={`mb-5 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isDarkMode
                  ? 'border-indigo-700/70 bg-indigo-950/40 text-indigo-200 hover:bg-indigo-900/50'
                  : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              {resendingVerification ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending verification link...
                </>
              ) : (
                'Send verification link again'
              )}
            </button>
          ) : null}

          {info ? (
            <div
              role="status"
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                isDarkMode
                  ? 'border-blue-900/70 bg-blue-950/50 text-blue-200'
                  : 'border-blue-200 bg-blue-50 text-blue-700'
              }`}
            >
              {info}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className={`mb-1.5 block text-sm font-semibold ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                Email address
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                required
                className={`w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition focus:ring-4 ${
                  isDarkMode
                    ? 'border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-500/15'
                    : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/10'
                }`}
              />
            </label>

            <div>
              <label htmlFor="login-password" className={`mb-1.5 block text-sm font-semibold ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                Password
              </label>
              <span className="relative block">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className={`w-full rounded-xl border px-3.5 py-3 pr-12 text-sm outline-none transition focus:ring-4 ${
                    isDarkMode
                      ? 'border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-500/15'
                      : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className={`absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg transition ${
                    isDarkMode
                      ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </span>
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  disabled={loading}
                  className={`text-sm font-semibold transition hover:underline disabled:opacity-60 ${
                    isDarkMode
                      ? 'text-indigo-300 hover:text-indigo-200'
                      : 'text-indigo-700 hover:text-indigo-800'
                  }`}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  Sign in
                </>
              )}
            </button>
          </form>

          <p className={`mt-6 border-t pt-5 text-center text-sm ${
            isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            New here?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className={`font-semibold hover:underline ${
                isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-700 hover:text-indigo-800'
              }`}
            >
              Create an account
            </button>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
