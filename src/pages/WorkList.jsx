import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaCalendarAlt, FaUsers, FaSpinner } from 'react-icons/fa';
import Header from '../components/Header';

const WorkList = () => {
  const [works, setWorks] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersMap = {};
      usersSnapshot.docs.forEach(doc => {
        usersMap[doc.id] = doc.data();
      });
      setUsers(usersMap);

      const worksSnapshot = await getDocs(collection(db, 'works'));
      const worksData = worksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWorks(worksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || colors.medium;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-col justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Loading works...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          All Work Assignments
        </h2>
        
        {works.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">No work assignments yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {works.map(work => (
              <div key={work.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex-1 pr-2">
                    {work.title}
                  </h3>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(work.priority)}`}>
                    {work.priority}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
                  {work.description}
                </p>
                
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <FaCalendarAlt />
                    <span>Deadline: {new Date(work.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <FaUsers />
                    <span>Assigned to:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {work.assignedUsers?.map(userId => (
                      <span key={userId} className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm text-gray-700">
                        {users[userId]?.name || 'Unknown'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkList;
