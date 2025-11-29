import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaUsers, FaSpinner } from 'react-icons/fa';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignedIds, setAssignedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // load all users for assignment
        const usersSnap = await getDocs(collection(db, 'users'));
        const usersData = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setUsers(usersData);

        // load task
        const taskSnap = await getDoc(doc(db, 'works', taskId));
        if (taskSnap.exists()) {
          const data = { id: taskSnap.id, ...taskSnap.data() };
          setTask(data);
          setAssignedIds(data.assignedUsers || []);
        } else {
          setError('Task not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load task.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [taskId]);

  const handleToggleUser = (uid) => {
    if (!editing) return;
    setAssignedIds(prev =>
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    );
  };

  const handleFieldChange = (e) => {
    if (!editing) return;
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!task) return;
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { id, ...rest } = task;
      await updateDoc(doc(db, 'works', task.id), {
        ...rest,
        assignedUsers: assignedIds
      });
      setSuccess('Task updated successfully.');
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update task.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <div className="flex flex-col justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Loading task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
          <p className="text-gray-600 mb-4">{error || 'Task not found.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Back
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Task details
          </h1>
          <div className="flex gap-2">
            {!editing ? (
              <button
                onClick={() => {
                  setEditing(true);
                  setError('');
                  setSuccess('');
                }}
                className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setSuccess('');
                    setError('');
                  }}
                  className="px-3 py-1 rounded bg-gray-300 text-gray-800 text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 p-2 rounded bg-green-100 text-green-700 text-sm">
            {success}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title || ''}
              onChange={handleFieldChange}
              disabled={!editing}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={task.description || ''}
              onChange={handleFieldChange}
              disabled={!editing}
              rows={3}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date
              </label>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <input
                  type="date"
                  name="date"
                  value={
                    task.date
                      ? new Date(task.date).toISOString().slice(0, 10)
                      : ''
                  }
                  onChange={handleFieldChange}
                  disabled={!editing}
                  className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority || 'medium'}
                onChange={handleFieldChange}
                disabled={!editing}
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Assigned users
            </label>
            <div className="bg-white rounded border p-3 max-h-64 overflow-y-auto">
              {users.map((u) => (
                <label
                  key={u.id}
                  className="flex items-center justify-between text-sm py-1"
                >
                  <span>
                    {u.name || 'No name'}{' '}
                    <span className="text-xs text-gray-500">
                      ({u.cardNumber || '-'})
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={assignedIds.includes(u.id)}
                    onChange={() => handleToggleUser(u.id)}
                    disabled={!editing}
                  />
                </label>
              ))}
              {users.length === 0 && (
                <p className="text-xs text-gray-500">No users found.</p>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TaskDetails;
