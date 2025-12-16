import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc
} from 'firebase/firestore';

import { db } from '../firebase/config';
import {
  FaFileAlt,
  FaAlignLeft,
  FaCalendarAlt,
  FaExclamationCircle,
  FaUsers,
  FaSearch,
  FaBox
} from 'react-icons/fa';
import Header from '../components/Header';

const WORK_ROLES = ['videography', 'editing'];

const AssignWork = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'medium',
    assignedUsers: [], // [{ userId, roles: ['videography'] }]
    assignedItems: [] // [itemId, itemId, ...]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userSearch, setUserSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchItems();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'inventory'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      // sort alphabetically by itemName
      data.sort((a, b) => {
        const nameA = (a.itemName || '').toLowerCase();
        const nameB = (b.itemName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setItems(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // toggle user selection
  const handleUserSelection = (userId) => {
    setFormData((prev) => {
      const existing = prev.assignedUsers.find((u) => u.userId === userId);
      if (existing) {
        return {
          ...prev,
          assignedUsers: prev.assignedUsers.filter((u) => u.userId !== userId)
        };
      }
      return {
        ...prev,
        assignedUsers: [
          ...prev.assignedUsers,
          { userId, roles: ['videography'] }
        ]
      };
    });
  };

  // toggle role for a user
  const handleUserRoleToggle = (userId, role) => {
    setFormData((prev) => {
      const next = prev.assignedUsers.map((item) => {
        if (item.userId !== userId) return item;
        const hasRole = item.roles.includes(role);
        const roles = hasRole
          ? item.roles.filter((r) => r !== role)
          : [...item.roles, role];

        return { ...item, roles: roles.length ? roles : [role] };
      });
      return { ...prev, assignedUsers: next };
    });
  };

  // toggle item selection
  const handleItemSelection = (itemId) => {
    setFormData((prev) => ({
      ...prev,
      assignedItems: prev.assignedItems.includes(itemId)
        ? prev.assignedItems.filter((id) => id !== itemId)
        : [...prev.assignedItems, itemId]
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ type: '', text: '' });

  try {
    // 1) Create work document
    await addDoc(collection(db, 'works'), {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      priority: formData.priority,
      assignedUsers: formData.assignedUsers.map((u) => u.userId),
      assignedUserDetails: formData.assignedUsers,
      assignedItems: formData.assignedItems,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });

    // 2) Get emails of assigned users from `users` collection
    const emailPromises = formData.assignedUsers.map(async ({ userId }) => {
      const snap = await getDoc(doc(db, 'users', userId));
      const data = snap.data();
      return data?.email || null; // assumes each user doc has `email`
    });

    const emails = (await Promise.all(emailPromises)).filter(Boolean);

    // 3) Write `mail` document so Trigger Email extension sends emails
    if (emails.length > 0) {
      await addDoc(collection(db, 'mail'), {
        to: emails,
        message: {
          subject: `New work assigned: ${formData.title}`,
          text: `You have been assigned to a new work:\n\nTitle: ${formData.title}\nDescription: ${formData.description}\nDate: ${formData.date}`,
          html: `<p>Hello,</p> <p>You have been assigned a new work. Please find the details below:</p> 
          <p><b>Title:</b> ${formData.title}</p> 
          <p><b>Date:</b> ${formData.date}</p> 
          <p><b>Description :</b> ${formData.description}</p>
          <p>Kindly review and confirm the work by visiting the <a href="https://mihirudahanayake.github.io/tmv/">Videography Manager</a> Website</p> 
          <p>If you encounter any issues or need further assistance, feel free to contact me.</p> 
          <p>Thank you.</p> 
          
          <p>Best regards,</p>

          <p style="color:#A3A9AD">
            <strong>Mihiru Dahanayake</strong><br>
            <i>Acting Videography Department Head<br>FOT Media<br>Faculty Of Technology<br>Rajarata University of Sri Lanka<br>
            <a href="tel:+94703426554" style="color:#0066cc; text-decoration:none;">070 342 6554</a><br>
            <a href="mailto:mihirudahanayake@gmail.com" style="color:#0066cc; text-decoration:none;">mihiru.online@gmail.com</a></i><br>
          </p>`
        }
      });
    }

    setMessage({ type: 'success', text: 'Work assigned successfully!' });
    setFormData({
      title: '',
      description: '',
      date: '',
      priority: 'medium',
      assignedUsers: [],
      assignedItems: []
    });
  } catch (error) {
    setMessage({ type: 'error', text: error.message });
  } finally {
    setLoading(false);
  }
};


  const isUserSelected = (userId) =>
    formData.assignedUsers.some((u) => u.userId === userId);

  const getUserRoles = (userId) =>
    formData.assignedUsers.find((u) => u.userId === userId)?.roles || [];

  const normalizedUserSearch = userSearch.trim().toLowerCase();
  const filteredUsers = users.filter((u) => {
    if (!normalizedUserSearch) return true;
    const name = (u.name || '').toLowerCase();
    const card = (u.cardNumber || '').toLowerCase();
    return name.includes(normalizedUserSearch) || card.includes(normalizedUserSearch);
  });

  const normalizedItemSearch = itemSearch.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    if (!normalizedItemSearch) return true;
    const name = (item.itemName || '').toLowerCase();
    const no = (item.itemNo || '').toLowerCase();
    return name.includes(normalizedItemSearch) || no.includes(normalizedItemSearch);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Create and Assign Work
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
                required
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
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
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
            </div>

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
                {filteredUsers.length === 0 ? (
                  <p className="text-gray-500 text-sm sm:text-base">
                    No users found
                  </p>
                ) : (
                  filteredUsers.map((user) => {
                    const selected = isUserSelected(user.id);
                    const roles = getUserRoles(user.id);

                    return (
                      <div
                        key={user.id}
                        className="mb-2 p-2 rounded hover:bg-gray-50"
                      >
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
                              <span className="text-xs text-gray-500">
                                ({user.cardNumber || '-'})
                              </span>
                            </p>
                          </div>
                        </label>

                        {selected && (
                          <div className="mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm">
                            {WORK_ROLES.map((role) => (
                              <button
                                key={role}
                                type="button"
                                onClick={() =>
                                  handleUserRoleToggle(user.id, role)
                                }
                                className={`px-2 py-1 rounded border ${
                                  roles.includes(role)
                                    ? 'bg-green-600 text-white border-green-600'
                                    : 'bg-white text-gray-700 border-gray-300'
                                }`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Selected: {formData.assignedUsers.length} member(s)
              </p>
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
                {filteredItems.length === 0 ? (
                  <p className="text-gray-500 text-sm sm:text-base">
                    No items found
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={formData.assignedItems.includes(item.id)}
                        onChange={() => handleItemSelection(item.id)}
                        className="mr-3 w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm sm:text-base">
                          {item.itemName}{' '}
                          <span className="text-xs text-gray-500">
                            ({item.itemNo})
                          </span>
                        </p>
                        {item.details && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.details}
                          </p>
                        )}
                      </div>
                    </label>
                  ))
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Selected: {formData.assignedItems.length} item(s)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || formData.assignedUsers.length === 0}
              className="w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Creating Work...' : 'Create and Assign Work'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AssignWork;
