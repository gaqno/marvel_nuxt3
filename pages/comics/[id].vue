<template>
  <section class="body-font">
    <div aria-hidden="true" class="relative">
      <img :src="comics.thumbnail.path + '.' + comics.thumbnail.extension" alt="" class="h-96 w-full object-cover object-center">
      <div :class="[!app.isDarkMode ? 'from-white' : 'from-slate-800', 'absolute inset-0 bg-gradient-to-t']"></div>
    </div>

    <div class="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'text-3xl font-bold tracking-tight sm:text-4xl']">
          {{ comics.title }}
        </h2>
        <p class="mt-4 text-gray-500">
          {{ comics.description }}
        </p>
      </div>

      <dl class="mx-auto mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
        <div class="border-t border-gray-200 pt-4">
          <dt class="font-medium text-slate-400">
            <h1 :class="[!app.isDarkMode ? 'text-gray-800' : 'text-white', 'text-xl font-bold lg:text-3xl']">
              {{ $t('characters') }}
            </h1>
            <p>{{ $t('allCharactersThatParticipated') }}</p>
          </dt>
          <dd class="mt-2 text-sm text-gray-500">
            <button
              v-for="character in comics.characters?.items"
              :key="character.resourceURI"
              class="inline-flex items-center gap-x-1.5 m-2 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
              @click.prevent="navigateTo(character.resourceURI.replace(/http.*\/v1\/public\//, '').replace(/characters/, '/character'))"
            >
              {{ character.name }}
            </button>
          </dd>
        </div>
        <div class="border-t border-gray-200 pt-4">
          <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium ']">
            {{ $t('creators') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-500">
            <span v-for="creator in comics.creators.items" :key="creator.id">
              <p class="flex justify-between">
                <span>{{ creator.name }}</span>
                <span>{{ formatCreators(creator.role) }}</span>
              </p>
            </span>
          </dd>
        </div>
      </dl>
    </div>
    <div id="character" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="pb-4">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { EffectCoverflow, Pagination } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'
import { getComics } from '~/helpers/marvel-api'
import { useAppStore } from '~/store/app'
import 'swiper/css'
// import { Comic } from '~/types/comic'
import { useFormatCreators } from '~/composables/useFormatCreators'

definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})
// const modules = [EffectCoverflow, Pagination]
const { formatCreators } = useFormatCreators()
const route = useRoute()
const app = useAppStore()
const view = ref('')
const loading = ref(false)

const comics = ref({
  title: '',
  characters: {
    available: 0,
    items: [{
      resourceURI: '',
      name: ''
    }]
  },
  description: '',
  isFavorite: false,
  id: 0,
  creators: {
    items: [{
      resourceURI: '',
      name: '',
      role: ''
    }],
    available: 0
  },
  thumbnail: {
    path: '',
    extension: ''
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
    comics.value.characters.items = []
    getComics({ id: id as string })
      .then((res) => {
        comics.value = {
          ...res.data.results[0],
          isFavorite: app.isFavorited('comics', { id }),
          characters: {
            available: res.data.results[0].characters.available,
            items: res.data.results[0].characters.items
          }
        }
        app.setCurrent('comic', comics.value)
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

watchEffect(() => view.value !== '' && (loading.value = false))
onMounted(() => {
  if (route.params) {
    fetchComics()
  }
})
</script>
