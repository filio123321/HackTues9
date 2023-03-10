import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // add this import
import { getFirestore } from "firebase/firestore";
import "firebase/compat/database"; // add this import


const firebaseConfig = {
    apiKey: "AIzaSyAEBHSpXwxetsrWwN5twmmHRn-WCQg0MxQ",
    authDomain: "backsmart-5f443.firebaseapp.com",
    projectId: "backsmart-5f443",
    storageBucket: "backsmart-5f443.appspot.com",
    messagingSenderId: "889096787044",
    appId: "1:889096787044:web:38b15fc210efbbfbad7b71",
    measurementId: "G-ZK3G6G8NM0",
    // database is in frakfrurt
    databaseURL: "https://backsmart-5f443-default-rtdb.europe-west1.firebasedatabase.app/",
  };

let app = {};
!firebase.apps.length
  ? (app = firebase.initializeApp(firebaseConfig))
  : (app = firebase.app());


const auth = firebase.auth(app);




const currentUser = auth.currentUser;

// if (currentUser) {
//   auth.signOut().then(() => {
//     console.log('User signed out!');
//   });
  
// } else {
//   console.log('No user is currently signed in.');
// }

const database = firebase.database();




export { auth, database };