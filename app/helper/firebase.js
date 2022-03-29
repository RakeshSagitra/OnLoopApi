// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { appConfig } from '../../config/appConfig'

const firebaseConfig = {
  apiKey: appConfig.get('firebase.apiKey'),
  authDomain: appConfig.get('firebase.authDomain'),
  projectId: appConfig.get('firebase.projectId'),
  storageBucket: appConfig.get('firebase.storageBucket'),
  messagingSenderId: appConfig.get('firebase.messagingSenderId'),
  appId: appConfig.get('firebase.appId'),
  measurementId: appConfig.get('firebase.measurementId')
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDb = getFirestore(firebaseApp)
