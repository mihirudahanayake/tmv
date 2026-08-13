import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
  query,
  where,
  limit,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaList, FaPlus, FaSpinner, FaTimes, FaCommentDots, FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import { db, storage } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';
import { isUserTO } from '../utils/authz';

const Inventory = () => {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [items, setItems] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [issueHistory, setIssueHistory] = useState([]);
  const [issueHistoryLoading, setIssueHistoryLoading] = useState(false);
  const [issueHistoryTab, setIssueHistoryTab] = useState('active');
  const [expandedIssueIds, setExpandedIssueIds] = useState([]);
  const [selectedReturnItems, setSelectedReturnItems] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [itemSearchText, setItemSearchText] = useState('');
  const [memberSearchText, setMemberSearchText] = useState('');
  const [issueReason, setIssueReason] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [showManualCheckout, setShowManualCheckout] = useState(false);
  const [showIssueCloseConfirm, setShowIssueCloseConfirm] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    itemNo: '',
    itemName: '',
    category: '',
    description: '',
  });
  const [addImageFile, setAddImageFile] = useState(null);
  const [addImagePreview, setAddImagePreview] = useState('');
  const [addImageError, setAddImageError] = useState('');
  const [addImageUploading, setAddImageUploading] = useState(false);
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

  useEffect(() => {
    if (!message.text) return undefined;
    const timeoutId = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    return () => clearTimeout(timeoutId);
  }, [message.text]);

  useEffect(() => {
    const inventoryUnsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const data = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
      data.sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || '')));
      setItems(data);
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
        .map((entry) => ({ id: entry.id, ...entry.data() }))
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddImageError('');
    setAddImageFile(file);
    setAddImagePreview(URL.createObjectURL(file));
  };

  const handleCloseAddModal = () => {
    setShowAddForm(false);
    setFormData({ itemNo: '', itemName: '', category: '', description: '' });
    setAddImageFile(null);
    setAddImagePreview('');
    setAddImageError('');
    setAddImageUploading(false);
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const itemRef = await addDoc(collection(db, 'inventory'), {
        ...formData,
        imageUrl: '',
        status: 'available',
        createdAt: serverTimestamp(),
      });

      if (addImageFile) {
        setAddImageUploading(true);
        const path = `inventoryImages/${itemRef.id}/${Date.now()}-${addImageFile.name}`;
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, addImageFile);
        const nextImageUrl = await getDownloadURL(snapshot.ref);
        await updateDoc(itemRef, {
          imageUrl: nextImageUrl,
          updatedAt: serverTimestamp(),
        });
      }

      setMessage({ type: 'success', text: 'Item added successfully!' });
      handleCloseAddModal();
    } catch (error) {
      console.error('Error saving item:', error);
      setMessage({ type: 'error', text: 'Failed to add item.' });
    } finally {
      setAddImageUploading(false);
      setSaving(false);
    }
  };

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

  const hasIssueDraft =
    Boolean(issueReason.trim()) ||
    Boolean(issueDescription.trim()) ||
    selectedItems.length > 0 ||
    selectedMembers.length > 0 ||
    Boolean(itemSearchText.trim()) ||
    Boolean(memberSearchText.trim());

  const resetIssueDraft = () => {
    setSelectedItems([]);
    setSelectedMembers([]);
    setItemSearchText('');
    setMemberSearchText('');
    setIssueReason('');
    setIssueDescription('');
  };

  const openIssueModal = () => {
    setShowIssueCloseConfirm(false);
    setShowManualCheckout(true);
  };

  const closeIssueModal = ({ preserveDraft = true } = {}) => {
    setShowIssueCloseConfirm(false);
    setShowManualCheckout(false);
    if (!preserveDraft) resetIssueDraft();
  };

  const requestCloseIssueModal = () => {
    if (hasIssueDraft) {
      setShowIssueCloseConfirm(true);
      return;
    }
    closeIssueModal({ preserveDraft: true });
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

      for (const itemId of selectedItems) {
        const item = items.find((entry) => entry.id === itemId);
        if (!item) continue;

        if ((item.status || 'available') === 'checkedOut') {
          setMessage({ type: 'error', text: `Item "${item.itemName}" is already checked out. Return it first.` });
          setCheckingOut(false);
          return;
        }

        const primaryMember = selectedMembers[0];
        const itemRef = doc(db, 'inventory', item.id);
        const usageRef = doc(collection(db, 'inventoryUsage'));

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

      batch.set(doc(collection(db, 'accessRecords')), {
        authorized: true,
        action: 'issue',
        reason: issueReason.trim(),
        description: issueDescription.trim() || '',
        itemsIssued: usageRecords,
        issuedToMembers: selectedMembers.map((member) => ({
          id: member.id,
          name: member.name || member.email,
          email: member.email || '',
        })),
        createdByUid: profile?.id || null,
        createdByName: profile?.name || profile?.email || null,
        createdAt: serverTimestamp(),
      });

      await batch.commit();

      const itemNames = selectedItems.length === 1
        ? items.find((entry) => entry.id === selectedItems[0])?.itemName
        : `${selectedItems.length} items`;
      const memberNames = selectedMembers.map((member) => member.name || member.email).join(', ');

      setMessage({ type: 'success', text: `${itemNames} issued to ${memberNames} successfully.` });
      resetIssueDraft();
      closeIssueModal({ preserveDraft: false });
      await fetchIssueHistory();
    } catch (error) {
      console.error(error);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={headerUserType} isTO={toEnabled} />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inventory</h1>
        </div>

        {message.text && (
          <div className="fixed top-4 right-4 z-[60] max-w-md w-[calc(100vw-2rem)] sm:w-auto">
            <div className={`rounded-lg shadow-lg border px-4 py-3 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {message.text}
            </div>
          </div>
        )}

        {canManageInventory && toEnabled && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(true);
                setMessage({ type: '', text: '' });
              }}
              className="w-full min-h-[104px] sm:min-h-[140px] rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 py-3"
            >
              <FaPlus className="text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base font-semibold text-center">Add Item</span>
            </button>

            <button
              type="button"
              onClick={openIssueModal}
              className="w-full min-h-[104px] sm:min-h-[140px] rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 py-3"
            >
              <FaBox className="text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base font-semibold text-center">Issue Items</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/inventory/items')}
              className="w-full min-h-[104px] sm:min-h-[140px] rounded-lg bg-slate-700 text-white shadow-md hover:bg-slate-800 transition flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 py-3"
            >
              <FaList className="text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base font-semibold text-center">Item Cards</span>
            </button>
          </div>
        )}

        {canManageInventory && toEnabled && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Issued History</h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button type="button" onClick={() => setIssueHistoryTab('active')} className={`px-3 py-2 rounded border text-sm font-semibold ${issueHistoryTab === 'active' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Active Issues</button>
                <button type="button" onClick={() => setIssueHistoryTab('completed')} className={`px-3 py-2 rounded border text-sm font-semibold ${issueHistoryTab === 'completed' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Completed Issues</button>
                <button type="button" onClick={fetchIssueHistory} className="px-3 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50">Refresh</button>
              </div>
            </div>

            {issueHistoryLoading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <FaSpinner className="animate-spin text-xl text-blue-600" />
                <span>Loading issue history...</span>
              </div>
            ) : (issueHistoryTab === 'active' ? activeIssueHistory : completedIssueHistory).length === 0 ? (
              <p className="text-sm text-gray-600">{issueHistoryTab === 'active' ? 'No active issues.' : 'No completed issues yet.'}</p>
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
                  const returnedByNames = Array.from(new Set(itemList.map((item) => item.returnedByName).filter(Boolean)));

                  return (
                    <div key={record.id} className="border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedIssueIds((prev) => (
                            prev.includes(record.id) ? prev.filter((id) => id !== record.id) : [...prev, record.id]
                          ));
                        }}
                        className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800">{formatDateTime(record.createdAt)}</p>
                          {record.reason && <p className="text-sm text-gray-600">Reason: {record.reason}</p>}
                          <p className="text-sm text-gray-600">{itemList.length} item(s) issued to {userList.length} user(s)</p>
                          {record.isCompleted && userList.length > 0 && <p className="text-sm text-gray-600">Issued to: {userList.map((user) => user.name || user.email || 'User').join(', ')}</p>}
                          {record.isCompleted && returnedByNames.length > 0 && <p className="text-sm text-gray-600">Get Returned by: {returnedByNames.join(', ')}</p>}
                        </div>
                        <span className="self-end sm:self-auto text-gray-500 text-sm">{isOpen ? 'Hide' : 'Show'}</span>
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
                                    ref={(input) => { if (input) input.indeterminate = !allSelected && someSelected; }}
                                    onChange={(e) => {
                                      const nextSelected = e.target.checked ? selectableIds : [];
                                      setSelectedReturnItems((prev) => ({ ...prev, [record.id]: nextSelected }));
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
                                          <button type="button" onClick={() => openCommentModal(record, item)} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800" title="Add comment">
                                            <FaCommentDots />
                                            <span className="text-xs">{comments.length}</span>
                                          </button>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${itemStatus === 'returned' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                                          {itemStatus === 'returned' ? 'Returned' : 'Not returned'}
                                        </span>
                                      </div>

                                      {record.isCompleted && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 sm:pl-6 text-xs text-gray-600">
                                          <div><span className="text-gray-500">Issued by:</span> {record.createdByName || record.createdByUid || 'Unknown'}</div>
                                          <div><span className="text-gray-500">Issued at:</span> {formatDateTime(record.createdAt)}</div>
                                          <div><span className="text-gray-500">Returned by:</span> {item.returnedByName || item.returnedByUid || 'Unknown'}</div>
                                          <div><span className="text-gray-500">Returned at:</span> {formatDateTime(item.returnedAt)}</div>
                                        </div>
                                      )}

                                      {comments.length > 0 && (
                                        <div className="pl-2 border-l-2 border-gray-200 space-y-1">
                                          {comments.map((comment, commentIndex) => (
                                            <div key={`${record.id}-comment-${index}-${commentIndex}`} className="text-xs text-gray-600 bg-gray-50 rounded p-2 flex items-start justify-between gap-2">
                                              <div>
                                                <div>{comment.text}</div>
                                                <div className="text-[11px] text-gray-400 mt-1">{comment.createdByName || 'Unknown'}{comment.updatedAt ? ' (edited)' : ''}</div>
                                              </div>
                                              <div className="flex items-center gap-2 shrink-0">
                                                <button type="button" onClick={() => handleEditComment(record, item, commentIndex)} className="text-blue-600 hover:text-blue-800" title="Edit comment"><FaEdit /></button>
                                                <button type="button" onClick={() => deleteCommentFromHistory(record, item, commentIndex)} className="text-red-600 hover:text-red-800" title="Delete comment"><FaTrash /></button>
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
                                  <div key={`${record.id}-user-${index}`} className="text-sm text-gray-700">{user.name || user.email || 'User'}</div>
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
                              <button type="button" onClick={() => handleReturnSelectedItems(record)} disabled={selectedIds.length === 0} className="w-full sm:w-auto px-4 py-2 rounded bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50">
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
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={handleCloseAddModal}>
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Add New Item</h2>
                <button type="button" onClick={handleCloseAddModal} className="text-gray-500 hover:text-gray-700" title="Close"><FaTimes className="text-xl" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Item No</label>
                    <input type="text" name="itemNo" value={formData.itemNo} onChange={handleChange} required className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
                    <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
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
                    <input type="file" accept="image/*" onChange={handleAddImageChange} className="w-full text-sm" />
                  </div>
                </div>

                {(addImagePreview || addImageError) && (
                  <div className="rounded border p-3 bg-gray-50">
                    {addImagePreview && <img src={addImagePreview} alt="Item preview" className="h-40 w-full rounded object-contain bg-white" />}
                    {addImageError && <p className="mt-2 text-sm text-red-600">{addImageError}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                <div className="flex gap-2">
                  <button type="submit" disabled={saving || addImageUploading} className="flex-1 bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm">
                    {saving || addImageUploading ? 'Saving...' : 'Add Item'}
                  </button>
                  <button type="button" onClick={handleCloseAddModal} className="px-4 py-2 border border-gray-300 rounded text-gray-700 font-semibold hover:bg-gray-100 transition text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showManualCheckout && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={requestCloseIssueModal}>
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Issue to Members</h2>
                <button type="button" onClick={requestCloseIssueModal} className="text-gray-500 hover:text-gray-700" title="Close"><FaTimes className="text-xl" /></button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reason *</label>
                    <input type="text" value={issueReason} onChange={(e) => setIssueReason(e.target.value)} placeholder="Enter issue reason" className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} placeholder="Optional note for this issue" rows="3" className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Items</label>
                    <input type="text" value={itemSearchText} onChange={(e) => setItemSearchText(e.target.value)} placeholder="Search by item no or name" className="w-full mb-2 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <div className="border rounded bg-gray-50 p-3 max-h-60 overflow-y-auto">
                      {availableItems.length === 0 ? (
                        <p className="text-gray-500 text-sm">No available items.</p>
                      ) : (
                        availableItems.map((item) => (
                          <label key={item.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                            <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={(e) => {
                              if (e.target.checked) setSelectedItems([...selectedItems, item.id]);
                              else setSelectedItems(selectedItems.filter((id) => id !== item.id));
                            }} className="w-4 h-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-700">{item.itemName} {item.itemNo && `(#${item.itemNo})`}</span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Users to Issue To</label>
                    <input type="text" value={memberSearchText} onChange={(e) => setMemberSearchText(e.target.value)} placeholder="Search by user name" className="w-full mb-2 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <div className="border rounded bg-gray-50 p-3 max-h-60 overflow-y-auto">
                      {filteredMembers.length === 0 ? (
                        <p className="text-gray-500 text-sm">No users found.</p>
                      ) : (
                        filteredMembers.map((member) => (
                          <label key={member.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                            <input type="checkbox" checked={selectedMembers.some((m) => m.id === member.id)} onChange={(e) => {
                              if (e.target.checked) setSelectedMembers([...selectedMembers, member]);
                              else setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
                            }} className="w-4 h-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-700">{member.name || member.email}</span>
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
                              return <div key={itemId} className="text-sm text-blue-800">{item.itemName}{item.itemNo ? ` (#${item.itemNo})` : ''}</div>;
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
                            selectedMembers.map((member) => <div key={member.id} className="text-sm text-blue-800">{member.name || member.email}</div>)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button type="button" onClick={handleIssueToMembers} disabled={checkingOut || selectedItems.length === 0 || selectedMembers.length === 0} className="w-full bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm">
                  {checkingOut ? 'Issuing...' : `Issue ${selectedItems.length > 0 ? selectedItems.length : ''} Item(s)`}
                </button>
              </div>
            </div>
          </div>
        )}

        {showIssueCloseConfirm && (
          <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowIssueCloseConfirm(false)}>
            <div className="w-full max-w-md rounded-lg bg-white shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Close issue window?</h3>
              <p className="text-sm text-gray-600 mb-4">You have typed or selected values. Choose whether to clear them, keep them for next time, or stay here.</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => { resetIssueDraft(); closeIssueModal({ preserveDraft: false }); }} className="px-4 py-2 rounded border border-red-300 text-red-700 text-sm font-semibold hover:bg-red-50">Clear and close</button>
                <button type="button" onClick={() => closeIssueModal({ preserveDraft: true })} className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Remember and close</button>
                <button type="button" onClick={() => setShowIssueCloseConfirm(false)} className="px-4 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50">Do not close</button>
              </div>
            </div>
          </div>
        )}

        {commentModal.open && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeCommentModal}>
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add Comment</h3>
                <button type="button" onClick={closeCommentModal} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
              </div>

              <p className="text-sm text-gray-600 mb-3">{commentModal.itemName}</p>

              <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} rows="4" placeholder="Write a comment..." className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              {commentModal.comments.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Previous comments</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {commentModal.comments.map((comment, index) => (
                      <div key={`${commentModal.itemId}-existing-${index}`} className="text-sm text-gray-600 bg-gray-50 rounded p-2">{comment.text}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={closeCommentModal} className="px-4 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <button type="button" onClick={handleSaveComment} disabled={commentSaving || !commentText.trim()} className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
                  {commentSaving ? 'Saving...' : (commentEditingIndex === null ? 'Save Comment' : 'Update Comment')}
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