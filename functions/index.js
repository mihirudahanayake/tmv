const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { addDoc, collection } = require('firebase-admin/firestore');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();

/* ================== ENV VARS ================== */

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const WHATSAPP_FROM = process.env.WHATSAPP_FROM; // "whatsapp:+14247049505"
/* ================== AUTHZ HELPERS ================== */

const Roles = {
  SITE_ADMIN: 'siteAdmin',
  SUPER_ADMIN: 'superAdmin',
  DEPARTMENT_HEAD: 'departmentHead',
  SUPERVISOR_TO: 'supervisorTO',
  MEMBER: 'member',
};

const SITE_ADMIN_EMAIL = 'mihirumilanka11@gmail.com';

function normalizeRole(userDoc) {
  const email = String(userDoc?.email || '').toLowerCase();
  if (email && email === SITE_ADMIN_EMAIL) return Roles.SITE_ADMIN;

  const role = userDoc?.role;
  if (role === Roles.SITE_ADMIN) return Roles.SITE_ADMIN;
  if (role === Roles.SUPER_ADMIN) return Roles.SUPER_ADMIN;
  if (role === Roles.DEPARTMENT_HEAD) return Roles.DEPARTMENT_HEAD;
  if (role === Roles.SUPERVISOR_TO) return Roles.SUPERVISOR_TO;
  if (role === Roles.MEMBER) return Roles.MEMBER;

  // Backward compatibility
  if (userDoc?.userType === 'admin') return Roles.DEPARTMENT_HEAD;
  if (userDoc?.userType === 'superAdmin') return Roles.SUPER_ADMIN;
  if (userDoc?.userType === 'supervisor') return Roles.SUPERVISOR_TO;
  return Roles.MEMBER;
}

function getManagedDepartments(userDoc) {
  const role = normalizeRole(userDoc);
  if (role !== Roles.DEPARTMENT_HEAD) return [];

  const managed = Array.isArray(userDoc?.managedDepartments)
    ? userDoc.managedDepartments.filter(Boolean)
    : [];
  if (managed.length) return managed;

  if (userDoc?.firstPriority) return [userDoc.firstPriority];

  const fromDepartments = Array.isArray(userDoc?.departments)
    ? userDoc.departments.filter(Boolean)
    : [];
  if (fromDepartments.length) return [fromDepartments[0]];

  return [];
}

function getUserDepartments(userDoc) {
  const depts = Array.isArray(userDoc?.departments) ? userDoc.departments.filter(Boolean) : [];
  if (depts.length) return depts;
  if (userDoc?.department) return [String(userDoc.department)];
  return [];
}

const ALLOWED_WORK_DEPARTMENTS = new Set([
  'videography',
  'photography',
  'graphic_design',
  'announcing',
  'content_writing',
  'editing',
]);

exports.getDepartmentUserCount = onCall(
  {
    cors: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tmv.fotmv.online',
    ],
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'You must be signed in.');
    }

    const department = String(request.data?.department || '').trim();
    if (!ALLOWED_WORK_DEPARTMENTS.has(department)) {
      throw new HttpsError('invalid-argument', 'Invalid department.');
    }

    const callerEmail = String(request.auth.token?.email || '');
    const callerSnap = await db.collection('users').doc(request.auth.uid).get();
    const callerDoc = callerSnap.exists ? callerSnap.data() : {};
    const caller = { ...callerDoc, email: callerDoc?.email || callerEmail };
    const callerRole = normalizeRole(caller);

    if (
      callerRole !== Roles.DEPARTMENT_HEAD &&
      callerRole !== Roles.SUPER_ADMIN &&
      callerRole !== Roles.SITE_ADMIN
    ) {
      throw new HttpsError('permission-denied', 'Not allowed.');
    }

    if (
      callerRole === Roles.DEPARTMENT_HEAD &&
      !getManagedDepartments(caller).includes(department)
    ) {
      throw new HttpsError('permission-denied', 'You cannot view users in this department.');
    }

    const [departmentsSnap, departmentSnap] = await Promise.all([
      db.collection('users').where('departments', 'array-contains', department).get(),
      db.collection('users').where('department', '==', department).get(),
    ]);
    const usersById = new Map();
    for (const userDoc of [...departmentsSnap.docs, ...departmentSnap.docs]) {
      usersById.set(userDoc.id, userDoc.data());
    }

    const count = [...usersById.values()].filter(
      (user) =>
        normalizeRole(user) === Roles.MEMBER &&
        getUserDepartments(user).includes(department)
    ).length;

    return { count };
  }
);

