import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import * as XLSX from 'xlsx';
import {
  FaCalendarAlt,
  FaUsers,
  FaSpinner,
  FaSearch,
  FaCheck,
  FaFileExcel,
  FaBox,
  FaHourglassHalf,
  FaTimes
} from 'react-icons/fa';
import Header from '../components/Header';
import { useUserProfile } from '../hooks/useUserProfile';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';
import { getWorkRolesForDepartment, normalizeRolesForDepartment, formatWorkRoleLabel } from '../constants/workRoles';
import { Roles } from '../utils/authz';
import { sortWorksByNearestToNow, getWorkDateTime } from '../utils/workDateTime';

const WorkList = () => {
  const { profile, loading: loadingProfile } = useUserProfile();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState('videography');

  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const departmentTaskCounts = useMemo(() => {
    const counts = {};
    WORK_DEPARTMENTS.forEach((dept) => {
      counts[dept] = tasks.filter((task) => (task.department || department) === dept).length;
    });
    return counts;
  }, [tasks, department]);

  const navigate = useNavigate();

  useEffect(() => {
    if (loadingProfile || !profile) return;

    if (profile.role === Roles.SUPER_ADMIN) {
      setDepartment('all');
      return;
    }

    // Department Heads are locked to their department.
    if (profile.role === Roles.DEPARTMENT_HEAD) {
      const dept = (profile.managedDepartments || [])[0] || 'videography';
      setDepartment(dept);
      return;
    }

    // Others: default to first managed department if present.
    if (profile?.managedDepartments?.length) {
      setDepartment(profile.managedDepartments[0]);
    }
  }, [loadingProfile, profile]);

  useEffect(() => {
    if (loadingProfile) return;
    fetchData();
  }, [loadingProfile, department]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const isSuperAdmin = profile?.role === Roles.SUPER_ADMIN;
      const effectiveDepartment = isSuperAdmin
        ? department === 'all'
          ? null
          : department
        : profile?.role === Roles.DEPARTMENT_HEAD
          ? (profile?.managedDepartments || [])[0] || department
          : department;

      const usersSnapshot = await getDocs(
        isSuperAdmin
          ? collection(db, 'users')
          : query(collection(db, 'users'), where('departments', 'array-contains', effectiveDepartment))
      );
      const usersMap = {};
      usersSnapshot.docs.forEach((d) => {
        usersMap[d.id] = d.data();
      });
      setUsers(usersMap);

      const itemsSnapshot = await getDocs(collection(db, 'inventory'));
      const itemsMap = {};
      itemsSnapshot.docs.forEach((d) => {
        itemsMap[d.id] = d.data();
      });
      setItems(itemsMap);

      const worksSnap = isSuperAdmin
        ? await getDocs(collection(db, 'works'))
        : await getDocs(query(collection(db, 'works'), where('department', '==', effectiveDepartment)));

      const dedup = new Map();
      worksSnap.docs.forEach((d) => {
        dedup.set(d.id, { id: d.id, ...d.data() });
      });

      if (!isSuperAdmin && effectiveDepartment === 'videography') {
        const legacySnap = await getDocs(query(collection(db, 'works'), where('department', '==', null)));
        legacySnap.docs.forEach((d) => dedup.set(d.id, { id: d.id, ...d.data() }));
      }

      const allTasks = Array.from(dedup.values());
      setTasks(sortWorksByNearestToNow(allTasks));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (taskId) => {
    try {
      const taskRef = doc(db, 'works', taskId);
      await updateDoc(taskRef, { status: 'complete' });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'complete' } : t))
      );
    } catch (err) {
      console.error('Failed to mark task complete:', err);
    }
  };

  const handleUndoComplete = async (taskId) => {
    try {
      const taskRef = doc(db, 'works', taskId);
      // Revert to non-complete so derived status logic applies again.
      await updateDoc(taskRef, { status: 'pending' });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'pending' } : t))
      );
    } catch (err) {
      console.error('Failed to undo task complete:', err);
    }
  };

  const formatDateForExport = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const exportTasksToExcel = (rowsSource, filenameBase) => {
    // Per-user, per-task matrix (one row per user)
    const normalizeDateKey = (value) => {
      if (!value) return null;
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return null;
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    };

    const getCompletionRolesForUser = (task, detailsRow) => {
      const deptRoles = getWorkRolesForDepartment(task.department);
      const stored = detailsRow?.roles || [];

      // single-role departments: keep compatibility with legacy stored roles
      if (deptRoles.length === 1 && deptRoles[0] === 'done') {
        if (stored.length && !stored.includes('done')) return stored;
        return ['done'];
      }

      return normalizeRolesForDepartment(task.department, stored);
    };

    const getUserCompletedRolesForTask = (task, userId) => {
      const roleCompletion = task.roleCompletion || {};
      const detailsRow = (task.assignedUserDetails || []).find(
        (d) => d.userId === userId
      );

      // If no details row exists (legacy), assume department roles.
      const roles = detailsRow
        ? getCompletionRolesForUser(task, detailsRow)
        : getWorkRolesForDepartment(task.department);

      return (roles || []).filter(
        (role) => roleCompletion[`${userId}_${role}`] === 'done'
      );
    };

    const tasksSorted = [...(rowsSource || [])].sort((a, b) => {
      const ta = getWorkDateTime(a)?.getTime() ?? Number.POSITIVE_INFINITY;
      const tb = getWorkDateTime(b)?.getTime() ?? Number.POSITIVE_INFINITY;
      return ta - tb;
    });

    // Build unique column labels: "Title (dd/mm/yyyy)"
    const usedLabels = new Map();
    const taskColumns = tasksSorted.map((t) => {
      const dateKey = normalizeDateKey(t.date || t.deadline);
      const dateLabel = dateKey ? formatDateForExport(dateKey) : '';
      const base = `${t.title || 'Work'}${dateLabel ? ` (${dateLabel})` : ''}`;
      const count = (usedLabels.get(base) || 0) + 1;
      usedLabels.set(base, count);
      const label = count === 1 ? base : `${base} #${count}`;
      return { id: t.id, task: t, label };
    });

    const usersForRows = Object.entries(users || {}).map(([id, data]) => ({
      id,
      ...(data || {})
    }));

    const pad2 = (n) => String(n).padStart(2, '0');

    const rows = usersForRows
      .sort(
        (a, b) =>
          (a.registrationNumber || '').localeCompare(b.registrationNumber || '') ||
          (a.name || '').localeCompare(b.name || '')
      )
      .map((u, idx) => {
        const userDepartments = Array.isArray(u.departments)
          ? u.departments.filter(Boolean).join(', ')
          : u.department || '';

        const row = {
          No: pad2(idx + 1),
          'Registration Number': u.registrationNumber || '',
          Name: u.name || '',
          Card: u.cardNumber || '',
          'Department(s)': userDepartments,
        };

        let totalWorks = 0;

        taskColumns.forEach(({ task, label }) => {
          const attendance = task.workAttendance || {};
          const isMissed = (attendance?.[u.id]?.status || '') === 'missed';

          if (isMissed) {
            row[label] = 'Missed';
            return;
          }

          const completedRoles = getUserCompletedRolesForTask(task, u.id);
          const cellText = completedRoles.length
            ? completedRoles.map(formatWorkRoleLabel).join(', ')
            : '';
          row[label] = cellText;
          if (cellText) totalWorks += 1;
        });

        row['Total Works'] = totalWorks;
        return row;
      });

    const sheet = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Users');

    const today = new Date().toISOString().slice(0, 10);
    const safeDept = String(department || 'department').replace(/[^a-z0-9_-]/gi, '_');
    const filename = `${filenameBase}_${safeDept}_${today}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const handleDownloadExcelAll = () => {
    exportTasksToExcel(tasks, 'worklist_all');
  };

  const handleDownloadExcelDateRange = () => {
    if (!startDate && !endDate) {
      alert('Please select a start date or end date first.');
      return;
    }

    const inRange = (task) => {
      if (!task?.date) return false;
      const d = new Date(task.date);
      if (Number.isNaN(d.getTime())) return false;
      const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      if (startDate && iso < startDate) return false;
      if (endDate && iso > endDate) return false;
      return true;
    };

    const rows = sortWorksByNearestToNow(tasks.filter(inRange));

    exportTasksToExcel(rows, 'worklist_date_range');
  };

  const normalizedSearch = searchText.trim().toLowerCase();

  // chip color
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-red-100 text-red-800',
      accepted: 'bg-orange-100 text-orange-800',
      done: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors.pending;
  };

  // derived status for chip + filter
  const getDerivedStatus = (task) => {

    if ((task.status || '').toLowerCase() === 'old work') {
      return 'old work';
    }
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

    // If everyone was marked missed, treat as still pending (no active assignees).
    if (!activeUserDetails.length) return 'pending';

    const allAccepted = activeUserDetails.every(
      (d) => acceptance[d.userId] === 'accepted'
    );
    if (!allAccepted) return 'pending';

    const getCompletionRolesForUser = (detailsRow) => {
      const deptRoles = getWorkRolesForDepartment(task.department);
      const stored = detailsRow?.roles || [];

      // single-role departments: keep compatibility with legacy stored roles
      if (deptRoles.length === 1 && deptRoles[0] === 'done') {
        if (stored.length && !stored.includes('done')) return stored;
        return ['done'];
      }

      return normalizeRolesForDepartment(task.department, stored);
    };

    const allRolesDone = activeUserDetails.every((d) =>
      getCompletionRolesForUser(d).every(
        (role) => roleCompletion[`${d.userId}_${role}`] === 'done'
      )
    );

    if (!allRolesDone) return 'accepted';
    return 'done';
  };

  // Separate old works and normal tasks
  const filteredAndSorted = sortWorksByNearestToNow(
    tasks.filter((task) => {
      if (profile?.role === Roles.SUPER_ADMIN && department !== 'all') {
        const taskDepartment = task.department || department;
        if (taskDepartment !== department) return false;
      }

      // date filter
      if (startDate || endDate) {
        if (!task.date) return false;
        const d = new Date(task.date);
        const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 10);
        if (startDate && iso < startDate) return false;
        if (endDate && iso > endDate) return false;
      }

      // NEW: status filter
      const derived = getDerivedStatus(task); // 'pending' | 'accepted' | 'done' | 'completed'
      if (statusFilter !== 'all' && derived !== statusFilter) return false;

      // search filter
      if (!normalizedSearch) return true;

      const title = (task.title || '').toLowerCase();

      const assigned = (task.assignedUsers || []).map(
        (uid) => users[uid] || {}
      );
      const names = assigned.map((u) => (u.name || '').toLowerCase());
      const cards = assigned.map((u) => (u.cardNumber || '').toLowerCase());

      const matchTitle = title.includes(normalizedSearch);
      const matchName = names.some((n) => n.includes(normalizedSearch));
      const matchCard = cards.some((c) => c.includes(normalizedSearch));

      return matchTitle || matchName || matchCard;
    })
  );

  const oldWorks = filteredAndSorted.filter((t) => (t.status || '').toLowerCase() === 'old work');
  const normalTasks = filteredAndSorted.filter((t) => (t.status || '').toLowerCase() !== 'old work');
  const incompleteTasks = normalTasks.filter(
    (t) => (t.status || 'incomplete') !== 'complete'
  );
  const completeTasks = normalTasks.filter(
    (t) => (t.status || 'incomplete') === 'complete'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
        <Header userType="admin" />
        <div className="flex h-64 flex-col items-center justify-center">
          <FaSpinner className="mb-4 animate-spin text-4xl text-blue-600" />
          <p className="text-sm font-medium text-slate-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  const renderAcceptanceBadge = (task, userId) => {
    const acceptance = task.userAcceptance || {};
    const state = acceptance[userId] || 'pending';

    const attendance = task.workAttendance || {};
    if ((attendance?.[userId]?.status || '') === 'missed') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 text-[11px] font-semibold">
          <FaTimes className="text-[10px]" />
          Missed
        </span>
      );
    }

    if (state === 'accepted') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[11px] font-semibold">
          <FaCheck className="text-[10px]" />
          Accepted
        </span>
      );
    }

    if (state === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[11px] font-semibold">
          <FaTimes className="text-[10px]" />
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[11px] font-semibold">
        <FaHourglassHalf className="text-[10px]" />
        Pending
      </span>
    );
  };

  const renderTaskCard = (task, isCompleteSection = false) => {
    const status = getDerivedStatus(task);
    const userDetailsLocal = task.assignedUserDetails || [];
    const roleCompletion = task.roleCompletion || {};
    const assignedItems = task.assignedItems || [];

    return (
      <div
        key={task.id}
        className="group cursor-pointer rounded-[26px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-4 shadow-[0_18px_36px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(37,99,235,0.14)]"
        onClick={() => navigate(`/tasks/${task.id}`)}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-2.5">
            <div className="mt-1 h-9 w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500" />
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                {formatWorkDepartmentLabel(task.department || department)}
              </p>
              <h3 className="text-base font-bold text-slate-800 sm:text-lg">
                {task.title || 'Task'}
              </h3>
            </div>
          </div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${getStatusColor(status)}`}
          >
            {status}
          </span>
        </div>

        {task.description && (
          <p className="mb-4 line-clamp-3 text-sm text-slate-600">
            {task.description}
          </p>
        )}

        {(task.date || task.deadline) && (
          <div className="mb-4 grid gap-2 text-xs text-slate-500 sm:text-sm">
            {task.date && (
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
                <FaCalendarAlt className="text-slate-400" />
                <span>
                  Date: {new Date(task.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
            {task.deadline && (
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
                <FaCalendarAlt className="text-slate-400" />
                <span>
                  Deadline: {new Date(task.deadline).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <FaUsers className="text-[11px]" />
            <span>Staff</span>
          </div>
          <div className="space-y-2">
            {userDetailsLocal.map((detail) => {
              const userId = detail.userId;
              const roles = detail.roles || [];
              const userData = users[userId] || {};
              const userName = userData.name || 'Unknown';
              const avatarUrl = userData.photoURL || userData.avatarUrl || null;

              return (
                <div
                  key={userId}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/users/${userId}`);
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 transition hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={userName}
                          className="h-7 w-7 rounded-full border border-white object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <p className="text-sm font-semibold text-slate-800">{userName}</p>
                    </div>
                    {renderAcceptanceBadge(task, userId)}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {roles.map((role) => {
                      const key = `${userId}_${role}`;
                      const isDone = roleCompletion[key] === 'done';
                      return (
                        <span
                          key={role}
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            isDone ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isDone && <FaCheck className="text-[9px]" />}
                          {role}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {userDetailsLocal.length === 0 &&
              task.assignedUsers?.map((userId) => {
                const userData = users[userId] || {};
                const userName = userData.name || 'Unknown';
                const avatarUrl = userData.photoURL || userData.avatarUrl || null;

                return (
                  <div
                    key={userId}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/users/${userId}`);
                    }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 transition hover:bg-blue-50"
                  >
                    <div className="flex items-center gap-2">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={userName}
                          className="h-7 w-7 rounded-full border border-white object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm text-slate-700">{userName}</span>
                    </div>
                    {renderAcceptanceBadge(task, userId)}
                  </div>
                );
              })}
          </div>
        </div>

        {assignedItems.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <FaBox className="text-[11px]" />
              <span>Items</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {assignedItems.map((itemId) => {
                const item = items[itemId];
                return (
                  <span
                    key={itemId}
                    className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-800 ring-1 ring-blue-100"
                  >
                    {item ? `${item.itemName} (${item.itemNo})` : 'Unknown item'}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {!isCompleteSection && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleMarkComplete(task.id);
            }}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            <FaCheck />
            Mark as complete
          </button>
        )}

        {isCompleteSection && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-2">
            <p className="text-xs font-semibold text-emerald-700">Completed</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUndoComplete(task.id);
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
              title="Undo complete"
            >
              Undo
            </button>
          </div>
        )}
      </div>
    );
  };

  const hasAnyTasks = incompleteTasks.length > 0 || completeTasks.length > 0 || oldWorks.length > 0;
  const totalWorkCount = tasks.length || 1;
  const currentDepartmentLabel = profile?.role === Roles.SUPER_ADMIN
    ? (department === 'all' ? 'All Departments' : formatWorkDepartmentLabel(department))
    : formatWorkDepartmentLabel(
        profile?.role === Roles.DEPARTMENT_HEAD
          ? ((profile?.managedDepartments || [])[0] || department)
          : department
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-5 sm:py-6">
        <div className="mb-5 rounded-[28px] border border-white/80 bg-gradient-to-r from-white via-sky-50 to-indigo-50 p-4 shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-600">Work list</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">All Tasks</h2>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-500 to-cyan-500 p-3 text-white shadow-[0_10px_25px_rgba(59,130,246,0.25)]">
              <p className="text-xs font-medium text-blue-100">Total</p>
              <p className="mt-2 text-xl font-bold">{tasks.length}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-400 to-orange-500 p-3 text-white shadow-[0_10px_25px_rgba(245,158,11,0.22)]">
              <p className="text-xs font-medium text-amber-50">Pending</p>
              <p className="mt-2 text-xl font-bold">{normalTasks.filter((t) => getDerivedStatus(t) === 'pending').length}</p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-400 to-red-500 p-3 text-white shadow-[0_10px_25px_rgba(249,115,22,0.22)]">
              <p className="text-xs font-medium text-orange-50">Accepted</p>
              <p className="mt-2 text-xl font-bold">{normalTasks.filter((t) => getDerivedStatus(t) === 'accepted').length}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-500 to-teal-500 p-3 text-white shadow-[0_10px_25px_rgba(16,185,129,0.22)]">
              <p className="text-xs font-medium text-emerald-50">Completed</p>
              <p className="mt-2 text-xl font-bold">{completeTasks.length}</p>
            </div>
          </div>

          {profile?.role === Roles.SUPER_ADMIN && (
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {WORK_DEPARTMENTS.map((dept, index) => {
                const isActive = department === dept;
                const count = departmentTaskCounts[dept] || 0;
                const percentage = Math.max((count / totalWorkCount) * 100, count > 0 ? 8 : 0);
                const palette = [
                  'from-blue-500 to-cyan-500',
                  'from-amber-400 to-orange-500',
                  'from-emerald-500 to-teal-500',
                  'from-violet-500 to-purple-500',
                  'from-rose-500 to-pink-500',
                ];
                const accent = palette[index % palette.length];

                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setDepartment(dept)}
                    className={`group rounded-2xl border p-3 text-left shadow-sm transition-all duration-200 ease-out ${
                      isActive
                        ? `border-transparent bg-gradient-to-br ${accent} text-white shadow-[0_12px_24px_rgba(59,130,246,0.25)] ring-2 ring-blue-200`
                        : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${isActive ? 'text-blue-50' : 'text-slate-500'}`}>
                        {formatWorkDepartmentLabel(dept)}
                      </p>
                      <span className={`flex h-2.5 w-2.5 rounded-full ${isActive ? 'bg-white/90' : 'bg-slate-300 group-hover:bg-blue-400'}`} />
                    </div>

                    <div className="mt-2 flex items-end justify-between gap-2">
                      <p className={`text-lg font-bold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                        {count}
                      </p>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${accent} ${isActive ? 'opacity-100' : 'opacity-90'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setDepartment('all')}
                className={`group rounded-2xl border p-3 text-left shadow-sm transition-all duration-200 ease-out ${
                  department === 'all'
                    ? 'border-violet-500 bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_12px_24px_rgba(139,92,246,0.25)] ring-2 ring-violet-200'
                    : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-50/60 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${department === 'all' ? 'text-violet-50' : 'text-slate-500'}`}>
                    All
                  </p>
                  <span className={`flex h-2.5 w-2.5 rounded-full ${department === 'all' ? 'bg-white/90' : 'bg-slate-300 group-hover:bg-violet-400'}`} />
                </div>

                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className={`text-lg font-bold ${department === 'all' ? 'text-white' : 'text-slate-800'}`}>
                    {tasks.length}
                  </p>
                </div>

                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 ${department === 'all' ? 'opacity-100' : 'opacity-90'}`}
                    style={{ width: '100%' }}
                  />
                </div>
              </button>
            </div>
          )}

          <p className="mb-3 text-sm text-slate-600">
            Department: <span className="font-semibold text-slate-800">{currentDepartmentLabel}</span>
          </p>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search title, user name, or card..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid w-full gap-2 sm:grid-cols-3 lg:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:text-sm"
                aria-label="Start date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:text-sm"
                aria-label="End date"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:text-sm"
              >
                <option value="accepted">Accepted</option>
                <option value="pending">Pending</option>
                <option value="done">Done</option>
                <option value="completed">Completed</option>
                <option value="old work">Old work</option>
                <option value="all">All status</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={handleDownloadExcelAll}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <FaFileExcel />
              Download All Task Details
            </button>
            <button
              type="button"
              onClick={handleDownloadExcelDateRange}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-100"
            >
              <FaFileExcel />
              Download Task Details Selected Date Range
            </button>
          </div>
        </div>

        {!hasAnyTasks ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
            <p className="text-sm text-slate-600 sm:text-base">No tasks match your filters.</p>
          </div>
        ) : (
          <>
            {incompleteTasks.length > 0 && (
              <section className="mb-6">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-800 sm:text-xl">Incomplete / waiting for admin</h3>
                  <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                    {incompleteTasks.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {incompleteTasks.map((task) => renderTaskCard(task, false))}
                </div>
              </section>
            )}
            {completeTasks.length > 0 && (
              <section>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-800 sm:text-xl">Completed tasks</h3>
                  <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                    {completeTasks.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {completeTasks.map((task) => renderTaskCard(task, true))}
                </div>
              </section>
            )}
            {oldWorks.length > 0 && (
              <section className="mt-6">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-800 sm:text-xl">Old Works</h3>
                  <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700">
                    {oldWorks.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {oldWorks.map((task) => (
                    <div
                      key={task.id}
                      className="cursor-pointer rounded-[26px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-violet-50 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(124,58,237,0.12)]"
                      onClick={() => navigate(`/edit-old-work/${task.id}`)}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-800">{task.title || 'Old Work'}</h3>
                        <span className={`inline-block rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${getStatusColor(task.status)}`}>
                          {task.status || 'old work'}
                        </span>
                      </div>
                      <p className="mb-3 text-sm text-slate-600">{task.description}</p>
                      {task.date && (
                        <p className="text-xs text-slate-500">Date: {new Date(task.date).toLocaleDateString('en-GB')}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default WorkList;