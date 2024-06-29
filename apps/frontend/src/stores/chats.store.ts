import { defineStore } from 'pinia'
import { auth, db } from '@/firebase'
import { useUser } from './user.store'
import { collection, doc, getDocs, limit, onSnapshot, query, where } from 'firebase/firestore'
import { testing } from '@shared/types'

/**
 * ❓ This file serves as an example.
 * Some parts are underdeveloped and should only be seen as examples
 */

export const useChats = defineStore('chats', {
  state: () => ({
    chat: null as any | null,
  }),

  getters: {},

  actions: {
    async startChatSnapshot() {
      if (!auth.currentUser) return
      return new Promise((resolve, reject) => {
        onSnapshot(doc(db, 'chats/kDs2DFb9FJ1HHWNxb5wh'), (snapshot) => {
          console.log(snapshot.data())
          this.chat = snapshot.data()

          // this.today = { id: snapshot.docs[0]?.id, ...snapshot.docs[0]?.data() } as DailyLog

          if (!snapshot.exists) return resolve(null)
          resolve(snapshot.data())
        })
      })
    },

    /**
     * ❓ Example code for querying specific documents from a collection that are owned by the current user
     */

    // async getAllDailyLogs() {
    //   if (!auth.currentUser) return
    //   const queryForAllDailyLogs = query(collection(db, 'dailyLogs'), where('userId', '==', auth.currentUser?.uid), limit(7))
    //   const result = await getDocs(queryForAllDailyLogs)
    //   if (result.empty) return
    //   this.dailyLogs = result.docs.map((doc) => {
    //     return { id: doc.id, ...doc.data() } as DailyLog
    //   })
    // },
  },
})
