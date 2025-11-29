import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaTasks } from 'react-icons/fa';
import Header from '../components/Header';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            Admin Dashboard
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaUserPlus className="text-3xl sm:text-4xl text-blue-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
                  User Management
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Create new user accounts for team members and manage their access.
              </p>
              <button
                onClick={() => navigate('/create-user')}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-blue-700 transition font-medium"
              >
                Go to Create User
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaTasks className="text-3xl sm:text-4xl text-green-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-green-600">
                  Work Assignment
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Create new work projects and assign team members to tasks.
              </p>
              <button
                onClick={() => navigate('/assign-work')}
                className="w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-green-700 transition font-medium"
              >
                Go to Assign Work
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
