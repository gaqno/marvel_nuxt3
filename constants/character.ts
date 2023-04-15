import { Character } from '~/types/character'

export const character = ref({
  name: '',
  isFavorite: false,
  id: 0,
  description: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  comics: {
    items: [],
    available: 0
  },
  series: {
    items: [],
    available: 0
  },
  stories: {
    items: [{
      resourceURI: '',
      name: ''
    }],
    available: 0
  }
} as Character)
