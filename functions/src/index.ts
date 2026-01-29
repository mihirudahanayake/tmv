import * as admin from 'firebase-admin';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';
import * as nodemailer from 'nodemailer';
import axios from 'axios';

admin.initializeApp();
const db = admin.firestore();

const APP_URL = process.env.APP_URL || 'https://tmv.fotmv.online';

/* ================== ENV VARS ================== */

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const WHATSAPP_FROM = process.env.WHATSAPP_FROM; // e.g. "whatsapp:+14247049505"

/* ================== FCM HELPERS ================== */

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function extractTokens(userData: any): string[] {
  if (Array.isArray(userData?.fcmTokens)) {
    return userData.fcmTokens.filter(isNonEmptyString);
  }
  if (isNonEmptyString(userData?.fcmToken)) {
    return [userData.fcmToken];
  }
  return [];
}

async function sendToTokens(tokens: string[], title: string, body: string, link?: string) {
  const deduped = Array.from(new Set(tokens)).filter(isNonEmptyString);
  if (deduped.length === 0) return;

  // FCM multicast limit is 500 tokens. Keep a buffer.
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

async function sendToUser(userId: string, title: string, body: string, link?: string) {
  const snap = await db.collection('users').doc(userId).get();
  if (!snap.exists) {
    logger.warn('sendToUser: user doc not found', { userId });
    return;
  }

  const userData = snap.data();
  const tokens = extractTokens(userData);
  await sendToTokens(tokens, title, body, link);
}

/* ================== PUSH: USER NOTIFICATIONS ================== */

// New model: user-facing notifications are fanned out into /users/{uid}/notifications/{notifId}
export const onUserNotificationCreated = onDocumentCreated(
  'users/{userId}/notifications/{notifId}',
  async (event) => {
    if (!event.data) {
      logger.warn('onUserNotificationCreated: missing event.data');
      return;
    }

    const userId = event.params.userId;
    const notifId = event.params.notifId;
    const data: any = event.data.data();

    const type: string | undefined = isNonEmptyString(data?.type) ? data.type : undefined;
    const titleFromDoc: string | undefined = isNonEmptyString(data?.title) ? data.title : undefined;
    const messageFromDoc: string | undefined = isNonEmptyString(data?.message) ? data.message : undefined;

    let title = titleFromDoc || 'New notification';
    let body = messageFromDoc || 'You have a new notification.';

    if (type === 'task-assigned') {
      title = titleFromDoc || 'New work assigned';
      body = messageFromDoc || 'You were assigned a new work.';
    } else if (type === 'admin-message') {
      title = titleFromDoc || 'New message';
      body = messageFromDoc || 'You received a new message.';
    }

    await sendToUser(userId, title, body, `${APP_URL}/user/notifications/${notifId}`);
  }
);

/* ================== PUSH: GLOBAL /notifications ================== */

// Legacy + admin activity notifications live in /notifications
export const onNotificationCreated = onDocumentCreated(
  'notifications/{notificationId}',
  async (event) => {
    if (!event.data) {
      logger.warn('onNotificationCreated: missing event.data');
      return;
    }

    const notifId = event.params.notificationId;
    const data: any = event.data.data();

    const userId: string | undefined = isNonEmptyString(data?.userId) ? data.userId : undefined;
    const type: string | undefined = isNonEmptyString(data?.type) ? data.type : undefined;
    const department: string | undefined = isNonEmptyString(data?.department) ? data.department : undefined;

    // Legacy: per-user notifications were stored in /notifications with userId.
    if (userId) {
      let title = 'Task update';
      let body = 'You have a new notification.';

      switch (type) {
        case 'assigned':
          title = 'New work assigned';
          body = 'You have been assigned a new work.';
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
          body = 'A task was marked as done.';
          break;
        case 'undo-done':
          title = 'Task updated';
          body = 'A task completion was changed.';
          break;
      }

      await sendToUser(userId, title, body, `${APP_URL}/user/notifications`);
      return;
    }

    // Admin activity: accept/reject/done/undo-done lives in /notifications without userId.
    const isActivity = ['accept', 'reject', 'done', 'undo-done'].includes(type || '');
    if (!isActivity) return;
    if (!department) return;

    const adminsSnap = await db.collection('users').where('userType', '==', 'admin').get();
    const tokens: string[] = [];

    adminsSnap.docs.forEach((d) => {
      const u: any = d.data();
      const managed: string[] = Array.isArray(u?.managedDepartments)
        ? u.managedDepartments.filter(isNonEmptyString)
        : (isNonEmptyString(u?.firstPriority) ? [u.firstPriority] : []);

      if (!managed.includes(department)) return;
      tokens.push(...extractTokens(u));
    });

    if (tokens.length === 0) return;

    const who = isNonEmptyString(data?.userName) ? data.userName : 'A user';
    let title = 'New activity';
    let body = `${who} updated a work.`;
    if (type === 'accept') body = `${who} accepted a work.`;
    if (type === 'reject') body = `${who} rejected a work.`;
    if (type === 'done') body = `${who} marked a work as done.`;
    if (type === 'undo-done') body = `${who} undid a done task.`;

    await sendToTokens(tokens, title, body, `${APP_URL}/admin/notifications/${notifId}`);
  }
);

/* ================== EMAIL HANDLER ================== */

export const onMailDocCreated = onDocumentCreated('mail/{docId}', async (event) => {
  if (!event.data) {
    logger.warn('onMailDocCreated: missing event.data');
    return;
  }

  try {
    const raw: any = event.data.data();
    const to: string[] = Array.isArray(raw?.to) ? raw.to.filter(isNonEmptyString) : [];
    const message: any = raw?.message;

    if (to.length === 0 || !message) {
      logger.warn('onMailDocCreated: invalid email data');
      return;
    }

    if (!GMAIL_USER || !GMAIL_PASS) {
      const error = 'Missing GMAIL_USER/GMAIL_PASS env vars';
      logger.error(error);
      await event.data.ref.update({ status: 'failed', error });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASS },
    });

    const subject = typeof message === 'object' && isNonEmptyString(message.subject)
      ? message.subject
      : 'Notification';

    const text = typeof message === 'object'
      ? (isNonEmptyString(message.text) ? message.text : '')
      : String(message);

    const html = typeof message === 'object'
      ? (isNonEmptyString(message.html) ? message.html : `<pre>${text}</pre>`)
      : `<p>${String(message)}</p>`;

    const result = await transporter.sendMail({
      from: GMAIL_USER,
      to: to.join(','),
      subject,
      text,
      html,
    });

    logger.info('Email sent', { messageId: result.messageId });
    await event.data.ref.update({ status: 'sent', sentAt: new Date() });
  } catch (error: any) {
    logger.error('Email failed', { error: error?.message || String(error) });
    await event.data.ref.update({
      status: 'failed',
      error: error?.message || String(error),
    });
  }
});

