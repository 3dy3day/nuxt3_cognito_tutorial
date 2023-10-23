<template>
  <div>
    <h1>Login</h1>
    <p v-if="showNewPasswordInput" style="color: red;">You need to change your password for the first-time login.</p>
    <input v-model="email" placeholder="Email" />
    <input v-if="!showNewPasswordInput" type="password" v-model="password" placeholder="Password" />
    <input v-if="showNewPasswordInput" type="password" v-model="newPassword" placeholder="New Password" />
    <button @click="login">{{ buttonLabel }}</button>
  </div>
  <nuxt-link to="/signup">Sign Up Here</nuxt-link><br>
  <nuxt-link to="/reset-password">Forgot Password?</nuxt-link>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

const email = ref('');
const password = ref('');
const newPassword = ref('');
const showNewPasswordInput = ref(false);
const buttonLabel = ref('Login');
const router = useRouter();

const login = () => {
  const authenticationData = {
    Username: email.value,
    Password: password.value
  };

  const userData = {
    Username: email.value,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  cognitoUser.authenticateUser(authenticationDetails, {
    // 成功時の処理
    onSuccess: function() {
      window.location.href = '/login-success';
    },
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      showNewPasswordInput.value = true;
      buttonLabel.value = 'Reset Password';
      
      // 新しいパスワードを設定する処理
      cognitoUser.completeNewPasswordChallenge(newPassword.value, {}, {
        onSuccess: function() {
          window.location.href = '/login-success';
        },
        onFailure: function(err) {
          console.log("Error:", err);
        }
      });
    },
    // 失敗時の処理
    onFailure: function(err) {
      console.log("Error:", err);
    }
  });
};
</script>
