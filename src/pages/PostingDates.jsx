import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';

const PostingDates = () => {
  const [tasks, setTasks] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [filter, setFilter] = useState('');
  const [userDetails, setUserDetails] = useState({}); // userId -> user data

  // Load users for editor names
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const map = {};
        snap.docs.forEach((d) => {
          map[d.id] = d.data();
        });
        setUserDetails(map);
      } catch (e) {
        console.error('Failed to load users', e);
      }
    };
    loadUsers();
  }, []);

  // Load works
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'works'));
        const list = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: data.title || 'Video',
            description: data.description || '',
            workDate: data.date ? new Date(data.date) : null,
            postingDate: data.postingDate ? data.postingDate.toDate() : null,
            posted: !!data.posted,
            assignedUserDetails: data.assignedUserDetails || [],
          };
        });
        setTasks(list);
      } catch (err) {
        console.error('Failed to load works', err);
      }
    };
    load();
  }, []);

  const handleDateChange = (id, value) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, postingDate: value ? new Date(value) : null }
          : t
      )
    );
  };

  const handleTogglePosted = async (task, value) => {
    try {
      setSavingId(task.id);
      const ref = doc(db, 'works', task.id);
      await updateDoc(ref, { posted: value });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, posted: value } : t
        )
      );
    } catch (e) {
      console.error('Failed to update posted flag', e);
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveDate = async (task) => {
    try {
      setSavingId(task.id);
      const ref = doc(db, 'works', task.id);
      await updateDoc(ref, {
        postingDate: task.postingDate
          ? Timestamp.fromDate(task.postingDate)
          : null,
      });
    } catch (e) {
      console.error('Failed to save posting date', e);
    } finally {
      setSavingId(null);
    }
  };

const getEditors = (task) => {
  const details = task.assignedUserDetails || [];
  if (!details.length) return [];

  return details.map((d) => {
    const name = userDetails[d.userId]?.name || 'Unknown';
    const roles = Array.isArray(d.roles) ? d.roles : [];
    const rolesText = roles.length ? roles.join(' & ') : '';
    return { name, rolesText };
  });
};


  // Order:
  // 1) postingDate set & posted === false (nearest date first)
  // 2) postingDate null
  // 3) posted === true (nearest date first)
  const sorted = [...tasks].sort((a, b) => {
    const aHasDate = !!a.postingDate;
    const bHasDate = !!b.postingDate;

    // 1) date set & not posted
    const aIsDateNotPosted = aHasDate && !a.posted;
    const bIsDateNotPosted = bHasDate && !b.posted;

    if (aIsDateNotPosted && !bIsDateNotPosted) return -1;
    if (!aIsDateNotPosted && bIsDateNotPosted) return 1;

    // 2) no date set
    const aNoDate = !aHasDate;
    const bNoDate = !bHasDate;

    if (aNoDate && !bNoDate) return -1;   // a in middle, b in bottom group
    if (!aNoDate && bNoDate) return 1;

    // 3) posted (has date & posted === true) OR same group
    // if both are in same group, sort by postingDate ascending when available
    if (aHasDate && bHasDate) {
      return a.postingDate.getTime() - b.postingDate.getTime();
    }

    // both no date: keep original order
    return 0;
  });

  const filtered = sorted.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase())
  );

  const formatDate = (d) =>
    d ? d.toLocaleDateString() : 'Not set';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Posting Schedule
            </h1>
            <p className="text-sm text-gray-600">
              Manage posting dates for videos / tasks.
            </p>
          </div>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search video"
            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No works found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="max-w-xl">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                      {task.title}
                    </h2>
                    <p className="text-xs text-gray-600">
                      Work date: {formatDate(task.workDate)}
                    </p>

                    {task.description && (
                      <div className="mt-1 bg-gray-50 rounded-md px-3 py-2">
                        <p className="text-xs font-semibold text-gray-600 mb-0.5">
                          Description
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                          {task.description}
                        </p>
                      </div>
                    )}

<div className="mt-1">
  <p className="text-xs font-semibold text-gray-600"></p>
  {getEditors(task).length === 0 ? (
    <p className="text-xs text-gray-500">No editors</p>
  ) : (
    <ul className="mt-0.5 space-y-0.5">
      {getEditors(task).map((e, idx) => (
        <li key={idx} className="text-xs text-gray-700">
          {e.rolesText ? `${e.name} - ${e.rolesText}` : e.name}
        </li>
      ))}
    </ul>
  )}
</div>

                  </div>

                  <div className="text-xs font-semibold">
                    {task.postingDate ? (
                      task.posted ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
                          Posted ({formatDate(task.postingDate)})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Scheduled ({formatDate(task.postingDate)})
                        </span>
                      )
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                        No posting date
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <label className="text-xs text-gray-600">
                      Posting date:
                    </label>
                    <input
                      type="date"
                      value={
                        task.postingDate
                          ? task.postingDate.toISOString().slice(0, 10)
                          : ''
                      }
                      onChange={(e) =>
                        handleDateChange(task.id, e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleSaveDate(task)}
                      disabled={savingId === task.id}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg text-white ${
                        savingId === task.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {savingId === task.id ? 'Saving…' : 'Save date'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePosted(task, !task.posted)}
                      disabled={!task.postingDate || savingId === task.id}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg ${
                        task.posted
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      } ${
                        !task.postingDate || savingId === task.id
                          ? 'opacity-60 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {task.posted ? 'Unmark posted' : 'Mark posted'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PostingDates;
