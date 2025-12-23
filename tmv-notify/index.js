const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();

// ============ CONFIGURATION ============
const CONFIG = {
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  WHATSAPP_PHONE_NUMBER: process.env.WHATSAPP_PHONE_NUMBER
};

// Email setup (Gmail with App Password)
let transporter = null;

function initEmailTransporter() {
  if (!CONFIG.GMAIL_USER || !CONFIG.GMAIL_PASS) {
    logger.warn('Email not configured: GMAIL_USER or GMAIL_PASS environment variables missing');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.GMAIL_USER,
      pass: CONFIG.GMAIL_PASS
    }
  });
}

// Initialize transporter on startup
transporter = initEmailTransporter();

// Validate WhatsApp configuration
function validateWhatsAppConfig() {
  if (!CONFIG.TWILIO_ACCOUNT_SID) {
    logger.warn('WhatsApp not configured: TWILIO_ACCOUNT_SID missing');
    return false;
  }
  if (!CONFIG.TWILIO_AUTH_TOKEN) {
    logger.warn('WhatsApp not configured: TWILIO_AUTH_TOKEN missing');
    return false;
  }
  if (!CONFIG.WHATSAPP_PHONE_NUMBER) {
    logger.warn('WhatsApp not configured: WHATSAPP_PHONE_NUMBER missing');
    return false;
  }
  return true;
}

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
      // Check if email is configured
      if (!transporter) {
        logger.error('Email service not configured', {
          docId: event.data.ref.id,
          missingVars: 'GMAIL_USER and/or GMAIL_PASS'
        });
        await event.data.ref.update({
          status: 'failed',
          error: 'Email service not configured. Set GMAIL_USER and GMAIL_PASS environment variables.',
          failedAt: new Date()
        });
        return;
      }

      const data = event.data.data();
      const { to, message } = data;

      if (!to || !Array.isArray(to) || to.length === 0) {
        logger.warn('No recipients for email', { docId: event.data.ref.id });
        await event.data.ref.update({
          status: 'failed',
          error: 'No email recipients provided'
        });
        return;
      }

      if (!message) {
        logger.warn('No message for email', { docId: event.data.ref.id });
        await event.data.ref.update({
          status: 'failed',
          error: 'No message content provided'
        });
        return;
      }

      // message can be: { subject, text, html } or just string
      const subject = typeof message === 'object' ? message.subject : 'Task Notification';
      const htmlContent = typeof message === 'object' ? message.html : `<p>${message}</p>`;
      const textContent = typeof message === 'object' ? message.text : message;

      const mailOptions = {
        from: CONFIG.GMAIL_USER || 'noreply@fotmv.com',
        to: to.join(','),
        subject: subject,
        text: textContent,
        html: htmlContent
      };

      const result = await transporter.sendMail(mailOptions);
      logger.info('Email sent successfully', {
        docId: event.data.ref.id,
        to: to,
        messageId: result.messageId
      });

      // Mark as sent
      await event.data.ref.update({
        status: 'sent',
        sentAt: new Date(),
        messageId: result.messageId
      });
    } catch (error) {
      logger.error('Email send failed', {
        docId: event.data.ref.id,
        error: error.message,
        code: error.code
      });
      await event.data.ref.update({
        status: 'failed',
        error: error.message,
        failedAt: new Date()
      });
    }
  }
);

// ============ WHATSAPP HANDLER ============
exports.onWhatsAppDocCreated = onDocumentCreated(
  'whatsapp/{docId}',
  async (event) => {
    try {
      // Check if WhatsApp is configured
      if (!validateWhatsAppConfig()) {
        logger.warn('WhatsApp not fully configured', {
          docId: event.data.ref.id,
          hasSID: !!CONFIG.TWILIO_ACCOUNT_SID,
          hasToken: !!CONFIG.TWILIO_AUTH_TOKEN,
          hasPhone: !!CONFIG.WHATSAPP_PHONE_NUMBER
        });
        await event.data.ref.update({
          status: 'pending',
          note: 'WhatsApp configuration incomplete. Waiting for TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and WHATSAPP_PHONE_NUMBER.'
        });
        return;
      }

      const data = event.data.data();
      const { to, message } = data;

      if (!to || !Array.isArray(to) || to.length === 0) {
        logger.warn('No recipients for WhatsApp', { docId: event.data.ref.id });
        await event.data.ref.update({
          status: 'failed',
          error: 'No phone numbers provided'
        });
        return;
      }

      if (!message) {
        logger.warn('No message for WhatsApp', { docId: event.data.ref.id });
        await event.data.ref.update({
          status: 'failed',
          error: 'No message content provided'
        });
        return;
      }

      // Send to each phone number
      const results = [];
      const errors = [];

      for (const phoneNumber of to) {
        try {
          // Format phone number for WhatsApp (international format)
          const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');

          if (!formattedPhone.startsWith('+')) {
            errors.push({ phone: phoneNumber, error: 'Phone number must be in international format with + prefix' });
            continue;
          }

          // Send via Twilio API
          const response = await axios.post(
            `https://api.twilio.com/2010-04-01/Accounts/${CONFIG.TWILIO_ACCOUNT_SID}/Messages.json`,
            {
              From: `whatsapp:${CONFIG.WHATSAPP_PHONE_NUMBER}`,
              To: `whatsapp:${formattedPhone}`,
              Body: message
            },
            {
              auth: {
                username: CONFIG.TWILIO_ACCOUNT_SID,
                password: CONFIG.TWILIO_AUTH_TOKEN
              }
            }
          );

          results.push({
            phone: phoneNumber,
            sid: response.data.sid,
            status: 'sent'
          });

          logger.info('WhatsApp sent via Twilio', {
            docId: event.data.ref.id,
            phone: formattedPhone,
            sid: response.data.sid
          });
        } catch (err) {
          errors.push({
            phone: phoneNumber,
            error: err.message,
            code: err.response?.status
          });
          logger.error('WhatsApp send failed for phone', {
            docId: event.data.ref.id,
            phone: phoneNumber,
            error: err.message
          });
        }
      }

      // Update with results
      const updateData = {
        status: errors.length === 0 ? 'sent' : (results.length > 0 ? 'partial' : 'failed'),
        sentAt: new Date(),
        results: results,
        errors: errors.length > 0 ? errors : null
      };

      await event.data.ref.update(updateData);

      logger.info('WhatsApp batch complete', {
        docId: event.data.ref.id,
        sent: results.length,
        failed: errors.length
      });
    } catch (error) {
      logger.error('WhatsApp handler failed', {
        docId: event.data.ref.id,
        error: error.message
      });
      await event.data.ref.update({
        status: 'failed',
        error: error.message,
        failedAt: new Date()
      });
    }
  }
);
