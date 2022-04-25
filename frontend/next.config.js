/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    optimizeFonts: false,
  },
  env: {
    KAKAO_CLIENT_ID,
    KAKAO_REDIRECT_URI,
  },
});
