<!-- login-success.vue -->
<template>
  <div>
    <h1>Login Successfull</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

const logout = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.signOut();
  }
  window.location.href = '/';
};
</script>
