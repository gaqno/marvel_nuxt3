export interface App {
  translate: {},
  theme: 'light' | 'dark',
  darkMode: boolean,
  language: | 'ptBR' | 'enUS',
  loading: boolean,
  current: {
    serie: {},
    comic: {},
    character: {
      [key: string]: any
    },
  },
  favorites: {
    characters: [],
    comics: [],
    series: []
  },
  drawer: {
    show: boolean,
    template: string,
    data: {
      [key: string]: any
    }
  },
  toast: {
    show: boolean,
    message: string,
    template: string,
    icon: string,
    position:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
  },
  modal: {
    show: boolean,
    template: string,
    data: {
      [key: string]: any
    }
  }
}
