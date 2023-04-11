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
      favorite: {
        characters: [],
        series: [],
        comics: []
      },
      favorites: [],
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
    isToast: state => state.toast.show,
    isModal: state => state.modal.show,
    isDrawer: state => state.drawer.show,
    isLoading: state => state.loading
  },
  actions: {
    setFavorites (content: any) {
      this.favorites.push(content)
      this.toast = {
        show: true,
        message: 'Character adicionado aos favoritos',
        icon: 'mdi-heart',
        template: 'success',
        position: 'top-right'
      }
    },
    removeFavoriteCharacter (character: any) {
      const index = this.favorites.findIndex((item: any) => item.id === character.id)
      this.favorites.splice(index, 1)
      this.toast = {
        show: true,
        message: 'Character removido dos favoritos',
        icon: 'mdi-heart-outline',
        template: 'warning',
        position: 'top-right'
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
