import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import Header from '../components/Header';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | no-auth | ready | error

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus('no-auth');
        setUserData(null);
        return;
      }

      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        }
        setStatus('ready');
      } catch (e) {
        setStatus('error');
      }
    });

    return () => unsub();
  }, []);

  const userType = userData?.userType === 'admin' ? 'admin' : 'user';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={userType} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Profile
        </h1>

        {status === 'loading' && (
          <p className="text-gray-600 text-sm sm:text-base">Loading profile...</p>
        )}

        {status === 'no-auth' && (
          <p className="text-gray-600 text-sm sm:text-base">
            You are not logged in.
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-sm sm:text-base">
            Failed to load profile information.
          </p>
        )}

        {status === 'ready' && userData && (
          <>
            {userData.photoURL && (
              <div className="flex justify-center mb-4">
                <img
                  src={userData.photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3 text-sm sm:text-base">
              <div>
                <p className="font-semibold text-gray-700">Name</p>
                <p className="text-gray-800">{userData.name}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-800">{userData.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Phone</p>
                <p className="text-gray-800">{userData.phoneNo || '-'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Batch</p>
                <p className="text-gray-800">{userData.batch || '-'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Study department</p>
                <p className="text-gray-800">{userData.studyDepartment || '-'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Gender</p>
                <p className="text-gray-800 capitalize">
                  {userData.gender || '-'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Registration number</p>
                <p className="text-gray-800">
                  {userData.registrationNumber || '-'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Card</p>
                <p className="text-gray-800">{userData.cardNumber || '-'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Birthday</p>
                <p className="text-gray-800">
                  {userData.birthday || '-'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Work department</p>
                <p className="text-gray-800">{userData.department || '-'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">First priority (work)</p>
                <p className="text-gray-800">
                  {userData.firstPriority || '-'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">User type</p>
                <p className="text-gray-800 capitalize">
                  {userData.userType || 'user'}
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
