import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserPlus,
  FaList,
  FaBars,
  FaTimes,
  FaUser,
  FaHistory,
  FaBox,
  FaBell,
  FaCalendarAlt,
  FaIdCard,
  FaBan,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { auth } from '../firebase/config';

const Header = ({ userType, isTO = false, isDarkMode, toggleDarkMode, isGlobalLayout = false }) => {
  if (!isGlobalLayout) {
    return null;
  }

  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { profile } = useUserProfile();
  const { isDarkMode: contextDarkMode, toggleDarkMode: contextToggleDarkMode } = useDarkMode();

  const darkModeOn = typeof isDarkMode === 'boolean' ? isDarkMode : contextDarkMode;
  const toggleTheme = toggleDarkMode || contextToggleDarkMode;
  const profileRole = profile?.role || profile?.userType || userType;

  const effectiveUserType =
    profileRole === 'member' || profileRole === 'supervisor' || profileRole === 'supervisorTO'
      ? 'user'
      : profileRole === 'departmentHead' || profileRole === 'admin'
        ? 'admin'
        : profileRole === 'superAdmin'
          ? 'superAdmin'
          : profileRole === 'siteAdmin'
            ? 'siteAdmin'
            : userType === 'member' || userType === 'supervisor' || userType === 'supervisorTO'
              ? 'user'
              : userType;
  const isMemberShell = effectiveUserType === 'user';
  const isTOUser = Boolean(isTO || profile?.isTO || profileRole === 'supervisorTO' || profileRole === 'supervisor' || userType === 'supervisorTO' || userType === 'supervisor');
  const showTOInventory = isTOUser && isMemberShell;
  const userDisplayName = profile?.username || profile?.name || profile?.displayName || profile?.email || 'Profile';
  const userAvatarUrl = profile?.photoURL || profile?.avatarUrl || '';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const homePath =
    effectiveUserType === 'admin'
      ? '/admin-home'
      : effectiveUserType === 'superAdmin'
        ? '/super-admin'
        : effectiveUserType === 'siteAdmin'
          ? '/site-admin'
          : '/home';
  const notificationsPath = isMemberShell
    ? '/user/notifications'
    : effectiveUserType === 'superAdmin'
      ? '/system-alerts'
      : '/notifications';

  const isDepartmentHead = userType === 'departmentHead';

  const navItems = [
    { path: homePath, label: 'Dashboard', icon: <FaHome /> },
    ...(isMemberShell
      ? [
          // { path: '/my-meetings', label: 'My Meetings / Workshops', icon: <FaCalendarAlt /> },
          { path: '/task-history', label: 'Task History', icon: <FaHistory /> },
          { path: '/my-item-usage', label: 'My Item Usage', icon: <FaHistory /> },
          { path: '/user-reject-details', label: 'My Rejections', icon: <FaBan /> },
          ...(showTOInventory ? [{ path: '/inventory', label: 'Inventory', icon: <FaBox /> }] : []),
          ...(showTOInventory ? [{ path: '/access-records', label: 'Access Records', icon: <FaIdCard /> }] : []),
          { path: '/profile', label: 'Profile', icon: <FaUser /> },
        ]
      : [{ path: '/profile', label: 'Profile', icon: <FaUser /> }]),
  ];

  if (effectiveUserType === 'superAdmin') {
    navItems.push(
      { path: '/manage-users', label: 'Users', icon: <FaUserPlus /> },
      { path: '/work-list', label: 'Work List', icon: <FaList /> },
      { path: '/inventory', label: 'Inventory', icon: <FaBox /> },
      { path: '/card-identifier', label: 'Card Identifier', icon: <FaIdCard /> },
      { path: '/access-records', label: 'Access Records', icon: <FaIdCard /> }
    );
  }

  if (effectiveUserType === 'admin') {
    const profileIndex = navItems.findIndex((item) => item.path === '/profile');
    if (profileIndex !== -1) navItems.splice(profileIndex, 1);

    navItems.push(
      { path: '/manage-users', label: 'Users', icon: <FaUserPlus /> },
      { path: '/work-list', label: 'Work List', icon: <FaList /> },
      // ...(isDepartmentHead ? [] : [{ path: '/inventory', label: 'Inventory', icon: <FaBox /> }]),
      // { path: '/access-records', label: 'Access Records', icon: <FaIdCard /> },
      { path: '/profile', label: 'Profile', icon: <FaUser /> },
    );
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-blue-950 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white lg:flex dark:border-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="flex items-center gap-3 border-b border-blue-800 px-5 py-2.5 dark:border-slate-800">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 font-bold text-white shadow-lg backdrop-blur dark:bg-white/10">
            MMS
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">Media Manager</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/70">
            Navigation
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    isActive(item.path)
                      ? 'bg-white text-blue-900 shadow-lg shadow-black/10 dark:bg-slate-700 dark:text-white'
                      : 'text-blue-50 hover:bg-white/15 hover:text-white dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </aside>

      <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-blue-950 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white backdrop-blur supports-[backdrop-filter]:bg-blue-900/95 dark:border-slate-950 dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 lg:left-[280px]">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white hover:bg-white/10 dark:border-white/10 dark:text-white dark:hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-white">
                <span className="lg:hidden">Media Manager</span>
                <span className="hidden lg:inline">Inventory &amp; Task Management</span>
              </div>
              <div className="hidden truncate text-xs text-blue-100/85 lg:block">
                Inventory System
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-1 text-sm font-semibold text-white dark:border-white/10">
              <Link to="/profile" className="inline-flex min-w-0 items-center gap-2 rounded-full px-1 hover:text-blue-100">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 text-xs font-bold text-white dark:bg-white/10 dark:text-white">
                  {userAvatarUrl ? (
                    <img
                      src={userAvatarUrl}
                      alt={userDisplayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-sm" />
                  )}
                </span>
                <span className="hidden sm:block max-w-[10rem] truncate">{userDisplayName}</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                aria-label="Logout"
                title="Logout"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white/90 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <FaSignOutAlt />
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              aria-label="Toggle dark mode"
            >
              {darkModeOn ? <FaSun /> : <FaMoon />}
            </button>

            <Link
              to={notificationsPath}
              aria-label="Notifications"
              title="Notifications"
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70 dark:border-white/10 dark:hover:bg-white/10 ${
                isActive(notificationsPath) ? 'bg-white/15' : ''
              }`}
            >
              <FaBell className="text-lg" />
            </Link>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-slate-100 shadow-2xl dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-blue-800 px-5 py-4 dark:border-slate-800">
              <div>
                <div className="text-sm font-semibold">Media Manager</div>
                <div className="text-xs text-blue-100/80">FOT Media Unit</div>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 text-slate-200 dark:bg-slate-900"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="px-3 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                        isActive(item.path)
                          ? 'bg-white text-blue-900'
                          : 'text-blue-50 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowLogoutConfirm(false)}>
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Confirm logout</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Do you want to sign out of the system now?
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowLogoutConfirm(false);
                  await handleLogout();
                }}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
