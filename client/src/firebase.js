import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyD7K93undNv0gM30hidkFrtkcpNFzJAOFk",
    authDomain: "sendmessage-5c0bd.firebaseapp.com",
    projectId: "sendmessage-5c0bd", 
    storageBucket: "sendmessage-5c0bd.appspot.com",
    messagingSenderId: "473362941927",
    appId: "1:473362941927:web:6f44368dd3852642119f42"
}

firebase.initializeApp(config)

export default firebase