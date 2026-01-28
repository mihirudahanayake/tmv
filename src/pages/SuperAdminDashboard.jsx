import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';

const SuperAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [usersByDept, setUsersByDept] = useState({});
  const [worksByDept, setWorksByDept] = useState({});
  const [selectedDept, setSelectedDept] = useState('all');
  const [users, setUsers] = useState([]);
  const [works, setWorks] = useState([]);

  const deptOptions = useMemo(() => ['all', ...WORK_DEPARTMENTS], []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Users per department (membership is stored in users.departments array)
        const deptCounts = {};
        await Promise.all(
          WORK_DEPARTMENTS.map(async (dept) => {
            const snap = await getDocs(query(collection(db, 'users'), where('departments', 'array-contains', dept)));
            deptCounts[dept] = snap.size;
          })
        );
        setUsersByDept(deptCounts);

        // Works per department (stored in works.department; legacy docs may not have it)
        const workCounts = {};
        await Promise.all(
          WORK_DEPARTMENTS.map(async (dept) => {
            const snap = await getDocs(query(collection(db, 'works'), where('department', '==', dept)));
            workCounts[dept] = snap.size;
          })
        );
        setWorksByDept(workCounts);

        // Detailed lists
        if (selectedDept === 'all') {
          const [usersSnap, worksSnap] = await Promise.all([
            getDocs(collection(db, 'users')),
            getDocs(collection(db, 'works'))
          ]);
          setUsers(usersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
          setWorks(worksSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } else {
          const [usersSnap, worksSnap] = await Promise.all([
            getDocs(query(collection(db, 'users'), where('departments', 'array-contains', selectedDept))),
            getDocs(query(collection(db, 'works'), where('department', '==', selectedDept)))
          ]);
          setUsers(usersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
          setWorks(worksSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } finally {
        setLoading(false);
      }
    };

    load().catch(console.error);
  }, [selectedDept]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="superAdmin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Super Admin (read-only)</h1>

          <div className="w-full sm:w-64">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {deptOptions.map((d) => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All departments' : formatWorkDepartmentLabel(d)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="font-semibold text-gray-800 mb-2">Users by department</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  {WORK_DEPARTMENTS.map((dept) => (
                    <div key={dept} className="flex justify-between">
                      <span>{formatWorkDepartmentLabel(dept)}</span>
                      <span className="font-semibold">{usersByDept[dept] ?? 0}</span>
                    </div>
                  ))}
                </div>
              </div>

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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="font-semibold text-gray-800 mb-2">Users ({users.length})</h2>
                <div className="max-h-[420px] overflow-auto divide-y">
                  {users.map((u) => (
                    <div key={u.id} className="py-2">
                      <div className="font-semibold text-sm text-gray-800">{u.name || u.email || u.id}</div>
                      <div className="text-xs text-gray-600">role: {u.role || u.userType || 'member'} • depts: {(u.departments || []).join(', ') || '-'}</div>
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
          </>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
