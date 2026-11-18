const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { addDoc, collection, FieldPath } = require('firebase-admin/firestore');
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
  if (userDoc?.userType === 'supervisor' || userDoc?.userType === 'supervisorTO') {
    return Roles.SUPERVISOR_TO;
  }
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

exports.getDepartmentUsers = onCall(
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

    const callerEmail = String(request.auth.token?.email || '');
    const callerSnap = await db.collection('users').doc(request.auth.uid).get();
    const callerDoc = callerSnap.exists ? callerSnap.data() : {};
    const caller = { ...callerDoc, email: callerDoc?.email || callerEmail };
    if (normalizeRole(caller) !== Roles.DEPARTMENT_HEAD) {
      throw new HttpsError('permission-denied', 'Only department heads can use this endpoint.');
    }

    const managedDepartments = [
      ...new Set(getManagedDepartments(caller).filter((department) =>
        ALLOWED_WORK_DEPARTMENTS.has(department)
      )),
    ];
    if (!managedDepartments.length) {
      throw new HttpsError('failed-precondition', 'No managed department is assigned.');
    }

    const userSnaps = await Promise.all(
      managedDepartments.flatMap((department) => [
        db.collection('users')
          .where('departments', 'array-contains', department)
          .get(),
        db.collection('users')
          .where('department', '==', department)
          .get(),
      ])
    );
    const usersById = new Map();
    for (const userSnap of userSnaps) {
      for (const userDoc of userSnap.docs) {
        usersById.set(userDoc.id, userDoc.data());
      }
    }

    const users = [...usersById.entries()]
      .filter(([, user]) =>
        normalizeRole(user) === Roles.MEMBER &&
        getUserDepartments(user).some((department) => managedDepartments.includes(department))
      )
      .map(([id, user]) => ({
        id,
        name: user.name || '',
        email: user.email || '',
        role: Roles.MEMBER,
        userType: user.userType || 'user',
        photoURL: user.photoURL || null,
        cardNumber: user.cardNumber || null,
        batch: user.batch || '',
        studyDepartment: user.studyDepartment || '',
        registrationNumber: user.registrationNumber || '',
        departments: getUserDepartments(user),
        department: user.department || getUserDepartments(user)[0] || null,
      }));

    return { users };
  }
);

exports.getAdminNotificationUsersHttp = onRequest(
  {
    invoker: 'public',
    cors: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tmv.fotmv.online',
    ],
  },
  async (request, response) => {
    if (request.method !== 'POST') {
      response.set('Allow', 'POST').status(405).json({ error: 'Method not allowed.' });
      return;
    }

    const authorization = request.get('authorization') || '';
    const idToken = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
    if (!idToken) {
      response.status(401).json({ error: 'Authentication required.' });
      return;
    }

    let token;
    try {
      token = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      logger.warn('Unauthenticated admin notification user request.', {
        error: error?.message || String(error),
      });
      response.status(401).json({ error: 'Authentication required.' });
      return;
    }

    const department = String(request.body?.department || '').trim();
    if (!ALLOWED_WORK_DEPARTMENTS.has(department)) {
      response.status(400).json({ error: 'Invalid department.' });
      return;
    }

    try {
      const callerSnapshot = await db.collection('users').doc(token.uid).get();
      const callerData = callerSnapshot.exists ? callerSnapshot.data() : {};
      const caller = { ...callerData, email: callerData?.email || token.email || '' };
      const callerRole = normalizeRole(caller);
      if (![Roles.DEPARTMENT_HEAD, Roles.SUPER_ADMIN, Roles.SITE_ADMIN].includes(callerRole)) {
        response.status(403).json({ error: 'You are not allowed to load notification recipients.' });
        return;
      }

      const allowedDepartments = callerRole === Roles.DEPARTMENT_HEAD
        ? getManagedDepartments(caller).filter((value) => ALLOWED_WORK_DEPARTMENTS.has(value))
        : [...ALLOWED_WORK_DEPARTMENTS];
      if (!allowedDepartments.includes(department)) {
        response.status(403).json({ error: 'You cannot load users for this department.' });
        return;
      }

      const [departmentsSnapshot, departmentSnapshot] = await Promise.all([
        db.collection('users').where('departments', 'array-contains', department).get(),
        db.collection('users').where('department', '==', department).get(),
      ]);
      const usersById = new Map();
      [...departmentsSnapshot.docs, ...departmentSnapshot.docs].forEach((userDoc) => {
        usersById.set(userDoc.id, userDoc.data());
      });
      const users = [...usersById.entries()]
        .filter(([, userData]) =>
          normalizeRole(userData) === Roles.MEMBER
          && getUserDepartments(userData).includes(department)
        )
        .map(([id, userData]) => ({
          id,
          name: userData.name || '',
          email: userData.email || '',
          departments: getUserDepartments(userData),
          department: userData.department || getUserDepartments(userData)[0] || null,
        }));

      response.json({ users });
    } catch (error) {
      logger.error('Failed to load admin notification recipients.', {
        userId: token.uid,
        department,
        error: error?.message || String(error),
      });
      response.status(500).json({ error: 'Failed to load users.' });
    }
  }
);

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

