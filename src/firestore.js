import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBU75aO53hWp90Zlq54hFK5Yp2pRhJDVwY",
    authDomain: "test-ac91e.firebaseapp.com",
    databaseURL: "https://test-ac91e.firebaseio.com",
    projectId: "test-ac91e",
    storageBucket: "test-ac91e.appspot.com",
    messagingSenderId: "590380826512",
    appId: "1:590380826512:web:d13dd90ee42a105d77bd15",
    measurementId: "G-5D9QRC9HV6"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export const addStuff = (stuff) => {
    return db.collection('stuff').doc(getRandomInt(100).toString()).set({
        moreStuff: stuff
    })
}