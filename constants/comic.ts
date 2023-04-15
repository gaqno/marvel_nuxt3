import { Comic } from '~/types/comic'

export const comics = ref([{
  title: '',
  isFavorite: false,
  id: 0,
  description: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  characters: {
    items: [],
    available: 0
  },
  series: {
    items: [],
    available: 0
  },
  stories: {
    items: [],
    available: 0
  }
} as Comic])
