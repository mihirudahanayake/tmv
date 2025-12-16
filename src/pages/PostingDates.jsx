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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PostingDates = () => {
  const [tasks, setTasks] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [filter, setFilter] = useState('');
  const [userDetails, setUserDetails] = useState({}); // userId -> user data
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Load users
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

  // Users + work types (roles)
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

  // selection helpers
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelectionForMissingTasks = () => {
    setSelectedIds((prev) => {
      const ids = new Set(tasks.map((t) => t.id));
      const next = new Set();
      prev.forEach((id) => {
        if (ids.has(id)) next.add(id);
      });
      return next;
    });
  };

  // Ordering
  const sorted = [...tasks].sort((a, b) => {
    const aHasDate = !!a.postingDate;
    const bHasDate = !!b.postingDate;

    const aIsDateNotPosted = aHasDate && !a.posted;
    const bIsDateNotPosted = bHasDate && !b.posted;

    if (aIsDateNotPosted && !bIsDateNotPosted) return -1;
    if (!aIsDateNotPosted && bIsDateNotPosted) return 1;

    const aNoDate = !aHasDate;
    const bNoDate = !bHasDate;

    if (aNoDate && !bNoDate) return -1;
    if (!aNoDate && bNoDate) return 1;

    if (aHasDate && bHasDate) {
      return a.postingDate.getTime() - b.postingDate.getTime();
    }

    return 0;
  });

  const filtered = sorted.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase())
  );

const formatDate = (d) => {
  if (!d) return 'Not set';
  const day = String(d.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};


  const selectedTasks = filtered.filter((t) => selectedIds.has(t.id));

  const handleDownloadPdf = () => {
    const items = selectedTasks.length ? selectedTasks : filtered;
    if (!items.length) return;

    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Video schedule', 14, 16);

const rows = items.map((task) => {
  const editorsArr = getEditors(task).map((e) =>
    e.rolesText ? `${e.name} [${e.rolesText}]` : e.name
  );

  const editors = editorsArr.length
    ? editorsArr.join('\n')
    : 'No users found';

  return [
    task.title,
    task.description || '',
    formatDate(task.postingDate),
    task.posted ? 'Posted' : 'Not posted',
    editors,
  ];
});


autoTable(doc, {
  startY: 22,
  head: [['Title', 'Description', 'Posting Date', 'Status', 'Member(s)']],
  body: rows,
  styles: { fontSize: 8 },
  headStyles: {
    fillColor: [33, 150, 243],
    halign: 'center',
    valign: 'middle'
  },
  columnStyles: {
    0: { cellWidth: 50 },                  // Title
    1: { cellWidth: 40 },                  // Description
    2: { cellWidth: 23, halign: 'center' },// Posting Date
    3: { cellWidth: 20, halign: 'center' },// Status
    4: { cellWidth: 'auto' }               // Users
  }
});


    doc.save('video-schedule.pdf');
  };

  useEffect(() => {
    clearSelectionForMissingTasks();
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Video schedule
            </h1>
            <p className="text-sm text-gray-600">
              Manage posting dates for videos / tasks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search video"
              className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleDownloadPdf}
              disabled={filtered.length === 0}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {selectedTasks.length
                ? 'Download selected as PDF'
                : 'Download all as PDF'}
            </button>
          </div>
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
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(task.id)}
                        onChange={() => toggleSelect(task.id)}
                        className="h-4 w-4"
                      />
                      <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                        {task.title}
                      </h2>
                    </div>

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
                      <p className="text-xs font-semibold text-gray-600">
                        Users
                      </p>
                      {getEditors(task).length === 0 ? (
                        <p className="text-xs text-gray-500">No users found</p>
                      ) : (
                        <ul className="mt-0.5 space-y-0.5">
                          {getEditors(task).map((e, idx) => (
                            <li key={idx} className="text-xs text-gray-700">
                              {e.rolesText ? `${e.name} [${e.rolesText}]` : e.name}
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
