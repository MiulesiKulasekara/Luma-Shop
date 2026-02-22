// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "FILL_CORRECT_DETAILS",
    authDomain: "FILL_CORRECT_DETAILS",
    projectId: "FILL_CORRECT_DETAILS",
    storageBucket: "FILL_CORRECT_DETAILS",
    messagingSenderId: "FILL_CORRECT_DETAILS",
    appId: "FILL_CORRECT_DETAILS",
    measurementId: "FILL_CORRECT_DETAILS"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});