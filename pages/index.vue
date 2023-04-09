<template>
  <div class="container mx-auto">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <section class="overflow-hidden rounded bg-[url(https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center bg-no-repeat">
        <div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="glassmorphism md:text-center p-4 text-center sm:text-left">
            <h2 class="text-4xl font-bold text-red-600 sm:text-3xl md:text-5xl">
              MARVEL 🤖
            </h2>

            <span class="hidden max-w-lg mx-auto text-white/90 md:mt-6 md:block md:text-lg ">
              {{ $t('welcome') }}
            </span>

            <div class="flex-row float-right gap-4 my-8 hidden md:flex">
              <button
                data-tip="Personagens"
                :class="[currentView === 'characters' ? 'ring-2 ring-yellow-400' : '', 'tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button"
                @click.prevent="handleViews('characters')"
              >
                <Icon name="mdi:bug" size="2em" :class="currentView === 'characters' ? 'text-yellow-400' : ''" />
                <span class="inline-flex px-2">
                  {{ $t('characters') }}
                </span>
              </button>
              <button
                data-tip="Séries"
                :class="[currentView === 'series' ? 'ring-2 ring-yellow-400' : '','tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button"
                @click.prevent="handleViews('series')"
              >
                <Icon name="fluent:movies-and-tv-16-regular" size="2em" />
                <span class="inline-flex px-2">
                  {{ $t('series') }}
                </span>
              </button>
              <button
                data-tip="Quadrinhos"
                :class="[currentView === 'comics' ? 'ring-2 ring-yellow-400' : '','tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button"
                @click.prevent="handleViews('comics')"
              >
                <Icon name="material-symbols:menu-book-outline-sharp" size="2em" />
                <span class="inline-flex px-2">
                  {{ $t('comics') }}
                </span>
              </button>
              <button
                data-tip="Ver favoritos"
                :class="[currentView === 'favorite' ? 'ring-2 ring-yellow-400' : '','tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button"
                @click.prevent="handleViews('see')"
              >
                <Icon name="mdi:heart-box" size="2em" />
                <span class="inline-flex px-2">
                  {{ $t('favorite') }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="flex flex-col mx-8 gap-4 my-4 md:hidden">
      <button
        data-tip="Personagens"
        :class="[currentView === 'characters' ? 'ring-2 ring-yellow-400' : '', 'tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
        type="button"
        @click.prevent="handleViews('characters')"
      >
        <Icon name="mdi:bug" size="2em" :class="currentView === 'characters' ? 'text-yellow-400' : ''" />
        <span class="inline-flex px-2">
          {{ $t('characters') }}
        </span>
      </button>
      <button
        data-tip="Séries"
        :class="[currentView === 'series' ? 'ring-2 ring-yellow-400' : '', 'tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
        type="button"
        @click.prevent="handleViews('series')"
      >
        <Icon name="fluent:movies-and-tv-16-regular" size="2em" />
        <span class="inline-flex px-2">
          {{ $t('series') }}
        </span>
      </button>
      <button
        data-tip="Quadrinhos"
        :class="[currentView === 'comics' ? 'ring-2 ring-yellow-400' : '', 'tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
        type="button"
        @click.prevent="handleViews('comics')"
      >
        <Icon name="material-symbols:menu-book-outline-sharp" size="2em" />
        <span class="inline-flex px-2">
          {{ $t('comics') }}
        </span>
      </button>
      <button
        data-tip="Ver favoritos"
        :class="[currentView === 'favorite' ? 'ring-2 ring-yellow-400' : '', 'tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
        type="button"
        @click.prevent="handleViews('see')"
      >
        <Icon name="mdi:heart-box" size="2em" />
        <span class="inline-flex px-2">
          {{ $t('favorite') }}
        </span>
      </button>
    </div>

    <input
      v-if="currentView === 'characters'"
      v-model="queryCharacter"
      type="text"
      class="flex rounded-lg w-fit mx-auto md:w-[50vw] h-10 px-4"
      :placeholder="$t('lookForCharacters')"
      @keydown.enter="handleUpdate('query-character', queryCharacter)"
    >
    <input
      v-if="currentView === 'series'"
      v-model="querySerie"
      type="text"
      class="flex rounded-lg w-fit mx-auto md:w-[50vw] h-10 px-4"
      :placeholder="$t('lookForSeries')"
      @keydown.enter="handleUpdate('query-serie', querySerie)"
    >
    <input
      v-if="currentView === 'comics'"
      v-model="queryComic"
      type="text"
      class="flex rounded-lg w-fit mx-auto md:w-[50vw] h-10 px-4"
      :placeholder="$t('lookForComics')"
      @keydown.enter="handleUpdate('query-comic', queryComic)"
    >

    <section v-if="app.isLoading === true">
      <div v-for="_i, ind in 4" :key="'skeleton_1_'+ind" class="md:grid md:grid-cols-3 m-8 py-8 mt-20 md:gap-8">
        <div v-for="_j, ind2 in 3" :key="'skeleton_2_'+ind2" class="col-span-1 flex flex-col my-4 py-10 justify-center items-center border rounded">
          <progress class="progress h-[8em] w-[8em] my-14"></progress>
          <progress class="progress rounded-full h-50 w-20 "></progress>
          <div class="m-4">
            <progress class="progress rounded-full h-[2em] w-[2em] mb-4"></progress>
            <span class="mx-2"></span>
            <progress class="progress rounded-full h-[2em] w-[2em] mb-4"></progress>
          </div>
        </div>
      </div>
    </section>

    <div v-else class="flex flex-col">
      <article v-if="currentView === 'characters'" class="md:grid md:grid-cols-3 m-8 py-8 mt-20 md:gap-8">
        <div v-for="character in characters" :key="character.id" class="card border rounded my-4 py-10 glassmorphism md:mx-2 hover:scale-105">
          <div class="flex flex-col justify-center items-center ">
            <progress v-if="!character.thumbnail" class="progress h-[2em] w-[2em] mb-4"></progress>
            <img v-else :src="character.thumbnail.path + '.' + character.thumbnail.extension" class="rounded w-auto h-72 my-8">
            <div class="flex flex-col justify-center items-center">
              <h2 class="text-xl font-bold sm:text-2xl">
                {{ character.name }}
              </h2>
              <div class="flex gap-x-4 my-4">
                <p data-tip="Histórias" class="tooltip tooltip-left ">
                  <Icon name="material-symbols:auto-stories-outline" size="1.5em" />
                  {{ character.stories.available || 0 }}
                </p>
                <p data-tip="Séries" class="tooltip tooltip-right ">
                  <Icon name="material-symbols:live-tv-outline" size="1.5em" />
                  {{ character.series.available || 0 }}
                </p>
              </div>
              <div class="flex flex-row justify-center items-center gap-2">
                <button
                  v-if="character.isFavorite"
                  data-tip="Desfavoritar"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="handleViews('remove', character)"
                >
                  <Icon name="mdi:heart" size="2em" class="text-white" />
                </button>
                <button
                  v-else
                  data-tip="Favoritar"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="handleViews('add', character)"
                >
                  <Icon name="mdi:heart-outline" size="2em" class="text-white" />
                </button>
                <button
                  data-tip="Ver sobre"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="redirect('character', character)"
                >
                  <Icon name="mdi:arrow-right" size="2em" class="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article v-if="currentView === 'series'" class="md:grid md:grid-cols-3 m-8 py-8 mt-20 md:gap-8">
        <div
          v-for="serie in series"
          :key="serie.id"
          class="card border my-8 rounded glassmorphism md:mx-2 hover:scale-105"
        >
          <div class="flex flex-col justify-center items-center py-12">
            <progress v-if="!serie.thumbnail" class="progress rounded-full h-[2em] w-[2em] mb-4"></progress>
            <img v-else :src="serie.thumbnail.path + '.' + serie.thumbnail.extension" class="rounded w-auto h-72 my-8">
            <div class="flex flex-col justify-center items-center">
              <h2 class="text-lg font-bold text-center text-gray-900 sm:text-2xl">
                {{ serie.title }}
              </h2>
              <div class="mt-4 flex flex-row justify-center items-center gap-2">
                <button
                  v-if="serie.isFavorite"
                  data-tip="Desfavoritar"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="handleViews('remove', serie)"
                >
                  <Icon name="mdi:heart" size="2em" class="text-white" />
                </button>
                <button
                  v-else
                  data-tip="Favoritar"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="handleViews('add', serie)"
                >
                  <Icon name="mdi:heart-outline" size="2em" class="text-white" />
                </button>
                <button
                  data-tip="Ver sobre"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="redirect('serie', serie)"
                >
                  <Icon name="mdi:arrow-right" size="2em" class="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article v-if="currentView === 'comics'" class="md:grid md:grid-cols-3 m-8 py-8 mt-20 md:gap-8">
        <div
          v-for="comic in comics"
          :key="comic.id"
          class="card border rounded glassmorphism md:mx-2 hover:scale-105"
        >
          <div class="flex flex-col justify-center items-center py-12">
            <progress v-if="!comic.thumbnail" class="progress rounded-full h-[2em] w-[2em] mb-4"></progress>
            <img v-else :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" class="rounded w-auto h-72 my-8">
            <div class="flex flex-col justify-center items-center">
              <h2 class="text-lg font-bold text-center text-gray-900 sm:text-2xl">
                {{ comic.title }}
              </h2>
              <div class="mt-4 flex flex-row justify-center items-center gap-2">
                <button
                  v-if="comic.isFavorite"
                  data-tip="Desfavoritar"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="handleViews('remove', comic)"
                >
                  <Icon name="mdi:heart" size="2em" class="text-white" />
                </button>
                <button
                  v-else
                  data-tip="Favoritar"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="handleViews('add', comic)"
                >
                  <Icon name="mdi:heart-outline" size="2em" class="text-white" />
                </button>
                <button
                  data-tip="Ver sobre"
                  class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                  type="button"
                  @click="redirect('comic', comic)"
                >
                  <Icon name="mdi:arrow-right" size="2em" class="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div v-if="characters.length <= 0" class="flex justify-center col-span-3">
        <button type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <Icon name="line-md:emoji-frown" size="5em" />
          <span class="mt-2 block text-sm font-semibold">
            {{ $t('kindEmpty') }}
          </span>
        </button>
      </div>

      <div v-if="currentView !== 'favorite'" class="col-span-3 mx-auto">
        <button v-if="currentView === 'characters'" class="animate-pulse  ring-2 ring-lime-300 rounded-full mb-6" @click="handleUpdate('more-characters')">
          <Icon name="mdi:arrow-down" size="3em" />
        </button>
        <button v-if="currentView === 'series'" class="animate-pulse  ring-2 ring-lime-300 rounded-full mb-6" @click="handleUpdate('more-series')">
          <Icon name="mdi:arrow-down" size="3em" />
        </button>
        <button v-if="currentView === 'comics'" class="animate-pulse  ring-2 ring-lime-300 rounded-full mb-6" @click="handleUpdate('more-comics')">
          <Icon name="mdi:arrow-down" size="3em" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useAppStore } from '~/store/app'
