import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAN8HhBEIF1YAEC9v2pUgKj6oToHL-5Zow",
  authDomain: "rn-ig-clone-ee5c5.firebaseapp.com",
  projectId: "rn-ig-clone-ee5c5",
  storageBucket: "rn-ig-clone-ee5c5.appspot.com",
  messagingSenderId: "380668812685",
  appId: "1:380668812685:web:f96ebf74954e2da31471c4",
  measurementId: "G-TF0NR3CLS3"
};


!firebase.apps.length ? 
firebase.initializeApp(firebaseConfig) :
firebase.app()


const db = firebase.firestore()


export {firebase, db}
