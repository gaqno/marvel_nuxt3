// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-icon',
    'nuxt-swiper',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@nuxtjs/google-adsense',
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
  'google-adsense': {
    onPageLoad: false,
    pageLevelAds: false
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
      'google-adsense': {
        id: process.env.GOOGLE_ADSENSE_ID,
        test: process.env.GOOGLE_ADSENSE_TEST_MODE === 'true'
      },
      MARVEL_API_BASE: process.env.MARVEL_API_BASE,
      MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
      MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY
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
          charactersDescription: 'Pesquise por personagens da Marvel e veja mais informações sobre eles, utilize o campo de busca para encontrar o personagem desejado. Você pode adicionar os personagens aos seus favoritos clicando no botão de coração.',
          series: 'Séries',
          seriesDescription: 'Pesquise por séries da Marvel e veja mais informações sobre elas, utilize o campo de busca para encontrar a série desejada. Você pode adicionar as séries aos seus favoritos clicando no botão de coração.',
          comics: 'Quadrinhos',
          comicsDescription: 'Pesquise por quadrinhos da Marvel e veja mais informações sobre eles, utilize o campo de busca para encontrar o quadrinho desejado. Você pode adicionar os quadrinhos aos seus favoritos clicando no botão de coração.',
          favorite: 'Favoritos',
          favorited: 'Favoritar',
          dontHaveFavorites: 'Você não tem favoritos',
          desfavorited: 'Desfavoritar',
          filter: 'Filtrar por',
          alphabetic: 'Ordenar por ordem alfabética, A-z',
          alphabeticReverse: 'Ordenar por ordem alfabética, Z-A',
          seeAbout: 'Veja mais',
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
          charactersDescription: 'Search for Marvel characters and see more information about them, use the search field to find the desired character. You can add the characters to your favorites by clicking on the heart button.',
          series: 'Series',
          seriesDescription: 'Search for Marvel series and see more information about them, use the search field to find the desired series. You can add the series to your favorites by clicking on the heart button.',
          comics: 'Comics',
          comicsDescription: 'Search for Marvel comics and see more information about them, use the search field to find the desired comic. You can add the comics to your favorites by clicking on the heart button.',
          favorite: 'Favorites',
          favorited: 'Favorite',
          dontHaveFavorites: 'You don\'t have favorites',
          desfavorited: 'Desfavorite',
          filter: 'Filter by',
          alphabetic: 'Sort alphabetically, A-Z',
          alphabeticReverse: 'Sort alphabetically, Z-A',
          seeAbout: 'See more',
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
          charactersDescription: '搜索漫威人物并查看有关他们的更多信息，使用搜索字段查找所需的人物。您可以通过单击心形按钮将人物添加到收藏夹中。',
          series: '系列',
          seriesDescription: '搜索漫威系列并查看有关它们的更多信息，使用搜索字段查找所需的系列。您可以通过单击心形按钮将系列添加到收藏夹中。',
          comics: '漫画',
          comicsDescription: '搜索漫威漫画并查看有关它们的更多信息，使用搜索字段查找所需的漫画。您可以通过单击心形按钮将漫画添加到收藏夹中。',
          favorite: '最爱',
          favorited: '最爱',
          dontHaveFavorites: '你没有最爱',
          desfavorited: '不喜欢',
          filter: '按...过滤',
          alphabetic: '按字母顺序排序，A-Z',
          alphabeticReverse: '按字母顺序排序，Z-A',
          seeAbout: '查看更多',
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
          charactersDescription: '마블 캐릭터를 검색하고 그에 대한 자세한 정보를 확인하려면 원하는 캐릭터를 찾으려면 검색 필드를 사용하십시오. 하트 버튼을 클릭하여 캐릭터를 즐겨찾기에 추가할 수 있습니다.',
          series: '시리즈',
          seriesDescription: '마블 시리즈를 검색하고 그에 대한 자세한 정보를 확인하려면 원하는 시리즈를 찾으려면 검색 필드를 사용하십시오. 하트 버튼을 클릭하여 시리즈를 즐겨찾기에 추가할 수 있습니다.',
          comics: '만화',
          comicsDescription: '마블 만화를 검색하고 그에 대한 자세한 정보를 확인하려면 원하는 만화를 찾으려면 검색 필드를 사용하십시오. 하트 버튼을 클릭하여 만화를 즐겨찾기에 추가할 수 있습니다.',
          favorite: '즐겨찾기',
          favorited: '즐겨찾기',
          dontHaveFavorites: '즐겨찾기가 없습니다',
          desfavorited: '즐겨찾기 해제',
          filter: '필터링 기준',
          alphabetic: '알파벳 순으로 정렬, A-Z',
          alphabeticReverse: '알파벳 순으로 정렬, Z-A',
          seeAbout: '자세히 보기',
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
  }
})