function serializeCallableValue(value) {
  if (value instanceof admin.firestore.Timestamp) {
    return value.toDate().toISOString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.map(serializeCallableValue);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entryValue]) => entryValue !== undefined)
        .map(([key, entryValue]) => [key, serializeCallableValue(entryValue)])
    );
  }
  return value;
}

async function getCallerProfileIds(authUser) {
  const profileIds = new Set([authUser.uid]);
  const email = String(authUser.token?.email || '').trim();

  if (authUser.token?.email_verified === true && email) {
    const emailValues = new Set([email, email.toLowerCase()]);
    const profileSnapshots = await Promise.all(
      Array.from(emailValues, (emailValue) =>
        db.collection('users').where('email', '==', emailValue).get()
      )
    );
    profileSnapshots.forEach((snapshot) => {
      snapshot.docs.forEach((profileDoc) => profileIds.add(profileDoc.id));
    });
  }

  return profileIds;
}

async function getAssignedWorks(profileIds) {
  const workSnapshots = await Promise.all(
    Array.from(profileIds, (profileId) =>
      db.collection('works')
        .where('assignedUsers', 'array-contains', profileId)
        .get()
    )
  );
  const worksById = new Map();
  workSnapshots.forEach((snapshot) => {
    snapshot.docs.forEach((workDoc) => worksById.set(workDoc.id, workDoc));
  });

  return Array.from(worksById.values(), (workDoc) => {
    const work = workDoc.data() || {};
    const assignedUserIds = Array.isArray(work.assignedUsers) ? work.assignedUsers : [];
    const assignedDetails = Array.isArray(work.assignedUserDetails)
      ? work.assignedUserDetails
      : [];
    const assignedUserId = assignedUserIds.find((id) => profileIds.has(id))
      || assignedDetails.find((detail) => profileIds.has(detail.userId))?.userId;

    return {
      ...serializeCallableValue(work),
      id: workDoc.id,
      __viewerUserId: assignedUserId,
    };
  });
}

