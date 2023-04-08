// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-icon',
    'nuxt-swiper',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
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
          welcome: 'Bem vindo ao MarvelDetails, coletania de personagens, quadrinhos e séries',
          lookForCharacters: 'Procure por personagens',
          lookForComics: 'Procure por quadrinhos',
          characters: 'Personagens',
          comics: 'Quadrinhos',
          series: 'Séries',
          favorite: 'Favoritos',
          emptyCharacter: 'Nenhum personagem encontrado',
          emptyComic: 'Nenhum quadrinho encontrado',
          ctrSubtitle: 'Aqui você encontra os personagens da Marvel',
          kindEmpty: 'Meio vázio por aqui...'
        },
        en: {
          welcome: 'Welcome to MarvelDetails, collection of characters, comics and series',
          lookForCharacters: 'Look for characters',
          lookForComics: 'Look for comics',
          characters: 'Characters',
          comics: 'Comics',
          series: 'Series',
          favorite: 'Favorites',
          emptyCharacter: 'No character found',
          emptyComic: 'No comic found',
          ctrSubtitle: 'Here you find the Marvel characters',
          kindEmpty: 'It\'s a little empty here...'
        }
      }
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config'
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
