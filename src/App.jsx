import { HashRouter as Router, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-home" element={<Homepage />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/assign-work" element={<AssignWork />} />
        <Route path="/work-list" element={<WorkList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/users/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
