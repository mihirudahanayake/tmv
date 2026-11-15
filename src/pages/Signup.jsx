import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';
import {
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaCheck,
  FaUserPlus,
  FaShieldAlt,
  FaSpinner,
  FaCamera,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  reload,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';
import { WORK_DEPARTMENTS, formatWorkDepartmentLabel } from '../constants/workDepartments';

// Configure emails that should get elevated roles.
// - departmentHead: can manage and assign work inside their managed department(s)
// - superAdmin: read-only across all departments
const DEPT_HEAD_EMAILS = ['mihirudahanayake@gmail.com'];
const SUPER_ADMIN_EMAILS = [];
const normalizeEmail = (email = '') => email.trim().toLowerCase();

const FieldError = ({ id, message }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
      {message}
    </p>
  ) : null;

const Signup = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phoneNo: '',
    // work departments as array
    departments: ['videography'],
    batch: '20/21',
    studyDepartment: 'ITT',
    gender: '',
    registrationNumber: '',
    cardNumber: '',
    NFC_card_id: '',
    birthday: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [info, setInfo] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [profilePictureError, setProfilePictureError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sendingVerificationEmail, setSendingVerificationEmail] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [verificationEmailSentTo, setVerificationEmailSentTo] = useState('');
  const [passwordAtVerification, setPasswordAtVerification] = useState('');

  useEffect(() => {
    if (!profilePicture) {
      setProfilePicturePreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(profilePicture);
    setProfilePicturePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [profilePicture]);

  const requiredValues = [
    form.name,
    form.username,
    form.email,
    form.phoneNo,
    form.birthday,
    form.gender,
    form.batch,
    form.studyDepartment,
    form.registrationNumber,
    form.password,
    form.confirmPassword,
  ];
  const completedFields =
    requiredValues.filter((value) => String(value).trim()).length
    + (form.departments.length ? 1 : 0);
  const completionPercent = Math.round((completedFields / 12) * 100);
  const passwordChecks = [
    { label: 'At least 6 characters', passed: form.password.length >= 6 },
    { label: 'Uppercase and lowercase', passed: /[a-z]/.test(form.password) && /[A-Z]/.test(form.password) },
    { label: 'A number or symbol', passed: /[\d\W]/.test(form.password) },
  ];
  const passwordStrength = passwordChecks.filter((check) => check.passed).length;
  const passwordsMatch =
    form.confirmPassword.length > 0 && form.password === form.confirmPassword;

  const validateField = (name, value) => {
    const trimmedValue = typeof value === 'string' ? value.trim() : '';
    if (name === 'name' && !trimmedValue) return 'Please enter your name.';
    if (name === 'username') {
      if (!trimmedValue) return 'Please choose a username.';
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
      if (!trimmedValue) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return 'Enter a valid email address.';
      }
    }
    if (name === 'phoneNo') {
      if (!trimmedValue) return 'Please enter your phone number.';
      if (!/^\d{10}$/.test(trimmedValue)) return 'Enter a valid 10-digit phone number.';
    }
    if (name === 'birthday' && !value) return 'Please enter your birthday.';
    if (name === 'gender' && !value) return 'Please select your gender.';
    if (name === 'batch' && !value) return 'Please choose your batch.';
    if (name === 'studyDepartment' && !value) return 'Please choose your study department.';
    if (name === 'registrationNumber' && !trimmedValue) {
      return 'Please enter your registration number.';
    }
    if (name === 'departments' && form.departments.length === 0) {
      return 'Choose at least one work department.';
    }
    if (name === 'password') {
      if (!value) return 'Please create a password.';
      if (value.length < 6) return 'Use at least 6 characters.';
    }
    if (name === 'confirmPassword') {
      if (!value) return 'Please confirm your password.';
      if (value !== form.password) return 'These passwords do not match.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email' && normalizeEmail(value) !== normalizeEmail(form.email)) {
      setVerifiedEmail('');
    }
    setError('');
    setInfo('');
    setFieldErrors((previous) => {
      const next = { ...previous, [name]: '' };
      if (name === 'password' && form.confirmPassword) {
        next.confirmPassword =
          value === form.confirmPassword ? '' : 'These passwords do not match.';
      }
      if (name === 'confirmPassword' && value) {
        next.confirmPassword = validateField(name, value);
      }
      return next;
    });
  };

  const handlePhoneChange = (e) => {
    const phoneNo = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((previous) => ({ ...previous, phoneNo }));
    setError('');
    setInfo('');
    setFieldErrors((previous) => ({ ...previous, phoneNo: '' }));
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setFieldErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }));
  };

  const handleEmailVerification = async () => {
    setError('');
    setInfo('');

    const email = form.email.trim();
    const emailError = validateField('email', email);
    if (emailError) {
      setFieldErrors((previous) => ({ ...previous, email: emailError }));
      document.querySelector('[name="email"]')?.focus();
      return;
    }

    const passwordError = validateField('password', form.password);
    if (passwordError) {
      setFieldErrors((previous) => ({
        ...previous,
        email: '',
        password: passwordError === 'Please create a password.'
          ? 'Create a password before sending a verification email.'
          : passwordError,
      }));
      document.querySelector('[name="password"]')?.focus();
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    setFieldErrors((previous) => ({ ...previous, email: '', password: '' }));
    setSendingVerificationEmail(true);
    try {
      let user = auth.currentUser;
      if (user && normalizeEmail(user.email || '') !== normalizedEmail) {
        await signOut(auth);
        user = null;
      }

      if (user) {
        await reload(user);
        const existingProfile = await getDoc(doc(db, 'users', user.uid));
        if (existingProfile.exists()) {
          setFieldErrors((previous) => ({
            ...previous,
            email: 'An account with this email already exists. Log in instead.',
          }));
          document.querySelector('[name="email"]')?.focus();
          return;
        }

        if (user.emailVerified) {
          setVerifiedEmail(normalizedEmail);
          setVerificationEmailSentTo(normalizedEmail);
          setInfo('This email is already verified. Complete the rest of the form to create your account.');
          return;
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
        user = userCredential.user;
        setPasswordAtVerification(form.password);
      }

      await sendEmailVerification(user);
      setVerificationEmailSentTo(normalizedEmail);
      setVerifiedEmail('');
      setInfo(`A verification email was sent to ${email}. Open the link, then return here to finish signup.`);
    } catch (verificationError) {
      console.error('Failed to send signup email verification.', verificationError);
      if (verificationError.code === 'auth/email-already-in-use') {
        setFieldErrors((previous) => ({
          ...previous,
          email: 'An account with this email already exists. Log in instead.',
        }));
        document.querySelector('[name="email"]')?.focus();
      } else if (verificationError.code === 'auth/weak-password') {
        setFieldErrors((previous) => ({
          ...previous,
          password: 'Choose a stronger password with at least 6 characters.',
        }));
        document.querySelector('[name="password"]')?.focus();
      } else {
        setError(
          verificationError.code === 'auth/invalid-email'
            ? 'That email address does not look valid. Check it and try again.'
            : verificationError.code === 'auth/operation-not-allowed'
              ? 'Email/password signup is not enabled for this app. Please contact an administrator.'
              : verificationError.code === 'auth/too-many-requests'
                ? 'Too many verification requests were made. Please wait a moment and try again.'
                : verificationError.code === 'auth/network-request-failed'
                  ? 'We could not connect. Check your internet connection and try again.'
                  : 'We could not send a verification email right now. Please try again in a moment.'
        );
      }
    } finally {
      setSendingVerificationEmail(false);
    }
  };

  const handleDepartmentToggle = (value) => {
    setForm((prev) => {
      const exists = prev.departments.includes(value);
      const next = exists
        ? prev.departments.filter((d) => d !== value)
        : [...prev.departments, value];

      return { ...prev, departments: next };
    });
    setError('');
    setFieldErrors((previous) => ({
      ...previous,
      departments: form.departments.includes(value) && form.departments.length === 1
        ? 'Choose at least one work department.'
        : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    const fieldsToValidate = [
      'name',
      'username',
      'email',
      'phoneNo',
      'birthday',
      'gender',
      'batch',
      'studyDepartment',
      'registrationNumber',
      'departments',
      'password',
      'confirmPassword',
    ];
    const nextFieldErrors = Object.fromEntries(
      fieldsToValidate
        .map((field) => [
          field,
          validateField(field, field === 'departments' ? form.departments : form[field]),
        ])
        .filter(([, message]) => message)
    );
    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length) {
      const firstInvalidField = fieldsToValidate.find((field) => nextFieldErrors[field]);
      document.querySelector(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    if (passwordAtVerification && form.password !== passwordAtVerification) {
      setFieldErrors((previous) => ({
        ...previous,
        password: 'Use the password you entered when sending the verification email.',
      }));
      document.querySelector('[name="password"]')?.focus();
      return;
    }

    const normalizedEmail = normalizeEmail(form.email);
    const user = auth.currentUser;
    if (
      !user
      || normalizeEmail(user.email || '') !== normalizedEmail
    ) {
      setError('Send a verification email to this address before creating your account.');
      document.querySelector('[name="email"]')?.focus();
      return;
    }

    setLoading(true);
    let profilePictureWarning = '';
    try {
      const username = form.username.trim().replace(/\s+/g, ' ');

      await reload(user);
      if (!user.emailVerified) {
        setVerifiedEmail('');
        setError('Your email is not verified yet. Open the verification link and try again.');
        return;
      }
      setVerifiedEmail(normalizedEmail);

      const existingProfile = await getDoc(doc(db, 'users', user.uid));
      if (existingProfile.exists()) {
        await signOut(auth);
        setVerifiedEmail('');
        setError('An account with this email already exists. Log in instead.');
        return;
      }

      await updateProfile(user, { displayName: username });

      let role = 'member';
      let managedDepartments = [];
      if (SUPER_ADMIN_EMAILS.includes(user.email)) {
        role = 'superAdmin';
      } else if (DEPT_HEAD_EMAILS.includes(user.email)) {
        role = 'departmentHead';
        managedDepartments = ['videography'];
      }

      const userType = role === 'departmentHead' ? 'admin' : role === 'superAdmin' ? 'superAdmin' : 'user';

      await setDoc(doc(db, 'users', user.uid), {
        username,
        name: username,
        fullName: form.name.trim(),
        email: user.email || form.email,
        phoneNo: form.phoneNo,
        departments: form.departments,
        firstPriority: form.departments[0] || 'videography',
        department: form.departments[0] || 'videography',
        role,
        managedDepartments,
        batch: form.batch,
        studyDepartment: form.studyDepartment,
        gender: form.gender,
        registrationNumber: form.registrationNumber,
        cardNumber: form.cardNumber || null,
        NFC_card_id: form.NFC_card_id || null,
        birthday: form.birthday || null,
        photoURL: null,
        userType,
        createdAt: new Date().toISOString()
      });

      if (profilePicture) {
        let uploadedProfilePictureRef = null;
        try {
          const picturePath = `memberProfileImage/${user.uid}/signup-${Date.now()}-${profilePicture.name}`;
          const uploadSnapshot = await uploadBytes(ref(storage, picturePath), profilePicture);
          uploadedProfilePictureRef = uploadSnapshot.ref;
          const photoURL = await getDownloadURL(uploadSnapshot.ref);
          await updateDoc(doc(db, 'users', user.uid), { photoURL });
        } catch (pictureError) {
          console.error('Failed to upload the signup profile picture.', pictureError);
          if (uploadedProfilePictureRef) {
            try {
              await deleteObject(uploadedProfilePictureRef);
            } catch (cleanupError) {
              console.error('Failed to clean up an incomplete signup profile picture.', cleanupError);
            }
          }
          profilePictureWarning =
            ' Your account was created, but the profile picture could not be uploaded. You can add it later from your profile.';
        }
      }

      await signOut(auth);
      navigate('/login', {
        state: {
          info: `Your email is verified and your account has been created. You can now log in.${profilePictureWarning}`,
        },
      });
    } catch (err) {
      const friendlyErrors = {
        'auth/email-already-in-use': 'An account with this email already exists. Log in instead.',
        'auth/invalid-email': 'That email address does not look valid. Check it and try again.',
        'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
        'auth/network-request-failed': 'We could not connect. Check your internet connection and try again.',
      };
      const fieldByErrorCode = {
        'auth/email-already-in-use': 'email',
        'auth/invalid-email': 'email',
        'auth/weak-password': 'password',
      };
      const invalidField = fieldByErrorCode[err.code];
      if (invalidField) {
        setFieldErrors((previous) => ({
          ...previous,
          [invalidField]: friendlyErrors[err.code],
        }));
        document.querySelector(`[name="${invalidField}"]`)?.focus();
      } else {
        console.error('Signup failed.', err);
        setError(
          err.code === 'permission-denied'
            ? 'We could not save your account profile. Please contact an administrator to confirm this account can register.'
            : friendlyErrors[err.code]
              || 'We could not create your account right now. Please try again in a moment.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isDeptSelected = (value) => form.departments.includes(value);
  const isEmailVerified = Boolean(verifiedEmail) && verifiedEmail === normalizeEmail(form.email);
  const labelClass = `mb-1.5 block text-sm font-semibold ${
    isDarkMode ? 'text-slate-200' : 'text-slate-700'
  }`;
  const inputClass = `w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition hover:-translate-y-0.5 hover:shadow-sm focus:ring-4 ${
    isDarkMode
      ? 'border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-500/15'
      : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/10'
  }`;
  const strengthLabel = ['Add a password', 'Getting started', 'Good', 'Strong'][passwordStrength];
  const strengthColor = [
    'bg-slate-300',
    'bg-rose-500',
    'bg-amber-500',
    'bg-emerald-500',
  ][passwordStrength];

  return (
    <div className={`relative min-h-screen overflow-x-clip px-3 pb-3 pt-20 transition-colors duration-300 sm:px-6 sm:pb-4 sm:pt-24 lg:pb-6 lg:pt-10 ${
      isDarkMode
        ? 'bg-slate-950 text-slate-100'
        : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-slate-900'
    }`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl ${
          isDarkMode ? 'bg-indigo-700/20' : 'bg-indigo-300/40'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 -right-20 h-80 w-80 rounded-full blur-3xl ${
          isDarkMode ? 'bg-cyan-700/20' : 'bg-cyan-200/60'
        }`}
      />

      <div className={`fixed left-3 right-3 top-4 z-20 grid h-12 min-w-0 grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center rounded-2xl border px-1.5 shadow-lg backdrop-blur-md sm:left-6 sm:right-6 sm:top-6 lg:hidden ${
        isDarkMode
          ? 'border-slate-700/70 bg-slate-900/70'
          : 'border-white/70 bg-white/70'
      }`}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
            isDarkMode
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              : 'bg-white text-slate-600 shadow-sm hover:bg-indigo-50'
          }`}
          aria-label="Back to welcome"
          title="Back to welcome"
        >
          <FaArrowLeft />
        </button>
        <h1 className={`min-w-0 truncate text-center text-base font-bold sm:text-lg ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Create your account
        </h1>
        <button
          type="button"
          onClick={toggleDarkMode}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm transition hover:scale-105 ${
            isDarkMode
              ? 'bg-slate-800 text-amber-300 hover:bg-slate-700'
              : 'bg-white text-indigo-600 hover:bg-indigo-50'
          }`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <button
        type="button"
        onClick={toggleDarkMode}
        className={`fixed right-6 top-6 z-20 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg transition hover:scale-105 lg:flex ${
          isDarkMode
            ? 'bg-slate-800 text-amber-300 hover:bg-slate-700'
            : 'bg-white text-indigo-600 hover:bg-indigo-50'
        }`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <main className="relative mx-auto grid w-full min-w-0 max-w-6xl items-stretch gap-4 sm:gap-5 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="relative hidden overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-600 p-8 text-white shadow-2xl lg:flex lg:flex-col lg:justify-between xl:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-20 h-72 w-72 rounded-full border-[40px] border-white/10"
          />
          <div className="relative">
            <div className="flex items-start justify-between gap-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                <FaArrowLeft />
                Back to welcome
              </button>

              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl shadow-lg ring-1 ring-white/20">
                <FaUserPlus />
              </div>
            </div>
            <p className="mt-12 text-xs font-bold uppercase tracking-[0.28em] text-cyan-100">
              Welcome to TMS
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight xl:text-5xl">
              Your next great idea starts here.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-blue-50">
              Create your account to join your team, receive assignments, and keep your creative work organized.
            </p>

            <div className="mt-10 space-y-4">
              {[
                ['01', 'Add your details'],
                ['02', 'Choose your work teams'],
                ['03', 'Secure your account'],
                ['04', 'Verify your email'],
              ].map(([number, text]) => (
                <div key={number} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-xs font-bold ring-1 ring-white/20">
                    {number}
                  </span>
                  <span className="text-sm font-medium text-white/90">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="relative mt-10 text-xs text-blue-100/80">
            A few details now, then you’re ready to get started.
          </p>
        </aside>

        <section className={`min-w-0 rounded-2xl border p-4 shadow-2xl transition-colors duration-300 sm:rounded-[28px] sm:p-8 lg:p-10 ${
          isDarkMode
            ? 'border-slate-800 bg-slate-900/95 shadow-black/30'
            : 'border-white/80 bg-white/95 shadow-slate-900/10'
        }`}>
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <div className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                isDarkMode ? 'bg-indigo-400/10 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
              }`}>
                <FaShieldAlt />
                Secure account setup
              </div>
              <h2 className={`hidden text-2xl font-bold tracking-tight sm:text-3xl lg:block ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Create your account
              </h2>
              <p className={`mt-2 text-sm leading-6 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Tell us a little about yourself. You can update your profile later.
              </p>
            </div>
          </div>

          <div className="mb-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                Signup progress
              </span>
              <span className={isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}>
                {completionPercent}% complete
              </span>
            </div>
            <div
              className={`h-2 overflow-hidden rounded-full ${
                isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
              }`}
              role="progressbar"
              aria-label="Signup progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completionPercent}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {error ? (
            <div
              role="alert"
              className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${
                isDarkMode
                  ? 'border-rose-900/70 bg-rose-950/50 text-rose-200'
                  : 'border-rose-200 bg-rose-50 text-rose-700'
              }`}
            >
              {error}
            </div>
          ) : null}
          {info ? (
            <div
              role="status"
              className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${
                isDarkMode
                  ? 'border-blue-900/70 bg-blue-950/50 text-blue-200'
                  : 'border-blue-200 bg-blue-50 text-blue-700'
              }`}
            >
              {info}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                  isDarkMode ? 'bg-indigo-400/10 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
                }`}>
                  1
                </span>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                    Your details
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    Required fields are marked with *
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 flex items-center gap-4">
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Selected profile picture preview"
                      className="h-16 w-16 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                    />
                  ) : (
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <FaCamera aria-hidden="true" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <label
                        htmlFor="signup-profile-picture"
                        className={`cursor-pointer rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
                          isDarkMode
                            ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {profilePicture ? 'Change picture' : 'Choose profile picture'}
                      </label>
                      {profilePicture ? (
                        <button
                          type="button"
                          onClick={() => {
                            setProfilePicture(null);
                            setProfilePictureError('');
                          }}
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <p className={`mt-1.5 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      Profile picture (optional). Choose an image file.
                    </p>
                    {profilePictureError ? (
                      <p id="signup-profile-picture-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                        {profilePictureError}
                      </p>
                    ) : null}
                    <input
                      id="signup-profile-picture"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      aria-invalid={Boolean(profilePictureError)}
                      aria-describedby={profilePictureError ? 'signup-profile-picture-error' : undefined}
                      onChange={(event) => {
                        const selectedFile = event.target.files?.[0];
                        event.target.value = '';
                        if (!selectedFile) return;
                        if (!selectedFile.type.startsWith('image/')) {
                          setProfilePictureError('Choose a valid image file.');
                          return;
                        }
                        setProfilePictureError('');
                        setProfilePicture(selectedFile);
                      }}
                    />
                  </div>
                </div>

                <label className="sm:col-span-2">
                  <span className={labelClass}>Name with initial <span className="text-rose-500">*</span></span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleFieldBlur}
                    autoComplete="name"
                    required
                    placeholder="e.g. A B User"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    className={inputClass}
                  />
                  <FieldError id="name-error" message={fieldErrors.name} />
                </label>

                <label className="sm:col-span-2">
                  <span className={labelClass}>Username <span className="text-rose-500">*</span></span>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleFieldBlur}
                    autoComplete="nickname"
                    minLength={3}
                    maxLength={20}
                    required
                    placeholder="e.g. New User"
                    aria-invalid={Boolean(fieldErrors.username)}
                    aria-describedby={fieldErrors.username ? 'username-error' : 'username-hint'}
                    className={inputClass}
                  />
                  <FieldError id="username-error" message={fieldErrors.username} />
                  {!fieldErrors.username ? (
                    <p id="username-hint" className={`mt-1.5 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      Choose a display username using 3–20 letters, numbers, underscores, or spaces. Uppercase and lowercase letters are supported.
                    </p>
                  ) : null}
                </label>

                <label>
                  <span className={labelClass}>Phone number <span className="text-rose-500">*</span></span>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={form.phoneNo}
                    onChange={handlePhoneChange}
                    onBlur={handleFieldBlur}
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    minLength={10}
                    pattern="[0-9]{10}"
                    required
                    placeholder="07XXXXXXXX"
                    aria-invalid={Boolean(fieldErrors.phoneNo)}
                    aria-describedby={fieldErrors.phoneNo ? 'phone-error' : 'phone-hint'}
                    className={inputClass}
                  />
                  <FieldError id="phone-error" message={fieldErrors.phoneNo} />
                  {!fieldErrors.phoneNo ? (
                    <p id="phone-hint" className={`mt-1.5 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      Enter exactly 10 digits.
                    </p>
                  ) : null}
                </label>

                <label>
                  <span className={labelClass}>Batch <span className="text-rose-500">*</span></span>
                  <select
                    name="batch"
                    value={form.batch}
                    onChange={handleChange}
                    onBlur={handleFieldBlur}
                    required
                    aria-invalid={Boolean(fieldErrors.batch)}
                    aria-describedby={fieldErrors.batch ? 'batch-error' : undefined}
                    className={inputClass}
                  >
                    <option value="">Choose your batch</option>
                    <option value="20/21">20/21</option>
                    <option value="21/22">21/22</option>
                    <option value="22/23">22/23</option>
                    <option value="23/24">23/24</option>
                  </select>
                  <FieldError id="batch-error" message={fieldErrors.batch} />
                </label>

                <label>
                  <span className={labelClass}>Department in study <span className="text-rose-500">*</span></span>
                  <select
                    name="studyDepartment"
                    value={form.studyDepartment}
                    onChange={handleChange}
                    onBlur={handleFieldBlur}
                    required
                    aria-invalid={Boolean(fieldErrors.studyDepartment)}
                    aria-describedby={fieldErrors.studyDepartment ? 'study-department-error' : undefined}
                    className={inputClass}
                  >
                    <option value="">Choose your department</option>
                    <option value="ITT">ITT</option>
                    <option value="EET">EET</option>
                    <option value="MTT">MTT</option>
                    <option value="BPT">BPT</option>
                    <option value="Food">Food</option>
                  </select>
                  <FieldError id="study-department-error" message={fieldErrors.studyDepartment} />
                </label>

                <label>
                  <span className={labelClass}>Registration number <span className="text-rose-500">*</span></span>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    onBlur={handleFieldBlur}
                    autoComplete="off"
                    required
                    placeholder="e.g. ITT/2021/123"
                    aria-invalid={Boolean(fieldErrors.registrationNumber)}
                    aria-describedby={fieldErrors.registrationNumber ? 'registration-number-error' : undefined}
                    className={inputClass}
                  />
                  <FieldError id="registration-number-error" message={fieldErrors.registrationNumber} />
                </label>

                <label>
                  <span className={labelClass}>Birthday <span className="text-rose-500">*</span></span>
                  <input
                    type="date"
                    name="birthday"
                    value={form.birthday}
                    onChange={handleChange}
                    onBlur={handleFieldBlur}
                    required
                    aria-invalid={Boolean(fieldErrors.birthday)}
                    aria-describedby={fieldErrors.birthday ? 'birthday-error' : undefined}
                    className={inputClass}
                  />
                  <FieldError id="birthday-error" message={fieldErrors.birthday} />
                </label>

                <fieldset
                  className="sm:col-span-2"
                  aria-invalid={Boolean(fieldErrors.gender)}
                  aria-describedby={fieldErrors.gender ? 'gender-error' : undefined}
                >
                  <legend className={labelClass}>Gender <span className="text-rose-500">*</span></legend>
                  <div className="flex gap-3">
                    {['male', 'female'].map((gender) => (
                      <label
                        key={gender}
                        className={`flex flex-1 cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-3 text-sm capitalize transition ${
                          form.gender === gender
                            ? isDarkMode
                              ? 'border-indigo-400 bg-indigo-400/10 text-indigo-200'
                              : 'border-indigo-400 bg-indigo-50 text-indigo-800'
                            : isDarkMode
                              ? 'border-slate-700 bg-slate-800/60 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={form.gender === gender}
                          onChange={handleChange}
                          onBlur={handleFieldBlur}
                          required
                          className="accent-indigo-600"
                        />
                        {gender}
                      </label>
                    ))}
                  </div>
                  <FieldError id="gender-error" message={fieldErrors.gender} />
                </fieldset>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                  isDarkMode ? 'bg-cyan-400/10 text-cyan-300' : 'bg-cyan-50 text-cyan-700'
                }`}>
                  2
                </span>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                    Choose your work teams
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    Select every team you’d like to work with.
                  </p>
                </div>
              </div>

              <fieldset aria-describedby={fieldErrors.departments ? 'departments-error' : undefined}>
                <legend className={labelClass}>Work departments <span className="text-rose-500">*</span></legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {WORK_DEPARTMENTS.map((department) => {
                    const selected = isDeptSelected(department);
                    return (
                      <label
                        key={department}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition hover:-translate-y-0.5 focus-within:ring-4 ${
                          selected
                            ? isDarkMode
                              ? 'border-indigo-400 bg-indigo-400/10 ring-indigo-500/10'
                              : 'border-indigo-400 bg-indigo-50 ring-indigo-500/10'
                            : isDarkMode
                              ? 'border-slate-700 bg-slate-800/60 hover:border-slate-600 focus-within:ring-slate-500/10'
                              : 'border-slate-200 bg-white hover:border-indigo-200 focus-within:ring-indigo-500/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleDepartmentToggle(department)}
                          className="sr-only"
                          aria-invalid={Boolean(fieldErrors.departments)}
                          aria-label={`${formatWorkDepartmentLabel(department)} work department`}
                        />
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                          selected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : isDarkMode
                              ? 'border-slate-500 bg-slate-900'
                              : 'border-slate-300 bg-white'
                        }`}>
                          {selected ? <FaCheck /> : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block text-sm font-semibold ${
                            isDarkMode ? 'text-slate-100' : 'text-slate-800'
                          }`}>
                            {formatWorkDepartmentLabel(department)}
                          </span>
                          <span className={`mt-0.5 block text-xs ${
                            isDarkMode ? 'text-slate-500' : 'text-slate-500'
                          }`}>
                            {selected ? 'Selected for your profile' : 'Tap to select this team'}
                          </span>
                        </span>
                        {selected ? (
                          <span className="rounded-full bg-indigo-600/10 px-2 py-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                            SELECTED
                          </span>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
                <FieldError id="departments-error" message={fieldErrors.departments} />
                <p className={`mt-3 text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {form.departments.length
                    ? `${form.departments.length} ${form.departments.length === 1 ? 'team' : 'teams'} selected`
                    : 'Choose at least one team to continue.'}
                </p>
              </fieldset>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                  isDarkMode ? 'bg-emerald-400/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  3
                </span>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                    Secure your account
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    Use a password only you know.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>Password <span className="text-rose-500">*</span></span>
                  <span className="relative block">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleFieldBlur}
                      autoComplete="new-password"
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                      aria-invalid={Boolean(fieldErrors.password)}
                      aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className={`absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl ${
                        isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-700'
                      }`}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </span>
                  <FieldError id="password-error" message={fieldErrors.password} />
                </label>

                <label>
                  <span className={labelClass}>Confirm password <span className="text-rose-500">*</span></span>
                  <span className="relative block">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleFieldBlur}
                      autoComplete="new-password"
                      required
                      minLength={6}
                      placeholder="Type it one more time"
                      aria-invalid={Boolean(fieldErrors.confirmPassword)}
                      aria-describedby={fieldErrors.confirmPassword ? 'confirm-password-error' : undefined}
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((visible) => !visible)}
                      className={`absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl ${
                        isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-700'
                      }`}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showConfirmPassword}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </span>
                  <FieldError id="confirm-password-error" message={fieldErrors.confirmPassword} />
                  {!fieldErrors.confirmPassword && passwordsMatch ? (
                    <span className="mt-1.5 block text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Passwords match
                    </span>
                  ) : null}
                </label>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                    Password strength
                  </span>
                  <span className={`font-semibold ${
                    passwordStrength === 3
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : passwordStrength === 2
                        ? 'text-amber-600 dark:text-amber-400'
                        : passwordStrength === 1
                          ? 'text-rose-600 dark:text-rose-400'
                          : isDarkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {strengthLabel}
                  </span>
                </div>
                <div className={`h-1.5 overflow-hidden rounded-full ${
                  isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                }`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                    style={{ width: `${(passwordStrength / passwordChecks.length) * 100}%` }}
                  />
                </div>
                <p className={`mt-2 text-xs ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-500'
                }`}>
                  Tip: use a mix of upper- and lowercase letters, plus a number or symbol. Create your password before sending the verification email; you’ll use it to log in.
                </p>
              </div>

            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                  isDarkMode ? 'bg-cyan-400/10 text-cyan-300' : 'bg-cyan-50 text-cyan-700'
                }`}>
                  4
                </span>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                    Verify your email
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    Confirm your email address before creating your account.
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className={labelClass}>
                  Email address <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    name="email"
                    id="signup-email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleFieldBlur}
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'email-error' : 'email-verification-status'}
                    className={`${inputClass} min-w-0 flex-1`}
                  />
                  <button
                    type="button"
                    onClick={handleEmailVerification}
                    disabled={sendingVerificationEmail || loading || isEmailVerified}
                    className={`shrink-0 rounded-xl px-3 py-3 text-xs font-bold transition focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                      isDarkMode
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {sendingVerificationEmail ? (
                      <span className="flex items-center gap-1.5">
                        <FaSpinner className="animate-spin" aria-hidden="true" />
                        Sending
                      </span>
                    ) : isEmailVerified ? (
                      <span className="flex items-center gap-1.5">
                        <FaCheck aria-hidden="true" />
                        Verified
                      </span>
                    ) : verificationEmailSentTo === normalizeEmail(form.email) ? (
                      'Resend email'
                    ) : (
                      'Send email'
                    )}
                  </button>
                </div>
                <FieldError id="email-error" message={fieldErrors.email} />
                <p
                  id="email-verification-status"
                  role={isEmailVerified ? 'status' : undefined}
                  className={`mt-1.5 text-xs ${
                    isEmailVerified
                      ? 'font-medium text-emerald-600 dark:text-emerald-400'
                      : 'font-medium text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isEmailVerified
                    ? 'Email verified.'
                    : verificationEmailSentTo === normalizeEmail(form.email)
                      ? 'Open the verification link in your inbox, then return here to complete signup.'
                      : 'Verify this email address before creating your account.'}
                </p>
              </div>
            </section>

            <div className="space-y-4 border-t border-slate-200 pt-6 dark:border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Create account
                  </>
                )}
              </button>
              <p className={`text-center text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Log in
                </button>
              </p>
              <p className={`text-center text-xs ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Your email must be verified before your account can be created.
              </p>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Signup;
