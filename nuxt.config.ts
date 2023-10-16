// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from '#app'
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    define: {
      'window.global': {},
    },
  },
  runtimeConfig: {
    public: {
      userPoolId: '',
      clientId: '',
    }
  },
});
