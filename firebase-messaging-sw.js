/* public/firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCKPrE1B2ikGlnr6PmTq4JVLlBDlOe50Co",
  authDomain: "tmv1-7fc4f.firebaseapp.com",
  projectId: "tmv1-7fc4f",
  storageBucket: "tmv1-7fc4f.firebasestorage.app",
  messagingSenderId: "377085834114",
  appId: "1:377085834114:web:aeb2ca19e51abe8fc5959b",
  measurementId: "G-8J8CDN3QFF"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'TMV', {
    body: body || 'You have a new task.',
    icon: '/icon-192.png'
  });
});
