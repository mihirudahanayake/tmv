import { useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
import {
  FaBox,
  FaIdCard,
  FaList,
  FaPlus,
  FaSpinner,
  FaTimes,
  FaCommentDots,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Header from '../components/Header';
import { auth, db, storage } from '../firebase/config';
import { useUserProfile } from '../hooks/useUserProfile';
import { isUserTO } from '../utils/authz';

const getTimestampMillis = (value) => {
  const date = typeof value?.toDate === 'function'
    ? value.toDate()
    : value instanceof Date
      ? value
      : value
        ? new Date(value)
        : null;

  return date && !Number.isNaN(date.getTime()) ? date.getTime() : 0;
};

const buildIssueHistoryFromUsage = (usageRecords, legacyIssueRecords) => {
  const groups = new Map();

  usageRecords
    .filter((usage) => usage.itemId)
    .forEach((usage) => {
      const issuedAt = usage.checkedOutAt || usage.createdAt || null;
      const issuedAtMillis = getTimestampMillis(issuedAt);

      const legacyRecord = legacyIssueRecords.find((record) => (
        Array.isArray(record.itemsIssued) &&
        getTimestampMillis(record.createdAt) === issuedAtMillis &&
        record.itemsIssued.some((item) => item.itemId === usage.itemId)
      ));

      const legacyItem = legacyRecord?.itemsIssued.find((item) => item.itemId === usage.itemId);
      const comments = Array.isArray(usage.comments) && usage.comments.length
        ? usage.comments
        : Array.isArray(legacyItem?.comments)
          ? legacyItem.comments
          : [];

      const returnedAt = usage.returnedAt || legacyItem?.returnedAt || null;
      const issuedToMembers = Array.isArray(usage.issuedToMembers) && usage.issuedToMembers.length
        ? usage.issuedToMembers
        : Array.isArray(legacyRecord?.issuedToMembers) && legacyRecord.issuedToMembers.length
          ? legacyRecord.issuedToMembers
          : [{
              id: usage.userId || '',
              name: usage.userName || usage.userEmail || 'Member',
              email: usage.userEmail || '',
            }];

      const reasonText = (usage.reason || legacyRecord?.reason || '').trim();
      const descriptionText = (usage.description || legacyRecord?.description || '').trim();

      const timeBucket = issuedAtMillis ? Math.floor(issuedAtMillis / 60000) : 0;
      const groupKey = `${reasonText.toLowerCase()}__${timeBucket}__${usage.issuedByUid || ''}`;

      const itemEntry = {
        usageId: usage.id,
        itemId: usage.itemId,
        itemNo: usage.itemNo || legacyItem?.itemNo || '',
        itemName: usage.itemName || legacyItem?.itemName || 'Item',
        dueAt: usage.dueAt || legacyItem?.dueAt || null,
        returnStatus: returnedAt || usage.status === 'returned'
          ? 'returned'
          : usage.status === 'overdue' || legacyItem?.returnStatus === 'overdue'
            ? 'overdue'
            : 'not returned',
        returnedAt,
        returnedByUid: usage.returnedByUid || legacyItem?.returnedByUid || null,
        returnedByName: usage.returnedByName || legacyItem?.returnedByName || null,
        isDamaged: Boolean(usage.isDamaged || legacyItem?.isDamaged),
        damageNote: usage.damageNote || legacyItem?.damageNote || '',
        damagedByName: usage.damagedByName || legacyItem?.damagedByName || null,
        damagedAt: usage.damagedAt || legacyItem?.damagedAt || null,
        comments,
      };

      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          ...usage,
          id: groupKey,
          action: 'issue',
          sourceCollection: 'inventoryUsageGroup',
          createdAt: issuedAt || legacyRecord?.createdAt || null,
          createdByUid: usage.issuedByUid || legacyRecord?.createdByUid || null,
          createdByName: usage.issuedByName || legacyRecord?.createdByName || null,
          reason: reasonText,
          description: descriptionText,
          issuedToMembers,
          itemsIssued: [itemEntry],
        });
      } else {
        const existingGroup = groups.get(groupKey);
        existingGroup.itemsIssued.push(itemEntry);

        const existingMemberKeys = new Set(
          existingGroup.issuedToMembers.map((m) => m.id || m.email || m.name)
        );
        issuedToMembers.forEach((member) => {
          const memberKey = member.id || member.email || member.name;
          if (memberKey && !existingMemberKeys.has(memberKey)) {
            existingMemberKeys.add(memberKey);
            existingGroup.issuedToMembers.push(member);
          }
        });
      }
    });

  return Array.from(groups.values()).sort(
    (a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt)
  );
};

