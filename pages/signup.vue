<!-- signup.vue -->
<template>
    <div>
      <h1>Sign Up</h1>
      <input v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="signup">Sign Up</button>
    </div>
    <nuxt-link to="/login">Already have an account?</nuxt-link>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

  const nuxtApp = useNuxtApp();
  const userPool = nuxtApp.$userPool;
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const signup = () => {
    const attributeList = [];
  
    const dataEmail = {
      Name: 'email',
      Value: email.value,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
  
    attributeList.push(attributeEmail);
  
    userPool.signUp(email.value, password.value, attributeList, null, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      const cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());

      router.push({ name: 'signup-confirm', query: { email: email.value } });
    });
  };
  </script>
  