import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner } from 'react-icons/fa';

const TaskHistory = () => {
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

        const mine = all.filter(
          (t) =>
            Array.isArray(t.assignedUsers) &&
            t.assignedUsers.includes(user.uid)
        );

        // sort by date DESC (newest first)
        mine.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const dbt = b.date ? new Date(b.date).getTime() : 0;
          return dbt - da;
        });

        setTasks(mine);
      } catch (err) {
        console.error('Error loading task history:', err);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadTasks();
  }, [user]);

  const statusOf = (t) => t.status || 'incomplete';
  const userType = 'user';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={userType} />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Task history
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          All tasks assigned to you, sorted by date (newest first).
        </p>

        {loadingUser || loadingTasks ? (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin text-xl text-blue-600" />
            <span>Loading task history...</span>
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base">
            No tasks found in your history.
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow p-4 sm:p-5"
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {task.title || 'Task'}
                  </h2>
                  <span className="text-xs sm:text-sm capitalize text-gray-600">
                    {statusOf(task)}
                  </span>
                </div>

                {task.date && (
                  <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-1">
                    <FaCalendarAlt />
                    <span>{new Date(task.date).toLocaleDateString()}</span>
                  </p>
                )}

                {task.description && (
                  <p className="text-gray-700 text-xs sm:text-sm mt-1">
                    {task.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskHistory;
