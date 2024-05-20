// src/config/firebase.js

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBrWRdbNL0aI3J3CgmdBejuT_zXG2ZWHk",
  authDomain: "todoapp-a5d99.firebaseapp.com",
  projectId: "todoapp-a5d99",
  storageBucket: "todoapp-a5d99.appspot.com",
  messagingSenderId: "96912910192",
  appId: "1:96912910192:ios:d0aef9b14e80c7288611b5",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

