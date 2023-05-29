const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDc4WLv1FaT9T_pfgB1XBdSYwPdaHvZQwY",
  authDomain: "tasktracker-92597.firebaseapp.com",
  projectId: "tasktracker-92597",
  storageBucket: "tasktracker-92597.appspot.com",
  messagingSenderId: "197044841804",
  appId: "1:197044841804:web:d0b1ecf386a6903dc533e9",
  measurementId: "G-3V1Y47HQNG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = db;


