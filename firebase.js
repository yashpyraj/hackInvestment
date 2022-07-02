// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBy-NFSr_7WrtipLhQdvOxT-NjV9HigR3Q",
    authDomain: "hackathon-78748.firebaseapp.com",
    projectId: "hackathon-78748",
    storageBucket: "hackathon-78748.appspot.com",
    messagingSenderId: "288512005242",
    appId: "1:288512005242:web:ea61d34587eafd814a57c3"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };