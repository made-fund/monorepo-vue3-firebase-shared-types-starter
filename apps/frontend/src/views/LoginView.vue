<template>
  <form @submit.prevent="login" class="login-wrapper grainy">
    <h1>Log in</h1>
    <input type="email" v-model="email" autocomplete="username" placeholder="email" />
    <input type="password" v-model="password" autocomplete="current-password" placeholder="password" />
    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
    <button type="submit">Sign in</button>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { ref } from 'vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const login = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    if (!email.value || !password.value) throw { code: 'user/missing-fields' }

    await signInWithEmailAndPassword(auth, email.value, password.value)

    router.push('/')
  } catch (error) {
    const err = error as { code: string; message?: string }

    console.log(err.code)

    if (err.code === 'user/missing-fields') errorMessage.value = 'Fill in all fields'
    if (err.code === 'auth/invalid-email') errorMessage.value = 'Invalid email adress'
    if (err.code === 'auth/invalid-credential') errorMessage.value = "We can't find an account with this email/password combination"
    if (err.code === 'auth/user-not-found') errorMessage.value = "This account doesn't exist"
    if (err.code === 'auth/wrong-password') errorMessage.value = "This email/password combination doesn't exist"
    if (err.code === 'auth/user-disabled') errorMessage.value = 'This account is disabled'

    if (!errorMessage.value) errorMessage.value = 'Something went wrong. Try again later, or contact support via support@workdays.app'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  background-color: grey;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: 400px;
  height: fit-content;
  border-radius: 16px;

  h1 {
    width: 100%;
  }
}
</style>
