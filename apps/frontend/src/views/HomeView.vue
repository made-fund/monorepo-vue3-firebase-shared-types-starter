<template>
  <main>
    <h1>Hello from the frontend</h1>

    <br />
    <br />

    <button @click="useUser().logout()">logout</button>
  </main>
</template>

<script setup lang="ts">
import { useUser } from '@/stores/user.store'
</script>
