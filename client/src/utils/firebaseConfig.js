import { initializeApp } from "firebase/app";
import {getMessaging,getToken} from "firebase/messaging"


const firebaseConfig = {
  apiKey: "AIzaSyCtGocvbP6NMxTT8LK5VJFAJaZXD0PLsFk",
  authDomain: "nirogcare-in.firebaseapp.com",
  projectId: "nirogcare-in",
  storageBucket: "nirogcare-in.firebasestorage.app",
  messagingSenderId: "1039659631079",
  appId: "1:1039659631079:web:590680cbc51d97b00e3d42",
  measurementId: "G-SEZFH495VL"
};

const vapidKey = "BM9_Jjx1yPWPzhnaQDtmTwnArR4anc4TFXRsxVkrdjkvZkjAtOkXL_WB-cXTNclZYxeFdpEjej4CbBIO7MhGqWA"

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
