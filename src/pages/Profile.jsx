import { useEffect, useMemo, useRef, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  onAuthStateChanged,
  updatePassword,
  signOut,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../firebase/config';
import Header from '../components/Header';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';
import { useDarkMode } from '../context/DarkModeContext';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaLock,
  FaCamera,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
  FaEdit,
  FaTimes,
  FaSave,
  FaIdCard,
  FaShieldAlt,
  FaUserCheck,
  FaVideo,
  FaPalette,
  FaMicrophone,
  FaPenNib,
  FaStar,
  FaCopy,
  FaCheck,
  FaSyncAlt,
  FaExpand,
  FaUpload,
  FaBolt,
} from 'react-icons/fa';

const storage = getStorage();

const DEPARTMENT_META = {
  videography: {
    icon: FaVideo,
    accent: 'from-rose-500 to-orange-500',
    ring: 'ring-rose-400',
    badge: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
  },
  photography: {
    icon: FaCamera,
    accent: 'from-sky-500 to-indigo-500',
    ring: 'ring-sky-400',
    badge: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30',
  },
  graphic_design: {
    icon: FaPalette,
    accent: 'from-fuchsia-500 to-purple-600',
    ring: 'ring-fuchsia-400',
    badge: 'bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-500/30',
  },
  announcing: {
    icon: FaMicrophone,
    accent: 'from-amber-500 to-yellow-500',
    ring: 'ring-amber-400',
    badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
  },
  content_writing: {
    icon: FaPenNib,
    accent: 'from-emerald-500 to-teal-500',
    ring: 'ring-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
  },
};

