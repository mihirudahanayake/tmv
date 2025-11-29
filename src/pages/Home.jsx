import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner } from 'react-icons/fa';

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);

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

        // only tasks assigned to this user
        const mine = all.filter(
          (t) =>
            Array.isArray(t.assignedUsers) &&
            t.assignedUsers.includes(user.uid)
        );

        // newest date first
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

  const statusOf = (task) => task.status || 'incomplete';

  const handleToggleDone = async (task) => {
    const currentStatus = statusOf(task);

    // do nothing if admin already marked complete
    if (currentStatus === 'complete') return;

    const nextStatus = currentStatus === 'done' ? 'incomplete' : 'done';

    try {
      const ref = doc(db, 'works', task.id);
      await updateDoc(ref, { status: nextStatus });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: nextStatus } : t
        )
      );
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const userType = 'user';

  // user should not see tasks that admin has fully completed
  const visibleTasks = tasks.filter((t) => statusOf(t) !== 'complete');
  const currentTasks = visibleTasks.filter((t) => statusOf(t) !== 'done');
  const doneTasks = visibleTasks.filter((t) => statusOf(t) === 'done');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={userType} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Welcome
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Here are your tasks. Mark them as done when you finish. You can undo until admin marks them as complete.
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
                  {currentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div>
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
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleDone(task)}
                        className="self-start sm:self-auto px-3 py-1.5 rounded bg-green-600 text-white text-xs sm:text-sm font-semibold hover:bg-green-700"
                      >
                        Mark as done
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {doneTasks.length > 0 && (
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Done tasks (waiting for admin)
                </h2>
                <div className="space-y-3">
                  {doneTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div>
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
                        <p className="mt-2 text-xs sm:text-sm text-green-700 font-semibold">
                          Marked as done. Admin has not completed it yet.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleDone(task)}
                        className="self-start sm:self-auto px-3 py-1.5 rounded bg-gray-300 text-gray-800 text-xs sm:text-sm font-semibold hover:bg-gray-400"
                      >
                        Undo done
                      </button>
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

export default Home;