const Inventory = () => {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [items, setItems] = useState([]);
  const itemsRef = useRef(items);
  const [allMembers, setAllMembers] = useState([]);
  const allMembersRef = useRef(allMembers);
  const allUsersRef = useRef([]);
  const [usageRecords, setUsageRecords] = useState([]);
  const [legacyIssueRecords, setLegacyIssueRecords] = useState([]);
  const [issueHistoryLoading, setIssueHistoryLoading] = useState(false);
  const [issueHistoryTab, setIssueHistoryTab] = useState('active');
  const [expandedIssueIds, setExpandedIssueIds] = useState([]);
  const [selectedReturnItems, setSelectedReturnItems] = useState({});
  const selectedReturnItemsRef = useRef(selectedReturnItems);
  const issueHistoryWithStatusRef = useRef([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [itemSearchText, setItemSearchText] = useState('');
  const [memberSearchText, setMemberSearchText] = useState('');
  const [issueReason, setIssueReason] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [showManualCheckout, setShowManualCheckout] = useState(false);
  const [rfidScanning, setRfidScanning] = useState(false);
  const [rfidScanMessage, setRfidScanMessage] = useState('');
  const [rfidReturnScanRecordId, setRfidReturnScanRecordId] = useState(null);
  const [rfidReturnScanMessageRecordId, setRfidReturnScanMessageRecordId] = useState(null);
  const [rfidReturnScanMessage, setRfidReturnScanMessage] = useState('');
  const rfidSocketRef = useRef(null);
  const [cupboardNfcScanning, setCupboardNfcScanning] = useState(false);
  const [cupboardNfcMessage, setCupboardNfcMessage] = useState('');
  const cupboardNfcScanControllerRef = useRef(null);
  const nfcApiUrl = (
    import.meta.env.VITE_NFC_URL ||
    import.meta.env.NFC_URL ||
    'http://localhost:8000'
  ).trim().replace(/\/+$/, '');
  const [showIssueCloseConfirm, setShowIssueCloseConfirm] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');
  const [reportGenerating, setReportGenerating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    itemNo: '',
    itemName: '',
    category: '',
    description: '',
    rfidCardId: '',
  });
  const [addRfidScanning, setAddRfidScanning] = useState(false);
  const [addRfidMessage, setAddRfidMessage] = useState('');
  const addRfidControllerRef = useRef(null);
  const [addImageFiles, setAddImageFiles] = useState([]);
  const [addImagePreviews, setAddImagePreviews] = useState([]);
  const [addImageError, setAddImageError] = useState('');
  const [addImageUploading, setAddImageUploading] = useState(false);

  const [commentModal, setCommentModal] = useState({
    open: false,
    recordId: null,
    itemId: null,
    itemName: '',
    isReturned: false,
    comments: [],
  });
  const [commentText, setCommentText] = useState('');
  const [commentEditingIndex, setCommentEditingIndex] = useState(null);
  const [commentSaving, setCommentSaving] = useState(false);

  const [damageModal, setDamageModal] = useState({
    open: false,
    recordId: null,
    itemId: null,
    usageId: null,
    itemName: '',
    isDamaged: false,
    damageNote: '',
  });
  const [damageNoteText, setDamageNoteText] = useState('');
  const [damageSaving, setDamageSaving] = useState(false);

  const issueHistory = useMemo(
    () => buildIssueHistoryFromUsage(usageRecords, legacyIssueRecords),
    [usageRecords, legacyIssueRecords]
  );

  selectedReturnItemsRef.current = selectedReturnItems;

  useEffect(() => {
    if (!message.text) return undefined;
    const timeoutId = setTimeout(() => setMessage({ type: '', text: '' }), 6000);
    return () => clearTimeout(timeoutId);
  }, [message.text]);

  useEffect(() => {
    const inventoryUnsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const data = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
      data.sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || '')));
      itemsRef.current = data;
      setItems(data);
    }, (error) => {
      console.error('Error listening to inventory:', error);
    });

    const membersUnsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const allUsers = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
      allUsers.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      allUsersRef.current = allUsers;

      const members = allUsers.filter((user) => !isUserTO(user));
      allMembersRef.current = members;
      setAllMembers(members);
    }, (error) => {
      console.error('Error listening to users:', error);
    });

    const issueHistoryUnsubscribe = onSnapshot(collection(db, 'inventoryUsage'), (snapshot) => {
      const records = snapshot.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .filter((record) => record.itemId);
      setUsageRecords(records);
      setIssueHistoryLoading(false);
    }, (error) => {
      console.error('Error listening to inventory usage history:', error);
    });

    const legacyIssueHistoryUnsubscribe = onSnapshot(collection(db, 'accessRecords'), (snapshot) => {
      const records = snapshot.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .filter((record) => record.action === 'issue');
      setLegacyIssueRecords(records);
      setIssueHistoryLoading(false);
    }, (error) => {
      console.error('Error listening to legacy issue history:', error);
    });

    return () => {
      inventoryUnsubscribe();
      membersUnsubscribe();
      issueHistoryUnsubscribe();
      legacyIssueHistoryUnsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!showManualCheckout && !rfidReturnScanRecordId) return undefined;

    let disposed = false;
    let reconnectTimeout;
    let socket;
    let lastDetectedUid = '';
    const websocketUrl = `${nfcApiUrl.replace(/^https:/i, 'wss:').replace(/^http:/i, 'ws:')}/nfc/events`;

    const connect = () => {
      if (disposed) return;

      setRfidScanning(true);
      if (showManualCheckout) setRfidScanMessage('Connecting to RFID reader...');
      else setRfidReturnScanMessage('Connecting to RFID reader...');

      try {
        socket = new WebSocket(websocketUrl);
        rfidSocketRef.current = socket;
      } catch (error) {
        console.error('Error connecting to RFID reader:', error);
        setRfidScanning(false);
        if (showManualCheckout) setRfidScanMessage('Could not connect to the RFID reader service.');
        else setRfidReturnScanMessage('Could not connect to the RFID reader service.');
        reconnectTimeout = window.setTimeout(connect, 1500);
        return;
      }

      socket.onopen = () => {
        if (!disposed) {
          if (showManualCheckout) setRfidScanMessage('Waiting for an item or user RFID card...');
          else setRfidReturnScanMessage('Waiting for an item RFID card...');
        }
      };

      socket.onmessage = (event) => {
        if (disposed) return;

        try {
          const data = JSON.parse(event.data);
          if (data.event === 'card_removed') {
            lastDetectedUid = '';
            if (showManualCheckout) setRfidScanMessage('Waiting for an item or user RFID card...');
            else setRfidReturnScanMessage('Waiting for an item RFID card...');
            return;
          }

          const uid = String(data.uid || '').trim();
          if (data.event !== 'card_detected' || !uid || uid.toUpperCase() === lastDetectedUid) return;
          lastDetectedUid = uid.toUpperCase();

          const getMemberRfid = (member) =>
            String(
              member?.rfidCardId ||
              member?.rfidUid ||
              member?.cardUid ||
              member?.nfcCardId ||
              ''
            ).trim().toUpperCase();

          const item = itemsRef.current.find(
            (entry) => String(entry.rfidCardId || '').trim().toUpperCase() === lastDetectedUid
          );
          const member = !item
            ? allUsersRef.current.find((entry) => getMemberRfid(entry) === lastDetectedUid)
            : null;

          if (showManualCheckout) {
            if (item) {
              if (['checkedOut', 'overdue'].includes(item.status || 'available')) {
                setRfidScanMessage(`${item.itemName || 'This item'} is not available to issue.`);
              } else {
                setSelectedItems((previous) => (
                  previous.includes(item.id) ? previous : [...previous, item.id]
                ));
                setRfidScanMessage(
                  `Item "${item.itemName || 'Item'}${item.itemNo ? ` (#${item.itemNo})` : ''}" selected. Tap another item or user card...`
                );
              }
            } else if (member) {
              setSelectedMembers((previous) => (
                previous.some((m) => m.id === member.id) ? previous : [...previous, member]
              ));
              setRfidScanMessage(
                `User "${member.name || member.email || 'Member'}" selected. Tap another item or user card...`
              );
            } else {
              setRfidScanMessage(`No item or user is assigned to RFID card ${uid}.`);
            }
          } else {
            const issueRecord = issueHistoryWithStatusRef.current.find((record) => (
              record.id === rfidReturnScanRecordId
            ));
            const itemInRecord = issueRecord?.itemList.some((issuedItem, index) => (
              issuedItem.itemId === item?.id &&
              issueRecord.itemsWithStatus[index]?.returnStatus !== 'returned'
            ));

            if (!item) {
              setRfidReturnScanMessage(`No inventory item is assigned to RFID card ${uid}.`);
            } else if (!['checkedOut', 'overdue'].includes(item.status || 'available')) {
              setRfidReturnScanMessage(`${item.itemName || 'This item'} is not currently checked out.`);
            } else if (!itemInRecord) {
              setRfidReturnScanMessage(`${item.itemName || 'This item'} is not outstanding in this issue entry.`);
            } else if ((selectedReturnItemsRef.current[issueRecord.id] || []).includes(item.id)) {
              setRfidReturnScanMessage(`${item.itemName || 'This item'} is already selected for return.`);
            } else {
              setSelectedReturnItems((previous) => ({
                ...previous,
                [issueRecord.id]: Array.from(new Set([...(previous[issueRecord.id] || []), item.id])),
              }));
              setExpandedIssueIds((previous) => (
                previous.includes(issueRecord.id) ? previous : [...previous, issueRecord.id]
              ));
              setRfidReturnScanMessage(`${item.itemName || 'Item'}${item.itemNo ? ` (#${item.itemNo})` : ''} selected for return. Click "Return Selected Items" to complete.`);
              setRfidScanning(false);
              setRfidReturnScanRecordId(null);
            }
          }
        } catch (error) {
          console.error('Error processing RFID reader event:', error);
          if (showManualCheckout) setRfidScanMessage('Received an invalid RFID reader event.');
          else setRfidReturnScanMessage('Received an invalid RFID reader event.');
        }
      };

      socket.onerror = () => {
        if (!disposed) {
          if (showManualCheckout) setRfidScanMessage('RFID reader connection interrupted. Reconnecting...');
          else setRfidReturnScanMessage('RFID reader connection interrupted. Reconnecting...');
        }
      };

      socket.onclose = () => {
        if (rfidSocketRef.current === socket) rfidSocketRef.current = null;
        if (!disposed) {
          setRfidScanning(false);
          if (showManualCheckout) setRfidScanMessage('RFID reader disconnected. Reconnecting...');
          else setRfidReturnScanMessage('RFID reader disconnected. Reconnecting...');
          reconnectTimeout = window.setTimeout(connect, 1500);
        }
      };
    };

    connect();

    return () => {
      disposed = true;
      window.clearTimeout(reconnectTimeout);
      if (rfidSocketRef.current === socket) rfidSocketRef.current = null;
      if (socket) {
        socket.onclose = null;
        socket.close();
      }
    };
  }, [showManualCheckout, rfidReturnScanRecordId, nfcApiUrl]);

  useEffect(() => () => {
    cupboardNfcScanControllerRef.current?.abort();
    addRfidControllerRef.current?.abort();
  }, []);

  const handleCupboardNfcScan = async () => {
    const isSuperAdmin = profile?.role === 'superAdmin' || profile?.userType === 'superAdmin';
    if (!isUserTO(profile) && !isSuperAdmin) {
      setCupboardNfcMessage('Only TO or Super Admin users can scan for cupboard access.');
      return;
    }

    if (cupboardNfcScanning) {
      cupboardNfcScanControllerRef.current?.abort();
      setCupboardNfcMessage('NFC scan cancelled.');
      return;
    }

    if (rfidScanning) {
      setCupboardNfcMessage('Stop the active inventory RFID scan before scanning for cupboard access.');
      return;
    }

    const controller = new AbortController();
    cupboardNfcScanControllerRef.current = controller;
    setCupboardNfcScanning(true);
    setCupboardNfcMessage('Waiting for a card. Hold it near the reader.');

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
          let operation = 'find the assigned user';
          try {
            const assignedUsers = await getDocs(query(
              collection(db, 'users'),
              where('NFC_card_id', '==', uid),
              limit(2)
            ));

            if (assignedUsers.empty) {
              setCupboardNfcMessage(`Card ${uid} is not assigned to a user. No scan record was saved.`);
            } else if (assignedUsers.size > 1) {
              setCupboardNfcMessage(`Card ${uid} is assigned to multiple users. No scan record was saved.`);
            } else {
              const owner = assignedUsers.docs[0];
              const ownerData = owner.data();
              const scannedByUid = auth.currentUser?.uid;
              if (!scannedByUid) throw new Error('You must be signed in to save a card scan.');
              operation = 'save the scan record';
              await addDoc(collection(db, 'accessRecords'), {
                action: 'cupboard_card_scan',
                source: 'nfc-reader',
                cardUid: uid,
                userId: owner.id,
                userName: ownerData.username || ownerData.name || ownerData.displayName || null,
                userEmail: ownerData.email || null,
                scannedByUid,
                scannedByRole: profile?.role === 'superAdmin' || profile?.userType === 'superAdmin'
                  ? 'superAdmin'
                  : 'supervisorTO',
                createdAt: serverTimestamp(),
              });
              setCupboardNfcMessage(
                `Card ${uid} assigned to ${ownerData.username || ownerData.name || 'user'}; scan saved at ${new Date().toLocaleString()}.`
              );
            }
          } catch (error) {
            console.error('Error looking up or recording cupboard card:', error);
            const errorCode = error?.code ? ` (${error.code})` : '';
            setCupboardNfcMessage(
              `Could not ${operation}${errorCode}: ${error?.message || 'Check Firestore permissions.'}`
            );
          }
          return;
        }

        await new Promise((resolve) => window.setTimeout(resolve, 1500));
      }

      setCupboardNfcMessage('No NFC card detected. Try again.');
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error scanning NFC card for cupboard access:', error);
        setCupboardNfcMessage('Could not read an NFC card. Check that the NFC reader service is running.');
      }
    } finally {
      if (cupboardNfcScanControllerRef.current === controller) {
        cupboardNfcScanControllerRef.current = null;
        setCupboardNfcScanning(false);
      }
    }
  };

  const fetchIssueHistory = async () => {
    setIssueHistoryLoading(true);
    try {
      const [usageSnapshot, accessSnapshot] = await Promise.all([
        getDocs(collection(db, 'inventoryUsage')),
        getDocs(collection(db, 'accessRecords')),
      ]);
      setUsageRecords(
        usageSnapshot.docs
          .map((entry) => ({ id: entry.id, ...entry.data() }))
          .filter((record) => record.itemId)
      );
      setLegacyIssueRecords(
        accessSnapshot.docs
          .map((entry) => ({ id: entry.id, ...entry.data() }))
          .filter((record) => record.action === 'issue')
      );
    } catch (error) {
      console.error('Error fetching issue history:', error);
    } finally {
      setIssueHistoryLoading(false);
    }
  };

  const role = profile?.role || 'member';
  const toEnabled = isUserTO(profile);
  const canManageInventory =
    toEnabled ||
    role === 'superAdmin' ||
    role === 'siteAdmin' ||
    role === 'departmentHead' ||
    role === 'supervisorTO';
  const canAccessCupboard =
    toEnabled || role === 'superAdmin' || profile?.userType === 'superAdmin';
  const headerUserType = role === 'departmentHead'
    ? 'admin'
    : role === 'superAdmin'
      ? 'superAdmin'
      : role === 'siteAdmin'
        ? 'siteAdmin'
        : 'user';

  const toReportDate = (value, endOfDay = false) => {
    if (!value) return null;
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return null;
    if (endOfDay) date.setHours(23, 59, 59, 999);
    return date;
  };

  const buildUsageReportRows = (records) => {
    const rows = [];

    records.forEach((record) => {
      const recordDate = record.createdAt?.toDate ? record.createdAt.toDate() : new Date(record.createdAt || Date.now());
      if (record.action === 'issue' && Array.isArray(record.itemsIssued)) {
        record.itemsIssued.forEach((item) => {
          rows.push({
            'Record Type': 'Issue',
            'Issue Date': recordDate.toLocaleString(),
            'Item No': item.itemNo || item.itemId || '',
            'Item Name': item.itemName || '',
            'Issued To': Array.isArray(record.issuedToMembers)
              ? record.issuedToMembers.map((member) => member.name || member.email || 'Unknown').join('; ')
              : record.userName || record.userId || '',
            'Issued By': record.createdByName || record.createdByUid || '',
            'Reason': record.reason || '',
            'Return Status': item.returnStatus || (item.returnedAt ? 'returned' : 'not returned'),
            'Damaged': item.isDamaged ? `Yes${item.damageNote ? ` (${item.damageNote})` : ''}` : 'No',
            'Returned Date': item.returnedAt ? formatDateTime(item.returnedAt) : '',
            'Returned By': item.returnedByName || item.returnedByUid || '',
            'Comment': Array.isArray(item.comments) ? item.comments.map((comment) => comment.text).join(' | ') : '',
          });
        });
      }

      if (record.action === 'return') {
        rows.push({
          'Record Type': 'Return',
          'Issue Date': recordDate.toLocaleString(),
          'Item No': record.itemNo || '',
          'Item Name': record.itemName || '',
          'Issued To': record.userName || '',
          'Issued By': record.createdByName || record.createdByUid || '',
          'Reason': record.reason || '',
          'Return Status': 'returned',
          'Damaged': 'No',
          'Returned Date': recordDate.toLocaleString(),
          'Returned By': record.createdByName || record.createdByUid || '',
          'Comment': record.comment || '',
        });
      }
    });

    return rows;
  };

  const handleDownloadUsageReport = async (format = 'excel') => {
    if (!canManageInventory) return;
    setReportGenerating(true);
    setMessage({ type: '', text: '' });

    try {
      const [usageSnapshot, accessSnapshot] = await Promise.all([
        getDocs(collection(db, 'inventoryUsage')),
        getDocs(collection(db, 'accessRecords')),
      ]);
      const usageRecords = usageSnapshot.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .filter((record) => record.itemId);
      const accessRecords = accessSnapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
      const legacyIssueRecords = accessRecords
        .filter((record) => record.action === 'issue' && Array.isArray(record.itemsIssued))
        .map((record) => ({
          ...record,
          itemsIssued: record.itemsIssued.filter((item) => !usageRecords.some((usage) => (
            usage.itemId === item.itemId &&
            getTimestampMillis(usage.checkedOutAt || usage.createdAt) === getTimestampMillis(record.createdAt)
          ))),
        }))
        .filter((record) => record.itemsIssued.length);
      const legacyReturnRecords = accessRecords.filter((record) => (
        record.action === 'return' &&
        !usageRecords.some((usage) => (
          usage.itemId === record.itemId &&
          getTimestampMillis(usage.returnedAt) === getTimestampMillis(record.createdAt)
        ))
      ));
      const records = [
        ...buildIssueHistoryFromUsage(usageRecords, accessRecords),
        ...legacyIssueRecords,
        ...legacyReturnRecords,
      ];

      const start = toReportDate(reportStartDate, false);
      const end = toReportDate(reportEndDate, true);

      const filtered = records.filter((record) => {
        const recordDate = record.createdAt?.toDate ? record.createdAt.toDate() : new Date(record.createdAt || 0);
        if (Number.isNaN(recordDate.getTime())) return false;
        if (record.action !== 'issue' && record.action !== 'return') return false;
        if (start && recordDate < start) return false;
        if (end && recordDate > end) return false;
        return true;
      });

      const rows = buildUsageReportRows(filtered);
      if (!rows.length) {
        setMessage({ type: 'error', text: 'No usage records found for the selected date range.' });
        return;
      }

      if (format === 'pdf') {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Item Usage Report', 14, 16);

        const tableRows = rows.map((row) => [
          row['Record Type'],
          row['Issue Date'],
          row['Item No'],
          row['Item Name'],
          row['Issued To'],
          row['Return Status'],
          row['Damaged'],
          row['Returned Date'],
        ]);

        autoTable(doc, {
          head: [['Type', 'Issue/Return Date', 'Item No', 'Item Name', 'Issued To', 'Status', 'Damaged', 'Returned Date']],
          body: tableRows,
          startY: 22,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [22, 163, 74] },
        });

        doc.save(`item_usage_report_${new Date().toISOString().slice(0, 10)}.pdf`);
        setMessage({ type: 'success', text: 'Usage report downloaded as PDF.' });
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'UsageReport');
      XLSX.writeFile(workbook, `item_usage_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
      setMessage({ type: 'success', text: 'Usage report downloaded as Excel.' });
    } catch (error) {
      console.error('Error exporting usage report:', error);
      setMessage({ type: 'error', text: 'Failed to download usage report.' });
    } finally {
      setReportGenerating(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScanAddRfid = async () => {
    if (addRfidScanning) {
      addRfidControllerRef.current?.abort();
      setAddRfidMessage('RFID scan cancelled.');
      return;
    }

    const controller = new AbortController();
    addRfidControllerRef.current = controller;
    setAddRfidScanning(true);
    setAddRfidMessage('Tap an RFID card on the reader...');

    try {
      const scanDeadline = Date.now() + 25000;
      while (Date.now() < scanDeadline) {
        const response = await fetch(`${nfcApiUrl}/nfc/read`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Reader returned ${response.status}`);
        }

        const data = await response.json();
        const uid = String(data?.uid ?? '').trim().toUpperCase();
        if (uid) {
          const existingItem = itemsRef.current.find(
            (entry) => String(entry.rfidCardId || '').trim().toUpperCase() === uid
          );
          if (existingItem) {
            setAddRfidMessage(`Card ${uid} is already assigned to "${existingItem.itemName}".`);
          } else {
            setFormData((prev) => ({ ...prev, rfidCardId: uid }));
            setAddRfidMessage(`RFID card ${uid} attached.`);
          }
          return;
        }

        await new Promise((resolve) => window.setTimeout(resolve, 1000));
      }

      setAddRfidMessage('No RFID card detected. You can try again or add the item without RFID.');
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error scanning RFID for new item:', error);
        setAddRfidMessage('Reader offline. You can enter the RFID manually or leave it empty.');
      }
    } finally {
      if (addRfidControllerRef.current === controller) {
        addRfidControllerRef.current = null;
        setAddRfidScanning(false);
      }
    }
  };

  const handleAddImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    setAddImageError('');

    if (addImageFiles.length + selectedFiles.length > 3) {
      setAddImageError('You can upload a maximum of 3 images per item.');
      e.target.value = '';
      return;
    }

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setAddImageFiles((prev) => [...prev, ...selectedFiles]);
    setAddImagePreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  const handleRemoveAddImage = (indexToRemove) => {
    URL.revokeObjectURL(addImagePreviews[indexToRemove]);
    setAddImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setAddImagePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setAddImageError('');
  };

  const handleCloseAddModal = () => {
    addRfidControllerRef.current?.abort();
    addImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setShowAddForm(false);
    setFormData({ itemNo: '', itemName: '', category: '', description: '', rfidCardId: '' });
    setAddRfidScanning(false);
    setAddRfidMessage('');
    setAddImageFiles([]);
    setAddImagePreviews([]);
    setAddImageError('');
    setAddImageUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canManageInventory) {
      setMessage({ type: 'error', text: 'You do not have permission to add items.' });
      return;
    }

    const trimmedItemNo = formData.itemNo.trim();
    const trimmedItemName = formData.itemName.trim();
    const trimmedRfid = formData.rfidCardId.trim().toUpperCase();

    if (!trimmedItemNo || !trimmedItemName || !formData.category) {
      setMessage({ type: 'error', text: 'Item No, Item Name, and Category are required.' });
      return;
    }

    if (trimmedRfid) {
      const duplicateRfid = itemsRef.current.find(
        (entry) => String(entry.rfidCardId || '').trim().toUpperCase() === trimmedRfid
      );
      if (duplicateRfid) {
        setMessage({
          type: 'error',
          text: `RFID card ${trimmedRfid} is already assigned to "${duplicateRfid.itemName}".`,
        });
        return;
      }
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const newItemPayload = {
        itemNo: trimmedItemNo,
        itemName: trimmedItemName,
        category: formData.category,
        description: formData.description.trim(),
        rfidCardId: trimmedRfid || null,
        imageUrl: '',
        imageUrls: [],
        status: 'available',
        createdByUid: profile?.id || null,
        createdByName: profile?.name || profile?.email || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const itemRef = await addDoc(collection(db, 'inventory'), newItemPayload);

      if (addImageFiles.length > 0) {
        setAddImageUploading(true);
        try {
          const uploadedUrls = await Promise.all(
            addImageFiles.map(async (file, index) => {
              const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
              const path = `inventoryImages/${itemRef.id}/${Date.now()}-${index}-${safeName}`;
              const storageRef = ref(storage, path);
              const snapshot = await uploadBytes(storageRef, file);
              return getDownloadURL(snapshot.ref);
            })
          );

          await updateDoc(itemRef, {
            imageUrl: uploadedUrls[0] || '',
            imageUrls: uploadedUrls,
            updatedAt: serverTimestamp(),
          });
        } catch (uploadError) {
          console.error('Item saved, but image upload failed:', uploadError);
          handleCloseAddModal();
          setMessage({
            type: 'error',
            text: `Item added, but image upload failed: ${uploadError?.message || 'Storage error'}`,
          });
          return;
        }
      }

      handleCloseAddModal();
      setMessage({
        type: 'success',
        text: `Item "${trimmedItemName}" added successfully${trimmedRfid ? ` (RFID: ${trimmedRfid})` : ''}!`,
      });
    } catch (error) {
      console.error('Error saving item:', error);
      setMessage({
        type: 'error',
        text: `Failed to add item: ${error?.message || 'Unknown Firestore error'}`,
      });
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

    const inventoryMatch = items.find((entry) => entry.id === item.itemId || entry.id === item.id);
    const liveStatus = inventoryMatch?.status || item.status || item.returnStatus;

    if (item.returnStatus === 'returned' || item.returnedAt || liveStatus === 'returned') return 'returned';
    if (item.returnStatus === 'overdue' || item.status === 'overdue' || liveStatus === 'overdue' || item.overdueAt || inventoryMatch?.overdueAt) return 'overdue';

    const dueAtValue = item.dueAt || inventoryMatch?.dueAt;
    const dueAtDate = dueAtValue && typeof dueAtValue.toDate === 'function'
      ? dueAtValue.toDate()
      : dueAtValue ? new Date(dueAtValue) : null;

    if (dueAtDate && !Number.isNaN(dueAtDate.getTime()) && dueAtDate.getTime() <= Date.now()) {
      return 'overdue';
    }

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
  issueHistoryWithStatusRef.current = activeIssueHistory;

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
    if (cupboardNfcScanControllerRef.current) {
      cupboardNfcScanControllerRef.current.abort();
      setCupboardNfcMessage('NFC scan cancelled because inventory scanning started.');
    }
    setRfidReturnScanRecordId(null);
    setShowIssueCloseConfirm(false);
    setRfidScanMessage('');
    setShowManualCheckout(true);
  };

  const closeIssueModal = ({ preserveDraft = true } = {}) => {
    rfidSocketRef.current?.close();
    setRfidReturnScanRecordId(null);
    setRfidScanning(false);
    setRfidScanMessage('');
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
      const batchTimestamp = serverTimestamp();

      for (const itemId of selectedItems) {
        const item = items.find((entry) => entry.id === itemId);
        if (!item) continue;

        if ((item.status || 'available') === 'checkedOut' || (item.status || 'available') === 'overdue') {
          setMessage({ type: 'error', text: `Item "${item.itemName}" is already checked out or overdue. Return it first.` });
          setCheckingOut(false);
          return;
        }

        const primaryMember = selectedMembers[0];
        const itemRef = doc(db, 'inventory', item.id);
        const usageRef = doc(collection(db, 'inventoryUsage'));
        const dueAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        batch.set(usageRef, {
          itemId: item.id,
          itemNo: item.itemNo || '',
          itemName: item.itemName || '',
          userId: primaryMember.id,
          userName: primaryMember.name || primaryMember.email || 'Member',
          userEmail: primaryMember.email || '',
          issuedToUserIds: selectedMembers.map((member) => member.id),
          issuedToMembers: selectedMembers.map((member) => ({
            id: member.id,
            name: member.name || member.email || 'Member',
            email: member.email || '',
          })),
          rfidCardId: primaryMember.rfidCardId || '',
          checkedOutAt: batchTimestamp,
          dueAt,
          returnedAt: null,
          status: 'checkedOut',
          overdueAlertSent: false,
          overdueAt: null,
          isDamaged: false,
          damageNote: '',
          issuedByUid: profile?.id || null,
          issuedByName: profile?.name || profile?.email || null,
          reason: issueReason.trim(),
          description: issueDescription.trim() || '',
          createdAt: batchTimestamp,
        });

        batch.update(itemRef, {
          status: 'checkedOut',
          checkedOutToUserId: primaryMember.id,
          checkedOutToName: primaryMember.name || primaryMember.email || 'Member',
          checkedOutAt: batchTimestamp,
          dueAt,
          overdueAt: null,
          overdueAlertSent: false,
          currentUsageId: usageRef.id,
          updatedAt: batchTimestamp,
        });
      }

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

      for (const itemId of itemIds) {
        const itemRef = doc(db, 'inventory', itemId);
        const itemSnap = items.find((entry) => entry.id === itemId);
        if (!itemSnap) continue;

        const recordItem = (record.itemsIssued || []).find((entry) => entry.itemId === itemId);
        let usageId = recordItem?.usageId || (record.sourceCollection === 'inventoryUsage' ? record.id : null) || itemSnap.currentUsageId || null;
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
            dueAt: null,
            status: 'returned',
            overdueAt: null,
            overdueAlertSent: false,
            updatedAt: serverTimestamp(),
            updatedByUid: profile?.id || null,
            updatedByName: profile?.name || profile?.email || null,
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
          overdueAt: null,
          overdueAlertSent: false,
          currentUsageId: null,
          updatedAt: serverTimestamp(),
        });
      }

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

  // --- Mark Damage Handlers ---
  const openDamageModal = (record, item, itemStatus) => {
    // Cannot edit damage once returned
    if (itemStatus === 'returned' || record.isCompleted) return;

    setDamageModal({
      open: true,
      recordId: record.id,
      itemId: item.itemId,
      usageId: item.usageId || null,
      itemName: item.itemName || 'Item',
      isDamaged: Boolean(item.isDamaged),
      damageNote: item.damageNote || '',
    });
    setDamageNoteText(item.damageNote || '');
  };

  const closeDamageModal = () => {
    setDamageModal({
      open: false,
      recordId: null,
      itemId: null,
      usageId: null,
      itemName: '',
      isDamaged: false,
      damageNote: '',
    });
    setDamageNoteText('');
  };

  const handleSaveDamage = async (markAsDamaged) => {
    if (!damageModal.itemId) return;

    setDamageSaving(true);
    try {
      const record = issueHistory.find((entry) => entry.id === damageModal.recordId);
      const recordItem = (record?.itemsIssued || []).find((entry) => entry.itemId === damageModal.itemId);
      const itemSnap = items.find((entry) => entry.id === damageModal.itemId);
      const targetUsageId = damageModal.usageId || recordItem?.usageId || itemSnap?.currentUsageId;

      if (targetUsageId) {
        await updateDoc(doc(db, 'inventoryUsage', targetUsageId), {
          isDamaged: markAsDamaged,
          damageNote: markAsDamaged ? damageNoteText.trim() : '',
          damagedByUid: markAsDamaged ? (profile?.id || null) : null,
          damagedByName: markAsDamaged ? (profile?.name || profile?.email || null) : null,
          damagedAt: markAsDamaged ? new Date().toISOString() : null,
          updatedAt: serverTimestamp(),
          updatedByUid: profile?.id || null,
        });
      }

      if (itemSnap) {
        await updateDoc(doc(db, 'inventory', damageModal.itemId), {
          isDamaged: markAsDamaged,
          damageNote: markAsDamaged ? damageNoteText.trim() : '',
          updatedAt: serverTimestamp(),
        });
      }

      await fetchIssueHistory();
      setMessage({
        type: 'success',
        text: markAsDamaged
          ? `"${damageModal.itemName}" marked as damaged.`
          : `Damage mark cleared for "${damageModal.itemName}".`,
      });
      closeDamageModal();
    } catch (error) {
      console.error('Error saving damage status:', error);
      setMessage({ type: 'error', text: 'Failed to update damage status.' });
    } finally {
      setDamageSaving(false);
    }
  };

  // --- Comment Handlers ---
  const openCommentModal = (record, item, itemStatus) => {
    setCommentModal({
      open: true,
      recordId: record.id,
      itemId: item.itemId,
      itemName: item.itemName || 'Item',
      isReturned: itemStatus === 'returned' || Boolean(record.isCompleted),
      comments: Array.isArray(item.comments) ? item.comments : [],
    });
    setCommentText('');
    setCommentEditingIndex(null);
  };

  const openCommentModalForEdit = (record, item, commentIndex, itemStatus) => {
    // Prevent editing comments after item is returned
    if (itemStatus === 'returned' || record.isCompleted) return;

    openCommentModal(record, item, itemStatus);
    const comments = Array.isArray(item.comments) ? item.comments : [];
    const comment = comments[commentIndex];
    setCommentEditingIndex(commentIndex);
    setCommentText(comment?.text || '');
  };

  const saveIssueComments = async (record, itemsWithComments, itemId) => {
    const updatedItem = itemsWithComments.find((item) => item.itemId === itemId);
    const targetUsageDocId = updatedItem?.usageId || record.id;
    await updateDoc(doc(db, 'inventoryUsage', targetUsageDocId), {
      comments: Array.isArray(updatedItem?.comments) ? updatedItem.comments : [],
      updatedAt: serverTimestamp(),
      updatedByUid: profile?.id || null,
    });
  };

  const deleteCommentFromHistory = async (record, item, commentIndex, itemStatus) => {
    // Prevent deleting comments after item is returned
    if (itemStatus === 'returned' || record.isCompleted) return;
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

      await saveIssueComments(recordToUpdate, updatedItems, item.itemId);

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
      isReturned: false,
      comments: [],
    });
    setCommentText('');
    setCommentEditingIndex(null);
  };

  const handleSaveComment = async () => {
    const trimmedComment = commentText.trim();
    if (!trimmedComment || !commentModal.recordId || !commentModal.itemId) return;

    // Extra safety: if item is already returned, force append-only (no editing existing index)
    const effectiveEditingIndex = commentModal.isReturned ? null : commentEditingIndex;

    setCommentSaving(true);
    try {
      const record = issueHistory.find((entry) => entry.id === commentModal.recordId);
      if (!record) return;

      const updatedItems = (record.itemsIssued || []).map((item) => {
        if (item.itemId !== commentModal.itemId) return item;
        const comments = Array.isArray(item.comments) ? item.comments : [];
        const nextComments = effectiveEditingIndex === null
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
              index === effectiveEditingIndex
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

      await saveIssueComments(record, updatedItems, commentModal.itemId);

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

  const handleEditComment = (record, item, index, itemStatus) => {
    openCommentModalForEdit(record, item, index, itemStatus);
  };

  const inventoryStats = [
    {
      label: 'Total items',
      value: items.length,
      accent: 'from-emerald-500 to-green-500',
      soft: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Available',
      value: items.filter((item) => (item.status || 'available') === 'available').length,
      accent: 'from-blue-500 to-cyan-500',
      soft: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Checked out',
      value: items.filter((item) => (item.status || 'available') === 'checkedOut').length,
      accent: 'from-amber-500 to-orange-500',
      soft: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Overdue',
      value: items.filter((item) => (item.status || 'available') === 'overdue').length,
      accent: 'from-rose-500 to-red-500',
      soft: 'bg-rose-50 text-red-700',
    },
    {
      label: 'Damaged',
      value: items.filter((item) => Boolean(item.isDamaged)).length,
      accent: 'from-red-600 to-rose-600',
      soft: 'bg-red-50 text-red-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <Header userType={headerUserType} isTO={toEnabled} />

      <main className="container mx-auto px-4 py-5 sm:py-6">
        <div className="mb-5 rounded-[22px] border border-white/80 bg-white/80 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-600">Inventory</p>
              <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Operations overview</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {items.length} total items
            </div>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {inventoryStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(59,130,246,0.06)]"
            >
              <div className={`mb-2.5 h-1.5 w-12 rounded-full bg-gradient-to-r ${stat.accent}`} />
              <p className="text-xs text-slate-500 sm:text-sm">{stat.label}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-xl font-bold text-slate-800 sm:text-2xl">{stat.value}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${stat.soft}`}>
                  live
                </span>
              </div>
            </div>
          ))}
        </div>

        {canAccessCupboard && (
          <div className="mb-5 rounded-[22px] border border-violet-200 bg-white/90 p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <FaIdCard className="text-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Cupboard card scan</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Scan a user-assigned card to save its UID and scan time.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCupboardNfcScan}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
              >
                {cupboardNfcScanning ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Cancel scan
                  </>
                ) : (
                  <>
                    <FaIdCard />
                    Scan NFC card
                  </>
                )}
              </button>
            </div>
            {cupboardNfcMessage && (
              <p role="status" aria-live="polite" className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-sm text-violet-800">
                {cupboardNfcMessage}
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Unassigned or ambiguously assigned cards are not saved. This scan records card activity; it does not unlock the cupboard.
            </p>
          </div>
        )}

        {message.text && (
          <div className="fixed top-4 right-4 z-[60] max-w-md w-[calc(100vw-2rem)] sm:w-auto">
            <div className={`rounded-lg shadow-lg border px-4 py-3 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {message.text}
            </div>
          </div>
        )}

        {canManageInventory && (
          <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(true);
                setMessage({ type: '', text: '' });
              }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-4 text-left text-white shadow-[0_14px_26px_rgba(16,185,129,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_28px_rgba(16,185,129,0.28)]"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/40 backdrop-blur-sm">
                  <FaPlus className="text-base" />
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-50">Create</span>
              </div>
              <div className="relative mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-50/80">Inventory</p>
                <h3 className="mt-2 text-lg font-bold">Add Item</h3>
                <p className="mt-1 text-xs text-emerald-50/90">Create a new inventory record</p>
              </div>
            </button>

            <button
              type="button"
              onClick={openIssueModal}
              className="group relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 p-4 text-left text-white shadow-[0_14px_26px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_28px_rgba(59,130,246,0.28)]"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/40 backdrop-blur-sm">
                  <FaBox className="text-base" />
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-blue-50">Issue</span>
              </div>
              <div className="relative mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-50/80">Workflow</p>
                <h3 className="mt-2 text-lg font-bold">Issue Items</h3>
                <p className="mt-1 text-xs text-blue-50/90">Assign equipment to members</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate('/inventory/items')}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4 text-left text-white shadow-[0_14px_26px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_28px_rgba(15,23,42,0.28)]"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/30 backdrop-blur-sm">
                  <FaList className="text-base" />
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-100">Browse</span>
              </div>
              <div className="relative mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">Inventory</p>
                <h3 className="mt-2 text-lg font-bold">Item Cards</h3>
                <p className="mt-1 text-xs text-slate-200">See item details and manage cards</p>
              </div>
            </button>
          </div>
        )}

        {canManageInventory && (
          <div className="mb-6 rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-[0_15px_30px_rgba(15,23,42,0.05)] sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Reports</p>
                <h2 className="mt-1 text-xl font-bold text-slate-800">Usage export</h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">From date</label>
                  <input
                    type="date"
                    value={reportStartDate}
                    onChange={(e) => setReportStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">To date</label>
                  <input
                    type="date"
                    value={reportEndDate}
                    onChange={(e) => setReportEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadUsageReport('excel')}
                    disabled={reportGenerating}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {reportGenerating ? 'Preparing...' : 'Usage Excel'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadUsageReport('pdf')}
                    disabled={reportGenerating}
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Usage PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {canManageInventory && (
          <div className="mb-5 rounded-[22px] border border-slate-200 bg-white/90 p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)] sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tracking</p>
                <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-xl">Issued History</h2>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:w-auto">
                <button type="button" onClick={() => setIssueHistoryTab('active')} className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${issueHistoryTab === 'active' ? 'border-blue-600 bg-blue-600 text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Active</button>
                <button type="button" onClick={() => setIssueHistoryTab('completed')} className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${issueHistoryTab === 'completed' ? 'border-blue-600 bg-blue-600 text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Completed</button>
                <button type="button" onClick={fetchIssueHistory} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:text-sm">Refresh</button>
              </div>
            </div>

            {issueHistoryLoading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <FaSpinner className="animate-spin text-xl text-blue-600" />
                <span>Loading issue history...</span>
              </div>
            ) : (issueHistoryTab === 'active' ? activeIssueHistory : completedIssueHistory).length === 0 ? (
              <p className="text-sm text-slate-600">{issueHistoryTab === 'active' ? 'No active issues.' : 'No completed issues yet.'}</p>
            ) : (
              <div className="space-y-4">
                {(issueHistoryTab === 'active' ? activeIssueHistory : completedIssueHistory).map((record) => {
                  const isOpen = expandedIssueIds.includes(record.id);
                  const itemList = record.itemList || [];
                  const userList = record.userList || [];
                  const selectedIds = selectedReturnItems[record.id] || [];
                  const recordHasOverdue = (record.itemsWithStatus || []).some((item) => item.returnStatus === 'overdue');
                  const selectableIds = itemList
                    .filter((item, index) => (record.itemsWithStatus || [])[index]?.returnStatus !== 'returned')
                    .map((item) => item.itemId)
                    .filter(Boolean);
                  const allSelected = selectableIds.length > 0 && selectableIds.every((itemId) => selectedIds.includes(itemId));
                  const someSelected = selectableIds.some((itemId) => selectedIds.includes(itemId));

                  return (
                    <div key={record.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 shadow-sm transition-all duration-200 hover:border-slate-300">
                      <button
                        type="button"
                        onClick={() => {
                          if (rfidReturnScanRecordId === record.id) {
                            setRfidReturnScanRecordId(null);
                            setRfidReturnScanMessage('RFID scan stopped because this issue entry was closed.');
                            setRfidScanning(false);
                          }
                          setExpandedIssueIds((prev) => (
                            prev.includes(record.id) ? prev.filter((id) => id !== record.id) : [...prev, record.id]
                          ));
                        }}
                        className="w-full bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-4 text-left transition hover:from-blue-50 hover:to-indigo-50"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={`text-base font-bold ${recordHasOverdue ? 'text-red-600' : 'text-slate-800'}`}>
                                {record.reason || record.description || 'No reason provided'}
                              </p>
                              {recordHasOverdue && (
                                <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-700">
                                  Overdue
                                </span>
                              )}
                              {!record.isCompleted && (
                                <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                                  Open
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                              Issued: {formatDateTime(record.createdAt)}
                            </p>
                            <p className="mt-1 truncate text-xs text-slate-600">
                              Items: {itemList.map((i) => i.itemName || 'Item').join(', ')}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-slate-700 ring-1 ring-slate-200">
                              {itemList.length} {itemList.length === 1 ? 'item' : 'items'}
                            </span>
                            <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-slate-700 ring-1 ring-slate-200">
                              {userList.length} {userList.length === 1 ? 'user' : 'users'}
                            </span>
                            <span className="font-medium text-blue-600">{isOpen ? 'Hide' : 'Show details'}</span>
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
                          {issueHistoryTab === 'active' && (
                            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-blue-50 px-3 py-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (rfidReturnScanRecordId === record.id) {
                                    setRfidReturnScanRecordId(null);
                                    setRfidReturnScanMessage('RFID scan cancelled.');
                                    setRfidScanning(false);
                                  } else {
                                    if (cupboardNfcScanControllerRef.current) {
                                      cupboardNfcScanControllerRef.current.abort();
                                      setCupboardNfcMessage('NFC scan cancelled because item return scanning started.');
                                    }
                                    setRfidReturnScanMessage('Connecting to RFID reader...');
                                    setRfidReturnScanMessageRecordId(record.id);
                                    setRfidReturnScanRecordId(record.id);
                                  }
                                }}
                                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                              >
                                {rfidReturnScanRecordId === record.id && rfidScanning && <FaSpinner className="animate-spin" />}
                                {rfidReturnScanRecordId === record.id ? 'Cancel RFID scan' : 'Scan RFID'}
                              </button>
                              {rfidReturnScanRecordId === record.id && (
                                <span className="text-sm text-blue-700">Tap an item card from this issue entry.</span>
                              )}
                              {rfidReturnScanMessage && rfidReturnScanMessageRecordId === record.id && (
                                <span className="text-sm text-blue-700">{rfidReturnScanMessage}</span>
                              )}
                            </div>
                          )}

                          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_0.9fr]">
                            <div>
                              <div className="mb-3 flex items-center justify-between gap-2">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">Items</p>
                                {issueHistoryTab === 'active' && (
                                  <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <input
                                      type="checkbox"
                                      checked={allSelected}
                                      ref={(input) => { if (input) input.indeterminate = !allSelected && someSelected; }}
                                      onChange={(e) => {
                                        const nextSelected = e.target.checked ? selectableIds : [];
                                        setSelectedReturnItems((prev) => ({ ...prev, [record.id]: nextSelected }));
                                      }}
                                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                                    />
                                    Select all
                                  </label>
                                )}
                              </div>

                              <div className="space-y-3">
                                {itemList.map((item, index) => {
                                  const itemStatus = (record.itemsWithStatus || [])[index]?.returnStatus || 'not returned';
                                  const comments = Array.isArray(item.comments) ? item.comments : [];
                                  const isSelected = selectedIds.includes(item.itemId);
                                  const isItemReturned = itemStatus === 'returned';
                                  const canSelect = !isItemReturned;

                                  return (
                                    <div key={`${record.id}-item-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex min-w-0 flex-wrap items-center gap-2">
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
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600"
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
                                            className={`truncate text-sm font-semibold ${canSelect && issueHistoryTab === 'active' ? 'cursor-pointer text-slate-800' : 'text-slate-700'}`}
                                          >
                                            {item.itemName || 'Item'}{item.itemNo ? ` (#${item.itemNo})` : ''}
                                          </span>

                                          {/* Mark Damage button BEFORE Add Comment button */}
                                          {!isItemReturned ? (
                                            <button
                                              type="button"
                                              onClick={() => openDamageModal(record, item, itemStatus)}
                                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 transition ${
                                                item.isDamaged
                                                  ? 'bg-red-100 text-red-700 ring-red-300 hover:bg-red-200'
                                                  : 'bg-white text-amber-700 ring-amber-300 hover:bg-amber-50'
                                              }`}
                                              title={item.isDamaged ? 'Edit damage mark' : 'Mark damage'}
                                            >
                                              <FaExclamationTriangle className="text-[11px]" />
                                              <span>{item.isDamaged ? 'Damaged' : 'Mark Damage'}</span>
                                            </button>
                                          ) : (
                                            item.isDamaged && (
                                              <span
                                                className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-300"
                                                title="Damage record locked after return"
                                              >
                                                <FaExclamationTriangle className="text-[11px]" />
                                                <span>Mark Damaged</span>
                                              </span>
                                            )
                                          )}

                                          {/* Add Comment button (always available even after return) */}
                                          <button
                                            type="button"
                                            onClick={() => openCommentModal(record, item, itemStatus)}
                                            className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-blue-600 ring-1 ring-blue-200 hover:bg-blue-50"
                                            title="Add comment"
                                          >
                                            <FaCommentDots />
                                            <span>{comments.length}</span>
                                          </button>
                                        </div>

                                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${itemStatus === 'returned' ? 'bg-emerald-100 text-emerald-700' : itemStatus === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                          {itemStatus === 'returned' ? 'Returned' : itemStatus === 'overdue' ? 'Overdue' : 'Not returned'}
                                        </span>
                                      </div>

                                      {item.isDamaged && item.damageNote && (
                                        <div className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                                          <span className="font-semibold">Damage Note:</span> {item.damageNote}
                                          {item.damagedByName && (
                                            <span className="ml-2 text-[10px] text-red-600">
                                              (Marked by {item.damagedByName})
                                            </span>
                                          )}
                                        </div>
                                      )}

                                      {isItemReturned && (
                                        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-slate-600">
                                          <div><span className="font-semibold text-slate-500">Issued by:</span> {record.createdByName || record.createdByUid || 'Unknown'}</div>
                                          <div><span className="font-semibold text-slate-500">Issued at:</span> {formatDateTime(record.createdAt)}</div>
                                          <div><span className="font-semibold text-slate-500">Returned by:</span> {item.returnedByName || item.returnedByUid || 'Unknown'}</div>
                                          <div><span className="font-semibold text-slate-500">Returned at:</span> {formatDateTime(item.returnedAt)}</div>
                                        </div>
                                      )}

                                      {comments.length > 0 && (
                                        <div className="mt-3 space-y-2 border-l-2 border-slate-200 pl-3">
                                          {comments.map((comment, commentIndex) => (
                                            <div key={`${record.id}-comment-${index}-${commentIndex}`} className="rounded-xl bg-white p-2 text-xs text-slate-600 ring-1 ring-slate-200">
                                              <div className="flex items-start justify-between gap-2">
                                                <div>
                                                  <div>{comment.text}</div>
                                                  <div className="mt-1 text-[10px] font-medium text-slate-400">
                                                    {comment.createdByName || 'Unknown'}
                                                    {comment.updatedAt ? ' • edited' : ''}
                                                  </div>
                                                </div>

                                                {/* Edit and Delete buttons only shown BEFORE item is returned */}
                                                {!isItemReturned && (
                                                  <div className="flex shrink-0 items-center gap-2">
                                                    <button
                                                      type="button"
                                                      onClick={() => handleEditComment(record, item, commentIndex, itemStatus)}
                                                      className="text-blue-600 hover:text-blue-800"
                                                      title="Edit comment"
                                                    >
                                                      <FaEdit />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() => deleteCommentFromHistory(record, item, commentIndex, itemStatus)}
                                                      className="text-red-600 hover:text-red-800"
                                                      title="Delete comment"
                                                    >
                                                      <FaTrash />
                                                    </button>
                                                  </div>
                                                )}
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
                              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">Users</p>
                              <div className="space-y-2">
                                {userList.map((user, index) => (
                                  <div key={`${record.id}-user-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                                    {user.name || user.email || 'User'}
                                  </div>
                                ))}
                              </div>

                              {record.isCompleted ? (
                                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                                  All items in this issue batch have been returned.
                                </div>
                              ) : (
                                <div className="mt-4">
                                  <button type="button" onClick={() => handleReturnSelectedItems(record)} disabled={selectedIds.length === 0} className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
                                    Return Selected Items
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {record.description && (
                            <div className="mt-5 border-t border-slate-200 pt-4">
                              <p className="text-sm font-semibold text-slate-700">Description</p>
                              <p className="mt-1 text-sm text-slate-600">{record.description}</p>
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
            <div className="w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-xl p-4 sm:p-5" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Add New Item</h2>
                <button type="button" onClick={handleCloseAddModal} className="text-gray-500 hover:text-gray-700" title="Close"><FaTimes className="text-lg" /></button>
              </div>

              <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">New item</span>
                  <span className="text-xs font-medium text-emerald-700">{formData.itemName || 'Item name pending'}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-800">
                  <span className="rounded-full bg-white px-2 py-1 ring-1 ring-emerald-200">{formData.category || 'Category pending'}</span>
                  <span className="rounded-full bg-white px-2 py-1 ring-1 ring-emerald-200">
                    {addImagePreviews.length > 0 ? `${addImagePreviews.length}/3 images ready` : 'No images (optional)'}
                  </span>
                  <span className="rounded-full bg-white px-2 py-1 ring-1 ring-emerald-200">
                    {formData.rfidCardId.trim() ? `RFID: ${formData.rfidCardId.trim().toUpperCase()}` : 'No RFID (optional)'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Item No *</label>
                    <input type="text" name="itemNo" value={formData.itemNo} onChange={handleChange} required className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Item Name *</label>
                    <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange} required className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
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
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Item Images <span className="font-normal text-gray-500">(Optional, max 3)</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={addImageFiles.length >= 3}
                      onChange={handleAddImageChange}
                      className="w-full text-sm disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    RFID Card UID <span className="font-normal text-gray-500">(Optional — scan or leave blank)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="rfidCardId"
                      value={formData.rfidCardId}
                      onChange={handleChange}
                      placeholder="e.g. A1B2C3D4"
                      className="flex-1 rounded border border-slate-200 px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.rfidCardId && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, rfidCardId: '' }));
                          setAddRfidMessage('');
                        }}
                        className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {addRfidMessage && (
                    <p className="mt-1 text-xs font-medium text-blue-700">{addRfidMessage}</p>
                  )}
                </div>

                {(addImagePreviews.length > 0 || addImageError) && (
                  <div className="rounded border border-slate-200 bg-slate-50 p-3">
                    {addImagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {addImagePreviews.map((previewUrl, index) => (
                          <div key={previewUrl} className="relative rounded border border-slate-200 bg-white p-1">
                            <img
                              src={previewUrl}
                              alt={`Item preview ${index + 1}`}
                              className="h-24 w-full rounded object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveAddImage(index)}
                              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white shadow hover:bg-red-700"
                              title="Remove image"
                            >
                              <FaTimes className="text-[10px]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {addImageError && <p className="mt-2 text-sm text-red-600">{addImageError}</p>}
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button type="submit" disabled={saving || addImageUploading} className="flex-1 rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50">
                    {saving || addImageUploading ? 'Saving...' : 'Add Item'}
                  </button>
                  <button
                    type="button"
                    onClick={handleScanAddRfid}
                    className="inline-flex items-center justify-center gap-1.5 rounded border border-blue-600 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    {addRfidScanning && <FaSpinner className="animate-spin" />}
                    {addRfidScanning ? 'Cancel Scan' : 'Add RFID'}
                  </button>
                  <button type="button" onClick={handleCloseAddModal} className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showManualCheckout && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={requestCloseIssueModal}>
            <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-xl p-4 sm:p-5" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Issue to Members</h2>
                <button type="button" onClick={requestCloseIssueModal} className="text-gray-500 hover:text-gray-700" title="Close"><FaTimes className="text-lg" /></button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Reason *</label>
                    <input type="text" value={issueReason} onChange={(e) => setIssueReason(e.target.value)} placeholder="Enter issue reason" className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
                    <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} placeholder="Optional note for this issue" rows="3" className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>

                {/* Shared RFID Reader Status Banner above both Items & Users */}
                {(rfidScanning || rfidScanMessage) && (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-200 bg-blue-50/80 px-3 py-2">
                    <span
                      className={`text-xs font-medium sm:text-sm ${
                        rfidScanMessage.startsWith('No item or user') ||
                        rfidScanMessage.includes('not available') ||
                        rfidScanMessage.startsWith('Could not') ||
                        rfidScanMessage.startsWith('No RFID') ||
                        rfidScanMessage.startsWith('NFC_URL')
                          ? 'text-red-600'
                          : 'text-blue-700'
                      }`}
                    >
                      {rfidScanMessage || 'Waiting for an item or user RFID card...'}
                    </span>
                    {rfidScanning && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                        <FaSpinner className="animate-spin" />
                        RFID active (Items & Users)
                      </span>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Select Items</label>
                    <input type="text" value={itemSearchText} onChange={(e) => setItemSearchText(e.target.value)} placeholder="Search by item no or name" className="mb-2 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <div className="max-h-52 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-2">
                      {availableItems.length === 0 ? (
                        <p className="text-sm text-gray-500">No available items.</p>
                      ) : (
                        availableItems.map((item) => (
                          <label key={item.id} className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100">
                            <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={(e) => {
                              if (e.target.checked) setSelectedItems([...selectedItems, item.id]);
                              else setSelectedItems(selectedItems.filter((id) => id !== item.id));
                            }} className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-700">{item.itemName} {item.itemNo && `(#${item.itemNo})`}</span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Select Users to Issue To</label>
                    <input type="text" value={memberSearchText} onChange={(e) => setMemberSearchText(e.target.value)} placeholder="Search by user name" className="mb-2 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <div className="max-h-52 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-2">
                      {filteredMembers.length === 0 ? (
                        <p className="text-sm text-gray-500">No users found.</p>
                      ) : (
                        filteredMembers.map((member) => (
                          <label key={member.id} className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100">
                            <input type="checkbox" checked={selectedMembers.some((m) => m.id === member.id)} onChange={(e) => {
                              if (e.target.checked) setSelectedMembers([...selectedMembers, member]);
                              else setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
                            }} className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-700">{member.name || member.email}</span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {(selectedItems.length > 0 || selectedMembers.length > 0 || issueReason || issueDescription) && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-blue-900">Issue summary</p>
                      <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 ring-1 ring-blue-200">
                        {selectedItems.length} items • {selectedMembers.length} users
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                      <div className="rounded-lg bg-white p-2.5 ring-1 ring-blue-100">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Selected items</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedItems.length === 0 ? (
                            <span className="text-sm text-blue-800">No items selected.</span>
                          ) : (
                            selectedItems.map((itemId) => {
                              const item = items.find((entry) => entry.id === itemId);
                              if (!item) return null;
                              return (
                                <button
                                  key={itemId}
                                  type="button"
                                  onClick={() => setSelectedItems((prev) => prev.filter((id) => id !== itemId))}
                                  className="rounded-full border border-blue-200 bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 transition hover:bg-blue-200"
                                >
                                  {item.itemName}{item.itemNo ? ` #${item.itemNo}` : ''}
                                </button>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <div className="rounded-lg bg-white p-2.5 ring-1 ring-blue-100">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Selected users</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedMembers.length === 0 ? (
                            <span className="text-sm text-blue-800">No users selected.</span>
                          ) : (
                            selectedMembers.map((member) => (
                              <button
                                key={member.id}
                                type="button"
                                onClick={() => setSelectedMembers((prev) => prev.filter((m) => m.id !== member.id))}
                                className="rounded-full border border-blue-200 bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 transition hover:bg-blue-200"
                              >
                                {member.name || member.email}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {(issueReason || issueDescription) && (
                      <div className="mt-3 rounded-lg bg-white p-2.5 ring-1 ring-blue-100">
                        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Details</p>
                        {issueReason && <p className="text-sm text-blue-900">Reason: {issueReason}</p>}
                        {issueDescription && <p className="mt-1 text-sm text-blue-800">Note: {issueDescription}</p>}
                      </div>
                    )}
                  </div>
                )}

                <button type="button" onClick={handleIssueToMembers} disabled={checkingOut || selectedItems.length === 0 || selectedMembers.length === 0} className="w-full rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50">
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

        {/* Mark Damage Modal */}
        {damageModal.open && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeDamageModal}>
            <div className="w-full max-w-md rounded-lg bg-white shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-700">
                  <FaExclamationTriangle />
                  <h3 className="text-lg font-semibold text-gray-800">Mark Item Damage</h3>
                </div>
                <button type="button" onClick={closeDamageModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>

              <p className="text-sm font-medium text-gray-700 mb-3">{damageModal.itemName}</p>

              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Damage Description
              </label>
              <textarea
                value={damageNoteText}
                onChange={(e) => setDamageNoteText(e.target.value)}
                rows="3"
                placeholder="Describe the damage (e.g. cracked lens, bent pin, broken strap)..."
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Note: Once the item is returned, this damage status cannot be edited.
              </p>

              <div className="mt-4 flex flex-wrap justify-end gap-2">
                {damageModal.isDamaged && (
                  <button
                    type="button"
                    onClick={() => handleSaveDamage(false)}
                    disabled={damageSaving}
                    className="px-3 py-2 rounded border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50"
                  >
                    Clear Damage
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeDamageModal}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveDamage(true)}
                  disabled={damageSaving || !damageNoteText.trim()}
                  className="px-4 py-2 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
                >
                  {damageSaving ? 'Saving...' : 'Save Damage'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comment Modal */}
        {commentModal.open && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeCommentModal}>
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {commentEditingIndex === null ? 'Add Comment' : 'Edit Comment'}
                </h3>
                <button type="button" onClick={closeCommentModal} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
              </div>

              <p className="text-sm text-gray-600 mb-3">{commentModal.itemName}</p>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="4"
                placeholder="Write a comment..."
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {commentModal.isReturned && (
                <p className="mt-2 text-xs text-slate-500">
                  This item has been returned. Existing comments are locked, but you can add a new comment.
                </p>
              )}

              {commentModal.comments.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Previous comments</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {commentModal.comments.map((comment, index) => (
                      <div key={`${commentModal.itemId}-existing-${index}`} className="text-sm text-gray-600 bg-gray-50 rounded p-2">
                        <div>{comment.text}</div>
                        <div className="mt-1 text-[10px] text-gray-400">
                          {comment.createdByName || 'Unknown'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={closeCommentModal} className="px-4 py-2 rounded border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <button type="button" onClick={handleSaveComment} disabled={commentSaving || !commentText.trim()} className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
                  {commentSaving ? 'Saving...' : (commentEditingIndex === null || commentModal.isReturned ? 'Save Comment' : 'Update Comment')}
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