const Profile = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [status, setStatus] = useState('loading');

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'details' | 'security'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const [saving, setSaving] = useState(false);
  const [passSaving, setPassSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    currentPassword: '',
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDraggingOverAvatar, setIsDraggingOverAvatar] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');

  // Interactive Hero Spotlight & 3D ID Card Tilt/Flip
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const [showPassword, setShowPassword] = useState({
    emailCurrent: false,
    newPassword: false,
    confirmPassword: false,
  });

  const fieldRefs = useRef({});

  const normalizeProfileData = (data) => {
    const existingDepartments = Array.isArray(data?.departments)
      ? data.departments.filter(Boolean)
      : [];
    const fallbackDepartments = data?.department ? [data.department] : [];
    const departments = [...new Set([...(existingDepartments.length ? existingDepartments : fallbackDepartments)])];

    const firstPriority = (data?.firstPriority || data?.department || departments[0] || 'videography')?.toString();

    const nextDepartments =
      firstPriority && !departments.includes(firstPriority)
        ? [firstPriority, ...departments]
        : departments;

    return {
      ...data,
      departments: nextDepartments,
      firstPriority,
      department: (data?.department || firstPriority || nextDepartments[0] || 'videography')?.toString(),
    };
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus('no-auth');
        setUserData(null);
        return;
      }

      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = normalizeProfileData({
            id: user.uid,
            ...snap.data(),
            email: user.email || '',
          });
          setUserData(data);
          setOriginalData(data);
        }
        setStatus('ready');
      } catch (e) {
        console.error(e);
        setStatus('error');
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleFieldChange = (e) => {
    if (!isEditingProfile) return;
    const { name, value } = e.target;

    if (name === 'firstPriority') {
      setUserData((prev) => {
        const currentDepartments = Array.isArray(prev?.departments)
          ? prev.departments.filter(Boolean)
          : prev?.department
            ? [prev.department]
            : [];

        const nextDepartments = value && !currentDepartments.includes(value)
          ? [value, ...currentDepartments]
          : currentDepartments;

        return {
          ...prev,
          firstPriority: value,
          department: value,
          departments: nextDepartments,
        };
      });
      return;
    }

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const getSelectedDepartments = (data) => {
    if (Array.isArray(data?.departments) && data.departments.length) return data.departments.filter(Boolean);
    if (data?.department) return [data.department];
    return [];
  };

  const handleWorkDepartmentToggle = (dept) => {
    if (!isEditingProfile) return;
    setUserData((prev) => {
      const current = getSelectedDepartments(prev);
      const exists = current.includes(dept);
      const next = exists ? current.filter((d) => d !== dept) : [...current, dept];

      const nextFirstPriority =
        next.length === 0
          ? ''
          : prev?.firstPriority && next.includes(prev.firstPriority)
            ? prev.firstPriority
            : next[0];

      return {
        ...prev,
        departments: next,
        firstPriority: nextFirstPriority,
        department: nextFirstPriority || next[0] || '',
      };
    });
  };

  const handleSetPrimaryDepartment = (dept) => {
    if (!isEditingProfile) return;
    setUserData((prev) => {
      const current = getSelectedDepartments(prev);
      const next = current.includes(dept) ? current : [dept, ...current];
      return {
        ...prev,
        departments: next,
        firstPriority: dept,
        department: dept,
      };
    });
  };

  const startEditProfile = () => {
    setError('');
    setSuccessMsg('');
    setUploadError('');
    setOriginalData(userData);
    setIsEditingProfile(true);
    setActiveTab('details');
  };

  const cancelEditProfile = () => {
    setError('');
    setSuccessMsg('');
    setUploadError('');
    setUserData(originalData);
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!userData?.id) return;
    setSaving(true);
    setError('');
    setSuccessMsg('');

    const selectedDepartments = getSelectedDepartments(userData);
    if (selectedDepartments.length === 0) {
      setError('Please select at least one work department.');
      setSaving(false);
      return;
    }

    try {
      const userRef = doc(db, 'users', userData.id);
      const { id, userType, createdAt, email, ...editable } = userData;

      const primaryDepartment =
        (editable.firstPriority && selectedDepartments.includes(editable.firstPriority)
          ? editable.firstPriority
          : selectedDepartments[0]) || 'videography';

      const normalizedEditable = {
        ...editable,
        departments: selectedDepartments,
        firstPriority: primaryDepartment,
        department: primaryDepartment,
      };

      await updateDoc(userRef, normalizedEditable);
      setUserData((prev) => (prev ? normalizeProfileData({ ...prev, ...normalizedEditable }) : prev));
      setSuccessMsg('Profile updated successfully.');
      setIsEditingProfile(false);
      setOriginalData((prev) => (prev ? normalizeProfileData({ ...prev, ...normalizedEditable }) : prev));
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const startChangePassword = () => {
    setPassError('');
    setPassSuccess('');
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setIsChangingPassword(true);
  };

  const cancelChangePassword = () => {
    setPassError('');
    setPassSuccess('');
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
  };

  const startChangeEmail = () => {
    setEmailError('');
    setEmailSuccess('');
    setEmailForm({ newEmail: userData?.email || '', currentPassword: '' });
    setIsChangingEmail(true);
  };

  const cancelChangeEmail = () => {
    setEmailError('');
    setEmailSuccess('');
    setEmailForm({ newEmail: '', currentPassword: '' });
    setIsChangingEmail(false);
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');

    const newEmail = (emailForm.newEmail || '').trim();
    if (!newEmail) {
      setEmailError('New email is required.');
      return;
    }

    const user = auth.currentUser;
    if (!user || !user.email) {
      setEmailError('You are not logged in.');
      return;
    }

    if (newEmail.toLowerCase() === user.email.toLowerCase()) {
      setEmailError('New email is the same as current email.');
      return;
    }

    if (!emailForm.currentPassword) {
      setEmailError('Current password is required to change email.');
      return;
    }

    setEmailSaving(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, emailForm.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);

      await updateDoc(doc(db, 'users', user.uid), { email: newEmail });

      setUserData((prev) => (prev ? { ...prev, email: newEmail } : prev));
      setOriginalData((prev) => (prev ? { ...prev, email: newEmail } : prev));
      setEmailSuccess('Email updated successfully.');
      setIsChangingEmail(false);
      setEmailForm({ newEmail: '', currentPassword: '' });
    } catch (err) {
      console.error(err);
      setEmailError(err?.message || 'Failed to update email.');
    } finally {
      setEmailSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (passwordForm.newPassword.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPassError('New password and confirm password do not match.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setPassError('You are not logged in.');
      return;
    }

    setPassSaving(true);
    try {
      await updatePassword(user, passwordForm.newPassword);
      setPassSuccess('Password updated successfully.');
      setIsChangingPassword(false);
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      setPassError(err.message || 'Failed to update password.');
    } finally {
      setPassSaving(false);
    }
  };

  const uploadAvatarFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setUploadError('Please drop or select a valid image file.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setUploadError('You are not logged in.');
      return;
    }

    setUploadError('');
    setUploadingImage(true);

    try {
      const path = `memberProfileImage/${user.uid}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { photoURL: downloadURL });

      setUserData((prev) => (prev ? { ...prev, photoURL: downloadURL } : prev));
      setSuccessMsg('Profile picture updated successfully.');
    } catch (err) {
      console.error(err);
      setUploadError('Failed to upload profile picture.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) await uploadAvatarFile(file);
    e.target.value = '';
  };

  const handleCopy = (key, text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1800);
  };

  const jumpToField = (fieldKey) => {
    setActiveTab('details');
    setIsEditingProfile(true);
    setShowChecklist(false);
    setTimeout(() => {
      const el = fieldRefs.current[fieldKey];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus?.();
      }
    }, 100);
  };

  const userType = userData?.userType === 'admin' ? 'admin' : 'user';
  const isTO = !!userData?.isTO;

  const completionChecklist = useMemo(() => {
    if (!userData) return [];
    return [
      { key: 'name', label: 'Full name', done: !!userData.name },
      { key: 'email', label: 'Email verified', done: !!userData.email },
      { key: 'phoneNo', label: 'Phone number', done: !!userData.phoneNo },
      { key: 'birthday', label: 'Birthday', done: !!userData.birthday },
      { key: 'gender', label: 'Gender', done: !!userData.gender },
      { key: 'registrationNumber', label: 'Registration no.', done: !!userData.registrationNumber },
      { key: 'batch', label: 'Batch', done: !!userData.batch },
      { key: 'studyDepartment', label: 'Study department', done: !!userData.studyDepartment },
      { key: 'departments', label: 'Work department(s)', done: getSelectedDepartments(userData).length > 0 },
      { key: 'firstPriority', label: 'Priority department', done: !!userData.firstPriority },
      { key: 'photoURL', label: 'Profile photo', done: !!userData.photoURL },
    ];
  }, [userData]);

  const profileCompletion = useMemo(() => {
    if (!completionChecklist.length) return 0;
    const completed = completionChecklist.filter((c) => c.done).length;
    return Math.round((completed / completionChecklist.length) * 100);
  }, [completionChecklist]);

  const passwordRules = useMemo(() => {
    const pass = passwordForm.newPassword;
    return [
      { label: '6+ chars', ok: pass.length >= 6 },
      { label: 'Uppercase', ok: /[A-Z]/.test(pass) },
      { label: 'Number', ok: /[0-9]/.test(pass) },
      {
        label: 'Matches',
        ok: pass.length > 0 && pass === passwordForm.confirmPassword,
      },
    ];
  }, [passwordForm.newPassword, passwordForm.confirmPassword]);

  const passwordStrength = useMemo(() => {
    const pass = passwordForm.newPassword;
    if (!pass) return { label: '', segments: 0, color: 'bg-gray-200' };
    const passed = [pass.length >= 6, pass.length >= 10, /[A-Z]/.test(pass), /[0-9]/.test(pass)].filter(Boolean).length;
    if (passed >= 4) return { label: 'Strong', segments: 4, color: 'bg-emerald-500' };
    if (passed >= 2) return { label: 'Medium', segments: 2, color: 'bg-amber-500' };
    return { label: 'Weak', segments: 1, color: 'bg-rose-500' };
  }, [passwordForm.newPassword]);

  // SVG Ring Constants
  const avatarRingSize = 112;
  const strokeWidth = 5;
  const radius = (avatarRingSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (profileCompletion / 100) * circumference;

  const inputClass =
    'w-full px-3 py-2 border rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400';

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, active: true });
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ rx: -py * 12, ry: px * 12 });
  };

  return (
    <div className={`-mx-3 -mt-4 -mb-8 min-h-screen transition-colors duration-300 sm:-mx-5 lg:-mx-6 2xl:-mx-10 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header userType={userType} isTO={isTO} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <FaUserCheck className="text-sm" /> Account & Identity
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white">
              Interactive Profile
            </h1>
          </div>

          {/* Interactive Tab Switcher */}
          {status === 'ready' && userData && (
            <div className="inline-flex p-1 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              {[
                { id: 'overview', label: 'Overview & ID', icon: FaBolt },
                { id: 'details', label: 'Details', icon: FaIdCard },
                { id: 'security', label: 'Security', icon: FaShieldAlt },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm scale-[1.02]'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                    }`}
                  >
                    <Icon className="text-xs" /> {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {status === 'loading' && (
          <div className="flex items-center gap-3 p-6 text-gray-500 dark:text-gray-400">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading profile information...</p>
          </div>
        )}

        {status === 'no-auth' && (
          <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 text-sm flex items-center gap-2">
            <FaExclamationCircle /> You are not logged in.
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
            <FaExclamationCircle /> Failed to load profile information.
          </div>
        )}

        {status === 'ready' && userData && (
          <>
            {/* Interactive Spotlight Hero Card */}
            <div
              id="profile-overview"
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={() => setSpotlight((prev) => ({ ...prev, active: false }))}
              className="relative rounded-2xl shadow-lg p-5 sm:p-6 mb-6 text-white overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
            >
              {/* Decorative SVG Grid Pattern */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.7" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
              </svg>

              {/* Pointer-tracking Spotlight Overlay */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: spotlight.active ? 1 : 0,
                  background: `radial-gradient(360px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.22), transparent 65%)`,
                }}
              />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Drag-and-Drop Avatar + SVG Progress Ring */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingOverAvatar(true);
                  }}
                  onDragLeave={() => setIsDraggingOverAvatar(false)}
                  onDrop={async (e) => {
                    e.preventDefault();
                    setIsDraggingOverAvatar(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) await uploadAvatarFile(file);
                  }}
                  className="relative flex-shrink-0 group"
                  title="Drag & drop an image or click camera to update"
                >
                  <svg
                    width={avatarRingSize}
                    height={avatarRingSize}
                    className="-rotate-90 drop-shadow-sm"
                  >
                    <circle
                      cx={avatarRingSize / 2}
                      cy={avatarRingSize / 2}
                      r={radius}
                      fill="transparent"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={strokeWidth}
                    />
                    <circle
                      cx={avatarRingSize / 2}
                      cy={avatarRingSize / 2}
                      r={radius}
                      fill="transparent"
                      stroke={isDraggingOverAvatar ? '#34d399' : '#ffffff'}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>

                  {/* Avatar Image Inside Ring */}
                  <button
                    type="button"
                    onClick={() => userData.photoURL && setShowAvatarModal(true)}
                    className={`absolute inset-2 rounded-full overflow-hidden flex items-center justify-center bg-white/15 transition-transform duration-300 ${
                      isDraggingOverAvatar ? 'scale-105 ring-4 ring-emerald-300' : 'group-hover:scale-[1.03]'
                    }`}
                  >
                    {userData.photoURL ? (
                      <img
                        src={userData.photoURL}
                        alt={userData.name || 'Profile'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-extrabold text-white">
                        {(userData.name || 'U').charAt(0).toUpperCase()}
                      </span>
                    )}
                    {userData.photoURL && (
                      <span className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                        <FaExpand />
                      </span>
                    )}
                  </button>

                  {/* Upload Camera Button */}
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition border border-blue-100 flex items-center justify-center"
                    title="Upload new photo"
                  >
                    {uploadingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaCamera className="text-sm" />
                    )}
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* User Summary + Interactive Completion Pill */}
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                        {userData.name || 'Unnamed user'}
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-blue-100">
                        <button
                          type="button"
                          onClick={() => handleCopy('email', userData.email)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-2.5 py-1 transition"
                          title="Click to copy email"
                        >
                          <FaEnvelope />
                          <span>{userData.email}</span>
                          {copiedKey === 'email' ? (
                            <FaCheck className="text-emerald-300" />
                          ) : (
                            <FaCopy className="opacity-70" />
                          )}
                        </button>
                        {userData.registrationNumber && (
                          <button
                            type="button"
                            onClick={() => handleCopy('reg', userData.registrationNumber)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-2.5 py-1 transition"
                            title="Click to copy registration number"
                          >
                            <FaIdCard />
                            <span>{userData.registrationNumber}</span>
                            {copiedKey === 'reg' ? (
                              <FaCheck className="text-emerald-300" />
                            ) : (
                              <FaCopy className="opacity-70" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 bg-white/15 text-xs font-bold uppercase tracking-wider">
                        {userData.userType || 'user'}
                      </span>
                      {isTO && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-100 text-xs font-bold">
                          TO
                        </span>
                      )}
                    </div>
                  </div>

                  {uploadError && (
                    <p className="text-xs text-red-200 mt-2 flex items-center gap-1 justify-center sm:justify-start">
                      <FaExclamationCircle /> {uploadError}
                    </p>
                  )}

                  {/* Clickable Completion Bar */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setShowChecklist((prev) => !prev)}
                      className="w-full text-left group"
                    >
                      <div className="mb-1 flex items-center justify-between text-xs text-blue-100 font-medium">
                        <span className="flex items-center gap-1.5">
                          Profile completion
                          <span className="underline decoration-dotted opacity-80 group-hover:opacity-100">
                            ({showChecklist ? 'hide checklist' : 'view checklist'})
                          </span>
                        </span>
                        <span className="font-bold">{profileCompletion}%</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/20 p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-white transition-all duration-700 ease-out"
                          style={{ width: `${profileCompletion}%` }}
                        />
                      </div>
                    </button>

                    {/* Expandable Interactive Checklist */}
                    {showChecklist && (
                      <div className="mt-3 p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {completionChecklist.map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => !item.done && jumpToField(item.key)}
                            className={`text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition ${
                              item.done
                                ? 'bg-emerald-500/20 text-emerald-100 cursor-default'
                                : 'bg-white/10 hover:bg-white/25 text-white cursor-pointer'
                            }`}
                          >
                            {item.done ? (
                              <FaCheckCircle className="text-emerald-300 flex-shrink-0" />
                            ) : (
                              <FaExclamationCircle className="text-amber-300 flex-shrink-0" />
                            )}
                            <span className="truncate">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interactive Department Badges */}
                  <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                    {getSelectedDepartments(userData).map((dept) => {
                      const meta = DEPARTMENT_META[dept] || {};
                      const Icon = meta.icon || FaUser;
                      const isPrimary = userData.firstPriority === dept;
                      return (
                        <span
                          key={dept}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                        >
                          <Icon className="text-xs" />
                          {formatWorkDepartmentLabel(dept)}
                          {isPrimary && (
                            <FaStar className="text-amber-300 text-[10px]" title="Primary department" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 1: OVERVIEW & INTERACTIVE 3D MEMBER PASS */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* Interactive 3D Tilt & Flip Digital ID Card */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <FaIdCard className="text-blue-600 dark:text-blue-400" /> Interactive Member Pass
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsCardFlipped((f) => !f)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <FaSyncAlt className={isCardFlipped ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'} />
                      {isCardFlipped ? 'Show Front' : 'Flip Card'}
                    </button>
                  </div>

                  <div
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={() => setCardTilt({ rx: 0, ry: 0 })}
                    onClick={() => setIsCardFlipped((f) => !f)}
                    className="cursor-pointer select-none"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className="relative w-full h-60 transition-transform duration-300 ease-out"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry + (isCardFlipped ? 180 : 0)}deg)`,
                      }}
                    >
                      {/* Front of Pass */}
                      <div
                        className="absolute inset-0 rounded-2xl p-5 text-white shadow-xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 border border-white/15 flex flex-col justify-between overflow-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-blue-300 font-bold">
                              TMV DIGITAL PASS
                            </p>
                            <p className="text-lg font-extrabold mt-0.5">{userData.name || 'Member'}</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-500/30 border border-blue-300/30">
                            {userData.studyDepartment || 'DEPT'} • {userData.batch || '--'}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          {userData.photoURL ? (
                            <img
                              src={userData.photoURL}
                              alt="ID"
                              className="w-16 h-16 rounded-xl object-cover border-2 border-white/30"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-2xl font-bold">
                              {(userData.name || 'U').charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="text-xs space-y-1 text-blue-100">
                            <p>
                              <span className="text-blue-300">Reg No:</span>{' '}
                              <span className="font-semibold text-white">
                                {userData.registrationNumber || 'Not set'}
                              </span>
                            </p>
                            <p>
                              <span className="text-blue-300">Primary:</span>{' '}
                              <span className="font-semibold text-white">
                                {formatWorkDepartmentLabel(userData.firstPriority || 'videography')}
                              </span>
                            </p>
                            <p>
                              <span className="text-blue-300">Phone:</span>{' '}
                              <span className="font-semibold text-white">{userData.phoneNo || 'Not set'}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-blue-200/80 border-t border-white/10 pt-2">
                          <span>Hover to tilt • Click to flip</span>
                          <span className="font-mono">{userData.id?.slice(0, 8)?.toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Back of Pass (SVG QR/Barcode Graphic) */}
                      <div
                        className="absolute inset-0 rounded-2xl p-5 text-white shadow-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-white/15 flex flex-col justify-between"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold tracking-widest text-blue-300">VERIFICATION CODE</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                            Active Member
                          </span>
                        </div>

                        {/* Decorative SVG Matrix Barcode */}
                        <div className="flex items-center gap-4 bg-white/95 text-slate-900 p-3 rounded-xl">
                          <svg viewBox="0 0 60 60" className="w-16 h-16 flex-shrink-0">
                            <rect width="60" height="60" fill="#ffffff" />
                            <rect x="4" y="4" width="16" height="16" fill="#0f172a" />
                            <rect x="7" y="7" width="10" height="10" fill="#ffffff" />
                            <rect x="10" y="10" width="4" height="4" fill="#0f172a" />
                            <rect x="40" y="4" width="16" height="16" fill="#0f172a" />
                            <rect x="43" y="7" width="10" height="10" fill="#ffffff" />
                            <rect x="46" y="10" width="4" height="4" fill="#0f172a" />
                            <rect x="4" y="40" width="16" height="16" fill="#0f172a" />
                            <rect x="7" y="43" width="10" height="10" fill="#ffffff" />
                            <rect x="10" y="46" width="4" height="4" fill="#0f172a" />
                            <rect x="24" y="8" width="4" height="12" fill="#0f172a" />
                            <rect x="32" y="12" width="4" height="16" fill="#0f172a" />
                            <rect x="24" y="26" width="12" height="6" fill="#0f172a" />
                            <rect x="42" y="28" width="12" height="6" fill="#0f172a" />
                            <rect x="26" y="38" width="10" height="14" fill="#0f172a" />
                            <rect x="42" y="40" width="12" height="12" fill="#0f172a" />
                          </svg>
                          <div className="text-xs space-y-1 min-w-0">
                            <p className="font-bold truncate">{userData.email}</p>
                            <p className="text-slate-600">
                              Departments: {getSelectedDepartments(userData).length}
                            </p>
                            <p className="text-[11px] font-mono text-slate-500 truncate">
                              UID: {userData.id}
                            </p>
                          </div>
                        </div>

                        <p className="text-[11px] text-center text-blue-200/70">
                          Click anywhere on card to flip back
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Stats & Actions */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Departments</span>
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 my-1">
                      {getSelectedDepartments(userData).length}
                    </div>
                    <button
                      type="button"
                      onClick={startEditProfile}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline text-left"
                    >
                      Manage teams →
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Profile Score</span>
                    <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 my-1">
                      {profileCompletion}%
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowChecklist(true)}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline text-left"
                    >
                      Inspect fields →
                    </button>
                  </div>

                  <div className="col-span-2 rounded-2xl bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">Quick Contact Copy</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userData.phoneNo || 'No phone number saved yet'}
                      </p>
                    </div>
                    {userData.phoneNo ? (
                      <button
                        type="button"
                        onClick={() => handleCopy('phone', userData.phoneNo)}
                        className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-100 transition"
                      >
                        {copiedKey === 'phone' ? <FaCheck /> : <FaCopy />}
                        {copiedKey === 'phone' ? 'Copied!' : 'Copy Phone'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => jumpToField('phoneNo')}
                        className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                      >
                        Add Phone
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE DETAILS & INTERACTIVE DEPARTMENT CARDS */}
            {activeTab === 'details' && (
              <form
                id="profile-details"
                onSubmit={handleSaveProfile}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/60 p-5 sm:p-6 mb-6 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FaIdCard className="text-blue-600 dark:text-blue-400" /> Personal & Work Details
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Click Edit Profile to customize your fields and department cards.
                    </p>
                  </div>
                  {!isEditingProfile ? (
                    <button
                      type="button"
                      onClick={startEditProfile}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold transition shadow-sm"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold transition disabled:opacity-50 shadow-sm"
                      >
                        <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditProfile}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 text-sm font-semibold transition"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2"><FaExclamationCircle /> {error}</span>
                    <button type="button" onClick={() => setError('')}><FaTimes className="text-xs" /></button>
                  </div>
                )}
                {successMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2"><FaCheckCircle /> {successMsg}</span>
                    <button type="button" onClick={() => setSuccessMsg('')}><FaTimes className="text-xs" /></button>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                      <FaUser /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                          ref={(el) => (fieldRefs.current.name = el)}
                          type="text"
                          name="name"
                          value={userData.name || ''}
                          onChange={handleFieldChange}
                          className={inputClass}
                          disabled={!isEditingProfile}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={userData.email || ''}
                          className={`${inputClass} bg-gray-100 dark:bg-gray-900/50 cursor-not-allowed text-gray-500`}
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                        <input
                          ref={(el) => (fieldRefs.current.phoneNo = el)}
                          type="tel"
                          name="phoneNo"
                          value={userData.phoneNo || ''}
                          onChange={handleFieldChange}
                          className={inputClass}
                          disabled={!isEditingProfile}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Birthday</label>
                        <input
                          ref={(el) => (fieldRefs.current.birthday = el)}
                          type="date"
                          name="birthday"
                          value={userData.birthday || ''}
                          onChange={handleFieldChange}
                          className={inputClass}
                          disabled={!isEditingProfile}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                        <select
                          ref={(el) => (fieldRefs.current.gender = el)}
                          name="gender"
                          value={userData.gender || 'male'}
                          onChange={handleFieldChange}
                          className={inputClass}
                          disabled={!isEditingProfile}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Registration Number</label>
                        <input
                          ref={(el) => (fieldRefs.current.registrationNumber = el)}
                          type="text"
                          name="registrationNumber"
                          value={userData.registrationNumber || ''}
                          onChange={handleFieldChange}
                          className={inputClass}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Visual Department Cards */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                      <FaGraduationCap /> Academic & Interactive Department Cards
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Batch</label>
                        <select
                          ref={(el) => (fieldRefs.current.batch = el)}
                          name="batch"
                          value={userData.batch || '20/21'}
                          onChange={handleFieldChange}
                          className={inputClass}
                          disabled={!isEditingProfile}
                        >
                          <option value="20/21">20/21</option>
                          <option value="21/22">21/22</option>
                          <option value="22/23">22/23</option>
                          <option value="23/24">23/24</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Study Department</label>
                        <select
                          ref={(el) => (fieldRefs.current.studyDepartment = el)}
                          name="studyDepartment"
                          value={userData.studyDepartment || 'ITT'}
                          onChange={handleFieldChange}
                          className={inputClass}
                          disabled={!isEditingProfile}
                        >
                          <option value="ITT">ITT</option>
                          <option value="EET">EET</option>
                          <option value="MTT">MTT</option>
                          <option value="BPT">BPT</option>
                          <option value="Food">Food</option>
                        </select>
                      </div>
                    </div>

                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Work Departments {isEditingProfile && '(Click card to toggle • Click star for 1st priority)'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {WORK_DEPARTMENTS.map((dept) => {
                        const selected = getSelectedDepartments(userData).includes(dept);
                        const isPrimary = userData.firstPriority === dept;
                        const meta = DEPARTMENT_META[dept] || {};
                        const Icon = meta.icon || FaUser;

                        return (
                          <div
                            key={dept}
                            onClick={() => isEditingProfile && handleWorkDepartmentToggle(dept)}
                            className={`relative rounded-xl p-3.5 border transition-all duration-200 flex items-center justify-between ${
                              isEditingProfile ? 'cursor-pointer hover:-translate-y-0.5' : ''
                            } ${
                              selected
                                ? `bg-blue-50/70 dark:bg-blue-900/20 border-blue-500 shadow-sm ring-1 ${meta.ring || 'ring-blue-400'}`
                                : 'bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700 opacity-75'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${
                                  meta.accent || 'from-blue-500 to-indigo-600'
                                }`}
                              >
                                <Icon className="text-sm" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-800 dark:text-white">
                                  {formatWorkDepartmentLabel(dept)}
                                </p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                  {isPrimary ? '1st Priority' : selected ? 'Active' : 'Not selected'}
                                </p>
                              </div>
                            </div>

                            {selected && (
                              <button
                                type="button"
                                disabled={!isEditingProfile}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetPrimaryDepartment(dept);
                                }}
                                title={isPrimary ? 'Primary Department' : 'Set as 1st Priority'}
                                className={`p-1.5 rounded-lg transition ${
                                  isPrimary
                                    ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/30'
                                    : 'text-gray-400 hover:text-amber-500'
                                }`}
                              >
                                <FaStar className="text-sm" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 3: SECURITY (EMAIL & PASSWORD) */}
            {activeTab === 'security' && (
              <div className="space-y-6 mb-6">
                {/* Change Email Card */}
                <div
                  id="email-security"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/60 p-5 sm:p-6 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FaEnvelope className="text-blue-600 dark:text-blue-400" /> Change Email
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Update your account primary email.</p>
                    </div>
                    {!isChangingEmail ? (
                      <button
                        type="button"
                        onClick={startChangeEmail}
                        className="text-xs px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                      >
                        Change Email
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={cancelChangeEmail}
                        className="text-xs px-3.5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {emailError && (
                    <div className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><FaExclamationCircle /> {emailError}</span>
                      <button type="button" onClick={() => setEmailError('')}><FaTimes className="text-xs" /></button>
                    </div>
                  )}
                  {emailSuccess && (
                    <div className="mt-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><FaCheckCircle /> {emailSuccess}</span>
                      <button type="button" onClick={() => setEmailSuccess('')}><FaTimes className="text-xs" /></button>
                    </div>
                  )}

                  {isChangingEmail && (
                    <form onSubmit={handleEmailChange} className="space-y-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">New Email Address</label>
                        <input
                          type="email"
                          value={emailForm.newEmail}
                          onChange={(e) =>
                            setEmailForm((prev) => ({ ...prev, newEmail: e.target.value }))
                          }
                          className={inputClass}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.emailCurrent ? 'text' : 'password'}
                            value={emailForm.currentPassword}
                            onChange={(e) =>
                              setEmailForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                            }
                            className={`${inputClass} pr-10`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((prev) => ({ ...prev, emailCurrent: !prev.emailCurrent }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            {showPassword.emailCurrent ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={emailSaving}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold text-sm transition disabled:opacity-50 shadow-sm"
                      >
                        {emailSaving ? 'Updating...' : 'Update Email'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Change Password Card */}
                <div
                  id="password-security"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/60 p-5 sm:p-6 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600 dark:text-blue-400" /> Change Password
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Live strength meter and validation rules.</p>
                    </div>
                    {!isChangingPassword ? (
                      <button
                        type="button"
                        onClick={startChangePassword}
                        className="text-xs px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                      >
                        Change Password
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={cancelChangePassword}
                        className="text-xs px-3.5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {passError && (
                    <div className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><FaExclamationCircle /> {passError}</span>
                      <button type="button" onClick={() => setPassError('')}><FaTimes className="text-xs" /></button>
                    </div>
                  )}
                  {passSuccess && (
                    <div className="mt-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><FaCheckCircle /> {passSuccess}</span>
                      <button type="button" onClick={() => setPassSuccess('')}><FaTimes className="text-xs" /></button>
                    </div>
                  )}

                  {isChangingPassword && (
                    <form onSubmit={handlePasswordChange} className="space-y-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.newPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                            }
                            className={`${inputClass} pr-10`}
                            minLength={6}
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((prev) => ({ ...prev, newPassword: !prev.newPassword }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                            }
                            className={`${inputClass} pr-10`}
                            minLength={6}
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Segmented Strength Meter + Live Rule Pills */}
                      {passwordForm.newPassword && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Strength</span>
                            <span className="font-bold">{passwordStrength.label}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[1, 2, 3, 4].map((seg) => (
                              <div
                                key={seg}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  seg <= passwordStrength.segments
                                    ? passwordStrength.color
                                    : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {passwordRules.map((rule) => (
                              <span
                                key={rule.label}
                                className={`text-[11px] px-2 py-0.5 rounded-full border transition ${
                                  rule.ok
                                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500'
                                }`}
                              >
                                {rule.ok ? '✓ ' : '• '}
                                {rule.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={passSaving}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold text-sm transition disabled:opacity-50 shadow-sm"
                      >
                        {passSaving ? 'Updating...' : 'Update Password'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Logout Action */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition shadow-sm"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>

            {/* Avatar Lightbox Preview Modal */}
            {showAvatarModal && userData.photoURL && (
              <div
                onClick={() => setShowAvatarModal(false)}
                className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{userData.name}</p>
                    <button
                      type="button"
                      onClick={() => setShowAvatarModal(false)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <img
                    src={userData.photoURL}
                    alt={userData.name || 'Profile'}
                    className="w-full h-72 object-cover rounded-xl mb-3"
                  />
                  <label
                    htmlFor="avatar-upload-modal"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition"
                  >
                    <FaUpload /> Upload New Photo
                    <input
                      id="avatar-upload-modal"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        await handleProfileImageChange(e);
                        setShowAvatarModal(false);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;