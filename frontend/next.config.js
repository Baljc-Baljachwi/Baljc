/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const BASE_URL = process.env.BASE_URL;
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  env: {
    BASE_URL,
    KAKAO_CLIENT_ID,
    KAKAO_REDIRECT_URI,
  },
  images: {
    domains: ["baljc.s3.ap-northeast-2.amazonaws.com", "drf5juj9r1n4w.cloudfront.net"],
  },
});
