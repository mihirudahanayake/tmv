import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1>Welcome</h1>
          <p>Task Management & Verification System</p>
        </div>

        <div className="welcome-description">
          <p>
            Manage your tasks efficiently and keep track of all your work assignments.
          </p>
        </div>

        <div className="welcome-buttons">
          <button
            className="welcome-btn login-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="welcome-btn signup-btn"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="welcome-footer">
          <p>Get started by logging in or creating a new account</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
