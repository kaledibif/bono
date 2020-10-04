import * as firebase from 'firebase';
import firebaseConfig from '../../../firebaseConfig'

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
// import "firebase/functions";
// import "firebase/storage";

// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };