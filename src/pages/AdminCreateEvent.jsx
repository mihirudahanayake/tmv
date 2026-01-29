import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useDarkMode } from '../context/DarkModeContext';
import { downloadAttendeesPDF } from '../utils/downloadAttendeesPDF';
import { useUserProfile } from '../hooks/useUserProfile';

const AdminCreateEvent = () => {
    // Download attendees as PDF for an event
    const handleDownloadPDF = async (event) => {
      // event.attendance is an object: { userId: { timestamp, lat, lng } }
      if (!event.attendance) return;
      const userIds = Object.keys(event.attendance);
      // Fetch user name and registrationNumber from users/{uid} (department-safe)
      const userMap = {};
      await Promise.all(
        userIds.map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, 'users', uid));
            if (snap.exists()) {
              const data = snap.data();
              userMap[uid] = {
                name: data.name || uid,
                registrationNumber: data.registrationNumber || '',
              };
              return;
            }
          } catch {
            // If rules prevent reading this user, fallback to uid.
          }
          userMap[uid] = { name: uid, registrationNumber: '' };
        })
      );
      const attendeesList = userIds.map(uid => ({
        userId: uid,
        name: userMap[uid]?.name || uid,
        registrationNumber: userMap[uid]?.registrationNumber || "",
        ...event.attendance[uid]
      }));
      downloadAttendeesPDF({ attendees: attendeesList, eventTitle: event.title, locationName: event.locationName, eventDateTime: event.dateTime });
    };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { profile, loading: loadingProfile } = useUserProfile();
  const [title, setTitle] = useState('');
  const [type, setType] = useState([]); // array of types
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationName, setLocationName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState([]); // array of types
  const [editLat, setEditLat] = useState('');
  const [editLng, setEditLng] = useState('');
  const [editLocationName, setEditLocationName] = useState('');
  const [editDateTime, setEditDateTime] = useState('');
  const [eventLoading, setEventLoading] = useState(false);
  const [downloadingExcelId, setDownloadingExcelId] = useState(null);
  const [downloadingAllAttendanceExcel, setDownloadingAllAttendanceExcel] = useState(false);
  const navigate = useNavigate();

  const safeFilename = (name) =>
    (name || 'file')
      .toString()
      .trim()
      .replace(/[\\/:*?"<>|]/g, '_')
      .replace(/\s+/g, '_')
      .slice(0, 80);

  const getPhoneFromUser = (u) =>
    u?.phoneNo || u?.phoneNumber || u?.phone || '';

  const fetchUsersInManagedDepts = async () => {
    const managed = Array.isArray(profile?.managedDepartments) ? profile.managedDepartments : [];
    const depts = managed.length ? managed : ['videography'];

    const userById = new Map();
    for (const dept of depts) {
      // New model
      try {
        const snap = await getDocs(
          query(collection(db, 'users'), where('departments', 'array-contains', dept))
        );
        snap.docs.forEach((d) => userById.set(d.id, { id: d.id, ...d.data() }));
      } catch {
        // ignore
      }

      // Legacy model
      try {
        const snap = await getDocs(
          query(collection(db, 'users'), where('department', '==', dept))
        );
        snap.docs.forEach((d) => userById.set(d.id, { id: d.id, ...d.data() }));
      } catch {
        // ignore
      }
    }

    // Prefer exporting members/users (avoid exporting admins).
    return Array.from(userById.values()).filter((u) => (u.userType || 'user') === 'user');
  };

  const handleDownloadNotAttendedExcel = async (event) => {
    if (!event?.id) return;
    if (loadingProfile) return;

    setDownloadingExcelId(event.id);
    try {
      const attendees = new Set(Object.keys(event.attendance || {}));
      const users = await fetchUsersInManagedDepts();
      const notAttended = users.filter((u) => !attendees.has(u.id));

      const batchRank = (value) => {
        const s = (value || '').toString().trim();
        if (!s) return Number.POSITIVE_INFINITY;

        // Supports formats like: "20/21", "2020/2021", "20-21", "2020-2021"
        const parts = s.split(/\s*[-/]\s*/).filter(Boolean);
        if (!parts.length) return Number.POSITIVE_INFINITY;

        const first = parts[0];
        const digits = first.replace(/\D/g, '');
        if (!digits) return Number.POSITIVE_INFINITY;

        const n = Number(digits);
        if (!Number.isFinite(n)) return Number.POSITIVE_INFINITY;

        // Two-digit year -> assume 2000s (20 -> 2020)
        if (digits.length <= 2) return 2000 + n;
        return n;
      };

      const regKey = (value) => (value || '').toString().trim();

      const getBatchFromRegistrationNumber = (value) => {
        const s = (value || '').toString().trim();
        if (!s) return '';
        // Pattern: xxx/batch/xxx -> take the middle segment
        const parts = s.split('/').map((p) => p.trim()).filter(Boolean);
        if (parts.length >= 3) return parts[1];
        return '';
      };

      const rows = notAttended
        .map((u) => ({
          _batch: getBatchFromRegistrationNumber(u.registrationNumber) || u.batch || '',
          RegistrationNumber: u.registrationNumber || '',
          Name: u.name || '',
          Card: u.cardNumber || '',
          Phone: getPhoneFromUser(u) || '',
        }))
        .sort((a, b) => {
          const ab = batchRank(a._batch);
          const bb = batchRank(b._batch);
          if (ab !== bb) return ab - bb;

          const ar = regKey(a.RegistrationNumber);
          const br = regKey(b.RegistrationNumber);
          const regCmp = ar.localeCompare(br, undefined, { numeric: true, sensitivity: 'base' });
          if (regCmp !== 0) return regCmp;

          return (a.Name || '').localeCompare(b.Name || '');
        })
        .map(({ _batch, ...exportRow }) => exportRow);

      const sheet = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, sheet, 'NotAttended');

      const today = new Date().toISOString().slice(0, 10);
      const filename = `${safeFilename(event.title)}_not_attended_${today}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (e) {
      console.error('Failed to download not-attended Excel', e);
      alert('Failed to download Excel. Check Firestore rules and try again.');
    } finally {
      setDownloadingExcelId(null);
    }
  };

  const handleDownloadAllMeetingsWorkshopsAttendanceExcel = async () => {
    if (loadingProfile) return;
    if (eventLoading) return;
    if (!events?.length) {
      alert('No events found.');
      return;
    }

    setDownloadingAllAttendanceExcel(true);
    try {
      // Use only meeting/workshop events
      const validEvents = (events || []).filter((ev) => {
        const types = Array.isArray(ev.type) ? ev.type : [ev.type];
        return types.includes('meeting') || types.includes('workshop');
      });

      // Collect all attendee ids across all events
      const attendeeIds = new Set();
      validEvents.forEach((ev) => {
        Object.keys(ev.attendance || {}).forEach((uid) => attendeeIds.add(uid));
      });

      // Fetch user data for attendees (rules-safe)
      const userMap = {};
      await Promise.all(
        Array.from(attendeeIds).map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, 'users', uid));
            if (snap.exists()) {
              const data = snap.data();
              userMap[uid] = {
                name: data.name || uid,
                registrationNumber: data.registrationNumber || '',
              };
              return;
            }
          } catch {
            // ignore
          }
          userMap[uid] = { name: uid, registrationNumber: '' };
        })
      );

      // Total attendance per user (count of events attended)
      const totalAttendanceByUser = {};
      validEvents.forEach((ev) => {
        Object.keys(ev.attendance || {}).forEach((uid) => {
          totalAttendanceByUser[uid] = (totalAttendanceByUser[uid] || 0) + 1;
        });
      });

      const formatEventDate = (value) => {
        if (!value) return '';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return String(value);
        return d.toLocaleString();
      };

      // Build rows: one row per attendance record
      const rawRows = [];
      validEvents
        .slice()
        .sort((a, b) => {
          const da = a?.dateTime ? new Date(a.dateTime).getTime() : 0;
          const dbt = b?.dateTime ? new Date(b.dateTime).getTime() : 0;
          return da - dbt;
        })
        .forEach((ev) => {
          const dateText = formatEventDate(ev.dateTime);
          Object.keys(ev.attendance || {}).forEach((uid) => {
            rawRows.push({
              _reg: userMap[uid]?.registrationNumber || '',
              _name: userMap[uid]?.name || uid,
              RegistrationNumber: userMap[uid]?.registrationNumber || '',
              Name: userMap[uid]?.name || uid,
              Title: ev.title || 'Event',
              Date: dateText,
              TotalAttendance: totalAttendanceByUser[uid] || 0,
            });
          });
        });

      // Sort by reg number, then name, then date
      rawRows.sort((a, b) => {
        const regCmp = String(a._reg || '').localeCompare(String(b._reg || ''), undefined, {
          numeric: true,
          sensitivity: 'base',
        });
        if (regCmp !== 0) return regCmp;
        const nameCmp = String(a._name || '').localeCompare(String(b._name || ''));
        if (nameCmp !== 0) return nameCmp;
        return String(a.Date || '').localeCompare(String(b.Date || ''));
      });

      const pad2 = (n) => String(n).padStart(2, '0');
      const rows = rawRows.map((r, idx) => ({
        No: pad2(idx + 1),
        RegistrationNumber: r.RegistrationNumber,
        Name: r.Name,
        Title: r.Title,
        Date: r.Date,
        TotalAttendance: r.TotalAttendance,
      }));

      const sheet = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, sheet, 'Attendance');

      const today = new Date().toISOString().slice(0, 10);
      const filename = `all_meetings_workshops_attendance_${today}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (e) {
      console.error('Failed to download all attendance Excel', e);
      alert('Failed to download Excel. Try again.');
    } finally {
      setDownloadingAllAttendanceExcel(false);
    }
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
    setSuccess('');
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
      setSuccess('Event created successfully.');
      setTitle('');
      setType([]);
      setLatitude('');
      setLongitude('');
      setLocationName('');
      setDateTime('');
    } catch (err) {
      setError('Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header userType="admin" isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-2xl mt-10 border border-blue-100 mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-blue-800 tracking-tight drop-shadow">Create Meeting/Workshop</h2>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleDownloadAllMeetingsWorkshopsAttendanceExcel}
            disabled={downloadingAllAttendanceExcel || loadingProfile || eventLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow disabled:opacity-50"
            title="Download Excel for all meetings/workshops attendance"
          >
            {downloadingAllAttendanceExcel ? 'Preparing Excel...' : 'Download All Attendance (Excel)'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-10 bg-white rounded-xl shadow p-4 sm:p-6 border border-blue-100">
        <div>
          <label className="block mb-2 font-semibold text-blue-700">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-blue-700">Type</label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <label className="flex items-center gap-2 text-blue-700 font-medium">
              <input
                type="checkbox"
                checked={type.includes('meeting')}
                onChange={e => {
                  if (e.target.checked) setType([...type, 'meeting']);
                  else setType(type.filter(t => t !== 'meeting'));
                }}
                className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
              /> Meeting
            </label>
            <label className="flex items-center gap-2 text-purple-700 font-medium">
              <input
                type="checkbox"
                checked={type.includes('workshop')}
                onChange={e => {
                  if (e.target.checked) setType([...type, 'workshop']);
                  else setType(type.filter(t => t !== 'workshop'));
                }}
                className="accent-purple-600 w-5 h-5 rounded focus:ring-2 focus:ring-purple-400"
              /> Workshop
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-blue-700">Location Name</label>
          <input type="text" value={locationName} onChange={e => setLocationName(e.target.value)} placeholder="e.g. Main Hall, Room 101" className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm mb-2" />
          <label className="block mb-2 font-semibold text-blue-700">Location (Latitude, Longitude)</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Latitude" required className="w-full sm:w-1/2 border border-blue-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" />
            <input type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Longitude" required className="w-full sm:w-1/2 border border-blue-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm" />
            <button type="button" onClick={handleGetLocation} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold shadow w-full sm:w-auto">Get My Location</button>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
        {success && <div className="text-green-700 text-sm font-semibold">{success}</div>}
        <div>
          <label className="block mb-2 font-semibold text-blue-700">Date & Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            required
            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
        </div>
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg w-full font-bold shadow-lg hover:from-green-600 hover:to-blue-600 transition-all">
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
      <ul>
        {[...events]
          .sort((a, b) => {
            // If both have dateTime, sort by dateTime descending
            if (a.dateTime && b.dateTime) {
              return new Date(b.dateTime) - new Date(a.dateTime);
            }
            // If only one has dateTime, that one comes first
            if (a.dateTime) return -1;
            if (b.dateTime) return 1;
            // Otherwise, fallback to createdAt if available
            if (a.createdAt && b.createdAt) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
          })
          .map(ev => (
            <li
              key={ev.id}
              className={"border border-blue-200 rounded-xl p-4 sm:p-6 flex flex-col gap-2 cursor-pointer bg-white hover:bg-blue-100/60 transition-all shadow-md w-full"}
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-bold text-lg text-blue-700 hover:underline">
                      {ev.title}
                    </span>
                    <span className="text-sm text-purple-700 font-semibold">{Array.isArray(ev.type) ? ev.type.join(', ') : ev.type}</span>
                  </div>
                  <div className="text-xs text-gray-600">Location: <span className="font-medium text-blue-800">{ev.locationName ? `${ev.locationName} - ` : ''}{ev.latitude}, {ev.longitude}</span></div>
                  <div className="text-xs text-gray-600">Date & Time: <span className="font-medium text-blue-800">{ev.dateTime ? new Date(ev.dateTime).toLocaleString() : 'N/A'}</span></div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button onClick={() => startEdit(ev)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow">Edit</button>
                    <button onClick={() => handleDelete(ev.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow">Delete</button>
                    {!ev.ended ? (
                      <button
                        onClick={async () => {
                          await updateDoc(doc(db, 'events', ev.id), { ended: new Date().toISOString() });
                          setEvents(events => events.map(e => e.id === ev.id ? { ...e, ended: new Date().toISOString() } : e));
                        }}
                        className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-semibold shadow"
                      >
                        End Meeting/Workshop
                      </button>
                    ) : (
                      <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold">Ended</span>
                    )}
                    {/* Download PDF for any event with attendance */}
                    {ev.attendance && (
                      <button
                        onClick={() => handleDownloadPDF(ev)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
                      >
                        Download PDF
                      </button>
                    )}

                    <button
                      onClick={() => handleDownloadNotAttendedExcel(ev)}
                      disabled={downloadingExcelId === ev.id || loadingProfile}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow disabled:opacity-50"
                      title="Download Excel list of users who did not attend"
                    >
                      {downloadingExcelId === ev.id ? 'Preparing Excel...' : 'Not Attended (Excel)'}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
      {/* Attendees Modal removed, replaced with direct PDF download */}
    </div>
    </>
  );
};

export default AdminCreateEvent;
