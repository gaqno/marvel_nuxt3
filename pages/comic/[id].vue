<template>
  <section class="body-font">
    <div id="character" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="flex flex-col md:flex-row">
        <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
        <figure v-else class="max-w-md max-h-md ">
          <img
            class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none"
            :src="comics.thumbnail.path + '.' + comics.thumbnail.extension"
            alt="Album"
          >
        </figure>
        <div
          :class="[app.theme === 'light' ? 'bg-slate-300' : 'bg-white', 'text-black prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none']"
        >
          <div class="px-4 py-5 sm:px-6">
            <div class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div class="ml-4 mt-4">
                <h3 class="text-2xl font-semibold leading-6 text-gray-900">
                  {{ comics.title }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ comics.description || $t('noDescription') }}
                </p>
                <div class="ml-4 mt-4 flex-shrink-0">
                  <button
                    v-if="!comics.isFavorite"
                    class="btn btn-ghost bg-red-600 border-0 text-white hover:bg-red-800"
                    @click="handleViews('comic-favorited', comic)"
                  >
                    <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                    {{ $t('favorited') }}
                  </button>
                  <button
                    v-else
                    class="btn btn-ghost bg-white border-red-600 text-red-600 hover:bg-slate-100"
                    @click="handleViews('comic-desfavorited', comic)"
                  >
                    <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                    {{ $t('desfavorited') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="serie" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="pb-4">
        <h1 class="text-2xl font-bold md:px-8 lg:text-3xl ">
          {{ $t('series') }}
        </h1>
        <p>{{ $t('allSeriesThatParticipated') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { EffectCoverflow, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { getComics } from '~/helpers/marvel-api'
import { useAppStore } from '~/store/app'
import 'swiper/css'
import { Comic } from '~/types/comic'

definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})
const modules = [EffectCoverflow, Pagination]
const route = useRoute()
const app = useAppStore()
const view = ref('')
const loading = ref(false)
const comic = ref({
  title: '',
  id: 0,
  isFavorite: false,
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
})
const comics = ref({
  title: '',
  id: 0,
  isFavorite: false,
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
})

const fetchComics = () => {
  return new Promise((resolve, reject) => {
    const { id } = route.params
    console.log('id', id)
    getComics({ id: id as string })
      .then((res) => {
        comics.value = {
          ...res.data.results[0],
          isFavorite: app.isFavorited('comics', { id }),
          characters: {
            available: res.data.results[0].characters.available,
            items: {
              ...res.data.results[0].characters.items,
              name: res.data.results[0].characters.items[0].name.split(' (')[0]
            }
          }
        }
        app.setCurrent('comics', comics.value)
        app.setLoading(false)
        resolve(comics.value)
      })
      .catch((error) => {
        app.setLoading(false)
        reject(error)
        app.setToast({
          show: true,
          template: 'error',
          icon: 'carbon:error',
          message: error.message
        })
      })
  })
}

const handleViews = (action: string, data?: any) => {
  if (action === 'character-favorited') {
    data.isFavorite = true
    app.setFavorite('characters', data)
  }

  if (action === 'character-desfavorited') {
    data.isFavorite = false
    app.removeFavorite('characters', data)
  }

  if (action === 'serie-favorited') {
    data.isFavorite = true
    app.setFavorite('series', data)
  }

  if (action === 'serie-desfavorited') {
    data.isFavorite = false
    app.removeFavorite('series', data)
  }

  if (action === 'comic-favorited') {
    data.isFavorite = true
    app.setFavorite('comics', data)
  }

  if (action === 'comic-desfavorited') {
    data.isFavorite = false
    app.removeFavorite('comics', data)
  }
}

watchEffect(() => view.value !== '' && (loading.value = false))
onMounted(() => {
  if (route.params) {
    fetchComics()
  }
})
</script>
