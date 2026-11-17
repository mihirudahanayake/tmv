import { useEffect, useMemo, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import Header from '../components/Header';
import { functions } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';

const formatDateTime = (value) => {
  if (!value) return 'Unknown';
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown' : date.toLocaleString();
};

const toDate = (value) => {
  if (!value) return null;
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const addHours = (date, hours) => {
  if (!date) return null;
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
};

const getLastComment = (comments) => {
  if (!Array.isArray(comments) || comments.length === 0) return null;
  return comments[comments.length - 1];
};

const getOverdueAt = (checkedOutAt, dueAt) => checkedOutAt ? addHours(checkedOutAt, 24) : dueAt;

const MyItemUsage = () => {
  const { user, profile, loading: loadingProfile } = useUserProfile();
  const [usageRows, setUsageRows] = useState([]);
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
    if (loadingProfile) return undefined;
    if (!user?.uid) {
      setUsageRows([]);
      setLoading(false);
      setError('');
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError('');

    const loadUsage = async () => {
      try {
        await user.getIdToken(true);
        const getUserItemUsage = httpsCallable(functions, 'getUserItemUsage');
        const result = await getUserItemUsage();
        if (!Array.isArray(result.data?.usageRows)) {
          throw new Error('Invalid item usage response from the server.');
        }
        if (!cancelled) setUsageRows(result.data.usageRows);
      } catch (err) {
        console.error('Failed to load usage history:', err);
        if (!cancelled) setError('Failed to load usage history.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUsage();
    return () => {
      cancelled = true;
    };
  }, [loadingProfile, user]);

  const enrichedRows = useMemo(() => {
    const rowsFromUsage = usageRows.map((usage) => {
      const latestComment = getLastComment(usage.comments || []);
      const returnedAt = toDate(usage.returnedAt);
      const checkedOutAt = toDate(usage.checkedOutAt || usage.createdAt);
      const dueAt = getOverdueAt(checkedOutAt, toDate(usage.dueAt));

      const issuedMembers = Array.isArray(usage.issuedToMembers) ? usage.issuedToMembers : [];

      return {
        key: `usage-${usage.id}`,
        source: 'usage',
        ...usage,
        issuedToName: usage.userName || profile?.name || profile?.email || 'You',
        issuedMembers,
        issuedByName: usage.issuedByName || 'Unknown',
        returnedByName: usage.returnedByName || usage.updatedByName || 'Unknown',
        checkedOutAt,
        returnedAt,
        dueAt,
        commentText: usage.comment || latestComment?.text || usage.description || '',
        statusText: returnedAt ? 'Returned' : dueAt && dueAt < new Date() ? 'Overdue' : 'Checked out',
      };
    });

    const rows = rowsFromUsage.map((row) => ({ ...row, key: `usage-${row.id}` })).sort((a, b) => {
      const aTime = a.checkedOutAt?.getTime?.() || 0;
      const bTime = b.checkedOutAt?.getTime?.() || 0;
      return bTime - aTime;
    });

    return rows;
  }, [profile, usageRows, user]);

  const summary = useMemo(() => {
    const total = enrichedRows.length;
    const returned = enrichedRows.filter((row) => row.returnedAt).length;
    const active = total - returned;
    const overdue = enrichedRows.filter((row) => !row.returnedAt && row.dueAt && row.dueAt < new Date()).length;

    return { total, returned, active, overdue };
  }, [enrichedRows]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={!!profile?.isTO} />

      <main className="container mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Item Usage</h1>
          <p className="mt-1 text-sm text-gray-600">
            Full history of the items issued to you, including who issued them, when they were returned, and any notes.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="rounded-xl bg-white shadow p-3 sm:p-4 border border-gray-100">
            <div className="text-xs uppercase tracking-wide text-gray-500">Total</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">{summary.total}</div>
          </div>
          <div className="rounded-xl bg-white shadow p-3 sm:p-4 border border-gray-100">
            <div className="text-xs uppercase tracking-wide text-gray-500">Active</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-blue-700">{summary.active}</div>
          </div>
          <div className="rounded-xl bg-white shadow p-3 sm:p-4 border border-gray-100">
            <div className="text-xs uppercase tracking-wide text-gray-500">Returned</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-green-700">{summary.returned}</div>
          </div>
          <div className="rounded-xl bg-white shadow p-3 sm:p-4 border border-gray-100">
            <div className="text-xs uppercase tracking-wide text-gray-500">Overdue</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-red-700">{summary.overdue}</div>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl bg-white p-6 shadow text-sm text-gray-600">Loading usage history...</div>
        ) : enrichedRows.length === 0 ? (
          <div className="rounded-xl bg-white p-6 shadow text-sm text-gray-600">
            No usage records found for this account.
          </div>
        ) : (
          <div className="space-y-4">
            {enrichedRows.map((row) => (
              <div key={row.key} className="rounded-2xl bg-white shadow border border-gray-100 overflow-hidden">
                <div className="flex flex-col gap-3 p-4 sm:p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-lg font-semibold text-gray-900">{row.itemName || 'Item'}</h2>
                      <span className={`text-xs px-2 py-1 rounded-full ${row.returnedAt ? 'bg-green-100 text-green-700' : row.statusText === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                        {row.statusText}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {row.itemNo ? `Item No: ${row.itemNo}` : 'No item number'}
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Issued to:</span> {row.issuedToName}
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Issued by:</span> {row.issuedByName}
                    </div>
                    {Array.isArray(row.issuedMembers) && row.issuedMembers.length > 0 && (
                      <div className="mt-1 text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">All issued users:</span>{' '}
                        {row.issuedMembers.map((member) => member.name || member.email || 'User').join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm w-full">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-xs uppercase tracking-wide text-gray-500">Checked out</div>
                      <div className="mt-1 font-semibold text-gray-900">{formatDateTime(row.checkedOutAt)}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-xs uppercase tracking-wide text-gray-500">Due</div>
                      <div className="mt-1 font-semibold text-gray-900">{formatDateTime(row.dueAt)}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-xs uppercase tracking-wide text-gray-500">Returned</div>
                      <div className="mt-1 font-semibold text-gray-900">{formatDateTime(row.returnedAt)}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-xs uppercase tracking-wide text-gray-500">Returned by</div>
                      <div className="mt-1 font-semibold text-gray-900">{row.returnedAt ? row.returnedByName : '-'}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3 sm:col-span-2 lg:col-span-3 break-words">
                      <div className="text-xs uppercase tracking-wide text-gray-500">Comment / note</div>
                      <div className="mt-1 font-semibold text-gray-900">{row.commentText || 'No comment'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyItemUsage;