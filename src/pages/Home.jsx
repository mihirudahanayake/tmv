import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import Header from '../components/Header';
import {
  FaCalendarAlt,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaCheckCircle,
  FaHourglassHalf,
  FaUndo
} from 'react-icons/fa';

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState({}); // itemId -> item data
  const [userDetails, setUserDetails] = useState({}); // userId -> user data
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [toast, setToast] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showRejectedTasks, setShowRejectedTasks] = useState(true);

  const userType = 'user';

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadTasks = async () => {
      setLoadingTasks(true);
      try {
        const snap = await getDocs(collection(db, 'works'));
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const mine = all.filter(
          (t) =>
            Array.isArray(t.assignedUsers) &&
            t.assignedUsers.includes(user.uid)
        );

        mine.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const dbt = b.date ? new Date(b.date).getTime() : 0;
          return dbt - da;
        });

        setTasks(mine);

        const invSnap = await getDocs(collection(db, 'inventory'));
        const itemsMap = {};
        invSnap.docs.forEach((docSnap) => {
          itemsMap[docSnap.id] = docSnap.data();
        });
        setItems(itemsMap);
      } catch (err) {
        console.error('Error loading user tasks:', err);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadTasks();
  }, [user]);

  // Load all users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const usersMap = {};
        usersSnap.docs.forEach((docSnap) => {
          usersMap[docSnap.id] = docSnap.data();
        });
        setUserDetails(usersMap);
      } catch (err) {
        console.error('Error loading users:', err);
      }
    };

    loadUsers();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // Real-time listener for task changes
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'works'),
      where('assignedUsers', 'array-contains', user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          setTasks((prev) => {
            const exists = prev.some((t) => t.id === change.doc.id);
            if (exists) return prev;
            const newTask = { id: change.doc.id, ...data };
            return [newTask, ...prev].sort((a, b) => {
              const da = a.date ? new Date(a.date).getTime() : 0;
              const dbt = b.date ? new Date(b.date).getTime() : 0;
              return dbt - da;
            });
          });
        } else if (change.type === 'modified') {
          // Handle updates to existing tasks
          const data = change.doc.data();
          setTasks((prev) =>
            prev.map((t) =>
              t.id === change.doc.id
                ? { ...t, ...data }
                : t
            ).sort((a, b) => {
              const da = a.date ? new Date(a.date).getTime() : 0;
              const dbt = b.date ? new Date(b.date).getTime() : 0;
              return dbt - da;
            })
          );
        } else if (change.type === 'removed') {
          // Remove task if user is no longer assigned
          setTasks((prev) => prev.filter((t) => t.id !== change.doc.id));
        }
      });
    });

    return () => unsub();
  }, [user]);

  const statusOf = (task) => task.status || 'incomplete';

  const getUserAcceptance = (task) => {
    const acceptance = task.userAcceptance || {};
    return acceptance[user.uid] || 'pending';
  };

  // ACCEPT + notification
  const handleAccept = async (task) => {
    try {
      const acceptance = task.userAcceptance || {};
      acceptance[user.uid] = 'accepted';

      const ref = doc(db, 'works', task.id);
      await updateDoc(ref, { userAcceptance: acceptance });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, userAcceptance: acceptance } : t
        )
      );
      showToast('Work accepted successfully!');

      await addDoc(collection(db, 'notifications'), {
        type: 'accept',
        workId: task.id,
        userId: user.uid,
        userName: user.displayName || '',
        createdAt: serverTimestamp(),
        read: false
      });
    } catch (err) {
      console.error('Failed to accept:', err);
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

    try {
      const acceptance = selectedTask.userAcceptance || {};
      acceptance[user.uid] = 'rejected';

      const rejections = selectedTask.rejections || {};
      rejections[user.uid] = {
        reason: rejectReason.trim(),
        timestamp: new Date().toISOString(),
        approved: false
      };

      const ref = doc(db, 'works', selectedTask.id);
      await updateDoc(ref, { userAcceptance: acceptance, rejections });
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

      await addDoc(collection(db, 'notifications'), {
        type: 'reject',
        workId: selectedTask.id,
        userId: user.uid,
        userName: user.displayName || '',
        createdAt: serverTimestamp(),
        read: false
      });
    } catch (err) {
      console.error('Failed to reject:', err);
    }
  };

  // roles helpers
  const getUserRoles = (task) => {
    if (!user) return [];
    const details = task.assignedUserDetails || [];
    const mine = details.find((d) => d.userId === user.uid);
    return mine?.roles || [];
  };

  const isRoleDone = (task, role) => {
    const key = `${user.uid}_${role}`;
    return (task.roleCompletion || {})[key] === 'done';
  };

  const allRolesDone = (task) => {
    const roles = getUserRoles(task);
    if (!roles.length) return false;
    return roles.every((r) => isRoleDone(task, r));
  };

  // TOGGLE ROLE + done / undo-done notifications
  const handleToggleRole = async (task, role) => {
    if (statusOf(task) === 'complete') return;

    const key = `${user.uid}_${role}`;
    const roleCompletion = task.roleCompletion || {};
    const isDone = roleCompletion[key] === 'done';

    const nextCompletion = { ...roleCompletion };
    if (isDone) {
      delete nextCompletion[key];
    } else {
      nextCompletion[key] = 'done';
    }

    const roles = getUserRoles(task);
    const allDoneNow =
      roles.length > 0 &&
      roles.every((r) => nextCompletion[`${user.uid}_${r}`] === 'done');

    const allDoneBefore =
      roles.length > 0 &&
      roles.every(
        (r) => (task.roleCompletion || {})[`${user.uid}_${r}`] === 'done'
      );

    try {
      if (allDoneNow && !allDoneBefore) {
        await addDoc(collection(db, 'notifications'), {
          type: 'done',
          workId: task.id,
          userId: user.uid,
          userName: user.displayName || '',
          createdAt: serverTimestamp(),
          read: false
        });
      } else if (!allDoneNow && allDoneBefore) {
        await addDoc(collection(db, 'notifications'), {
          type: 'undo-done',
          workId: task.id,
          userId: user.uid,
          userName: user.displayName || '',
          createdAt: serverTimestamp(),
          read: false
        });
      }

      const ref = doc(db, 'works', task.id);
      await updateDoc(ref, { roleCompletion: nextCompletion });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, roleCompletion: nextCompletion } : t
        )
      );
    } catch (err) {
      console.error('Failed to update role status:', err);
    }
  };

  // render assigned items for a task
  const renderAssignedItems = (task) => {
    const assignedItems = task.assignedItems || [];
    if (!assignedItems.length) return null;

    return (
      <div className="mt-3">
        <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">
          Assigned items:
        </p>
        <div className="flex flex-wrap gap-2">
          {assignedItems.map((itemId) => {
            const item = items[itemId];
            if (!item) {
              return (
                <span
                  key={itemId}
                  className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-500"
                >
                  Unknown item
                </span>
              );
            }
            return (
              <span
                key={itemId}
                className="px-2 py-1 rounded-full bg-blue-50 text-xs sm:text-sm text-blue-800 border border-blue-100"
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
    const otherMembers = assignedUsers.filter((uid) => uid !== user.uid);
    
    if (otherMembers.length === 0) {
      return (
        <div className="mt-3">
          <p className="text-xs text-gray-500 italic">
            You are working on this alone
          </p>
        </div>
      );
    }

    return (
      <div className="mt-3">
        <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Working with:
        </p>
        <div className="flex flex-wrap gap-2">
          {otherMembers.map((uid) => {
            const member = userDetails[uid];
            if (!member) {
              return (
                <span
                  key={uid}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs text-gray-500"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                    ?
                  </div>
                  Unknown User
                </span>
              );
            }

            // Get roles for this member
            const details = task.assignedUserDetails || [];
            const memberDetail = details.find((d) => d.userId === uid);
            const roles = memberDetail?.roles || [];

            return (
              <div
                key={uid}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {(member.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {member.name || 'User'}
                  </span>
                  {/* {roles.length > 0 && (
                    <span className="text-xs text-gray-600">
                      {roles.join(', ')}
                    </span>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header userType={userType} />

      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-5 py-3 rounded-lg shadow-2xl animate-slide-in">
          {toast}
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Reject Work
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this work:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              placeholder="Enter your reason..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleReject}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 transition-all"
              >
                Submit Rejection
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedTask(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your tasks efficiently. Accept new assignments and track your
            progress.
          </p>
        </div>

        {loadingUser || loadingTasks ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-5xl text-blue-600 mb-4" />
            <p className="text-gray-600">Loading your tasks...</p>
          </div>
        ) : visibleTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              All Clear!
            </h3>
            <p className="text-gray-600">
              You have no active tasks at the moment.
            </p>
          </div>
        ) : (
          <>
            {/* Pending Acceptance */}
            {pendingTasks.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Pending Acceptance
                  </h2>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {pendingTasks.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 sm:p-6 border border-yellow-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                            {task.title || 'Task'}
                          </h3>
                          {task.date && (
                            <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                              <FaCalendarAlt />
                              {new Date(task.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                          <FaHourglassHalf />
                          Pending
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-gray-700 text-sm mb-2">
                          {task.description}
                        </p>
                      )}

                      {renderAssignedItems(task)}
                      {renderTeamMembers(task)}

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleAccept(task)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <FaCheck />
                          Accept
                        </button>
                        <button
                          onClick={() => openRejectModal(task)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 transition-all shadow-md flex items-center justify-center gap-2"
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

            {/* Pending Rejection with Hide/Show */}
            {rejectedTasks.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Pending Rejection Approval
                    </h2>
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {rejectedTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setShowRejectedTasks((prev) => !prev)
                    }
                    className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition px-3 py-1.5 rounded-lg hover:bg-gray-100"
                  >
                    {showRejectedTasks ? 'Hide' : 'Show'}
                  </button>
                </div>

                {showRejectedTasks && (
                  <div className="space-y-4">
                    {rejectedTasks.map((task) => {
                      const rejection =
                        (task.rejections || {})[user.uid] || {};

                      return (
                        <div
                          key={task.id}
                          className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-orange-100"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                {task.title || 'Task'}
                              </h3>
                              {task.date && (
                                <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                  <FaCalendarAlt />
                                  {new Date(
                                    task.date
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                              <FaHourglassHalf />
                              Pending Approval
                            </span>
                          </div>

                          {renderAssignedItems(task)}
                          {renderTeamMembers(task)}

                          <div className="bg-orange-50 rounded-xl p-4 mt-3">
                            <p className="text-xs font-semibold text-orange-800 mb-1">
                              Your Rejection Reason:
                            </p>
                            <p className="text-sm text-gray-700">
                              {rejection.reason || '-'}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              Waiting for admin to approve your rejection
                              request
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* Active Tasks */}
            {acceptedTasks.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Active Tasks
                  </h2>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {acceptedTasks.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {acceptedTasks.map((task) => {
                    const roles = getUserRoles(task);

                    return (
                      <div
                        key={task.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 sm:p-6 border border-blue-100"
                      >
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                          {task.title || 'Task'}
                        </h3>
                        {task.date && (
                          <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3">
                            <FaCalendarAlt />
                            {new Date(task.date).toLocaleDateString()}
                          </p>
                        )}
                        {task.description && (
                          <p className="text-gray-700 text-sm mb-2">
                            {task.description}
                          </p>
                        )}

                        {renderAssignedItems(task)}
                        {renderTeamMembers(task)}

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mt-3">
                          <p className="text-sm font-semibold text-gray-700 mb-3">
                            Your Work Types:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {roles.map((role) => {
                              const done = isRoleDone(task, role);
                              return (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() =>
                                    handleToggleRole(task, role)
                                  }
                                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                                    done
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400'
                                  }`}
                                >
                                  {done ? (
                                    <>
                                      <FaUndo />
                                      Undo {role}
                                    </>
                                  ) : (
                                    <>
                                      <FaCheck />
                                      Mark {role} as done
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
            {completedTasks.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Completed
                  </h2>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {completedTasks.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {completedTasks.map((task) => {
                    const roles = getUserRoles(task);

                    return (
                      <div
                        key={task.id}
                        className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-green-100"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                              {task.title || 'Task'}
                            </h3>
                            {task.date && (
                              <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                <FaCalendarAlt />
                                {new Date(task.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <FaCheckCircle className="text-3xl text-green-500" />
                        </div>

                        {task.description && (
                          <p className="text-gray-700 text-sm mb-2">
                            {task.description}
                          </p>
                        )}

                        {renderAssignedItems(task)}
                        {renderTeamMembers(task)}

                        <div className="flex flex-wrap gap-2 mb-3 mt-3">
                          {roles.map((role) => (
                            <button
                              key={role}
                              onClick={() =>
                                handleToggleRole(task, role)
                              }
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 hover:bg-green-200 transition"
                            >
                              <FaUndo className="text-xs" />
                              Undo {role}
                            </button>
                          ))}
                        </div>

                        <p className="text-sm text-green-700 font-semibold bg-green-50 px-4 py-2 rounded-lg">
                          ✓ All work completed. Waiting for admin review.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
