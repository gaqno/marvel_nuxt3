<template>
  <section class="body-font">
    <div id="serie" class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="flex flex-col md:flex-row">
        <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
        <figure v-else class="max-w-md max-h-md ">
          <img class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none" :src="serie.thumbnail.path + '.' + serie.thumbnail.extension" alt="Album">
        </figure>
        <div class="bg-white border prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none">
          <h2 class="text-center text-lg font-bold">
            {{ serie.title }}
          </h2>
          <div class="flex flex-col">
            <span class="text-center">
              <span>{{ serie.description || $t('noDescription') }}</span>
            </span>
            <div class="flex flex-row justify-center">
              <span class="mt-3 mr-2">
                Tipo:
              </span>
              <p class="items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                {{ formatType(serie.type) }}
              </p>
            </div>
          </div>
          <div class="card-actions justify-center py-6">
            <button v-if="!serie.isFavorite" class="btn btn-ghost bg-red-600 border-0 text-white hover:bg-red-800" @click="handleViews('serie-favorited', serie)">
              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
              {{ $t('favorited') }}
            </button>
            <button v-else class="btn btn-ghost bg-white border-red-600 text-red-600 hover:bg-slate-100" @click="handleViews('serie-desfavorited', serie)">
              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
              {{ $t('desfavorited') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="comics" class="relative mx-auto max-w-screen-xl px-4 py-8">
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
        <SwiperSlide v-for="storie in stories" :key="storie.name">
          <div class="flex flex-col md:flex-row">
            <progress v-if="app.isLoading" class="progress w-full h-96"></progress>
            <figure v-else class="max-w-md max-h-md">
              <img class="w-full h-full object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none" :src="storie.thumbnail.path + '.' + storie.thumbnail.extension" alt="Album">
            </figure>
            <div class="bg-white prose w-full py-4 rounded-br-xl rounded-bl-xl md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-none">
              <h2 class="text-center text-lg font-bold">
                {{ storie.name }}
              </h2>
              <p class="p-8 text-center shadow-sm m-2">
                {{ storie.resourceURI || $t('noDescription') }}
              </p>
              <span class="flex flex-col md:flex-row gap-4 ml-4">
                <button class="btn border-0 bg-red-600 text-white mr-4">
                  <Icon name="mdi:television" size="1.5em" class="mr-4" />
                  {{ $t('favorited') }}
                </button>
                <button class="btn border-0 bg-red-600 text-white mr-4">
                  <Icon name="material-symbols:arrows-more-up-rounded" size="1.5em" class="mr-4" />
                  {{ $t('storie') }}
                </button>
              </span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div> -->
  </section>
</template>

<script setup lang="ts">
// import { EffectCoverflow, Pagination } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'
import { getSeries } from '~/helpers/marvel-api'
import { useAppStore } from '~/store/app'
import 'swiper/css'

definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})
// const modules = [EffectCoverflow, Pagination]
const route = useRoute()
const app = useAppStore()
const view = ref('')
const loading = ref(false)
const serie = ref({
  title: '',
  description: '',
  type: '',
  resourceURI: '',
  thumbnail: {
    path: '',
    extension: ''
  }
} as any)

const fetchSeries = () => {
  return new Promise((resolve, reject) => {
    getSeries({ id: route.params.id })
      .then((res) => {
        serie.value = res.data.results[0]
        console.log(serie.value)
        resolve(serie.value)
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

const formatType = (type: string) => {
  if (type === 'limited') { return 'Limitado' }
  if (type === 'collection') { return 'Coleção' }
  if (type === 'trade paperback') { return 'Livro' }
  if (type === 'hardcover') { return 'Livro' }
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
    fetchSeries()
    app.setLoading(false)
  }
})
</script>
