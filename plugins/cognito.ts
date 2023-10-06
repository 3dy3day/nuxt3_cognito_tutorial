// plugins/cognito.ts

import { defineNuxtPlugin } from '#app';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

export default defineNuxtPlugin((nuxtApp) => {
  const poolData = {
    UserPoolId: 'ap-northeast-1_ct77qUvIJ',
    ClientId: '7tp8r78u6jca40ut4tk6lgbpp6',
  };
  const userPool = new CognitoUserPool(poolData);
  nuxtApp.provide('userPool', userPool);
});