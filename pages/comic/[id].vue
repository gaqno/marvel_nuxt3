<template>
  <section class="body-font">
    <div id="character" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="grid gap-8 lg:grid-cols-4 lg:items-start p-8">
        <div class="flex flex-col md:flex-row">
          <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
          <figure v-else class="max-w-md max-h-md ">
            <img
              class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl"
              :src="character.thumbnail.path + '.' + character.thumbnail.extension"
              alt="Album"
            >
          </figure>
          <div class="bg-white w-full py-4 rounded-br-xl rounded-bl-xl">
            <h1 class="text-center text-2xl font-bold">
              {{ character.name }}
            </h1>
            <p class="p-8">
              {{ character.description || $t('noDescription') }}
            </p>
            <div class="card-actions justify-center py-6">
              <button class="btn bg-red-600 border-0 text-white">
                <Icon name="mdi:television" size="1.5em" class="mr-4" />
                {{ $t('favorited') }}
              </button>
            </div>
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
        class="mySwiper"
      >
        <SwiperSlide v-for="serie in series" :key="serie.id">
          <div class="flex flex-col md:flex-row">
            <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
            <figure v-else class="max-w-md max-h-md ">
              <img
                class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl"
                :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
                alt="Album"
              >
            </figure>
            <div class="bg-white w-full py-4 rounded-br-xl rounded-bl-xl">
              <h2 class="text-center text-lg font-bold">
                {{ serie.title }}
              </h2>
              <p class="p-8">
                {{ character.description || $t('noDescription') }}
              </p>
              <div class="card-actions justify-center py-6">
                <button class="btn bg-red-600 border-0 text-white">
                  <Icon name="mdi:television" size="1.5em" class="mr-4" />
                  {{ $t('favorited') }}
                </button>
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
        class="mySwiper"
      >
        <SwiperSlide v-for="comic in comics" :key="comic.id">
          <div class="flex flex-col md:flex-row">
            <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
            <figure v-else class="max-w-md max-h-md ">
              <img
                class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl"
                :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                alt="Album"
              >
            </figure>
            <div class="bg-white w-full py-4 rounded-br-xl rounded-bl-xl">
              <h2 class="text-center text-lg font-bold">
                {{ comic.title }}
              </h2>
              <p class="p-8">
                {{ comic.description || $t('noDescription') }}.
              </p>
              <div class="card-actions justify-center py-6">
                <button class="btn bg-red-600 border-0 text-white">
                  <Icon name="carbon:book" size="1.5em" class="mr-4" />
                  {{ $t('favorited') }}
                </button>
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

onMounted(() => {
  if (route.params) {
    return Promise.all([fetchCharacter(), fetchComics(), fetchSeries()])
      .then(() => {
        app.setLoading(false)
      })
  }
})
</script>
