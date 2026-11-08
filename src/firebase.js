import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBO505u5S1nQCvwifG8fA8DIIwOfRHCV9E",
  authDomain: "consignmentb.firebaseapp.com",
  projectId: "consignmentb",
  storageBucket: "consignmentb.firebasestorage.app",
  messagingSenderId: "343124732900",
  appId: "1:343124732900:web:20cbbe28b9b27c5b4ef5f1",
  measurementId: "G-LCWLNT8ZLN"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB_-TYk179lSgIPfaUVS90gJB67z4S2wu4",
//   authDomain: "globe-cffb0.firebaseapp.com",
//   projectId: "globe-cffb0",
//   storageBucket: "globe-cffb0.appspot.com",
//   messagingSenderId: "1018819464439",
//   appId: "1:1018819464439:web:daef5cd282e3d6e6a997f2",
//   measurementId: "G-LZLED2Y6GK"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDawTmxVKgHG0a7tPgq4PXTk9fdlsyupW8",
//   authDomain: "allendelivery-b0abc.firebaseapp.com",
//   projectId: "allendelivery-b0abc",
//   storageBucket: "allendelivery-b0abc.appspot.com",
//   messagingSenderId: "49913758493",
//   appId: "1:49913758493:web:bccbdb41d84e3a8a1217f4",
//   measurementId: "G-9ZVSW08P69"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyAQsb7_2leIR8osAaqwm0XLmR3_mCxOw78",
//   authDomain: "elvnfruits.firebaseapp.com",
//   projectId: "elvnfruits",
//   storageBucket: "elvnfruits.appspot.com",
//   messagingSenderId: "705686520457",
//   appId: "1:705686520457:web:28f34f954d4c3019063c58",
//   measurementId: "G-29V6XGSEEW"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDPAZ4HZrRf_SngiKKwitD4VM1jQZTLa9Q",
//   authDomain: "bull-lp.firebaseapp.com",
//   projectId: "bull-lp",
//   storageBucket: "bull-lp.firebasestorage.app",
//   messagingSenderId: "214324615506",
//   appId: "1:214324615506:web:2c6dd38d46ba46f52c828b",
//   measurementId: "G-921FBKEKT8"
// };

const app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()

export  const auth = app.auth()

export const storage = getStorage(app)

export const Provider = new firebase.auth.GoogleAuthProvider()
