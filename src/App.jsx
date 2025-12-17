import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import AdminRoute from './components/AdminRoute.jsx';
import Homepage from './pages/Homepage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import CreateUser from './pages/CreateUser.jsx';
import AssignWork from './pages/AssignWork.jsx';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-home" element={<AdminRoute><Homepage /></AdminRoute>} />
        <Route path="/create-user" element={<AdminRoute><CreateUser /></AdminRoute>} />
        <Route path="/assign-work" element={<AdminRoute><AssignWork /></AdminRoute>} />
        <Route path="/work-list" element={<AdminRoute><WorkList /></AdminRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/users/:userId" element={<AdminRoute><UserDetails /></AdminRoute>} />
        <Route path="/tasks/:taskId" element={<AdminRoute><TaskDetails /></AdminRoute>} />
        <Route path="/task-history" element={<TaskHistory />} />
        <Route path="/inventory" element={<AdminRoute><Inventory /></AdminRoute>} />
        <Route path="/admin-reject-details" element={<AdminRoute><AdminRejectDetails /></AdminRoute>} />
        <Route path="/user-reject-details" element={<UserRejectDetails />} />
        <Route path="/notifications" element={<AdminRoute><NotificationHistory /></AdminRoute>} />
        <Route path="/posting-dates" element={<AdminRoute><PostingDates /></AdminRoute>} />
        <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />
        <Route path="/notifications" element={<UserNotifications />} />
        <Route path="/notifications/:notifId" element={<UserNotificationDetail />} />
        <Route path="/notifications/:notifId" element={<AdminRoute><NotificationDetails /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
