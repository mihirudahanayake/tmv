import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, functions } from '../firebase/config';
import Header from '../components/Header';
import { FaUser, FaEnvelope, FaSpinner, FaSearch, FaTrash } from 'react-icons/fa';
import { useUserProfile } from '../hooks/useUserProfile';
import { httpsCallable } from 'firebase/functions';
import { canEdit, canManageUser, normalizeRole, Roles } from '../utils/authz';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';

const ManageUsers = () => {
  const { profile, loading: loadingProfile } = useUserProfile();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [workDepartmentFilter, setWorkDepartmentFilter] = useState('all');
  const [studyDepartmentFilter, setStudyDepartmentFilter] = useState('all');
  const [deletingUserId, setDeletingUserId] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const navigate = useNavigate();
  const role = normalizeRole(profile);
  const isDepartmentHead = role === Roles.DEPARTMENT_HEAD;
  const managedDepartments = Array.isArray(profile?.managedDepartments)
    ? profile.managedDepartments
    : [];
  const availableWorkDepartments = isDepartmentHead ? managedDepartments : WORK_DEPARTMENTS;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (loadingProfile || !profile) return;

        const isSuperAdminView = role === Roles.SUPER_ADMIN || role === Roles.SITE_ADMIN;
        if (!isSuperAdminView && !isDepartmentHead) {
          setUsers([]);
          return;
        }

        if (isDepartmentHead && !managedDepartments.length) {
          setUsers([]);
          setActionError('No department is assigned to this department head. Contact a site administrator.');
          return;
        }

        let data;
        if (isDepartmentHead) {
          const getDepartmentUsers = httpsCallable(functions, 'getDepartmentUsers');
          const result = await getDepartmentUsers();
          if (!Array.isArray(result.data?.users)) {
            throw new Error('Invalid department users response from the server.');
          }
          data = result.data.users;
        } else {
          const snap = await getDocs(collection(db, 'users'));
          data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
        data = data.filter((user) => !isDepartmentHead || canManageUser(profile, user));
        setUsers(data);
      } catch (err) {
        console.error('Error loading users:', err);
        setActionError(
          `Failed to load users: ${err?.code || err?.message || 'Check your department access and try again.'}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loadingProfile, profile, role, isDepartmentHead, managedDepartments]);

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredUsers = users.filter((u) => {
    if (batchFilter !== 'all' && (u.batch || '') !== batchFilter) return false;

    if (workDepartmentFilter !== 'all') {
      const departments = Array.isArray(u.departments) ? u.departments : [];
      if (!departments.includes(workDepartmentFilter)) return false;
    }

    if (studyDepartmentFilter !== 'all' && (u.studyDepartment || '') !== studyDepartmentFilter) return false;

    if (!normalizedSearch) return true;
    const name = (u.name || '').toLowerCase();
    const card = (u.cardNumber || '').toLowerCase();

    return name.includes(normalizedSearch) || card.includes(normalizedSearch);
  });

  // Export filtered users to Excel
  const handleExportExcel = () => {
    // Define batch order
    const batchOrder = ['20/21', '21/22', '22/23', '23/24'];
    // Sort users by batch (custom order) then by card number alphabetically
    const sorted = [...filteredUsers].sort((a, b) => {
      const batchA = batchOrder.indexOf(a.batch);
      const batchB = batchOrder.indexOf(b.batch);
      if (batchA !== batchB) return batchA - batchB;
      const regA = (a.registrationNumber || '').toLowerCase();
      const regB = (b.registrationNumber || '').toLowerCase();
      return regA.localeCompare(regB);
    });

    const pad2 = (n) => String(n).padStart(2, '0');

    // Prepare data for Excel (remove userType and email, rename CardNumber to Card)
    const data = sorted.map((u, idx) => ({
      No: pad2(idx + 1),
      Name: u.name || '',
      Card: u.cardNumber || '',
      Batch: u.batch || '',
      RegistrationNumber: u.registrationNumber || '',
      // Add more fields as needed
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users_completed_works.xlsx');
  };

  const canDeleteUsers = canEdit(profile);

  const departmentCounts = Object.entries(
    users.reduce((acc, user) => {
      const dept = user.studyDepartment || 'Unassigned';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {})
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([department, count]) => ({ department, count }));

  const handleDeleteUser = async (userId, userName) => {
    const targetUser = users.find((user) => user.id === userId);
    if (!canDeleteUsers || !targetUser || !canManageUser(profile, targetUser)) return;
    setActionError('');
    setActionSuccess('');

    const ok = window.confirm(
      `Delete user ${userName || ''}?\n\nThis will permanently remove the account.`
    );
    if (!ok) return;

    try {
      setDeletingUserId(userId);
      const fn = httpsCallable(functions, 'deleteUserAccount');
      await fn({ uid: userId });

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setActionSuccess('User deleted successfully.');
    } catch (err) {
      console.error('delete user failed', err);
      const message =
        err?.message ||
        err?.details ||
        'Failed to delete user. Check permissions and try again.';
      setActionError(String(message));
    } finally {
      setDeletingUserId('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <Header userType="admin" />

      <main className="container mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <div className="mb-5 rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-600">Users</p>
              <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Manage users</h1>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]">
              <span className="text-slate-300">User count</span>
              <span className="text-lg font-bold text-white">{users.length}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {departmentCounts.map(({ department, count }, index) => {
              const palette = [
                'from-blue-500 to-cyan-500',
                'from-violet-500 to-purple-500',
                'from-emerald-500 to-teal-500',
                'from-amber-500 to-orange-500',
              ];

              return (
                <div
                  key={department}
                  className={`rounded-2xl border border-white/60 bg-gradient-to-br ${palette[index % palette.length]} p-3 text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]`}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    {department}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{count}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleExportExcel}
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(34,197,94,0.25)] transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              Export to Excel
            </button>
          </div>
        </div>

        {actionError ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            {actionError}
          </div>
        ) : null}
        {actionSuccess ? (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700">
            {actionSuccess}
          </div>
        ) : null}

        <div className="mb-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-inner outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:w-auto lg:min-w-[420px]">
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 shadow-inner outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All batches</option>
                <option value="20/21">20/21</option>
                <option value="21/22">21/22</option>
                <option value="22/23">22/23</option>
                <option value="23/24">23/24</option>
              </select>

              <select
                value={workDepartmentFilter}
                onChange={(e) => setWorkDepartmentFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 shadow-inner outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">{isDepartmentHead ? 'All managed departments' : 'All work departments'}</option>
                {availableWorkDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {formatWorkDepartmentLabel(dept)}
                  </option>
                ))}
              </select>

              <select
                value={studyDepartmentFilter}
                onChange={(e) => setStudyDepartmentFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 shadow-inner outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All study departments</option>
                <option value="ITT">ITT</option>
                <option value="EET">EET</option>
                <option value="MTT">MTT</option>
                <option value="BPT">BPT</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-slate-600 shadow-sm">
            <FaSpinner className="animate-spin text-blue-600" />
            <span>Loading users...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
            No users match your search.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/users/${u.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') navigate(`/users/${u.id}`);
                }}
                className="group w-full rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-[0_12px_26px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_38px_rgba(59,130,246,0.12)] cursor-pointer"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    {u.photoURL ? (
                      <img
                        src={u.photoURL}
                        alt={u.name || 'User'}
                        className="h-12 w-12 rounded-full border border-slate-200 object-cover bg-slate-100"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-lg font-bold text-blue-700">
                        <FaUser />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-slate-800 sm:text-lg">
                        {u.name || 'No name'}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 sm:text-sm">
                        <FaEnvelope className="text-[11px]" />
                        <span className="truncate">{u.email}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                      {u.userType || 'user'}
                    </span>

                    {canDeleteUsers && canManageUser(profile, u) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(u.id, u.name || u.email || '');
                        }}
                        disabled={deletingUserId === u.id}
                        aria-label={
                          deletingUserId === u.id
                            ? 'Deleting user'
                            : `Delete user ${u.name || u.email || ''}`.trim()
                        }
                        className="inline-flex items-center justify-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50"
                        title="Delete user"
                      >
                        <FaTrash />
                        <span className="hidden sm:inline">
                          {deletingUserId === u.id ? 'Deleting...' : 'Delete'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {/* <div className="rounded-xl bg-slate-50 px-2.5 py-2 text-xs text-slate-600">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Card</span>
                    <span className="mt-1 block font-semibold text-slate-700">{u.cardNumber || '-'}</span>
                  </div> */}
                  <div className="rounded-xl bg-slate-50 px-2.5 py-2 text-xs text-slate-600">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Batch</span>
                    <span className="mt-1 block font-semibold text-slate-700">{u.batch || '-'}</span>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-2.5 py-2 text-xs text-slate-600">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Department</span>
                    <span className="mt-1 block font-semibold text-slate-700">{u.studyDepartment || '-'}</span>
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

export default ManageUsers;
