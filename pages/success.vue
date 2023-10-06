// ~/pages/success.vue

<template>
  <div>
    <h1>You are logged in</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import userPool from '~/plugins/cognito';

const router = useRouter();

const logout = () => {
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.signOut();
    router.push('/login'); // ログアウト後に遷移するページ
  }
};
</script>
