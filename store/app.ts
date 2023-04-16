import { defineStore } from 'pinia'
import { App } from '~/types/app'

interface IComponent {
  show: boolean,
  template: string,
  data: any
}
interface IToast {
  show: boolean,
  message: string,
  icon: string,
  template: string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): App => {
    return {
      language: 'ptBR',
      loading: false,
      darkMode: false,
      theme: 'light',
      translate: {},
      current: {
        character: {},
        serie: {},
        comic: {}
      },
      favorites: {
        characters: [],
        series: [],
        comics: []
      },
      drawer: {
        show: false,
        template: '',
        data: {}
      },
      toast: {
        show: false,
        message: '',
        icon: '',
        template: '',
        position: 'top-right'
      },
      modal: {
        show: false,
        template: '',
        data: {}
      }
    }
  },
  getters: {
    getModalData: state => state.modal.data,
    getModalTemplate: state => state.modal.template,
    getFavorites: state => state.favorites,
    isToast: state => state.toast.show,
    isModal: state => state.modal.show,
    isDrawer: state => state.drawer.show,
    isLoading: state => state.loading
  },
  actions: {
    setFavorite (action: 'characters' | 'series' | 'comics', content: any) {
      // check if exists
      const exists = this.favorites[action].find((item: any) => item.id === content.id)
      if (exists) {
        this.removeFavorite(action, content)
        return
      }
      this.favorites = {
        ...this.favorites,
        [action]: [content, ...this.favorites[action]]
      }
    },
    removeFavorite (action: 'characters' | 'series' | 'comics', content: any) {
      this.favorites = {
        ...this.favorites,
        [action]: this.favorites[action].filter((item: any) => item.id !== content.id)
      }
    },
    setCurrent (content: any) {
      this.current = content
    },
    setToast (content: IToast) {
      this.toast.show = !this.toast.show
      this.toast.message = content.message
      this.toast.template = content.template
      this.toast.icon = content.icon
    },
    setModal (content: IComponent) {
      this.modal.show = !this.modal.show
      this.modal.template = content.template
      this.modal.data = content.data
    },
    closeModal () {
      this.modal.show = false
      this.modal.template = ''
      this.modal.data = {}
    },
    closeToast () {
      this.toast.show = false
      this.toast.message = ''
      this.toast.template = ''
      this.toast.icon = ''
    },
    setDrawer (content: IComponent) {
      this.drawer.show = content.show
      this.drawer.template = content.template
      this.drawer.data = content.data
    },
    setDrawerTemplate (template: string) {
      this.drawer.template = template
    },
    setLoading (content: boolean) {
      this.loading = content
    },
    setDarkMode (content: boolean) {
      this.darkMode = content
    },
    setTranslate (content: any) {
      this.translate = content
    },
    closedrawer () {
      this.drawer.show = !this.drawer.show
      this.drawer.template = ''
      this.drawer.data = {}
    }
  }
})
