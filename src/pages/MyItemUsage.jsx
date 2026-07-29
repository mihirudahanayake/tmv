import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Header from '../components/Header';
import { db } from '../firebase/config';
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

const normalizeText = (value) => String(value || '').trim().toLowerCase();

const samePerson = (member, profile, user) => {
  if (!member) return false;

  const memberId = String(member.id || member.userId || '').trim();
  const memberEmail = normalizeText(member.email);
  const memberName = normalizeText(member.name);
  const profileId = String(profile?.id || user?.uid || '').trim();
  const profileEmail = normalizeText(profile?.email || user?.email);
  const profileName = normalizeText(profile?.name || profile?.displayName);

  return Boolean(
    (memberId && memberId === profileId) ||
    (memberEmail && memberEmail === profileEmail) ||
    (memberName && (memberName === profileName || memberName === profileEmail))
  );
};

const MyItemUsage = () => {
  const { user, profile, loading: loadingProfile } = useUserProfile();
  const [usageRows, setUsageRows] = useState([]);
  const [accessRecords, setAccessRecords] = useState([]);
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
      setAccessRecords([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setError('');

    const usageQuery = query(
      collection(db, 'inventoryUsage'),
      where('userId', '==', user.uid)
    );

    const accessQuery = query(collection(db, 'accessRecords'));

    const unsubscribeUsage = onSnapshot(
      usageQuery,
      (snapshot) => {
        setUsageRows(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        console.error('inventoryUsage listener failed:', err);
        setError('Failed to load usage history.');
        setLoading(false);
      }
    );

    const unsubscribeAccess = onSnapshot(
      accessQuery,
      (snapshot) => {
        setAccessRecords(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.error('accessRecords listener failed:', err);
      }
    );

    return () => {
      unsubscribeUsage();
      unsubscribeAccess();
    };
  }, [loadingProfile, user?.uid]);

  const enrichedRows = useMemo(() => {
    const issueRecords = accessRecords.filter((record) => record.action === 'issue' && Array.isArray(record.itemsIssued));

    const rowsFromUsage = usageRows.map((usage) => {
      const matchingIssueRecord = issueRecords.find((record) =>
        record.itemsIssued.some((item) => item.itemId === usage.itemId || item.itemNo === usage.itemNo)
      );

      const matchingIssuedItem = matchingIssueRecord?.itemsIssued.find((item) =>
        item.itemId === usage.itemId || item.itemNo === usage.itemNo
      );

      const latestComment = getLastComment(matchingIssuedItem?.comments || usage.comments || []);
      const returnedAt = toDate(usage.returnedAt || matchingIssuedItem?.returnedAt);
      const checkedOutAt = toDate(usage.checkedOutAt || matchingIssueRecord?.createdAt);
      const dueAt = getOverdueAt(checkedOutAt, toDate(usage.dueAt));

      const issuedMembers = Array.isArray(usage.issuedToMembers) ? usage.issuedToMembers : [];
      const currentUserWasIssued = issuedMembers.some((member) => samePerson(member, profile, user));
      const currentUserMatchesPrimary = samePerson(
        {
          id: usage.userId,
          name: usage.userName,
          email: usage.userEmail,
        },
        profile,
        user
      );

      if (!currentUserWasIssued && !currentUserMatchesPrimary) return null;

      return {
        key: `usage-${usage.id}`,
        source: 'usage',
        ...usage,
        issuedToName: usage.userName || profile?.name || profile?.email || 'You',
        issuedMembers,
        issuedByName: usage.issuedByName || matchingIssueRecord?.createdByName || 'Unknown',
        returnedByName: usage.returnedByName || matchingIssuedItem?.returnedByName || usage.updatedByName || 'Unknown',
        checkedOutAt,
        returnedAt,
        dueAt,
        commentText: usage.comment || latestComment?.text || '',
        statusText: returnedAt ? 'Returned' : dueAt && dueAt < new Date() ? 'Overdue' : 'Checked out',
      };
    }).filter(Boolean);

    const rowsFromIssueRecords = issueRecords.flatMap((record) => {
      const issueTime = toDate(record.createdAt);
      const issuedByName = record.createdByName || 'Unknown';

      return record.itemsIssued
        .filter((item) => {
          const members = Array.isArray(record.issuedToMembers) ? record.issuedToMembers : [];
          return members.some((member) => samePerson(member, profile, user));
        })
        .map((item, index) => {
          const itemReturnedAt = toDate(item.returnedAt);
          const itemDueAt = toDate(item.dueAt);
          const itemMembers = Array.isArray(record.issuedToMembers) ? record.issuedToMembers : [];
          const dueByAt = getOverdueAt(issueTime, itemDueAt);
          const issuedToName = itemMembers
            .filter((member) => samePerson(member, profile, user))
            .map((member) => member.name || member.email || 'You')
            .join(', ') || profile?.name || profile?.email || 'You';

          return {
            key: `issue-${record.id}-${item.itemId || item.itemNo || index}`,
            source: 'issue',
            id: `${record.id}-${item.itemId || item.itemNo || index}`,
            itemId: item.itemId || item.itemNo || `${record.id}-${index}`,
            itemNo: item.itemNo || '',
            itemName: item.itemName || 'Item',
            issuedToName,
            issuedMembers: itemMembers,
            issuedByName,
            returnedByName: item.returnedByName || 'Unknown',
            checkedOutAt: issueTime,
            returnedAt: itemReturnedAt,
            dueAt: dueByAt,
            commentText: getLastComment(item.comments)?.text || record.description || '',
            statusText: itemReturnedAt ? 'Returned' : dueByAt && dueByAt < new Date() ? 'Overdue' : 'Checked out',
          };
        });
    });

    const rows = [...rowsFromUsage, ...rowsFromIssueRecords].sort((a, b) => {
      const aTime = a.checkedOutAt?.getTime?.() || 0;
      const bTime = b.checkedOutAt?.getTime?.() || 0;
      return bTime - aTime;
    });

    return rows;
  }, [accessRecords, profile, usageRows, user]);

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