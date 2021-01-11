var firebaseConfig = {
  apiKey: "AIzaSyAqbRxijbFSDnhBYGA2zPW1Epj1-wI3_3g",
  authDomain: "abujahouseparty-dc983.firebaseapp.com",
  projectId: "abujahouseparty-dc983",
  storageBucket: "abujahouseparty-dc983.appspot.com",
  messagingSenderId: "290955656117",
  appId: "1:290955656117:web:ddd2cad95977024f36f7fc",
  measurementId: "G-BRV2NH2Y7T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//make auth and firestore reffrence

const auth = firebase.auth();
const database = firebase.firestore();
var storage = firebase.storage();

database.settings({timestampsInSnapshots : true});







