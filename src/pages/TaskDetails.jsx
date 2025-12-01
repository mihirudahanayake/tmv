import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaTrash, FaBox, FaSearch } from 'react-icons/fa';

const WORK_ROLES = ['videography', 'editing'];

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [assignedUserDetails, setAssignedUserDetails] = useState([]);
  const [assignedItems, setAssignedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [itemSearch, setItemSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const usersData = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(usersData);

        const itemsSnap = await getDocs(collection(db, 'inventory'));
        const itemsData = itemsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        itemsData.sort((a, b) => {
          const nameA = (a.itemName || '').toLowerCase();
          const nameB = (b.itemName || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setItems(itemsData);

        const taskSnap = await getDoc(doc(db, 'works', taskId));
        if (taskSnap.exists()) {
          const data = { id: taskSnap.id, ...taskSnap.data() };
          setTask(data);
          setAssignedUserDetails(data.assignedUserDetails || []);
          setAssignedItems(data.assignedItems || []);
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
    const exists = assignedUserDetails.find((u) => u.userId === uid);
    if (exists) {
      setAssignedUserDetails((prev) => prev.filter((u) => u.userId !== uid));
    } else {
      setAssignedUserDetails((prev) => [
        ...prev,
        { userId: uid, roles: ['videography'] }
      ]);
    }
  };

  const handleToggleRole = (uid, role) => {
    if (!editing) return;
    setAssignedUserDetails((prev) =>
      prev.map((item) => {
        if (item.userId !== uid) return item;
        const hasRole = item.roles.includes(role);
        const roles = hasRole
          ? item.roles.filter((r) => r !== role)
          : [...item.roles, role];
        return { ...item, roles: roles.length ? roles : [role] };
      })
    );
  };

  const handleToggleItem = (itemId) => {
    if (!editing) return;
    setAssignedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleFieldChange = (e) => {
    if (!editing) return;
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
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
        assignedUsers: assignedUserDetails.map((u) => u.userId),
        assignedUserDetails,
        assignedItems
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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setDeleting(true);
    setError('');
    setSuccess('');

    try {
      await deleteDoc(doc(db, 'works', taskId));
      setSuccess('Task deleted successfully.');
      setTimeout(() => navigate('/work-list'), 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to delete task.');
    } finally {
      setDeleting(false);
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

  const isUserAssigned = (uid) =>
    assignedUserDetails.some((u) => u.userId === uid);
  const getUserRoles = (uid) =>
    assignedUserDetails.find((u) => u.userId === uid)?.roles || [];

  const normalizedItemSearch = itemSearch.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    if (!normalizedItemSearch) return true;
    const name = (item.itemName || '').toLowerCase();
    const no = (item.itemNo || '').toLowerCase();
    return name.includes(normalizedItemSearch) || no.includes(normalizedItemSearch);
  });

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
              <>
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
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50 inline-flex items-center gap-1"
                >
                  <FaTrash />
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
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
                    setAssignedUserDetails(task.assignedUserDetails || []);
                    setAssignedItems(task.assignedItems || []);
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

        <form className="space-y-4" onSubmit={handleSave}>
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
              Assigned users and work types
            </label>
            <div className="bg-white rounded border p-3 max-h-80 overflow-y-auto">
              {users.map((u) => {
                const assigned = isUserAssigned(u.id);
                const roles = getUserRoles(u.id);

                return (
                  <div key={u.id} className="mb-2 p-2 rounded hover:bg-gray-50">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={assigned}
                        onChange={() => handleToggleUser(u.id)}
                        disabled={!editing}
                        className="mr-3 w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="text-sm">
                          {u.name || 'No name'}{' '}
                          <span className="text-xs text-gray-500">
                            ({u.cardNumber || '-'})
                          </span>
                        </p>
                      </div>
                    </label>

                    {assigned && (
                      <div className="mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm">
                        {WORK_ROLES.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => handleToggleRole(u.id, role)}
                            disabled={!editing}
                            className={`px-2 py-1 rounded border ${
                              roles.includes(role)
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-gray-700 border-gray-300'
                            } ${!editing ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {users.length === 0 && (
                <p className="text-xs text-gray-500">No users found.</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaBox className="inline mr-2" />
              Assigned inventory items
            </label>

            {editing && (
              <div className="relative mb-2">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by item name or number..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="bg-white rounded border p-3 max-h-60 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <p className="text-xs text-gray-500">No items available.</p>
              ) : (
                filteredItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={assignedItems.includes(item.id)}
                      onChange={() => handleToggleItem(item.id)}
                      disabled={!editing}
                      className="mr-3 w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        {item.itemName}{' '}
                        <span className="text-xs text-gray-500">
                          ({item.itemNo})
                        </span>
                      </p>
                      {item.details && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </label>
                ))
              )}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Selected: {assignedItems.length} item(s)
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TaskDetails;
