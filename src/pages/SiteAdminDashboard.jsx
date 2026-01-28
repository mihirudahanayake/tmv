import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import Header from '../components/Header';
import { db } from '../firebase/config';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';
import { Roles } from '../utils/authz';

const ROLE_OPTIONS = [
  { value: Roles.MEMBER, label: 'Member' },
  { value: Roles.DEPARTMENT_HEAD, label: 'Department Head' },
  { value: Roles.SUPER_ADMIN, label: 'Super Admin (read-only)' },
];

const uniq = (arr) => Array.from(new Set((arr || []).filter(Boolean)));

const SiteAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingUserId, setSavingUserId] = useState(null);
  const [error, setError] = useState('');
  const [queryText, setQueryText] = useState('');

  // edits[userId] = { role, departments, managedDepartments }
  const [edits, setEdits] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const snap = await getDocs(collection(db, 'users'));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        setUsers(list);

        const initial = {};
        list.forEach((u) => {
          initial[u.id] = {
            role: u.role || (u.userType === 'admin' ? Roles.DEPARTMENT_HEAD : u.userType === 'superAdmin' ? Roles.SUPER_ADMIN : Roles.MEMBER),
            departments: Array.isArray(u.departments) ? uniq(u.departments) : [],
            managedDepartments: Array.isArray(u.managedDepartments) ? uniq(u.managedDepartments) : [],
          };
        });
        setEdits(initial);
      } catch (e) {
        console.error(e);
        setError('Failed to load users. Check Firestore rules for site admin.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const name = (u.name || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      const reg = (u.registrationNumber || '').toLowerCase();
      return name.includes(q) || email.includes(q) || reg.includes(q);
    });
  }, [users, queryText]);

  const setEdit = (userId, patch) => {
    setEdits((prev) => ({
      ...prev,
      [userId]: { ...(prev[userId] || {}), ...patch },
    }));
  };

  const toggleDept = (userId, field, dept) => {
    const cur = edits[userId]?.[field] || [];
    const next = cur.includes(dept) ? cur.filter((d) => d !== dept) : [...cur, dept];
    setEdit(userId, { [field]: uniq(next) });
  };

  const handleSave = async (userId) => {
    const edit = edits[userId];
    if (!edit) return;

    setSavingUserId(userId);
    setError('');

    try {
      const role = edit.role;
      const departments = uniq(edit.departments);
      const managedDepartments = uniq(edit.managedDepartments).filter((d) => departments.includes(d));

      // Keep legacy userType in sync because some pages still check it.
      const userType = role === Roles.DEPARTMENT_HEAD ? 'admin'
        : role === Roles.SUPER_ADMIN ? 'superAdmin'
          : 'user';

      await updateDoc(doc(db, 'users', userId), {
        role,
        userType,
        departments,
        managedDepartments: role === Roles.DEPARTMENT_HEAD ? managedDepartments : [],
      });

      setUsers((prev) => prev.map((u) => (u.id === userId
        ? { ...u, role, userType, departments, managedDepartments: role === Roles.DEPARTMENT_HEAD ? managedDepartments : [] }
        : u)));
    } catch (e) {
      console.error(e);
      setError('Failed to save changes.');
    } finally {
      setSavingUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="siteAdmin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Site Admin</h1>
        <p className="text-sm text-gray-600 mb-6">
          Manage Department Heads and Super Admins. Department Heads can only manage their own departments. Super Admins are read-only.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Search users</label>
          <input
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Search by name, email, registration number"
            className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">User</th>
                <th className="text-left p-3 font-semibold text-gray-700">Role</th>
                <th className="text-left p-3 font-semibold text-gray-700">Departments</th>
                <th className="text-left p-3 font-semibold text-gray-700">Managed Departments</th>
                <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-4" colSpan={5}>Loading…</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td className="p-4" colSpan={5}>No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const edit = edits[u.id] || { role: Roles.MEMBER, departments: [], managedDepartments: [] };
                  const isSaving = savingUserId === u.id;

                  return (
                    <tr key={u.id} className="border-t">
                      <td className="p-3">
                        <div className="font-semibold text-gray-900">{u.name || 'Unnamed'}</div>
                        <div className="text-xs text-gray-600">{u.email || u.id}</div>
                        {u.registrationNumber && (
                          <div className="text-xs text-gray-500">Reg: {u.registrationNumber}</div>
                        )}
                      </td>

                      <td className="p-3">
                        <select
                          value={edit.role}
                          onChange={(e) => setEdit(u.id, { role: e.target.value })}
                          className="border rounded px-2 py-1"
                        >
                          {ROLE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <div className="text-xs text-gray-500 mt-1">Legacy: {u.userType || 'user'}</div>
                      </td>

                      <td className="p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {WORK_DEPARTMENTS.map((dept) => (
                            <label key={dept} className="flex items-center gap-2 text-xs">
                              <input
                                type="checkbox"
                                checked={edit.departments.includes(dept)}
                                onChange={() => toggleDept(u.id, 'departments', dept)}
                              />
                              <span>{formatWorkDepartmentLabel(dept)}</span>
                            </label>
                          ))}
                        </div>
                      </td>

                      <td className="p-3">
                        {edit.role !== Roles.DEPARTMENT_HEAD ? (
                          <div className="text-xs text-gray-500">Only for Department Heads</div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {WORK_DEPARTMENTS.map((dept) => (
                              <label key={dept} className="flex items-center gap-2 text-xs">
                                <input
                                  type="checkbox"
                                  checked={edit.managedDepartments.includes(dept)}
                                  disabled={!edit.departments.includes(dept)}
                                  onChange={() => toggleDept(u.id, 'managedDepartments', dept)}
                                />
                                <span className={!edit.departments.includes(dept) ? 'text-gray-400' : ''}>
                                  {formatWorkDepartmentLabel(dept)}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => handleSave(u.id)}
                          disabled={isSaving}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 disabled:opacity-50"
                        >
                          {isSaving ? 'Saving…' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SiteAdminDashboard;
