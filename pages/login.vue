// ~/pages/login.vue

<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="goToForgotPassword">Forgot Password?</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from '#app';
import { useRouter } from 'vue-router';
import userPool from '~/plugins/cognito';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const username = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();

const login = () => {
  const authenticationData = {
    Username: username.value,
    Password: password.value,
  };

  const userData = {
    Username: username.value,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      router.push('/success');
    },
    newPasswordRequired: () => {
      router.push({ name: 'change-password', query: { username: username.value } });
    },
    onFailure: (err) => {
      error.value = err.message;
    },
  });
};


const goToForgotPassword = () => {
  router.push('/forgot-password');
};
</script>
