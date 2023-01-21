<script setup>
import { useAuthStore } from './stores/auth';
import LoginView from './views/LoginView.vue';
const authStore = useAuthStore();
</script>

<template>
  <!-- Show GUI if either, client is authenticated, client doesn't exist (no login attempt), client exists but login attempt failed -->
  <template v-if="authStore.isAuthenticated || authStore.client === null || (authStore.client !== null && authStore.isErrored === true)">
    <template v-if="!authStore.isAuthenticated">
      <LoginView />
    </template>
    <template v-else>
      <RouterView />
    </template>
  </template>
</template>
<style scoped>

</style>
