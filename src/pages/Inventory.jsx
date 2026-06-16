import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaBox, FaSearch, FaPlus, FaSpinner, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';
import { useUserProfile } from '../hooks/useUserProfile';
import { isUserTO } from '../utils/authz';

const Inventory = () => {
  const { profile } = useUserProfile();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [checkoutItemId, setCheckoutItemId] = useState('');
  const [rfidCardId, setRfidCardId] = useState('');
  const [dueDays, setDueDays] = useState(7);
  const [checkingOut, setCheckingOut] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [formData, setFormData] = useState({
    itemNo: '',
    itemName: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const role = profile?.role || 'member';
  const toEnabled = isUserTO(profile);
  const canManageInventory = toEnabled || role === 'superAdmin' || role === 'siteAdmin';
  const canDownloadReports = toEnabled || role === 'superAdmin' || role === 'siteAdmin';

  const headerUserType = role === 'departmentHead' ? 'admin'
    : role === 'superAdmin' ? 'superAdmin'
      : role === 'siteAdmin' ? 'siteAdmin'
        : 'user';

  const fetchItems = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'inventory'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      // sort alphabetically by itemName
      data.sort((a, b) => {
        const nameA = (a.itemName || '').toLowerCase();
        const nameB = (b.itemName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setItems(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setMessage({ type: 'error', text: 'Failed to load inventory.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (editingItem) {
        // Update existing item
        const itemRef = doc(db, 'inventory', editingItem.id);
        await updateDoc(itemRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
        setMessage({ type: 'success', text: 'Item updated successfully!' });
      } else {
        // Add new item
        await addDoc(collection(db, 'inventory'), {
          ...formData,
          status: 'available',
          createdAt: serverTimestamp()
        });
        setMessage({ type: 'success', text: 'Item added successfully!' });
      }

      setFormData({ itemNo: '', itemName: '', category: '', description: '' });
      setShowAddForm(false);
      setEditingItem(null);
      await fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      setMessage({ 
        type: 'error', 
        text: editingItem ? 'Failed to update item.' : 'Failed to add item.' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      itemNo: item.itemNo,
      itemName: item.itemName,
      category: item.category || '',
      description: item.description || ''
    });
    setShowAddForm(true);
    setMessage({ type: '', text: '' });
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (itemId, itemName) => {
    if (!canManageInventory) return;
    if (!window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'inventory', itemId));
      setMessage({ type: 'success', text: 'Item deleted successfully!' });
      await fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      setMessage({ type: 'error', text: 'Failed to delete item.' });
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({ itemNo: '', itemName: '', category: '', description: '' });
    setShowAddForm(false);
    setMessage({ type: '', text: '' });
  };

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    if (!normalizedSearch) return true;

    const name = (item.itemName || '').toLowerCase();
    const no = (item.itemNo || '').toLowerCase();

    return name.includes(normalizedSearch) || no.includes(normalizedSearch);
  });

  const downloadCsv = (filename, header, rows) => {
    const escape = (v) => {
      const s = v == null ? '' : String(v);
      if (/[\n\r,"]/g.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };

    const lines = [header.map(escape).join(',')].concat(rows.map((r) => r.map(escape).join(',')));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadInventoryReport = async () => {
    if (!canDownloadReports) return;
    setDownloading(true);
    try {
      const snap = await getDocs(collection(db, 'inventory'));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || '')));
      downloadCsv(
        'inventory_report.csv',
        ['itemNo', 'itemName', 'category', 'status', 'checkedOutTo', 'dueAt'],
        data.map((i) => [
          i.itemNo || '',
          i.itemName || '',
          i.category || '',
          i.status || 'available',
          i.checkedOutToName || '',
          i.dueAt?.toDate ? i.dueAt.toDate().toISOString() : (i.dueAt || ''),
        ])
      );
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to download inventory report.' });
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadUsageReport = async () => {
    if (!canDownloadReports) return;
    setDownloading(true);
    try {
      const snap = await getDocs(query(collection(db, 'inventoryUsage'), orderBy('checkedOutAt', 'desc'), limit(2000)));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      downloadCsv(
        'inventory_usage_report.csv',
        ['itemNo', 'itemName', 'userName', 'rfidCardId', 'checkedOutAt', 'dueAt', 'returnedAt', 'status'],
        data.map((u) => [
          u.itemNo || '',
          u.itemName || '',
          u.userName || '',
          u.rfidCardId || '',
          u.checkedOutAt?.toDate ? u.checkedOutAt.toDate().toISOString() : (u.checkedOutAt || ''),
          u.dueAt?.toDate ? u.dueAt.toDate().toISOString() : (u.dueAt || ''),
          u.returnedAt?.toDate ? u.returnedAt.toDate().toISOString() : (u.returnedAt || ''),
          u.status || '',
        ])
      );
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to download usage report.' });
    } finally {
      setDownloading(false);
    }
  };

  const logAccessRecord = async (payload) => {
    try {
      await addDoc(collection(db, 'accessRecords'), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('Failed to write access record', e);
    }
  };

  const handleCheckout = async () => {
    if (!canManageInventory) return;
    const trimmedRfid = rfidCardId.trim();
    const item = items.find((i) => i.id === checkoutItemId);
    if (!item) {
      setMessage({ type: 'error', text: 'Select an item to check out.' });
      return;
    }
    if (!trimmedRfid) {
      setMessage({ type: 'error', text: 'Scan/enter an RFID card id.' });
      return;
    }
    if ((item.status || 'available') === 'checkedOut') {
      setMessage({ type: 'error', text: 'This item is already checked out.' });
      return;
    }

    setCheckingOut(true);
    setMessage({ type: '', text: '' });

    try {
      const userSnap = await getDocs(
        query(collection(db, 'users'), where('rfidCardId', '==', trimmedRfid), limit(1))
      );

      if (userSnap.empty) {
        await logAccessRecord({
          authorized: false,
          action: 'checkout',
          reason: 'Unknown RFID card',
          rfidCardId: trimmedRfid,
          itemId: item.id,
          itemNo: item.itemNo || null,
          itemName: item.itemName || null,
          createdByUid: profile?.id || null,
          createdByName: profile?.name || profile?.email || null,
        });
        setMessage({ type: 'error', text: 'Unauthorized: RFID card not recognized.' });
        return;
      }

      const uDoc = userSnap.docs[0];
      const uData = uDoc.data() || {};
      const uRole = uData.role || (uData.userType === 'admin' ? 'departmentHead' : uData.userType === 'superAdmin' ? 'superAdmin' : uData.userType === 'supervisor' ? 'supervisorTO' : 'member');
      const isMember = uRole === 'member';

      if (!isMember) {
        await logAccessRecord({
          authorized: false,
          action: 'checkout',
          reason: 'RFID belongs to a non-member account',
          rfidCardId: trimmedRfid,
          userId: uDoc.id,
          userName: uData.name || null,
          userEmail: uData.email || null,
          photoUrl: uData.photoURL || uData.avatarUrl || null,
          itemId: item.id,
          itemNo: item.itemNo || null,
          itemName: item.itemName || null,
          createdByUid: profile?.id || null,
          createdByName: profile?.name || profile?.email || null,
        });
        setMessage({ type: 'error', text: 'Unauthorized: this RFID is not a member card.' });
        return;
      }

      const days = Number.isFinite(Number(dueDays)) ? Math.max(1, Math.min(60, Number(dueDays))) : 7;
      const dueAtDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      const dueAt = Timestamp.fromDate(dueAtDate);

      const usageRef = doc(collection(db, 'inventoryUsage'));
      const itemRef = doc(db, 'inventory', item.id);
      const accessRef = doc(collection(db, 'accessRecords'));

      const batch = writeBatch(db);

      batch.set(usageRef, {
        itemId: item.id,
        itemNo: item.itemNo || '',
        itemName: item.itemName || '',
        userId: uDoc.id,
        userName: uData.name || uData.email || 'Member',
        userEmail: uData.email || '',
        rfidCardId: trimmedRfid,
        checkedOutAt: serverTimestamp(),
        dueAt,
        returnedAt: null,
        status: 'checkedOut',
        overdueAlertSent: false,
        createdByUid: profile?.id || null,
        createdByName: profile?.name || profile?.email || null,
        createdAt: serverTimestamp(),
      });

      batch.update(itemRef, {
        status: 'checkedOut',
        checkedOutToUserId: uDoc.id,
        checkedOutToName: uData.name || uData.email || 'Member',
        checkedOutRfidCardId: trimmedRfid,
        checkedOutAt: serverTimestamp(),
        dueAt,
        currentUsageId: usageRef.id,
        updatedAt: serverTimestamp(),
      });

      batch.set(accessRef, {
        authorized: true,
        action: 'checkout',
        rfidCardId: trimmedRfid,
        userId: uDoc.id,
        userName: uData.name || null,
        userEmail: uData.email || null,
        photoUrl: uData.photoURL || uData.avatarUrl || null,
        itemId: item.id,
        itemNo: item.itemNo || null,
        itemName: item.itemName || null,
        createdByUid: profile?.id || null,
        createdByName: profile?.name || profile?.email || null,
        createdAt: serverTimestamp(),
      });

      await batch.commit();

      setRfidCardId('');
      setCheckoutItemId('');
      setMessage({ type: 'success', text: 'Item checked out successfully.' });
      await fetchItems();
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to check out item.' });
    } finally {
      setCheckingOut(false);
    }
  };

  const handleReturn = async (item) => {
    if (!canManageInventory) return;
    if ((item.status || 'available') !== 'checkedOut') return;

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const itemRef = doc(db, 'inventory', item.id);
      const batch = writeBatch(db);

      let usageId = item.currentUsageId || null;
      if (!usageId) {
        const uSnap = await getDocs(
          query(
            collection(db, 'inventoryUsage'),
            where('itemId', '==', item.id),
            where('returnedAt', '==', null),
            limit(1)
          )
        );
        if (!uSnap.empty) usageId = uSnap.docs[0].id;
      }

      if (usageId) {
        batch.update(doc(db, 'inventoryUsage', usageId), {
          returnedAt: serverTimestamp(),
          status: 'returned',
          updatedAt: serverTimestamp(),
          updatedByUid: profile?.id || null,
        });
      }

      batch.update(itemRef, {
        status: 'available',
        checkedOutToUserId: null,
        checkedOutToName: null,
        checkedOutRfidCardId: null,
        checkedOutAt: null,
        dueAt: null,
        currentUsageId: null,
        updatedAt: serverTimestamp(),
      });

      batch.set(doc(collection(db, 'accessRecords')), {
        authorized: true,
        action: 'return',
        rfidCardId: item.checkedOutRfidCardId || null,
        userId: item.checkedOutToUserId || null,
        userName: item.checkedOutToName || null,
        itemId: item.id,
        itemNo: item.itemNo || null,
        itemName: item.itemName || null,
        createdByUid: profile?.id || null,
        createdByName: profile?.name || profile?.email || null,
        createdAt: serverTimestamp(),
      });

      await batch.commit();
      setMessage({ type: 'success', text: 'Item returned successfully.' });
      await fetchItems();
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to return item.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={toEnabled} />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Inventory
          </h1>

          {canManageInventory && (
            <button
              onClick={() => {
                if (showAddForm && !editingItem) {
                  setShowAddForm(false);
                } else {
                  handleCancelEdit();
                  setShowAddForm(!showAddForm);
                }
              }}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
            >
              <FaPlus />
              {showAddForm ? 'Cancel' : 'Add Item'}
            </button>
          )}
        </div>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {canManageInventory && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">RFID Checkout</h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Item</label>
                <select
                  value={checkoutItemId}
                  onChange={(e) => setCheckoutItemId(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an item</option>
                  {items
                    .slice()
                    .sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || '')))
                    .map((i) => (
                      <option key={i.id} value={i.id}>
                        {(i.itemName || 'Item') + (i.itemNo ? ` (#${i.itemNo})` : '')}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">RFID Card</label>
                <input
                  value={rfidCardId}
                  onChange={(e) => setRfidCardId(e.target.value)}
                  placeholder="Scan RFID…"
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Due (days)</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={dueDays}
                  onChange={(e) => setDueDays(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkingOut}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {checkingOut ? 'Checking out…' : 'Check Out'}
              </button>

              {canDownloadReports && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadInventoryReport}
                    disabled={downloading}
                    className="px-3 py-2 rounded border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
                  >
                    Download Inventory Report
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadUsageReport}
                    disabled={downloading}
                    className="px-3 py-2 rounded border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
                  >
                    Download Usage Report
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              {editingItem && (
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                  title="Cancel editing"
                >
                  <FaTimes className="text-xl" />
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item No
                </label>
                <input
                  type="text"
                  name="itemNo"
                  value={formData.itemNo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a category</option>
                  <option value="Photography">Photography</option>
                  <option value="Videography">Videography</option>
                  <option value="Live Streaming">Live Streaming</option>
                  <option value="Drones & Accessories">Drones & Accessories</option>
                  <option value="Announcing">Announcing</option>
                  <option value="Storages">Storages</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm"
                >
                  {saving ? (editingItem ? 'Updating...' : 'Adding...') : (editingItem ? 'Update Item' : 'Add Item')}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 font-semibold hover:bg-gray-100 transition text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by item name or number..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin text-xl text-blue-600" />
            <span>Loading inventory...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaBox className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">
              {searchText ? 'No items match your search.' : 'No items in inventory.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base flex-1">
                    {item.itemName}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                    {item.itemNo}
                  </span>
                </div>
                {item.category && (
                  <p className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded inline-block mb-2">
                    {item.category}
                  </p>
                )}
                {item.description && (
                  <p className="text-gray-600 text-xs sm:text-sm mb-3">
                    {item.description}
                  </p>
                )}
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <div className="flex-1 flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        (item.status || 'available') === 'checkedOut'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {(item.status || 'available') === 'checkedOut' ? 'Checked out' : 'Available'}
                    </span>
                    {(item.status || 'available') === 'checkedOut' && item.dueAt && (
                      <span className="text-xs text-gray-500">
                        Due: {item.dueAt?.toDate ? item.dueAt.toDate().toLocaleDateString() : ''}
                      </span>
                    )}
                  </div>

                  {canManageInventory && (
                    <>
                      {(item.status || 'available') === 'checkedOut' ? (
                        <button
                          onClick={() => handleReturn(item)}
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded hover:bg-emerald-700 transition"
                        >
                          Return
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setCheckoutItemId(item.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition"
                        >
                          Check Out
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded hover:bg-slate-800 transition"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.itemName)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;
