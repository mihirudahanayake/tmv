import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import {
  FaFileAlt,
  FaAlignLeft,
  FaCalendarAlt,
  FaExclamationCircle,
  FaUsers,
  FaSearch,
  FaBox
} from 'react-icons/fa';

const WORK_ROLES = ['videography', 'editing'];

const EditOldWork = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWork = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, 'works', id));
        if (snap.exists()) {
          setFormData({ ...snap.data(), id });
        } else {
          setMessage('Old work not found.');
        }
      } catch {
        setMessage('Failed to load old work.');
      } finally {
        setLoading(false);
      }
    };
    fetchWork();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateDoc(doc(db, 'works', id), {
        title: formData.title,
        description: formData.description,
        date: formData.date || null,
        deadline: formData.deadline || null,
        priority: formData.priority,
        assignedUsers: formData.assignedUsers || [],
        assignedUserDetails: formData.assignedUserDetails || [],
        assignedItems: formData.assignedItems || [],
        // status and type remain unchanged
      });
      setMessage('Old work updated!');
      setTimeout(() => navigate('/work-list'), 1000);
    } catch {
      setMessage('Failed to update old work.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this old work? This action cannot be undone.')) return;
    setLoading(true);
    setMessage('');
    try {
      await deleteDoc(doc(db, 'works', id));
      setMessage('Old work deleted!');
      setTimeout(() => navigate('/work-list'), 1000);
    } catch {
      setMessage('Failed to delete old work.');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Header userType="admin" />
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Edit Old Work</h2>
          {message && <div className="mb-4 p-3 rounded text-sm bg-green-100 text-green-700">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaFileAlt />
                <span>Work Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaAlignLeft />
                <span>Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  <FaCalendarAlt />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  <FaCalendarAlt />
                  <span>Deadline</span>
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaExclamationCircle />
                <span>Priority</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm sm:text-base mb-2"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50 text-sm sm:text-base"
            >
              Delete Work
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditOldWork;
