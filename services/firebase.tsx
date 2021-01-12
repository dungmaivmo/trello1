import firebase from 'firebase';

// Configure Firebase.
const config:any = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

export default function initFirebase(){
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
}