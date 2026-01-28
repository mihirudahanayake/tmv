import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const EventAttendees = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <button onClick={() => navigate(-1)} className="mb-4 bg-gray-300 px-4 py-2 rounded">Back</button>
      <h2 className="text-xl font-bold mb-2">Attendees for: {event?.title || ''}</h2>
      {event && (
        <div className="mb-4 text-gray-700 font-medium">
          {event.type && (
            <div>Type: {Array.isArray(event.type) ? event.type.join(' and ') : event.type}</div>
          )}
          {event.locationName && (
            <div>Location: {event.locationName}</div>
          )}
          {event.dateTime && (
            <div>Date & Time: {new Date(event.dateTime).toLocaleString()}</div>
          )}
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
              <span className="ml-2 text-gray-500">{a.timestamp ? new Date(a.timestamp).toLocaleString() : ''}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventAttendees;
