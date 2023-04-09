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
    locales: ['pt', 'en', 'cn', 'kr'],
    defaultLocale: 'pt',
    vueI18n: {
      legacy: false,
      locale: 'pt',
      messages: {
        pt: {
          welcome: 'Bem vindo ao MarvelDetails, coletania de personagens, quadrinhos e séries',
          language: 'Idioma',
          spring: 'A primavera há de chegar',
          brazilianPortuguese: 'Português do Brasil',
          english: 'Inglês',
          chinese: 'Chinês',
          hangugeo: 'Coreano',
          lookForCharacters: 'Procure por personagens',
          lookForComics: 'Procure por quadrinhos',
          lookForSeries: 'Procure por séries',
          characters: 'Personagens',
          comics: 'Quadrinhos',
          series: 'Séries',
          favorite: 'Favoritos',
          emptyCharacter: 'Nenhum personagem encontrado',
          emptyComic: 'Nenhum quadrinho encontrado',
          ctrSubtitle: 'Aqui você encontra os personagens da Marvel',
          kindEmpty: 'Meio vázio por aqui...',
          thanksForVisiting: 'Obrigado pela visita!',
          siteBuild: 'Site construído com',
          frameworks: 'Frameworks',
          repository: 'Você encontra o repositório desse projeto aqui!'
        },
        en: {
          welcome: 'Welcome to MarvelDetails, collection of characters, comics and series',
          language: 'Language',
          spring: 'Spring will come',
          brazilianPortuguese: 'Brazilian Portuguese',
          english: 'English',
          chinese: 'Chinese',
          hanguego: 'Korean',
          lookForCharacters: 'Look for characters',
          lookForComics: 'Look for comics',
          lookForSeries: 'Look for series',
          characters: 'Characters',
          comics: 'Comics',
          series: 'Series',
          favorite: 'Favorites',
          emptyCharacter: 'No character found',
          emptyComic: 'No comic found',
          ctrSubtitle: 'Here you find the Marvel characters',
          kindEmpty: 'It\'s a little empty here...',
          thanksForVisiting: 'Thanks for visiting!',
          siteBuild: 'Site built with',
          frameworks: 'Frameworks',
          repository: 'You can find the repository of this project here!'
        },
        cn: {
          welcome: '欢迎来到MarvelDetails，收集人物，漫画和系列',
          language: '语言',
          spring: '春天将会来临',
          brazilianPortuguese: '巴西葡萄牙语',
          english: '英语',
          chinese: '中文',
          hanguego: '韩语',
          lookForCharacters: '寻找人物',
          lookForComics: '寻找漫画',
          lookForSeries: '寻找系列',
          characters: '人物',
          comics: '漫画',
          series: '系列',
          favorite: '最爱',
          emptyCharacter: '没有找到人物',
          emptyComic: '没有找到漫画',
          ctrSubtitle: '在这里你可以找到漫威人物',
          kindEmpty: '这里有点空...',
          thanksForVisiting: '感谢您的访问！',
          siteBuild: '网站建立于',
          frameworks: '框架',
          repository: '您可以在这里找到此项目的存储库！'
        },
        kr: {
          welcome: 'MarvelDetails에 오신 것을 환영합니다. 캐릭터, 만화 및 시리즈 모음',
          language: '언어',
          spring: '봄이 오리라',
          brazilianPortuguese: '브라질 포르투갈어',
          english: '영어',
          chinese: '중국어',
          hanguego: '한국어',
          lookForCharacters: '캐릭터를 찾아보세요',
          lookForComics: '만화를 찾아보세요',
          lookForSeries: '시리즈를 찾아보세요',
          characters: '캐릭터',
          comics: '만화',
          series: '시리즈',
          favorite: '즐겨찾기',
          emptyCharacter: '캐릭터를 찾을 수 없습니다',
          emptyComic: '만화를 찾을 수 없습니다',
          ctrSubtitle: '여기에서 마블 캐릭터를 찾을 수 있습니다',
          kindEmpty: '여기가 좀 비었습니다...',
          thanksForVisiting: '방문해 주셔서 감사합니다!',
          siteBuild: '사이트는 다음과 같이 구축되었습니다',
          frameworks: '프레임워크',
          repository: '이 프로젝트의 저장소를 여기에서 찾을 수 있습니다!'
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