/* ================== WHATSAPP HANDLER ================== */

export const onWhatsAppDocCreated = onDocumentCreated('whatsapp/{docId}', async (event) => {
  if (!event.data) {
    logger.warn('onWhatsAppDocCreated: missing event.data');
    return;
  }

  try {
    const raw: any = event.data.data();
    const to: string[] = Array.isArray(raw?.to) ? raw.to.filter(isNonEmptyString) : [];
    const messageRaw: any = raw?.message;

    const message = typeof messageRaw === 'object'
      ? (isNonEmptyString(messageRaw.text) ? messageRaw.text : JSON.stringify(messageRaw))
      : (isNonEmptyString(messageRaw) ? messageRaw : '');

    if (to.length === 0 || !isNonEmptyString(message)) {
      logger.warn('onWhatsAppDocCreated: invalid WhatsApp data');
      return;
    }

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !WHATSAPP_FROM) {
      const error = 'Missing TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN/WHATSAPP_FROM env vars';
      logger.error(error);
      await event.data.ref.update({ status: 'failed', error });
      return;
    }

    const requests = to.map(async (phone: string) => {
      const formattedPhone = phone.replace(/[\s\-()]/g, '');

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

      logger.info('WhatsApp sent', { to: formattedPhone, sid: res.data?.sid });
    });

    await Promise.all(requests);
    await event.data.ref.update({ status: 'sent', sentAt: new Date() });
  } catch (error: any) {
    logger.error('WhatsApp failed', { error: error?.message || String(error) });
    await event.data.ref.update({
      status: 'failed',
      error: error?.message || String(error),
    });
  }
});
