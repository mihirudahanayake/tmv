import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaCheck } from 'react-icons/fa';

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [toast, setToast] = useState('');

  const userType = 'user';

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  // load tasks for user
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
      } catch (err) {
        console.error('Error loading user tasks:', err);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadTasks();
  }, [user]);

  // toast helper
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // real-time notification when new task assigned
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
          showToast(`New task assigned: ${data.title || 'Task'}`);
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
        }
      });
    });

    return () => unsub();
  }, [user]);

  const statusOf = (task) => task.status || 'incomplete';

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

    try {
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

  const visibleTasks = tasks.filter((t) => statusOf(t) !== 'complete');
  const currentTasks = visibleTasks.filter((t) => !allRolesDone(t));
  const doneTasks = visibleTasks.filter((t) => allRolesDone(t));

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={userType} />

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white text-xs sm:text-sm px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Welcome
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Here are your tasks. Mark each work type as done when you finish. You can undo until admin marks the task as complete.
        </p>

        {loadingUser || loadingTasks ? (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin text-xl text-blue-600" />
            <span>Loading tasks...</span>
          </div>
        ) : visibleTasks.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base">
            You do not have any active tasks.
          </p>
        ) : (
          <>
            {currentTasks.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Current tasks
                </h2>
                <div className="space-y-3">
                  {currentTasks.map((task) => {
                    const roles = getUserRoles(task);

                    return (
                      <div
                        key={task.id}
                        className="bg-white rounded-lg shadow p-4 sm:p-5"
                      >
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">
                          {task.title || 'Task'}
                        </h3>
                        {task.date && (
                          <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                            <FaCalendarAlt />
                            <span>
                              {new Date(task.date).toLocaleDateString()}
                            </span>
                          </p>
                        )}
                        {task.description && (
                          <p className="text-gray-700 text-xs sm:text-sm mt-2">
                            {task.description}
                          </p>
                        )}

                        <div className="mt-3">
                          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                            Your work types:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {roles.map((role) => {
                              const done = isRoleDone(task, role);
                              return (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => handleToggleRole(task, role)}
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs sm:text-sm font-semibold transition ${
                                    done
                                      ? 'bg-green-600 text-white hover:bg-green-700'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {done && <FaCheck />}
                                  {role}
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

            {doneTasks.length > 0 && (
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Done tasks (waiting for admin)
                </h2>
                <div className="space-y-3">
                  {doneTasks.map((task) => {
                    const roles = getUserRoles(task);

                    return (
                      <div
                        key={task.id}
                        className="bg-white rounded-lg shadow p-4 sm:p-5"
                      >
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">
                          {task.title || 'Task'}
                        </h3>
                        {task.date && (
                          <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                            <FaCalendarAlt />
                            <span>
                              {new Date(task.date).toLocaleDateString()}
                            </span>
                          </p>
                        )}
                        {task.description && (
                          <p className="text-gray-700 text-xs sm:text-sm mt-2">
                            {task.description}
                          </p>
                        )}

                        <div className="mt-3">
                          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                            Your work types:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {roles.map((role) => {
                              const done = isRoleDone(task, role);
                              return (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => handleToggleRole(task, role)}
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs sm:text-sm font-semibold transition ${
                                    done
                                      ? 'bg-green-600 text-white hover:bg-green-700'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {done && <FaCheck />}
                                  {role}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <p className="mt-3 text-xs sm:text-sm text-green-700 font-semibold">
                          All your work types are marked as done. Waiting for admin to complete.
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
