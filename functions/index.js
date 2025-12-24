const { onDocumentCreated } = require('firebase-functions/v2/firestore');
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

/* ================== EMAIL SETUP ================== */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

/* ================== FCM HELPER ================== */

async function sendToUser(userId, title, body) {
  const snap = await db.collection('users').doc(userId).get();

  if (!snap.exists) {
    logger.warn('User doc not found', { userId });
    return;
  }

  const data = snap.data();
  let tokens = [];

  if (Array.isArray(data.fcmTokens) && data.fcmTokens.length) {
    tokens = data.fcmTokens;
  } else if (typeof data.fcmToken === 'string' && data.fcmToken) {
    tokens = [data.fcmToken];
  }

  if (!tokens.length) {
    logger.warn('No FCM tokens', { userId });
    return;
  }

  const message = {
    notification: { title, body },
    tokens,
  };

  const res = await admin.messaging().sendEachForMulticast(message);

  logger.info('FCM result', {
    userId,
    success: res.successCount,
    failed: res.failureCount,
  });
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
