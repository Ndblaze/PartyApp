var firebaseConfig = {
  apiKey: "AIzaSyA3lhFDnXQFnPfsDkS35NJKe5QQRfKgR-c",
  authDomain: "party-app-94a17.firebaseapp.com",
  projectId: "party-app-94a17",
  storageBucket: "party-app-94a17.appspot.com",
  messagingSenderId: "550793114992",
  appId: "1:550793114992:web:446cd3f0c906a96fda4bb5",
  measurementId: "G-HPMG1NWHS0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//make auth and firestore reffrence

const auth = firebase.auth();
const database = firebase.firestore();
var storage = firebase.storage();

database.settings({timestampsInSnapshots : true});







