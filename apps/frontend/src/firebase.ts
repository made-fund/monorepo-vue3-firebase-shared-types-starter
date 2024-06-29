import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDXPT_zdX4qgVrAVo2DkO2FHOskg5pGki0',
  authDomain: 'translator-chat-mvp.firebaseapp.com',
  projectId: 'translator-chat-mvp',
  storageBucket: 'translator-chat-mvp.appspot.com',
  messagingSenderId: '223512001613',
  appId: '1:223512001613:web:8bbb7e1be7bba8f1f0b004',
}

const app = initializeApp(firebaseConfig)

const functions = getFunctions(app)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001)
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}

export { functions, db, auth, storage }
