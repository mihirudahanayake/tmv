import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaEdit, FaSearch, FaSpinner, FaTimes, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import { db, storage } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';
import { isUserTO } from '../utils/authz';

const InventoryItems = () => {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    itemNo: '',
    itemName: '',
    category: '',
    description: '',
    imageUrl: '',
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  const [editImageError, setEditImageError] = useState('');
  const [editImageUploading, setEditImageUploading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemDetailModal, setItemDetailModal] = useState({
    open: false,
    item: null,
    usageHistory: [],
    loading: false,
  });
  const [returnConfirmModal, setReturnConfirmModal] = useState({
    open: false,
    item: null,
    comment: '',
  });

  useEffect(() => {
    if (!message.text) return undefined;

    const timeoutId = setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [message.text]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const data = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
      data.sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || '')));
      setItems(data);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to inventory:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const role = profile?.role || 'member';
  const toEnabled = isUserTO(profile);
  const canManageInventory = toEnabled || role === 'superAdmin' || role === 'siteAdmin';

  const headerUserType = role === 'departmentHead'
    ? 'admin'
    : role === 'superAdmin'
      ? 'superAdmin'
      : role === 'siteAdmin'
        ? 'siteAdmin'
        : 'user';

  const formatDateTime = (value) => {
    if (!value) return 'Unknown time';
    if (typeof value?.toDate === 'function') return value.toDate().toLocaleString();
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? 'Unknown time' : parsed.toLocaleString();
  };

  const getIssueItemStatus = (item) => {
    if (!item) return 'not returned';
    if (item.returnStatus === 'returned' || item.returnedAt) return 'returned';
    if (item.status === 'returned') return 'returned';
    return 'not returned';
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditFormData({
      itemNo: item.itemNo || '',
      itemName: item.itemName || '',
      category: item.category || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
    });
    setEditImageFile(null);
    setEditImagePreview(item.imageUrl || '');
    setEditImageError('');
    setShowEditModal(true);
    setMessage({ type: '', text: '' });
  };

  const handleEditModalChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEditImageError('');
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingItem(null);
    setEditFormData({
      itemNo: '',
      itemName: '',
      category: '',
      description: '',
      imageUrl: '',
    });
    setEditImageFile(null);
    setEditImagePreview('');
    setEditImageError('');
    setEditImageUploading(false);
  };

  const handleSaveEditItem = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setMessage({ type: '', text: '' });
    setEditImageError('');

    try {
      let nextImageUrl = editFormData.imageUrl || '';

      if (editImageFile) {
        setEditImageUploading(true);
        const path = `inventoryImages/${editingItem.id}/${Date.now()}-${editImageFile.name}`;
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, editImageFile);
        nextImageUrl = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(doc(db, 'inventory', editingItem.id), {
        ...editFormData,
        imageUrl: nextImageUrl,
        updatedAt: serverTimestamp(),
      });

      setMessage({ type: 'success', text: 'Item updated successfully!' });
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating item:', error);
      setEditImageError('Failed to update item.');
      setMessage({ type: 'error', text: 'Failed to update item.' });
    } finally {
      setEditImageUploading(false);
      setSaving(false);
    }
  };

  const handleDelete = async (itemId, itemName) => {
    if (!canManageInventory) return;
    if (!window.confirm(`Are you sure you want to delete "${itemName}"?`)) return;

    try {
      await deleteDoc(doc(db, 'inventory', itemId));
      setMessage({ type: 'success', text: 'Item deleted successfully!' });
    } catch (error) {
      console.error('Error deleting item:', error);
      setMessage({ type: 'error', text: 'Failed to delete item.' });
    }
  };

  const closeItemDetailModal = () => {
    setItemDetailModal({
      open: false,
      item: null,
      usageHistory: [],
      loading: false,
    });
  };

  const openItemDetailModal = async (item) => {
    if (!item?.id) return;

    setItemDetailModal({
      open: true,
      item,
      usageHistory: [],
      loading: true,
    });

    try {
      const usageSnap = await getDocs(query(collection(db, 'inventoryUsage'), where('itemId', '==', item.id)));
      const recordsSnap = await getDocs(collection(db, 'accessRecords'));
      const commentsByUsageIndex = new Map();

      recordsSnap.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .filter((record) => record.action === 'issue' && Array.isArray(record.itemsIssued))
        .forEach((record) => {
          record.itemsIssued.forEach((entry) => {
            if (entry.itemId !== item.id) return;
            const issueTime = record.createdAt?.toDate ? record.createdAt.toDate().getTime() : 0;
            const nextComments = Array.isArray(entry.comments) ? entry.comments : [];
            const existing = commentsByUsageIndex.get(issueTime) || [];
            commentsByUsageIndex.set(issueTime, [...existing, ...nextComments]);
          });
        });

      const usageHistory = usageSnap.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .sort((a, b) => {
          const aTime = a.checkedOutAt?.toDate ? a.checkedOutAt.toDate().getTime() : 0;
          const bTime = b.checkedOutAt?.toDate ? b.checkedOutAt.toDate().getTime() : 0;
          return bTime - aTime;
        })
        .map((usage) => ({
          ...usage,
          issuedToMembers: Array.isArray(usage.issuedToMembers) ? usage.issuedToMembers : [],
          comments: commentsByUsageIndex.get(
            usage.checkedOutAt?.toDate ? usage.checkedOutAt.toDate().getTime() : 0
          ) || [],
        }));

      setItemDetailModal({
        open: true,
        item,
        usageHistory,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading item usage history:', error);
      setItemDetailModal({
        open: true,
        item,
        usageHistory: [],
        loading: false,
      });
      setMessage({ type: 'error', text: 'Failed to load item usage history.' });
    }
  };

  const openReturnConfirmModal = (item) => {
    setReturnConfirmModal({
      open: true,
      item,
      comment: '',
    });
  };

  const closeReturnConfirmModal = () => {
    setReturnConfirmModal({
      open: false,
      item: null,
      comment: '',
    });
  };

  const handleConfirmReturn = async () => {
    const item = returnConfirmModal.item;
    const returnComment = returnConfirmModal.comment.trim();

    if (!canManageInventory) return;
    if (!item) return;
    if ((item.status || 'available') !== 'checkedOut') return;

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const itemRef = doc(db, 'inventory', item.id);
      const batch = writeBatch(db);
      const issueRecordSnap = await getDocs(collection(db, 'accessRecords'));
      const issueRecord = issueRecordSnap.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .filter((record) => record.action === 'issue' && Array.isArray(record.itemsIssued))
        .find((record) => record.itemsIssued.some((entry) => entry.itemId === item.id && getIssueItemStatus(entry) !== 'returned'));

      let usageId = item.currentUsageId || null;
      if (!usageId) {
        const usageSnap = await getDocs(
          query(
            collection(db, 'inventoryUsage'),
            where('itemId', '==', item.id),
            where('returnedAt', '==', null),
            limit(1)
          )
        );
        if (!usageSnap.empty) usageId = usageSnap.docs[0].id;
      }

      let updatedIssueItems = null;
      if (issueRecord) {
        updatedIssueItems = (issueRecord.itemsIssued || []).map((entry) => {
          if (entry.itemId !== item.id) return entry;

          const comments = Array.isArray(entry.comments) ? entry.comments : [];
          const nextComments = returnComment
            ? [
                ...comments,
                {
                  text: returnComment,
                  createdByUid: profile?.id || null,
                  createdByName: profile?.name || profile?.email || null,
                  createdAt: new Date().toISOString(),
                  type: 'return',
                },
              ]
            : comments;

          return {
            ...entry,
            returnStatus: 'returned',
            returnedAt: new Date().toISOString(),
            returnedByUid: profile?.id || null,
            returnedByName: profile?.name || profile?.email || null,
            comments: nextComments,
          };
        });
      }

      if (usageId) {
        batch.update(doc(db, 'inventoryUsage', usageId), {
          returnedAt: serverTimestamp(),
          status: 'returned',
          updatedAt: serverTimestamp(),
          updatedByUid: profile?.id || null,
          returnedByUid: profile?.id || null,
          returnedByName: profile?.name || profile?.email || null,
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

      if (issueRecord && updatedIssueItems) {
        batch.update(doc(db, 'accessRecords', issueRecord.id), {
          itemsIssued: updatedIssueItems,
        });
      }

      batch.set(doc(collection(db, 'accessRecords')), {
        authorized: true,
        action: 'return',
        rfidCardId: item.checkedOutRfidCardId || null,
        userId: item.checkedOutToUserId || null,
        userName: item.checkedOutToName || null,
        itemId: item.id,
        itemNo: item.itemNo || null,
        itemName: item.itemName || null,
        comment: returnComment || null,
        createdByUid: profile?.id || null,
        createdByName: profile?.name || profile?.email || null,
        createdAt: serverTimestamp(),
      });

      await batch.commit();
      setMessage({ type: 'success', text: 'Item returned successfully.' });
      closeReturnConfirmModal();
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to return item.' });
    } finally {
      setSaving(false);
    }
  };

  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    if (!normalizedSearch) return true;
    const name = (item.itemName || '').toLowerCase();
    const no = (item.itemNo || '').toLowerCase();
    return name.includes(normalizedSearch) || no.includes(normalizedSearch);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={toEnabled} />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inventory Items</h1>
            <p className="text-sm text-gray-600 mt-1">Browse, edit, return, and remove inventory cards here.</p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/inventory')}
            className="inline-flex items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <FaArrowLeft />
            Back to Inventory
          </button>
        </div>

        {message.text && (
          <div className="fixed top-4 right-4 z-[60] max-w-md w-[calc(100vw-2rem)] sm:w-auto">
            <div
              className={`rounded-lg shadow-lg border px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border-green-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        )}

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
            <span>Loading inventory items...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaBox className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">
              {searchText ? 'No items match your search.' : 'No items in inventory.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openItemDetailModal(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openItemDetailModal(item);
                  }
                }}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
              >
                {item.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.itemName || 'Item'}
                      className="h-36 w-full rounded object-contain bg-gray-50"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base flex-1">{item.itemName}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">{item.itemNo}</span>
                </div>
                {item.category && (
                  <p className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded inline-block mb-2">
                    {item.category}
                  </p>
                )}
                {item.description && (
                  <p className="text-gray-600 text-xs sm:text-sm mb-3">{item.description}</p>
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
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openReturnConfirmModal(item);
                          }}
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded hover:bg-emerald-700 transition"
                        >
                          Return
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded hover:bg-slate-800 transition"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id, item.itemName);
                        }}
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

        {showEditModal && editingItem && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={handleCloseEditModal}>
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Edit Item</h2>
                <button type="button" onClick={handleCloseEditModal} className="text-gray-500 hover:text-gray-700" title="Close">
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleSaveEditItem} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Item No</label>
                    <input
                      type="text"
                      name="itemNo"
                      value={editFormData.itemNo}
                      onChange={handleEditModalChange}
                      required
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      name="itemName"
                      value={editFormData.itemName}
                      onChange={handleEditModalChange}
                      required
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditModalChange}
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Item Image</label>
                    <input type="file" accept="image/*" onChange={handleEditImageChange} className="w-full text-sm" />
                  </div>
                </div>

                {(editImagePreview || editImageError) && (
                  <div className="rounded border p-3 bg-gray-50">
                    {editImagePreview && (
                      <img src={editImagePreview} alt="Item preview" className="h-40 w-full rounded object-contain bg-white" />
                    )}
                    {editImageError && <p className="mt-2 text-sm text-red-600">{editImageError}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditModalChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving || editImageUploading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm"
                  >
                    {saving || editImageUploading ? 'Saving...' : 'Update Item'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 font-semibold hover:bg-gray-100 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {itemDetailModal.open && itemDetailModal.item && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeItemDetailModal}>
            <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4 p-5 border-b">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{itemDetailModal.item.itemName}</h3>
                  <p className="text-sm text-gray-600">
                    Item No: {itemDetailModal.item.itemNo || 'N/A'}
                    {itemDetailModal.item.category ? ` | ${itemDetailModal.item.category}` : ''}
                  </p>
                </div>
                <button type="button" onClick={closeItemDetailModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4">
                {itemDetailModal.loading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaSpinner className="animate-spin text-blue-600" />
                    <span>Loading usage history...</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="rounded border p-3">
                        <p className="text-gray-500">Status</p>
                        <p className="font-semibold text-gray-800">
                          {(itemDetailModal.item.status || 'available') === 'checkedOut' ? 'Checked out' : 'Available'}
                        </p>
                      </div>
                      <div className="rounded border p-3">
                        <p className="text-gray-500">Current Holder</p>
                        <p className="font-semibold text-gray-800">{itemDetailModal.item.checkedOutToName || 'None'}</p>
                      </div>
                      <div className="rounded border p-3">
                        <p className="text-gray-500">Checked Out At</p>
                        <p className="font-semibold text-gray-800">{formatDateTime(itemDetailModal.item.checkedOutAt)}</p>
                      </div>
                      <div className="rounded border p-3">
                        <p className="text-gray-500">Due Date</p>
                        <p className="font-semibold text-gray-800">
                          {itemDetailModal.item.dueAt?.toDate ? itemDetailModal.item.dueAt.toDate().toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {itemDetailModal.item.description && (
                      <div className="rounded border p-3 text-sm">
                        <p className="text-gray-500 mb-1">Description</p>
                        <p className="text-gray-800">{itemDetailModal.item.description}</p>
                      </div>
                    )}

                    {itemDetailModal.item.imageUrl && (
                      <div className="rounded border p-3 text-sm">
                        <p className="text-gray-500 mb-2">Item Image</p>
                        <img
                          src={itemDetailModal.item.imageUrl}
                          alt={itemDetailModal.item.itemName || 'Item'}
                          className="w-full max-h-80 rounded object-contain bg-gray-50"
                        />
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Usage History</h4>
                      {itemDetailModal.usageHistory.length === 0 ? (
                        <p className="text-sm text-gray-600">No usage history found for this item.</p>
                      ) : (
                        <div className="space-y-3">
                          {itemDetailModal.usageHistory.map((usage) => (
                            <div key={usage.id} className="rounded border p-3 text-sm bg-gray-50">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <p className="font-semibold text-gray-800">{usage.userName || 'Unknown user'}</p>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-semibold ${
                                    usage.status === 'returned' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {usage.status === 'returned' ? 'Returned' : 'Checked out'}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                                <p><span className="text-gray-500">Checked out:</span> {formatDateTime(usage.checkedOutAt)}</p>
                                <p><span className="text-gray-500">Returned:</span> {formatDateTime(usage.returnedAt)}</p>
                                <p><span className="text-gray-500">Issued by:</span> {usage.issuedByName || 'Unknown'}</p>
                                <p><span className="text-gray-500">Returned by:</span> {usage.returnedByName || usage.returnedByUid || 'Unknown'}</p>
                                <p><span className="text-gray-500">RFID:</span> {usage.rfidCardId || 'N/A'}</p>
                              </div>
                              <div className="mt-2">
                                <p className="text-gray-500 mb-1">Issued users</p>
                                {Array.isArray(usage.issuedToMembers) && usage.issuedToMembers.length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {usage.issuedToMembers.map((member) => (
                                      <span key={member.id || member.email || member.name} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                                        {member.name || member.email || 'Member'}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-700">{usage.userName || 'Unknown user'}</p>
                                )}
                              </div>
                              {Array.isArray(usage.comments) && usage.comments.length > 0 && (
                                <div className="mt-3 border-t pt-3">
                                  <p className="text-gray-500 mb-2">Comments</p>
                                  <div className="space-y-2">
                                    {usage.comments.map((comment, index) => (
                                      <div key={`${usage.id}-comment-${index}`} className="rounded bg-white border p-2 text-sm text-gray-700">
                                        <div>{comment.text}</div>
                                        <div className="mt-1 text-[11px] text-gray-400">
                                          {formatDateTime(comment.createdAt)}{comment.createdByName ? ` · ${comment.createdByName}` : ''}
                                          {comment.updatedAt ? ' (edited)' : ''}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {returnConfirmModal.open && returnConfirmModal.item && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeReturnConfirmModal}>
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Confirm Return</h3>
                <button type="button" onClick={closeReturnConfirmModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Return <span className="font-semibold text-gray-800">{returnConfirmModal.item.itemName}</span> now?
              </p>

              <label className="block text-sm font-semibold text-gray-700 mb-2">Comment</label>
              <textarea
                value={returnConfirmModal.comment}
                onChange={(e) => setReturnConfirmModal((prev) => ({ ...prev, comment: e.target.value }))}
                rows="4"
                placeholder="Optional note for this return"
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeReturnConfirmModal}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReturn}
                  disabled={saving}
                  className="px-4 py-2 rounded bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? 'Returning...' : 'Confirm Return'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InventoryItems;