import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import Header from '../components/Header';
import { db } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';

const formatDate = (ts) => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
};

const resolvePhotoUrl = (path) => {
  if (!path) return null;
  if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(path) || /^(data|blob):/i.test(path)) {
    return path;
  }

  const serverUrl = import.meta.env.VITE_DOOR_API_URL?.trim().replace(/\/+$/, '');
  return serverUrl ? `${serverUrl}/${path.replace(/^\/+/, '')}` : path;
};

const getPhotoUrl = (record) => {
  const imagePrefix = import.meta.env.VITE_ESP_IMAGE_URL_PREFIX?.trim();
  return record.imageName && imagePrefix
    ? `${imagePrefix}${encodeURIComponent(record.imageName)}`
    : resolvePhotoUrl(record.photoUrl || record.photoURL || record.imagePath);
};

const formatDetailValue = (value) => {
  if (value == null || value === '') return '—';
  if (typeof value?.toDate === 'function') return formatDate(value);
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const formatDetailLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase());

const AccessRecords = () => {
  const { profile } = useUserProfile();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const headerUserType = profile?.userType || (profile?.role === 'superAdmin' ? 'superAdmin' : profile?.role === 'siteAdmin' ? 'siteAdmin' : profile?.role === 'departmentHead' ? 'admin' : profile?.role === 'supervisorTO' ? 'supervisor' : 'user');

  useEffect(() => {
    if (!selectedRecord) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedRecord(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRecord]);

  useEffect(() => {
    setLoading(true);
    setError('');
    return onSnapshot(
      query(collection(db, 'accessRecords'), orderBy('createdAt', 'desc'), limit(200)),
      (snap) => {
        setRecords(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (e) => {
        console.error(e);
        setError('Failed to load access records.');
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={!!profile?.isTO} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Access Records</h1>
        <p className="text-sm text-gray-600 mb-6">Shows authorized and unauthorized access attempts (with photos when available).</p>

        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>}

        {loading ? (
          <div className="text-sm text-gray-600">Loading…</div>
        ) : records.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-sm text-gray-600">No access records found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {records.map((r) => {
              const authorized = !!r.authorized;
              const photoUrl = getPhotoUrl(r);
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRecord(r)}
                  aria-label={`View ${authorized ? 'authorized' : 'unauthorized'} access record for ${r.userName || 'unknown user'}`}
                  className="w-full rounded-lg bg-white p-4 text-left shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                      {photoUrl ? (
                        <img src={photoUrl} alt="Access" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-500">No photo</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-gray-900 text-sm">
                          {authorized ? 'Authorized' : 'Unauthorized'} Access
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${authorized ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {authorized ? 'OK' : 'ALERT'}
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 mt-1">
                        {formatDate(r.createdAt || r.timestamp || r.time)}
                      </div>

                      <div className="mt-2 text-sm text-gray-800">
                        <div><span className="font-semibold">User:</span> {r.userName || 'Unknown'} {r.userEmail ? `(${r.userEmail})` : ''}</div>
                        {r.rfidCardId && <div><span className="font-semibold">RFID:</span> {r.rfidCardId}</div>}
                        {r.imageName && <div><span className="font-semibold">Image:</span> {r.imageName}</div>}
                        {r.itemName && <div><span className="font-semibold">Item:</span> {r.itemName} {r.itemNo ? `(#${r.itemNo})` : ''}</div>}
                        {r.action && <div><span className="font-semibold">Action:</span> {r.action}</div>}
                        {r.reason && <div><span className="font-semibold">Reason:</span> {r.reason}</div>}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      {selectedRecord && (() => {
        const authorized = !!selectedRecord.authorized;
        const photoUrl = getPhotoUrl(selectedRecord);
        const details = Object.entries(selectedRecord).filter(
          ([key]) => !['id', 'photoUrl', 'photoURL', 'imagePath'].includes(key)
        );

        return (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-3 sm:p-6"
            onClick={() => setSelectedRecord(null)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="access-record-title"
              className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4 sm:px-7">
                <div>
                  <h2 id="access-record-title" className="text-xl font-bold text-gray-900">
                    {authorized ? 'Authorized' : 'Unauthorized'} Access
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatDate(selectedRecord.createdAt || selectedRecord.timestamp || selectedRecord.time)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  aria-label="Close access record details"
                  className="rounded-full p-2 text-2xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  &times;
                </button>
              </div>

              <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-2">
                <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={`Access record for ${selectedRecord.userName || 'unknown user'}`}
                      className="max-h-[65vh] w-full object-contain"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No photo available</span>
                  )}
                </div>

                <div>
                  <div className={`mb-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${authorized ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {authorized ? 'OK · Authorized' : 'Alert · Unauthorized'}
                  </div>
                  <dl className="divide-y divide-gray-100">
                    {details.map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-3 py-3 text-sm">
                        <dt className="font-semibold text-gray-600">{formatDetailLabel(key)}</dt>
                        <dd className="col-span-2 break-words text-gray-900">
                          {formatDetailValue(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </section>
          </div>
        );
      })()}
    </div>
  );
};

export default AccessRecords;
