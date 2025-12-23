import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc
} from 'firebase/firestore';

import { db } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaTrash, FaBox, FaSearch, FaUsers } from 'react-icons/fa';

const WORK_ROLES = ['videography', 'editing'];

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [assignedUserDetails, setAssignedUserDetails] = useState([]);
  const [assignedItems, setAssignedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [userSearch, setUserSearch] = useState(''); // New user search state

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const usersData = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        
        // Sort users alphabetically by name
        usersData.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setUsers(usersData);

        const itemsSnap = await getDocs(collection(db, 'inventory'));
        const itemsData = itemsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        itemsData.sort((a, b) => {
          const nameA = (a.itemName || '').toLowerCase();
          const nameB = (b.itemName || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setItems(itemsData);

        const taskSnap = await getDoc(doc(db, 'works', taskId));
        if (taskSnap.exists()) {
          const data = { id: taskSnap.id, ...taskSnap.data() };
          setTask(data);
          setAssignedUserDetails(data.assignedUserDetails || []);
          setAssignedItems(data.assignedItems || []);
          // admin page: cache any images for assigned inventory items
          (async () => {
            try {
              const itemIds = data.assignedItems || [];
              if (!itemIds.length) return;
              if (!('caches' in window)) return;
              const cache = await caches.open('tmv-task-assets-v1');
              const urls = itemIds
                .map((id) => items.find((it) => it.id === id))
                .filter(Boolean)
                .map((it) => it.imageUrl || it.photoURL || '')
                .filter((u) => typeof u === 'string' && u.length);

              await Promise.all(
                urls.map(async (u) => {
                  try {
                    const r = await fetch(u, { mode: 'no-cors' });
                    await cache.put(u, r.clone());
                  } catch (e) {
                    // ignore individual failures
                  }
                })
              );
            } catch (e) {
              console.warn('prefetch admin item images failed', e);
            }
          })();
        } else {
          setError('Task not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load task.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [taskId]);

  // Generate a PNG image summarizing the task
  const generateAndDownloadTaskImage = async ({ task, usersMap = {}, itemsMap = {} }) => {
    try {
      const { id, title, description, date, deadline, assignedUserDetails = [], assignedItems = [], userAcceptance = {}, roleCompletion = {} } = task;
      
      // Helper: Compute derived status
      const getDerivedStatus = () => {
        if ((task.status || '').toLowerCase() === 'complete') {
          return 'completed';
        }
        const userDetails = task.assignedUserDetails || [];
        const roleComp = task.roleCompletion || {};
        const acceptance = task.userAcceptance || {};
        if (!userDetails.length) return 'pending';
        const allAccepted = userDetails.every((d) => acceptance[d.userId] === 'accepted');
        if (!allAccepted) return 'pending';
        const allRolesDone = userDetails.every((d) =>
          (d.roles || []).every((role) => roleComp[`${d.userId}_${role}`] === 'done')
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

      // Resolve user details
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

      // Canvas setup
      const width = 1080;
      const height = 1360;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Background
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);

      const margin = 48;
      const cardX = margin;
      const cardY = margin;
      const cardW = width - margin * 2;
      const cardH = height - margin * 2;

      // White rounded card
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

      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.stroke();

      const padding = 40;
      let cursorX = cardX + padding;
      let cursorY = cardY + padding;
      const contentW = cardW - padding * 2;

      // Text wrapping helper
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

      // Title
      ctx.fillStyle = '#3f3f3f';
      ctx.textBaseline = 'top';
      cursorY = wrapText(title || 'Task', contentW - 200, cursorX, cursorY, 56, 'bold 48px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial');

      // Status badge
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

      // Date
      const displayDate = date || deadline;
      if (displayDate) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '400 26px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
        const dateStr = new Date(displayDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
        ctx.fillText(`Date: ${dateStr}`, cursorX, cursorY);
        cursorY += 44;
      }

      // Description
      if (description) {
        ctx.fillStyle = '#374151';
        cursorY = wrapText(description, contentW, cursorX, cursorY + 12, 36, '400 24px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial');
      }

      // Assigned to section
      if ((assignedUsers || []).length) {
        cursorY += 16;
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

          // Avatar
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
            const initials = (u.name || '').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
            ctx.fillText(initials, rowX + 16, rowY + 20);
          }
          ctx.restore();

          // Name
          const nameX = rowX + avatarSize + 20;
          ctx.fillStyle = '#111827';
          ctx.font = '600 26px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
          ctx.fillText(u.name || 'Unknown', nameX, rowY + 4);

          // Acceptance badge
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

          // Role badges
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

      // Download
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

  const handleToggleUser = (uid) => {
    if (!editing) return;
    const exists = assignedUserDetails.find((u) => u.userId === uid);
    if (exists) {
      setAssignedUserDetails((prev) => prev.filter((u) => u.userId !== uid));
    } else {
      setAssignedUserDetails((prev) => [
        ...prev,
        { userId: uid, roles: ['videography'] }
      ]);
    }
  };

  const handleToggleRole = (uid, role) => {
    if (!editing) return;
    setAssignedUserDetails((prev) =>
      prev.map((item) => {
        if (item.userId !== uid) return item;
        const hasRole = item.roles.includes(role);
        const roles = hasRole
          ? item.roles.filter((r) => r !== role)
          : [...item.roles, role];
        return { ...item, roles: roles.length ? roles : [role] };
      })
    );
  };

  const handleToggleItem = (itemId) => {
    if (!editing) return;
    setAssignedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleFieldChange = (e) => {
    if (!editing) return;
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

const handleSave = async (e) => {
  e.preventDefault();
  if (!task) return;
  setSaving(true);
  setError('');
  setSuccess('');

  // Require at least one of date or deadline
  if (!task.date && !task.deadline) {
    setSaving(false);
    setError('Please set a date or a deadline.');
    return;
  }

    try {
      const { id, ...rest } = task;

      // old assigned users before edit
      const oldUserIds = task.assignedUsers || [];
      // new assigned users after edit
      const newUserIds = assignedUserDetails.map((u) => u.userId);

      await updateDoc(doc(db, 'works', task.id), {
        ...rest,
        assignedUsers: newUserIds,
        assignedUserDetails,
        assignedItems
      });

      // users that were newly added
      const newlyAddedIds = newUserIds.filter((uid) => !oldUserIds.includes(uid));

      if (newlyAddedIds.length > 0) {
        const contactPromises = newlyAddedIds.map(async (uid) => {
          const snap = await getDoc(doc(db, 'users', uid));
          const data = snap.data();
          return {
            email: data?.email || null,
            phone: data?.phoneNumber || data?.phone || null
          };
        });
        const contacts = await Promise.all(contactPromises);
        const emails = contacts.map(c => c.email).filter(Boolean);
        const phones = contacts.map(c => c.phone).filter(Boolean);

        // Create message content (used for both email and WhatsApp)
        const messageContent = {
          lines: [
            `Title: ${task.title}`,
            ...(task.date ? [`Date: ${task.date}`] : []),
            ...(task.deadline ? [`Deadline: ${task.deadline}`] : []),
            `Description: ${task.description}`
          ]
        };

if (emails.length > 0) {
  const linesText = messageContent.lines;
  const linesHtml = [
    `<p><b>Title:</b> ${task.title}</p>`,
    ...(task.date ? [`<p><b>Date:</b> ${task.date}</p>`] : []),
    ...(task.deadline ? [`<p><b>Deadline:</b> ${task.deadline}</p>`] : []),
    `<p><b>Description:</b> ${task.description}</p>`
  ];

  await addDoc(collection(db, 'mail'), {
    to: emails,
    message: {
      subject: `You were assigned to a work: ${task.title}`,
      text:
        `You have been assigned to the work "${task.title}".\n\n` +
        linesText.join('\n') +
        `\n\nKindly review and confirm the work by visiting the Videography Manager website.`,
      html: `<p>Hello,</p>
        <p>You have been assigned a work. Please find the details below:</p>
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

        // Send WhatsApp message
if (phones.length > 0) {
  const whatsappMessage = 
    `Hello!\n\n` +
    `You have been assigned to a work:\n\n` +
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
      }

      // Generate and download task image
      try {
        const usersMap = {};
        users.forEach((u) => {
          usersMap[u.id] = u;
        });
        const itemsMap = {};
        items.forEach((it) => {
          itemsMap[it.id] = it;
        });

        await generateAndDownloadTaskImage({
          task: {
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            deadline: task.deadline,
            assignedUserDetails,
            assignedItems,
            status: task.status || 'pending',
            userAcceptance: task.userAcceptance || {},
            roleCompletion: task.roleCompletion || {}
          },
          usersMap,
          itemsMap
        });
      } catch (e) {
        console.warn('failed to generate task image', e);
      }

      setSuccess('Task updated successfully.');
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update task.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setDeleting(true);
    setError('');
    setSuccess('');

    try {
      await deleteDoc(doc(db, 'works', taskId));
      setSuccess('Task deleted successfully.');
      setTimeout(() => navigate('/work-list'), 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to delete task.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <div className="flex flex-col justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Loading task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
          <p className="text-gray-600 mb-4">{error || 'Task not found.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Back
          </button>
        </main>
      </div>
    );
  }

  const isUserAssigned = (uid) =>
    assignedUserDetails.some((u) => u.userId === uid);
  const getUserRoles = (uid) =>
    assignedUserDetails.find((u) => u.userId === uid)?.roles || [];

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
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Task details
          </h1>
          <div className="flex gap-2">
            {!editing ? (
              <>
                <button
                  onClick={() => {
                    setEditing(true);
                    setError('');
                    setSuccess('');
                  }}
                  className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50 inline-flex items-center gap-1"
                >
                  <FaTrash />
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setSuccess('');
                    setError('');
                    setAssignedUserDetails(task.assignedUserDetails || []);
                    setAssignedItems(task.assignedItems || []);
                  }}
                  className="px-3 py-1 rounded bg-gray-300 text-gray-800 text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 p-2 rounded bg-green-100 text-green-700 text-sm">
            {success}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title || ''}
              onChange={handleFieldChange}
              disabled={!editing}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={task.description || ''}
              onChange={handleFieldChange}
              disabled={!editing}
              rows={3}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Date
    </label>
    <div className="flex items-center gap-2">
      <FaCalendarAlt className="text-gray-500" />
      <input
        type="date"
        name="date"
        value={
          task.date
            ? new Date(task.date).toISOString().slice(0, 10)
            : ''
        }
        onChange={handleFieldChange}
        disabled={!editing}
        className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Deadline
    </label>
    <div className="flex items-center gap-2">
      <FaCalendarAlt className="text-gray-500" />
      <input
        type="date"
        name="deadline"
        value={
          task.deadline
            ? new Date(task.deadline).toISOString().slice(0, 10)
            : ''
        }
        onChange={handleFieldChange}
        disabled={!editing}
        className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <p className="text-[11px] text-gray-500 mt-1">
      Date or deadline is required, but each is optional on its own.
    </p>
  </div>
</div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaUsers className="inline mr-2" />
              Assigned users and work types
            </label>
            
            {editing && (
              <div className="relative mb-3">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search users by name or card..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="bg-white rounded border p-3 max-h-80 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <p className="text-xs text-gray-500">No users found.</p>
              ) : (
                filteredUsers.map((u) => {
                  const assigned = isUserAssigned(u.id);
                  const roles = getUserRoles(u.id);

                  return (
                    <div key={u.id} className="mb-2 p-2 rounded hover:bg-gray-50">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={assigned}
                          onChange={() => handleToggleUser(u.id)}
                          disabled={!editing}
                          className="mr-3 w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="text-sm">
                            {u.name || 'No name'}{' '}
                            <span className="text-xs text-gray-500">
                              ({u.cardNumber || '-'})
                            </span>
                          </p>
                        </div>
                      </label>

                      {assigned && (
                        <div className="mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm">
                          {WORK_ROLES.map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => handleToggleRole(u.id, role)}
                              disabled={!editing}
                              className={`px-2 py-1 rounded border ${
                                roles.includes(role)
                                  ? 'bg-green-600 text-white border-green-600'
                                  : 'bg-white text-gray-700 border-gray-300'
                              } ${!editing ? 'cursor-default' : 'cursor-pointer'}`}
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
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaBox className="inline mr-2" />
              Assigned inventory items
            </label>

            {editing && (
              <div className="relative mb-2">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by item name or number..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="bg-white rounded border p-3 max-h-60 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <p className="text-xs text-gray-500">No items available.</p>
              ) : (
                filteredItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={assignedItems.includes(item.id)}
                      onChange={() => handleToggleItem(item.id)}
                      disabled={!editing}
                      className="mr-3 w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
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

            <p className="text-xs text-gray-500 mt-2">
              Selected: {assignedItems.length} item(s)
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TaskDetails;
