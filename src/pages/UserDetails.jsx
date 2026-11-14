import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db, functions } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaCheck, FaTrash } from 'react-icons/fa';
import { useUserProfile } from '../hooks/useUserProfile';
import { httpsCallable } from 'firebase/functions';
import { canEdit, Roles } from '../utils/authz';
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
  const [offerLoading, setOfferLoading] = useState(false);
  const [nfcMessage, setNfcMessage] = useState('');
  const [duplicateUser, setDuplicateUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [savingDetails, setSavingDetails] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const nfcUrl = (import.meta.env.NFC_URL || import.meta.env.VITE_NFC_URL || '').trim();

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

  useEffect(() => {
    let timer;
    let active = true;

    const pollNfc = async () => {
      if (!offerLoading) return;
      if (!nfcUrl) {
        setActionError('NFC_URL is not configured in the environment.');
        setOfferLoading(false);
        return;
      }

      setNfcMessage('Waiting for NFC tap...');
      try {
        const resp = await fetch(`${nfcUrl.replace(/\/+$/, '')}/nfc/read`, {
          cache: 'no-store',
        });
        if (!resp.ok) {
          throw new Error(`Reader returned ${resp.status}`);
        }

        const data = await resp.json();
        const uid = data?.uid ?? data?.UID ?? data?.data?.uid ?? data?.data?.UID ?? null;

        if (uid) {
          const usedQuery = query(
            collection(db, 'users'),
            where('NFC_card_id', '==', uid)
          );
          const usedSnap = await getDocs(usedQuery);
          const existingUser = usedSnap.docs.find((d) => d.id !== userId);

          if (existingUser) {
            const existingData = existingUser.data();
            const ownerName = existingData.name || existingData.email || 'Unknown user';
            setDuplicateUser({
              id: existingUser.id,
              name: ownerName,
              email: existingData.email || '',
              uid,
            });
            setActionError(`This NFC card is already assigned to ${ownerName}.`);
            setNfcMessage(`Card already used by ${ownerName}.`);
            setOfferLoading(false);
            return;
          }

          if (userId) {
            await updateDoc(doc(db, 'users', userId), { NFC_card_id: uid });
          }
          setUser((prev) => (prev ? { ...prev, NFC_card_id: uid } : prev));
          setActionSuccess(`NFC card detected: ${uid}`);
          setNfcMessage(`NFC card detected: ${uid}`);
          setOfferLoading(false);
          return;
        }

        if (active) {
          timer = window.setTimeout(pollNfc, 1500);
        }
      } catch (err) {
        if (!active) return;
        setNfcMessage('Waiting for NFC tap...');
        timer = window.setTimeout(pollNfc, 2000);
      }
    };

    if (offerLoading) {
      pollNfc();
    }

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [offerLoading, nfcUrl, userId]);

  const canEditUser = canEdit(profile);
  const canDeleteUsers = canEditUser;
  const canAssignTO = profile?.role === Roles.SUPER_ADMIN || profile?.userType === 'superAdmin';

  const handleToggleTO = async () => {
    if (!userId || !user || !canAssignTO) return;

    const nextValue = !Boolean(user.isTO);
    setActionError('');
    setActionSuccess('');

    try {
      const patch = {
        isTO: nextValue,
      };

      if (user.role === Roles.SUPERVISOR_TO) patch.role = Roles.MEMBER;
      if (user.userType === 'supervisor') patch.userType = 'user';

      if (nextValue) {
        patch.role = Roles.MEMBER;
        patch.userType = 'user';
      }

      await updateDoc(doc(db, 'users', userId), patch);
      setUser((prev) => (prev ? { ...prev, ...patch } : prev));
      setActionSuccess(nextValue ? 'User marked as TO.' : 'TO status removed.');
    } catch (err) {
      console.error('Failed to update TO status', err);
      setActionError('Failed to update TO status. Please try again.');
    }
  };

  const handleStartEdit = () => {
    if (!user) return;
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phoneNo: user.phoneNo || '',
      batch: user.batch || '',
      studyDepartment: user.studyDepartment || '',
      gender: user.gender || '',
      registrationNumber: user.registrationNumber || '',
      cardNumber: user.cardNumber || '',
      userType: user.userType || 'user',
      isTO: Boolean(user.isTO),
      departments: Array.isArray(user.departments)
        ? user.departments.join(', ')
        : user.department || '',
      firstPriority: user.firstPriority || user.department || '',
    });
    setActionError('');
    setActionSuccess('');
    setIsEditing(true);
  };

  const handleEditFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCancelEdit = () => {
    setEditForm(null);
    setIsEditing(false);
    setActionError('');
    setActionSuccess('');
  };

  const handleSaveUserDetails = async () => {
    if (!userId || !editForm) return;

    setSavingDetails(true);
    setActionError('');
    setActionSuccess('');

    try {
      const selectedDepartments = (editForm.departments || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      const primaryDepartment =
        (editForm.firstPriority || selectedDepartments[0] || editForm.studyDepartment || 'videography')
          .trim();

      const normalized = {
        name: editForm.name?.trim() || '',
        email: editForm.email?.trim() || '',
        phoneNo: editForm.phoneNo?.trim() || '',
        batch: editForm.batch?.trim() || '',
        studyDepartment: editForm.studyDepartment?.trim() || '',
        gender: editForm.gender?.trim() || '',
        registrationNumber: editForm.registrationNumber?.trim() || '',
        cardNumber: editForm.cardNumber?.trim() || '',
        userType: editForm.userType?.trim() || 'user',
        isTO: Boolean(editForm.isTO),
        departments: selectedDepartments.length ? selectedDepartments : [primaryDepartment],
        firstPriority: primaryDepartment,
        department: primaryDepartment,
      };

      await updateDoc(doc(db, 'users', userId), normalized);
      setUser((prev) => (prev ? { ...prev, ...normalized } : prev));
      setActionSuccess('User details updated successfully.');
      setIsEditing(false);
      setEditForm(null);
    } catch (err) {
      console.error('Failed to update user details', err);
      setActionError('Failed to update user details. Please try again.');
    } finally {
      setSavingDetails(false);
    }
  };

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

  const handleOfferIdClick = () => {
    setActionError('');
    setActionSuccess('');
    setDuplicateUser(null);
    setNfcMessage('');
    setOfferLoading(true);
  };

  const handleScanAnother = () => {
    setActionError('');
    setActionSuccess('');
    setDuplicateUser(null);
    setNfcMessage('Waiting for NFC tap...');
    setOfferLoading(true);
  };

  const handleRemoveAndAssign = async () => {
    if (!duplicateUser?.uid || !userId) return;
    setActionError('');
    setActionSuccess('');
    setNfcMessage('Reassigning card...');
    setOfferLoading(true);

    try {
      await updateDoc(doc(db, 'users', duplicateUser.id), { NFC_card_id: null });
      await updateDoc(doc(db, 'users', userId), { NFC_card_id: duplicateUser.uid });
      setUser((prev) => (prev ? { ...prev, NFC_card_id: duplicateUser.uid } : prev));
      setActionSuccess(`Card reassigned from ${duplicateUser.name} to this user.`);
      setDuplicateUser(null);
    } catch (err) {
      console.error('Failed to reassign NFC card', err);
      setActionError('Failed to reassign the card. Try again.');
    } finally {
      setOfferLoading(false);
    }
  };

  const closeOfferPopup = () => {
    setOfferLoading(false);
    setDuplicateUser(null);
    setNfcMessage('');
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
            <div className="mb-6 rounded-[28px] border border-white/60 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-5 text-white shadow-[0_20px_40px_rgba(79,70,229,0.25)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || 'User'}
                      className="h-16 w-16 rounded-full border-2 border-white/80 object-cover bg-white/10 sm:h-20 sm:w-20"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 text-2xl font-bold text-white sm:h-20 sm:w-20">
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-100">Member profile</p>
                    <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                      {user.name || 'User details'}
                    </h1>
                    <p className="mt-1 text-sm text-blue-100">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {canAssignTO ? (
                    <button
                      type="button"
                      onClick={handleToggleTO}
                      className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 ${user.isTO ? 'bg-red-500 hover:bg-red-600' : 'bg-white/15 hover:bg-white/25'}`}
                    >
                      {user.isTO ? 'Remove TO' : 'Make TO'}
                    </button>
                  ) : null}
                  {canEditUser && !isEditing ? (
                    <button
                      type="button"
                      onClick={handleStartEdit}
                      className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300"
                    >
                      Edit
                    </button>
                  ) : null}
                  {canEditUser && isEditing ? (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="inline-flex items-center justify-center rounded-xl bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  ) : null}
                  {user.isTO ? (
                    <button
                      type="button"
                      onClick={handleOfferIdClick}
                      disabled={offerLoading || loadingProfile}
                      className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-300 disabled:opacity-50"
                    >
                      {offerLoading ? 'Waiting...' : 'Offer ID'}
                    </button>
                  ) : null}
                  {canDeleteUsers ? (
                    <button
                      type="button"
                      onClick={handleDeleteUser}
                      disabled={deleting || loadingProfile}
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600 disabled:opacity-50"
                    >
                      <FaTrash />
                      <span>{deleting ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {isEditing && editForm ? (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 text-sm sm:text-base">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Name</span>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Email</span>
                    <input
                      name="email"
                      value={editForm.email}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Phone</span>
                    <input
                      name="phoneNo"
                      value={editForm.phoneNo}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Batch</span>
                    <input
                      name="batch"
                      value={editForm.batch}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Study department</span>
                    <input
                      name="studyDepartment"
                      value={editForm.studyDepartment}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Gender</span>
                    <input
                      name="gender"
                      value={editForm.gender}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Registration no</span>
                    <input
                      name="registrationNumber"
                      value={editForm.registrationNumber}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  {/*
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">Card</span>
                    <input
                      name="cardNumber"
                      value={editForm.cardNumber}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  */}
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">User type</span>
                    <input
                      name="userType"
                      value={editForm.userType}
                      onChange={handleEditFieldChange}
                      className="border rounded px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1 md:col-span-2">
                    <span className="font-semibold text-gray-700">Work departments</span>
                    <input
                      name="departments"
                      value={editForm.departments}
                      onChange={handleEditFieldChange}
                      placeholder="ITT, EET"
                      className="border rounded px-3 py-2"
                    />
                  </label>
                </div>

                <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    name="isTO"
                    type="checkbox"
                    checked={Boolean(editForm.isTO)}
                    onChange={handleEditFieldChange}
                  />
                  TO status
                </label>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={handleSaveUserDetails}
                    disabled={savingDetails}
                    className="rounded bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50 px-4 py-2"
                  >
                    {savingDetails ? 'Saving...' : 'Save changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.06)] sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">Profile overview</h2>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                    {user.userType || 'user'}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Phone', user.phoneNo || '-'],
                    ['Batch', user.batch || '-'],
                    ['Study department', user.studyDepartment || '-'],
                    ['Gender', user.gender || '-'],
                    ['Registration no', user.registrationNumber || '-'],
                    ['NFC Card ID', user.NFC_card_id || '-'],
                    ['TO status', user.isTO ? 'Yes' : 'No'],
                    ['Work departments', Array.isArray(user.departments) ? user.departments.join(', ') : user.department || '-'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                Task history
              </h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {works.length} tasks
              </span>
            </div>

            {works.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
                No tasks for this user.
              </div>
            ) : (
              <div className="space-y-3">
                {works.map((w) => {
                  const roles = getUserRoles(w);
                  const status = w.status || 'incomplete';

                  return (
                    <div
                      key={w.id}
                      onClick={() => navigate(`/tasks/${w.id}`)}
                      className="cursor-pointer rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_26px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_20px_36px_rgba(59,130,246,0.1)]"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-slate-800 sm:text-lg">
                            {w.title || 'Untitled task'}
                          </h3>
                          {w.date && (
                            <span className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              <FaCalendarAlt className="text-[11px]" />
                              {new Date(w.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                            status === 'complete'
                              ? 'bg-emerald-100 text-emerald-700'
                              : status === 'done'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      {w.description && (
                        <p className="mb-3 text-sm text-slate-600">{w.description}</p>
                      )}

                      {roles.length > 0 && (
                        <div>
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                            Assigned work types
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {roles.map((role) => {
                              const done = isRoleDone(w, role);
                              return (
                                <span
                                  key={role}
                                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                    done
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {done && <FaCheck className="text-[10px]" />}
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

            {offerLoading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                  <div className="flex flex-col items-center gap-4">
                    <FaSpinner className="animate-spin text-4xl text-blue-600" />
                    <div className="text-lg font-semibold text-gray-900">Offer ID is loading...</div>
                    <p className="text-sm text-gray-600 text-center">
                      {nfcMessage || 'Waiting for NFC tap...'}
                    </p>
                    <button
                      type="button"
                      onClick={closeOfferPopup}
                      className="mt-2 inline-flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {duplicateUser && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="text-xl font-semibold text-red-700">Card Already In Use</div>
                    <p className="text-sm text-gray-600">
                      This NFC card is already assigned to:
                    </p>
                    <p className="font-semibold text-gray-900">
                      {duplicateUser.name}
                    </p>
                    {duplicateUser.email ? (
                      <p className="text-sm text-gray-500">{duplicateUser.email}</p>
                    ) : null}
                    <div className="grid grid-cols-1 gap-2 w-full">
                      <button
                        type="button"
                        onClick={handleScanAnother}
                        className="inline-flex w-full items-center justify-center rounded bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Scan another one
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveAndAssign}
                        className="inline-flex w-full items-center justify-center rounded bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Remove and assign
                      </button>
                      <button
                        type="button"
                        onClick={closeOfferPopup}
                        className="inline-flex w-full items-center justify-center rounded bg-gray-200 hover:bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserDetails;