import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const AdminCreateEvent = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState([]); // array of types
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationName, setLocationName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState([]); // array of types
  const [editLat, setEditLat] = useState('');
  const [editLng, setEditLng] = useState('');
  const [editLocationName, setEditLocationName] = useState('');
  const [editDateTime, setEditDateTime] = useState('');
  const [eventLoading, setEventLoading] = useState(false);
  const [showAttendees, setShowAttendees] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [attendeesLoading, setAttendeesLoading] = useState(false);
  const [attendeesEventTitle, setAttendeesEventTitle] = useState('');
  const navigate = useNavigate();

  // Helper to fetch attendees for a meeting event
  const handleShowAttendees = async (event) => {
    setShowAttendees(true);
    setAttendees([]);
    setAttendeesLoading(true);
    setAttendeesEventTitle(event.title);
    try {
      // event.attendance is an object: { userId: { timestamp, lat, lng } }
      if (event.attendance) {
        const userIds = Object.keys(event.attendance);
        // Optionally fetch user names from 'users' collection
        const userSnaps = await Promise.all(userIds.map(uid =>
          getDocs(collection(db, 'users')).then(snap => snap.docs.find(d => d.id === uid)?.data()?.name || uid)
        ));
        setAttendees(userSnaps.map((name, i) => ({
          userId: userIds[i],
          name,
          ...event.attendance[userIds[i]]
        })));
      } else {
        setAttendees([]);
      }
    } catch {
      setAttendees([]);
    }
    setAttendeesLoading(false);
  };
  // Fetch events for admin list
  useEffect(() => {
    const fetchEvents = async () => {
      setEventLoading(true);
      try {
        const snap = await getDocs(collection(db, 'events'));
        setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch {}
      setEventLoading(false);
    };
    fetchEvents();
  }, [loading]);
  // Edit event handlers
  const startEdit = (event) => {
    setEditId(event.id);
    setEditTitle(event.title);
    setEditType(Array.isArray(event.type) ? event.type : [event.type]);
    setEditLat(event.latitude);
    setEditLng(event.longitude);
    setEditLocationName(event.locationName || '');
    setEditDateTime(event.dateTime || '');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editId) return;
    setEventLoading(true);
    try {
      await updateDoc(doc(db, 'events', editId), {
        title: editTitle,
        type: editType.length === 1 ? editType[0] : editType,
        latitude: parseFloat(editLat),
        longitude: parseFloat(editLng),
        locationName: editLocationName,
        dateTime: editDateTime,
      });
      setEditId(null);
    } catch {}
    setEventLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setEventLoading(true);
    try {
      await deleteDoc(doc(db, 'events', id));
      setEvents(events.filter(ev => ev.id !== id));
    } catch {}
    setEventLoading(false);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      () => setError('Unable to retrieve your location.')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'events'), {
        title,
        type: type.length === 1 ? type[0] : type,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        locationName,
        dateTime,
        createdAt: new Date(),
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Create Meeting/Workshop</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={type.includes('meeting')}
                onChange={e => {
                  if (e.target.checked) setType([...type, 'meeting']);
                  else setType(type.filter(t => t !== 'meeting'));
                }}
              /> Meeting
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={type.includes('workshop')}
                onChange={e => {
                  if (e.target.checked) setType([...type, 'workshop']);
                  else setType(type.filter(t => t !== 'workshop'));
                }}
              /> Workshop
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Location Name</label>
          <input type="text" value={locationName} onChange={e => setLocationName(e.target.value)} placeholder="e.g. Main Hall, Room 101" className="w-full border px-3 py-2 rounded mb-2" />
          <label className="block mb-1 font-medium">Location (Latitude, Longitude)</label>
          <div className="flex gap-2">
            <input type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Latitude" required className="w-1/2 border px-3 py-2 rounded" />
            <input type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Longitude" required className="w-1/2 border px-3 py-2 rounded" />
            <button type="button" onClick={handleGetLocation} className="bg-blue-500 text-white px-2 py-1 rounded">Get My Location</button>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Date & Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded w-full font-semibold">
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">All Meetings/Workshops</h3>
      {eventLoading ? <div>Loading events...</div> : (
        <ul className="space-y-4">
          {events.map(ev => (
            <li
              key={ev.id}
              className={"border rounded p-4 flex flex-col gap-2 cursor-pointer hover:bg-blue-50 transition"}
              onClick={e => {
                // Prevent navigation if clicking on Edit/Delete/End/Save/Cancel buttons or checkboxes
                if (
                  e.target.tagName === 'BUTTON' ||
                  e.target.tagName === 'INPUT' ||
                  e.target.closest('form')
                ) return;
                navigate(`/event-attendees/${ev.id}`);
              }}
            >
              {editId === ev.id ? (
                <form onSubmit={handleEdit} className="space-y-2">
                  <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="border px-2 py-1 rounded w-full" />
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={editType.includes('meeting')}
                        onChange={e => {
                          if (e.target.checked) setEditType([...editType, 'meeting']);
                          else setEditType(editType.filter(t => t !== 'meeting'));
                        }}
                      /> Meeting
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={editType.includes('workshop')}
                        onChange={e => {
                          if (e.target.checked) setEditType([...editType, 'workshop']);
                          else setEditType(editType.filter(t => t !== 'workshop'));
                        }}
                      /> Workshop
                    </label>
                  </div>
                  <input value={editLocationName} onChange={e => setEditLocationName(e.target.value)} placeholder="Location Name" className="border px-2 py-1 rounded w-full mb-2" />
                  <input
                    type="datetime-local"
                    value={editDateTime}
                    onChange={e => setEditDateTime(e.target.value)}
                    required
                    className="border px-2 py-1 rounded w-full mb-2"
                  />
                  <div className="flex gap-2">
                    <input type="number" step="any" value={editLat} onChange={e => setEditLat(e.target.value)} placeholder="Latitude" className="border px-2 py-1 rounded w-1/2" />
                    <input type="number" step="any" value={editLng} onChange={e => setEditLng(e.target.value)} placeholder="Longitude" className="border px-2 py-1 rounded w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                    <button type="button" onClick={() => setEditId(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div>
                    <span className="font-semibold text-blue-700 hover:underline">
                      {ev.title}
                    </span>
                    {' '}({Array.isArray(ev.type) ? ev.type.join(', ') : ev.type})
                  </div>
                  <div className="text-xs text-gray-500">Location: {ev.locationName ? `${ev.locationName} - ` : ''}{ev.latitude}, {ev.longitude}</div>
                  <div className="text-xs text-gray-500">Date & Time: {ev.dateTime ? new Date(ev.dateTime).toLocaleString() : 'N/A'}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <button onClick={() => startEdit(ev)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(ev.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    {!ev.ended ? (
                      <button
                        onClick={async () => {
                          await updateDoc(doc(db, 'events', ev.id), { ended: new Date().toISOString() });
                          setEvents(events => events.map(e => e.id === ev.id ? { ...e, ended: new Date().toISOString() } : e));
                        }}
                        className="bg-red-700 text-white px-3 py-1 rounded"
                      >
                        End Meeting/Workshop
                      </button>
                    ) : (
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-semibold">Ended</span>
                    )}
                    {/* Show attendees for any event with attendance */}
                    {ev.attendance && (
                      <button
                        onClick={() => handleShowAttendees(ev)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View Attendees
                      </button>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* Attendees Modal */}
      {showAttendees && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw]">
            <h4 className="text-lg font-bold mb-2">Attendees for: {attendeesEventTitle}</h4>
            {attendeesLoading ? (
              <div>Loading attendees...</div>
            ) : attendees.length === 0 ? (
              <div>No attendees found.</div>
            ) : (
              <ul className="space-y-1 max-h-60 overflow-y-auto">
                {attendees.map((a, i) => (
                  <li key={a.userId} className="border-b last:border-b-0 py-1 text-sm">
                    <span className="font-semibold">{a.name || a.userId}</span>
                    <span className="ml-2 text-gray-500">{a.timestamp ? new Date(a.timestamp).toLocaleString() : ''}</span>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowAttendees(false)} className="mt-4 bg-gray-300 px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreateEvent;