/* ================== ADMIN: DELETE USER ACCOUNT ================== */

exports.deleteUserAccount = onCall(
  {
    cors: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tmv.fotmv.online',
    ],
  },
  async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be signed in.');
  }

  const callerUid = request.auth.uid;
  const callerEmail = String(request.auth.token?.email || '');

  const targetUid = String(request.data?.uid || '').trim();
  if (!targetUid) {
    throw new HttpsError('invalid-argument', 'Missing target uid.');
  }

  if (targetUid === callerUid) {
    throw new HttpsError('failed-precondition', 'You cannot delete your own account.');
  }

  const callerSnap = await db.collection('users').doc(callerUid).get();
  const callerDoc = callerSnap.exists ? callerSnap.data() : {};
  const callerRole = normalizeRole({ ...callerDoc, email: callerDoc?.email || callerEmail });
  const callerManaged = getManagedDepartments({ ...callerDoc, email: callerDoc?.email || callerEmail });

  const isAdminRole =
    callerRole === Roles.DEPARTMENT_HEAD ||
    callerRole === Roles.SUPER_ADMIN ||
    callerRole === Roles.SITE_ADMIN;

  if (!isAdminRole) {
    throw new HttpsError('permission-denied', 'Not allowed.');
  }

  const targetRef = db.collection('users').doc(targetUid);
  const targetSnap = await targetRef.get();
  if (!targetSnap.exists) {
    throw new HttpsError('not-found', 'User not found.');
  }
  const targetDoc = targetSnap.data() || {};
  const targetRole = normalizeRole(targetDoc);

  // Safety: don’t allow deleting admins
  if (targetRole === Roles.SITE_ADMIN || targetRole === Roles.SUPER_ADMIN || targetRole === Roles.DEPARTMENT_HEAD) {
    throw new HttpsError('permission-denied', 'You cannot delete admin accounts.');
  }

  if (callerRole === Roles.DEPARTMENT_HEAD) {
    const targetDepts = getUserDepartments(targetDoc);
    const ok = targetDepts.some((d) => callerManaged.includes(d));
    if (!ok) {
      throw new HttpsError('permission-denied', 'You can only delete users in your department.');
    }
  }

  // Delete Firestore user doc (and subcollections if supported)
  try {
    if (typeof db.recursiveDelete === 'function') {
      await db.recursiveDelete(targetRef);
    } else {
      await targetRef.delete();
    }
  } catch (e) {
    logger.warn('Failed deleting user Firestore doc', { targetUid, error: e?.message || String(e) });
    throw new HttpsError('internal', 'Failed to delete user data.');
  }

  // Delete Auth user
  try {
    await admin.auth().deleteUser(targetUid);
  } catch (e) {
    logger.warn('Failed deleting auth user (maybe already removed)', { targetUid, error: e?.message || String(e) });
  }

  logger.info('User deleted by admin', { callerUid, targetUid, callerRole });
  return { ok: true };
});

/* ================== EMAIL SETUP ================== */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

/* ================== FCM HELPER ================== */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function extractTokens(userData) {
  if (Array.isArray(userData?.fcmTokens)) {
    return userData.fcmTokens.filter(isNonEmptyString);
  }
  if (isNonEmptyString(userData?.fcmToken)) {
    return [userData.fcmToken];
  }
  return [];
}

async function sendToTokens(tokens, title, body, link) {
  const deduped = Array.from(new Set(tokens)).filter(isNonEmptyString);
  if (!deduped.length) return;

  const chunkSize = 450;
  for (let i = 0; i < deduped.length; i += chunkSize) {
    const chunk = deduped.slice(i, i + chunkSize);
    const res = await admin.messaging().sendEachForMulticast({
      tokens: chunk,
      notification: { title, body },
      data: link ? { url: link } : undefined,
      webpush: link ? { fcmOptions: { link } } : undefined,
    });

    logger.info('FCM multicast result', {
      successCount: res.successCount,
      failureCount: res.failureCount,
    });
  }
}

