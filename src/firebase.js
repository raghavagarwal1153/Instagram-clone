import firebase from 'firebase'

const firebaseConfig = firebase.initializeApp({
  
    apiKey: "AIzaSyAA2hUBOP3SvRFDBfoysR6X0ph_Uxh8_h0",
    authDomain: "netflix-clone-a32b6.firebaseapp.com",
    projectId: "netflix-clone-a32b6",
    storageBucket: "netflix-clone-a32b6.appspot.com",
    messagingSenderId: "494924277241",
    appId: "1:494924277241:web:193a56c037c487cf9bc928",
    measurementId: "G-HSJK7FDENN"
  });
  const db=firebaseConfig.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage()
  export {db,auth,storage}