import { MarvelCharacter } from '~/types/character'
import { getCharacters, getComics, getSeries } from '~~/helpers/marvel-api'

const app = useAppStore()
const currentView = ref<'characters' | 'series' | 'comics' | 'favorite'>('characters')
const seeingFavorites = ref(false)
const queryCharacter = ref('')
const querySerie = ref('')
const queryComic = ref('')

const characters = ref([{
  id: 0,
  name: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  stories: {
    available: 0
  },
  series: {
    available: 0
  },
  isFavorite: false
}] as MarvelCharacter[])

const series = ref([{
  id: 0,
  title: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  stories: {
    available: 0
  },
  series: {
    available: 0
  },
  isFavorite: false
}] as any)

const comics = ref([{
  id: 0,
  title: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  stories: {
    available: 0
  },
  series: {
    available: 0
  },
  isFavorite: false
}] as any)

const offset = ref(0)

// const favorites = computed(() => characters.value.filter((i: any) => i.isFavorite))

const redirect = (action: string, value: any) => {
  if (action === 'details') {
    characters.value.filter((i: any) => i.id === value.id ? app.setCurrent('character', { ...i }) : null)
    app.setCurrent('character', value)
    navigateTo(`/details/${value.id}`)
  }
  if (action === 'series') {
    app.setCurrent('series', value)
    navigateTo(`/series/${value.id}`)
  }
  if (action === 'comics') {
    app.setCurrent('comics', value)
    navigateTo(`/comics/${value.id}`)
  }
}

