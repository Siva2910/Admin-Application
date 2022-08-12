import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCs1BNN01q-xr_MgOWtdQHoTHCaX4OnxQM",
  authDomain: "covid-vaccination-37430.firebaseapp.com",
  projectId: "covid-vaccination-37430",
  storageBucket: "covid-vaccination-37430.appspot.com",
  messagingSenderId: "112169236131",
  appId: "1:112169236131:web:040cce341605d81ba8f116"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

export default firebase;