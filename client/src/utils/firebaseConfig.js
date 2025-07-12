import { initializeApp } from "firebase/app";
import {getMessaging,getToken} from "firebase/messaging"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfig;


const vapidKey = import.meta.env.VAPID_KEY;

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);


export const requestFCMToken = async()=>{
    return Notification.requestPermission()
    .then((permission)=>{
        if(permission === "granted"){
            return getToken(messaging,{vapidKey})
        }else{
            alert("Permission Not granted ")
        }
    }).catch((err)=>{
        console.log("Error getting FCM Token",err);
        
    })
}