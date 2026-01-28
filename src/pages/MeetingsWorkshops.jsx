import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { useDarkMode } from '../context/DarkModeContext';
import { FaSpinner } from 'react-icons/fa';

const MeetingsWorkshops = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('user');
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMeta, setLocationMeta] = useState(null); // { accuracy }
  const [attending, setAttending] = useState({}); // eventId -> true/false
  const [attendanceLoading, setAttendanceLoading] = useState({}); // eventId -> true/false
  const [attendanceError, setAttendanceError] = useState({}); // eventId -> string
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const REQUIRED_RADIUS_METERS = 20;

  // Get userType and user from Firestore (same as Home.jsx)
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
    if (!localUser || !localUser.uid) return;
    const fetchUserType = async () => {
      try {
        const profileSnap = await getDoc(doc(db, 'users', localUser.uid));
        if (!profileSnap.exists()) return;
        const data = profileSnap.data();
        setUserType(data.userType || 'user');
      } catch (err) {
        setUserType('user');
      }
    };
    fetchUserType();
  }, []);

  // Get user location
  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationMeta({ accuracy: pos.coords.accuracy });
      },
      (err) => {
        setUserLocation(null);
        setLocationMeta(null);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Check if user already attended
  useEffect(() => {
    if (!user) return;
    const checkAttendance = async () => {
      const newAttending = {};
      for (const event of events) {
        if (!event.id) continue;
        const eventDoc = await getDoc(doc(db, 'events', event.id));
        const data = eventDoc.data();
        if (data && data.attendance && data.attendance[user.uid]) {
          newAttending[event.id] = true;
        }
      }
      setAttending(newAttending);
    };
    checkAttendance();
  }, [user, events]);

  // Helper: calculate distance between two lat/lng points in meters
  function getDistanceMeters(lat1, lng1, lat2, lng2) {
    function toRad(x) { return (x * Math.PI) / 180; }
    const R = 6371e3; // meters
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation is not supported on this device/browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          });
        },
        (err) => {
          reject(err || new Error('Failed to get your location.'));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  };

  // Mark attendance
  const handleMarkAttendance = async (event) => {
    if (!user) return;
    setAttendanceLoading((prev) => ({ ...prev, [event.id]: true }));
    setAttendanceError((prev) => ({ ...prev, [event.id]: '' }));
    try {
      const eventLat = Number.parseFloat(event?.latitude);
      const eventLng = Number.parseFloat(event?.longitude);
      if (!Number.isFinite(eventLat) || !Number.isFinite(eventLng)) {
        setAttendanceError((prev) => ({
          ...prev,
          [event.id]: 'Event location is not set. Ask an admin to add latitude/longitude.'
        }));
        return;
      }

      const loc = await getCurrentLocation();
      setUserLocation({ lat: loc.lat, lng: loc.lng });
      setLocationMeta({ accuracy: loc.accuracy });

      const distance = getDistanceMeters(loc.lat, loc.lng, eventLat, eventLng);
      if (!Number.isFinite(distance) || distance > REQUIRED_RADIUS_METERS) {
        const accuracyText = Number.isFinite(loc.accuracy)
          ? ` (GPS accuracy ~${Math.round(loc.accuracy)}m)`
          : '';
        setAttendanceError((prev) => ({
          ...prev,
          [event.id]: `You should be within the meeting or workshop to mark attendance...`
        }));
        return;
      }

      const eventRef = doc(db, 'events', event.id);
      await updateDoc(eventRef, {
        [`attendance.${user.uid}`]: {
          timestamp: new Date().toISOString(),
          lat: loc.lat,
          lng: loc.lng,
          accuracy: loc.accuracy
        },
        users: arrayUnion(user.uid)
      });
      setAttending((prev) => ({ ...prev, [event.id]: true }));
    } catch (err) {
      setAttendanceError((prev) => ({
        ...prev,
        [event.id]: err?.message || 'Failed to mark attendance. Please allow location access.'
      }));
    } finally {
      setAttendanceLoading((prev) => ({ ...prev, [event.id]: false }));
    }
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'events'));
    const unsub = onSnapshot(q, (snap) => {
      let allEvents = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by dateTime descending (newest first)
      allEvents = allEvents.sort((a, b) => {
        const aTime = a.dateTime ? new Date(a.dateTime).getTime() : 0;
        const bTime = b.dateTime ? new Date(b.dateTime).getTime() : 0;
        return bTime - aTime;
      });
      setEvents(allEvents);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header userType={userType} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">My Meetings & Workshops</h1>
        {loading ? (
          <div className="flex items-center gap-2 text-blue-600"><FaSpinner className="animate-spin" /> Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-gray-500">No meetings or workshops found.</div>
        ) : (
          <ul className="space-y-4">
            {events.map(event => {

              // Move variable declarations above their usage
              const isEnded = !!event.ended;
              // User is attended if their uid is in event.users array
              const userAttended = Array.isArray(event.users) && user && event.users.includes(user.uid);
              // For now, allow marking attendance if not ended and not already attended
              const canMark = !isEnded && !userAttended;

              // Admin: End meeting/workshop
              const handleEndEvent = async (eventId) => {
                await updateDoc(doc(db, 'events', eventId), {
                  ended: new Date().toISOString()
                });
              };

              return (
                <li key={event.id} className="border rounded p-4 flex flex-col gap-2 bg-white">
                  <div className="flex items-center justify-between">
                    <span>
                      <span className="font-semibold">{event.title}</span>
                      {' '}(
                        {Array.isArray(event.type) ? event.type.join(' and ') : event.type}
                      )
                    </span>
                    {userType === 'admin' && !isEnded && (
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs font-semibold"
                        onClick={() => handleEndEvent(event.id)}
                      >
                        End Meeting/Workshop
                      </button>
                    )}
                    {userType === 'admin' && isEnded && (
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-semibold">Ended</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.locationName && (
                      <span>Location: {event.locationName}</span>
                    )}
                    {event.dateTime && (
                      <span> | Date & Time: {new Date(event.dateTime).toLocaleString()}</span>
                    )}
                  </div>
                  {/* User: Attendance/Missed logic */}
                  {userType !== 'admin' && (
                    <>
                      {userAttended ? (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold">You attended</div>
                      ) : isEnded ? (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded font-semibold">You missed this</div>
                      ) : (
                        <button
                          className={`px-4 py-2 rounded font-semibold ${canMark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                          disabled={!canMark || attendanceLoading[event.id]}
                          onClick={() => handleMarkAttendance(event)}
                        >
                          {attendanceLoading[event.id] ? 'Marking...' : 'Mark Attended'}
                        </button>
                      )}
                      {!userLocation && !userAttended && !isEnded && (
                        <div className="text-xs text-red-500 mt-1">Location permission is required to mark attendance.</div>
                      )}
                      {!!attendanceError[event.id] && !userAttended && !isEnded && (
                        <div className="text-xs text-red-600 mt-1">{attendanceError[event.id]}</div>
                      )}
                      {/* {userLocation && locationMeta?.accuracy && !userAttended && !isEnded && (
                        <div className="text-[11px] text-gray-500 mt-1">Current GPS accuracy: ~{Math.round(locationMeta.accuracy)}m</div>
                      )} */}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
};

export default MeetingsWorkshops;
