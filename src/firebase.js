import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyD9RwAzv9qEL8TyE_yRc5l0tCaUPGXcw54",
    authDomain: "scratch-387f9.firebaseapp.com",
    projectId: "scratch-387f9",
    storageBucket: "scratch-387f9.appspot.com",
    messagingSenderId: "52308137995",
    appId: "1:52308137995:web:b5af59330101748cd74f0e"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth, provider, storage};
  export default db;
  