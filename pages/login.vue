<!-- login.vue -->
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
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const email = ref('');
const password = ref('');
const newPassword = ref('');
const showNewPasswordInput = ref(false);
const buttonLabel = ref('Login');

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;
const cognitoUser = userPool.getCurrentUser();

if (cognitoUser) {
  cognitoUser.getSession(function (err, session) {
    if (err) {
      console.error("Error retrieving session:", err);
      return;
    }

    if (session && session.isValid()) { // Check if user already has a valid session
      console.log("User is logged in.");
      return navigateTo('/login-success');
    } else {
      console.log("Session is not valid or expired.");
      return;
    }
  });
} else {
  console.log("User is not logged in.");
}

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
    onSuccess: function () {
      window.location.href = '/login-success';
    },
    newPasswordRequired: function (userAttributes, requiredAttributes) {
      showNewPasswordInput.value = true;
      buttonLabel.value = 'Reset Password';

      // On initial login, the user must change their password
      cognitoUser.completeNewPasswordChallenge(newPassword.value, {}, {
        onSuccess: function () {
          window.location.href = '/login-success';
        },
        onFailure: function (err) {
          console.log("Error:", err);
        }
      });
    },
    onFailure: function (err) {
      console.log("Error:", err);
    }
  });
};
</script>