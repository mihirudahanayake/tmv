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

  const strongestDepartment = departmentBreakdown.reduce((top, current) => (current.count > top.count ? current : top), { count: 0, label: 'N/A' });
  const maxCount = Math.max(...departmentBreakdown.map((item) => item.count), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-violet-100">
      <Header userType="superAdmin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <div className="mb-6 rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_25px_60px_rgba(14,116,144,0.12)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-blue-600">Overview</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">Super Admin</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
              {totalUsers} total users
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500" />
              <span>Loading department summary…</span>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Total users', value: totalUsers, tint: 'from-blue-500 to-cyan-500', text: 'text-blue-700' },
                { label: 'Highest member count', value: strongestDepartment.label, tint: 'from-violet-500 to-purple-500', text: 'text-violet-700' },
                { label: 'Departments', value: WORK_DEPARTMENTS.length, tint: 'from-amber-400 to-orange-500', text: 'text-amber-700' },
              ].map((card) => (
                <div
                  key={card.label}
                  className="group rounded-2xl border border-white/60 bg-white/75 p-4 shadow-[0_15px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(59,130,246,0.12)]"
                >
                  <div className={`mb-3 h-2 w-16 rounded-full bg-gradient-to-r ${card.tint}`} />
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-2xl font-bold text-slate-800">{card.value}</span>
                    <span className={`text-xs font-semibold ${card.text}`}>{card.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/85 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden backdrop-blur-sm">
              <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Overview</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-800">Users by department</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Live distribution
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {departmentBreakdown.map(({ dept, label, count }) => {
                    const percentageOfTotal = totalUsers > 0 ? (count / totalUsers) * 100 : 0;
                    const barWidth = Math.max(percentageOfTotal, count > 0 ? 8 : 0);

                    return (
                      <div
                        key={dept}
                        className="group rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-md"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                              {label.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-slate-700">{label}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-slate-800">{count}</span>
                            <span className="text-xs font-semibold text-slate-500">({percentageOfTotal.toFixed(1)}%)</span>
                          </div>
                        </div>

                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 transition-all duration-500 group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-teal-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
