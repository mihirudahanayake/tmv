import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';
import { FaSun, FaMoon, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const ADMIN_EMAIL = 'mihirudahanayake@gmail.com';

const WORK_DEPARTMENTS = ['videography', 'photography'];

const Signup = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNo: '',
    // work departments as array
    departments: ['videography'],
    firstPriority: 'videography',
    batch: '20/21',
    studyDepartment: 'ITT',
    gender: 'male',
    registrationNumber: '',
    cardNumber: '',
    birthday: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDepartmentToggle = (value) => {
    setForm((prev) => {
      const exists = prev.departments.includes(value);
      const next = exists
        ? prev.departments.filter((d) => d !== value)
        : [...prev.departments, value];

      // ensure firstPriority always in selected list
      let nextFirst = prev.firstPriority;
      if (!next.includes(nextFirst)) {
        nextFirst = next[0] || '';
      }

      return { ...prev, departments: next, firstPriority: nextFirst };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    if (form.departments.length === 0) {
      setError('Please select at least one work department.');
      return;
    }
    if (!form.batch) {
      setError('Please select your batch.');
      return;
    }
    if (!form.studyDepartment) {
      setError('Please select your department in study.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;
      const userType = user.email === ADMIN_EMAIL ? 'admin' : 'user';

      await setDoc(doc(db, 'users', user.uid), {
        name: form.name,
        email: form.email,
        phoneNo: form.phoneNo,
        // work fields
        departments: form.departments,
        firstPriority: form.firstPriority,
        // study / personal
        batch: form.batch,
        studyDepartment: form.studyDepartment,
        gender: form.gender,
        registrationNumber: form.registrationNumber,
        cardNumber: form.cardNumber || null,
        birthday: form.birthday || null,
        userType,
        createdAt: new Date().toISOString()
      });

      if (userType === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setLoading(false);
    }
  };

  const isDeptSelected = (value) => form.departments.includes(value);

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
      <div className={`w-full max-w-md rounded-lg shadow-md p-4 sm:p-6 transition-colors duration-300 my-8 sm:my-12 ${
        isDarkMode ? 'bg-slate-900 border border-slate-700 text-gray-100' : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            Create Your Account
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
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 text-center">Fill in your details to get started. All fields marked * are required.</p>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@email.com"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNo"
              value={form.phoneNo}
              onChange={handleChange}
              required
              placeholder="07XXXXXXXX"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          {/* Batch */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Batch <span className="text-red-500">*</span>
            </label>
            <select
              name="batch"
              value={form.batch}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            >
              <option value="">Select batch</option>
              <option value="20/21">20/21</option>
              <option value="21/22">21/22</option>
              <option value="22/23">22/23</option>
              <option value="23/24">23/24</option>
            </select>
          </div>

          {/* Study department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Department in study <span className="text-red-500">*</span>
            </label>
            <select
              name="studyDepartment"
              value={form.studyDepartment}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            >
              <option value="">Select department</option>
              <option value="ITT">ITT</option>
              <option value="EET">EET</option>
              <option value="MTT">MTT</option>
              <option value="BPT">BPT</option>
              <option value="Food">Food</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Gender
            </label>
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={handleChange}
                  className="dark:bg-slate-800 dark:border-slate-700"
                />
                <span className="dark:text-gray-100">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleChange}
                  className="dark:bg-slate-800 dark:border-slate-700"
                />
                <span className="dark:text-gray-100">Female</span>
              </label>
            </div>
          </div>

          {/* Registration number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Registration number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
              required
              placeholder="Ex: ITT/2021/123"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          {/* Card number (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Card
            </label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="If you have one"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          {/* Birthday */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            />
          </div>

          {/* Work departments (multiple) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Departments (work) <span className="text-red-500">*</span>
            </label>
            <div className="bg-gray-50 border rounded p-2 flex flex-col gap-1 dark:bg-slate-800 dark:border-slate-700">
              {WORK_DEPARTMENTS.map((dept) => (
                <label key={dept} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isDeptSelected(dept)}
                    onChange={() => handleDepartmentToggle(dept)}
                    className="dark:bg-slate-800 dark:border-slate-700"
                    required={form.departments.length === 0}
                  />
                  <span className="capitalize dark:text-gray-100">{dept}</span>
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
              You must select at least one department.
            </p>
          </div>

          {/* First priority work department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              First priority department (work)
            </label>
            <select
              name="firstPriority"
              value={form.firstPriority}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            >
              {form.departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700 pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-8 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Re-enter your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700 pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-2 top-8 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 focus:outline-none"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="mt-3 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-600 font-semibold cursor-pointer hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
