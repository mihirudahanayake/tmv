import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db, functions } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner, FaCheck, FaTrash } from 'react-icons/fa';
import { useUserProfile } from '../hooks/useUserProfile';
import { httpsCallable } from 'firebase/functions';
import { canEdit, canManageUser, getManagedDepartments, isUserTO, normalizeRole, Roles } from '../utils/authz';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';
import {
  getWorkRolesForDepartment,
  normalizeRolesForDepartment,
  formatWorkRoleLabel,
} from '../constants/workRoles';

const FieldError = ({ id, message }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
      {message}
    </p>
  ) : null;

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
  const [editFieldErrors, setEditFieldErrors] = useState({});
  const [savingDetails, setSavingDetails] = useState(false);
  const [savingDepartmentHead, setSavingDepartmentHead] = useState(false);
  const [departmentHeadDepartments, setDepartmentHeadDepartments] = useState([]);
  const [pendingDepartmentHeadUpdate, setPendingDepartmentHeadUpdate] = useState(null);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const nfcUrl = (import.meta.env.NFC_URL || import.meta.env.VITE_NFC_URL || '').trim();

  useEffect(() => {
    if (loadingProfile) return;
    setLoading(true);
    setUser(null);
    setWorks([]);
    setDepartmentHeadDepartments([]);

    const load = async () => {
      try {
        setActionError('');
        const userSnap = await getDoc(doc(db, 'users', userId));
        if (userSnap.exists()) {
          const userData = { id: userId, ...userSnap.data() };
          if (normalizeRole(profile) === Roles.DEPARTMENT_HEAD && !canManageUser(profile, userData)) {
            setUser(null);
            setActionError('You can only manage users in your department.');
            return;
          }
          setUser(userData);
          setDepartmentHeadDepartments(
            normalizeRole(userData) === Roles.DEPARTMENT_HEAD
              ? getManagedDepartments(userData).filter((department) =>
                  WORK_DEPARTMENTS.includes(department)
                )
              : []
          );
        } else {
          setUser(null);
          return;
        }

        const userData = { id: userId, ...userSnap.data() };
        const userDepartments = Array.isArray(userData.departments)
          ? userData.departments
          : userData.department
            ? [userData.department]
            : [];
        const managedDepartments = getManagedDepartments(profile);
        const workDepartments = normalizeRole(profile) === Roles.DEPARTMENT_HEAD
          ? userDepartments.filter((dept) => managedDepartments.includes(dept))
          : userDepartments.length
            ? userDepartments
            : [managedDepartments[0] || 'videography'];
        const workQueries = workDepartments.flatMap((dept) => {
          const departmentQueries = [
            query(
              collection(db, 'works'),
              where('department', '==', dept),
              where('assignedUsers', 'array-contains', userId)
            ),
          ];
          if (dept === 'videography') {
            departmentQueries.push(
              query(
                collection(db, 'works'),
                where('department', '==', null),
                where('assignedUsers', 'array-contains', userId)
              )
            );
          }
          return departmentQueries;
        });
        const snaps = await Promise.all(workQueries.map((workQuery) => getDocs(workQuery)));

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
        setActionError(
          err?.code === 'permission-denied'
            ? 'You can only manage users in your department.'
            : 'Failed to load user details.'
        );
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

  const profileRole = normalizeRole(profile);
  const isDepartmentHead = profileRole === Roles.DEPARTMENT_HEAD;
  const targetRole = normalizeRole(user);
  const canManageTarget = Boolean(user) && canManageUser(profile, user);
  const canEditUser = (canEdit(profile) || isDepartmentHead) && canManageTarget;
  const canDeleteUsers = (canEdit(profile) || isDepartmentHead) && canManageTarget;
  const canAssignOfferId = canEditUser && (
    [Roles.SUPER_ADMIN, Roles.DEPARTMENT_HEAD].includes(profileRole)
    || Boolean(user?.isTO)
    || [Roles.SUPER_ADMIN, Roles.DEPARTMENT_HEAD].includes(targetRole)
  );
  const canAssignTO = profileRole === Roles.SUPER_ADMIN
    && ![Roles.SITE_ADMIN, Roles.SUPER_ADMIN, Roles.DEPARTMENT_HEAD].includes(targetRole);
  const canManageDepartmentHead = profileRole === Roles.SUPER_ADMIN
    && targetRole !== Roles.SITE_ADMIN
    && [Roles.MEMBER, Roles.DEPARTMENT_HEAD].includes(targetRole);

  const headerUserType = profileRole === Roles.SUPER_ADMIN
    ? 'superAdmin'
    : profileRole === Roles.SITE_ADMIN
      ? 'siteAdmin'
      : 'admin';

  const handleToggleDepartmentHeadDepartment = (department, checked) => {
    if (!userId || !user || !canManageDepartmentHead) return;
    const managedDepartments = new Set(departmentHeadDepartments);
    if (checked) managedDepartments.add(department);
    else managedDepartments.delete(department);

    const nextDepartments = [...managedDepartments];
    const removingLastDepartment =
      targetRole === Roles.DEPARTMENT_HEAD && nextDepartments.length === 0;
    const departmentLabel = formatWorkDepartmentLabel(department);
    const userLabel = user.name || user.email || 'this user';
    setActionError('');
    setActionSuccess('');
    setPendingDepartmentHeadUpdate({
      department,
      departmentLabel,
      userLabel,
      checked,
      nextDepartments,
      removingLastDepartment,
      isDepartmentHead: targetRole === Roles.DEPARTMENT_HEAD,
    });
  };

  const handleConfirmDepartmentHeadUpdate = async () => {
    if (!pendingDepartmentHeadUpdate || !userId || !user || !canManageDepartmentHead) return;

    const { nextDepartments } = pendingDepartmentHeadUpdate;
    setSavingDepartmentHead(true);
    setActionError('');
    setActionSuccess('');
    const patch = nextDepartments.length
      ? {
          role: Roles.DEPARTMENT_HEAD,
          userType: 'admin',
          managedDepartments: nextDepartments,
          ...(pendingDepartmentHeadUpdate.isDepartmentHead ? {} : { isTO: false }),
        }
      : {
          role: Roles.MEMBER,
          userType: 'user',
          managedDepartments: [],
          isTO: false,
        };

    try {
      await updateDoc(doc(db, 'users', userId), patch);
      setUser((previous) => (previous ? { ...previous, ...patch } : previous));
      setDepartmentHeadDepartments(nextDepartments);
      setPendingDepartmentHeadUpdate(null);
      setActionSuccess(
        nextDepartments.length
          ? 'Department head assignment updated.'
          : 'Department head access removed.'
      );
    } catch (err) {
      console.error('Failed to update department head assignment', err);
      setActionError('Failed to update department head assignment. Please try again.');
      setPendingDepartmentHeadUpdate(null);
    } finally {
      setSavingDepartmentHead(false);
    }
  };

  const handleToggleTO = async () => {
    if (!userId || !user || !canAssignTO) return;

    const nextValue = !Boolean(user.isTO);
    setActionError('');
    setActionSuccess('');

    try {
      const patch = {
        isTO: nextValue,
      };

      if (user.role === Roles.SUPERVISOR_TO && targetRole !== Roles.DEPARTMENT_HEAD) {
        patch.role = Roles.MEMBER;
      }
      if (user.userType === 'supervisor' && targetRole !== Roles.DEPARTMENT_HEAD) {
        patch.userType = 'user';
      }

      if (nextValue && targetRole !== Roles.DEPARTMENT_HEAD) {
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

  const validateEditField = (name, value, currentForm = editForm) => {
    const trimmedValue = typeof value === 'string' ? value.trim() : '';
    if (name === 'name' && !trimmedValue) return 'Please enter name with initial.';
    if (name === 'username') {
      if (!trimmedValue) return 'Please enter a username.';
      const normalizedUsername = trimmedValue.replace(/\s+/g, ' ');
      if (
        normalizedUsername.length < 3
        || normalizedUsername.length > 20
        || !/^[a-z0-9_]+( [a-z0-9_]+)*$/i.test(normalizedUsername)
      ) {
        return 'Use 3–20 letters, numbers, underscores, or spaces.';
      }
    }
    if (name === 'email') {
      if (!trimmedValue) return 'Please enter an email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return 'Enter a valid email address.';
      }
    }
    if (name === 'phoneNo' && trimmedValue && !/^\d{10}$/.test(trimmedValue)) {
      return 'Enter a valid 10-digit phone number.';
    }
    if (name === 'departments' && !isDepartmentHead && (!currentForm?.departments || currentForm.departments.length === 0)) {
      return 'Choose at least one work department.';
    }
    return '';
  };

  const handleStartEdit = () => {
    if (!user || !canEditUser) return;
    const existingDepartments = Array.isArray(user.departments)
      ? user.departments.filter(Boolean)
      : user.department
        ? [user.department]
        : ['videography'];

    setEditForm({
      name: user.fullName || (user.username ? '' : user.name || ''),
      username: user.username || user.name || '',
      email: user.email || '',
      phoneNo: user.phoneNo || '',
      batch: user.batch || '',
      studyDepartment: user.studyDepartment || '',
      gender: (user.gender || '').toLowerCase(),
      registrationNumber: user.registrationNumber || '',
      birthday: user.birthday || '',
      cardNumber: user.cardNumber || '',
      userType: user.userType || 'user',
      isTO: Boolean(user.isTO),
      departments: existingDepartments,
      firstPriority: user.firstPriority || existingDepartments[0] || 'videography',
    });
    setEditFieldErrors({});
    setActionError('');
    setActionSuccess('');
    setIsEditing(true);
  };

  const handleEditFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setEditForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
    setEditFieldErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleEditPhoneChange = (event) => {
    const phoneNo = event.target.value.replace(/\D/g, '').slice(0, 10);
    setEditForm((prev) => ({ ...prev, phoneNo }));
    setEditFieldErrors((prev) => ({ ...prev, phoneNo: '' }));
  };

  const handleEditFieldBlur = (event) => {
    const { name, value } = event.target;
    setEditFieldErrors((prev) => ({
      ...prev,
      [name]: validateEditField(name, value),
    }));
  };

  const handleEditDepartmentToggle = (departmentValue) => {
    if (isDepartmentHead) return;
    setEditForm((prev) => {
      const current = Array.isArray(prev.departments) ? prev.departments : [];
      const exists = current.includes(departmentValue);
      const nextDepartments = exists
        ? current.filter((d) => d !== departmentValue)
        : [...current, departmentValue];

      setEditFieldErrors((errPrev) => ({
        ...errPrev,
        departments: nextDepartments.length === 0 ? 'Choose at least one work department.' : '',
      }));

      return {
        ...prev,
        departments: nextDepartments,
      };
    });
  };

  const handleCancelEdit = () => {
    setEditForm(null);
    setEditFieldErrors({});
    setIsEditing(false);
    setActionError('');
    setActionSuccess('');
  };

  const handleSaveUserDetails = async (e) => {
    if (e) e.preventDefault();
    if (!userId || !editForm || !canEditUser) return;

    const fieldsToValidate = ['name', 'username', 'email', 'phoneNo', 'departments'];
    const nextErrors = Object.fromEntries(
      fieldsToValidate
        .map((field) => [
          field,
          validateEditField(field, field === 'departments' ? editForm.departments : editForm[field], editForm),
        ])
        .filter(([, message]) => message)
    );
    setEditFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSavingDetails(true);
    setActionError('');
    setActionSuccess('');

    try {
      const cleanUsername = editForm.username.trim().replace(/\s+/g, ' ');
      const cleanFullName = editForm.name.trim();
      const selectedDepartments = Array.isArray(editForm.departments) && editForm.departments.length
        ? editForm.departments
        : ['videography'];

      const primaryDepartment = selectedDepartments[0] || 'videography';

      const normalized = {
        username: cleanUsername,
        name: cleanUsername || cleanFullName,
        fullName: cleanFullName,
        email: editForm.email.trim(),
        phoneNo: editForm.phoneNo.trim(),
        batch: editForm.batch.trim(),
        studyDepartment: editForm.studyDepartment.trim(),
        gender: editForm.gender.trim(),
        registrationNumber: editForm.registrationNumber.trim(),
        birthday: editForm.birthday || null,
        cardNumber: editForm.cardNumber?.trim() || null,
        ...(isDepartmentHead
          ? {}
          : {
              userType: editForm.userType?.trim() || 'user',
              isTO: Boolean(editForm.isTO),
              departments: selectedDepartments,
              firstPriority: primaryDepartment,
              department: primaryDepartment,
            }),
      };

      await updateDoc(doc(db, 'users', userId), normalized);
      setUser((prev) => (prev ? { ...prev, ...normalized } : prev));
      setActionSuccess('User details updated successfully.');
      setIsEditing(false);
      setEditForm(null);
      setEditFieldErrors({});
    } catch (err) {
      console.error('Failed to update user details', err);
      setActionError(
        err?.code === 'permission-denied'
          ? 'You do not have permission to update one or more fields for this user.'
          : 'Failed to update user details. Please try again.'
      );
    } finally {
      setSavingDetails(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!canDeleteUsers || !canManageUser(profile, user) || !userId) return;
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
    if (!canAssignOfferId) return;
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
    if (!canAssignOfferId || !duplicateUser?.uid || !userId) return;
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

  const editLabelClass = 'mb-1.5 block text-sm font-semibold text-slate-700';
  const editInputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition hover:-translate-y-0.5 hover:shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={isUserTO(profile)} />

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
                  {canAssignOfferId ? (
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

            {canManageDepartmentHead ? (
              <section className="mb-6 rounded-[24px] border border-indigo-200 bg-white p-4 shadow-sm sm:p-6">
                <h2 className="text-lg font-bold text-slate-800">Department head access</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Select a department to assign it immediately after confirmation. Assigned departments are marked below.
                </p>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  {departmentHeadDepartments.length} of {WORK_DEPARTMENTS.length} departments assigned
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {WORK_DEPARTMENTS.map((department) => {
                    const isManaged = departmentHeadDepartments.includes(department);
                    return (
                      <label
                        key={department}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm transition ${
                          isManaged
                            ? 'border-indigo-300 bg-indigo-50 text-indigo-900 shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            aria-label={`${formatWorkDepartmentLabel(department)} department access`}
                            checked={isManaged}
                            onChange={(event) =>
                              handleToggleDepartmentHeadDepartment(department, event.target.checked)
                            }
                            disabled={savingDepartmentHead || Boolean(pendingDepartmentHeadUpdate)}
                            className="h-4 w-4 accent-indigo-600"
                          />
                          <span className="font-medium">{formatWorkDepartmentLabel(department)}</span>
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
                            isManaged
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-white text-slate-500'
                          }`}
                        >
                          {isManaged ? <><FaCheck /> Assigned</> : 'Not assigned'}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {savingDepartmentHead ? (
                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Saving department access...
                  </p>
                ) : null}
              </section>
            ) : null}

            {pendingDepartmentHeadUpdate ? (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
                <div
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby="department-head-confirm-title"
                  className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <FaCheck className="text-xl" />
                  </div>
                  <h2
                    id="department-head-confirm-title"
                    className="mt-4 text-xl font-bold text-slate-900"
                  >
                    {pendingDepartmentHeadUpdate.checked
                      ? pendingDepartmentHeadUpdate.isDepartmentHead
                        ? 'Add department access?'
                        : 'Make department head?'
                      : pendingDepartmentHeadUpdate.removingLastDepartment
                        ? 'Remove department-head access?'
                        : 'Remove this department?'}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {pendingDepartmentHeadUpdate.checked
                      ? pendingDepartmentHeadUpdate.isDepartmentHead
                        ? `${pendingDepartmentHeadUpdate.userLabel} will be able to manage users in ${pendingDepartmentHeadUpdate.departmentLabel}. This change saves immediately.`
                        : `${pendingDepartmentHeadUpdate.userLabel} will become a department head for ${pendingDepartmentHeadUpdate.departmentLabel} and will be able to manage users there.`
                      : pendingDepartmentHeadUpdate.removingLastDepartment
                        ? `${pendingDepartmentHeadUpdate.userLabel} will lose department-head access when ${pendingDepartmentHeadUpdate.departmentLabel} is removed.`
                        : `${pendingDepartmentHeadUpdate.userLabel} will no longer manage users in ${pendingDepartmentHeadUpdate.departmentLabel}. Other department assignments will remain.`}
                  </p>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setPendingDepartmentHeadUpdate(null)}
                      disabled={savingDepartmentHead}
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDepartmentHeadUpdate}
                      disabled={savingDepartmentHead}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50 ${
                        pendingDepartmentHeadUpdate.checked
                          ? 'bg-indigo-600 hover:bg-indigo-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {savingDepartmentHead ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Saving...
                        </>
                      ) : pendingDepartmentHeadUpdate.checked
                        ? pendingDepartmentHeadUpdate.isDepartmentHead
                          ? 'Confirm & assign'
                          : 'Confirm & make head'
                        : 'Confirm removal'}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {isEditing && editForm ? (
              <form
                onSubmit={handleSaveUserDetails}
                noValidate
                className="mb-6 space-y-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_32px_rgba(15,23,42,0.06)] sm:p-8"
              >
                {/* Section 1: Member Details (Signup-style inputs) */}
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">
                      1
                    </span>
                    <div>
                      <h2 className="font-bold text-slate-800">Member details</h2>
                      <p className="text-xs text-slate-500">Required fields are marked with *</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className={editLabelClass}>
                        Name with initial <span className="text-rose-500">*</span>
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditFieldChange}
                        onBlur={handleEditFieldBlur}
                        placeholder="e.g. A B User"
                        aria-invalid={Boolean(editFieldErrors.name)}
                        className={editInputClass}
                      />
                      <FieldError id="edit-name-error" message={editFieldErrors.name} />
                    </label>

                    <label className="sm:col-span-2">
                      <span className={editLabelClass}>
                        Username <span className="text-rose-500">*</span>
                      </span>
                      <input
                        type="text"
                        name="username"
                        value={editForm.username}
                        onChange={handleEditFieldChange}
                        onBlur={handleEditFieldBlur}
                        minLength={3}
                        maxLength={20}
                        placeholder="e.g. New User"
                        aria-invalid={Boolean(editFieldErrors.username)}
                        className={editInputClass}
                      />
                      <FieldError id="edit-username-error" message={editFieldErrors.username} />
                      {!editFieldErrors.username ? (
                        <p className="mt-1.5 text-xs text-slate-500">
                          Display username using 3–20 letters, numbers, underscores, or spaces.
                        </p>
                      ) : null}
                    </label>

                    <label className="sm:col-span-2">
                      <span className={editLabelClass}>
                        Email address <span className="text-rose-500">*</span>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditFieldChange}
                        onBlur={handleEditFieldBlur}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(editFieldErrors.email)}
                        className={editInputClass}
                      />
                      <FieldError id="edit-email-error" message={editFieldErrors.email} />
                    </label>

                    <label>
                      <span className={editLabelClass}>Phone number</span>
                      <input
                        type="tel"
                        name="phoneNo"
                        value={editForm.phoneNo}
                        onChange={handleEditPhoneChange}
                        onBlur={handleEditFieldBlur}
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="07XXXXXXXX"
                        aria-invalid={Boolean(editFieldErrors.phoneNo)}
                        className={editInputClass}
                      />
                      <FieldError id="edit-phone-error" message={editFieldErrors.phoneNo} />
                    </label>

                    <label>
                      <span className={editLabelClass}>Batch</span>
                      <select
                        name="batch"
                        value={editForm.batch}
                        onChange={handleEditFieldChange}
                        className={editInputClass}
                      >
                        <option value="">Choose batch</option>
                        <option value="20/21">20/21</option>
                        <option value="21/22">21/22</option>
                        <option value="22/23">22/23</option>
                        <option value="23/24">23/24</option>
                        {editForm.batch && !['20/21', '21/22', '22/23', '23/24'].includes(editForm.batch) ? (
                          <option value={editForm.batch}>{editForm.batch}</option>
                        ) : null}
                      </select>
                    </label>

                    <label>
                      <span className={editLabelClass}>Department in study</span>
                      <select
                        name="studyDepartment"
                        value={editForm.studyDepartment}
                        onChange={handleEditFieldChange}
                        className={editInputClass}
                      >
                        <option value="">Choose department</option>
                        <option value="ITT">ITT</option>
                        <option value="EET">EET</option>
                        <option value="MTT">MTT</option>
                        <option value="BPT">BPT</option>
                        <option value="Food">Food</option>
                        {editForm.studyDepartment && !['ITT', 'EET', 'MTT', 'BPT', 'Food'].includes(editForm.studyDepartment) ? (
                          <option value={editForm.studyDepartment}>{editForm.studyDepartment}</option>
                        ) : null}
                      </select>
                    </label>

                    <label>
                      <span className={editLabelClass}>Registration number</span>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={editForm.registrationNumber}
                        onChange={handleEditFieldChange}
                        placeholder="e.g. ITT/2021/123"
                        className={editInputClass}
                      />
                    </label>

                    <label className="sm:col-span-2">
                      <span className={editLabelClass}>Birthday</span>
                      <input
                        type="date"
                        name="birthday"
                        value={editForm.birthday}
                        onChange={handleEditFieldChange}
                        className={editInputClass}
                      />
                    </label>

                    <fieldset className="sm:col-span-2">
                      <legend className={editLabelClass}>Gender</legend>
                      <div className="flex gap-3">
                        {['male', 'female'].map((gender) => (
                          <label
                            key={gender}
                            className={`flex flex-1 cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-3 text-sm capitalize transition ${
                              editForm.gender === gender
                                ? 'border-indigo-400 bg-indigo-50 text-indigo-800'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={gender}
                              checked={editForm.gender === gender}
                              onChange={handleEditFieldChange}
                              className="accent-indigo-600"
                            />
                            {gender}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </section>

                {/* Section 2: Work Teams & Permissions (Admin/SuperAdmin only) */}
                {!isDepartmentHead && (
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-sm font-bold text-cyan-700">
                        2
                      </span>
                      <div>
                        <h2 className="font-bold text-slate-800">Work teams & role</h2>
                        <p className="text-xs text-slate-500">Select every team this member works with.</p>
                      </div>
                    </div>

                    <fieldset aria-describedby={editFieldErrors.departments ? 'edit-departments-error' : undefined}>
                      <legend className={editLabelClass}>
                        Work departments <span className="text-rose-500">*</span>
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {WORK_DEPARTMENTS.map((department) => {
                          const selected = Array.isArray(editForm.departments) && editForm.departments.includes(department);
                          return (
                            <label
                              key={department}
                              className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition hover:-translate-y-0.5 focus-within:ring-4 ${
                                selected
                                  ? 'border-indigo-400 bg-indigo-50 ring-indigo-500/10'
                                  : 'border-slate-200 bg-white hover:border-indigo-200 focus-within:ring-indigo-500/10'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => handleEditDepartmentToggle(department)}
                                className="sr-only"
                                aria-label={`${formatWorkDepartmentLabel(department)} work department`}
                              />
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                                  selected
                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {selected ? <FaCheck /> : null}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-slate-800">
                                  {formatWorkDepartmentLabel(department)}
                                </span>
                                <span className="mt-0.5 block text-xs text-slate-500">
                                  {selected ? 'Selected for this profile' : 'Tap to select this team'}
                                </span>
                              </span>
                              {selected ? (
                                <span className="rounded-full bg-indigo-600/10 px-2 py-1 text-[10px] font-bold text-indigo-600">
                                  SELECTED
                                </span>
                              ) : null}
                            </label>
                          );
                        })}
                      </div>
                      <FieldError id="edit-departments-error" message={editFieldErrors.departments} />
                    </fieldset>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label>
                        <span className={editLabelClass}>User type</span>
                        <select
                          name="userType"
                          value={editForm.userType}
                          onChange={handleEditFieldChange}
                          className={editInputClass}
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                          <option value="siteAdmin">siteAdmin</option>
                          <option value="superAdmin">superAdmin</option>
                        </select>
                      </label>

                      <div className="flex items-end">
                        <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-200">
                          <input
                            name="isTO"
                            type="checkbox"
                            checked={Boolean(editForm.isTO)}
                            onChange={handleEditFieldChange}
                            className="h-4 w-4 accent-indigo-600"
                          />
                          TO status
                        </label>
                      </div>
                    </div>
                  </section>
                )}

                <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
                  <button
                    type="submit"
                    disabled={savingDetails}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingDetails ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Saving changes...
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        Save changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
                    ['Name with initial', user.fullName || '-'],
                    ['Username', user.username || user.name || '-'],
                    ['Phone', user.phoneNo || '-'],
                    ['Batch', user.batch || '-'],
                    ['Study department', user.studyDepartment || '-'],
                    ['Gender', user.gender || '-'],
                    ['Birthday', user.birthday || '-'],
                    ['Registration no', user.registrationNumber || '-'],
                    ['NFC Card ID', user.NFC_card_id || '-'],
                    ['TO status', user.isTO ? 'Yes' : 'No'],
                    ['Work departments', Array.isArray(user.departments) ? user.departments.map(formatWorkDepartmentLabel).join(', ') : user.department || '-'],
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