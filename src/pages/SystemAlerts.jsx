import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import Header from '../components/Header';
import { db } from '../firebase/config';

const formatDate = (value) => {
  if (!value) return 'Time unavailable';
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? 'Time unavailable' : date.toLocaleString();
};

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const alertsQuery = query(
      collection(db, 'accessRecords'),
      orderBy('createdAt', 'desc'),
      limit(200)
    );

    return onSnapshot(
      alertsQuery,
      (snapshot) => {
        setAlerts(
          snapshot.docs
            .map((record) => ({ id: record.id, ...record.data() }))
            .filter((record) => record.doorSensorTriggered === true && record.authorized === false)
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
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="superAdmin" />
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <div className="mb-2 flex items-center gap-3">
          <FaBell className="text-2xl text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">System Alerts</h1>
        </div>
        <p className="mb-6 text-sm text-gray-600">
          Security alerts, including cupboard openings without a valid NFC scan.
        </p>

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
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-white p-4 shadow-sm"
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
