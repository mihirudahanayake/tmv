import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const AdminCreateEvent = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('meeting');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('meeting');
  const [editLat, setEditLat] = useState('');
  const [editLng, setEditLng] = useState('');
  const [eventLoading, setEventLoading] = useState(false);
  const navigate = useNavigate();
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
    setEditType(event.type);
    setEditLat(event.latitude);
    setEditLng(event.longitude);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editId) return;
    setEventLoading(true);
    try {
      await updateDoc(doc(db, 'events', editId), {
        title: editTitle,
        type: editType,
        latitude: parseFloat(editLat),
        longitude: parseFloat(editLng),
      });
      setEditId(null);
    } catch {}
    setEventLoading(false);
  };

  const handleDelete = async (id) => {
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
        type,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
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
          <select value={type} onChange={e => setType(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="meeting">Meeting</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Location (Latitude, Longitude)</label>
          <div className="flex gap-2">
            <input type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Latitude" required className="w-1/2 border px-3 py-2 rounded" />
            <input type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Longitude" required className="w-1/2 border px-3 py-2 rounded" />
            <button type="button" onClick={handleGetLocation} className="bg-blue-500 text-white px-2 py-1 rounded">Get My Location</button>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded w-full font-semibold">
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">All Meetings/Workshops</h3>
      {eventLoading ? <div>Loading events...</div> : (
        <ul className="space-y-4">
          {events.map(ev => (
            <li key={ev.id} className="border rounded p-4 flex flex-col gap-2">
              {editId === ev.id ? (
                <form onSubmit={handleEdit} className="space-y-2">
                  <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="border px-2 py-1 rounded w-full" />
                  <select value={editType} onChange={e => setEditType(e.target.value)} className="border px-2 py-1 rounded w-full">
                    <option value="meeting">Meeting</option>
                    <option value="workshop">Workshop</option>
                  </select>
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
                    <span className="font-semibold">{ev.title}</span> ({ev.type})
                  </div>
                  <div className="text-xs text-gray-500">Location: {ev.latitude}, {ev.longitude}</div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => startEdit(ev)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(ev.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminCreateEvent;
