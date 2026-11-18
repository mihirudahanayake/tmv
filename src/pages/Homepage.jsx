import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  FaArrowRight,
  FaBell,
  FaCheckCircle,
  FaClipboardList,
  FaPaperPlane,
  FaTasks,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';
import { httpsCallable } from 'firebase/functions';
import Header from '../components/Header';
import AssignWork from './AssignWork';
import { db, functions } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';

const getWorkDate = (work) => {
  const value = work.date || work.deadline || work.createdAt;
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
};

const Homepage = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null); // { id, type, workId, userName, createdAt }
  const [isAssignWorkOpen, setIsAssignWorkOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { profile, loading: loadingProfile } = useUserProfile();
  const isDepartmentHead = profile?.role === 'departmentHead';
  const [department, setDepartment] = useState('');
  const [departmentUserCount, setDepartmentUserCount] = useState(0);
  const [departmentWorks, setDepartmentWorks] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState('');

  const managedDepartments = Array.isArray(profile?.managedDepartments)
    ? profile.managedDepartments
    : [];
  const availableDepartments = profile?.role === 'departmentHead'
    ? managedDepartments
    : WORK_DEPARTMENTS;
  const activeDepartment = availableDepartments.includes(department)
    ? department
    : availableDepartments[0] || '';
  const activeWorkCount = departmentWorks.filter(
    (work) => (work.status || '').toLowerCase() !== 'complete'
  ).length;
  const completedWorkCount = departmentWorks.length - activeWorkCount;
  const recentWorks = [...departmentWorks]
    .sort((a, b) => (getWorkDate(b)?.getTime() || 0) - (getWorkDate(a)?.getTime() || 0))
    .slice(0, 5);

  useEffect(() => {
    if (loadingProfile) return;
    if (!activeDepartment) {
      setDepartmentUserCount(0);
      setDepartmentWorks([]);
      setDashboardError('No department is assigned to this department head. Contact a site administrator.');
      setDashboardLoading(false);
      return;
    }

    setDashboardLoading(true);
    setDashboardError('');
    let usersLoaded = false;
    let worksLoaded = false;
    let isActive = true;
    const finishLoading = () => {
      if (isActive && usersLoaded && worksLoaded) setDashboardLoading(false);
    };

    const fetchDepartmentUserCount = async () => {
      try {
        const getDepartmentUserCount = httpsCallable(functions, 'getDepartmentUserCount');
        const result = await getDepartmentUserCount({ department: activeDepartment });
        const count = result.data?.count;
        if (!Number.isInteger(count) || count < 0) {
          throw new Error('Invalid department user count returned by the server.');
        }
        if (isActive) setDepartmentUserCount(count);
      } catch (error) {
        console.error('Department user count error:', error);
        if (isActive) {
          setDashboardError(
            `Could not load department users: ${error.code || error.message || 'unknown error'}`
          );
        }
      } finally {
        usersLoaded = true;
        finishLoading();
      }
    };

    fetchDepartmentUserCount();
    const worksQuery = query(
      collection(db, 'works'),
      where('department', '==', activeDepartment)
    );
    const unsubWorks = onSnapshot(
      worksQuery,
      (snap) => {
        setDepartmentWorks(snap.docs.map((workDoc) => ({ id: workDoc.id, ...workDoc.data() })));
        worksLoaded = true;
        finishLoading();
      },
      (error) => {
        console.error('Department work listener error:', error);
        setDashboardError('Could not load department work.');
        worksLoaded = true;
        finishLoading();
      }
    );

    return () => {
      isActive = false;
      unsubWorks();
    };
  }, [activeDepartment, loadingProfile]);

  // listen for unread notifications
  useEffect(() => {
    if (loadingProfile) return;
    if (!activeDepartment) {
      setPopup(null);
      setUnreadCount(0);
      return;
    }

    const isAdminActivity = (data) => {
      return ['accept', 'reject', 'done', 'undo-done'].includes(data?.type);
    };

    const makeQuery = (deptValue) =>
      query(collection(db, 'notifications'), where('department', '==', deptValue));

    const processSnap = (snap) => {
      const candidates = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((n) => n.read === false)
        .filter(isAdminActivity)
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
          return bTime - aTime;
        });

      setUnreadCount(candidates.length);
      setPopup(candidates[0] || null);
    };

    const unsubMain = onSnapshot(
      makeQuery(activeDepartment),
      (snap) => {
        processSnap(snap);
      },
      (err) => console.error('Notification listener error:', err)
    );

    let unsubLegacy = null;
    if (activeDepartment === 'videography') {
      unsubLegacy = onSnapshot(
        makeQuery(null),
        (snap) => processSnap(snap),
        (err) => console.error('Legacy notification listener error:', err)
      );
    }

    return () => {
      unsubMain();
      if (unsubLegacy) unsubLegacy();
    };
  }, [loadingProfile, activeDepartment]);

  // CLICK: mark read + open details page for this notification
  const handleClickNotification = async () => {
    if (!popup) return;
    try {
      await updateDoc(doc(db, 'notifications', popup.id), { read: true });
    } catch (e) {
      console.error('Failed to mark notification read', e);
    }

    const notifId = popup.id; // Firestore doc id
    setPopup(null);

    // Go to admin notification details (matches App.jsx route)
    navigate(`/admin/notifications/${notifId}`);
  };

  const renderPopupText = () => {
    if (!popup) return '';
    const who = popup.userName || 'A user';
    if (popup.type === 'accept') return `${who} accepted a work.`;
    if (popup.type === 'reject') return `${who} rejected a work.`;
    if (popup.type === 'done') return `${who} marked their work as done.`;
    if (popup.type === 'undo-done') return `${who} undid a done task.`;
    return 'New activity on a work.';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      {/* popup notification */}
      {popup && (
        <button
          onClick={handleClickNotification}
          className="fixed bottom-4 right-4 z-50 max-w-xs text-left bg-white shadow-xl rounded-xl border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50"
        >
          <p className="font-semibold text-gray-800 mb-1">
            {renderPopupText()}
          </p>
          <p className="text-gray-500 text-xs">Click to view details</p>
        </button>
      )}

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Department overview</p>
              <h1 className="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl">
                {activeDepartment ? `${formatWorkDepartmentLabel(activeDepartment)} Dashboard` : 'Department Dashboard'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">Live activity and quick access for your managed department.</p>
            </div>
            {availableDepartments.length > 1 && (
              <label className="text-sm font-medium text-gray-600">
                Department
                <select
                  value={activeDepartment}
                  onChange={(event) => setDepartment(event.target.value)}
                  className="mt-1 block min-w-52 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm"
                >
                  {availableDepartments.map((dept) => (
                    <option key={dept} value={dept}>{formatWorkDepartmentLabel(dept)}</option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {dashboardError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {dashboardError}
            </div>
          )}

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Department users', value: departmentUserCount, icon: FaUsers, path: '/manage-users', accent: 'text-blue-600' },
              { label: 'Active work', value: activeWorkCount, icon: FaTasks, path: '/work-list', accent: 'text-amber-500' },
              { label: 'Completed work', value: completedWorkCount, icon: FaCheckCircle, path: '/work-list', accent: 'text-emerald-500' },
              { label: 'Unread activity', value: unreadCount, icon: FaBell, path: '/admin/notifications', accent: 'text-violet-500' },
            ].map(({ label, value, icon: Icon, path, accent }) => (
              <button
                key={label}
                type="button"
                onClick={() => navigate(path)}
                className="group rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="flex items-center justify-between">
                  <Icon className={`text-xl ${accent}`} />
                  <FaArrowRight className="text-xs text-gray-400 transition group-hover:translate-x-1" />
                </span>
                <span className="mt-4 block text-2xl font-bold text-gray-800">
                  {dashboardLoading ? '—' : value}
                </span>
                <span className="mt-1 block text-sm text-gray-500">{label}</span>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-lg font-bold text-gray-800">Quick actions</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Create a user', description: 'Add a member to your department.', icon: FaUserPlus, path: '/create-user', color: 'text-emerald-600' },
                ...(isDepartmentHead
                  ? [{ label: 'Assign work', description: 'Create and assign a department task.', icon: FaClipboardList, onClick: () => setIsAssignWorkOpen(true), color: 'text-blue-600' }]
                  : []),
                { label: 'Make an announcement', description: 'Share an update with your team.', icon: FaPaperPlane, path: '/admin/notifications', color: 'text-orange-500' },
              ].map(({ label, description, icon: Icon, path, onClick, color }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick || (() => navigate(path))}
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <Icon className={`shrink-0 text-2xl ${color}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-gray-800">{label}</span>
                    <span className="mt-1 block text-xs text-gray-500">{description}</span>
                  </span>
                  <FaArrowRight className="shrink-0 text-xs text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Recent work</h2>
                <p className="text-sm text-gray-500">Latest work items in {activeDepartment ? formatWorkDepartmentLabel(activeDepartment) : 'your department'}.</p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/work-list')}
                className="shrink-0 text-sm font-semibold text-blue-600 hover:underline"
              >
                View all
              </button>
            </div>

            {dashboardLoading ? (
              <p className="py-6 text-center text-sm text-gray-500">Loading department activity...</p>
            ) : recentWorks.length ? (
              <div className="divide-y divide-gray-100">
                {recentWorks.map((work) => {
                  const date = getWorkDate(work);
                  const isComplete = (work.status || '').toLowerCase() === 'complete';
                  return (
                    <button
                      key={work.id}
                      type="button"
                      onClick={() => navigate(`/tasks/${work.id}`)}
                      className="flex w-full items-center gap-3 py-3 text-left transition hover:bg-gray-50"
                    >
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-gray-800">{work.title || 'Untitled work'}</span>
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {date ? date.toLocaleDateString() : 'No date set'}
                        </span>
                      </span>
                      <span className={`text-xs font-semibold ${isComplete ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {isComplete ? 'Complete' : 'In progress'}
                      </span>
                      <FaArrowRight className="text-xs text-gray-400" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-gray-500">No work items found for this department.</p>
            )}
          </section>
        </div>
      </main>

      {isDepartmentHead && isAssignWorkOpen && (
        <AssignWork isModal onClose={() => setIsAssignWorkOpen(false)} />
      )}
    </div>
  );
};

export default Homepage;
