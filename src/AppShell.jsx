// src/AppShell.jsx
import { Routes, Route } from 'react-router-dom';
import { useIdleLogout } from './hooks/useIdleLogout';
// your existing imports
import DeptHeadRoute from './components/DeptHeadRoute.jsx';
import SuperAdminRoute from './components/SuperAdminRoute.jsx';
import Homepage from './pages/Homepage.jsx';
import Home from './pages/Home.jsx';
import Welcome from './pages/Welcome.jsx';
import Login from './pages/Login.jsx';
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
import AdminRejectDetails from './pages/AdminRejectDetails';
import UserRejectDetails from './pages/UserRejectDetails';
import NotificationHistory from './pages/NotificationHistory';
import PostingDates from './pages/PostingDates';
import AdminNotifications from './pages/AdminNotifications';
import UserNotifications from './pages/UserNotifications';
import UserNotificationDetail from './pages/UserNotificationDetail';
import NotificationDetails from './pages/NotificationDetails';
import EditOldWork from './pages/EditOldWork.jsx';
import SuperAdminDashboard from './pages/SuperAdminDashboard.jsx';

const AppShell = () => {
  useIdleLogout(); // idle timer active for all routes

  return (
    <Routes>
      {/* auth / common */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />

      {/* admin core */}
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
          <DeptHeadRoute>
            <AssignWork />
          </DeptHeadRoute>
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
          <DeptHeadRoute>
            <Inventory />
          </DeptHeadRoute>
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

      {/* ADMIN notifications list + details */}
      <Route
        path="/notifications"
        element={
          <DeptHeadRoute>
            <NotificationHistory />
          </DeptHeadRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <DeptHeadRoute>
            <AdminNotifications />
          </DeptHeadRoute>
        }
      />
      <Route
        path="/admin/notifications/:notifId"
        element={
          <DeptHeadRoute>
            <NotificationDetails />
          </DeptHeadRoute>
        }
      />

      {/* USER notifications list + details */}
      <Route path="/user/notifications" element={<UserNotifications />} />
      <Route
        path="/user/notifications/:notifId"
        element={<UserNotificationDetail />}
      />

      <Route
        path="/add-old-work"
        element={
          <DeptHeadRoute>
            <AddOldWork />
          </DeptHeadRoute>
        }
      />

      <Route
        path="/edit-old-work/:id"
        element={
          <DeptHeadRoute>
            <EditOldWork />
          </DeptHeadRoute>
        }
      />

      {/* super admin (read-only) */}
      <Route
        path="/super-admin"
        element={
          <SuperAdminRoute>
            <SuperAdminDashboard />
          </SuperAdminRoute>
        }
      />

    </Routes>
  );
};

export default AppShell;
