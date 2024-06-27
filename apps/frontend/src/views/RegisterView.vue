<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="email" v-model="email" autocomplete="email" placeholder="email" />
      <input type="password" v-model="password" autocomplete="new-password" placeholder="password" />
      <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
      <button type="submit" :disabled="isLoading">Create account</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user.store'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { ref } from 'vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const register = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    if (!email.value || !password.value) throw { code: 'user/missing-fields' }

    await useUser().createUserWithEmailAndPassword(email.value, password.value)

    router.push('/')
  } catch (error) {
    const err = error as { code: string; message?: string }

    if (err.code === 'user/missing-fields') errorMessage.value = 'Fill in all fields'
    if (err.code === 'auth/invalid-email') errorMessage.value = 'Invalid email adress'
    if (err.code === 'auth/email-already-in-use') errorMessage.value = 'An account with this email already exists'
    if (err.code === 'auth/operation-not-allowed') errorMessage.value = 'This sign in method is not allowed. Please contact support via support@workdays.app'
    if (err.code === 'auth/weak-password') errorMessage.value = 'Password should be at least 6 characters long'

    if (!errorMessage.value) errorMessage.value = 'Something went wrong. Try again later, or contact support via support@workdays.app'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
form {
  background-color: orange;
}
</style>
