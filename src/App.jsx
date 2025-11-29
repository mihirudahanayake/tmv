import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreateUser from './pages/CreateUser';
import AssignWork from './pages/AssignWork';
import WorkList from './pages/WorkList';

function App() {
  return (
    <Router basename="/tmv">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/assign-work" element={<AssignWork />} />
        <Route path="/work-list" element={<WorkList />} />
      </Routes>
    </Router>
  );
}

export default App;
