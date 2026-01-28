import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import Header from '../components/Header';
import { useUserProfile } from '../hooks/useUserProfile';
import { formatWorkDepartmentLabel } from '../constants/workDepartments';

const CreateUser = () => {
  const { profile } = useUserProfile();
  const managedDept = (profile?.managedDepartments || [])[0] || 'videography';
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    email: '',
    phoneNo: '',
    departments: ['videography'],
    studyDepartment: '',
    gender: '',
    registrationNumber: '',
    cardNumber: '',
    birthday: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {

      // Generate a random UID for the user (since no email/password auth)
      const userId = 'user_' + Math.random().toString(36).slice(2, 12);
      await setDoc(doc(db, 'users', userId), {
        name: formData.name,
        batch: formData.batch,
        email: formData.email,
        phoneNo: formData.phoneNo,
        departments: [managedDept],
        studyDepartment: formData.studyDepartment,
        gender: formData.gender,
        registrationNumber: formData.registrationNumber,
        cardNumber: formData.cardNumber,
        birthday: formData.birthday,
        userType: 'user',
        role: 'member',
        createdAt: new Date().toISOString(),
      });

      setMessage({ type: 'success', text: 'User created successfully.' });
      setFormData({
        name: '',
        batch: '',
        email: '',
        phoneNo: '',
        departments: [managedDept],
        studyDepartment: '',
        gender: '',
        registrationNumber: '',
        cardNumber: '',
        birthday: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Create New User Account
          </h2>

          {message.text && (
            <div
              className={`mb-4 p-3 sm:p-4 rounded text-sm sm:text-base ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Work Department
              </label>
              <input
                type="text"
                value={formatWorkDepartmentLabel(managedDept)}
                disabled
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded bg-gray-100 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Name <span className="text-red-500">*</span>
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
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Batch <span className="text-red-500">*</span>
              </label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">Select batch</option>
                <option value="20/21">20/21</option>
                <option value="21/22">21/22</option>
                <option value="22/23">22/23</option>
                <option value="23/24">23/24</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Phone Number</label>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="07XXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Department in Study</label>
              <select
                name="studyDepartment"
                value={formData.studyDepartment}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">Select department</option>
                <option value="ITT">ITT</option>
                <option value="EET">EET</option>
                <option value="MTT">MTT</option>
                <option value="BPT">BPT</option>
                <option value="Food">Food</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Gender</label>
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Registration Number</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Ex: ITT/2021/123"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="If you have one"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Creating user...' : 'Create User'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateUser;
