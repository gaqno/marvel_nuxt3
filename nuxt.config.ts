// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-icon',
    'nuxt-swiper',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
  i18n: {
    locales: ['pt', 'en', 'ch', 'kr'],
    defaultLocale: 'pt',
    vueI18n: './i18n.config.ts'
  },
  googleFonts: {
    download: true,
    families: {
      Poppins: [400, 500, 600, 700]
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: './tailwind.config.js'
    // exposeConfig: false,
    // config: {},
    // injectPosition: 0,
    // viewer: true,
  },
  runtimeConfig: {
    public: {
      MARVEL_API_BASE: process.env.MARVEL_API_BASE,
      MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
      MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY
    }
  }
})
