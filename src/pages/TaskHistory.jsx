import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const TaskHistory = () => {
  const [user, setUser] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [rejectedTasks, setRejectedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch completed works
        const worksSnap = await getDocs(collection(db, 'works'));
        const allTasks = worksSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const completed = allTasks.filter(
          (t) =>
            t.status === 'complete' &&
            Array.isArray(t.assignedUsers) &&
            t.assignedUsers.includes(user.uid)
        );

        completed.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const dbt = b.date ? new Date(b.date).getTime() : 0;
          return dbt - da;
        });

        setCompletedTasks(completed);

        // Fetch rejected works
        const rejectedSnap = await getDocs(
          query(collection(db, 'rejectedWorks'), where('userId', '==', user.uid))
        );
        const rejected = rejectedSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        rejected.sort((a, b) => {
          const da = a.approvedAt ? new Date(a.approvedAt).getTime() : 0;
          const dbt = b.approvedAt ? new Date(b.approvedAt).getTime() : 0;
          return dbt - da;
        });

        setRejectedTasks(rejected);
      } catch (err) {
        console.error('Error loading task history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getUserRoles = (task) => {
    if (!user) return [];
    const details = task.assignedUserDetails || [];
    const mine = details.find((d) => d.userId === user.uid);
    return mine?.roles || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header userType="user" />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Task History
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            View all your completed and rejected tasks
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-5xl text-blue-600 mb-4" />
            <p className="text-gray-600">Loading history...</p>
          </div>
        ) : completedTasks.length === 0 && rejectedTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No History</h3>
            <p className="text-gray-600">You have no completed or rejected tasks yet.</p>
          </div>
        ) : (
          <>
            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Completed Tasks
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
                        className="bg-white rounded-2xl shadow-md p-5 border border-green-100"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                              {task.title || 'Task'}
                            </h3>
                            {task.date && (
                              <p className="flex items-center gap-2 text-xs text-gray-500">
                                <FaCalendarAlt />
                                {new Date(task.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-green-600">
                            <FaCheck className="text-2xl" />
                            <span className="text-xs font-semibold">Completed</span>
                          </div>
                        </div>

                        {task.description && (
                          <p className="text-gray-700 text-sm mb-3">
                            {task.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {roles.map((role) => (
                            <span
                              key={role}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Rejected Tasks */}
            {rejectedTasks.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Rejected Tasks
                  </h2>
                  <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {rejectedTasks.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {rejectedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-2xl shadow-md p-5 border border-red-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {task.title || 'Task'}
                          </h3>
                          {task.date && (
                            <p className="flex items-center gap-2 text-xs text-gray-500">
                              <FaCalendarAlt />
                              {new Date(task.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-red-600">
                          <FaTimes className="text-2xl" />
                          <span className="text-xs font-semibold">You Rejected</span>
                        </div>
                      </div>

                      {task.description && (
                        <p className="text-gray-700 text-sm mb-3">
                          {task.description}
                        </p>
                      )}

                      <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                        <div className="flex items-start gap-2 mb-2">
                          <FaExclamationTriangle className="text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-800 mb-1">
                              Rejection Reason:
                            </p>
                            <p className="text-sm text-gray-700">
                              {task.rejectionReason || '-'}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 flex flex-col gap-1">
                          <p>Rejected: {new Date(task.rejectedAt).toLocaleString()}</p>
                          <p>Approved: {new Date(task.approvedAt).toLocaleString()}</p>
                        </div>
                      </div>
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

export default TaskHistory;