const handleViews = (action: string, character?: any) => {
  if (action === 'characters') {
    currentView.value = 'characters'
    handleUpdate('characters')
  }
  if (action === 'series') {
    currentView.value = 'series'
    handleUpdate('series')
  }
  if (action === 'comics') {
    currentView.value = 'comics'
    handleUpdate('comics')
  }

  if (action === 'add') {
    character.isFavorite = true
    app.setFavorites(character)
  }
  if (action === 'remove') {
    character.isFavorite = false
    app.removeFavoriteCharacter(character)
  }

  if (action === 'see') {
    if (app.favorites.length === 0) {
      seeingFavorites.value = false
      alert('Você não tem nenhum character favorito!')
    } else {
      currentView.value = 'favorite'
      characters.value = app.favorites as never
    }
  }
  if (action === 'unsee') {
    currentView.value = 'characters'
    seeingFavorites.value = false
    handleUpdate('characters')
  }
}

const handleUpdate = (action: string, value?: any) => {
  if (action === 'query-character' && value === '') { action = 'characters' }

  if (action === 'characters') {
    getCharacters()
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          characters.value = data.map((i: any) => ({
            ...i,
            thumbnail: i.thumbnail,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'series') {
    getSeries()
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          series.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'comics') {
    getComics()
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          comics.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'more-characters') {
    offset.value += 20
    getCharacters({ offset: offset.value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          characters.value = [
            ...characters.value,
            ...data.map((i: any) => ({
              ...i,
              isFavorite: app.favorites.some((j: any) => j.id === i.id)
            }))
          ]
        }
      })
  }

  if (action === 'more-series') {
    offset.value += 20
    getSeries({ offset: offset.value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          series.value = [
            ...series.value,
            ...data.map((i: any) => ({
              ...i,
              isFavorite: app.favorites.some((j: any) => j.id === i.id)
            }))
          ]
        }
      })
  }

  if (action === 'more-comics') {
    offset.value += 20
    getComics({ offset: offset.value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          comics.value = [
            ...comics.value,
            ...data.map((i: any) => ({
              ...i,
              isFavorite: app.favorites.some((j: any) => j.id === i.id)
            }))
          ]
        }
      })
  }

  if (action === 'query-character') {
    getCharacters({ nameStartsWith: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          characters.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'query-serie') {
    getSeries({ titleStartsWith: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          series.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'query-comic') {
    getComics({ titleStartsWith: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          comics.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      })
  }
}

onMounted(() => {
  handleUpdate('characters')
})

</script>
