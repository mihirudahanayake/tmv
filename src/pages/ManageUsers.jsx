import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { FaUser, FaEnvelope, FaSpinner, FaSearch } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(data);
      } catch (err) {
        console.error('Error loading users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredUsers = users.filter((u) => {
    // batch filter
    if (batchFilter !== 'all' && (u.batch || '') !== batchFilter) return false;

    // department filter
    if (departmentFilter !== 'all' && (u.studyDepartment || '') !== departmentFilter) return false;

    // search by name or card
    if (!normalizedSearch) return true;
    const name = (u.name || '').toLowerCase();
    const card = (u.cardNumber || '').toLowerCase();

    return name.includes(normalizedSearch) || card.includes(normalizedSearch);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Manage users
        </h1>

        {/* Search + filters */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by name or card..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-40">
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All batches</option>
              <option value="20/21">20/21</option>
              <option value="21/22">21/22</option>
              <option value="22/23">22/23</option>
              <option value="23/24">23/24</option>
            </select>
          </div>

          <div className="w-full sm:w-40">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All departments</option>
              <option value="ITT">ITT</option>
              <option value="EET">EET</option>
              <option value="MTT">MTT</option>
              <option value="BPT">BPT</option>
              <option value="Food">Food</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin" />
            <span>Loading users...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base">
            No users match your search.
          </p>
        ) : (
          <div className="bg-white rounded-lg shadow-md divide-y">
            {filteredUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => navigate(`/users/${u.id}`)}
                className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar: show photoURL if exists, otherwise icon */}
                  {u.photoURL ? (
                    <img
                      src={u.photoURL}
                      alt={u.name || 'User'}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FaUser />
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {u.name || 'No name'}
                    </p>
                    <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                      <FaEnvelope /> {u.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      Card: {u.cardNumber || '-'} • Batch: {u.batch || '-'} • Dept: {u.studyDepartment || '-'}
                    </p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">
                  {u.userType || 'user'}
                </span>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
