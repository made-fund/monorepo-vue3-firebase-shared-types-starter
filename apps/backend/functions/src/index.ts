/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { onCall } from 'firebase-functions/v2/https'
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore'

/**
 * ❓ This gets tested in the app.vue of the frontend file and serves as proof of a succesful installation of this repo
 */
export const helloWorld = onCall((request) => {
  console.log(request.data) // is what is sent trough from the frontend

  return {
    message: 'Hello from the backend!',
  }
})

/**
 * ❓ Example functions triggered on document create & upate
 */
export const onNewChatCreated = onDocumentCreated('chats/{docId}', (event) => {
  console.log(event.data?.data())
})

export const onChatUpdated = onDocumentUpdated('chats/{docId}', (event) => {
  console.log(event.data?.after.data())
})
