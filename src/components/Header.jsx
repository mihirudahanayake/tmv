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
  FaBell
} from 'react-icons/fa';
import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = ({ userType, isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const homePath = userType === 'admin' ? '/admin-home' : '/home';

  const navItems = [
    { path: homePath, label: 'Home', icon: <FaHome /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> }
  ];

  if (userType === 'user') {
    navItems.push(
      { path: '/task-history', label: 'Task History', icon: <FaHistory /> },
      { path: '/user-reject-details', label: 'My Rejections', icon: <FaTimes /> }
    );
  }

  if (userType === 'admin') {
    navItems.push(
      { path: '/manage-users', label: 'Manage Users', icon: <FaUserPlus /> },
      { path: '/assign-work', label: 'Assign Work', icon: <FaTasks /> },
      { path: '/work-list', label: 'Work List', icon: <FaList /> },
      { path: '/inventory', label: 'Inventory', icon: <FaBox /> },
      { path: '/notifications', label: 'Notifications', icon: <FaBell /> }
    );
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg relative">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            Videography Manager
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
        {isMenuOpen && (
          <ul className="lg:hidden mt-4 space-y-2 pb-2 bg-blue-700/50 backdrop-blur-sm rounded-lg">
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
        )}
      </nav>
    </header>
  );
};

export default Header;
