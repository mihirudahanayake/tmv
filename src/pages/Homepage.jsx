import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { FaUserPlus, FaTasks } from 'react-icons/fa';
import Header from '../components/Header';
import { db } from '../firebase/config';

const Homepage = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null); // { id, type, workId, userName, createdAt }

  // TEMP: one-time read to verify connection and data
  useEffect(() => {
    const run = async () => {
      try {
        const snap = await getDocs(collection(db, 'notifications'));
        console.log('Notifications count:', snap.size);
        snap.forEach((d) => console.log('Notif doc:', d.id, d.data()));
      } catch (e) {
        console.error('Test read of notifications failed:', e);
      }
    };
    run();
  }, []);

  // listen for unread notifications
  useEffect(() => {
    console.log('Admin notification listener mounted');

    const q = query(
      collection(db, 'notifications'),
      where('read', '==', false),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        console.log('Notification snapshot size:', snap.size);
        snap.docChanges().forEach((change) => {
          console.log('Notif change:', change.type, change.doc.id);
          if (change.type === 'added') {
            const data = change.doc.data();
            setPopup({
              id: change.doc.id,
              ...data
            });
          }
        });
      },
      (err) => {
        console.error('Notification listener error:', err);
      }
    );

    return () => {
      console.log('Admin notification listener unsubscribed');
      unsub();
    };
  }, []);

  const handleClickNotification = async () => {
    if (!popup) return;
    try {
      await updateDoc(doc(db, 'notifications', popup.id), { read: true });
    } catch (e) {
      console.error('Failed to mark notification read', e);
    }
    const workId = popup.workId;
    setPopup(null);
    // open task details from notification
    navigate(`/tasks/${workId}`);
  };

  const renderPopupText = () => {
    if (!popup) return '';
    const who = popup.userName || 'A user';
    if (popup.type === 'accept') return `${who} accepted a work.`;
    if (popup.type === 'reject') return `${who} rejected a work.`;
    if (popup.type === 'done') return `${who} marked their work as done.`;
    if (popup.type === 'undo-done') return `${who} undid a done task.`;
    return 'New activity on a work.';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      {/* popup notification */}
      {popup && (
        <button
          onClick={handleClickNotification}
          className="fixed bottom-4 right-4 z-50 max-w-xs text-left bg-white shadow-xl rounded-xl border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50"
        >
          <p className="font-semibold text-gray-800 mb-1">
            {renderPopupText()}
          </p>
          <p className="text-gray-500 text-xs">Click to view details</p>
        </button>
      )}

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            Admin Dashboard
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Work list instead of Create User */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaTasks className="text-3xl sm:text-4xl text-blue-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
                  Work List
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                View all works, see user acceptance and progress, and manage task status.
              </p>
              <button
                onClick={() => navigate('/work-list')}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-blue-700 transition font-medium"
              >
                Go to Work List
              </button>
            </div>

            {/* Assign work card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaUserPlus className="text-3xl sm:text-4xl text-green-600" />
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

export default Homepage;
