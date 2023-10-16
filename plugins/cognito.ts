// plugins/cognito.ts

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { defineNuxtPlugin } from '#app';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineNuxtPlugin((nuxtApp) => {
  const poolData = {
    UserPoolId: process.env.USER_POOL_ID || '',
    ClientId: process.env.CLIENT_ID || '',
  };
  const userPool = new CognitoUserPool(poolData);
  nuxtApp.provide('userPool', userPool);
});
