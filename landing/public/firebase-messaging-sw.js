importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAeqGoiBaRdhGeL7GstkELh1ntZBk_4ibo",
  authDomain: "baljc-145fa.firebaseapp.com",
  projectId: "baljc-145fa",
  storageBucket: "baljc-145fa.appspot.com",
  messagingSenderId: "258061494591",
  appId: "1:258061494591:web:f55a50774769fcc2db0b8a",
  measurementId: "G-25L7RC561S",
};

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message! ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "백그라운드 메시지 타이틀";
//   const notificationOptions = {
//     body: "백그라운드 메시지 바디",
//     icon: "/icons/192x192.png",
//     badge: "/icons/android-icon-96x96.png",
//   };
//   console.log(notificationTitle);
//   console.log(notificationOptions);

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