async function sendToUser(userId, title, body, link) {
  const snap = await db.collection('users').doc(userId).get();

  if (!snap.exists) {
    logger.warn('User doc not found', { userId });
    return;
  }

  const data = snap.data();
  const tokens = extractTokens(data);

  if (!tokens.length) {
    logger.warn('No FCM tokens', { userId });
    return;
  }

  await sendToTokens(tokens, title, body, link);
}

/* ================== NOTIFICATION HANDLER ================== */

exports.onNotificationCreated = onDocumentCreated(
  'notifications/{notificationId}',
  async (event) => {
    const data = event.data.data();
    const { userId, type } = data;

    let title = 'Task update';
    let body = 'You have a new notification.';

    switch (type) {
      case 'assigned':
        title = 'New task assigned';
        body = 'You have been assigned a new task.';
        break;
      case 'accept':
        title = 'Work accepted';
        body = 'You accepted a new work assignment.';
        break;
      case 'reject':
        title = 'Work rejected';
        body = 'You rejected a task.';
        break;
      case 'done':
        title = 'Task completed';
        body = 'You completed the task.';
        break;
      case 'undo-done':
        title = 'Task updated';
        body = 'Task completion was changed.';
        break;
    }

    await sendToUser(userId, title, body);
  }
);

/* ================== INVENTORY: OVERDUE SWEEP ================== */

