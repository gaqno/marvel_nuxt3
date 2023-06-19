<template>
  <section class="body-font">
    <div aria-hidden="true" class="relative">
      <img :src="serie.thumbnail.path + '.' + serie.thumbnail.extension" alt="" class="h-96 w-full object-cover">
      <div :class="[!app.isDarkMode ? 'from-white' : 'from-slate-800', 'absolute inset-0 bg-gradient-to-t']"></div>
    </div>

    <div class="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'text-3xl font-bold tracking-tight sm:text-4xl']">
          {{ serie.title }}
        </h2>
        <p class="mt-4 text-gray-500">
          {{ serie.description || $t('noDescription') }}
        </p>
      </div>

      <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
        <div class="border-t border-gray-200 pt-4">
          <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium ']">
            {{ $t('startYear') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-500">
            {{ serie.startYear }}
          </dd>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium ']">
            {{ $t('endYear') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-500">
            {{ serie.endYear }}
          </dd>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium ']">
            {{ $t('favorite') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-500">
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
          </dd>
        </div>
        <div class="border-t border-gray-200 pt-4">
          <dt :class="[!app.isDarkMode ? 'text-gray-900' : 'text-white', 'font-medium ']">
            {{ $t('creators') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-500">
            <span v-for="creator in serie.creators?.items" :key="creator.id">
              <p class="flex justify-between">
                <span>{{ creator.name }}</span>
                <span>{{ formatCreators(creator.role) }}</span>
              </p>
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <article>
      <div id="stories" class="relative mx-auto max-w-screen-xl px-4 py-8">
        <div class="pb-4">
          <h1 class="text-3xl text-bold">
            {{ $t('stories') }}
          </h1>
          <p>{{ $t('allStoriesThatParticipated') }}</p>
        </div>

        <div>
          <ul role="list" class="divide-y divide-gray-800">
            <li v-for="item in serie.comics?.items" :key="item.id" class="flex justify-between gap-x-6 py-5">
              <div class="flex gap-x-4">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm font-semibold leading-6 text-white">
                    {{ item.name }}
                  </p>
                  <p class="mt-1 truncate text-xs leading-5 text-gray-400">
                    <span>{{ item.type }}</span>
                  </p>
                </div>
              </div>
              <div class="hidden sm:flex sm:flex-col sm:items-end">
                <p class="mt-1 text-xs leading-5 text-gray-400">
                  <a :href="formatURI(item.resourceURI)" class="btn btn-ghost">
                    {{ $t('comic') }}
                    <Icon name="mdi:chevron-right" size="1.5em" class="mr-4" />
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { getSeries } from '~/helpers/marvel-api'
import { useAppStore } from '~/store/app'
import 'swiper/css'
import { useFormatCreators } from '~/composables/useFormatCreators'

definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})
const { formatCreators } = useFormatCreators()
const route = useRoute()
const app = useAppStore()
const view = ref('')
const loading = ref(false)
const serie = ref({
  title: '',
  description: '',
  type: '',
  startYear: '',
  endYear: '',
  resourceURI: '',
  creators: {
    available: 0,
    collectionURI: '',
    items: [{
      resourceURI: '',
      name: ''
    }],
    returned: 0
  },
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

const formatURI = (uri: string) => {
  return uri.substring(uri.indexOf('public/') + 'public'.length)
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
