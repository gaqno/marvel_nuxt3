<template>
  <section class="body-font">
    <div :class="[!app.isDarkMode ? 'bg-white' : 'bg-slate-700']">
      <div aria-hidden="true" class="relative">
        <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="" class="h-96 w-full object-cover">
        <div :class="[!app.isDarkMode ? 'from-white' : 'from-slate-700', 'absolute inset-0 bg-gradient-to-t']"></div>
      </div>

      <div class="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 :class="[!app.isDarkMode ? 'text-gray-900' : '', 'text-3xl font-bold tracking-tight sm:text-4xl']">
            {{ character.name }}
          </h2>
          <p class="mt-4 text-gray-500">
            {{ character.description || $t('noDescription') }}
          </p>
        </div>

        <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          <div class="border-t border-gray-200 pt-4">
            <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium']">
              {{ $t('comics') }}
            </dt>
            <dd class="mt-2 text-base text-gray-500">
              {{ character.comics.available }}
            </dd>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium']">
              {{ $t('series') }}
            </dt>
            <dd class="mt-2 text-base text-gray-500">
              {{ character.series.available }}
            </dd>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium']">
              {{ $t('stories') }}
            </dt>
            <dd class="mt-2 text-base text-gray-500">
              {{ character.stories.available }}
            </dd>
          </div>
          <div class="ml-4 mt-4">
            <button v-if="!character.isFavorite" class="btn btn-ghost w-full bg-red-600 border-0 text-white hover:bg-red-800" @click="handleViews('character-favorited', character)">
              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
              {{ $t('favorited') }}
            </button>
            <button v-else class="btn btn-ghost w-full bg-white border-red-600 text-red-600 hover:bg-slate-100" @click="handleViews('character-desfavorited', character)">
              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
              {{ $t('desfavorited') }}
            </button>
          </div>
        </dl>
      </div>
    </div>
    <article>
      <div id="comics" class="relative mx-auto max-w-screen-xl px-4 py-8">
        <div class="pb-4">
          <h1 class="text-3xl text-bold">
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
              <figure v-else class="relative max-h-md">
                <img class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none" :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" alt="Album">
                <div class="absolute inset-0 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex justify-center items-center bg-black bg-opacity-50">
                  <span class="text-white text-5xl material-icons-round">
                    <Icon name="material-symbols:swipe" />
                  </span>
                </div>
              </figure>
              <div :class="[!app.isDarkMode ? 'bg-white' : 'bg-slate-700', 'text-black prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none']">
                <div class="px-4 py-5">
                  <div class="-mt-4">
                    <div class="mt-4">
                      <h3 :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'text-2xl font-semibold leading-6']">
                        {{ comic.title }}
                      </h3>
                      <p class="mt-1 text-base text-gray-500">
                        {{ comic.description || $t('noDescription') }}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col justify-center mt-4 gap-y-4">
                    <button
                      v-if="!comic.isFavorite"
                      class="btn btn-ghost w-full bg-red-600 border-0 text-white hover:bg-red-800"
                      @click="handleViews('comic-favorited', comic)"
                    >
                      <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                      {{ $t('favorited') }}
                    </button>
                    <button
                      v-else
                      class="btn btn-ghost w-full bg-white border-red-600 text-red-600 hover:bg-slate-100"
                      @click="handleViews('comic-desfavorited', comic)"
                    >
                      <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                      {{ $t('desfavorited') }}
                    </button>
                    <button
                      class="btn btn-ghost w-full bg-red-600 border-0 text-white hover:bg-red-800"
                      @click.prevent="navigateTo('/comics/' + comic.id)"
                    >
                      <Icon name="material-symbols:arrows-more-up-rounded" size="1.5em" class="mr-4" />
                      {{ $t('comic') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div id="serie" class="relative mx-auto max-w-screen-xl px-4 py-8">
        <div class="pb-4">
          <h1 class="text-3xl text-bold">
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
              <figure v-else class="relative max-w-md max-h-md">
                <img class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none" :src="serie.thumbnail.path + '.' + serie.thumbnail.extension" alt="Album">
                <div class="absolute inset-0 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex justify-center items-center bg-black bg-opacity-50">
                  <span class="text-white text-5xl material-icons-round">
                    <Icon name="material-symbols:swipe" />
                  </span>
                </div>
              </figure>
              <div :class="[!app.isDarkMode ? 'bg-white' : 'bg-slate-700', 'text-black prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none']">
                <div class="px-4 py-5">
                  <div class="-mt-4">
                    <div class="mt-4">
                      <h3 :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'text-2xl font-semibold leading-6']">
                        {{ serie.title }}
                      </h3>
                      <p class="mt-1 text-base text-gray-500">
                        {{ serie.description || $t('noDescription') }}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col justify-center mt-4 gap-y-4">
                    <button
                      v-if="!serie.isFavorite"
                      class="btn btn-ghost w-full bg-red-600 border-0 text-white hover:bg-red-800"
                      @click="handleViews('serie-favorited', serie)"
                    >
                      <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                      {{ $t('favorited') }}
                    </button>
                    <button
                      v-else
                      class="btn btn-ghost w-full bg-white border-red-600 text-red-600 hover:bg-slate-100"
                      @click="handleViews('serie-desfavorited', serie)"
                    >
                      <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                      {{ $t('desfavorited') }}
                    </button>
                    <button
                      class="btn btn-ghost w-full bg-red-600 border-0 text-white hover:bg-red-800"
                      @click.prevent="navigateTo('/serie/' + serie.id)"
                    >
                      <Icon name="material-symbols:arrows-more-up-rounded" size="1.5em" class="mr-4" />
                      {{ $t('serie') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </article>
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
  events: {
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
    items: [{
      resourceURI: '',
      name: ''
    }],
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
        character.value = {
          ...res.data.results[0],
          isFavorite: app.getFavorites.series.some((j: any) => j.id === res.data.results[0].id)
        }
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
  loading.value = true
  if (route.params) {
    return Promise.all([fetchCharacter(), fetchComics(), fetchSeries()])
      .then(() => {
        app.setLoading(false)
        loading.value = false
      })
  }
})
</script>
