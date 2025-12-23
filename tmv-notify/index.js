const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();

// Email setup (Gmail with App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'your-email@gmail.com',
    pass: process.env.GMAIL_PASS || 'your-app-password'
  }
});

// WhatsApp API setup (using Twilio or similar)
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY;
const WHATSAPP_PHONE_NUMBER = process.env.WHATSAPP_PHONE_NUMBER;

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
    logger.warn('No FCM tokens for user', { userId });
    return;
  }

  const message = {
    notification: { title, body },
    tokens,
  };

  const res = await admin.messaging().sendEachForMulticast(message);
  logger.info('FCM send result', { userId, successCount: res.successCount, failureCount: res.failureCount });
}

exports.onNotificationCreated = onDocumentCreated(
  'notifications/{notificationId}',
  async (event) => {
    const data = event.data.data();
    const { userId, type } = data;

    let title = 'Task update';
    let body = 'You have a new task notification.';

    if (type === 'accept') {
      title = 'Work accepted';
      body = 'You accepted a new work assignment.';
    } else if (type === 'reject') {
      title = 'Work rejected';
      body = 'You submitted a rejection for a task.';
    } else if (type === 'done') {
      title = 'Task completed';
      body = 'You completed all roles for a task.';
    } else if (type === 'undo-done') {
      title = 'Task updated';
      body = 'You changed the completion status of a task.';
    }

    await sendToUser(userId, title, body);
    logger.info('Notification sent trigger', { userId, type });
  }
);

// ============ EMAIL HANDLER ============
exports.onMailDocCreated = onDocumentCreated(
  'mail/{docId}',
  async (event) => {
    try {
      const data = event.data.data();
      const { to, message } = data;

      if (!to || !Array.isArray(to) || to.length === 0) {
        logger.warn('No recipients for email');
        return;
      }

      if (!message) {
        logger.warn('No message for email');
        return;
      }

      // message can be: { subject, text, html } or just string
      const subject = typeof message === 'object' ? message.subject : 'Task Notification';
      const htmlContent = typeof message === 'object' ? message.html : `<p>${message}</p>`;
      const textContent = typeof message === 'object' ? message.text : message;

      const mailOptions = {
        from: process.env.GMAIL_USER || 'noreply@fotmv.com',
        to: to.join(','),
        subject: subject,
        text: textContent,
        html: htmlContent
      };

      const result = await transporter.sendMail(mailOptions);
      logger.info('Email sent', { to, messageId: result.messageId });

      // Mark as sent
      await event.data.ref.update({ status: 'sent', sentAt: new Date() });
    } catch (error) {
      logger.error('Email send failed', { error: error.message });
      await event.data.ref.update({ status: 'failed', error: error.message });
    }
  }
);

// ============ WHATSAPP HANDLER ============
exports.onWhatsAppDocCreated = onDocumentCreated(
  'whatsapp/{docId}',
  async (event) => {
    try {
      const data = event.data.data();
      const { to, message } = data;

      if (!to || !Array.isArray(to) || to.length === 0) {
        logger.warn('No recipients for WhatsApp');
        return;
      }

      if (!message) {
        logger.warn('No message for WhatsApp');
        return;
      }

      // Send to each phone number
      const promises = to.map(async (phoneNumber) => {
        try {
          // Format phone number for WhatsApp (international format)
          const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');

          // Example using Twilio API
          if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
            const response = await axios.post(
              `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
              {
                From: `whatsapp:${WHATSAPP_PHONE_NUMBER}`,
                To: `whatsapp:${formattedPhone}`,
                Body: message
              },
              {
                auth: {
                  username: process.env.TWILIO_ACCOUNT_SID,
                  password: process.env.TWILIO_AUTH_TOKEN
                }
              }
            );
            logger.info('WhatsApp sent via Twilio', { phone: formattedPhone, sid: response.data.sid });
          } else {
            logger.warn('WhatsApp API not configured');
          }
        } catch (err) {
          logger.error('WhatsApp send failed', { phone: phoneNumber, error: err.message });
        }
      });

      await Promise.all(promises);

      // Mark as sent
      await event.data.ref.update({ status: 'sent', sentAt: new Date() });
    } catch (error) {
      logger.error('WhatsApp handler failed', { error: error.message });
      await event.data.ref.update({ status: 'failed', error: error.message });
    }
  }
);
