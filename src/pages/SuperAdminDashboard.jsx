import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';

const SuperAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [usersByDept, setUsersByDept] = useState({});

  const departmentBreakdown = useMemo(
    () =>
      WORK_DEPARTMENTS.map((dept) => ({
        dept,
        label: formatWorkDepartmentLabel(dept),
        count: usersByDept[dept] ?? 0,
      })),
    [usersByDept]
  );

  const totalUsers = useMemo(
    () => departmentBreakdown.reduce((sum, item) => sum + Number(item.count || 0), 0),
    [departmentBreakdown]
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const deptCounts = {};
        await Promise.all(
          WORK_DEPARTMENTS.map(async (dept) => {
            const snap = await getDocs(query(collection(db, 'users'), where('departments', 'array-contains', dept)));
            deptCounts[dept] = snap.size;
          })
        );
        setUsersByDept(deptCounts);
      } finally {
        setLoading(false);
      }
    };

    load().catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="superAdmin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Super Admin</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-600">Loading department summary…</p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Overview</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-800">Users by department</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    {totalUsers} total users
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {departmentBreakdown.map(({ dept, label, count }) => (
                    <div
                      key={dept}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                          {label.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{label}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-2.5 w-20 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${Math.min((count / Math.max(totalUsers, 1)) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="min-w-8 text-right text-base font-bold text-slate-800">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Future panels kept for later use:
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="font-semibold text-gray-800 mb-2">Works by department</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  {WORK_DEPARTMENTS.map((dept) => (
                    <div key={dept} className="flex justify-between">
                      <span>{formatWorkDepartmentLabel(dept)}</span>
                      <span className="font-semibold">{worksByDept[dept] ?? 0}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">Note: works count uses the field works.department.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="font-semibold text-gray-800 mb-2">Users ({users.length})</h2>
                  <div className="max-h-[420px] overflow-auto divide-y">
                    {users.map((u) => (
                      <div key={u.id} className="py-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-gray-800 truncate">{u.name || u.email || u.id}</div>
                            <div className="text-xs text-gray-600">role: {u.role || u.userType || 'member'} • depts: {(u.departments || []).join(', ') || '-'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="font-semibold text-gray-800 mb-2">Works ({works.length})</h2>
                  <div className="max-h-[420px] overflow-auto divide-y">
                    {works.map((w) => (
                      <div key={w.id} className="py-2">
                        <div className="font-semibold text-sm text-gray-800">{w.title || w.id}</div>
                        <div className="text-xs text-gray-600">dept: {w.department || '(missing)'} • status: {w.status || '-'} • assigned: {(w.assignedUsers || []).length}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            */}
          </>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
