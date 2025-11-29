import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { FaCalendarAlt, FaSpinner } from 'react-icons/fa';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const userSnap = await getDoc(doc(db, 'users', userId));
        if (userSnap.exists()) {
          setUser({ id: userId, ...userSnap.data() });
        }

        const worksSnap = await getDocs(collection(db, 'works'));
        const allWorks = worksSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        // adjust this filter to match your schema
        const userWorks = allWorks.filter(w => {
          if (!w.assignedTo) return false;
          if (Array.isArray(w.assignedTo)) {
            return w.assignedTo.includes(userId);
          }
          return w.assignedTo === userId;
        });

        setWorks(userWorks);
      } catch (err) {
        console.error('Error loading user details:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin" />
            <span>Loading user...</span>
          </div>
        )}

        {!loading && !user && (
          <p className="text-gray-600 text-sm sm:text-base">
            User not found.
          </p>
        )}

        {!loading && user && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {user.name || 'User details'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {user.email}
            </p>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 text-sm sm:text-base space-y-2">
              <p><span className="font-semibold">Phone:</span> {user.phoneNo || '-'}</p>
              <p><span className="font-semibold">Batch:</span> {user.batch || '-'}</p>
              <p><span className="font-semibold">Study department:</span> {user.studyDepartment || '-'}</p>
              <p><span className="font-semibold">Gender:</span> {user.gender || '-'}</p>
              <p><span className="font-semibold">Registration no:</span> {user.registrationNumber || '-'}</p>
              <p><span className="font-semibold">Card:</span> {user.cardNumber || '-'}</p>
              <p><span className="font-semibold">Work department:</span> {user.department || '-'}</p>
              <p><span className="font-semibold">First priority:</span> {user.firstPriority || '-'}</p>
              <p><span className="font-semibold">User type:</span> {user.userType || 'user'}</p>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Work history
            </h2>

            {works.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">
                No work assignments for this user.
              </p>
            ) : (
              <div className="space-y-3">
                {works.map((w) => (
                  <div
                    key={w.id}
                    className="bg-white rounded-lg shadow p-3 sm:p-4 text-sm sm:text-base"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {w.title || 'Untitled work'}
                      </h3>
                      {w.date && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <FaCalendarAlt /> {w.date}
                        </span>
                      )}
                    </div>
                    {w.description && (
                      <p className="text-gray-700 text-sm">{w.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserDetails;
