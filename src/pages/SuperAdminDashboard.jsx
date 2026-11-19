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

  const departmentPalette = [
    'from-blue-500 via-cyan-500 to-sky-400',
    'from-violet-500 via-purple-500 to-indigo-500',
    'from-emerald-500 via-teal-500 to-cyan-500',
    'from-amber-500 via-orange-500 to-rose-500',
    'from-pink-500 via-fuchsia-500 to-violet-500',
    'from-slate-600 via-slate-500 to-slate-400',
  ];

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-gradient-to-br from-sky-100 via-white to-violet-100 sm:-mx-5 lg:-mx-6 2xl:-mx-10">
      <Header userType="superAdmin" />

      <main className="mx-auto w-full px-4 py-6 sm:py-8 xl:px-8 2xl:px-10">
        <div className="mb-6 rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_25px_60px_rgba(14,116,144,0.12)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-blue-600">Overview</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">Super Admin</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
              Total Members: {totalUsers}
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
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {departmentBreakdown.map(({ dept, label, count }, index) => {
                    const percentageOfTotal = totalUsers > 0 ? (count / totalUsers) * 100 : 0;
                    const barWidth = Math.max(percentageOfTotal, count > 0 ? 10 : 0);
                    const accent = departmentPalette[index % departmentPalette.length];

                    return (
                      <div
                        key={dept}
                        className="group rounded-[24px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-4 shadow-[0_16px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_rgba(59,130,246,0.12)]"
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-xs font-bold text-white shadow-sm`}>
                              {label.charAt(0)}
                            </div>
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Department</p>
                              <h3 className="text-sm font-bold text-slate-800">{label}</h3>
                            </div>
                          </div>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                            {count}
                          </span>
                        </div>

                        <div className="mb-2 flex items-end justify-between text-xs font-semibold">
                          <span className="text-slate-500">Share of total</span>
                          <span className="text-slate-700">{percentageOfTotal.toFixed(1)}%</span>
                        </div>

                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${accent} transition-all duration-500`}
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
