// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@vueuse/nuxt',
    'nuxt-swiper'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  googleFonts: {
    download: true,
    families: {
      Poppins: [400, 500, 600, 700]
    }
  },
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    vueI18n: {
      legacy: false,
      locale: 'pt',
      messages: {
        pt: {
          welcome: 'Bem vindo!',
          lookForCharacters: 'Procure por personagens',
          empty: 'Nenhum personagem encontrado',
          ctrSubtitle: 'Aqui você encontra os personagens da Marvel',
        },
        en: {
          welcome: 'Welcome!',
          lookForCharacters: 'Look for characters',
          empty: 'No characters found',
          ctrSubtitle: 'Here you find the Marvel characters',
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      MARVEL_API_BASE: process.env.MARVEL_API_BASE,
      MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
      MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY
    }
  },
})
