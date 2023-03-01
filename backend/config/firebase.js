const { initializeApp } = require("firebase/app");
// const firebaseConfig = {
//   apiKey: "AIzaSyAk4qHvsek3gMw7nxopRREsNQf0X1m9Dbg",
//   authDomain: "sonabyss-48665.firebaseapp.com",
//   projectId: "sonabyss-48665",
//   storageBucket: "sonabyss-48665.appspot.com",
//   messagingSenderId: "861460162966",
//   appId: "1:861460162966:web:1471f632c6d25955a6d5b7",
//   measurementId: "G-X970LKE227",
// };
const firebaseConfig = {
  apiKey: "AIzaSyA3pTgPA0KLM3md84DV6sfInQtUGGUdqDI",
  authDomain: "music-app-66879.firebaseapp.com",
  projectId: "music-app-66879",
  storageBucket: "music-app-66879.appspot.com",
  messagingSenderId: "386510440479",
  appId: "1:386510440479:web:c67b0d81234b7992662d2a",
  measurementId: "G-CR4LQ2KJ6C",
};
const app = initializeApp(firebaseConfig);

module.exports = app;
