import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, orderBy, query, where, limit } from 'firebase/firestore';
import Header from '../components/Header';
import { db } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';

const formatDate = (ts) => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
};

const asDate = (ts) => {
  if (!ts) return null;
  return ts.toDate ? ts.toDate() : new Date(ts);
};

const MyItemUsage = () => {
  const { user, profile, loading: loadingProfile } = useUserProfile();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headerUserType = useMemo(() => {
    const role = profile?.role;
    if (role === 'superAdmin') return 'superAdmin';
    if (role === 'siteAdmin') return 'siteAdmin';
    if (role === 'departmentHead') return 'admin';
    return 'user';
  }, [profile]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      setError('');
      try {
        const snap = await getDocs(
          query(
            collection(db, 'inventoryUsage'),
            where('userId', '==', user.uid),
            orderBy('checkedOutAt', 'desc'),
            limit(200)
          )
        );
        setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
        setError('Failed to load usage history.');
      } finally {
        setLoading(false);
      }
    };

    if (!loadingProfile) load();
  }, [user, loadingProfile]);

  const now = new Date();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={!!profile?.isTO} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">My Item Usage</h1>
        <p className="text-sm text-gray-600 mb-6">Your checkout and return history.</p>

        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>}

        {loading ? (
          <div className="text-sm text-gray-600">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-sm text-gray-600">No usage records yet.</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Item</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Checked Out</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Due</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Returned</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const returnedAt = asDate(r.returnedAt);
                  const dueAt = asDate(r.dueAt);
                  const overdue = !returnedAt && dueAt && dueAt < now;

                  return (
                    <tr key={r.id} className="border-t">
                      <td className="p-3">
                        <div className="font-semibold text-gray-900">{r.itemName || 'Item'}</div>
                        <div className="text-xs text-gray-600">{r.itemNo ? `#${r.itemNo}` : ''}</div>
                      </td>
                      <td className="p-3">{formatDate(r.checkedOutAt)}</td>
                      <td className="p-3">{formatDate(r.dueAt)}</td>
                      <td className="p-3">{formatDate(r.returnedAt)}</td>
                      <td className="p-3">
                        {returnedAt ? (
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Returned</span>
                        ) : overdue ? (
                          <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">Overdue</span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">Checked out</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyItemUsage;
