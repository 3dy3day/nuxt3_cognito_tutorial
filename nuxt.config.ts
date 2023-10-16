// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from '#app'
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: ['~/plugins/cognito.ts'],
  vite: {
    define: {
      'window.global': {},
    },
  },
});
