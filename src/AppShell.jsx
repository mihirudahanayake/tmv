// src/AppShell.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useIdleLogout } from './hooks/useIdleLogout';
import { useDarkMode } from './context/DarkModeContext';
import Header from './components/Header.jsx';
import DeptHeadRoute from './components/DeptHeadRoute.jsx';
import SuperAdminRoute from './components/SuperAdminRoute.jsx';
import SiteAdminRoute from './components/SiteAdminRoute.jsx';
import RoleRoute from './components/RoleRoute.jsx';
import Homepage from './pages/Homepage.jsx';
import Home from './pages/Home.jsx';
import Welcome from './pages/Welcome.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Signup from './pages/Signup.jsx';
import CreateUser from './pages/CreateUser.jsx';
import AssignWork from './pages/AssignWork.jsx';
import AddOldWork from './pages/AddOldWork.jsx';
import WorkList from './pages/WorkList.jsx';
import Profile from './pages/Profile.jsx';
import ManageUsers from './pages/ManageUsers.jsx';
import UserDetails from './pages/UserDetails.jsx';
import TaskHistory from './pages/TaskHistory.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import Inventory from './pages/Inventory';
import InventoryItems from './pages/InventoryItems.jsx';
import CardIdentifier from './pages/CardIdentifier.jsx';
import AccessRecords from './pages/AccessRecords.jsx';
import MyItemUsage from './pages/MyItemUsage.jsx';
import AdminRejectDetails from './pages/AdminRejectDetails';
import UserRejectDetails from './pages/UserRejectDetails';
import NotificationHistory from './pages/NotificationHistory';
import SystemAlerts from './pages/SystemAlerts';
import PostingDates from './pages/PostingDates';
import AdminNotifications from './pages/AdminNotifications';
import UserNotifications from './pages/UserNotifications';
import UserNotificationDetail from './pages/UserNotificationDetail';
import NotificationDetails from './pages/NotificationDetails';
import EditOldWork from './pages/EditOldWork.jsx';
import SuperAdminDashboard from './pages/SuperAdminDashboard.jsx';
import SiteAdminDashboard from './pages/SiteAdminDashboard.jsx';

