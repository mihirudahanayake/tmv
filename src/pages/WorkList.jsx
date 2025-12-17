import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import {
  FaCalendarAlt,
  FaUsers,
  FaSpinner,
  FaSearch,
  FaCheck,
  FaBox,
  FaHourglassHalf,
  FaTimes
} from 'react-icons/fa';
import Header from '../components/Header';

const WorkList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('accepted'); // NEW: default accepted

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

      const itemsSnapshot = await getDocs(collection(db, 'inventory'));
      const itemsMap = {};
      itemsSnapshot.docs.forEach((d) => {
        itemsMap[d.id] = d.data();
      });
      setItems(itemsMap);

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
    if ((task.status || '').toLowerCase() === 'complete') {
      return 'completed';
    }

    const userDetails = task.assignedUserDetails || [];
    const roleCompletion = task.roleCompletion || {};
    const acceptance = task.userAcceptance || {};

    if (!userDetails.length) return 'pending';

    const allAccepted = userDetails.every(
      (d) => acceptance[d.userId] === 'accepted'
    );
    if (!allAccepted) return 'pending';

    const allRolesDone = userDetails.every((d) =>
      (d.roles || []).every(
        (role) => roleCompletion[`${d.userId}_${role}`] === 'done'
      )
    );

    if (!allRolesDone) return 'accepted';
    return 'done';
  };

  const filteredAndSorted = tasks
    .filter((task) => {
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

  const renderAcceptanceBadge = (task, userId) => {
    const acceptance = task.userAcceptance || {};
    const state = acceptance[userId] || 'pending';

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
            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
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
      <span>
        Date:{' '}
        {new Date(task.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}
      </span>
    </div>
  </div>
)}


        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
              <FaUsers />
              <span>Assigned to:</span>
            </div>
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
      className="bg-gray-50 px-2 py-1 rounded text-xs sm:text-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="font-semibold text-gray-800">
            {userName}
          </p>
        </div>
        {renderAcceptanceBadge(task, userId)}
      </div>
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

{userDetailsLocal.length === 0 &&
  task.assignedUsers?.map((userId) => {
    const userData = users[userId] || {};
    const userName = userData.name || 'Unknown';
    const avatarUrl = userData.photoURL || userData.avatarUrl || null;

    return (
      <div
        key={userId}
        className="bg-gray-50 px-2 py-1 rounded text-xs sm:text-sm flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-gray-700">
            {userName}
          </span>
        </div>
        {renderAcceptanceBadge(task, userId)}
      </div>
    );
  })}

          </div>
        </div>

        {assignedItems.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <FaBox />
              <span>Items:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {assignedItems.map((itemId) => {
                const item = items[itemId];
                return (
                  <span
                    key={itemId}
                    className="bg-blue-50 px-2 py-1 rounded text-xs sm:text-sm text-blue-800"
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
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2 py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="accepted">Accepted</option>
                <option value="pending">Pending</option>
                <option value="done">Done</option>
                <option value="completed">Completed</option>
                <option value="all">All status</option>
              </select>
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
