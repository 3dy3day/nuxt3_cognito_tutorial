<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
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

console.log("Hoge",userPool);

const email = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  const authenticationData = {
    Username: email.value,
    Password: password.value
  };

  const userData = {
    Username: email.value,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function() {
      window.location.href = '/login-success';
    },
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      router.push({ name: 'reset-password', query: { email: email.value } });
    },
    onFailure: function(err) {
      console.log("Error:", err);
      alert(err.message || JSON.stringify(err));
    }
  });
};

</script>