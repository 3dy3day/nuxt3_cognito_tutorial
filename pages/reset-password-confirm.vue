<!-- reset-password-confirm.vue -->
<template>
    <div>
      <h1>Confirm Reset Password</h1>
      <input v-model="email" placeholder="Email" disabled />
      <input v-model="code" placeholder="Verification Code" />
      <input v-model="newPassword" type="password" placeholder="New Password" />
      <button @click="confirmReset">Confirm Reset</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { CognitoUser } from 'amazon-cognito-identity-js';
  
  const nuxtApp = useNuxtApp();
  const userPool = nuxtApp.$userPool;
  
  const email = ref('');
  const code = ref('');
  const newPassword = ref('');
  const router = useRouter();
  const route = useRoute();
  
  onMounted(() => {
    email.value = route.query.email;
  });
  
  const confirmReset = () => {
    const userData = {
      Username: email.value,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
  
    cognitoUser.confirmPassword(code.value, newPassword.value, {
      onSuccess: () => {
        alert('Password reset successfully!');
        router.push('/login');
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
        console.log('Error:', err);
      },
    });
  };
  </script>
  