import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserPlus,
  FaTasks,
  FaList,
  FaBars,
  FaTimes,
  FaUser,
  FaHistory,
  FaBox,
  FaBell,
  FaCalendarAlt,
  FaIdCard
} from 'react-icons/fa';
import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = ({ userType, isTO = false, isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const effectiveUserType = userType === 'member' || userType === 'supervisor' || userType === 'supervisorTO'
    ? 'user'
    : userType;
  const isMemberShell = effectiveUserType === 'user';
  const showTOInventory = isTO && isMemberShell;

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const homePath =
    effectiveUserType === 'admin'
      ? '/admin-home'
      : effectiveUserType === 'superAdmin'
        ? '/super-admin'
        : effectiveUserType === 'siteAdmin'
          ? '/site-admin'
          : '/home';


  const navItems = [
    { path: homePath, label: 'Home', icon: <FaHome /> },
    // Only show My Meetings / Workshops for users
    ...(isMemberShell ? [
      { path: '/my-meetings', label: 'My Meetings / Workshops', icon: <FaCalendarAlt /> },
      { path: '/task-history', label: 'Task History', icon: <FaHistory /> },
      ...(showTOInventory ? [{ path: '/inventory', label: 'Inventory', icon: <FaBox /> }] : []),
      { path: '/profile', label: 'Profile', icon: <FaUser /> },
      { path: '/user/notifications', label: 'Notifications', icon: <FaBell /> }
    ] : [
      { path: '/profile', label: 'Profile', icon: <FaUser /> }
    ])
  ];

  if (effectiveUserType === 'admin') {
    // Keep Profile right before notifications (same UX ordering as user).
    const profileIndex = navItems.findIndex((i) => i.path === '/profile');
    if (profileIndex !== -1) navItems.splice(profileIndex, 1);

    navItems.push(
      { path: '/manage-users', label: 'Manage Users', icon: <FaUserPlus /> },
      { path: '/work-list', label: 'Work List', icon: <FaList /> },
      { path: '/inventory', label: 'Inventory', icon: <FaBox /> },
      { path: '/access-records', label: 'Access Records', icon: <FaIdCard /> },
      { path: '/profile', label: 'Profile', icon: <FaUser /> },
      { path: '/notifications', label: 'Notification History', icon: <FaBell /> }
    );
  }

  if (effectiveUserType === 'superAdmin') {
    navItems.push(
      { path: '/manage-users', label: 'Manage Users', icon: <FaUserPlus /> },
      { path: '/work-list', label: 'Work List', icon: <FaList /> },
      { path: '/inventory', label: 'Inventory', icon: <FaBox /> },
      { path: '/access-records', label: 'Access Records', icon: <FaIdCard /> },
      { path: '/notifications', label: 'Notification History', icon: <FaBell /> }
    );
  }

  if (effectiveUserType === 'siteAdmin') {
    // role management lives on /site-admin (homePath)
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg relative">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            Inventory & Task Management
          </h1>

          <div className="flex items-center gap-4">
            <ul className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 hover:text-blue-200 transition ${
                      isActive(item.path)
                        ? 'font-bold border-b-2 border-white pb-1'
                        : ''
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-2xl focus:outline-none ml-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* FIXED: MOBILE DARK MODE BUTTON - ABSOLUTE POSITIONING */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 shadow absolute right-14 top-3 z-50 lg:hidden ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300 shadow-lg'
              : 'bg-blue-200 hover:bg-blue-300 text-blue-600 shadow-lg'
          }`}
          aria-label="Toggle dark mode (mobile)"
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* FIXED: DESKTOP DARK MODE BUTTON - PROPER SIZE */}
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 shadow absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block z-20 ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300 shadow-lg'
              : 'bg-blue-200 hover:bg-blue-300 text-blue-600 shadow-lg'
          }`}
          aria-label="Toggle dark mode (desktop)"
        >
          {isDarkMode ? <FaSun size={10} /> : <FaMoon size={10} />}
        </button>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen
              ? 'max-h-96 opacity-100 scale-100 mt-4'
              : 'max-h-0 opacity-0 scale-95 mt-0'
          }`}
        >
          <ul className="space-y-2 pb-2 bg-blue-700/50 backdrop-blur-sm rounded-lg">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded hover:bg-blue-800 transition ${
                    isActive(item.path) ? 'bg-blue-800 font-bold' : ''
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
