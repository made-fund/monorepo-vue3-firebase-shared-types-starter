import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { DocumentReference, addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { useRouter } from 'vue-router'
import router from '@/router'
import { useChats } from '@/stores/chats.store'
import type { User } from '@shared/types'

export const useUser = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
    userId: '',
    isManualLogin: false, // did not login automatically via cache but via login screen - during this session - ❓ find example in the loginUserWithEmailAndPassword function down below
  }),

  getters: {
    isAuthenticated(state) {
      return Boolean(state.userId)
    },
    hasCompletedOnboarding(state) {
      // could be handy for route-guards if your want to block a certain area if the user hasn't onboarded yet
      // this can easily be done by checking specific fields on the user object
    },
  },

  actions: {
    async initialize() {
      return this.startOnAuthStateListener()
    },

    async startOnAuthStateListener() {
      try {
        return new Promise((resolve, reject) => {
          onAuthStateChanged(
            auth,
            async (user) => {
              if (user) {
                this.userId = user.uid
                this.isManualLogin ? (this.isManualLogin = false) : await this.handleUserLoggedIn()
              } else this.handleNoUserLoggedIn()

              resolve(user)
            },
            reject
          )
        })
      } catch (error) {
        console.error(error)
      }
    },

    async handleUserLoggedIn() {
      if (!this.userId) return
      console.log('user is logged in')

      await this.getUserData()
      this.updateLastActive()

      /**
       * ❓ start any snapshot listeners for (user-related) data here
       */
      // await useChats().startChatSnapshot()
      // await useDailyLogs().startSnapshotForTodaysDailyLog()
    },

    async handleNoUserLoggedIn() {
      console.log('not logged in')

      // reset current store
      this.$reset()

      /**
       * ❓ And make sure to reset any other data / stores that were dependant on being logged in
       */
      // useDashboard().$reset()
      // useDailyLogs().$reset()
      // useOnboarding().$reset()
    },

    async getUserData() {
      const docRef = doc(db, 'users', this.userId)

      return new Promise((resolve, reject) => {
        onSnapshot(docRef, (doc) => {
          if (!doc.exists()) return reject()

          this.user = { id: doc.id, ...doc.data() } as User
          resolve(this.user)
        })
      })
    },

    updateLastActive() {
      const userDocRef = doc(db, 'users', this.userId)
      updateFirestoreDoc(userDocRef, { 'metadata.lastActive': Date.now() })
    },

    async loginWithEmailAndPassword(email: string, password: string) {
      try {
        /**
         * ❓ this.isManualLogin = true?
         * This is done so that the onAuthStateChange listener doesn't also trigger the handleUserLoggedIn.
         * We want to trigger handleUserLoggedIn here so that we can await it in the place where we do it.
         */
        this.isManualLogin = true
        await signInWithEmailAndPassword(auth, email, password)
        await this.handleUserLoggedIn()
      } catch (error) {
        handleFirebaseError(error)
      }
    },

    async logout() {
      try {
        if (!confirm('Are you sure you want to log out?')) return
        await signOut(auth)
        router.push('/')
        this.$reset()
      } catch (error) {
        handleFirebaseError(error)
      }
    },

    async createUserWithEmailAndPassword(email: string, password: string) {
      try {
        this.isManualLogin = true // ❓ See handleLoginWithEmailAndPassword for explanation
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await this.createInitialUserDocument(user)
        await this.handleUserLoggedIn()
      } catch (error) {
        handleFirebaseError(error)
      }
    },

    async createInitialUserDocument(user: any) {
      try {
        const userDocRef = doc(db, 'users', user.uid)
        const snapshot = await getDoc(userDocRef)

        if (snapshot.exists()) return

        await setDoc(userDocRef, {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          provider: user.providerData[0]?.providerId,
          photoUrl: user.photoURL,
          metadata: {
            createdAt: Date.now(),
            lastActive: Date.now(),
          },
        })
      } catch (error) {
        handleFirebaseError(error)
      }
    },

    async resetPassword(email: string) {
      try {
        await sendPasswordResetEmail(auth, email)
      } catch (error) {
        handleFirebaseError(error)
      }
    },

    /**
     * ❓ Example functions
     */
    // async updateDailyGoals(newGoals: DailyGoals) {
    //   if (!this.userId) return
    //   const userDocRef = doc(db, 'users', this.userId)
    //   const updatePayload = { dailyGoals: newGoals, 'metadata.updatedAt': Date.now() }
    //   await updateFirestoreDoc(userDocRef, updatePayload)
    // },

    // async updateUserData(newData: Record<string, any>) {
    //   if (!this.userId) return
    //   const userDocRef = doc(db, 'users', this.userId)
    //   updateFirestoreDoc(userDocRef, newData)
    // },
  },
})

function handleFirebaseError(error: any): void {
  console.error('Firebase error:', error)
  throw new Error(error)
}

async function updateFirestoreDoc(ref: DocumentReference, data: Record<string, any>): Promise<void> {
  try {
    await updateDoc(ref, data)
  } catch (error) {
    handleFirebaseError(error)
  }
}