exports.inventoryOverdueSweep = onSchedule('every 60 minutes', async () => {
  const now = admin.firestore.Timestamp.now();
  const usageSnap = await db
    .collection('inventoryUsage')
    .where('returnedAt', '==', null)
    .where('status', 'in', ['checkedOut', 'overdue'])
    .where('dueAt', '<=', now)
    .limit(200)
    .get();

  if (usageSnap.empty) return;

  const usersSnap = await db.collection('users').get();
  const adminRecipients = usersSnap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((u) => {
      const role = normalizeRole({ ...u, email: u?.email || '' });
      return role === Roles.SUPER_ADMIN || role === Roles.SUPERVISOR_TO || role === Roles.SITE_ADMIN;
    })
    .map((u) => ({
      id: u.id,
      email: isNonEmptyString(u?.email) ? u.email : '',
      tokens: extractTokens(u),
    }))
    .filter((u) => u.id || u.email || u.tokens.length);

  const batch = db.batch();

  for (const docSnap of usageSnap.docs) {
    const usage = docSnap.data();
    const dueAtValue = usage?.dueAt;
    const dueAt = dueAtValue && typeof dueAtValue.toDate === 'function'
      ? dueAtValue.toDate()
      : dueAtValue ? new Date(dueAtValue) : null;

    if (!dueAt || dueAt.getTime() > Date.now()) continue;

    const itemId = String(usage?.itemId || '').trim();
    const userId = String(usage?.userId || '').trim();
    const overdueAt = now;
    const itemLabel = usage?.itemName || 'an item';
    const itemNo = usage?.itemNo ? ` (#${usage.itemNo})` : '';
    const overdueMessage = `Please return: ${itemLabel}${itemNo}. This item is overdue by more than 24 hours.`;

    batch.update(docSnap.ref, {
      status: 'overdue',
      overdueAt,
      overdueAlertSent: true,
      overdueAlertSentAt: overdueAt,
      updatedAt: overdueAt,
    });

    if (itemId) {
      batch.update(db.collection('inventory').doc(itemId), {
        status: 'overdue',
        overdueAt,
        overdueAlertSent: true,
        updatedAt: overdueAt,
      });
    }

    if (userId) {
      const notifRef = db.collection('users').doc(userId).collection('notifications').doc(`overdue-${docSnap.id}`);
      batch.set(
        notifRef,
        {
          type: 'inventory-overdue',
          title: 'Inventory overdue',
          message: overdueMessage,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          read: false,
          source: 'system',
        },
        { merge: true }
      );
    }

    for (const admin of adminRecipients) {
      const adminNotifRef = db.collection('users').doc(admin.id).collection('notifications').doc(`inventory-overdue-${docSnap.id}`);
      batch.set(
        adminNotifRef,
        {
          type: 'inventory-overdue-admin',
          title: 'Inventory overdue alert',
          message: `${itemLabel}${itemNo} is overdue and has not been returned within 24 hours.`,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          read: false,
          source: 'system',
        },
        { merge: true }
      );
    }

    if (adminRecipients.length > 0) {
      const adminTokens = Array.from(new Set(adminRecipients.flatMap((u) => u.tokens))).filter(isNonEmptyString);
      const adminEmails = Array.from(new Set(adminRecipients.map((u) => u.email).filter(isNonEmptyString)));

      if (adminTokens.length > 0) {
        await sendToTokens(adminTokens, 'Inventory overdue alert', `${itemLabel}${itemNo} is overdue and has not been returned within 24 hours.`, `${process.env.APP_URL || 'https://tmv.fotmv.online'}/inventory`);
      }

      if (adminEmails.length > 0 && GMAIL_USER && GMAIL_PASS) {
        const subject = `Inventory overdue alert: ${itemLabel}${itemNo}`;
        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <h3 style="margin: 0 0 12px; color: #b91c1c;">Inventory overdue alert</h3>
            <p><strong>Item:</strong> ${itemLabel}${itemNo}</p>
            <p>This item has been overdue and has not been returned within 24 hours.</p>
            <p>Please review and follow up with the assigned user.</p>
          </div>
        `;

        await transporter.sendMail({
          from: GMAIL_USER,
          to: adminEmails.join(','),
          subject,
          text: `${itemLabel}${itemNo} is overdue and has not been returned within 24 hours.`,
          html,
        });
      }
    }
  }

  await batch.commit();
});

/* ================== EMAIL HANDLER ================== */

exports.onMailDocCreated = onDocumentCreated(
  'mail/{docId}',
  async (event) => {
    try {
      const { to, message } = event.data.data();

      if (!Array.isArray(to) || !to.length || !message) {
        logger.warn('Invalid email data');
        return;
      }

      const subject =
        typeof message === 'object' ? message.subject : 'Notification';
      const text =
        typeof message === 'object' ? message.text : message;
      const html =
        typeof message === 'object'
          ? message.html
          : `<p>${message}</p>`;

      const result = await transporter.sendMail({
        from: GMAIL_USER,
        to: to.join(','),
        subject,
        text,
        html,
      });

      logger.info('Email sent', { messageId: result.messageId });

      await event.data.ref.update({
        status: 'sent',
        sentAt: new Date(),
      });
    } catch (error) {
      logger.error('Email failed', { error: error.message });

      await event.data.ref.update({
        status: 'failed',
        error: error.message,
      });
    }
  }
);

/* ================== WHATSAPP HANDLER ================== */

exports.onWhatsAppDocCreated = onDocumentCreated(
  'whatsapp/{docId}',
  async (event) => {
    try {
      const { to, message } = event.data.data();

      if (!Array.isArray(to) || !to.length || !message) {
        logger.warn('Invalid WhatsApp data');
        return;
      }

      if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !WHATSAPP_FROM) {
        logger.error('Twilio env vars missing');
        return;
      }

      const requests = to.map(async (phone) => {
        const formattedPhone = phone.replace(/[^\d+]/g, '');

        const res = await axios.post(
          `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
          new URLSearchParams({
            From: WHATSAPP_FROM,
            To: `whatsapp:${formattedPhone}`,
            Body: message,
          }),
          {
            auth: {
              username: TWILIO_ACCOUNT_SID,
              password: TWILIO_AUTH_TOKEN,
            },
          }
        );

        logger.info('WhatsApp sent', {
          to: formattedPhone,
          sid: res.data.sid,
        });
      });

      await Promise.all(requests);

      await event.data.ref.update({
        status: 'sent',
        sentAt: new Date(),
      });
    } catch (error) {
      logger.error('WhatsApp failed', { error: error.message });

      await event.data.ref.update({
        status: 'failed',
        error: error.message,
      });
    }
  }
);

/* ================== WORK ASSIGNMENT NOTIFICATION ================== */

exports.onWorkCreated = onDocumentCreated(
  'works/{workId}',
  async (event) => {
    const data = event.data.data();
    const { assignedUsers } = data;

    if (!Array.isArray(assignedUsers) || !assignedUsers.length) {
      return;
    }

    // Create notification for each assigned user
    const notificationPromises = assignedUsers.map(async (userId) => {
      await addDoc(collection(db, 'notifications'), {
        userId,
        type: 'assigned',
        workId: event.params.workId,
        createdAt: new Date().toISOString(),
      });
    });

    await Promise.all(notificationPromises);

    logger.info('Notifications created for assigned work', {
      workId: event.params.workId,
      assignedUsers: assignedUsers.length,
    });
  }
);
