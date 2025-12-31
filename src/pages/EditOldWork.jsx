import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
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
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [usersError, setUsersError] = useState('');
  const [itemsError, setItemsError] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
    useEffect(() => {
      // fetch users and items for selectors
      const fetchUsers = async () => {
        setUsersLoading(true);
        setUsersError('');
        try {
          const querySnapshot = await getDocs(collection(db, 'users'));
          const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          usersData.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          setUsers(usersData);
        } catch (error) {
          setUsersError('Failed to load users');
          setUsers([]);
          console.error('Error fetching users:', error);
        } finally {
          setUsersLoading(false);
        }
      };
      const fetchItems = async () => {
        setItemsLoading(true);
        setItemsError('');
        try {
          const snapshot = await getDocs(collection(db, 'inventory'));
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          data.sort((a, b) => (a.itemName || '').localeCompare(b.itemName || ''));
          setItems(data);
        } catch (error) {
          setItemsError('Failed to load items');
          setItems([]);
          console.error('Error fetching inventory:', error);
        } finally {
          setItemsLoading(false);
        }
      };
      fetchUsers();
      fetchItems();
    }, []);
    const handleUserSelection = (userId) => {
      setFormData((prev) => {
        const existing = (prev.assignedUserDetails || []).find((u) => u.userId === userId);
        if (existing) {
          return {
            ...prev,
            assignedUserDetails: prev.assignedUserDetails.filter((u) => u.userId !== userId),
            assignedUsers: prev.assignedUsers.filter((id) => id !== userId)
          };
        }
        return {
          ...prev,
          assignedUserDetails: [ ...(prev.assignedUserDetails || []), { userId, roles: ['videography'] } ],
          assignedUsers: [ ...(prev.assignedUsers || []), userId ]
        };
      });
    };

    const handleUserRoleToggle = (userId, role) => {
      setFormData((prev) => {
        const next = (prev.assignedUserDetails || []).map((item) => {
          if (item.userId !== userId) return item;
          const hasRole = item.roles.includes(role);
          const roles = hasRole ? item.roles.filter((r) => r !== role) : [...item.roles, role];
          return { ...item, roles: roles.length ? roles : [role] };
        });
        return { ...prev, assignedUserDetails: next };
      });
    };

    const handleItemSelection = (itemId) => {
      setFormData((prev) => ({
        ...prev,
        assignedItems: (prev.assignedItems || []).includes(itemId)
          ? prev.assignedItems.filter((id) => id !== itemId)
          : [...(prev.assignedItems || []), itemId]
      }));
    };
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
            {/* Assign users */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaUsers />
                <span>Assign Team Members</span>
              </label>
              <div className="relative mb-2">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by name or card..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="border border-gray-300 rounded p-3 sm:p-4 max-h-60 overflow-y-auto">
                {usersLoading ? (
                  <p className="text-gray-500 text-sm sm:text-base">Loading users...</p>
                ) : usersError ? (
                  <p className="text-red-500 text-sm sm:text-base">{usersError}</p>
                ) : (() => {
                  const normalizedUserSearch = userSearch.trim().toLowerCase();
                  const filteredUsers = users.filter((u) => {
                    if (!normalizedUserSearch) return true;
                    const name = (u.name || '').toLowerCase();
                    const card = (u.cardNumber || '').toLowerCase();
                    return name.includes(normalizedUserSearch) || card.includes(normalizedUserSearch);
                  });
                  const isUserSelected = (userId) => (formData.assignedUserDetails || []).some((u) => u.userId === userId);
                  const getUserRoles = (userId) => (formData.assignedUserDetails || []).find((u) => u.userId === userId)?.roles || [];
                  return filteredUsers.length === 0 ? (
                    <p className="text-gray-500 text-sm sm:text-base">No users found</p>
                  ) : (
                    filteredUsers.map((user) => {
                      const selected = isUserSelected(user.id);
                      const roles = getUserRoles(user.id);
                      return (
                        <div key={user.id} className="mb-2 p-2 rounded hover:bg-gray-50">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => handleUserSelection(user.id)}
                              className="mr-3 w-4 h-4"
                            />
                            <div className="flex-1">
                              <p className="text-gray-700 text-sm sm:text-base">
                                {user.name}{' '}
                                <span className="text-xs text-gray-500">({user.cardNumber || '-'})</span>
                              </p>
                            </div>
                          </label>
                          {selected && (
                            <div className="mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm">
                              {WORK_ROLES.map((role) => (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => handleUserRoleToggle(user.id, role)}
                                  className={`px-2 py-1 rounded border ${roles.includes(role) ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300'}`}
                                >
                                  {role}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  );
                })()}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Selected: {(formData.assignedUserDetails || []).length} member(s)</p>
            </div>
            {/* Inventory items selector */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <FaBox />
                <span>Assign Inventory Items (Optional)</span>
              </label>
              <div className="relative mb-2">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by item name or number..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="border border-gray-300 rounded p-3 sm:p-4 max-h-60 overflow-y-auto">
                {itemsLoading ? (
                  <p className="text-gray-500 text-sm sm:text-base">Loading items...</p>
                ) : itemsError ? (
                  <p className="text-red-500 text-sm sm:text-base">{itemsError}</p>
                ) : (() => {
                  const normalizedItemSearch = itemSearch.trim().toLowerCase();
                  const filteredItems = items.filter((item) => {
                    if (!normalizedItemSearch) return true;
                    const name = (item.itemName || '').toLowerCase();
                    const no = (item.itemNo || '').toLowerCase();
                    return name.includes(normalizedItemSearch) || no.includes(normalizedItemSearch);
                  });
                  return filteredItems.length === 0 ? (
                    <p className="text-gray-500 text-sm sm:text-base">No items found</p>
                  ) : (
                    filteredItems.map((item) => (
                      <label key={item.id} className="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={(formData.assignedItems || []).includes(item.id)}
                          onChange={() => handleItemSelection(item.id)}
                          className="mr-3 w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="text-gray-700 text-sm sm:text-base">
                            {item.itemName}{' '}
                            <span className="text-xs text-gray-500">({item.itemNo})</span>
                          </p>
                          {item.details && (
                            <p className="text-xs text-gray-500 mt-0.5">{item.details}</p>
                          )}
                        </div>
                      </label>
                    ))
                  );
                })()}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Selected: {(formData.assignedItems || []).length} item(s)</p>
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
