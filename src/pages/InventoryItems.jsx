import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  arrayUnion,
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
  const [rfidScanning, setRfidScanning] = useState(false);
  const [rfidMessage, setRfidMessage] = useState('');
  const scanControllerRef = useRef(null);
  const nfcApiUrl = (
    import.meta.env.VITE_NFC_URL ||
    import.meta.env.NFC_URL ||
    'http://localhost:8000'
  ).trim().replace(/\/+$/, '');
  const [editFormData, setEditFormData] = useState({
    itemNo: '',
    itemName: '',
    category: '',
    description: '',
    imageUrl: '',
    rfidCardId: '',
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
  const canManageInventory =
    toEnabled ||
    role === 'superAdmin' ||
    role === 'siteAdmin' ||
    role === 'departmentHead' ||
    role === 'supervisorTO';

  const headerUserType = role === 'departmentHead'
    ? 'admin'
    : role === 'superAdmin'
      ? 'superAdmin'
      : role === 'siteAdmin'
        ? 'siteAdmin'
        : 'user';

  const handleDownloadInventoryExcel = () => {
    const rows = filteredItems.map((item, index) => ({
      No: index + 1,
      'Item No': item.itemNo || '',
      'Item Name': item.itemName || '',
      Category: item.category || '',
      Status: item.status || 'available',
      Description: item.description || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
    XLSX.writeFile(workbook, `inventory_items_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleDownloadInventoryPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Inventory Items', 14, 16);

    const rows = filteredItems.map((item, index) => [
      index + 1,
      item.itemNo || '-',
      item.itemName || '-',
      item.category || '-',
      item.status || 'available',
    ]);

    autoTable(doc, {
      head: [['#', 'Item No', 'Item Name', 'Category', 'Status']],
      body: rows,
      startY: 22,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [22, 163, 74] },
    });

    doc.save(`inventory_items_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const formatDateTime = (value) => {
    if (!value) return 'Unknown time';
    if (typeof value?.toDate === 'function') return value.toDate().toLocaleString();
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? 'Unknown time' : parsed.toLocaleString();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditFormData({
      itemNo: item.itemNo || '',
      itemName: item.itemName || '',
      category: item.category || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      rfidCardId: item.rfidCardId || '',
    });
    setEditImageFile(null);
    setEditImagePreview(item.imageUrl || '');
    setEditImageError('');
    setShowEditModal(true);
    setMessage({ type: '', text: '' });
    setRfidMessage('');
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

  const handleScanRfid = async () => {
    if (rfidScanning) {
      scanControllerRef.current?.abort();
      setRfidMessage('RFID scan cancelled.');
      return;
    }

    if (!nfcApiUrl) {
      setRfidMessage('NFC_URL is not configured. Set VITE_NFC_URL to your NFC API address.');
      return;
    }

    const controller = new AbortController();
    scanControllerRef.current = controller;
    setRfidScanning(true);
    setRfidMessage('Waiting for RFID card...');

    try {
      const scanDeadline = Date.now() + 30000;
      while (Date.now() < scanDeadline) {
        const response = await fetch(`${nfcApiUrl}/nfc/read`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`NFC reader returned ${response.status}`);
        }

        const data = await response.json();
        const uid = String(data?.uid ?? '').trim();
        if (uid) {
          const usedSnapshot = await getDocs(
            query(collection(db, 'inventory'), where('rfidCardId', '==', uid))
          );
          const existingItem = usedSnapshot.docs.find((entry) => entry.id !== editingItem?.id);

          if (existingItem) {
            setRfidMessage(`This RFID card is already assigned to ${existingItem.data().itemName || 'another item'}.`);
          } else {
            setEditFormData((previous) => ({ ...previous, rfidCardId: uid }));
            setRfidMessage(`RFID card detected: ${uid}. Save the item to keep this assignment.`);
          }
          return;
        }

        await new Promise((resolve) => window.setTimeout(resolve, 1500));
      }

      setRfidMessage('No RFID card detected. Try again.');
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error reading RFID card:', error);
        setRfidMessage('Could not read an RFID card. Check that the NFC reader service is running.');
      }
    } finally {
      if (scanControllerRef.current === controller) {
        scanControllerRef.current = null;
        setRfidScanning(false);
      }
    }
  };

  const handleCloseEditModal = () => {
    scanControllerRef.current?.abort();
    scanControllerRef.current = null;
    setRfidScanning(false);
    setRfidMessage('');
    setShowEditModal(false);
    setEditingItem(null);
    setEditFormData({
      itemNo: '',
      itemName: '',
      category: '',
      description: '',
      imageUrl: '',
      rfidCardId: '',
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
      const rfidCardId = editFormData.rfidCardId.trim();
      if (rfidCardId) {
        const usedSnapshot = await getDocs(
          query(collection(db, 'inventory'), where('rfidCardId', '==', rfidCardId))
        );
        const existingItem = usedSnapshot.docs.find((entry) => entry.id !== editingItem.id);
        if (existingItem) {
          setRfidMessage(`This RFID card is already assigned to ${existingItem.data().itemName || 'another item'}.`);
          return;
        }
      }

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
        rfidCardId,
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
          comments: Array.isArray(usage.comments) && usage.comments.length
            ? usage.comments
            : commentsByUsageIndex.get(
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
    if ((item.status || 'available') !== 'checkedOut' && (item.status || 'available') !== 'overdue') return;

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const itemRef = doc(db, 'inventory', item.id);
      const batch = writeBatch(db);

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

      if (usageId) {
        const usageUpdate = {
          returnedAt: serverTimestamp(),
          dueAt: null,
          status: 'returned',
          overdueAt: null,
          overdueAlertSent: false,
          updatedAt: serverTimestamp(),
          updatedByUid: profile?.id || null,
          returnedByUid: profile?.id || null,
          returnedByName: profile?.name || profile?.email || null,
        };
        if (returnComment) {
          usageUpdate.comments = arrayUnion({
            text: returnComment,
            createdByUid: profile?.id || null,
            createdByName: profile?.name || profile?.email || null,
            createdAt: new Date().toISOString(),
            type: 'return',
          });
        }
        batch.update(doc(db, 'inventoryUsage', usageId), usageUpdate);
      }

      batch.update(itemRef, {
        status: 'available',
        checkedOutToUserId: null,
        checkedOutToName: null,
        checkedOutRfidCardId: null,
        checkedOutAt: null,
        dueAt: null,
        overdueAt: null,
        overdueAlertSent: false,
        currentUsageId: null,
        updatedAt: serverTimestamp(),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <Header userType={headerUserType} isTO={toEnabled} />

      <main className="container mx-auto px-4 py-5 sm:py-6">
        <div className="mb-5 rounded-[22px] border border-white/80 bg-white/80 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => navigate('/inventory')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:px-5 sm:text-base"
              >
                <FaArrowLeft className="text-base sm:text-lg" />
                Back
              </button>

              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-600">Inventory items</p>
                <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Item cards</h1>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleDownloadInventoryExcel}
                  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm hover:bg-green-700"
                >
                  Download Item List (.xlsx)
                </button>
                <button
                  type="button"
                  onClick={handleDownloadInventoryPdf}
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm hover:bg-red-700"
                >
                  Download Item List (.pdf)
                </button>
              </div>
            </div>

            {/* Removed duplicate title block to keep the row layout clean */}
            <div className="hidden">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-600">Inventory items</p>
              <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Item cards</h1>
            </div>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <p className="text-xs text-slate-500">Total</p>
            <p className="mt-2 text-xl font-bold text-slate-800">{items.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <p className="text-xs text-slate-500">Available</p>
            <p className="mt-2 text-xl font-bold text-emerald-600">{items.filter((item) => (item.status || 'available') !== 'checkedOut' && (item.status || 'available') !== 'overdue').length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <p className="text-xs text-slate-500">Checked out</p>
            <p className="mt-2 text-xl font-bold text-amber-600">{items.filter((item) => (item.status || 'available') === 'checkedOut').length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <p className="text-xs text-slate-500">Overdue</p>
            <p className="mt-2 text-xl font-bold text-red-600">{items.filter((item) => (item.status || 'available') === 'overdue').length}</p>
          </div>
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
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                className="cursor-pointer rounded-[22px] border border-slate-200 bg-white/90 p-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(59,130,246,0.08)]"
              >
                {item.imageUrl && (
                  <div className="mb-3 overflow-hidden rounded-xl bg-slate-50">
                    <img
                      src={item.imageUrl}
                      alt={item.itemName || 'Item'}
                      className="h-32 w-full object-contain"
                    />
                  </div>
                )}

                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="flex-1 text-sm font-bold text-slate-800 sm:text-base">{item.itemName}</h3>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-800">{item.itemNo}</span>
                </div>

                {item.category && (
                  <p className="mb-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
                    {item.category}
                  </p>
                )}

                {item.description && (
                  <p className="mb-3 line-clamp-2 text-xs text-slate-600 sm:text-sm">{item.description}</p>
                )}

                <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        (item.status || 'available') === 'overdue'
                          ? 'bg-red-100 text-red-700'
                          : (item.status || 'available') === 'checkedOut'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {(item.status || 'available') === 'overdue'
                        ? 'Overdue'
                        : (item.status || 'available') === 'checkedOut'
                          ? 'Checked out'
                          : 'Available'}
                    </span>

                    {((item.status || 'available') === 'checkedOut' || (item.status || 'available') === 'overdue') && item.dueAt && (
                      <span className="text-[10px] text-slate-500">
                        Due: {item.dueAt?.toDate ? item.dueAt.toDate().toLocaleDateString() : ''}
                      </span>
                    )}
                  </div>

                  {canManageInventory && (
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {(item.status || 'available') === 'checkedOut' || (item.status || 'available') === 'overdue' ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openReturnConfirmModal(item);
                          }}
                          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[10px] font-semibold text-white hover:bg-emerald-700"
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
                        className="inline-flex items-center justify-center rounded-lg bg-slate-700 px-2.5 py-1.5 text-[10px] font-semibold text-white hover:bg-slate-800"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id, item.itemName);
                        }}
                        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-2.5 py-1.5 text-[10px] font-semibold text-white hover:bg-red-700"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showEditModal && editingItem && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={handleCloseEditModal}>
            <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-xl p-4 sm:p-5" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Edit Item</h2>
                <button type="button" onClick={handleCloseEditModal} className="text-gray-500 hover:text-gray-700" title="Close">
                  <FaTimes className="text-lg" />
                </button>
              </div>

              <div className="mb-3 rounded-xl border border-sky-200 bg-sky-50 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-sky-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Edit</span>
                  <span className="text-xs font-medium text-sky-700">{editFormData.itemName || 'Item name pending'}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-sky-800">
                  <span className="rounded-full bg-white px-2 py-1 ring-1 ring-sky-200">{editFormData.category || 'Category pending'}</span>
                  <span className="rounded-full bg-white px-2 py-1 ring-1 ring-sky-200">{editFormData.rfidCardId ? 'RFID linked' : 'No RFID'}</span>
                </div>
              </div>

              <form onSubmit={handleSaveEditItem} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Item No</label>
                    <input
                      type="text"
                      name="itemNo"
                      value={editFormData.itemNo}
                      onChange={handleEditModalChange}
                      required
                      className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Item Name</label>
                    <input
                      type="text"
                      name="itemName"
                      value={editFormData.itemName}
                      onChange={handleEditModalChange}
                      required
                      className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Category</label>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditModalChange}
                      required
                      className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Item Image</label>
                    <input type="file" accept="image/*" onChange={handleEditImageChange} className="w-full text-sm" />
                  </div>
                </div>

                {(editImagePreview || editImageError) && (
                  <div className="rounded border border-slate-200 bg-slate-50 p-3">
                    {editImagePreview && (
                      <img src={editImagePreview} alt="Item preview" className="h-32 w-full rounded object-contain bg-white" />
                    )}
                    {editImageError && <p className="mt-2 text-sm text-red-600">{editImageError}</p>}
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditModalChange}
                    rows="3"
                    className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="edit-rfid-card-id" className="mb-1 block text-sm font-semibold text-gray-700">RFID Card ID</label>
                  <div className="flex gap-2">
                    <input
                      id="edit-rfid-card-id"
                      type="text"
                      name="rfidCardId"
                      value={editFormData.rfidCardId}
                      onChange={handleEditModalChange}
                      placeholder="Scan a card or enter its ID"
                      className="min-w-0 flex-1 rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={handleScanRfid}
                      className="inline-flex items-center justify-center rounded border border-blue-600 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
                    >
                      {rfidScanning ? 'Cancel scan' : 'Add RFID'}
                    </button>
                  </div>
                  {rfidMessage && (
                    <p className={`mt-1 text-sm ${rfidMessage.startsWith('Could not') || rfidMessage.startsWith('No RFID') || rfidMessage.startsWith('This RFID') || rfidMessage.startsWith('NFC_URL') ? 'text-red-600' : 'text-blue-700'}`}>
                      {rfidMessage}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="submit"
                    disabled={saving || editImageUploading || rfidScanning}
                    className="flex-1 rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving || editImageUploading ? 'Saving...' : 'Update Item'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
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
            <div className="w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-2xl bg-white shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-4 sm:p-5">
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

              <div className="space-y-4 overflow-y-auto p-4 sm:p-5">
                {itemDetailModal.loading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaSpinner className="animate-spin text-blue-600" />
                    <span>Loading usage history...</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-gray-500">Status</p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {(itemDetailModal.item.status || 'available') === 'checkedOut' ? 'Checked out' : 'Available'}
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-gray-500">Current Holder</p>
                        <p className="mt-1 font-semibold text-gray-800">{itemDetailModal.item.checkedOutToName || 'None'}</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-gray-500">Checked Out At</p>
                        <p className="mt-1 font-semibold text-gray-800">{formatDateTime(itemDetailModal.item.checkedOutAt)}</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-gray-500">Due Date</p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {itemDetailModal.item.dueAt?.toDate ? itemDetailModal.item.dueAt.toDate().toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {itemDetailModal.item.description && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                        <p className="mb-1 text-gray-500">Description</p>
                        <p className="text-gray-800">{itemDetailModal.item.description}</p>
                      </div>
                    )}

                    {itemDetailModal.item.imageUrl && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                        <p className="mb-2 text-gray-500">Item Image</p>
                        <img
                          src={itemDetailModal.item.imageUrl}
                          alt={itemDetailModal.item.itemName || 'Item'}
                          className="w-full max-h-72 rounded object-contain bg-white"
                        />
                      </div>
                    )}

                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-gray-800">Usage History</h4>
                      {itemDetailModal.usageHistory.length === 0 ? (
                        <p className="text-sm text-gray-600">No usage history found for this item.</p>
                      ) : (
                        <div className="space-y-3">
                          {itemDetailModal.usageHistory.map((usage) => (
                            <div key={usage.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                <p className="font-semibold text-gray-800">{usage.userName || 'Unknown user'}</p>
                                <span
                                  className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                    usage.status === 'returned' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {usage.status === 'returned' ? 'Returned' : 'Checked out'}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-2 text-gray-700 sm:grid-cols-2">
                                <p><span className="text-gray-500">Checked out:</span> {formatDateTime(usage.checkedOutAt)}</p>
                                <p><span className="text-gray-500">Returned:</span> {formatDateTime(usage.returnedAt)}</p>
                                <p><span className="text-gray-500">Issued by:</span> {usage.issuedByName || 'Unknown'}</p>
                                <p><span className="text-gray-500">Returned by:</span> {usage.returnedByName || usage.returnedByUid || 'Unknown'}</p>
                                <p><span className="text-gray-500">RFID:</span> {usage.rfidCardId || 'N/A'}</p>
                              </div>
                              <div className="mt-2">
                                <p className="mb-1 text-gray-500">Issued users</p>
                                {Array.isArray(usage.issuedToMembers) && usage.issuedToMembers.length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {usage.issuedToMembers.map((member) => (
                                      <span key={member.id || member.email || member.name} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold text-blue-800">
                                        {member.name || member.email || 'Member'}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-700">{usage.userName || 'Unknown user'}</p>
                                )}
                              </div>
                              {Array.isArray(usage.comments) && usage.comments.length > 0 && (
                                <div className="mt-3 border-t border-slate-200 pt-3">
                                  <p className="mb-2 text-gray-500">Comments</p>
                                  <div className="space-y-2">
                                    {usage.comments.map((comment, index) => (
                                      <div key={`${usage.id}-comment-${index}`} className="rounded-lg border border-slate-200 bg-white p-2 text-sm text-gray-700">
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
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-4 sm:p-5" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Confirm Return</h3>
                <button type="button" onClick={closeReturnConfirmModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>

              <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                Return <span className="font-bold">{returnConfirmModal.item.itemName}</span> now?
              </div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">Comment</label>
              <textarea
                value={returnConfirmModal.comment}
                onChange={(e) => setReturnConfirmModal((prev) => ({ ...prev, comment: e.target.value }))}
                rows="4"
                placeholder="Optional note for this return"
                className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeReturnConfirmModal}
                  className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReturn}
                  disabled={saving}
                  className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
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