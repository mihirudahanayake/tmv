import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { FaCalendarAlt, FaUsers, FaSpinner, FaSearch, FaCheck } from 'react-icons/fa';
import Header from '../components/Header';

const WorkList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersMap = {};
      usersSnapshot.docs.forEach((d) => {
        usersMap[d.id] = d.data();
      });
      setUsers(usersMap);

      const worksSnapshot = await getDocs(collection(db, 'works'));
      const worksData = worksSnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));
      setTasks(worksData);
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

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredAndSorted = tasks
    .filter((task) => {
      if (startDate || endDate) {
        if (!task.date) return false;
        const d = new Date(task.date);
        const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 10);
        if (startDate && iso < startDate) return false;
        if (endDate && iso > endDate) return false;
      }

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
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const dbt = b.date ? new Date(b.date).getTime() : 0;
      return dbt - da;
    });

  const incompleteTasks = filteredAndSorted.filter(
    (t) => (t.status || 'incomplete') !== 'complete'
  );
  const completeTasks = filteredAndSorted.filter(
    (t) => (t.status || 'incomplete') === 'complete'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <div className="flex flex-col justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      incomplete: 'bg-gray-100 text-gray-800',
      done: 'bg-yellow-100 text-yellow-800',
      complete: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors.incomplete;
  };

  const renderTaskCard = (task, isCompleteSection = false) => {
    const status = task.status || 'incomplete';
    const userDetails = task.assignedUserDetails || [];
    // roleCompletion: { userId_role: 'done' }
    const roleCompletion = task.roleCompletion || {};

    return (
      <div
        key={task.id}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition cursor-pointer"
        onClick={() => navigate(`/tasks/${task.id}`)}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {task.title || 'Task'}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 capitalize">
              Priority: {task.priority || 'medium'}
            </p>
          </div>
          <span
            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>

        {task.description && (
          <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
            {task.description}
          </p>
        )}

        {task.date && (
          <div className="mb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <FaCalendarAlt />
              <span>Date: {new Date(task.date).toLocaleDateString()}</span>
            </div>
          </div>
        )}

        <div className="mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <FaUsers />
            <span>Assigned to:</span>
          </div>
          <div className="space-y-2">
            {userDetails.map((detail) => {
              const userId = detail.userId;
              const roles = detail.roles || [];
              const userName = users[userId]?.name || 'Unknown';

              return (
                <div
                  key={userId}
                  className="bg-gray-50 px-2 py-1 rounded text-xs sm:text-sm"
                >
                  <p className="font-semibold text-gray-800">{userName}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {roles.map((role) => {
                      const key = `${userId}_${role}`;
                      const isDone = roleCompletion[key] === 'done';
                      return (
                        <span
                          key={role}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                            isDone
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {isDone && <FaCheck className="text-xs" />}
                          {role}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {userDetails.length === 0 &&
              task.assignedUsers?.map((userId) => (
                <span
                  key={userId}
                  className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm text-gray-700"
                >
                  {users[userId]?.name || 'Unknown'}
                </span>
              ))}
          </div>
        </div>

        {!isCompleteSection && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleMarkComplete(task.id);
            }}
            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-600 text-white text-xs sm:text-sm hover:bg-green-700"
          >
            <FaCheck />
            Mark as complete
          </button>
        )}

        {isCompleteSection && (
          <p className="mt-2 text-xs sm:text-sm text-green-700 font-semibold">
            Completed
          </p>
        )}
      </div>
    );
  };

  const hasAnyTasks = incompleteTasks.length > 0 || completeTasks.length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            All Tasks
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 min-w-0">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search title, user name, or card..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2 w-full sm:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Start date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="End date"
              />
            </div>
          </div>
        </div>

        {!hasAnyTasks ? (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              No tasks match your filters.
            </p>
          </div>
        ) : (
          <>
            {incompleteTasks.length > 0 && (
              <section className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Incomplete / waiting for admin
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {incompleteTasks.map((task) => renderTaskCard(task, false))}
                </div>
              </section>
            )}

            {completeTasks.length > 0 && (
              <section>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Completed tasks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {completeTasks.map((task) => renderTaskCard(task, true))}
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
