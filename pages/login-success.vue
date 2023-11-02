<!-- login-success.vue -->
<template>
  <div>
    <h1>Login Successful</h1>
    <button @click="logout">Logout</button>
    <button @click="checkSession">Check Your Session</button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

const logout = async () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.signOut(); // Discard the auth token
  }
  window.location.href = '/';
};

const checkSession = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.error('Error retrieving session:', err);
        return;
      }
      
      if (session.isValid()) {
        const payload = JSON.parse(atob(session.getIdToken().jwtToken.split('.')[1])); // Decode the ID token payload
        console.log('ID token payload:', payload);

        const expirationTime = new Date(session.getIdToken().getExpiration() * 1000); // Convert to milliseconds
        const currentTime = new Date();
        const timeLeft = expirationTime - currentTime;
        const minutesLeft = Math.floor(timeLeft / (1000 * 60));

        console.log(`Session is valid. It will expire in ${minutesLeft} minutes.`);
      } else {
        console.log('Session is not valid.');
      }
    });
  } else {
    console.log("User doesn't have a valid session");
  }
};
</script>