exports.getUserHomeData = onCall(
  {
    cors: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tmv.fotmv.online',
    ],
  },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError('unauthenticated', 'You must be signed in.');
    }

    try {
      const profileIds = await getCallerProfileIds(request.auth);
      const tasks = await getAssignedWorks(profileIds);

      const teammateIds = new Set();
      tasks.forEach((task) => {
        const assignedUserIds = Array.isArray(task.assignedUsers)
          ? task.assignedUsers
          : (task.assignedUserDetails || []).map((detail) => detail.userId);
        assignedUserIds.forEach((assignedUserId) => {
          if (typeof assignedUserId === 'string' && !profileIds.has(assignedUserId)) {
            teammateIds.add(assignedUserId);
          }
        });
      });

      const teammateSnapshots = await Promise.all(
        Array.from(teammateIds, (teammateId) =>
          db.collection('users').doc(teammateId).get()
        )
      );
      const userDetails = {};
      teammateSnapshots.forEach((teammateSnapshot) => {
        if (!teammateSnapshot.exists) return;
        const teammate = teammateSnapshot.data() || {};
        userDetails[teammateSnapshot.id] = {
          name: teammate.name || teammate.username || teammate.displayName || 'User',
          photoURL: teammate.photoURL || null,
          avatarUrl: teammate.avatarUrl || null,
        };
      });

      return { tasks, userDetails };
    } catch (error) {
      logger.error('Failed to load user home data.', {
        userId: request.auth.uid,
        error: error?.message || String(error),
      });
      if (error instanceof HttpsError) throw error;
      throw new HttpsError('internal', 'Could not load assigned work.');
    }
  }
);

exports.updateUserWorkAction = onCall(
  {
    cors: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tmv.fotmv.online',
    ],
  },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError('unauthenticated', 'You must be signed in.');
    }

    const workId = String(request.data?.workId || '').trim();
    const action = String(request.data?.action || '');
    if (!workId || !['accept', 'reject', 'set-role'].includes(action)) {
      throw new HttpsError('invalid-argument', 'Invalid work action.');
    }

    const profileIds = await getCallerProfileIds(request.auth);
    const workRef = db.collection('works').doc(workId);
    const workSnapshot = await workRef.get();
    if (!workSnapshot.exists) {
      throw new HttpsError('not-found', 'Work not found.');
    }

    const work = workSnapshot.data() || {};
    const assignedUsers = Array.isArray(work.assignedUsers) ? work.assignedUsers : [];
    const assignedDetails = Array.isArray(work.assignedUserDetails)
      ? work.assignedUserDetails
      : [];
    const assignedUserId = assignedUsers.find((id) => profileIds.has(id))
      || assignedDetails.find((detail) => profileIds.has(detail.userId))?.userId;
    if (typeof assignedUserId !== 'string') {
      throw new HttpsError('permission-denied', 'You are not assigned to this work.');
    }

    if (action === 'accept') {
      await workRef.update(new FieldPath('userAcceptance', assignedUserId), 'accepted');
      return { userId: assignedUserId, action };
    }

    if (action === 'reject') {
      const reason = String(request.data?.reason || '').trim();
      if (!reason || reason.length > 500) {
        throw new HttpsError('invalid-argument', 'Provide a rejection reason of 500 characters or fewer.');
      }

      const rejection = {
        reason,
        timestamp: new Date().toISOString(),
        approved: false,
      };
      await workRef.update(
        new FieldPath('userAcceptance', assignedUserId),
        'rejected',
        new FieldPath('rejections', assignedUserId),
        rejection
      );
      return { userId: assignedUserId, action, rejection };
    }

    const role = String(request.data?.role || '').trim();
    const done = request.data?.done;
    if (!role || typeof done !== 'boolean') {
      throw new HttpsError('invalid-argument', 'A role and completion state are required.');
    }
    const roles = Array.isArray(request.data?.roles)
      ? [...new Set(request.data.roles.filter((value) => typeof value === 'string'))]
      : [role];
    if (!roles.length || !roles.includes(role)) {
      throw new HttpsError('invalid-argument', 'Invalid work roles.');
    }

    const assignment = assignedDetails.find((detail) => detail.userId === assignedUserId);
    const assignedRoles = Array.isArray(assignment?.roles)
      ? assignment.roles.filter((assignedRole) => typeof assignedRole === 'string')
      : [];
    const defaultRole = work.department === 'videography'
      ? 'videography'
      : work.department === 'photography'
        ? 'photography'
        : 'done';
    const allowedRoles = new Set(assignedRoles.length ? assignedRoles : [defaultRole]);
    if (roles.some((requestedRole) => !allowedRoles.has(requestedRole))) {
      throw new HttpsError('permission-denied', 'You are not assigned this work role.');
    }

    const roleUpdates = [];
    roles.forEach((requestedRole) => {
      roleUpdates.push(
        new FieldPath('roleCompletion', `${assignedUserId}_${requestedRole}`),
        done ? 'done' : admin.firestore.FieldValue.delete()
      );
    });
    await workRef.update(...roleUpdates);
    return { userId: assignedUserId, action, roles, done };
  }
);

