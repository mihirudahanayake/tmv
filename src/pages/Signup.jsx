import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';

const ADMIN_EMAIL = 'mihirudahanayake@gmail.com';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNo: '',
    department: 'videography',
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

  const [profileFile, setProfileFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setProfileFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password do not match.');
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

      let photoURL = null;
      if (profileFile) {
        const fileRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(fileRef, profileFile);
        photoURL = await getDownloadURL(fileRef);
      }

      await setDoc(doc(db, 'users', user.uid), {
        name: form.name,
        email: form.email,
        phoneNo: form.phoneNo,
        department: form.department,
        firstPriority: form.firstPriority,
        batch: form.batch,
        studyDepartment: form.studyDepartment,
        gender: form.gender,
        registrationNumber: form.registrationNumber,
        cardNumber: form.cardNumber || null,
        birthday: form.birthday || null,
        photoURL,
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Sign Up
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              name="phoneNo"
              value={form.phoneNo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Batch */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Batch
            </label>
            <select
              name="batch"
              value={form.batch}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="20/21">20/21</option>
              <option value="21/22">21/22</option>
              <option value="22/23">22/23</option>
              <option value="23/24">23/24</option>
            </select>
          </div>

          {/* Study department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Department in study
            </label>
            <select
              name="studyDepartment"
              value={form.studyDepartment}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="ITT">ITT</option>
              <option value="EET">EET</option>
              <option value="MTT">MTT</option>
              <option value="BPT">BPT</option>
              <option value="Food">Food</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleChange}
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Registration number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Registration number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Card number (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Card (if have)
            </label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Birthday */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Work department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Department (work)
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="videography">Videography</option>
              <option value="photography">Photography</option>
            </select>
          </div>

          {/* First priority work department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              First priority department (work)
            </label>
            <select
              name="firstPriority"
              value={form.firstPriority}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="videography">Videography</option>
              <option value="photography">Photography</option>
            </select>
          </div>

          {/* Profile picture */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Profile picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional. JPG or PNG, a few MB max.
            </p>
          </div> */}

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="mt-3 text-center text-xs sm:text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/')}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
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
