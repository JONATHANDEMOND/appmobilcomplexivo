
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAPFJg3bvWstNVeE14HVcuCBOZ_pWFMku0",
  authDomain: "productnatura-53380.firebaseapp.com",
  projectId: "productnatura-53380",
  storageBucket: "productnatura-53380.appspot.com",
  messagingSenderId: "853418362549",
  appId: "1:853418362549:web:506b23f30a35a549aa60fc"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})