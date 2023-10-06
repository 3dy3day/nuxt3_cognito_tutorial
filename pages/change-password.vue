// ~/pages/change-password.vue

<template>
  <div>
    <h1>Change Password</h1>
    <input type="password" v-model="newPassword" placeholder="New Password" />
    <button @click="changePassword">Change Password</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, useRoute } from '#app';
import { useRouter } from 'vue-router';
import userPool from '~/plugins/cognito';
import { CognitoUser } from 'amazon-cognito-identity-js';

const route = useRoute();
const router = useRouter();
const username = ref(route.query.username);
const newPassword = ref('');
const error = ref('');

const changePassword = () => {
  if (username.value) {
    const userData = {
      Username: username.value,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.completeNewPasswordChallenge(newPassword.value, [], {
      onSuccess: () => {
        router.push('/success'); // パスワード変更成功後、ログイン成功ページへ遷移
      },
      onFailure: (err) => {
        error.value = err.message; // エラーメッセージを表示
      },
    });
  }
};
</script>
