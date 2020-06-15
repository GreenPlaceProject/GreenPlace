import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAv_w9kysn_ejoDV40KtsE2TRi7zrfvQcs',
  authDomain: 'greenplace-2345b.firebaseapp.com',
  databaseURL: 'https://greenplace-2345b.firebaseio.com',
  projectId: 'greenplace-2345b',
  storageBucket: 'greenplace-2345b.appspot.com',
  messagingSenderId: '564327263815',
  appId: '1:564327263815:web:0468aadd5b6b65c78c0b62',
  measurementId: 'G-PTM2V5LQR8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();


export default firebase;
