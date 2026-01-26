import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AttendancePage = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [marking, setMarking] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Get current user (assume auth is available globally)
    const u = window?.auth?.currentUser;
    setUser(u);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, 'events'));
        setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => setError('Failed to get your location.')
    );
  };

  const isNear = (eventLat, eventLng, userLat, userLng) => {
    // Simple radius check (in meters)
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371000; // meters
    const dLat = toRad(eventLat - userLat);
    const dLng = toRad(eventLng - userLng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLat)) *
        Math.cos(toRad(eventLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c < 8; // 8 meters
  };

  const handleMarkAttendance = async (event) => {
    setMarking(true);
    setError('');
    setSuccess('');
    getLocation();
    if (!location) {
      setError('Please allow location access and try again.');
      setMarking(false);
      return;
    }
    if (!isNear(event.latitude, event.longitude, location.latitude, location.longitude)) {
      setError('You are not at the required location.');
      setMarking(false);
      return;
    }
    try {
      const ref = doc(db, 'events', event.id);
      await updateDoc(ref, {
        [`attendance.${user.uid}`]: {
          markedAt: new Date().toISOString(),
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
      setSuccess('Attendance marked!');
    } catch (err) {
      setError('Failed to mark attendance.');
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {loading ? (
        <div>Loading events...</div>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border rounded p-4 flex flex-col gap-2">
              <div>
                <span className="font-semibold">{event.title}</span> ({event.type})
              </div>
              <div className="text-xs text-gray-500">
                Location: {event.latitude}, {event.longitude}
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-max"
                onClick={() => handleMarkAttendance(event)}
                disabled={marking}
              >
                Mark as Attend
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendancePage;
