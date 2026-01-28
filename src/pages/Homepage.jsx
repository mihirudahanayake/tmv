import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { FaUserPlus, FaTasks, FaCalendarAlt } from 'react-icons/fa';
import { FaRegHandshake } from 'react-icons/fa6';
import Header from '../components/Header';
import { db } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';

const Homepage = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null); // { id, type, workId, userName, createdAt }
  const { profile, loading: loadingProfile } = useUserProfile();
  const [department, setDepartment] = useState('videography');

  useEffect(() => {
    if (!loadingProfile && profile?.managedDepartments?.length) {
      setDepartment(profile.managedDepartments[0]);
    }
  }, [loadingProfile, profile]);

  // listen for unread notifications
  useEffect(() => {
    console.log('Admin notification listener mounted');

    if (loadingProfile) return;

    const isAdminActivity = (data) => {
      return ['accept', 'reject', 'done', 'undo-done'].includes(data?.type);
    };

    const makeQuery = (deptValue) =>
      query(collection(db, 'notifications'), where('department', '==', deptValue));

    const processSnap = (snap) => {
      const candidates = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((n) => n.read === false)
        .filter(isAdminActivity)
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
          return bTime - aTime;
        });

      setPopup(candidates[0] || null);
    };

    const unsubMain = onSnapshot(
      makeQuery(department),
      (snap) => {
        console.log('Notification snapshot size:', snap.size);
        processSnap(snap);
      },
      (err) => console.error('Notification listener error:', err)
    );

    let unsubLegacy = null;
    if (department === 'videography') {
      unsubLegacy = onSnapshot(
        makeQuery(null),
        (snap) => processSnap(snap),
        (err) => console.error('Legacy notification listener error:', err)
      );
    }

    return () => {
      console.log('Admin notification listener unsubscribed');
      unsubMain();
      if (unsubLegacy) unsubLegacy();
    };
  }, [loadingProfile, department]);

  // CLICK: mark read + open details page for this notification
  const handleClickNotification = async () => {
    if (!popup) return;
    try {
      await updateDoc(doc(db, 'notifications', popup.id), { read: true });
    } catch (e) {
      console.error('Failed to mark notification read', e);
    }

    const notifId = popup.id; // Firestore doc id
    setPopup(null);

    // Go to admin notification details (matches App.jsx route)
    navigate(`/admin/notifications/${notifId}`);
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


            {/* Work list */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaTasks className="text-3xl sm:text-4xl text-blue-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
                  Work List
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                View all works, see user acceptance and progress, and manage
                task status.
              </p>
              <button
                onClick={() => navigate('/work-list')}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-blue-700 transition font-medium"
              >
                Go to Work List
              </button>
            </div>

            {/* Work Assignment */}
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
                Go to Work Assignment
              </button>
            </div>

            {/* Schedule Posting */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt className="text-3xl sm:text-4xl text-purple-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-purple-600">
                  Schedule Posting
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Set posting dates, mark videos as posted, and view the posting
                queue.
              </p>
              <button
                onClick={() => navigate('/posting-dates')}
                className="w-full bg-purple-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-purple-700 transition font-medium"
              >
                Go to Schedule Posting
              </button>
            </div>

            {/* Create Meeting/Workshop (moved, new color/icon) */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaRegHandshake className="text-3xl sm:text-4xl text-teal-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-teal-600">
                  Create Meeting/Workshop
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Schedule a new meeting or workshop and set the location for attendance.
              </p>
              <button
                onClick={() => navigate('/admin-create-event')}
                className="w-full bg-teal-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-teal-700 transition font-medium"
              >
                Create Meeting/Workshop
              </button>
            </div>

            {/* Send Notifications */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <FaTasks className="text-3xl sm:text-4xl text-orange-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-orange-500">
                  Send Notifications
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Send announcements or messages to all members or selected users.
              </p>
              <button
                onClick={() => navigate('/admin/notifications')}
                className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded hover:bg-orange-600 transition font-medium"
              >
                Go to Send Notifications
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
