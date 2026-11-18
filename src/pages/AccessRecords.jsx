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

const getRecordDate = (record) => {
  const value = record.createdAt || record.timestamp || record.time;
  if (!value) return null;
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getLocalDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    authorization: 'all',
    action: 'all',
    user: '',
  });

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
        setRecords(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((record) => !(
              record.authorized &&
              (
                (record.action === 'issue' && Array.isArray(record.itemsIssued)) ||
                (record.action === 'return' && record.itemId)
              )
            ))
        );
        setLoading(false);
      },
      (e) => {
        console.error(e);
        setError('Failed to load access records.');
        setLoading(false);
      }
    );
  }, []);

  const actionOptions = [...new Set(records.map((record) => record.action).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const normalizedUserFilter = filters.user.trim().toLocaleLowerCase();
  const filteredRecords = records.filter((record) => {
    const recordDate = getRecordDate(record);
    const recordDateKey = recordDate ? getLocalDateKey(recordDate) : '';
    const matchesFromDate = !filters.fromDate || (recordDateKey && recordDateKey >= filters.fromDate);
    const matchesToDate = !filters.toDate || (recordDateKey && recordDateKey <= filters.toDate);
    const matchesAuthorization = filters.authorization === 'all' ||
      (filters.authorization === 'authorized' && record.authorized === true) ||
      (filters.authorization === 'unauthorized' && record.authorized !== true);
    const matchesAction = filters.action === 'all' || record.action === filters.action;
    const matchesUser = !normalizedUserFilter || [
      record.userName,
      record.userEmail,
      record.userId,
      record.scannedByUid,
    ].some((value) => String(value || '').toLocaleLowerCase().includes(normalizedUserFilter));

    return matchesFromDate && matchesToDate && matchesAuthorization && matchesAction && matchesUser;
  });

  const clearFilters = () => setFilters({
    fromDate: '',
    toDate: '',
    authorization: 'all',
    action: 'all',
    user: '',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={!!profile?.isTO} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Access Records</h1>
        <p className="text-sm text-gray-600 mb-6">Shows authorized and unauthorized access attempts (with photos when available).</p>

        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>}

        <section
          aria-label="Filter access records"
          className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900">Filter records</h2>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clear filters
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <label className="text-sm font-medium text-gray-700">
              From date
              <input
                type="date"
                value={filters.fromDate}
                max={filters.toDate || undefined}
                onChange={(event) => setFilters((current) => ({ ...current, fromDate: event.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              To date
              <input
                type="date"
                value={filters.toDate}
                min={filters.fromDate || undefined}
                onChange={(event) => setFilters((current) => ({ ...current, toDate: event.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Authorization
              <select
                value={filters.authorization}
                onChange={(event) => setFilters((current) => ({ ...current, authorization: event.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All statuses</option>
                <option value="authorized">Authorized</option>
                <option value="unauthorized">Unauthorized</option>
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Action
              <select
                value={filters.action}
                onChange={(event) => setFilters((current) => ({ ...current, action: event.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All actions</option>
                {actionOptions.map((action) => <option key={action} value={action}>{action}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              User
              <input
                type="search"
                value={filters.user}
                onChange={(event) => setFilters((current) => ({ ...current, user: event.target.value }))}
                placeholder="Name, email, or ID"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>
          {!loading && (
            <p className="mt-3 text-xs text-gray-500" aria-live="polite">
              Showing {filteredRecords.length} of {records.length} records
            </p>
          )}
        </section>

        {loading ? (
          <div className="text-sm text-gray-600">Loading…</div>
        ) : filteredRecords.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-sm text-gray-600 shadow">
            {records.length === 0
              ? 'No access records found.'
              : 'No records match the selected filters.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredRecords.map((r) => {
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