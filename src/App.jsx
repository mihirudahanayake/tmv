import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx'; // admin dashboard
import Home from './pages/Home.jsx';         // user home (welcome)
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import CreateUser from './pages/CreateUser.jsx';
import AssignWork from './pages/AssignWork.jsx';
import WorkList from './pages/WorkList.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-based destinations */}
        <Route path="/home" element={<Home />} />           {/* user */}
        <Route path="/admin-home" element={<Homepage />} /> {/* admin */}

        {/* Existing admin features (could be protected later) */}
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/assign-work" element={<AssignWork />} />
        <Route path="/work-list" element={<WorkList />} />
      </Routes>
    </Router>
  );
}

export default App;
