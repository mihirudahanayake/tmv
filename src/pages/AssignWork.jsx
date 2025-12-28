import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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

  // Generate a PNG image summarizing the task (title, date, description, assigned users with roles, status)
  const generateAndDownloadTaskImage = async ({ task, usersMap = {}, itemsMap = {} }) => {
    try {
      // Extract data from task object
      const { id, title, description, date, deadline, priority, assignedUserDetails = [], assignedItems = [], userAcceptance = {}, roleCompletion = {} } = task;
      
      // Helper: Compute derived status (matching WorkList pattern)
      const getDerivedStatus = () => {
        if ((task.status || '').toLowerCase() === 'complete') {
          return 'completed';
        }
        const userDetails = task.assignedUserDetails || [];
        const roleCompletion = task.roleCompletion || {};
        const acceptance = task.userAcceptance || {};
        if (!userDetails.length) return 'pending';
        const allAccepted = userDetails.every((d) => acceptance[d.userId] === 'accepted');
        if (!allAccepted) return 'pending';
        const allRolesDone = userDetails.every((d) =>
          (d.roles || []).every((role) => roleCompletion[`${d.userId}_${role}`] === 'done')
        );
        if (!allRolesDone) return 'accepted';
        return 'done';
      };

      // Helper: Get status color
      const getStatusColor = (status) => {
        const colors = {
          pending: { bg: '#fef3c7', text: '#b45309' },
          accepted: { bg: '#fed7aa', text: '#b45309' },
          done: { bg: '#bfdbfe', text: '#1e40af' },
          completed: { bg: '#dcfce7', text: '#166534' }
        };
        return colors[status] || colors.pending;
      };

      // Resolve user details with photoURL and acceptance status
      const assignedUsers = (assignedUserDetails || []).map(({ userId, roles }) => {
        const u = usersMap[userId] || {};
        const acceptanceStatus = userAcceptance[userId] || 'pending';
        return {
          id: userId,
          name: u.name || u.displayName || 'Unknown',
          photoURL: u.photoURL || u.avatarUrl || '',
          roles: roles || [],
          acceptanceStatus
        };
      });

      // Resolve item details with imageUrl
      const items = assignedItems
        .map((itemId) => itemsMap[itemId])
        .filter(Boolean);
      // Card-sized canvas (matching task card layout) - high resolution
      const width = 1080;
      const height = 1360;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // background
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);

      const margin = 48;
      const cardX = margin;
      const cardY = margin;
      const cardW = width - margin * 2;
      const cardH = height - margin * 2;

      // white rounded card
      ctx.fillStyle = '#ffffff';
      const radius = 24;
      ctx.beginPath();
      ctx.moveTo(cardX + radius, cardY);
      ctx.lineTo(cardX + cardW - radius, cardY);
      ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + radius);
      ctx.lineTo(cardX + cardW, cardY + cardH - radius);
      ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - radius, cardY + cardH);
      ctx.lineTo(cardX + radius, cardY + cardH);
      ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - radius);
      ctx.lineTo(cardX, cardY + radius);
      ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
      ctx.closePath();
      ctx.fill();

      // subtle border
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.stroke();

      // content padding
      const padding = 40;
      let cursorX = cardX + padding;
      let cursorY = cardY + padding;
      const contentW = cardW - padding * 2;

      // title wrap helper
      const wrapText = (text, maxW, startX, startY, lineHeight, font) => {
        ctx.font = font;
        const words = (text || '').split(' ');
        let line = '';
        let yPos = startY;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          if (ctx.measureText(testLine).width > maxW && n > 0) {
            ctx.fillText(line.trim(), startX, yPos);
            line = words[n] + ' ';
            yPos += lineHeight;
          } else {
            line = testLine;
          }
        }
        if (line) {
          ctx.fillText(line.trim(), startX, yPos);
          yPos += lineHeight;
        }
        return yPos;
      };

      // Title (brown/dark color)
      ctx.fillStyle = '#3f3f3f';
      ctx.textBaseline = 'top';
      cursorY = wrapText(title || 'New Task', contentW - 200, cursorX, cursorY, 56, 'bold 48px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial');

      // Status badge (top-right)
      const taskStatus = getDerivedStatus();
      const statusColors = getStatusColor(taskStatus);
      ctx.font = '500 22px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
      const statusW = ctx.measureText(taskStatus).width + 32;
      const statusH = 48;
      const statusX = cardX + cardW - padding - statusW - 8;
      const statusY = cardY + padding + 8;
      ctx.fillStyle = statusColors.bg;
      ctx.fillRect(statusX, statusY, statusW, statusH);
      ctx.fillStyle = statusColors.text;
      ctx.fillText(taskStatus, statusX + 16, statusY + 12);

      cursorY += 16;

      // Date with calendar icon (use date or deadline)
      const displayDate = date || deadline;
      if (displayDate) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '400 26px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
        const dateStr = new Date(displayDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
        ctx.fillText(`Date: ${dateStr}`, cursorX, cursorY);
        cursorY += 44;
      }

      // description
      if (description) {
        ctx.fillStyle = '#374151';
        cursorY = wrapText(description, contentW, cursorX, cursorY + 12, 36, '400 24px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial');
      }

      // Assigned to block
      if ((assignedUsers || []).length) {
        cursorY += 16;
        // Assigned to icon (👥) + heading
        ctx.fillStyle = '#3f3f3f';
        ctx.font = '600 26px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
        ctx.fillText('Assigned to:', cursorX, cursorY);
        cursorY += 44;

        const avatarSize = 72;
        const gapY = 20;

        const userImgPromises = assignedUsers.map((u) => new Promise((resolve) => {
          if (!u || !u.photoURL) return resolve(null);
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = u.photoURL;
        }));
        const loadedUserImgs = await Promise.all(userImgPromises);

        for (let i = 0; i < assignedUsers.length; i++) {
          const u = assignedUsers[i];
          const img = loadedUserImgs[i];
          const rowX = cursorX;
          const rowY = cursorY;

          // avatar circle
          ctx.save();
          ctx.beginPath();
          ctx.arc(rowX + avatarSize / 2, rowY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = '#e5e7eb';
          ctx.fill();
          if (img) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(rowX + avatarSize / 2, rowY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
            ctx.clip();
            const ir = Math.max(avatarSize / img.width, avatarSize / img.height);
            const iw = img.width * ir;
            const ih = img.height * ir;
            const ix = rowX + (avatarSize - iw) / 2;
            const iy = rowY + (avatarSize - ih) / 2;
            ctx.drawImage(img, ix, iy, iw, ih);
            ctx.restore();
          } else {
            ctx.fillStyle = '#6b7280';
            ctx.font = '600 26px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
            const initials = (u.name || '').split(' ').map((s) => s[0]).slice(0,2).join('').toUpperCase();
            ctx.fillText(initials, rowX + 16, rowY + 20);
          }
          ctx.restore();

          // name
          const nameX = rowX + avatarSize + 20;
          ctx.fillStyle = '#111827';
          ctx.font = '600 26px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
          ctx.fillText(u.name || 'Unknown', nameX, rowY + 4);

          // status pill (right side) - color and text based on acceptance status
          const acceptanceStatus = u.acceptanceStatus;
          let pillText, pillBgColor, pillTextColor;
          
          if (acceptanceStatus === 'accepted') {
            pillText = '✓ Accepted';
            pillBgColor = '#dcfce7';
            pillTextColor = '#16a34a';
          } else if (acceptanceStatus === 'rejected') {
            pillText = '✗ Rejected';
            pillBgColor = '#fee2e2';
            pillTextColor = '#dc2626';
          } else {
            // pending
            pillText = '⏳ Pending';
            pillBgColor = '#fef3c7';
            pillTextColor = '#b45309';
          }
          
          ctx.font = '500 22px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
          const pillW = ctx.measureText(pillText).width + 24;
          const pillH = 44;
          const pillX = cardX + cardW - padding - pillW - 8;
          const pillY = rowY + 10;
          ctx.fillStyle = pillBgColor;
          ctx.fillRect(pillX, pillY, pillW, pillH);
          ctx.fillStyle = pillTextColor;
          ctx.fillText(pillText, pillX + 12, pillY + 10);

          // role badges below name - show checkmark if completed
          const roles = u.roles || [];
          let bx = nameX;
          const by = rowY + 40;
          ctx.font = '400 22px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
          for (let r = 0; r < roles.length; r++) {
            const roleText = roles[r];
            const key = `${u.id}_${roleText}`;
            const isCompleted = roleCompletion[key] === 'done';
            const displayText = isCompleted ? `✓ ${roleText}` : roleText;
            const bw = ctx.measureText(displayText).width + 20;
            ctx.fillStyle = isCompleted ? '#d1fae5' : '#f0f0f0';
            ctx.fillRect(bx, by, bw, 36);
            ctx.fillStyle = isCompleted ? '#059669' : '#5b6b7d';
            ctx.fillText(displayText, bx + 10, by + 24 - 6);
            bx += bw + 12;
          }

          cursorY += avatarSize + gapY;
        }
      }


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

      // 2) Get emails and phone numbers of assigned users from `users` collection
      const contactPromises = formData.assignedUsers.map(async ({ userId }) => {
        const snap = await getDoc(doc(db, 'users', userId));
        const data = snap.data();
        return {
          email: data?.email || null,
          phone: data?.phoneNumber || data?.phone || null
        };
      });

      const contacts = await Promise.all(contactPromises);
      const emails = contacts.map(c => c.email).filter(Boolean);
      const phones = contacts.map(c => c.phone).filter(Boolean);

      // 3) Create message content (used for both email and WhatsApp)
      const messageContent = {
        lines: [
          `Title: ${formData.title}`,
          ...(formData.date ? [`Date: ${formData.date}`] : []),
          ...(formData.deadline ? [`Deadline: ${formData.deadline}`] : []),
          `Description: ${formData.description}`
        ]
      };

      // 4) Send Email via mail collection
if (emails.length > 0) {
  const linesText = messageContent.lines;
  const linesHtml = [
    `<p><b>Title:</b> ${formData.title}</p>`,
    ...(formData.date ? [`<p><b>Date:</b> ${formData.date}</p>`] : []),
    ...(formData.deadline ? [`<p><b>Deadline:</b> ${formData.deadline}</p>`] : []),
    `<p><b>Description:</b> ${formData.description}</p>`
  ];

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

      // 5) Send WhatsApp message via whatsapp collection
if (phones.length > 0) {
  const whatsappMessage = 
    `Hello!\n\n` +
    `You have been assigned to a new work:\n\n` +
    messageContent.lines.join('\n') +
    `\n\nKindly review and confirm the work by visiting the Videography Manager website: https://tmv.fotmv.online/\n\n` +
    `If you encounter any issues, feel free to contact me.\n\n` +
    `Best regards,\n` +
    `Mihiru Dahanayake\n` +
    `Acting Videography Department Head\n` +
    `FOT Media, Rajarata University\n` +
    `070 342 6554`;

  await addDoc(collection(db, 'whatsapp'), {
    to: phones,
    message: whatsappMessage
  });
      }

      setMessage({ type: 'success', text: 'Work assigned successfully!' });
      // Auto-generate and download a task details image for the admin
      try {
        // Convert users array to map (like WorkList does)
        const usersMap = {};
        users.forEach((u) => {
          usersMap[u.id] = u;
        });
        // Convert items array to map (like WorkList does)
        const itemsMap = {};
        items.forEach((it) => {
          itemsMap[it.id] = it;
        });

        generateAndDownloadTaskImage({
          task: {
            id: workRef.id,
            title: formData.title,
            description: formData.description,
            date: formData.date || null,
            deadline: formData.deadline || null,
            priority: formData.priority,
            assignedUserDetails: formData.assignedUsers,
            assignedItems: formData.assignedItems,
            status: 'pending',
            userAcceptance: {}, // New assignments default to pending acceptance
            roleCompletion: {} // New assignments have no completed roles
          },
          usersMap,
          itemsMap
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
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/users/${user.id}`);
                            }}
                            className="ml-2 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            title="View user details"
                          >
                            View
                          </button>
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
