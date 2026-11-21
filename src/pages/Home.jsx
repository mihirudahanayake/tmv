import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { db, auth, functions } from '../firebase/config';
import Header from '../components/Header';
import { sortWorksByNearestToNow } from '../utils/workDateTime';
import {
  FaCalendarAlt,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaCheckCircle,
  FaHourglassHalf,
  FaUndo,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  getWorkRolesForDepartment,
  normalizeRolesForDepartment,
  formatWorkRoleLabel,
} from '../constants/workRoles';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState({}); // itemId -> item data
  const [userDetails, setUserDetails] = useState({}); // userId -> user data
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskError, setTaskError] = useState('');
  const [itemsError, setItemsError] = useState('');
  const [toast, setToast] = useState('');

  // Meetings/Workshops state
  const [userEvents, setUserEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    setLoadingEvents(true);
    const q = query(collection(db, 'events'));
    const unsub = onSnapshot(q, (snap) => {
      const events = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setUserEvents(events);
      setLoadingEvents(false);
    });
    return () => unsub();
  }, []);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showRejectedTasks, setShowRejectedTasks] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'active' | 'completed' | 'rejected'

  // Popup notification for this user
  const [popup, setPopup] = useState(null);

  // Set userType based on logged-in user
  const [userType, setUserType] = useState('user');
  const [isTO, setIsTO] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchUserType = async () => {
      try {
        const profileSnap = await getDoc(doc(db, 'users', user.uid));
        if (!profileSnap.exists()) return;
        const data = profileSnap.data();
        setUserType(data.userType || 'user');
        setIsTO(!!data.isTO);
      } catch (err) {
        setUserType('user');
        setIsTO(false);
      }
    };
    fetchUserType();
  }, [user]);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (loadingUser) return;
    if (!user) {
      setTasks([]);
      setItems({});
      setTaskError('');
      setItemsError('');
      setLoadingTasks(false);
      return;
    }

    let cancelled = false;
    setTasks([]);
    setItems({});
    setLoadingTasks(true);
    setTaskError('');
    setItemsError('');

    const loadAssignedWork = async () => {
      try {
        await user.getIdToken(true);
        const getUserHomeData = httpsCallable(functions, 'getUserHomeData');
        const result = await getUserHomeData();
        const homeData = result.data;
        if (
          !Array.isArray(homeData?.tasks) ||
          !homeData.userDetails ||
          typeof homeData.userDetails !== 'object'
        ) {
          throw new Error('Invalid user home data returned by the server.');
        }

        // Hide works where this user is marked as missed by admin.
        const visibleMine = homeData.tasks.filter(
          (t) => (t?.workAttendance?.[t.__viewerUserId || user.uid]?.status || '') !== 'missed'
        );

        if (!cancelled) {
          setTasks(sortWorksByNearestToNow(visibleMine));
          setUserDetails(homeData.userDetails);
        }
      } catch (err) {
        console.error('Error loading assigned work:', err);
        if (!cancelled) {
          const errorCode = typeof err?.code === 'string' ? ` (${err.code})` : '';
          setTaskError(`Could not load your assigned work${errorCode}. Please refresh and try again.`);
        }
      } finally {
        if (!cancelled) setLoadingTasks(false);
      }
    };

    const loadInventoryItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'inventory'));
        const itemsMap = {};
        snapshot.docs.forEach((docSnap) => {
          itemsMap[docSnap.id] = docSnap.data();
        });
        if (!cancelled) setItems(itemsMap);
      } catch (err) {
        console.error('Error loading assigned work item details:', err);
        if (!cancelled) {
          setItemsError('Some assigned item details could not be loaded.');
        }
      }
    };

    loadAssignedWork();
    loadInventoryItems();

    return () => {
      cancelled = true;
    };
  }, [user, loadingUser]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // Persistent unread notification popup
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'notifications'),
      where('read', '==', false),
      limit(10)
    );

    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) {
        setPopup(null);
        return;
      }

      const docs = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((n) => (
          n.source === 'admin' ||
          n.type === 'admin-message' ||
          (n.source === 'system' && n.type === 'unauthorized-access')
        ));

      setPopup(docs[0] || null);
    });

    return () => unsub();
  }, [user]);

  const markPopupRead = async () => {
    if (!user || !popup?.id) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'notifications', popup.id), {
        read: true,
        readAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('Failed to mark notification read', e);
    }
  };

  const statusOf = (task) => task.status || 'incomplete';
  const getTaskUserId = (task) => task?.__viewerUserId || user?.uid;

  const getUserAcceptance = (task) => {
    const acceptance = task.userAcceptance || {};
    return acceptance[getTaskUserId(task)] || 'pending';
  };

  // ACCEPT + notification
  const handleAccept = async (task) => {
    const workUserId = getTaskUserId(task);
    if (!workUserId) return;
    try {
      const updateUserWorkAction = httpsCallable(functions, 'updateUserWorkAction');
      await updateUserWorkAction({ workId: task.id, action: 'accept' });
      const acceptance = { ...(task.userAcceptance || {}), [workUserId]: 'accepted' };
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, userAcceptance: acceptance } : t
        )
      );
      showToast('Work accepted successfully!');
    } catch (err) {
      console.error('Failed to accept:', err);
      showToast('Could not accept this work. Please refresh and try again.');
      return;
    }

    try {
      await addDoc(collection(db, 'notifications'), {
        department: task.department || 'videography',
        type: 'accept',
        source: 'user-action',
        audience: 'admin',
        workId: task.id,
        userId: workUserId,
        userName: user.displayName || '',
        createdAt: serverTimestamp(),
        read: false,
      });
    } catch (err) {
      console.error('Work was accepted, but its notification could not be created:', err);
      showToast('Work accepted, but the notification could not be sent.');
    }
  };

  const openRejectModal = (task) => {
    setSelectedTask(task);
    setRejectReason('');
    setShowRejectModal(true);
  };

  // REJECT + notification
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      showToast('Please provide a reason for rejection.');
      return;
    }
    if (!user?.uid || !selectedTask) return;
    const workUserId = getTaskUserId(selectedTask);
    if (!workUserId) return;

    try {
      const updateUserWorkAction = httpsCallable(functions, 'updateUserWorkAction');
      const result = await updateUserWorkAction({
        workId: selectedTask.id,
        action: 'reject',
        reason: rejectReason.trim(),
      });
      const rejection = result.data.rejection;
      const acceptance = { ...(selectedTask.userAcceptance || {}), [workUserId]: 'rejected' };
      const rejections = { ...(selectedTask.rejections || {}), [workUserId]: rejection };
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id
            ? { ...t, userAcceptance: acceptance, rejections }
            : t
        )
      );
      showToast('Work rejected.');
      setShowRejectModal(false);
      setSelectedTask(null);
    } catch (err) {
      console.error('Failed to reject:', err);
      showToast('Could not reject this work. Please refresh and try again.');
      return;
    }

    try {
      await addDoc(collection(db, 'notifications'), {
        department: selectedTask.department || 'videography',
        type: 'reject',
        source: 'user-action',
        audience: 'admin',
        workId: selectedTask.id,
        userId: workUserId,
        userName: user.displayName || '',
        createdAt: serverTimestamp(),
        read: false,
      });
    } catch (err) {
      console.error('Work was rejected, but its notification could not be created:', err);
      showToast('Work rejected, but the notification could not be sent.');
    }
  };

  // roles helpers
  const getStoredUserRoles = (task) => {
    if (!user) return [];
    const details = task.assignedUserDetails || [];
    const mine = details.find((d) => d.userId === getTaskUserId(task));
    return mine?.roles || [];
  };

  const getCompletionRoles = (task) => {
    if (!user) return [];
    const deptRoles = getWorkRolesForDepartment(task.department);
    const stored = getStoredUserRoles(task);

    if (deptRoles.length === 1 && deptRoles[0] === 'done') {
      if (stored.length && !stored.includes('done')) return stored;
      return ['done'];
    }

    return normalizeRolesForDepartment(task.department, stored);
  };

  const getUserRoles = (task) => {
    const deptRoles = getWorkRolesForDepartment(task.department);
    if (deptRoles.length === 1 && deptRoles[0] === 'done') return ['done'];
    return normalizeRolesForDepartment(task.department, getStoredUserRoles(task));
  };

  const isRoleDone = (task, role) => {
    if (!user) return false;
    const roleCompletion = task.roleCompletion || {};

    if (role === 'done') {
      const completionRoles = getCompletionRoles(task);
      if (!completionRoles.length) return false;
      return completionRoles.every(
        (r) => roleCompletion[`${getTaskUserId(task)}_${r}`] === 'done'
      );
    }

    return roleCompletion[`${getTaskUserId(task)}_${role}`] === 'done';
  };

  const allRolesDone = (task) => {
    const completionRoles = getCompletionRoles(task);
    if (!completionRoles.length) return false;
    const roleCompletion = task.roleCompletion || {};
    return completionRoles.every(
      (r) => roleCompletion[`${getTaskUserId(task)}_${r}`] === 'done'
    );
  };

  // TOGGLE ROLE + done / undo-done notifications
  const handleToggleRole = async (task, role) => {
    if (statusOf(task) === 'complete') return;

    const workUserId = getTaskUserId(task);
    if (!workUserId) return;
    const roleCompletion = task.roleCompletion || {};
    const completionRoles = getCompletionRoles(task);

    const allDoneBefore =
      completionRoles.length > 0 &&
      completionRoles.every(
        (r) => roleCompletion[`${workUserId}_${r}`] === 'done'
      );

    const nextCompletion = { ...roleCompletion };

    const deptRoles = getWorkRolesForDepartment(task.department);
    const isSingleDoneDept = deptRoles.length === 1 && deptRoles[0] === 'done';

    if (isSingleDoneDept && role === 'done') {
      if (allDoneBefore) {
        completionRoles.forEach((r) => {
          delete nextCompletion[`${workUserId}_${r}`];
        });
        delete nextCompletion[`${workUserId}_done`];
      } else {
        completionRoles.forEach((r) => {
          nextCompletion[`${workUserId}_${r}`] = 'done';
        });
        nextCompletion[`${workUserId}_done`] = 'done';
      }
    } else {
      const key = `${workUserId}_${role}`;
      const isDone = roleCompletion[key] === 'done';
      if (isDone) {
        delete nextCompletion[key];
      } else {
        nextCompletion[key] = 'done';
      }
    }

    const allDoneNow =
      completionRoles.length > 0 &&
      completionRoles.every(
        (r) => nextCompletion[`${workUserId}_${r}`] === 'done'
      );

    const roleDone = isSingleDoneDept && role === 'done'
      ? !allDoneBefore
      : nextCompletion[`${workUserId}_${role}`] === 'done';
    const rolesToUpdate = isSingleDoneDept && role === 'done'
      ? [...new Set([...completionRoles, 'done'])]
      : [role];

    try {
      const updateUserWorkAction = httpsCallable(functions, 'updateUserWorkAction');
      await updateUserWorkAction({
        workId: task.id,
        action: 'set-role',
        role,
        roles: rolesToUpdate,
        done: roleDone,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, roleCompletion: nextCompletion } : t
        )
      );
    } catch (err) {
      console.error('Failed to update role status:', err);
      showToast('Could not update this work status. Please refresh and try again.');
      return;
    }

    if (allDoneNow !== allDoneBefore) {
      try {
        await addDoc(collection(db, 'notifications'), {
          department: task.department || 'videography',
          type: allDoneNow ? 'done' : 'undo-done',
          source: 'user-action',
          audience: 'admin',
          workId: task.id,
          userId: workUserId,
          userName: user.displayName || '',
          createdAt: serverTimestamp(),
          read: false,
        });
      } catch (err) {
        console.error('Work status updated, but its notification could not be created:', err);
        showToast('Work status updated, but the notification could not be sent.');
      }
    }
  };

  // render assigned items for a task
  const renderAssignedItems = (task) => {
    const assignedItems = task.assignedItems || [];
    if (!assignedItems.length) return null;

    return (
      <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-slate-800/80">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
          Assigned items
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {assignedItems.map((itemId) => {
            const item = items[itemId];
            if (!item) {
              return (
                <span
                  key={itemId}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-[11px] sm:text-xs text-gray-500 dark:text-gray-300"
                >
                  Unknown item
                </span>
              );
            }
            return (
              <span
                key={itemId}
                className="px-2.5 py-1 rounded-lg bg-blue-50/90 dark:bg-slate-800 text-[11px] sm:text-xs font-medium text-blue-800 dark:text-gray-100 border border-blue-100 dark:border-slate-700"
              >
                {item.itemName || 'Item'}
                {item.itemNo ? ` (${item.itemNo})` : ''}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  // render team members
  const renderTeamMembers = (task) => {
    const assignedUsers = task.assignedUsers || [];
    const otherMembers = assignedUsers.filter((uid) => uid !== getTaskUserId(task));

    if (otherMembers.length === 0) {
      return (
        <div className="mt-2.5">
          <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 italic">
            Working solo on this task
          </p>
        </div>
      );
    }

    return (
      <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-slate-800/80">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
          Working with
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {otherMembers.map((uid) => {
            const member = userDetails[uid];
            if (!member) {
              return (
                <span
                  key={uid}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-xs text-gray-500 dark:text-gray-300"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                    ?
                  </div>
                  Unknown User
                </span>
              );
            }

            const avatarUrl = member.photoURL || member.avatarUrl || null;

            return (
              <div
                key={uid}
                className="inline-flex items-center gap-1.5 sm:gap-2 pl-1 pr-2.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 dark:from-slate-800 dark:to-slate-800 dark:border-slate-700 max-w-full"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={member.name || 'User'}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white dark:border-slate-700 shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shrink-0">
                    {(member.name || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {member.name || 'User'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTaskDates = (task, extraClass = '') => {
    if (!task.date && !task.deadline) return null;
    return (
      <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 ${extraClass}`}>
        {task.date && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100/90 dark:bg-slate-800 px-2 py-1 font-medium">
            <FaCalendarAlt className="shrink-0 text-blue-500 dark:text-yellow-300" />
            <span>{new Date(task.date).toLocaleDateString()}</span>
          </span>
        )}
        {task.deadline && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-200 px-2 py-1 font-medium">
            <FaCalendarAlt className="shrink-0" />
            <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
          </span>
        )}
      </div>
    );
  };

  const visibleTasks = tasks.filter((t) => statusOf(t) !== 'complete');
  const pendingTasks = visibleTasks.filter(
    (t) => getUserAcceptance(t) === 'pending'
  );
  const rejectedTasks = visibleTasks.filter(
    (t) => getUserAcceptance(t) === 'rejected'
  );
  const acceptedTasks = visibleTasks.filter(
    (t) => getUserAcceptance(t) === 'accepted' && !allRolesDone(t)
  );
  const completedTasks = visibleTasks.filter(
    (t) => getUserAcceptance(t) === 'accepted' && allRolesDone(t)
  );
  const completedTaskCount = tasks.filter(
    (t) =>
      statusOf(t) === 'complete' ||
      (getUserAcceptance(t) === 'accepted' && allRolesDone(t))
  ).length;

  const renderUserPopupText = () => {
    if (!popup) return '';
    return popup.title || 'New notification';
  };

  const showPendingSection = (activeFilter === 'all' || activeFilter === 'pending') && pendingTasks.length > 0;
  const showActiveSection = (activeFilter === 'all' || activeFilter === 'active') && acceptedTasks.length > 0;
  const showCompletedSection = (activeFilter === 'all' || activeFilter === 'completed') && completedTasks.length > 0;
  const showRejectedSection = (activeFilter === 'all' || activeFilter === 'rejected') && rejectedTasks.length > 0;

  return (
    <div
      className="fot-entry min-h-screen pb-8"
    >
      <Header userType={userType} isTO={isTO} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Mobile bottom-sheet / Desktop modal notification popup */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-[2px]">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-200 dark:border-slate-700 p-5 pb-6 sm:p-5">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-300 dark:bg-slate-700 sm:hidden" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              New notification
            </p>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              {renderUserPopupText()}
            </h3>
            {popup.message && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">{popup.message}</p>
            )}

            <div className="grid grid-cols-2 sm:flex gap-2.5 sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/user/notifications')}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-sm font-semibold hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700 active:scale-[0.99]"
              >
                View all
              </button>
              <button
                type="button"
                onClick={markPopupRead}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-[0.99]"
              >
                Mark read
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-friendly full-width toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-4 sm:bottom-auto sm:top-20 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-sm z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl animate-slide-in"
        >
          {toast}
        </div>
      )}

      {/* Reject Modal (Bottom Sheet on Mobile) */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 border-t sm:border border-gray-200 dark:border-slate-700 rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-md w-full p-5 pb-6 sm:p-6">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-300 dark:bg-slate-700 sm:hidden" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-1.5">
              Reject Work
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
              Please provide a reason for rejecting <span className="font-semibold text-gray-800 dark:text-gray-100">{selectedTask?.title || 'this work'}</span>:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows="4"
              className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-base sm:text-sm"
              placeholder="Enter your reason..."
            />
            <div className="grid grid-cols-2 sm:flex gap-2.5 sm:gap-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedTask(null);
                }}
                className="min-h-[44px] flex-1 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-100 py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition-all active:scale-[0.99]"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="min-h-[44px] flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-rose-700 transition-all active:scale-[0.99]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-3 sm:px-4 pt-3 sm:pt-8 max-w-6xl">
        {/* Admin: Add event creation button */}
        {userType === 'admin' && (
          <div className="mb-3 sm:mb-6 flex justify-stretch sm:justify-end">
            <Link
              to="/admin-create-event"
              className="w-full sm:w-auto min-h-[42px] inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm text-sm active:scale-[0.99]"
            >
              + Create Meeting/Workshop
            </Link>
          </div>
        )}

        {/* Compact Mobile Hero Overview */}
        <div className="mb-4 sm:mb-8 rounded-2xl sm:rounded-[28px] fot-panel p-4 sm:p-6">
          <div className="flex items-start sm:items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300 mb-0.5">
                Overview
              </p>
              <h1 className="text-xl sm:text-4xl font-bold text-slate-950 dark:text-white">
                Welcome Back
              </h1>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] sm:text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                {visibleTasks.length} active
              </span>
            </div>
          </div>
          <p className="mt-1.5 text-gray-600 dark:text-gray-300 text-xs sm:text-base leading-relaxed">
            Accept new assignments and track your progress.
          </p>
        </div>

        {/* Interactive Summary Filter Cards (2x2 on Mobile, 4-col on Desktop) */}
        {!loadingUser && !loadingTasks && tasks.length > 0 && (
          <div className="mb-4 sm:mb-8 grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-4">
            {[
              { key: 'pending', label: 'Pending', value: pendingTasks.length, tone: 'bg-[var(--fot-yellow)]', text: 'text-yellow-700 dark:text-yellow-300', ring: 'ring-yellow-400/70' },
              { key: 'active', label: 'Active', value: acceptedTasks.length, tone: 'bg-[var(--fot-blue)]', text: 'text-blue-700 dark:text-blue-300', ring: 'ring-blue-500/70' },
              { key: 'completed', label: 'Completed', value: completedTaskCount, tone: 'bg-[var(--fot-green)]', text: 'text-emerald-700 dark:text-emerald-300', ring: 'ring-emerald-500/70' },
              { key: 'rejected', label: 'Rejected', value: rejectedTasks.length, tone: 'bg-[var(--fot-coral)]', text: 'text-rose-700 dark:text-rose-300', ring: 'ring-rose-500/70' },
            ].map((card) => {
              const isSelected = activeFilter === card.key;
              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => setActiveFilter((prev) => (prev === card.key ? 'all' : card.key))}
                  className={`text-left group rounded-2xl border p-3 sm:p-4 shadow-sm backdrop-blur-sm transition-all duration-200 active:scale-[0.98] sm:hover:-translate-y-0.5 sm:hover:shadow-lg ${
                    isSelected
                      ? `border-transparent ring-2 ${card.ring} bg-white dark:bg-slate-900`
                      : 'border-white/60 bg-white/75 dark:border-slate-700 dark:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2.5">
                    <div className={`h-1.5 w-10 sm:w-14 rounded-full ${card.tone}`} />
                    {isSelected && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
                        Filtered
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{card.value}</span>
                    <span className={`text-xs font-semibold ${card.text}`}>{card.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Horizontal Scrollable Mobile Filter Pills */}
        {!loadingUser && !loadingTasks && visibleTasks.length > 0 && (
          <div className="mb-4 sm:mb-6 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { key: 'all', label: 'All', count: visibleTasks.length },
              { key: 'pending', label: 'Pending', count: pendingTasks.length },
              { key: 'active', label: 'Active', count: acceptedTasks.length },
              { key: 'completed', label: 'Completed', count: completedTasks.length },
              { key: 'rejected', label: 'Rejected', count: rejectedTasks.length },
            ]
              .filter((tab) => tab.key === 'all' || tab.count > 0)
              .map((tab) => {
                const active = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition active:scale-[0.98] ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white/80 dark:bg-slate-900/80 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
          </div>
        )}

        {loadingUser || loadingTasks ? (
          <div className="flex flex-col items-center justify-center py-14 sm:py-20">
            <FaSpinner className="animate-spin text-3xl sm:text-5xl text-blue-600 dark:text-yellow-300 mb-3" />
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Loading your tasks...</p>
          </div>
        ) : taskError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {taskError}
          </div>
        ) : visibleTasks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-7 sm:p-12 text-center border border-gray-100 dark:border-slate-700">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-yellow-300 dark:to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3.5">
              <FaCheckCircle className="text-2xl sm:text-4xl text-blue-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
              All Clear!
            </h3>
            <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300">
              You have no active tasks at the moment.
            </p>
          </div>
        ) : (
          <>
            {/* Pending Acceptance */}
            {showPendingSection && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                  <h2 className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Pending Acceptance
                  </h2>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {pendingTasks.length}
                  </span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm sm:shadow-md sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 border border-yellow-200/80 dark:border-blue-800"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 break-words leading-snug">
                          {task.title || 'Task'}
                        </h3>
                        <span className="shrink-0 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-[11px] font-semibold px-2.5 py-0.5 sm:py-1 rounded-full inline-flex items-center gap-1 border border-yellow-200 dark:border-yellow-700">
                          <FaHourglassHalf className="text-[10px] dark:text-yellow-200" />
                          Pending
                        </span>
                      </div>

                      {renderTaskDates(task, 'mb-2.5')}

                      {task.description && (
                        <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm mb-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {renderAssignedItems(task)}
                      {renderTeamMembers(task)}

                      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-slate-800">
                        <button
                          onClick={() => handleAccept(task)}
                          className="min-h-[44px] sm:flex-1 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-700 dark:to-emerald-900 text-white py-2.5 px-3 sm:px-4 rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.98]"
                        >
                          <FaCheck />
                          Accept
                        </button>
                        <button
                          onClick={() => openRejectModal(task)}
                          className="min-h-[44px] sm:flex-1 bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-700 dark:to-rose-900 text-white py-2.5 px-3 sm:px-4 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-rose-700 transition-all shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.98]"
                        >
                          <FaTimes />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Active Tasks */}
            {showActiveSection && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                  <h2 className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Active Tasks
                  </h2>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {acceptedTasks.length}
                  </span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {acceptedTasks.map((task) => {
                    const roles = getUserRoles(task);

                    return (
                      <div
                        key={task.id}
                        className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm sm:shadow-md sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 border border-blue-100 dark:border-slate-700"
                      >
                        <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-1.5 break-words leading-snug">
                          {task.title || 'Task'}
                        </h3>
                        {renderTaskDates(task, 'mb-2.5')}

                        {task.description && (
                          <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        {renderAssignedItems(task)}
                        {renderTeamMembers(task)}

                        <div className="bg-gradient-to-r from-blue-50/90 to-purple-50/90 dark:from-slate-800 dark:to-slate-900 rounded-xl p-3 sm:p-4 mt-3.5 border border-blue-100/70 dark:border-slate-700/70">
                          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
                            Your Work Types
                          </p>
                          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
                            {roles.map((role) => {
                              const done = isRoleDone(task, role);
                              const label = formatWorkRoleLabel(role);
                              return (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => handleToggleRole(task, role)}
                                  className={`min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-[0.98] ${
                                    done
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                                      : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400'
                                  }`}
                                >
                                  {done ? (
                                    <>
                                      <FaUndo className="text-xs" />
                                      Undo {label}
                                    </>
                                  ) : (
                                    <>
                                      <FaCheck className="text-xs" />
                                      {role === 'done' ? label : `Mark ${label} as done`}
                                    </>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Completed Tasks */}
            {showCompletedSection && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
                  <h2 className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Completed
                  </h2>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {completedTasks.length}
                  </span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {completedTasks.map((task) => {
                    const roles = getUserRoles(task);

                    return (
                      <div
                        key={task.id}
                        className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm sm:shadow-md sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 border border-green-100 dark:border-slate-700"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 break-words leading-snug">
                            {task.title || 'Task'}
                          </h3>
                          <FaCheckCircle className="shrink-0 text-xl sm:text-3xl text-green-500 mt-0.5" />
                        </div>

                        {renderTaskDates(task, 'mb-2.5')}

                        {task.description && (
                          <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        {renderAssignedItems(task)}
                        {renderTeamMembers(task)}

                        <div className="flex flex-wrap gap-2 mt-3.5 mb-3">
                          {roles.map((role) => (
                            <button
                              key={role}
                              onClick={() => handleToggleRole(task, role)}
                              className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-green-100 text-green-800 hover:bg-green-200 transition dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700 active:scale-[0.98]"
                            >
                              <FaUndo className="text-[11px]" />
                              Undo {formatWorkRoleLabel(role)}
                            </button>
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-semibold bg-green-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl">
                          ✓ All work completed. Waiting for admin review.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Pending Rejection with Hide/Show */}
            {showRejectedSection && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-1 h-5 sm:h-6 shrink-0 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
                    <h2 className="text-base sm:text-2xl font-bold text-gray-800 dark:text-gray-100 truncate">
                      Pending Rejection
                    </h2>
                    <span className="shrink-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {rejectedTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowRejectedTasks((prev) => !prev)}
                    className="shrink-0 min-h-[36px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700 active:scale-[0.98]"
                  >
                    <span>{showRejectedTasks ? 'Hide' : 'Show'}</span>
                    {showRejectedTasks ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                  </button>
                </div>

                {showRejectedTasks && (
                  <div className="space-y-3 sm:space-y-4">
                    {rejectedTasks.map((task) => {
                      const rejection =
                        (task.rejections || {})[getTaskUserId(task)] || {};

                      return (
                        <div
                          key={task.id}
                          className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm sm:shadow-md sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 border border-orange-100 dark:border-slate-700"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 break-words leading-snug">
                              {task.title || 'Task'}
                            </h3>
                            <span className="shrink-0 bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-200 text-[11px] font-semibold px-2.5 py-0.5 sm:py-1 rounded-full inline-flex items-center gap-1 border border-orange-200 dark:border-orange-800">
                              <FaHourglassHalf className="text-[10px]" />
                              Reviewing
                            </span>
                          </div>

                          {renderTaskDates(task, 'mb-2.5')}
                          {renderAssignedItems(task)}
                          {renderTeamMembers(task)}

                          <div className="bg-orange-50 dark:bg-slate-800/80 rounded-xl p-3 sm:p-4 mt-3">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-800 dark:text-orange-300 mb-1">
                              Your Rejection Reason
                            </p>
                            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                              {rejection.reason || '-'}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">
                              Waiting for admin to approve your rejection request
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {itemsError && !taskError && (
          <p
            role="status"
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs sm:text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
          >
            {itemsError}
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;