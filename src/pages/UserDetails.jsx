import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, functions } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaCheck, FaTrash } from 'react-icons/fa';
import { useUserProfile } from '../hooks/useUserProfile';
import { httpsCallable } from 'firebase/functions';
import { Roles } from '../utils/authz';
import {
  getWorkRolesForDepartment,
  normalizeRolesForDepartment,
  formatWorkRoleLabel,
} from '../constants/workRoles';


const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { profile, loading: loadingProfile } = useUserProfile();
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const userSnap = await getDoc(doc(db, 'users', userId));
        if (userSnap.exists()) {
          setUser({ id: userId, ...userSnap.data() });
        }

        if (loadingProfile) return;
        const dept = (profile?.managedDepartments || [])[0] || 'videography';

        const snaps = [];
        snaps.push(
          await getDocs(
            query(
              collection(db, 'works'),
              where('department', '==', dept),
              where('assignedUsers', 'array-contains', userId)
            )
          )
        );
        if (dept === 'videography') {
          snaps.push(
            await getDocs(
              query(
                collection(db, 'works'),
                where('department', '==', null),
                where('assignedUsers', 'array-contains', userId)
              )
            )
          );
        }

        const dedup = new Map();
        snaps.forEach((snap) => {
          snap.docs.forEach((d) => dedup.set(d.id, { id: d.id, ...d.data() }));
        });

        const userWorks = Array.from(dedup.values());

        userWorks.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const dbt = b.date ? new Date(b.date).getTime() : 0;
          return dbt - da;
        });

        setWorks(userWorks);
      } catch (err) {
        console.error('Error loading user details:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId, loadingProfile, profile]);

  const canDeleteUsers =
    profile?.role === Roles.DEPARTMENT_HEAD ||
    profile?.role === Roles.SUPER_ADMIN ||
    profile?.role === Roles.SITE_ADMIN;

  const handleDeleteUser = async () => {
    if (!canDeleteUsers || !userId) return;
    setActionError('');
    setActionSuccess('');

    const nameOrEmail = user?.name || user?.email || '';
    const ok = window.confirm(
      'Delete user ' + nameOrEmail + '?\n\nThis will permanently remove the account.'
    );
    if (!ok) return;

    try {
      setDeleting(true);
      const fn = httpsCallable(functions, 'deleteUserAccount');
      await fn({ uid: userId });
      setActionSuccess('User deleted successfully.');
      navigate('/manage-users', { replace: true });
    } catch (err) {
      console.error('delete user failed', err);
      const message =
        err?.message ||
        err?.details ||
        'Failed to delete user. Check permissions and try again.';
      setActionError(String(message));
    } finally {
      setDeleting(false);
    }
  };

  const getStoredUserRoles = (work) => {
    const details = work.assignedUserDetails || [];
    const mine = details.find((d) => d.userId === userId);
    return mine?.roles || [];
  };

  const getCompletionRoles = (work) => {
    const deptRoles = getWorkRolesForDepartment(work.department);
    const stored = getStoredUserRoles(work);

    if (deptRoles.length === 1 && deptRoles[0] === 'done') {
      if (stored.length && !stored.includes('done')) return stored;
      return ['done'];
    }

    return normalizeRolesForDepartment(work.department, stored);
  };

  const getUserRoles = (work) => {
    const deptRoles = getWorkRolesForDepartment(work.department);
    if (deptRoles.length === 1 && deptRoles[0] === 'done') return ['done'];
    return normalizeRolesForDepartment(work.department, getStoredUserRoles(work));
  };

  const isRoleDone = (work, role) => {
    const roleCompletion = work.roleCompletion || {};

    if (role === 'done') {
      const completionRoles = getCompletionRoles(work);
      if (!completionRoles.length) return false;
      return completionRoles.every(
        (r) => roleCompletion[userId + '_' + r] === 'done'
      );
    }

    return roleCompletion[userId + '_' + role] === 'done';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin" />
            <span>Loading user...</span>
          </div>
        )}

        {actionError ? (
          <div className="mb-3 p-2 rounded bg-red-100 text-red-700 text-sm">
            {actionError}
          </div>
        ) : null}
        {actionSuccess ? (
          <div className="mb-3 p-2 rounded bg-green-100 text-green-700 text-sm">
            {actionSuccess}
          </div>
        ) : null}

        {!loading && !user && (
          <p className="text-gray-600 text-sm sm:text-base">User not found.</p>
        )}

        {!loading && user && (
          <>
            {/* Header with avatar */}
            <div className="flex items-center gap-4 mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name || 'User'}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200 bg-gray-100"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold text-white">
                  {(user.name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {user.name || 'User details'}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {user.email}
                </p>
              </div>

              {canDeleteUsers ? (
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  disabled={deleting || loadingProfile}
                  aria-label={deleting ? 'Deleting user' : 'Delete user'}
                  title="Delete user"
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 h-9 w-9 sm:h-auto sm:w-auto sm:px-3 sm:py-2 text-xs"
                >
                  <FaTrash />
                  <span className="hidden sm:inline">
                    {deleting ? 'Deleting...' : 'Delete'}
                  </span>
                </button>
              ) : null}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 text-sm sm:text-base space-y-2">
              <p>
                <span className="font-semibold">Phone:</span>{' '}
                {user.phoneNo || '-'}
              </p>
              <p>
                <span className="font-semibold">Batch:</span>{' '}
                {user.batch || '-'}
              </p>
              <p>
                <span className="font-semibold">Study department:</span>{' '}
                {user.studyDepartment || '-'}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>{' '}
                {user.gender || '-'}
              </p>
              <p>
                <span className="font-semibold">Registration no:</span>{' '}
                {user.registrationNumber || '-'}
              </p>
              <p>
                <span className="font-semibold">Card:</span>{' '}
                {user.cardNumber || '-'}
              </p>
              <p>
                <span className="font-semibold">Work departments:</span>{' '}
                {Array.isArray(user.departments)
                  ? user.departments.join(', ')
                  : user.department || '-'}
              </p>
              <p>
                <span className="font-semibold">User type:</span>{' '}
                {user.userType || 'user'}
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Task history
            </h2>

            {works.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">
                No tasks for this user.
              </p>
            ) : (
              <div className="space-y-3">
                {works.map((w) => {
                  const roles = getUserRoles(w);
                  const status = w.status || 'incomplete';

                  return (
<div
  key={w.id}
  onClick={() => navigate(`/tasks/${w.id}`)}
  className="bg-white rounded-lg shadow p-3 sm:p-4 text-sm sm:text-base cursor-pointer hover:shadow-md hover:bg-gray-50 transition"
>

                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {w.title || 'Untitled task'}
                          </h3>
                          {w.date && (
                            <span className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <FaCalendarAlt />{' '}
                              {new Date(w.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                            status === 'complete'
                              ? 'bg-green-100 text-green-800'
                              : status === 'done'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      {w.description && (
                        <p className="text-gray-700 text-sm mb-2">
                          {w.description}
                        </p>
                      )}

                      {roles.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-gray-700 mb-1">
                            Assigned work types:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {roles.map((role) => {
                              const done = isRoleDone(w, role);
                              return (
                                <span
                                  key={role}
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                                    done
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {done && (
                                    <FaCheck className="text-xs" />
                                  )}
                                  {formatWorkRoleLabel(role)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserDetails;