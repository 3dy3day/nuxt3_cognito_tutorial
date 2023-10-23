// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from '#app'
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    define: {
      'window.global': {}, // In SSR, window is not defined. This is a workaround.
    },
  },
  runtimeConfig: {
    public: {
      userPoolId: '',
      clientId: '',
    }
  },
});