const AppShell = () => {
  useIdleLogout();
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const hideGlobalLayout = ['/', '/login', '/forgot-password', '/signup'].includes(location.pathname);

  const getHeaderUserType = () => {
    const superAdminRoutes = [
      '/super-admin',
      '/manage-users',
      '/work-list',
      '/inventory',
      '/card-identifier',
      '/access-records',
      '/system-alerts',
      '/admin/',
      '/posting-dates',
      '/add-old-work',
      '/edit-old-work',
      '/create-user',
      '/assign-work',
      '/admin-home',
      '/profile'
    ];

    const isSuperAdminArea = superAdminRoutes.some((route) =>
      location.pathname === route || location.pathname.startsWith(route)
    );

    if (isSuperAdminArea) return 'superAdmin';
    if (location.pathname.startsWith('/site-admin')) return 'siteAdmin';
    if (
      location.pathname.startsWith('/admin-home') ||
      location.pathname.startsWith('/create-user') ||
      location.pathname.startsWith('/assign-work') ||
      location.pathname.startsWith('/work-list') ||
      location.pathname.startsWith('/manage-users') ||
      location.pathname.startsWith('/users/') ||
      location.pathname.startsWith('/tasks/') ||
      location.pathname.startsWith('/inventory') ||
      location.pathname.startsWith('/access-records') ||
      location.pathname.startsWith('/notifications') ||
      location.pathname.startsWith('/admin/') ||
      location.pathname.startsWith('/posting-dates') ||
      location.pathname.startsWith('/add-old-work') ||
      location.pathname.startsWith('/edit-old-work')
    ) {
      return 'admin';
    }
    return 'user';
  };

  const routes = (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />

      <Route
        path="/admin-home"
        element={
          <DeptHeadRoute>
            <Homepage />
          </DeptHeadRoute>
        }
      />
      <Route
        path="/create-user"
        element={
          <DeptHeadRoute>
            <CreateUser />
          </DeptHeadRoute>
        }
      />
      <Route
        path="/assign-work"
        element={
          <RoleRoute allowRoles={['departmentHead']}>
            <AssignWork />
          </RoleRoute>
        }
      />
      <Route
        path="/work-list"
        element={
          <DeptHeadRoute>
            <WorkList />
          </DeptHeadRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/manage-users"
        element={
          <DeptHeadRoute>
            <ManageUsers />
          </DeptHeadRoute>
        }
      />
      <Route
        path="/users/:userId"
        element={
          <DeptHeadRoute>
            <UserDetails />
          </DeptHeadRoute>
        }
      />
      <Route
        path="/tasks/:taskId"
        element={
          <DeptHeadRoute>
            <TaskDetails />
          </DeptHeadRoute>
        }
      />
      <Route path="/task-history" element={<TaskHistory />} />
      <Route
        path="/inventory"
        element={
          <RoleRoute allowRoles={['departmentHead', 'superAdmin', 'siteAdmin', 'supervisorTO']} redirectTo="/home">
            <Inventory />
          </RoleRoute>
        }
      />
      <Route
        path="/inventory/items"
        element={
          <RoleRoute allowRoles={['departmentHead', 'superAdmin', 'siteAdmin', 'supervisorTO']} redirectTo="/home">
            <InventoryItems />
          </RoleRoute>
        }
      />
      <Route
        path="/card-identifier"
        element={
          <SuperAdminRoute>
            <CardIdentifier />
          </SuperAdminRoute>
        }
      />
      <Route
        path="/access-records"
        element={
          <RoleRoute allowRoles={['departmentHead', 'superAdmin', 'siteAdmin', 'supervisorTO']} redirectTo="/home">
            <AccessRecords />
          </RoleRoute>
        }
      />
      <Route
        path="/my-item-usage"
        element={
          <RoleRoute allowRoles={['member', 'departmentHead', 'superAdmin', 'siteAdmin', 'supervisorTO']} redirectTo="/login">
            <MyItemUsage />
          </RoleRoute>
        }
      />
      <Route
        path="/admin-reject-details"
        element={
          <DeptHeadRoute>
            <AdminRejectDetails />
          </DeptHeadRoute>
        }
      />
      <Route path="/user-reject-details" element={<UserRejectDetails />} />
      <Route
        path="/posting-dates"
        element={
          <DeptHeadRoute>
            <PostingDates />
          </DeptHeadRoute>
        }
      />
      <Route
        path="/system-alerts"
        element={
          <SuperAdminRoute>
            <SystemAlerts />
          </SuperAdminRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <RoleRoute allowRoles={['departmentHead', 'siteAdmin']}>
            <NotificationHistory />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <RoleRoute allowRoles={['departmentHead', 'siteAdmin']}>
            <AdminNotifications />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/notifications/:notifId"
        element={
          <RoleRoute allowRoles={['departmentHead', 'siteAdmin']}>
            <NotificationDetails />
          </RoleRoute>
        }
      />
      <Route path="/user/notifications" element={<UserNotifications />} />
      <Route path="/user/notifications/:notifId" element={<UserNotificationDetail />} />
      <Route
        path="/add-old-work"
        element={
          <RoleRoute allowRoles={['departmentHead']}>
            <AddOldWork />
          </RoleRoute>
        }
      />
      <Route
        path="/edit-old-work/:id"
        element={
          <RoleRoute allowRoles={['departmentHead']}>
            <EditOldWork />
          </RoleRoute>
        }
      />
      <Route
        path="/super-admin"
        element={
          <SuperAdminRoute>
            <SuperAdminDashboard />
          </SuperAdminRoute>
        }
      />
      <Route
        path="/site-admin"
        element={
          <SiteAdminRoute>
            <SiteAdminDashboard />
          </SiteAdminRoute>
        }
      />
    </Routes>
  );

  return (
    <>
      {!hideGlobalLayout && <Header userType={getHeaderUserType()} isGlobalLayout />}
      {hideGlobalLayout ? (
        routes
      ) : (
        <div className={`min-h-dvh overflow-x-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-slate-100'} pt-16 lg:pl-[280px]`}>
          <div className="mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-[min(100%,1800px)] min-w-0 px-3 pb-8 pt-4 sm:px-5 lg:px-6 2xl:px-10">
            {routes}
          </div>
        </div>
      )}
    </>
  );
};

export default AppShell;
