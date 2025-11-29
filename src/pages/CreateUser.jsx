import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaVideo, FaUserTag } from 'react-icons/fa';
import Header from '../components/Header';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
    specialty: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        specialty: formData.specialty,
        createdAt: new Date().toISOString()
      });

      setMessage({ type: 'success', text: 'User created successfully!' });
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        phone: '',
        specialty: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Create New User Account
          </h2>
          
          {message.text && (
            <div className={`mb-4 p-3 sm:p-4 rounded text-sm sm:text-base ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaUser />
                <span>Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaEnvelope />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaLock />
                <span>Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaPhone />
                <span>Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaVideo />
                <span>Specialty</span>
              </label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">Select Specialty</option>
                <option value="camera-operator">Camera Operator</option>
                <option value="editor">Video Editor</option>
                <option value="drone-pilot">Drone Pilot</option>
                <option value="sound-engineer">Sound Engineer</option>
                <option value="lighting">Lighting Technician</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaUserTag />
                <span>Role</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Creating User...' : 'Create User Account'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateUser;
