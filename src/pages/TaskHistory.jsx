import { useEffect, useMemo, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { useUserProfile } from '../hooks/useUserProfile';
import { getDefaultRolesForDepartment, normalizeRolesForDepartment } from '../constants/workRoles';
import { isUserTO } from '../utils/authz';

const TaskHistory = () => {
  const { user, profile, loading: loadingProfile } = useUserProfile();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [rejectedTasks, setRejectedTasks] = useState([]);
  const [missedTasks, setMissedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const getTaskUserId = (task) => task?.__viewerUserId || user?.uid;

  const toEnabled = isUserTO(profile);

  const headerUserType = useMemo(() => {
    const role = profile?.role;
    if (role === 'superAdmin') return 'superAdmin';
    if (role === 'siteAdmin') return 'siteAdmin';
    if (role === 'departmentHead') return 'admin';
    return 'user';
  }, [profile]);

  useEffect(() => {
    if (loadingProfile) return;
    if (!user?.uid) {
      setCompletedTasks([]);
      setRejectedTasks([]);
      setMissedTasks([]);
      setLoading(false);
      setError('');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        await user.getIdToken(true);
        const getUserTaskHistory = httpsCallable(functions, 'getUserTaskHistory');
        const result = await getUserTaskHistory();
        if (!Array.isArray(result.data?.tasks) || !Array.isArray(result.data?.rejectedTasks)) {
          throw new Error('Invalid task history response from the server.');
        }
        const allAssigned = result.data.tasks;
        const missed = allAssigned
          .filter((task) => (task?.workAttendance?.[getTaskUserId(task)]?.status || '') === 'missed')
          .sort((a, b) => {
            const ma = a?.workAttendance?.[getTaskUserId(a)]?.markedAt;
            const mb = b?.workAttendance?.[getTaskUserId(b)]?.markedAt;
            const ta = typeof ma?.toDate === 'function' ? ma.toDate().getTime() : new Date(ma || 0).getTime();
            const tb = typeof mb?.toDate === 'function' ? mb.toDate().getTime() : new Date(mb || 0).getTime();
            return tb - ta;
          });
        setMissedTasks(missed);

        const completed = allAssigned.filter((task) => {
          const taskUserId = getTaskUserId(task);
          if (task?.workAttendance?.[taskUserId]?.status === 'missed') return false;
          if ((task.status || '').toLowerCase() === 'complete') return true;
          if (task.userAcceptance?.[taskUserId] !== 'accepted') return false;

          const assignedUser = (task.assignedUserDetails || []).find(
            (detail) => detail.userId === taskUserId
          );
          const departmentRoles = getDefaultRolesForDepartment(task.department);
          const roles = normalizeRolesForDepartment(
            task.department,
            assignedUser?.roles?.length ? assignedUser.roles : departmentRoles
          );
          return roles.every((role) => task.roleCompletion?.[`${taskUserId}_${role}`] === 'done');
        });

        completed.sort((a, b) => {
          const dateA = a.date || a.createdAt?.toDate?.() || a.createdAt || 0;
          const dateB = b.date || b.createdAt?.toDate?.() || b.createdAt || 0;
          const da = new Date(dateA).getTime();
          const dbt = new Date(dateB).getTime();
          return dbt - da;
        });

        setCompletedTasks(completed);

        const rejected = result.data.rejectedTasks;

        rejected.sort((a, b) => {
          const da = a.approvedAt ? new Date(a.approvedAt).getTime() : 0;
          const dbt = b.approvedAt ? new Date(b.approvedAt).getTime() : 0;
          return dbt - da;
        });

        setRejectedTasks(rejected);
      } catch (err) {
        console.error('Error loading task history:', err);
        setError('Could not load your work history. Please refresh and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, loadingProfile]);

  const getUserRoles = (task) => {
    if (!user) return [];
    const details = task.assignedUserDetails || [];
    const mine = details.find((d) => d.userId === getTaskUserId(task));
    return mine?.roles || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header userType={headerUserType} isTO={toEnabled} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Task History
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            View all your completed, rejected, and missed tasks
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-5xl text-blue-600 mb-4" />
            <p className="text-gray-600">Loading history...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        ) : completedTasks.length === 0 && rejectedTasks.length === 0 && missedTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No History</h3>
            <p className="text-gray-600">You have no completed, rejected, or missed tasks yet.</p>
          </div>
        ) : (
          <>
            {/* Missed Tasks */}
            {missedTasks.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-slate-700 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Missed Tasks
                  </h2>
                  <span className="bg-gradient-to-r from-slate-500 to-slate-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {missedTasks.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {missedTasks.map((task) => {
                    const markedAt = task?.workAttendance?.[getTaskUserId(task)]?.markedAt;
                    const markedAtDate =
                      typeof markedAt?.toDate === 'function'
                        ? markedAt.toDate()
                        : markedAt
                          ? new Date(markedAt)
                          : null;

                    return (
                      <div
                        key={task.id}
                        className="bg-white rounded-2xl shadow-md p-5 border border-slate-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                              {task.title || 'Task'}
                            </h3>
                            {(task.date || task.deadline) && (
                              <p className="flex items-center gap-2 text-xs text-gray-500">
                                <FaCalendarAlt />
                                {new Date(task.date || task.deadline).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <FaTimes className="text-2xl" />
                            <span className="text-xs font-semibold">Missed</span>
                          </div>
                        </div>

                        {task.description && (
                          <p className="text-gray-700 text-sm mb-3">
                            {task.description}
                          </p>
                        )}

                        {markedAtDate && (
                          <p className="text-xs text-gray-500">
                            Marked missed: {markedAtDate.toLocaleString()}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

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