import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserPlus, FaTasks, FaList, FaBars, FaTimes, FaUser, FaHistory, FaBox } from 'react-icons/fa';
import { useState } from 'react';

const Header = ({ userType }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const homePath = userType === 'admin' ? '/admin-home' : '/home';

  const navItems = [
    { path: homePath, label: 'Home', icon: <FaHome /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
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
      { path: '/inventory', label: 'Inventory', icon: <FaBox /> }
    );
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            Videography Manager
          </h1>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 hover:text-blue-200 transition ${
                    isActive(item.path) ? 'font-bold border-b-2 border-white pb-1' : ''
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isMenuOpen && (
          <ul className="lg:hidden mt-4 space-y-2 pb-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition ${
                    isActive(item.path) ? 'bg-blue-700 font-bold' : ''
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
