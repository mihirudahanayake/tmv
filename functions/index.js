const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();

// ============ EMAIL CONFIGURATION ============
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

let emailTransporter = null;

if (GMAIL_USER && GMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  console.log('Email transporter initialized');
} else {
  console.warn('Email not configured: Missing GMAIL_USER or GMAIL_PASS environment variables');
}

async function sendToUser(userId, title, body) {
  const snap = await db.collection('users').doc(userId).get();
  if (!snap.exists) return;

  const data = snap.data();
  const tokens = Array.isArray(data.fcmTokens) ? data.fcmTokens : [];
  if (!tokens.length) return;

  const message = {
    notification: { title, body },
    tokens
  };

  await admin.messaging().sendEachForMulticast(message);
}

exports.onNotificationCreated = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
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
  });
