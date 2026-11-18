import { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { FaBox, FaIdCard, FaSearch, FaSpinner } from 'react-icons/fa';
import { db } from '../firebase/config';

const nfcApiUrl = (
  import.meta.env.VITE_NFC_URL ||
  import.meta.env.NFC_URL ||
  'http://localhost:8000'
).trim().replace(/\/+$/, '');

const normalizeCardUid = (value) => String(value ?? '').replace(/[\s:-]/g, '').toUpperCase();

const CardIdentifier = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const scanControllerRef = useRef(null);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        setUsers(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
        setUsersLoaded(true);
      },
      (error) => {
        console.error('Error loading users for card identification:', error);
        setLoadingError('Could not load user assignments. Refresh the page to try again.');
      }
    );
    const unsubscribeItems = onSnapshot(
      collection(db, 'inventory'),
      (snapshot) => {
        setItems(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
        setItemsLoaded(true);
      },
      (error) => {
        console.error('Error loading inventory for card identification:', error);
        setLoadingError('Could not load inventory assignments. Refresh the page to try again.');
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeItems();
      scanControllerRef.current?.abort();
    };
  }, []);

  const identifyCard = async () => {
    if (scanning) {
      scanControllerRef.current?.abort();
      return;
    }

    if (loadingError) {
      setMessage(loadingError);
      return;
    }

    if (!usersLoaded || !itemsLoaded) {
      setMessage('User and inventory assignments are still loading. Try again shortly.');
      return;
    }

    if (!nfcApiUrl) {
      setMessage('The NFC reader address is not configured.');
      return;
    }

    const controller = new AbortController();
    scanControllerRef.current = controller;
    setResult(null);
    setMessage('Ready. Tap a card on the connected reader.');
    setScanning(true);

    try {
      const deadline = Date.now() + 30000;
      while (Date.now() < deadline) {
        const response = await fetch(`${nfcApiUrl}/nfc/read`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`NFC reader returned ${response.status}`);
        }

        const data = await response.json();
        const cardUid = String(data?.uid ?? '').trim();
        if (cardUid) {
          const normalizedUid = normalizeCardUid(cardUid);
          const assignedUsers = users.filter((user) => [
            user.NFC_card_id,
            user.rfidCardId,
            user.rfidUid,
            user.cardUid,
            user.nfcCardId,
          ].some((value) => normalizeCardUid(value) === normalizedUid));
          const assignedItems = items.filter(
            (item) => normalizeCardUid(item.rfidCardId) === normalizedUid
          );
          setResult({ cardUid, users: assignedUsers, items: assignedItems });
          setMessage('');
          return;
        }

        await new Promise((resolve) => window.setTimeout(resolve, 1000));
      }

      setMessage('No card was detected. Hold it near the reader and try again.');
    } catch (error) {
      if (error.name === 'AbortError') {
        setMessage('Card scan cancelled.');
      } else {
        console.error('Error identifying NFC card:', error);
        setMessage('Could not read a card. Check that the NFC reader service is running.');
      }
    } finally {
      if (scanControllerRef.current === controller) {
        scanControllerRef.current = null;
        setScanning(false);
      }
    }
  };

  const isErrorMessage = message.startsWith('Could not') ||
    message.includes('not configured') ||
    message.includes('Refresh the page');

  return (
    <main className="mx-auto max-w-5xl">
      <section className="overflow-hidden rounded-[26px] border border-indigo-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 px-5 py-7 text-white sm:px-8 sm:py-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <FaIdCard className="text-2xl" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-100">Super Admin tool</p>
                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Card Identifier</h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
                  Scan an RFID/NFC card to check whether it is assigned to a user, an inventory item, or both.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={identifyCard}
              disabled={!usersLoaded || !itemsLoaded || Boolean(loadingError)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {scanning ? <FaSpinner className="animate-spin" /> : <FaSearch />}
              {scanning ? 'Cancel scan' : 'Scan a card'}
            </button>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-8">
          {(!usersLoaded || !itemsLoaded) && !loadingError && (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <FaSpinner className="animate-spin" />
              Loading user and inventory assignments…
            </div>
          )}

          {loadingError && (
            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {loadingError}
            </p>
          )}

          {message && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-xl px-4 py-3 text-sm ${
                isErrorMessage
                  ? 'border border-rose-200 bg-rose-50 text-rose-700'
                  : 'border border-indigo-100 bg-indigo-50 text-indigo-700'
              }`}
            >
              {message}
            </p>
          )}

          {result && (
            <div className="space-y-4" role="status" aria-live="polite">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scanned card ID</p>
                  <p className="mt-1 break-all font-mono text-base font-bold text-slate-900">{result.cardUid}</p>
                </div>
                {result.users.length + result.items.length > 1 && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    Multiple assignments found
                  </span>
                )}
              </div>

              {result.users.length === 0 && result.items.length === 0 ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                  <p className="font-bold text-amber-900">No assignment found</p>
                  <p className="mt-1 text-sm text-amber-800">
                    This card is not assigned to a user or an inventory item.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {result.users.map((user) => (
                    <article key={`user-${user.id}`} className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
                      <div className="flex items-center gap-2 text-blue-700">
                        <FaIdCard />
                        <p className="text-xs font-bold uppercase tracking-wide">Assigned to user</p>
                      </div>
                      <p className="mt-3 text-lg font-bold text-slate-900">
                        {user.name || user.username || user.displayName || 'Unnamed user'}
                      </p>
                      {user.email && <p className="mt-1 break-all text-sm text-slate-600">{user.email}</p>}
                      <p className="mt-3 text-xs capitalize text-slate-500">
                        {[user.role || user.userType, user.department || user.firstPriority]
                          .filter(Boolean)
                          .join(' · ') || 'User account'}
                      </p>
                    </article>
                  ))}

                  {result.items.map((item) => (
                    <article key={`item-${item.id}`} className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <FaBox />
                        <p className="text-xs font-bold uppercase tracking-wide">Assigned to inventory item</p>
                      </div>
                      <p className="mt-3 text-lg font-bold text-slate-900">{item.itemName || 'Unnamed item'}</p>
                      {item.itemNo && <p className="mt-1 text-sm text-slate-600">Item no: {item.itemNo}</p>}
                      <p className="mt-3 text-xs capitalize text-slate-500">
                        {[item.category, item.status || 'available'].filter(Boolean).join(' · ')}
                      </p>
                    </article>
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-500">This lookup is read-only. No scan or assignment data is saved.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CardIdentifier;
