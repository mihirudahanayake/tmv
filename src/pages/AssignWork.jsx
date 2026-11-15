import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

import { db, functions } from '../firebase/config';
import {
  FaFileAlt,
  FaAlignLeft,
  FaCalendarAlt,
  FaUsers,
  FaSearch,
  FaBox,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import Header from '../components/Header';
import TimePickerAmPm from '../components/TimePickerAmPm';
import { useUserProfile } from '../hooks/useUserProfile';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';
import { fanOutUserNotifications } from '../utils/fanOutUserNotifications';
import { canManageUser, normalizeRole, Roles } from '../utils/authz';
import {
  getWorkRolesForDepartment,
  getDefaultRolesForDepartment,
  normalizeRolesForDepartment,
  formatWorkRoleLabel,
} from '../constants/workRoles';

const AssignWork = ({ isModal = false, onClose }) => {
  const { profile, loading: loadingProfile } = useUserProfile();
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [department, setDepartment] = useState('videography');
  const [lastCreatedTask, setLastCreatedTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    deadline: '',
    time: '',
    assignedUsers: [], // [{ userId, roles: ['videography'] }]
    assignedItems: [] // [itemId, itemId, ...]
  });
  const [dateType, setDateType] = useState('date'); // 'date' | 'deadline'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userSearch, setUserSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [showDiscardPrompt, setShowDiscardPrompt] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState('');

  const navigate = useNavigate();

  const role = normalizeRole(profile);
  const isDepartmentHead = role === Roles.DEPARTMENT_HEAD;
  const managedDepartments = Array.isArray(profile?.managedDepartments)
    ? profile.managedDepartments
    : [];
  const allowedDepartments = isDepartmentHead ? managedDepartments : WORK_DEPARTMENTS;
  const workRoles = getWorkRolesForDepartment(department);
  const hasMultipleRoles = workRoles.length > 1;
  const hasDraft = Boolean(
    formData.title.trim() ||
    formData.description.trim() ||
    formData.date ||
    formData.deadline ||
    formData.time ||
    formData.assignedUsers.length ||
    formData.assignedItems.length
  );

  const requestClose = () => {
    if (loading) return;
    if (hasDraft) {
      setShowDiscardPrompt(true);
      return;
    }
    onClose?.();
  };

  useEffect(() => {
    if (!isModal) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || loading) return;
      event.preventDefault();
      if (showDiscardPrompt) {
        setShowDiscardPrompt(false);
      } else {
        requestClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModal, loading, showDiscardPrompt, hasDraft]);

  useEffect(() => {
    if (!loadingProfile) {
      setDepartment((current) =>
        allowedDepartments.includes(current) ? current : allowedDepartments[0] || ''
      );
    }
  }, [loadingProfile, allowedDepartments]);

  useEffect(() => {
    if (loadingProfile) return;
    if (!allowedDepartments.includes(department)) {
      setUsers([]);
      setUsersLoading(false);
      setFormData((prev) => ({ ...prev, assignedUsers: [] }));
      return;
    }
    fetchUsers();
    fetchItems();
  }, [loadingProfile, department, allowedDepartments]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsers([]);
    setMessage({ type: '', text: '' });
    try {
      if (!allowedDepartments.includes(department)) {
        setUsers([]);
        return;
      }

      let usersData;
      if (isDepartmentHead) {
        const getDepartmentUsers = httpsCallable(functions, 'getDepartmentUsers');
        const result = await getDepartmentUsers();
        if (!Array.isArray(result.data?.users)) {
          throw new Error('Invalid department users response from the server.');
        }
        usersData = result.data.users.filter((user) => {
          const departments = Array.isArray(user.departments) && user.departments.length
            ? user.departments
            : user.department
              ? [user.department]
              : [];
          return departments.includes(department);
        });
      } else {
        const [departmentsSnapshot, departmentSnapshot] = await Promise.all([
          getDocs(query(collection(db, 'users'), where('departments', 'array-contains', department))),
          getDocs(query(collection(db, 'users'), where('department', '==', department))),
        ]);
        const usersById = new Map();
        for (const userDoc of [...departmentsSnapshot.docs, ...departmentSnapshot.docs]) {
          usersById.set(userDoc.id, { id: userDoc.id, ...userDoc.data() });
        }
        usersData = [...usersById.values()];
      }
      usersData = usersData
        .filter((user) => !isDepartmentHead || canManageUser(profile, user));

      // Sort alphabetically by name
      usersData.sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({
        type: 'error',
        text: `Failed to load users in this department: ${error?.code || error?.message || 'Check your department access and try again.'}`,
      });
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchItems = async () => {
    setItemsLoading(true);
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
      setItems([]);
      setMessage({
        type: 'error',
        text: `Failed to load equipment: ${error?.code || error?.message || 'Please try again.'}`,
      });
    } finally {
      setItemsLoading(false);
    }
  };

  // Generate a PNG image summarizing the task (title, date, description, assigned users with roles, status)
  const generateAndDownloadTaskImage = async ({ task, usersMap = {}, itemsMap = {} }) => {
    try {
      // Extract data from task object
      const { id, title, description, date, deadline, time, assignedUserDetails = [], assignedItems = [], userAcceptance = {}, roleCompletion = {} } = task;
      
      // Helper: Compute derived status (matching WorkList pattern)
      const getDerivedStatus = () => {
        if ((task.status || '').toLowerCase() === 'complete') {
          return 'completed';
        }
        const userDetails = task.assignedUserDetails || [];
        const roleCompletion = task.roleCompletion || {};
        const acceptance = task.userAcceptance || {};
        const attendance = task.workAttendance || {};
        if (!userDetails.length) return 'pending';

        const activeUserDetails = userDetails.filter(
          (d) => (attendance?.[d.userId]?.status || '') !== 'missed'
        );
        if (!activeUserDetails.length) return 'pending';

        const allAccepted = activeUserDetails.every((d) => acceptance[d.userId] === 'accepted');
        if (!allAccepted) return 'pending';
        const allRolesDone = activeUserDetails.every((d) =>
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
        const attendance = task.workAttendance || {};
        const isMissed = (attendance?.[userId]?.status || '') === 'missed';
        const acceptanceStatus = isMissed ? 'missed' : (userAcceptance[userId] || 'pending');
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

      if (time) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '400 26px system-ui, -apple-system, Roboto, "Segoe UI", "Helvetica Neue", Arial';
        ctx.fillText(`Time: ${time}`, cursorX, cursorY);
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
          
          if (acceptanceStatus === 'missed') {
            pillText = '— Missed';
            pillBgColor = '#e5e7eb';
            pillTextColor = '#374151';
          } else if (acceptanceStatus === 'accepted') {
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
            const label = formatWorkRoleLabel(roleText);
            const displayText = isCompleted ? `✓ ${label}` : label;
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
          {
            userId,
            roles: getDefaultRolesForDepartment(department),
          }
        ]
      };
    });
  };

  // toggle role for a user
  const handleUserRoleToggle = (userId, role) => {
    const allowedRoles = getWorkRolesForDepartment(department);
    if (allowedRoles.length === 1) return; // non photo/video: only one "done" role

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
    if (!allowedDepartments.includes(department)) {
      setMessage({ type: 'error', text: 'You can only assign work in a department you manage.' });
      return;
    }

    const assignedUsersAreInScope = formData.assignedUsers.every(({ userId }) =>
      users.some((user) => {
        const userDepartments = Array.isArray(user.departments)
          ? user.departments
          : user.department
            ? [user.department]
            : [];
        return user.id === userId
          && userDepartments.includes(department)
          && (!isDepartmentHead || canManageUser(profile, user));
      })
    );
    if (!assignedUsersAreInScope) {
      setMessage({ type: 'error', text: 'Remove users outside this department before assigning work.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    setLastCreatedTask(null);

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
      const normalizedAssignedUsers = (formData.assignedUsers || []).map((u) => ({
        userId: u.userId,
        roles: normalizeRolesForDepartment(department, u.roles),
      }));

      // 1) Create work document
      const workRef = await addDoc(collection(db, 'works'), {
        title: formData.title,
        description: formData.description,
        date: formData.date || null,
        deadline: formData.deadline || null,
        time: formData.time || null,
        dateType, // to know which one admin intended
        department,
        assignedUsers: normalizedAssignedUsers.map((u) => u.userId),
        assignedUserDetails: normalizedAssignedUsers,
        assignedItems: formData.assignedItems,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });

      // Create per-user notifications for assigned users (persistent home popup until marked read)
      const assignedUserIds = normalizedAssignedUsers.map((u) => u.userId);
      await fanOutUserNotifications(db, assignedUserIds, {
        type: 'task-assigned',
        source: 'admin',
        audience: 'user',
        workId: workRef.id,
        department,
        title: 'New work assigned',
        message: `You were assigned to: ${formData.title}`,
        senderName: profile?.name || profile?.email || 'Admin',
        createdAt: serverTimestamp(),
        read: false,
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

      const departmentLabel = formatWorkDepartmentLabel(department);
      const websiteName = 'Media Manager';
      const websiteUrl = 'https://tmv.fotmv.online/';
      const departmentHeadTitle = `Head of ${departmentLabel}`;

      const senderName = profile?.name || profile?.email || '';
      const senderEmail = profile?.email || '';
      const senderPhone =
        profile?.phoneNo || profile?.phoneNumber || profile?.phone || '';
      const senderPhoneHref = senderPhone
        ? String(senderPhone).replace(/[^\d+]/g, '')
        : '';

      // 3) Create message content (used for both email and WhatsApp)
      const messageContent = {
        lines: [
          `Title: ${formData.title}`,
          ...(formData.date ? [`Date: ${formData.date}`] : []),
          ...(formData.deadline ? [`Deadline: ${formData.deadline}`] : []),
          ...(formData.time ? [`Time: ${formData.time}`] : []),
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
    ...(formData.time ? [`<p><b>Time:</b> ${formData.time}</p>`] : []),
    `<p><b>Description:</b> ${formData.description}</p>`
  ];

  await addDoc(collection(db, 'mail'), {
    to: emails,
    message: {
      subject: `New work assigned: ${formData.title}`,
      text:
        `You have been assigned to a new work:\n\n` +
        linesText.join('\n') +
        `\n\nKindly review and confirm the work by visiting the ${websiteName} website: ${websiteUrl}`,
      html: `<p>Hello,</p>
        <p>You have been assigned a new work. Please find the details below:</p> 
        ${linesHtml.join('')}
        <p>Kindly review and confirm the work by visiting the <a href="${websiteUrl}">${websiteName}</a> Website</p> 
        <p>If you encounter any issues or need further assistance, feel free to contact me.</p> 
        <p>Thank you.</p> 
        
        <p>Best regards,</p>
        <p style="color:#A3A9AD">
          <strong>${senderName}</strong><br>
          <i>${departmentHeadTitle}<br>FOT Media<br>Faculty Of Technology<br>Rajarata University of Sri Lanka<br>
          ${senderPhone ? `<a href="tel:${senderPhoneHref}" style="color:#0066cc; text-decoration:none;">${senderPhone}</a><br>` : ''}
          ${senderEmail ? `<a href="mailto:${senderEmail}" style="color:#0066cc; text-decoration:none;">${senderEmail}</a>` : ''}</i><br>
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
    `\n\nKindly review and confirm the work by visiting the ${websiteName} website: ${websiteUrl}\n\n` +
    `If you encounter any issues, feel free to contact me.\n\n` +
    `Best regards,\n` +
    `${senderName}\n` +
    `${departmentHeadTitle}\n` +
    `FOT Media, \nFaculty of Technology, \nRajarata University of Sri Lanka\n` +
    (senderPhone ? `${senderPhone}` : '');

  await addDoc(collection(db, 'whatsapp'), {
    to: phones,
    message: whatsappMessage
  });
      }

      setMessage({ type: 'success', text: 'Work assigned successfully!' });
      // Allow optional download after create
      setLastCreatedTask({
        id: workRef.id,
        title: formData.title,
        description: formData.description,
        date: formData.date || null,
        deadline: formData.deadline || null,
        time: formData.time || null,
        assignedUserDetails: formData.assignedUsers,
        assignedItems: formData.assignedItems,
        status: 'pending',
        userAcceptance: {},
        roleCompletion: {},
      });
      setFormData({
        title: '',
        description: '',
        date: '',
        deadline: '',
        time: '',
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
    <div
      className={isModal
        ? 'fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-2 backdrop-blur-sm sm:p-4'
        : 'min-h-screen bg-gray-100'}
      onMouseDown={(event) => {
        if (isModal && event.target === event.currentTarget) requestClose();
      }}
    >
      {!isModal && <Header userType="admin" />}

      <main className={isModal ? 'w-full max-w-3xl' : 'container mx-auto px-4 py-6 sm:py-8'}>
        <div
          role={isModal ? 'dialog' : undefined}
          aria-modal={isModal ? 'true' : undefined}
          aria-labelledby={isModal ? 'assign-work-title' : undefined}
          className={isModal
            ? 'relative max-h-[92vh] w-full overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:p-8'
            : 'mx-auto max-w-3xl rounded-lg bg-white p-4 shadow-md sm:p-8'}
        >
          {isModal ? (
            <div className="sticky z-10 -mt-4 mb-5 border-b border-slate-100 bg-white/95 px-4 py-4 backdrop-blur sm:-mt-8 sm:px-5 sm:py-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">New assignment</p>
                  <h2 id="assign-work-title" className="mt-1 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                    Create and assign work
                  </h2>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Jump to
                    </span>
                    {[
                      { id: 'work-details', label: 'Details', number: '1' },
                      { id: 'team-members', label: 'Team', number: '2' },
                      { id: 'equipment-items', label: 'Equipment', number: '3' },
                    ].map(({ id, label, number }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">
                          {number}
                        </span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={requestClose}
                  disabled={loading}
                  aria-label="Close assign work"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ) : (
            <h2 className="mb-4 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">
              Create and Assign Work
            </h2>
          )}

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

          {message.type === 'success' && lastCreatedTask && (
            <div className="mb-4">
              <button
                type="button"
                onClick={async () => {
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
                      task: lastCreatedTask,
                      usersMap,
                      itemsMap,
                    });
                  } catch (e) {
                    console.warn('failed to generate task image', e);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm"
              >
                Download task image (optional)
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <section id="work-details" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-800">Task details</h3>
                  <p className="mt-1 text-xs text-slate-500">Add a clear title and a date or deadline.</p>
                </div>
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                  Required
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="assign-department">
                    Department
                  </label>
                  <select
                    id="assign-department"
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      setFormData((prev) => ({ ...prev, assignedUsers: [] }));
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  >
                    {allowedDepartments.length ? allowedDepartments.map((dept) => (
                      <option key={dept} value={dept}>
                        {formatWorkDepartmentLabel(dept)}
                      </option>
                    )) : <option value="">No managed department assigned</option>}
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="assign-title">
                    <FaFileAlt className="text-blue-600" />
                    Work title
                  </label>
                  <input
                    id="assign-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Photograph the new campaign"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="assign-description">
                  <FaAlignLeft className="text-blue-600" />
                  Description
                </label>
                <textarea
                  id="assign-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add instructions, location, or other helpful details..."
                  required
                  rows="3"
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FaCalendarAlt className="text-blue-600" />
                    Date or deadline
                  </label>
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    {[
                      { value: 'date', label: 'Work date' },
                      { value: 'deadline', label: 'Deadline' },
                    ].map(({ value, label }) => (
                      <label
                        key={value}
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                          dateType === value
                            ? 'border-blue-300 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="dateType"
                          value={value}
                          checked={dateType === value}
                          onChange={(e) => setDateType(e.target.value)}
                          className="accent-blue-600"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  <input
                    type="date"
                    name={dateType}
                    value={formData[dateType]}
                    onChange={handleChange}
                    aria-label={dateType === 'date' ? 'Work date' : 'Deadline'}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Set at least one date or deadline before assigning.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <TimePickerAmPm
                    value={formData.time}
                    onChange={(next) => setFormData((prev) => ({ ...prev, time: next }))}
                  />
                </div>
              </div>
            </section>

            <section id="team-members" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-slate-800">
                    <FaUsers className="text-blue-600" />
                    Team members
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">Choose who will be responsible for this work.</p>
                </div>
                <span aria-live="polite" className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {formData.assignedUsers.length} selected
                </span>
              </div>

              <div className="relative mb-3">
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or card number..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  aria-label="Search team members"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-2">
                {usersLoading ? (
                  <div aria-live="polite" className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-8 text-sm font-medium text-slate-500">
                    <FaSpinner className="animate-spin text-blue-600" />
                    Loading team members...
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center">
                    <FaUsers className="mx-auto mb-2 text-xl text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">
                      {userSearch ? 'No matching team members' : 'No members found in this department'}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {userSearch ? 'Try another name or card number.' : 'Members assigned to this department will appear here.'}
                    </p>
                    {userSearch && (
                      <button
                        type="button"
                        onClick={() => setUserSearch('')}
                        className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  filteredUsers.map((user) => {
                    const selected = isUserSelected(user.id);
                    const roles = getUserRoles(user.id);
                    const expanded = expandedUserId === user.id;

                    return (
                      <div
                        key={user.id}
                        className={`rounded-xl border p-3 transition ${
                          selected
                            ? 'border-blue-300 bg-blue-50/80 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            id={`assign-user-${user.id}`}
                            type="checkbox"
                            checked={selected}
                            onChange={() => handleUserSelection(user.id)}
                            className="h-4 w-4 shrink-0 rounded accent-blue-600"
                          />
                          <label htmlFor={`assign-user-${user.id}`} className="min-w-0 flex-1 cursor-pointer">
                            <span className="block truncate text-sm font-semibold text-slate-800">
                              {user.name || 'Unnamed member'}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-slate-500">
                              Card: {user.cardNumber || '—'}
                            </span>
                          </label>
                          <button
                            type="button"
                            aria-expanded={expanded}
                            onClick={() => {
                              if (isModal) {
                                setExpandedUserId(expanded ? '' : user.id);
                              } else {
                                navigate(`/users/${user.id}`);
                              }
                            }}
                            className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                          >
                            {isModal && expanded ? 'Hide details' : isModal ? 'Details' : 'View'}
                          </button>
                        </div>

                        {selected && (
                          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-blue-100 pt-3">
                            <span className="mr-1 text-[11px] font-semibold text-slate-500">Work roles</span>
                            {hasMultipleRoles ? (
                              workRoles.map((workRole) => (
                                <button
                                  key={workRole}
                                  type="button"
                                  aria-pressed={roles.includes(workRole)}
                                  onClick={() => handleUserRoleToggle(user.id, workRole)}
                                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                                    roles.includes(workRole)
                                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700'
                                  }`}
                                >
                                  {formatWorkRoleLabel(workRole)}
                                </button>
                              ))
                            ) : (
                              <span className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700">
                                {formatWorkRoleLabel(workRoles[0] || 'done')}
                              </span>
                            )}
                          </div>
                        )}

                        {isModal && expanded && (
                          <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600 sm:grid-cols-2">
                            <p className="truncate"><span className="font-semibold text-slate-500">Email:</span> {user.email || '—'}</p>
                            <p><span className="font-semibold text-slate-500">Batch:</span> {user.batch || '—'}</p>
                            <p><span className="font-semibold text-slate-500">Study department:</span> {user.studyDepartment || '—'}</p>
                            <p><span className="font-semibold text-slate-500">Registration:</span> {user.registrationNumber || '—'}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            <section id="equipment-items" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-slate-800">
                    <FaBox className="text-blue-600" />
                    Equipment
                    <span className="text-xs font-medium text-slate-400">(optional)</span>
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">Reserve any inventory items needed for the task.</p>
                </div>
                <span aria-live="polite" className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                  {formData.assignedItems.length} selected
                </span>
              </div>

              <div className="relative mb-3">
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by item name or number..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  aria-label="Search equipment"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-2">
                {itemsLoading ? (
                  <div aria-live="polite" className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-8 text-sm font-medium text-slate-500">
                    <FaSpinner className="animate-spin text-blue-600" />
                    Loading equipment...
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center">
                    <FaBox className="mx-auto mb-2 text-xl text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">
                      {itemSearch ? 'No matching equipment' : 'No equipment available'}
                    </p>
                    {itemSearch && (
                      <button
                        type="button"
                        onClick={() => setItemSearch('')}
                        className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const selected = formData.assignedItems.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                          selected
                            ? 'border-blue-300 bg-blue-50/80 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleItemSelection(item.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded accent-blue-600"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-slate-800">
                            {item.itemName || 'Unnamed item'}
                            {item.itemNo ? <span className="ml-1 font-normal text-slate-500">({item.itemNo})</span> : null}
                          </span>
                          {item.details && (
                            <span className="mt-1 block text-xs text-slate-500">{item.details}</span>
                          )}
                        </span>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                          selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {selected ? 'Added' : 'Add'}
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
            </section>

            <div className={isModal
              ? 'sticky z-10 -mb-4 mt-2 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur sm:-mb-8 sm:px-5 sm:py-5'
              : 'mt-2 border-t border-slate-200 pt-4'}
            >
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-5">
                <div className="min-w-0" aria-live="polite">
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2">
                      <FaUsers className="shrink-0 text-sm text-blue-600" />
                      <div className="min-w-0">
                        <p className="text-base font-bold leading-4 text-slate-800">{formData.assignedUsers.length}</p>
                        <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          Team member{formData.assignedUsers.length === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <FaBox className="shrink-0 text-sm text-slate-500" />
                      <div className="min-w-0">
                        <p className="text-base font-bold leading-4 text-slate-800">{formData.assignedItems.length}</p>
                        <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          Equipment item{formData.assignedItems.length === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-4 text-slate-500">
                    {formData.assignedUsers.length
                      ? 'Ready when you are. You can still adjust your selections.'
                      : 'Select at least one team member to create this assignment.'}
                  </p>
                </div>
                <div className={isModal ? 'grid grid-cols-2 gap-2 sm:flex sm:shrink-0' : 'flex'}>
                  {isModal && (
                    <button
                      type="button"
                      onClick={requestClose}
                      disabled={loading}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 sm:min-w-24 sm:px-4"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading || formData.assignedUsers.length === 0}
                    className={isModal
                      ? 'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-auto sm:min-w-44 sm:px-5'
                      : 'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none'}
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : null}
                    {loading ? 'Creating assignment...' : 'Create assignment'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      {isModal && showDiscardPrompt && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/40 p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="discard-work-title"
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
          >
            <h3 id="discard-work-title" className="text-lg font-bold text-slate-900">
              Discard this draft?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Your task details and selections will be lost if you close now.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDiscardPrompt(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Discard draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignWork;
