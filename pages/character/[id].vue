<template>
  <section class="body-font">
    <div id="character" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="flex flex-col md:flex-row">
        <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
        <figure v-else class="max-w-md max-h-md ">
          <img class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none" :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="Album">
        </figure>
        <div class="bg-white prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none">
          <h2 class="text-center text-lg font-bold">
            {{ character.name }}
          </h2>
          <p class="p-8 text-center shadow-sm m-2">
            {{ character.description || $t('noDescription') }}
          </p>

          <div class="card-actions justify-center py-6">
            <button class="btn border-0 bg-red-600  text-white">
              <Icon name="mdi:television" size="1.5em" class="mr-4" />
              {{ $t('favorited') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="series" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="pb-4">
        <h1 class="text-2xl font-bold md:text-3xl md:p-8">
          {{ $t('series') }}
        </h1>
        <p>{{ $t('allSeriesThatParticipated') }}</p>
      </div>

      <Swiper
        :effect="'coverflow'"
        :grab-cursor="true"
        :centered-slides="true"
        :slides-per-view="'auto'"
        :coverflow-effect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :pagination="true"
        :modules="modules"
        @slide-change="view = ''"
      >
        <SwiperSlide v-for="serie in series" :key="serie.id">
          <div class="flex flex-col md:flex-row">
            <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
            <figure v-else class="max-w-md max-h-md ">
              <img class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none" :src="serie.thumbnail.path + '.' + serie.thumbnail.extension" alt="Album">
            </figure>
            <div class="bg-white prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none">
              <h2 class="text-center text-lg font-bold">
                {{ serie.title }}
              </h2>
              <p class="p-8 text-center shadow-sm m-2">
                {{ character.description || $t('noDescription') }}
              </p>
              <span class="flex flex-row gap-4 ml-4">
                <button class="btn border-0 rounded-lg bg-red-600 w-fit p-2" @click="handleView('characters')">
                  <Icon name="carbon:person" size="2em" class="mr-2" />
                  <i class="font-bold text-white">
                    {{ serie.characters.available + ' - ' + $t('characters') }}
                  </i>
                </button>
                <button class="btn border-0 rounded-lg bg-red-600 w-fit p-2" @click="handleView('comics')">
                  <Icon name="carbon:book" size="2em" class="mr-2" />
                  <i class="font-bold text-white">
                    {{ serie.comics.available + ' - ' + $t('comics') }}
                  </i>
                </button>
                <button class="btn border-0 bg-red-600  text-white">
                  <Icon name="mdi:television" size="1.5em" class="mr-4" />
                  {{ $t('favorited') }}
                </button>
              </span>
              <div class="w-full p-2">
                <div v-if="view === 'characters'">
                  <div class="overflow-x-hidden overflow-y-scroll max-h-[20vh] scrollbar scrollbar-thin">
                    <table class="w-full divide-y-2 divide-gray-200 text-sm">
                      <thead>
                        <tr>
                          <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            {{ $t('title') }}
                          </th>
                          <th class="px-4 py-2"></th>
                        </tr>
                      </thead>

                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="characterPresent in serie.characters.items" :key="characterPresent.resourceURI">
                          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {{ characterPresent.name }}
                          </td>
                          <td class="whitespace-nowrap px-4 py-2">
                            <a href="#" class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                              View
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-if="view === 'comics'">
                  {{ $t('comics') }}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div id="comics" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="pb-4">
        <h1 class="text-2xl font-bold md:px-8 lg:text-3xl ">
          {{ $t('comics') }}
        </h1>
        <p>{{ $t('allComicsThatParticipated') }}</p>
      </div>

      <Swiper
        :effect="'coverflow'"
        :grab-cursor="true"
        :centered-slides="true"
        :slides-per-view="'auto'"
        :coverflow-effect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :pagination="true"
        :modules="modules"
        @slide-change="view = ''"
      >
        <SwiperSlide v-for="comic in comics" :key="comic.id">
          <div class="flex flex-col md:flex-row">
            <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
            <figure v-else class="max-w-md max-h-md ">
              <img class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none" :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" alt="Album">
            </figure>
            <div class="bg-white prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none">
              <h2 class="text-center text-lg font-bold">
                {{ comic.title }}
              </h2>
              <p class="p-8 text-center shadow-sm m-2">
                {{ character.description || $t('noDescription') }}
              </p>
              <span class="flex flex-row gap-4 ml-4">
                <button class="btn border-0 rounded-lg bg-red-600 w-fit p-2" @click="handleView('characters')">
                  <Icon name="carbon:person" size="2em" class="mr-2" />
                  <i class="font-bold text-white">
                    {{ comic.characters.available + ' - ' + $t('characters') }}
                  </i>
                </button>
                <button class="btn border-0 rounded-lg bg-red-600 w-fit p-2" @click="handleView('comics')">
                  <Icon name="carbon:book" size="2em" class="mr-2" />
                </button>
                <button class="btn border-0 bg-red-600  text-white">
                  <Icon name="mdi:television" size="1.5em" class="mr-4" />
                  {{ $t('favorited') }}
                </button>
              </span>
              <div class="w-full p-2">
                <div v-if="view === 'characters'">
                  <div class="overflow-x-hidden overflow-y-scroll max-h-[20vh] scrollbar scrollbar-thin">
                    <table class="w-full divide-y-2 divide-gray-200 text-sm">
                      <thead>
                        <tr>
                          <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            {{ $t('title') }}
                          </th>
                          <th class="px-4 py-2"></th>
                        </tr>
                      </thead>

                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="characterPresent in comic.characters.items" :key="characterPresent.resourceURI">
                          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {{ characterPresent.name }}
                          </td>
                          <td class="whitespace-nowrap px-4 py-2">
                            <a href="#" class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                              View
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-if="view === 'comics'">
                  {{ $t('comics') }}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { EffectCoverflow, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { getCharacter, getCharacterComics, getCharacterSeries } from '~/helpers/marvel-api'
import { useAppStore } from '~/store/app'
import 'swiper/css'
import { Comic } from '~/types/comic'
import { Serie } from '~/types/serie'

definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})
const modules = [EffectCoverflow, Pagination]
const route = useRoute()
const app = useAppStore()
const view = ref('')
const loading = ref(false)
const character = ref({
  name: '',
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
})
const comics = ref([{
  title: '',
  id: 0,
  isFavorite: false,
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
const series = ref([{
  title: '',
  id: 0,
  isFavorite: false,
  description: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  characters: {
    items: [],
    available: 0
  },
  comics: {
    available: 0,
    items: []
  },
  series: {
    items: [],
    available: 0
  },
  stories: {
    items: [],
    available: 0
  }

} as Serie])

const fetchCharacter = () => {
  return new Promise((resolve, reject) => {
    getCharacter(route.params.id as string)
      .then((res) => {
        character.value = res.data.results[0]
        resolve(character.value)
      })
      .catch((error) => {
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

const fetchComics = () => {
  return new Promise((resolve, reject) => {
    getCharacterComics(route.params.id as string)
      .then((res) => {
        comics.value = res.data.results
        resolve(comics.value)
      })
      .catch((error) => {
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

const fetchSeries = () => {
  return new Promise((resolve, reject) => {
    getCharacterSeries(route.params.id as string)
      .then((res) => {
        series.value = res.data.results
        resolve(series.value)
      })
      .catch((error) => {
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

const handleView = (action: string) => {
  loading.value = true
  switch (action) {
    case 'characters':
      view.value = 'characters'
      break
    case 'comics':
      view.value = 'comics'
      break
    case 'series':
      view.value = 'series'
      break
    default:
      view.value = ''
      break
  }
}

watchEffect(() => view.value !== '' && (loading.value = false))
onMounted(() => {
  if (route.params) {
    return Promise.all([fetchCharacter(), fetchComics(), fetchSeries()])
      .then(() => {
        app.setLoading(false)
      })
  }
})
</script>
