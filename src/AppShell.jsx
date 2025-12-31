// src/AppShell.jsx
import { Routes, Route } from 'react-router-dom';
import { useIdleLogout } from './hooks/useIdleLogout';
// your existing imports
import AdminRoute from './components/AdminRoute.jsx';
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
          <AdminRoute>
            <Homepage />
          </AdminRoute>
        }
      />
      <Route
        path="/create-user"
        element={
          <AdminRoute>
            <CreateUser />
          </AdminRoute>
        }
      />
      <Route
        path="/assign-work"
        element={
          <AdminRoute>
            <AssignWork />
          </AdminRoute>
        }
      />
      <Route
        path="/work-list"
        element={
          <AdminRoute>
            <WorkList />
          </AdminRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/manage-users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/users/:userId"
        element={
          <AdminRoute>
            <UserDetails />
          </AdminRoute>
        }
      />
      <Route
        path="/tasks/:taskId"
        element={
          <AdminRoute>
            <TaskDetails />
          </AdminRoute>
        }
      />
      <Route path="/task-history" element={<TaskHistory />} />
      <Route
        path="/inventory"
        element={
          <AdminRoute>
            <Inventory />
          </AdminRoute>
        }
      />
      <Route
        path="/admin-reject-details"
        element={
          <AdminRoute>
            <AdminRejectDetails />
          </AdminRoute>
        }
      />
      <Route path="/user-reject-details" element={<UserRejectDetails />} />
      <Route
        path="/posting-dates"
        element={
          <AdminRoute>
            <PostingDates />
          </AdminRoute>
        }
      />

      {/* ADMIN notifications list + details */}
      <Route
        path="/notifications"
        element={
          <AdminRoute>
            <NotificationHistory />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <AdminRoute>
            <AdminNotifications />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/notifications/:notifId"
        element={
          <AdminRoute>
            <NotificationDetails />
          </AdminRoute>
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
          <AdminRoute>
            <AddOldWork />
          </AdminRoute>
        }
      />

      <Route
        path="/edit-old-work/:id"
        element={
          <AdminRoute>
            <EditOldWork />
          </AdminRoute>
        }
      />

    </Routes>
  );
};

export default AppShell;
