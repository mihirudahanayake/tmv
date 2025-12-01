import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import { FaSpinner, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import Header from '../components/Header';

const UserRejectDetails = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // watch auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  // load approved rejections for this user
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'rejectedWorks'),
          where('userId', '==', user.uid)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // newest first by approvedAt
        data.sort((a, b) => {
          const da = a.approvedAt ? new Date(a.approvedAt).getTime() : 0;
          const dbt = b.approvedAt ? new Date(b.approvedAt).getTime() : 0;
          return dbt - da;
        });

        setTasks(data);
      } catch (error) {
        console.error('Error fetching rejected works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="user" />
        <div className="flex flex-col items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Loading rejected works...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="user" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          My Rejected Works
        </h1>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">You have no rejected works.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-md p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {task.title || 'Task'}
                    </h3>
                    {task.date && (
                      <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <FaCalendarAlt />
                        <span>{new Date(task.date).toLocaleDateString()}</span>
                      </p>
                    )}
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <FaTimes />
                    You rejected
                  </span>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  {task.description && (
                    <p className="text-sm text-gray-700 mb-3">
                      {task.description}
                    </p>
                  )}

                  <p className="text-xs font-semibold text-red-800 mb-1">
                    Your reason:
                  </p>
                  <p className="text-sm text-gray-700">
                    {task.rejectionReason || '-'}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    Rejected: {task.rejectedAt
                      ? new Date(task.rejectedAt).toLocaleString()
                      : '-'}
                    <br />
                    Approved by admin: {task.approvedAt
                      ? new Date(task.approvedAt).toLocaleString()
                      : '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserRejectDetails;
