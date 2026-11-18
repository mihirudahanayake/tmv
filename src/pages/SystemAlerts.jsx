import { useEffect, useState } from 'react';
import { collection, doc, limit, onSnapshot, orderBy, query, updateDoc, writeBatch } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import Header from '../components/Header';
import { db } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';

const formatDate = (value) => {
  if (!value) return 'Time unavailable';
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? 'Time unavailable' : date.toLocaleString();
};

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserProfile();
  const unreadAlerts = alerts.filter((alert) => alert.read === false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return undefined;
    }

    const alertsQuery = query(
      collection(db, 'users', user.uid, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(200)
    );

    return onSnapshot(
      alertsQuery,
      (snapshot) => {
        setAlerts(
          snapshot.docs
            .map((record) => ({ id: record.id, ...record.data() }))
            .filter((record) => record.source === 'system' && record.type === 'unauthorized-access')
        );
        setError('');
        setLoading(false);
      },
      (loadError) => {
        console.error('Failed to load system alerts:', loadError);
        setError('Could not load system alerts. Please try again.');
        setLoading(false);
      }
    );
  }, [user]);

  const markAlertRead = async (alert) => {
    if (!user || alert.read !== false) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'notifications', alert.id), {
        read: true,
      });
    } catch (updateError) {
      console.error('Failed to mark system alert as read:', updateError);
      setError('Could not mark the alert as read. Please try again.');
    }
  };

  const markAllAlertsRead = async () => {
    if (!user || unreadAlerts.length === 0 || markingAllRead) return;
    setMarkingAllRead(true);
    setError('');
    try {
      for (let offset = 0; offset < unreadAlerts.length; offset += 450) {
        const batch = writeBatch(db);
        unreadAlerts.slice(offset, offset + 450).forEach((alert) => {
          batch.update(doc(db, 'users', user.uid, 'notifications', alert.id), {
            read: true,
          });
        });
        await batch.commit();
      }
    } catch (updateError) {
      console.error('Failed to mark all system alerts as read:', updateError);
      setError('Could not mark all alerts as read. Please try again.');
    } finally {
      setMarkingAllRead(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="superAdmin" />
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <div className="mb-2 flex items-center gap-3">
          <FaBell className="text-2xl text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">System Alerts</h1>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            Security alerts, including cupboard openings without a valid NFC scan.
          </p>
          <button
            type="button"
            onClick={markAllAlertsRead}
            disabled={markingAllRead || unreadAlerts.length === 0}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
          >
            {markingAllRead ? 'Marking…' : `Mark all as read (${unreadAlerts.length})`}
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-gray-600">Loading system alerts…</p>
        ) : alerts.length === 0 ? (
          <p className="rounded-lg bg-white p-5 text-sm text-gray-600 shadow">
            No system alerts found.
          </p>
        ) : (
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className={`flex items-start gap-3 rounded-xl border bg-white p-4 shadow-sm ${
                  alert.read === false ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <FaBell className="mt-1 shrink-0 text-red-600" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-red-800">Unauthorized cupboard door opening</p>
                  <p className="mt-1 text-sm text-gray-700">
                    {alert.reason || 'The door opened without a valid NFC authorization.'}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {formatDate(alert.createdAt)}
                    {alert.userName ? ` · ${alert.userName}` : ''}
                    {alert.rfidCardId ? ` · Card ${alert.rfidCardId}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => markAlertRead(alert)}
                  disabled={alert.read !== false}
                  className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-default disabled:opacity-60"
                >
                  {alert.read === false ? 'Mark as read' : 'Read'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/access-records')}
                  className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                >
                  View record
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default SystemAlerts;
