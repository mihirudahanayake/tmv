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
    deadline: '',
    priority: 'medium',
    assignedUsers: [], // [{ userId, roles: ['videography'] }]
    assignedItems: [] // [itemId, itemId, ...]
  });
  const [dateType, setDateType] = useState('date'); // 'date' | 'deadline'
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

      // Sort alphabetically by name
      usersData.sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });

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

  // Generate a PNG image summarizing the task (title, date, description, item thumbnails)
  const generateAndDownloadTaskImage = async ({ id, title, description, date, items = [] }) => {
    try {
      const width = 1200;
      const height = 630;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 48px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      const margin = 60;
      const maxTextWidth = width - margin * 2;

      // wrap title
      const drawWrappedText = (text, x, y, font, lineHeight, maxWidth) => {
        ctx.font = font;
        const words = (text || '').split(' ');
        let line = '';
        let curY = y;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, curY);
            line = words[n] + ' ';
            curY += lineHeight;
          } else {
            line = testLine;
          }
        }
        if (line) {
          ctx.fillText(line.trim(), x, curY);
          curY += lineHeight;
        }
        return curY;
      };

      let y = margin;
      y = drawWrappedText(title || 'New Task', margin, y, 'bold 48px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial', 56, maxTextWidth);

      // date
      if (date) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '16px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
        ctx.fillText(date, margin, y + 8);
        y += 36;
      }

      // description
      ctx.fillStyle = '#374151';
      y = drawWrappedText(description || '', margin, y + 8, '16px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial', 22, maxTextWidth);

      // load up to 4 thumbnails
      const thumbs = (items || []).slice(0, 4);
      const thumbSize = 160;
      const gap = 20;
      if (thumbs.length) {
        const startX = margin;
        let x = startX;
        const imgPromises = thumbs.map((it) => new Promise((resolve) => {
          if (!it || !it.imageUrl) return resolve(null);
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = it.imageUrl;
        }));

        const loaded = await Promise.all(imgPromises);
        const imgY = height - margin - thumbSize;
        for (let i = 0; i < loaded.length; i++) {
          const img = loaded[i];
          if (img) {
            // draw clipped thumbnail
            ctx.save();
            const dx = x;
            const dy = imgY;
            // draw border background
            ctx.fillStyle = '#f3f4f6';
            ctx.fillRect(dx - 4, dy - 4, thumbSize + 8, thumbSize + 8);
            // draw image aspect-fit
            let iw = img.width;
            let ih = img.height;
            const ratio = Math.max(thumbSize / iw, thumbSize / ih);
            const dw = iw * ratio;
            const dh = ih * ratio;
            const ox = dx + (thumbSize - dw) / 2;
            const oy = dy + (thumbSize - dh) / 2;
            ctx.drawImage(img, ox, oy, dw, dh);
            ctx.restore();
          }
          x += thumbSize + gap;
        }
      }

      // convert to blob and trigger download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `task-${id || Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 3000);
      }, 'image/png');
    } catch (err) {
      console.warn('generateAndDownloadTaskImage error', err);
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

    // Require at least one of date / deadline to be filled
    if (!formData.date && !formData.deadline) {
      setLoading(false);
      setMessage({
        type: 'error',
        text: 'Please select a date or a deadline.'
      });
      return;
    }

    try {
      // 1) Create work document
      const workRef = await addDoc(collection(db, 'works'), {
        title: formData.title,
        description: formData.description,
        date: formData.date || null,
        deadline: formData.deadline || null,
        dateType, // to know which one admin intended
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
// 3) Write `mail` document so Trigger Email extension sends emails
if (emails.length > 0) {
  const linesText = [];
  const linesHtml = [];

  linesText.push(`Title: ${formData.title}`);
  if (formData.date) {
    linesText.push(`Date: ${formData.date}`);
  }
  if (formData.deadline) {
    linesText.push(`Deadline: ${formData.deadline}`);
  }
  linesText.push(`Description: ${formData.description}`);

  linesHtml.push(`<p><b>Title:</b> ${formData.title}</p>`);
  if (formData.date) {
    linesHtml.push(`<p><b>Date:</b> ${formData.date}</p>`);
  }
  if (formData.deadline) {
    linesHtml.push(`<p><b>Deadline:</b> ${formData.deadline}</p>`);
  }
  linesHtml.push(`<p><b>Description :</b> ${formData.description}</p>`);

  await addDoc(collection(db, 'mail'), {
    to: emails,
    message: {
      subject: `New work assigned: ${formData.title}`,
      text:
        `You have been assigned to a new work:\n\n` +
        linesText.join('\n') +
        `\n\nKindly review and confirm the work by visiting the Videography Manager website.`,
      html: `<p>Hello,</p>
        <p>You have been assigned a new work. Please find the details below:</p> 
        ${linesHtml.join('')}
        <p>Kindly review and confirm the work by visiting the <a href="https://tmv.fotmv.online/">Videography Manager</a> Website</p> 
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
      // Auto-generate and download a task details image for the admin
      try {
        generateAndDownloadTaskImage({
          id: workRef.id,
          title: formData.title,
          description: formData.description,
          date: formData.date || formData.deadline || '',
          items: formData.assignedItems
            .map((id) => items.find((it) => it.id === id))
            .filter(Boolean)
        });
      } catch (e) {
        console.warn('failed to generate task image', e);
      }
      setFormData({
        title: '',
        description: '',
        date: '',
        deadline: '',
        priority: 'medium',
        assignedUsers: [],
        assignedItems: []
      });
      setDateType('date');
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

            {/* Date / Deadline selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  <FaCalendarAlt />
                  <span>Date / Deadline</span>
                </label>

                <div className="flex items-center gap-3 mb-2 text-xs sm:text-sm">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="dateType"
                      value="date"
                      checked={dateType === 'date'}
                      onChange={(e) => setDateType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Date</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="dateType"
                      value="deadline"
                      checked={dateType === 'deadline'}
                      onChange={(e) => setDateType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Deadline</span>
                  </label>
                </div>

                {dateType === 'date' && (
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  />
                )}

                {dateType === 'deadline' && (
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  />
                )}

                <p className="mt-1 text-[11px] text-gray-500">
                  At least one of date or deadline is required, but both are optional individually.
                </p>
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