exports.getUserTaskHistory = onCall(
  {
    cors: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tmv.fotmv.online',
    ],
  },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError('unauthenticated', 'You must be signed in.');
    }

    try {
      const profileIds = await getCallerProfileIds(request.auth);
      const tasks = await getAssignedWorks(profileIds);
      const rejectedSnapshots = await Promise.all(
        Array.from(profileIds, (profileId) =>
          db.collection('rejectedWorks').where('userId', '==', profileId).get()
        )
      );
      const rejectedById = new Map();
      rejectedSnapshots.forEach((snapshot) => {
        snapshot.docs.forEach((rejectedDoc) => rejectedById.set(rejectedDoc.id, rejectedDoc));
      });
      const rejectedTasks = Array.from(rejectedById.values(), (rejectedDoc) => ({
        ...serializeCallableValue(rejectedDoc.data()),
        id: rejectedDoc.id,
      }));

      return { tasks, rejectedTasks };
    } catch (error) {
      logger.error('Failed to load user task history.', {
        userId: request.auth.uid,
        error: error?.message || String(error),
      });
      if (error instanceof HttpsError) throw error;
      throw new HttpsError('internal', 'Could not load your work history.');
    }
  }
);

exports.getUserItemUsageHttp = onRequest(
  {
    invoker: 'public',
    cors: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tmv.fotmv.online',
    ],
  },
  async (request, response) => {
    if (request.method !== 'POST') {
      response.set('Allow', 'POST').status(405).json({ error: 'Method not allowed.' });
      return;
    }

    const authorization = request.get('authorization') || '';
    const idToken = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
    if (!idToken) {
      response.status(401).json({ error: 'Authentication required.' });
      return;
    }

    let authUser;
    try {
      const token = await admin.auth().verifyIdToken(idToken);
      authUser = { uid: token.uid, token };
    } catch (error) {
      logger.warn('Unauthenticated item usage request.', {
        error: error?.message || String(error),
      });
      response.status(401).json({ error: 'Authentication required.' });
      return;
    }

    try {
      const profileIds = await getCallerProfileIds(authUser);
      const usageSnapshots = await Promise.all(
        Array.from(profileIds).flatMap((profileId) => [
          db.collection('inventoryUsage').where('userId', '==', profileId).get(),
          db.collection('inventoryUsage').where('issuedToUserIds', 'array-contains', profileId).get(),
        ])
      );
      const usageById = new Map();
      usageSnapshots.forEach((snapshot) => {
        snapshot.docs.forEach((usageDoc) => usageById.set(usageDoc.id, usageDoc));
      });
      const usageRows = Array.from(usageById.values(), (usageDoc) => ({
        ...serializeCallableValue(usageDoc.data()),
        id: usageDoc.id,
      }));

      response.json({ usageRows });
    } catch (error) {
      logger.error('Failed to load user item usage.', {
        userId: authUser.uid,
        error: error?.message || String(error),
      });
      response.status(500).json({ error: 'Could not load usage history.' });
    }
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

function isCupboardTO(userDoc) {
  return userDoc?.isTO === true || normalizeRole(userDoc) === Roles.SUPERVISOR_TO;
}

function isCupboardAuthorizedUser(userDoc) {
  const role = normalizeRole(userDoc);
  return role === Roles.SUPER_ADMIN || isCupboardTO(userDoc);
}

function getCupboardRole(userDoc) {
  const role = normalizeRole(userDoc);
  if (role === Roles.SUPER_ADMIN) return role;
  return isCupboardTO(userDoc) ? Roles.SUPERVISOR_TO : role;
}

exports.authorizeCupboardAccess = onCall(async (request) => {
  const callerUid = request.auth?.uid;
  if (!callerUid) {
    throw new HttpsError('unauthenticated', 'Sign in before scanning an access card.');
  }

  const cardUid = typeof request.data?.cardUid === 'string'
    ? request.data.cardUid.trim()
    : '';
  if (!cardUid || cardUid.length > 200) {
    throw new HttpsError('invalid-argument', 'A valid NFC card UID is required.');
  }

  const callerSnap = await db.collection('users').doc(callerUid).get();
  const callerDoc = callerSnap.exists ? callerSnap.data() || {} : {};
  const callerRole = getCupboardRole({
    ...callerDoc,
    email: callerDoc.email || request.auth.token?.email,
  });
  if (!isCupboardAuthorizedUser(callerDoc)) {
    throw new HttpsError('permission-denied', 'Only TO and Super Admin users can scan cupboard cards.');
  }

  const cardSnapshot = await db
    .collection('users')
    .where('NFC_card_id', '==', cardUid)
    .limit(2)
    .get();
  const cardOwnerSnap = cardSnapshot.docs.length === 1 ? cardSnapshot.docs[0] : null;
  const cardOwner = cardOwnerSnap ? cardOwnerSnap.data() || {} : {};
  const ownerRole = cardOwnerSnap ? getCupboardRole(cardOwner) : null;
  const authorized = cardOwnerSnap !== null && isCupboardAuthorizedUser(cardOwner);
  const now = admin.firestore.Timestamp.now();
  const expiresAt = authorized
    ? admin.firestore.Timestamp.fromMillis(now.toMillis() + 2 * 60 * 1000)
    : now;
  const reason = authorized
    ? null
    : cardSnapshot.docs.length > 1
      ? 'This NFC card is assigned to multiple users.'
      : cardOwnerSnap
        ? 'Only TO and Super Admin cards are authorized.'
        : 'This NFC card is not assigned to a user.';
  const userName = cardOwner.username || cardOwner.name || cardOwner.displayName || null;
  if (!cardOwnerSnap) {
    return {
      authorized: false,
      userName: null,
      userRole: null,
      reason,
      expiresAt: null,
      recorded: false,
    };
  }

  const recordRef = db.collection('accessRecords').doc();
  const stateRef = db.collection('doorAccessState').doc('current');

  await db.runTransaction(async (transaction) => {
    transaction.create(recordRef, {
      authorized,
      action: 'nfc_scan',
      doorSensorTriggered: false,
      source: 'nfc-reader',
      rfidCardId: cardUid,
      userId: cardOwnerSnap?.id || null,
      userName,
      userEmail: cardOwner.email || null,
      userRole: ownerRole,
      scannedByUid: callerUid,
      scannedByRole: callerRole,
      reason,
      createdAt: now,
      accessWindowExpiresAt: authorized ? expiresAt : null,
    });
    transaction.set(stateRef, {
      authorized,
      status: authorized ? 'authorized' : 'denied',
      cardUid,
      userId: cardOwnerSnap?.id || null,
      userName,
      userEmail: cardOwner.email || null,
      userRole: ownerRole,
      scannedByUid: callerUid,
      authorizedAt: authorized ? now : null,
      scannedAt: now,
      expiresAt,
      reason,
      updatedAt: now,
    });
  });

  return {
    authorized,
    userName,
    userRole: ownerRole,
    reason,
    expiresAt: authorized ? expiresAt.toDate().toISOString() : null,
    recorded: true,
  };
});

exports.onAccessRecordCreated = onDocumentCreated(
  'accessRecords/{recordId}',
  async (event) => {
    if (!event.data) return;
    const record = event.data.data();
    if (record?.doorSensorTriggered !== true || record.authorized !== false) return;

    const users = db.collection('users');
    const recipientSnapshots = await Promise.all([
      users.where('role', 'in', [Roles.SUPER_ADMIN, Roles.SUPERVISOR_TO, 'supervisor']).get(),
      users.where('userType', 'in', ['superAdmin', 'supervisor', 'supervisorTO']).get(),
      users.where('isTO', '==', true).get(),
    ]);
    const recipientDocs = new Map();
    recipientSnapshots.forEach((snapshot) => {
      snapshot.docs.forEach((userSnap) => recipientDocs.set(userSnap.id, userSnap));
    });
    const recipients = Array.from(recipientDocs.values())
      .map((userSnap) => ({ uid: userSnap.id, data: userSnap.data() || {} }))
      .filter(({ data }) => {
        const role = normalizeRole(data);
        return role === Roles.SUPER_ADMIN || isCupboardTO(data);
      });

    if (!recipients.length) {
      logger.error('No TO or Super Admin recipients found for unauthorized door event.', {
        recordId: event.params.recordId,
      });
      return;
    }

    const title = 'Unauthorized cupboard door opening';
    const imageName = isNonEmptyString(record.imageName) ? record.imageName : null;
    const eventDate = record.createdAt?.toDate
      ? record.createdAt.toDate()
      : new Date();
    const eventTime = eventDate.toLocaleString();
    const reason = isNonEmptyString(record.reason)
      ? record.reason
      : 'No active authorized NFC scan was found.';
    const message = `The cupboard door opened without a valid NFC authorization at ${eventTime}. ${reason}${imageName ? ` Image: ${imageName}.` : ''}`;
    const accessRecordsUrl = `${(process.env.APP_URL || 'https://tmv.fotmv.online').replace(/\/+$/, '')}/access-records`;
    const notificationWrites = recipients.map(({ uid }) =>
      users.doc(uid).collection('notifications').doc(`access-${event.params.recordId}`).set({
        title,
        message,
        type: 'unauthorized-access',
        source: 'system',
        accessRecordId: event.params.recordId,
        link: '/access-records',
        imageName,
        imagePath: record.imagePath || null,
        photoUrl: record.photoUrl || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        read: false,
      })
    );

    try {
      await Promise.all(notificationWrites);
    } catch (error) {
      logger.error('Failed to create unauthorized-access notifications.', {
        recordId: event.params.recordId,
        error: error?.message || String(error),
      });
    }

    try {
      const tokens = recipients.flatMap(({ data }) => extractTokens(data));
      await sendToTokens(tokens, title, message, accessRecordsUrl);
    } catch (error) {
      logger.error('Failed to send unauthorized-access push notifications.', {
        recordId: event.params.recordId,
        error: error?.message || String(error),
      });
    }

    const emails = Array.from(new Set(
      recipients.map(({ data }) => data.email).filter(isNonEmptyString)
    ));
    if (!emails.length) {
      logger.error('No TO or Super Admin email addresses are available.', {
        recordId: event.params.recordId,
      });
      return;
    }
    if (!GMAIL_USER || !GMAIL_PASS) {
      logger.error('Cannot email unauthorized door alert: GMAIL_USER/GMAIL_PASS are not configured.', {
        recordId: event.params.recordId,
      });
      return;
    }

    const recordUrl = record.imagePath || record.photoUrl || imageName;
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[character]);
    const imageDetails = recordUrl
      ? `<p>Image: ${escapeHtml(recordUrl)}</p>`
      : '<p>No image was attached to this event.</p>';

    try {
      await transporter.sendMail({
        from: GMAIL_USER,
        to: emails.join(','),
        subject: title,
        text: `${message}\nAccess record: ${event.params.recordId}${recordUrl ? `\nImage: ${recordUrl}` : ''}`,
        html: `<p>${escapeHtml(message)}</p><p>Access record: ${escapeHtml(event.params.recordId)}</p>${imageDetails}`,
      });
    } catch (error) {
      logger.error('Failed to email unauthorized door alert.', {
        recordId: event.params.recordId,
        error: error?.message || String(error),
      });
    }
  }
);

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