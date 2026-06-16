import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import Header from '../components/Header';
import { db } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';

const formatDate = (ts) => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
};

const AccessRecords = () => {
  const { profile } = useUserProfile();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headerUserType = profile?.userType || (profile?.role === 'superAdmin' ? 'superAdmin' : profile?.role === 'siteAdmin' ? 'siteAdmin' : profile?.role === 'departmentHead' ? 'admin' : profile?.role === 'supervisorTO' ? 'supervisor' : 'user');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const snap = await getDocs(
          query(collection(db, 'accessRecords'), orderBy('createdAt', 'desc'), limit(200))
        );
        setRecords(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
        setError('Failed to load access records.');
      } finally {
        setLoading(false);
      }
    };

    load();
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
              const photoUrl = r.photoUrl || r.photoURL || null;
              return (
                <div key={r.id} className="bg-white rounded-lg shadow p-4">
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
                        {formatDate(r.createdAt)}
                      </div>

                      <div className="mt-2 text-sm text-gray-800">
                        <div><span className="font-semibold">User:</span> {r.userName || 'Unknown'} {r.userEmail ? `(${r.userEmail})` : ''}</div>
                        {r.rfidCardId && <div><span className="font-semibold">RFID:</span> {r.rfidCardId}</div>}
                        {r.itemName && <div><span className="font-semibold">Item:</span> {r.itemName} {r.itemNo ? `(#${r.itemNo})` : ''}</div>}
                        {r.action && <div><span className="font-semibold">Action:</span> {r.action}</div>}
                        {r.reason && <div><span className="font-semibold">Reason:</span> {r.reason}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default AccessRecords;
