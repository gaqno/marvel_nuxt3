<template>
  <section class="body-font">
    <div class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div>
        <h1 class="text-2xl font-bold lg:text-3xl">
          {{ currentCharacter.name }}
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          ID: {{ currentCharacter.id }}
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-4 lg:items-start">
        <div class="lg:col-span-3">
          <div class="relative mt-4">
            <img
              v-if="currentCharacter.thumbnail.path !== ''"
              alt="Tee"
              :src="currentCharacter.thumbnail.path + '.' + currentCharacter.thumbnail.extension"
              class="h-72 w-full rounded-xl object-cover lg:h-[540px]"
            >
            <progress v-else class="progress w-full h-96"></progress>
            <div class="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>

              <span class="ml-1.5 text-xs">
                Hover to zoom
              </span>
            </div>
          </div>
        </div>

        <div class="lg:sticky lg:top-0">
          <form class="space-y-4 lg:pt-4">
            <div class="rounded border bg-gray-100 p-4 prose">
              <span class="block">
                {{ currentCharacter.description || $t('noDescription') }}.
                <p>
                  <span class="font-bold">
                    {{ $t('comics') }}:
                  </span>
                  {{ currentCharacter.comics.available }}
                </p>
                <p>
                  <span class="font-bold">
                    {{ $t('series') }}:
                  </span>
                  {{ currentCharacter.series.available }}
                </p>
                <p>
                  <span class="font-bold">
                    {{ $t('stories') }}:
                  </span>
                  {{ currentCharacter.stories.available }}
                </p>
              </span>
            </div>

            <button type="submit" class="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
              {{ $t('favorite') }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div>
        <h1 class="text-2xl font-bold lg:text-3xl">
          {{ $t('comics') }}
        </h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-4 lg:items-start">
        <div class="lg:col-span-3">
          <div class="relative mt-4">
            <img
              v-if="currentComics.thumbnail.path !== ''"
              alt="Tee"
              :src="currentComics.thumbnail.path + '.' + currentComics.thumbnail.extension"
              class="h-72 w-full rounded-xl object-cover lg:h-[540px]"
            >
            <progress v-else class="progress w-full h-96"></progress>
            <div class="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>

              <span class="ml-1.5 text-xs">
                Hover to zoom
              </span>
            </div>
          </div>
        </div>

        <div class="lg:sticky lg:top-0">
          <form class="space-y-4 lg:pt-4">
            <div class="rounded border bg-gray-100 p-4 prose">
              <h2>{{ currentComics.title }}</h2>
              <span class="block">
                {{ currentComics.description || $t('noDescription') }}.
              </span>
            </div>

            <button type="submit" class="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
              {{ $t('favorite') }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div>
        <h1 class="text-2xl font-bold lg:text-3xl">
          {{ $t('series') }}
        </h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-4 lg:items-start">
        <div class="lg:col-span-3">
          <div class="relative mt-4">
            <img
              v-if="currentSeries.thumbnail.path !== ''"
              alt="Tee"
              :src="currentSeries.thumbnail.path + '.' + currentSeries.thumbnail.extension"
              class="h-72 w-full rounded-xl object-cover lg:h-[540px]"
            >
            <progress v-else class="progress w-full h-96"></progress>
            <div class="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>

              <span class="ml-1.5 text-xs">
                Hover to zoom
              </span>
            </div>
          </div>
        </div>

        <div class="lg:sticky lg:top-0">
          <form class="space-y-4 lg:pt-4">
            <div class="rounded border bg-gray-100 p-4 prose">
              <h2>{{ currentSeries.title }}</h2>
              <span class="block">
                {{ currentSeries.description || $t('noDescription') }}.
              </span>
            </div>

            <button type="submit" class="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
              {{ $t('favorite') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCharacter, getCharacterComics, getCharacterSeries } from '~/helpers/marvel-api'
import { useAppStore } from '~/store/app'
definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})

const route = useRoute()
const app = useAppStore()
const currentComics = ref({
  title: '',
  id: 0,
  description: '',
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
  },
  characters: {
    items: [],
    available: 0
  },
  thumbnail: {
    path: '',
    extension: ''
  }
})
const currentSeries = ref({
  title: '',
  id: 0,
  description: '',
  characters: {
    items: [],
    available: 0
  },
  stories: {
    items: [{
      resourceURI: '',
      name: ''
    }],
    available: 0
  },
  comics: {
    items: [],
    available: 0
  },
  thumbnail: {
    path: '',
    extension: ''
  }
})
const currentCharacter = ref({
  name: '',
  id: 0,
  description: '',
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
  },
  comics: {
    items: [],
    available: 0
  },
  thumbnail: {
    path: '',
    extension: ''
  }
})

onMounted(() => {
  if (route.params) {
    getCharacter(route.params.id as string)
      .then((res) => {
        currentCharacter.value = res.data.results[0]
      })
      .catch((error) => {
        app.setToast({
          show: true,
          template: 'error',
          icon: 'carbon:error',
          message: error.message
        })
      })
    getCharacterComics(route.params.id as string)
      .then((res) => {
        currentComics.value = res.data.results[0]
      })
      .catch((error) => {
        app.setToast({
          show: true,
          template: 'error',
          icon: 'carbon:error',
          message: error.message
        })
      })
    getCharacterSeries(route.params.id as string)
      .then((res) => {
        currentSeries.value = res.data.results[0]
      })
      .catch((error) => {
        app.setToast({
          show: true,
          template: 'error',
          icon: 'carbon:error',
          message: error.message
        })
      })
  }
})
</script>
