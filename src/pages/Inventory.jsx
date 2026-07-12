import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
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
import { FaBox, FaSearch, FaPlus, FaSpinner, FaEdit, FaTrash, FaTimes, FaCommentDots } from 'react-icons/fa';
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
  const [issueHistory, setIssueHistory] = useState([]);
  const [issueHistoryLoading, setIssueHistoryLoading] = useState(false);
  const [expandedIssueIds, setExpandedIssueIds] = useState([]);
  const [issueHistoryTab, setIssueHistoryTab] = useState('active');
  const [issueReason, setIssueReason] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [selectedReturnItems, setSelectedReturnItems] = useState({});
  const [commentModal, setCommentModal] = useState({
    open: false,
    recordId: null,
    itemId: null,
    itemName: '',
    comments: [],
  });
  const [commentText, setCommentText] = useState('');
  const [commentEditingIndex, setCommentEditingIndex] = useState(null);
  const [commentSaving, setCommentSaving] = useState(false);
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

  const [formData, setFormData] = useState({
    itemNo: '',
    itemName: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    fetchItems();
    fetchMembers();
    fetchIssueHistory();
  }, []);

  useEffect(() => {
    const inventoryUnsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const data = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
      data.sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || '')));
      setItems(data);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to inventory:', error);
    });

    const membersUnsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const members = snapshot.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .filter((user) => !isUserTO(user));
      members.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      setAllMembers(members);
    }, (error) => {
      console.error('Error listening to users:', error);
    });

    const issueHistoryUnsubscribe = onSnapshot(collection(db, 'accessRecords'), (snapshot) => {
      const records = snapshot.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .filter((record) => record.action === 'issue')
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return bTime - aTime;
        });
      setIssueHistory(records);
      setIssueHistoryLoading(false);
    }, (error) => {
      console.error('Error listening to issue history:', error);
    });

    return () => {
      inventoryUnsubscribe();
      membersUnsubscribe();
      issueHistoryUnsubscribe();
    };
  }, []);

  const fetchIssueHistory = async () => {
    setIssueHistoryLoading(true);
    try {
      const snap = await getDocs(collection(db, 'accessRecords'));
      const records = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((record) => record.action === 'issue')
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return bTime - aTime;
        });
      setIssueHistory(records);
    } catch (error) {
      console.error('Error fetching issue history:', error);
    } finally {
      setIssueHistoryLoading(false);
    }
  };

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

  const issueHistoryWithStatus = issueHistory.map((record) => {
    const itemList = Array.isArray(record.itemsIssued) ? record.itemsIssued : [];
    const userList = Array.isArray(record.issuedToMembers) ? record.issuedToMembers : [];
    const itemsWithStatus = itemList.map((item) => ({
      ...item,
      returnStatus: getIssueItemStatus(item),
    }));
    const isCompleted = itemsWithStatus.length > 0 && itemsWithStatus.every((item) => item.returnStatus === 'returned');

    return {
      ...record,
      itemList,
      userList,
      itemsWithStatus,
      isCompleted,
    };
  });

  const activeIssueHistory = issueHistoryWithStatus.filter((record) => !record.isCompleted);
  const completedIssueHistory = issueHistoryWithStatus.filter((record) => record.isCompleted);

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



  const handleIssueToMembers = async () => {
    if (!canManageInventory) return;
    if (!issueReason.trim()) {
      setMessage({ type: 'error', text: 'Enter a reason for issuing items.' });
      return;
    }
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
          issuedToMembers: selectedMembers.map((member) => ({
            id: member.id,
            name: member.name || member.email || 'Member',
            email: member.email || '',
          })),
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
        reason: issueReason.trim(),
        description: issueDescription.trim() || '',
        itemsIssued: usageRecords,
        issuedToMembers: selectedMembers.map((m) => ({ id: m.id, name: m.name || m.email, email: m.email || '' })),
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
      setIssueReason('');
      setIssueDescription('');
      setShowManualCheckout(false);
      await fetchItems();
      await fetchIssueHistory();
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to issue items.' });
    } finally {
      setCheckingOut(false);
    }
  };

  const handleReturnSelectedItems = async (record) => {
    if (!canManageInventory) return;

    const itemIds = (selectedReturnItems[record.id] || []).filter(Boolean);
    if (itemIds.length === 0) return;

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const batch = writeBatch(db);
      const recordRef = doc(db, 'accessRecords', record.id);
      const updatedItemsIssued = (record.itemList || []).map((item) => {
        if (!itemIds.includes(item.itemId)) return item;
        return {
          ...item,
          returnStatus: 'returned',
          returnedAt: new Date().toISOString(),
          returnedByUid: profile?.id || null,
          returnedByName: profile?.name || profile?.email || null,
        };
      });

      for (const itemId of itemIds) {
        const itemRef = doc(db, 'inventory', itemId);
        const itemSnap = items.find((entry) => entry.id === itemId);
        if (!itemSnap) continue;

        let usageId = itemSnap.currentUsageId || null;
        if (!usageId) {
          const usageSnap = await getDocs(
            query(
              collection(db, 'inventoryUsage'),
              where('itemId', '==', itemId),
              where('returnedAt', '==', null),
              limit(1)
            )
          );
          if (!usageSnap.empty) usageId = usageSnap.docs[0].id;
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
      }

      batch.update(recordRef, {
        itemsIssued: updatedItemsIssued,
      });

      await batch.commit();
      setMessage({ type: 'success', text: 'Selected items in this issue batch were returned successfully.' });
      setSelectedReturnItems((prev) => ({ ...prev, [record.id]: [] }));
      await fetchItems();
      await fetchIssueHistory();
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to return all items in this issue batch.' });
    } finally {
      setSaving(false);
    }
  };

  const openCommentModal = (record, item) => {
    setCommentModal({
      open: true,
      recordId: record.id,
      itemId: item.itemId,
      itemName: item.itemName || 'Item',
      comments: Array.isArray(item.comments) ? item.comments : [],
    });
    setCommentText('');
    setCommentEditingIndex(null);
  };

  const openCommentModalForEdit = (record, item, commentIndex) => {
    openCommentModal(record, item);
    const comments = Array.isArray(item.comments) ? item.comments : [];
    const comment = comments[commentIndex];
    setCommentEditingIndex(commentIndex);
    setCommentText(comment?.text || '');
  };

  const deleteCommentFromHistory = async (record, item, commentIndex) => {
    if (!record?.id || !item?.itemId) return;

    setCommentSaving(true);
    try {
      const recordToUpdate = issueHistory.find((entry) => entry.id === record.id);
      if (!recordToUpdate) return;

      const updatedItems = (recordToUpdate.itemsIssued || []).map((entry) => {
        if (entry.itemId !== item.itemId) return entry;
        const comments = Array.isArray(entry.comments) ? entry.comments : [];
        return {
          ...entry,
          comments: comments.filter((_, index) => index !== commentIndex),
        };
      });

      await updateDoc(doc(db, 'accessRecords', record.id), {
        itemsIssued: updatedItems,
      });

      await fetchIssueHistory();
      if (commentModal.open && commentModal.recordId === record.id && commentModal.itemId === item.itemId) {
        const updatedItem = updatedItems.find((entry) => entry.itemId === item.itemId);
        setCommentModal((prev) => ({
          ...prev,
          comments: Array.isArray(updatedItem?.comments) ? updatedItem.comments : [],
        }));
      }
      setMessage({ type: 'success', text: 'Comment deleted successfully.' });
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to delete comment.' });
    } finally {
      setCommentSaving(false);
    }
  };

  const closeCommentModal = () => {
    setCommentModal({
      open: false,
      recordId: null,
      itemId: null,
      itemName: '',
      comments: [],
    });
    setCommentText('');
  };

  const handleSaveComment = async () => {
    const trimmedComment = commentText.trim();
    if (!trimmedComment || !commentModal.recordId || !commentModal.itemId) return;

    setCommentSaving(true);
    try {
      const record = issueHistory.find((entry) => entry.id === commentModal.recordId);
      if (!record) return;

      const updatedItems = (record.itemsIssued || []).map((item) => {
        if (item.itemId !== commentModal.itemId) return item;
        const comments = Array.isArray(item.comments) ? item.comments : [];
        const nextComments = commentEditingIndex === null
          ? [
              ...comments,
              {
                text: trimmedComment,
                createdByUid: profile?.id || null,
                createdByName: profile?.name || profile?.email || null,
                createdAt: new Date().toISOString(),
              },
            ]
          : comments.map((comment, index) => (
              index === commentEditingIndex
                ? {
                    ...comment,
                    text: trimmedComment,
                    updatedByUid: profile?.id || null,
                    updatedByName: profile?.name || profile?.email || null,
                    updatedAt: new Date().toISOString(),
                  }
                : comment
            ));
        return {
          ...item,
          comments: nextComments,
        };
      });

      await updateDoc(doc(db, 'accessRecords', commentModal.recordId), {
        itemsIssued: updatedItems,
      });

      await fetchIssueHistory();
      const updatedItem = updatedItems.find((item) => item.itemId === commentModal.itemId);
      setCommentModal((prev) => ({
        ...prev,
        comments: Array.isArray(updatedItem?.comments) ? updatedItem.comments : [],
      }));
      setCommentText('');
      setCommentEditingIndex(null);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to save comment.' });
    } finally {
      setCommentSaving(false);
    }
  };

  const handleEditComment = (record, item, index) => {
    openCommentModalForEdit(record, item, index);
  };

  const handleDeleteComment = async (commentIndex) => {
    if (!commentModal.recordId || !commentModal.itemId) return;

    setCommentSaving(true);
    try {
      const record = issueHistory.find((entry) => entry.id === commentModal.recordId);
      if (!record) return;

      const updatedItems = (record.itemsIssued || []).map((item) => {
        if (item.itemId !== commentModal.itemId) return item;
        const comments = Array.isArray(item.comments) ? item.comments : [];
        return {
          ...item,
          comments: comments.filter((_, index) => index !== commentIndex),
        };
      });

      await updateDoc(doc(db, 'accessRecords', commentModal.recordId), {
        itemsIssued: updatedItems,
      });

      await fetchIssueHistory();
      const updatedItem = updatedItems.find((item) => item.itemId === commentModal.itemId);
      setCommentModal((prev) => ({
        ...prev,
        comments: Array.isArray(updatedItem?.comments) ? updatedItem.comments : [],
      }));
      setCommentText('');
      setCommentEditingIndex(null);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to delete comment.' });
    } finally {
      setCommentSaving(false);
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
      const usageSnap = await getDocs(
        query(
          collection(db, 'inventoryUsage'),
          where('itemId', '==', item.id)
        )
      );

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
      await fetchItems();
      await fetchIssueHistory();
      closeReturnConfirmModal();
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
                    setIssueReason('');
                    setIssueDescription('');
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reason *</label>
                    <input
                      type="text"
                      value={issueReason}
                      onChange={(e) => setIssueReason(e.target.value)}
                      placeholder="Enter issue reason"
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      placeholder="Optional note for this issue"
                      rows="3"
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

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

        {canManageInventory && toEnabled && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Issued History</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIssueHistoryTab('active')}
                  className={`px-3 py-2 rounded border text-sm font-semibold ${
                    issueHistoryTab === 'active'
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Active Issues
                </button>
                <button
                  type="button"
                  onClick={() => setIssueHistoryTab('completed')}
                  className={`px-3 py-2 rounded border text-sm font-semibold ${
                    issueHistoryTab === 'completed'
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Completed Issues
                </button>
                <button
                  type="button"
                  onClick={fetchIssueHistory}
                  className="px-3 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Refresh
                </button>
              </div>
            </div>

            {issueHistoryLoading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <FaSpinner className="animate-spin text-xl text-blue-600" />
                <span>Loading issue history...</span>
              </div>
            ) : (issueHistoryTab === 'active' ? activeIssueHistory : completedIssueHistory).length === 0 ? (
              <p className="text-sm text-gray-600">
                {issueHistoryTab === 'active' ? 'No active issues.' : 'No completed issues yet.'}
              </p>
            ) : (
              <div className="space-y-3">
                {(issueHistoryTab === 'active' ? activeIssueHistory : completedIssueHistory).map((record) => {
                  const isOpen = expandedIssueIds.includes(record.id);
                  const itemList = record.itemList || [];
                  const userList = record.userList || [];
                  const selectedIds = selectedReturnItems[record.id] || [];
                  const selectableIds = itemList
                    .filter((item, index) => (record.itemsWithStatus || [])[index]?.returnStatus !== 'returned')
                    .map((item) => item.itemId)
                    .filter(Boolean);
                  const allSelected = selectableIds.length > 0 && selectableIds.every((itemId) => selectedIds.includes(itemId));
                  const someSelected = selectableIds.some((itemId) => selectedIds.includes(itemId));
                  const returnedByNames = Array.from(new Set(
                    itemList
                      .map((item) => item.returnedByName)
                      .filter(Boolean)
                  ));

                  return (
                    <div key={record.id} className="border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedIssueIds((prev) =>
                            prev.includes(record.id)
                              ? prev.filter((id) => id !== record.id)
                              : [...prev, record.id]
                          );
                        }}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">
                            {formatDateTime(record.createdAt)}
                          </p>
                          {record.reason && (
                            <p className="text-sm text-gray-600">Reason: {record.reason}</p>
                          )}
                          <p className="text-sm text-gray-600">
                            {itemList.length} item(s) issued to {userList.length} user(s)
                          </p>
                          {record.isCompleted && userList.length > 0 && (
                            <p className="text-sm text-gray-600">
                              Issued to: {userList.map((user) => user.name || user.email || 'User').join(', ')}
                            </p>
                          )}
                          {record.isCompleted && returnedByNames.length > 0 && (
                            <p className="text-sm text-gray-600">
                              Get Returned by: {returnedByNames.join(', ')}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-500 text-sm">{isOpen ? 'Hide' : 'Show'}</span>
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-800 mb-2">Items</p>
                              {issueHistoryTab === 'active' && (
                                <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="checkbox"
                                    checked={allSelected}
                                    ref={(input) => {
                                      if (input) input.indeterminate = !allSelected && someSelected;
                                    }}
                                    onChange={(e) => {
                                      const nextSelected = e.target.checked ? selectableIds : [];
                                      setSelectedReturnItems((prev) => ({
                                        ...prev,
                                        [record.id]: nextSelected,
                                      }));
                                    }}
                                    className="w-4 h-4 rounded border-gray-300"
                                  />
                                  <span className="text-sm text-gray-700">Select all</span>
                                </div>
                              )}
                              <div className="space-y-1">
                                {itemList.map((item, index) => {
                                  const itemStatus = (record.itemsWithStatus || [])[index]?.returnStatus || 'not returned';
                                  const comments = Array.isArray(item.comments) ? item.comments : [];
                                  const isSelected = selectedIds.includes(item.itemId);
                                  const canSelect = itemStatus !== 'returned';
                                  return (
                                    <div key={`${record.id}-item-${index}`} className="text-sm text-gray-700 space-y-2">
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="checkbox"
                                            checked={isSelected}
                                            disabled={!canSelect || issueHistoryTab !== 'active'}
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              setSelectedReturnItems((prev) => {
                                                const current = prev[record.id] || [];
                                                const next = checked
                                                  ? Array.from(new Set([...current, item.itemId]))
                                                  : current.filter((id) => id !== item.itemId);
                                                return { ...prev, [record.id]: next };
                                              });
                                            }}
                                            className="w-4 h-4 rounded border-gray-300"
                                          />
                                          <span
                                            onClick={() => {
                                              if (!canSelect || issueHistoryTab !== 'active') return;
                                              setSelectedReturnItems((prev) => {
                                                const current = prev[record.id] || [];
                                                const next = current.includes(item.itemId)
                                                  ? current.filter((id) => id !== item.itemId)
                                                  : [...current, item.itemId];
                                                return { ...prev, [record.id]: next };
                                              });
                                            }}
                                            className={`cursor-pointer ${canSelect && issueHistoryTab === 'active' ? 'select-none' : ''}`}
                                          >
                                            {item.itemName || 'Item'}{item.itemNo ? ` (#${item.itemNo})` : ''}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => openCommentModal(record, item)}
                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                            title="Add comment"
                                          >
                                            <FaCommentDots />
                                            <span className="text-xs">{comments.length}</span>
                                          </button>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${itemStatus === 'returned' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                                          {itemStatus === 'returned' ? 'Returned' : 'Not returned'}
                                        </span>
                                      </div>

                                      {record.isCompleted && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6 text-xs text-gray-600">
                                          <div>
                                            <span className="text-gray-500">Issued by:</span>{' '}
                                            {record.createdByName || record.createdByUid || 'Unknown'}
                                          </div>
                                          <div>
                                            <span className="text-gray-500">Issued at:</span>{' '}
                                            {formatDateTime(record.createdAt)}
                                          </div>
                                          <div>
                                            <span className="text-gray-500">Returned by:</span>{' '}
                                            {item.returnedByName || item.returnedByUid || 'Unknown'}
                                          </div>
                                          <div>
                                            <span className="text-gray-500">Returned at:</span>{' '}
                                            {formatDateTime(item.returnedAt)}
                                          </div>
                                        </div>
                                      )}

                                      {comments.length > 0 && (
                                        <div className="pl-2 border-l-2 border-gray-200 space-y-1">
                                          {comments.map((comment, commentIndex) => (
                                            <div key={`${record.id}-comment-${index}-${commentIndex}`} className="text-xs text-gray-600 bg-gray-50 rounded p-2 flex items-start justify-between gap-2">
                                              <div>
                                                <div>{comment.text}</div>
                                                <div className="text-[11px] text-gray-400 mt-1">
                                                  {comment.createdByName || 'Unknown'}{comment.updatedAt ? ' (edited)' : ''}
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                  type="button"
                                                  onClick={() => handleEditComment(record, item, commentIndex)}
                                                  className="text-blue-600 hover:text-blue-800"
                                                  title="Edit comment"
                                                >
                                                  <FaEdit />
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => deleteCommentFromHistory(record, item, commentIndex)}
                                                  className="text-red-600 hover:text-red-800"
                                                  title="Delete comment"
                                                >
                                                  <FaTrash />
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-gray-800 mb-2">Users</p>
                              <div className="space-y-1">
                                {userList.map((user, index) => (
                                  <div key={`${record.id}-user-${index}`} className="text-sm text-gray-700">
                                    {user.name || user.email || 'User'}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {record.description && (
                            <div className="mt-4 border-t pt-4">
                              <p className="text-sm font-semibold text-gray-800 mb-1">Description</p>
                              <p className="text-sm text-gray-700">{record.description}</p>
                            </div>
                          )}

                          {record.isCompleted ? (
                            <div className="mt-4 border-t pt-4">
                              <p className="text-sm font-semibold text-gray-800 mb-1">Completed</p>
                              <p className="text-sm text-gray-700">All items in this issue batch have been returned.</p>
                            </div>
                          ) : (
                            <div className="mt-4 border-t pt-4">
                              <button
                                type="button"
                                onClick={() => handleReturnSelectedItems(record)}
                                disabled={selectedIds.length === 0}
                                className="w-full sm:w-auto px-4 py-2 rounded bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50"
                              >
                                Return Selected Items
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
        ) : null}

        {canManageInventory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              onClick={() => {
                if (showAddForm && !editingItem) {
                  setShowAddForm(false);
                } else {
                  handleCancelEdit();
                  setShowAddForm(true);
                }
              }}
              className="w-full h-full min-h-[140px] rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition flex flex-col items-center justify-center gap-2"
            >
              <FaPlus className="text-2xl" />
              <span className="text-base font-semibold">Add Item</span>
            </button>

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

        {commentModal.open && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={closeCommentModal}
          >
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add Comment</h3>
                <button type="button" onClick={closeCommentModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {commentModal.itemName}
              </p>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="4"
                placeholder="Write a comment..."
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {commentModal.comments.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Previous comments</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {commentModal.comments.map((comment, index) => (
                      <div key={`${commentModal.itemId}-existing-${index}`} className="text-sm text-gray-600 bg-gray-50 rounded p-2">
                        {comment.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeCommentModal}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveComment}
                  disabled={commentSaving || !commentText.trim()}
                  className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {commentSaving ? 'Saving...' : (commentEditingIndex === null ? 'Save Comment' : 'Update Comment')}
                </button>
              </div>
            </div>
          </div>
        )}

        {itemDetailModal.open && itemDetailModal.item && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={closeItemDetailModal}
          >
            <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4 p-5 border-b">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {itemDetailModal.item.itemName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Item No: {itemDetailModal.item.itemNo || 'N/A'}
                    {itemDetailModal.item.category ? ` | ${itemDetailModal.item.category}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeItemDetailModal}
                  className="text-gray-500 hover:text-gray-700"
                >
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
                        <p className="font-semibold text-gray-800">
                          {itemDetailModal.item.checkedOutToName || 'None'}
                        </p>
                      </div>
                      <div className="rounded border p-3">
                        <p className="text-gray-500">Checked Out At</p>
                        <p className="font-semibold text-gray-800">
                          {formatDateTime(itemDetailModal.item.checkedOutAt)}
                        </p>
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
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${usage.status === 'returned' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
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
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={closeReturnConfirmModal}
          >
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

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Comment
              </label>
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

export default Inventory;
