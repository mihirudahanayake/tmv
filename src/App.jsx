import { HashRouter as Router } from 'react-router-dom';
import AppShell from './AppShell';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AppShell />
      </Router>
    </DarkModeProvider>
  );
}

export default App;
