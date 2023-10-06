// ~/pages/forgot-password.vue

<template>
  <div>
    <h1>Forgot Password</h1>
    <input v-model="username" placeholder="Username" />
    <button @click="forgotPassword">Submit</button>
    <p v-if="error">{{ error }}</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from '#app';
import { useRouter } from 'vue-router';
import userPool from '~/plugins/cognito';
import { CognitoUser } from 'amazon-cognito-identity-js';

const router = useRouter();
const username = ref('');
const error = ref('');
const message = ref('');

const forgotPassword = () => {
  const userData = {
    Username: username.value,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.forgotPassword({
    onSuccess: () => {
      message.value = 'Password reset successful. Please check your email for further instructions.';
      setTimeout(() => {
        router.push('/login'); // 一定時間後にログインページに遷移
      }, 3000);
    },
    onFailure: (err) => {
      error.value = err.message; // エラーメッセージを表示
    },
  });
};
</script>
