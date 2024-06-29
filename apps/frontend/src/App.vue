<template>
  <!-- <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header> -->

  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { httpsCallable } from '@firebase/functions'
import { functions } from '@/firebase'

/**
 * ❓
 * Enable this to test if the frontend can connect to the backend via emulators during development
 * Safe to delete afterwards
 */
const callableFunction = httpsCallable(functions, 'helloWorld')
const test = async () => {
  const result = await callableFunction({ test: true })
  console.log(result.data)
}
test()
</script>

<style lang="scss">
.firebase-emulator-warning {
  display: none;
}
</style>
