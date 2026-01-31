import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const EventAttendees = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [manualRegNo, setManualRegNo] = useState('');
  const [manualNeedInPlace, setManualNeedInPlace] = useState(true);
  const [manualLoading, setManualLoading] = useState(false);
  const [manualMessage, setManualMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const eventSnap = await getDoc(doc(db, 'events', eventId));
        if (!eventSnap.exists()) {
          setError('Event not found');
          setLoading(false);
          return;
        }
        const eventData = eventSnap.data();
        setEvent(eventData);

        // default for manual marking UI
        setManualNeedInPlace(eventData?.needInPlace === true);

        if (eventData.attendance) {
          const userIds = Object.keys(eventData.attendance);
          const usersMap = {};
          await Promise.all(
            userIds.map(async (uid) => {
              try {
                const snap = await getDoc(doc(db, 'users', uid));
                usersMap[uid] = snap.exists() ? snap.data()?.name || uid : uid;
              } catch {
                usersMap[uid] = uid;
              }
            })
          );
          setAttendees(userIds.map(uid => ({
            userId: uid,
            name: usersMap[uid] || uid,
            ...eventData.attendance[uid],
          })));
        } else {
          setAttendees([]);
        }
      } catch (err) {
        setError('Failed to fetch event or attendees');
      }
      setLoading(false);
    };
    fetchEvent();
  }, [eventId]);

  const safeString = (v) => (v == null ? '' : String(v));
  const getMarkedAt = (a) => a?.timestamp || a?.markedAt || a?.marked_at || '';
  const getHasPlace = (a) => {
    const lat = a?.lat ?? a?.latitude;
    const lng = a?.lng ?? a?.longitude;
    return Number.isFinite(Number(lat)) && Number.isFinite(Number(lng));
  };

  const handleManualMarkAttendance = async () => {
    if (!eventId) return;
    if (!event) return;

    setManualLoading(true);
    setManualMessage('');
    try {
      let targetUid = '';
      let targetName = '';

      const reg = manualRegNo.trim();
      if (reg) {
        const snap = await getDocs(
          query(collection(db, 'users'), where('registrationNumber', '==', reg))
        );
        if (!snap.empty) {
          const d = snap.docs[0];
          targetUid = d.id;
          targetName = d.data()?.name || '';
        } else {
          throw new Error('No user found for this registration number.');
        }
      }

      if (!targetUid) {
        throw new Error('Enter Registration Number.');
      }

      const base = {
        timestamp: new Date().toISOString(),
        markedBy: 'admin',
        mode: manualNeedInPlace ? 'in_place' : 'no_place',
      };

      // If admin marks as in-place, store event coordinates as proof-of-place.
      if (manualNeedInPlace) {
        const lat = Number.parseFloat(event?.latitude);
        const lng = Number.parseFloat(event?.longitude);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          base.lat = lat;
          base.lng = lng;
        }
      }

      await updateDoc(doc(db, 'events', eventId), {
        [`attendance.${targetUid}`]: base,
        users: arrayUnion(targetUid),
      });

      // optimistic update
      setAttendees((prev) => {
        const exists = prev.some((a) => a.userId === targetUid);
        if (exists) {
          return prev.map((a) => (a.userId === targetUid ? { ...a, ...base } : a));
        }
        return [...prev, { userId: targetUid, name: targetName || targetUid, ...base }];
      });

      setManualMessage('Attendance marked.');
      setManualRegNo('');
    } catch (e) {
      setManualMessage(e?.message || 'Failed to mark attendance.');
    } finally {
      setManualLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <button onClick={() => navigate(-1)} className="mb-4 bg-gray-300 px-4 py-2 rounded">Back</button>
      <h2 className="text-xl font-bold mb-2">Attendees for: {event?.title || ''}</h2>
      {event && (
        <div className="mb-4 text-gray-700 font-medium">
          {event.type && (
            <div>Type: {Array.isArray(event.type) ? event.type.join(' and ') : event.type}</div>
          )}
          <div>Need in place: {event?.needInPlace === true ? 'Yes' : 'No (attendance without location allowed)'}</div>
          {event.locationName && (
            <div>Location: {event.locationName}</div>
          )}
          {event.dateTime && (
            <div>Date & Time: {new Date(event.dateTime).toLocaleString()}</div>
          )}
        </div>
      )}

      {event && (
        <div className="mb-4 border rounded p-3 bg-gray-50">
          <div className="font-semibold mb-2">Admin: Mark Attendance</div>
          <div className="grid grid-cols-1 gap-2">
            <input
              value={manualRegNo}
              onChange={(e) => setManualRegNo(e.target.value)}
              placeholder="Registration Number (e.g. ITT/2022/001)"
              className="border px-3 py-2 rounded"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={manualNeedInPlace}
                onChange={(e) => setManualNeedInPlace(e.target.checked)}
              />
              Need in place (user is in the meeting)
            </label>

            {manualMessage && (
              <div className={manualMessage === 'Attendance marked.' ? 'text-green-700 text-sm' : 'text-red-600 text-sm'}>
                {manualMessage}
              </div>
            )}

            <button
              onClick={handleManualMarkAttendance}
              disabled={manualLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {manualLoading ? 'Marking...' : 'Mark Attended'}
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : attendees.length === 0 ? (
        <div>No attendees found.</div>
      ) : (
        <ul className="space-y-2">
          {attendees.map(a => (
            <li key={a.userId} className="border-b last:border-b-0 py-1 text-sm">
              <span className="font-semibold">{a.name || a.userId}</span>
              <span className="ml-2 text-gray-500">
                {getMarkedAt(a) ? new Date(getMarkedAt(a)).toLocaleString() : ''}
              </span>
              <span className="ml-2 text-xs text-gray-600">
                ({a?.mode ? safeString(a.mode).replace(/_/g, ' ') : getHasPlace(a) ? 'in place' : 'no place'})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventAttendees;
