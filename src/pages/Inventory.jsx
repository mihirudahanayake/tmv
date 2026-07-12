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

  const [dueDays, setDueDays] = useState(7);
  const [checkingOut, setCheckingOut] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showManualCheckout, setShowManualCheckout] = useState(false);
  const [itemSearchText, setItemSearchText] = useState('');
  const [memberSearchText, setMemberSearchText] = useState('');

  const [formData, setFormData] = useState({
    itemNo: '',
    itemName: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    fetchItems();
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const members = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => !isUserTO(user));
      members.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      setAllMembers(members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

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

  const normalizedItemSearch = itemSearchText.trim().toLowerCase();
  const normalizedMemberSearch = memberSearchText.trim().toLowerCase();

  const availableItems = items
    .filter((item) => (item.status || 'available') === 'available')
    .filter((item) => {
      if (!normalizedItemSearch) return true;
      const name = (item.itemName || '').toLowerCase();
      const no = (item.itemNo || '').toLowerCase();
      return name.includes(normalizedItemSearch) || no.includes(normalizedItemSearch);
    })
    .sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || '')));

  const filteredMembers = allMembers
    .filter((member) => {
      if (!normalizedMemberSearch) return true;
      const name = (member.name || '').toLowerCase();
      const email = (member.email || '').toLowerCase();
      return name.includes(normalizedMemberSearch) || email.includes(normalizedMemberSearch);
    })
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

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



  const handleIssueToMembers = async () => {
    if (!canManageInventory) return;
    if (selectedItems.length === 0) {
      setMessage({ type: 'error', text: 'Select at least one item to issue.' });
      return;
    }
    if (selectedMembers.length === 0) {
      setMessage({ type: 'error', text: 'Select at least one member to issue to.' });
      return;
    }

    setCheckingOut(true);
    setMessage({ type: '', text: '' });

    try {
      const batch = writeBatch(db);
      const usageRecords = [];

      // Process each selected item
      for (const itemId of selectedItems) {
        const item = items.find((i) => i.id === itemId);
        if (!item) continue;

        if ((item.status || 'available') === 'checkedOut') {
          setMessage({ type: 'error', text: `Item "${item.itemName}" is already checked out. Return it first.` });
          setCheckingOut(false);
          return;
        }

        // Issue to the first member, others get usage records
        const primaryMember = selectedMembers[0];
        const itemRef = doc(db, 'inventory', item.id);
        const usageRef = doc(collection(db, 'inventoryUsage'));

        // Create usage record
        batch.set(usageRef, {
          itemId: item.id,
          itemNo: item.itemNo || '',
          itemName: item.itemName || '',
          userId: primaryMember.id,
          userName: primaryMember.name || primaryMember.email || 'Member',
          userEmail: primaryMember.email || '',
          rfidCardId: primaryMember.rfidCardId || '',
          checkedOutAt: serverTimestamp(),
          returnedAt: null,
          status: 'checkedOut',
          issuedByUid: profile?.id || null,
          issuedByName: profile?.name || profile?.email || null,
          createdAt: serverTimestamp(),
        });

        // Update item status
        batch.update(itemRef, {
          status: 'checkedOut',
          checkedOutToUserId: primaryMember.id,
          checkedOutToName: primaryMember.name || primaryMember.email || 'Member',
          checkedOutAt: serverTimestamp(),
          currentUsageId: usageRef.id,
          updatedAt: serverTimestamp(),
        });

        usageRecords.push({
          itemId: item.id,
          itemName: item.itemName,
          itemNo: item.itemNo,
        });
      }

      // Create access record for all items and members
      batch.set(doc(collection(db, 'accessRecords')), {
        authorized: true,
        action: 'issue',
        itemsIssued: usageRecords,
        issuedToMembers: selectedMembers.map((m) => ({ id: m.id, name: m.name || m.email })),
        createdByUid: profile?.id || null,
        createdByName: profile?.name || profile?.email || null,
        createdAt: serverTimestamp(),
      });

      await batch.commit();

      const itemNames = selectedItems.length === 1 
        ? items.find(i => i.id === selectedItems[0])?.itemName 
        : `${selectedItems.length} items`;
      const memberNames = selectedMembers.map((m) => m.name || m.email).join(', ');
      
      setMessage({
        type: 'success',
        text: `${itemNames} issued to ${memberNames} successfully.`,
      });
      setSelectedItems([]);
      setSelectedMembers([]);
      setShowManualCheckout(false);
      await fetchItems();
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to issue items.' });
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



        {canManageInventory && toEnabled && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Issue to Members</h2>
              <button
                type="button"
                onClick={() => {
                  setShowManualCheckout(!showManualCheckout);
                  if (!showManualCheckout) {
                    setSelectedItems([]);
                    setSelectedMembers([]);
                    setItemSearchText('');
                    setMemberSearchText('');
                  }
                }}
                className="px-3 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
              >
                {showManualCheckout ? 'Cancel' : 'Show'}
              </button>
            </div>

            {showManualCheckout && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Items
                    </label>
                    <input
                      type="text"
                      value={itemSearchText}
                      onChange={(e) => setItemSearchText(e.target.value)}
                      placeholder="Search by item no or name"
                      className="w-full mb-2 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="border rounded bg-gray-50 p-3 max-h-60 overflow-y-auto">
                      {availableItems.length === 0 ? (
                        <p className="text-gray-500 text-sm">No available items.</p>
                      ) : (
                        availableItems.map((item) => (
                            <label key={item.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedItems([...selectedItems, item.id]);
                                  } else {
                                    setSelectedItems(selectedItems.filter((id) => id !== item.id));
                                  }
                                }}
                                className="w-4 h-4 rounded border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {item.itemName} {item.itemNo && `(#${item.itemNo})`}
                              </span>
                            </label>
                          ))
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Users to Issue To
                    </label>
                    <input
                      type="text"
                      value={memberSearchText}
                      onChange={(e) => setMemberSearchText(e.target.value)}
                      placeholder="Search by user name"
                      className="w-full mb-2 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="border rounded bg-gray-50 p-3 max-h-60 overflow-y-auto">
                      {filteredMembers.length === 0 ? (
                        <p className="text-gray-500 text-sm">No users found.</p>
                      ) : (
                        filteredMembers.map((member) => (
                          <label key={member.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedMembers.some((m) => m.id === member.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedMembers([...selectedMembers, member]);
                                } else {
                                  setSelectedMembers(
                                    selectedMembers.filter((m) => m.id !== member.id)
                                  );
                                }
                              }}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">
                              {member.name || member.email}
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {(selectedItems.length > 0 || selectedMembers.length > 0) && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-2">Selected Items</p>
                        <div className="space-y-1">
                          {selectedItems.length === 0 ? (
                            <p className="text-sm text-blue-800">No items selected.</p>
                          ) : (
                            selectedItems.map((itemId) => {
                              const item = items.find((entry) => entry.id === itemId);
                              if (!item) return null;
                              return (
                                <div key={itemId} className="text-sm text-blue-800">
                                  {item.itemName}{item.itemNo ? ` (#${item.itemNo})` : ''}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-2">Selected Users</p>
                        <div className="space-y-1">
                          {selectedMembers.length === 0 ? (
                            <p className="text-sm text-blue-800">No users selected.</p>
                          ) : (
                            selectedMembers.map((member) => (
                              <div key={member.id} className="text-sm text-blue-800">
                                {member.name || member.email}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleIssueToMembers}
                  disabled={checkingOut || selectedItems.length === 0 || selectedMembers.length === 0}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm"
                >
                  {checkingOut ? 'Issuing...' : `Issue ${selectedItems.length > 0 ? selectedItems.length : ''} Item(s)`}
                </button>
              </div>
            )}
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
                      ) : null}

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
