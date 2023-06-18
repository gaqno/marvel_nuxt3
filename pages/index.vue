<template>
  <div class="container mx-auto">
    <header>
      <div class="mx-auto max-w-screen-xl px-4 py-8">
        <section class="overflow-hidden rounded bg-[url(/assets/dashboard.jpeg)] bg-cover bg-center bg-no-repeat">
          <div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
            <div class="glassmorphism md:text-center p-4 text-center sm:text-left">
              <h2 class="text-4xl font-bold text-red-600 sm:text-3xl md:text-5xl">
                MARVEL
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

      <span class="flex flex-row mx-12">
        <input
          v-if="currentView === 'characters'"
          v-model="queryCharacter"
          type="text"
          class="flex rounded-lg w-fit mx-auto md:w-[50vw] h-10 px-4 mt-1"
          :placeholder="$t('lookForCharacters')"
          @keydown.enter="handleUpdate('query-character', queryCharacter)"
        >
        <button v-if="currentView === 'characters'" class="flex md:hidden btn btn-circle" @click="handleUpdate('query-character', queryCharacter)">
          <Icon name="mdi:magnify" size="2em" />
        </button>
      </span>
      <span class="flex flex-row mx-12">
        <input
          v-if="currentView === 'series'"
          v-model="querySerie"
          type="text"
          class="flex rounded-lg w-fit mx-auto md:w-[50vw] h-10 px-4 mt-1"
          :placeholder="$t('lookForSeries')"
          @keydown.enter="handleUpdate('query-serie', querySerie)"
        >
        <button v-if="currentView === 'series'" class="flex md:hidden btn btn-circle" @click="handleUpdate('query-character', queryCharacter)">
          <Icon name="mdi:magnify" size="2em" />
        </button>
      </span>
      <span class="flex flex-row mx-12">
        <input
          v-if="currentView === 'comics'"
          v-model="queryComic"
          type="text"
          class="flex rounded-lg w-fit mx-auto md:w-[50vw] h-10 px-4 mt-1"
          :placeholder="$t('lookForComics')"
          @keydown.enter="handleUpdate('query-comic', queryComic)"
        >
        <button v-if="currentView === 'comics'" class="flex md:hidden btn btn-circle" @click="handleUpdate('query-character', queryCharacter)">
          <Icon name="mdi:magnify" size="2em" />
        </button>
      </span>
    </header>

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

    <section v-else class="flex flex-col">
      <article v-if="currentView === 'characters'">
        <FilterComponent
          template="characters"
          :description="$t('charactersDescription')"
          :title="$t('characters')"
          @filter-order-by="handleUpdate('characters-order', $event)"
        >
          <template #options>
            <div class="lg:col-span-3 mt-6">
              <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <li v-for="character in characters" :key="character.id" class="shadow-lg rounded-lg">
                  <a class="group relative block bg-black">
                    <progress v-if="!character.thumbnail.path" class="progress absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"></progress>
                    <img
                      v-else
                      alt="character"
                      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
                      class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    >

                    <div class="relative p-4 sm:p-6 lg:p-8 h-full md:min-h-[45vh] md:max-h-[45vh]">
                      <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {{ character.name }}
                      </p>

                      <p class="text-xl font-bold text-white sm:text-2xl">
                        {{ character.name }}
                      </p>

                      <div class="mt-32 sm:mt-48 lg:mt-64">
                        <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p class="text-sm text-white truncate">
                            {{ character.description || $t('noDescription') }}
                          </p>
                          <div class="flex flex-col gap-4 justify-between mt-6">
                            <button v-if="!character.isFavorite" class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('character-favorited', character)">
                              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                              {{ $t('favorited') }}
                            </button>
                            <button v-else class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('character-desfavorited', character)">
                              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                              {{ $t('desfavorited') }}
                            </button>
                            <button class="btn btn-ghost text-red-500 glassmorphism" @click="navigateTo(`character/${character.id}`)">
                              <Icon name="mdi:chevron-double-right" size="1.5em" class="mr-4" />
                              {{ $t('details') }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex justify-center mt-8 z-10">
              <button class="animate-pulse ring-2 ring-lime-300 rounded-full mb-6" @click="handleUpdate('more-characters')">
                <Icon name="mdi:arrow-down" size="3em" />
              </button>
            </div>
          </template>
        </FilterComponent>
      </article>

      <article v-if="currentView === 'series'">
        <FilterComponent
          :description="$t('seriesDescription')"
          :title="$t('series')"
          @filterOrderBy="handleUpdate('series-order', $event)"
        >
          <template #options>
            <div class="lg:col-span-3 mt-6">
              <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <li v-for="serie in series" :key="serie.id" class="shadow-lg rounded-lg">
                  <a class="group relative block bg-black">
                    <progress v-if="!serie.thumbnail.path" class="progress absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"></progress>
                    <img
                      v-else
                      alt="serie"
                      :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
                      class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    >

                    <div class="relative p-4 sm:p-6 lg:p-8 min-h-[50vh]">
                      <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {{ serie.title }}
                      </p>

                      <p class="text-xl font-bold text-white sm:text-2xl">
                        {{ serie.title }}
                      </p>

                      <div class="mt-32 sm:mt-48 lg:mt-64">
                        <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p class="text-sm text-white">
                            {{ serie.description || $t('noDescription') }}
                          </p>
                          <div class="flex flex-col gap-4 justify-between mt-6">
                            <button v-if="!serie.isFavorite" class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('serie-favorited', serie)">
                              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                              {{ $t('favorited') }}
                            </button>
                            <button v-else class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('serie-desfavorited', serie)">
                              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                              {{ $t('desfavorited') }}
                            </button>
                            <button class="btn btn-ghost text-red-500 glassmorphism" @click="navigateTo(`serie/${serie.id}`)">
                              <Icon name="mdi:chevron-double-right" size="1.5em" class="mr-4" />
                              {{ $t('details') }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex justify-center mt-8">
              <button class="animate-pulse ring-2 ring-lime-300 rounded-full mb-6" @click="handleUpdate('more-series')">
                <Icon name="mdi:arrow-down" size="3em" />
              </button>
            </div>
          </template>
        </FilterComponent>
      </article>

      <article v-if="currentView === 'comics'">
        <FilterComponent
          :description="$t('comicsDescription')"
          :title="$t('comics')"
          @filterOrderBy="handleUpdate('comics-order', $event)"
        >
          <template #options>
            <div>
              <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <li v-for="comic in comics" :key="comic.id" class="shadow-lg rounded-lg">
                  <a :href="`comic/${comic.id}`" class="group relative block bg-black">
                    <progress v-if="!comic.thumbnail.path" class="progress absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"></progress>
                    <img
                      v-else
                      alt="comic"
                      :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                      class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    >

                    <div class="relative p-4 sm:p-6 lg:p-8 min-h-[50vh]">
                      <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {{ comic.title }}
                      </p>

                      <p class="text-xl font-bold text-white sm:text-2xl">
                        {{ comic.title }}
                      </p>

                      <div class="mt-32 sm:mt-48 lg:mt-64">
                        <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p class="text-sm text-white">
                            {{ comic.description || $t('noDescription') }}
                          </p>
                          <div class="flex flex-col gap-4 justify-between mt-6">
                            <button v-if="!comic.isFavorite" class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('comic-favorited', comic)">
                              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                              {{ $t('favorited') }}
                            </button>
                            <button v-else class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('comic-desfavorited', comic)">
                              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                              {{ $t('desfavorited') }}
                            </button>
                            <button class="btn btn-ghost text-red-500 glassmorphism" @click="navigateTo(`comic/${comic.id}`)">
                              <Icon name="mdi:chevron-double-right" size="1.5em" class="mr-4" />
                              {{ $t('details') }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex justify-center mt-8">
              <button class="animate-pulse ring-2 ring-lime-300 rounded-full mb-6" @click="handleUpdate('more-comics')">
                <Icon name="mdi:arrow-down" size="3em" />
              </button>
            </div>
          </template>
        </FilterComponent>
      </article>

      <article v-if="currentView === 'favorite'">
        <FilterComponent
          template="favorites"
          :description="$t('comicsDescription')"
          :title="$t('comics')"
          @filter-orderBy="handleUpdate('characters-order', $event)"
          @favorites-characters="handleUpdate('favorites-characters', $event)"
          @favorites-series="handleUpdate('favorites-series', $event)"
          @favorites-comics="handleUpdate('favorites-comics', $event)"
        >
          <template #options>
            <div class="lg:col-span-3 mt-6">
              <ul v-if="favoriteTab === 'characters'" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <li v-for="character in favorites" :key="character.id" class="shadow-lg rounded-lg">
                  <a href="#" class="group relative block bg-black">
                    <img
                      alt="character"
                      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
                      class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    >

                    <div class="relative p-4 sm:p-6 lg:p-8 min-h-[50vh]">
                      <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {{ character.name }}
                      </p>

                      <p class="text-xl font-bold text-white sm:text-2xl">
                        {{ character.name }}
                      </p>

                      <div class="mt-32 sm:mt-48 lg:mt-64">
                        <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p class="text-sm text-white">
                            {{ character.description || $t('noDescription') }}
                          </p>
                          <div class="flex justify-between mt-6">
                            <button v-if="!character.isFavorite" class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('character-favorited', character)">
                              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                              {{ $t('favorited') }}
                            </button>
                            <button v-else class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('character-desfavorited', character)">
                              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                              {{ $t('desfavorited') }}
                            </button>
                            <button class="btn btn-circle bg-red-600 border-0 text-white" @click="redirect('character', character)">
                              <Icon name="mdi:chevron-double-right" size="1.5em" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>

              <ul v-if="favoriteTab === 'series'" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <li v-for="serie in series" :key="serie.id" class="shadow-lg rounded-lg">
                  <a href="#" class="group relative block bg-black">
                    <img
                      alt="serie"
                      :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
                      class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    >

                    <div class="relative p-4 sm:p-6 lg:p-8 min-h-[50vh]">
                      <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {{ serie.title }}
                      </p>

                      <p class="text-xl font-bold text-white sm:text-2xl">
                        {{ serie.title }}
                      </p>

                      <div class="mt-32 sm:mt-48 lg:mt-64">
                        <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p class="text-sm text-white">
                            {{ serie.description || $t('noDescription') }}
                          </p>
                          <div class="flex justify-between mt-6">
                            <button v-if="!serie.isFavorite" class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('serie-favorited', serie)">
                              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                              {{ $t('favorited') }}
                            </button>
                            <button v-else class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('serie-desfavorited', serie)">
                              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                              {{ $t('desfavorited') }}
                            </button>
                            <button class="btn btn-circle bg-red-600 border-0 text-white" @click="redirect('serie', serie)">
                              <Icon name="mdi:chevron-double-right" size="1.5em" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>

              <ul v-if="favoriteTab === 'comics'" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <li v-for="comic in comics" :key="comic.id" class="shadow-lg rounded-lg">
                  <a href="#" class="group relative block bg-black">
                    <img
                      alt="comic"
                      :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                      class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    >

                    <div class="relative p-4 sm:p-6 lg:p-8 min-h-[50vh]">
                      <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {{ comic.title }}
                      </p>

                      <p class="text-xl font-bold text-white sm:text-2xl">
                        {{ comic.title }}
                      </p>

                      <div class="mt-32 sm:mt-48 lg:mt-64">
                        <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p class="text-sm text-white truncate">
                            {{ comic.description || $t('noDescription') }}
                          </p>
                          <div class="flex justify-between mt-6">
                            <button v-if="!comic.isFavorite" class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('comic-favorited', comic)">
                              <Icon name="ic:round-favorite-border" size="1.5em" class="mr-4" />
                              {{ $t('favorited') }}
                            </button>
                            <button v-else class="btn btn-ghost text-red-500 glassmorphism" @click="handleViews('comic-desfavorited', comic)">
                              <Icon name="ic:sharp-favorite" size="1.5em" class="mr-4" />
                              {{ $t('desfavorited') }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>

              <div v-if="characters.length <= 0 || series.length <= 0 || series.length <= 0" class="flex justify-center col-span-3">
                <button type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <Icon name="line-md:emoji-frown" size="5em" />
                  <span class="p-2 block text-sm font-semibold">
                    {{ $t('kindEmpty') }}
                  </span>
                </button>
              </div>
            </div>
          </template>
        </FilterComponent>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">

import { useAppStore } from '~/store/app'
import { Character } from '~/types/character'
import { Comic } from '~/types/comic'
import { Serie } from '~/types/serie'
import { getCharacters, getComics, getSeries } from '~~/helpers/marvel-api'

const app = useAppStore()
const currentView = ref<'characters' | 'series' | 'comics' | 'favorite'>('characters')
const favoriteTab = ref<'characters' | 'series' | 'comics'>('characters')
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
} as Character])

const series = ref([{
  comics: {
    items: [],
    available: 0
  },
  id: 0,
  characters: {
    items: [],
    available: 0
  },
  description: '',
  title: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  stories: {
    items: [],
    available: 0
  },
  series: {
    items: [],
    available: 0
  },
  isFavorite: false
} as Serie])

const comics = ref([{
  id: 0,
  title: '',
  characters: {
    items: [{
      name: '',
      resourceURI: ''
    }],
    available: 0
  },
  description: '',
  thumbnail: {
    path: '',
    extension: ''
  },
  stories: {
    items: [],
    available: 0
  },
  series: {
    items: [],
    available: 0
  },
  isFavorite: false
} as Comic])

const offset = ref(0)

const favorites = computed(() => characters.value.filter((i: any) => i.isFavorite))

const redirect = (action: string, value: any) => {
  if (action === 'character') {
    app.setCurrent('character', value)
    navigateTo(`/character/${value.id}`)
  }
  if (action === 'serie') {
    app.setCurrent('serie', value)
    navigateTo(`/serie/${value.id}`)
  }
  if (action === 'comic') {
    app.setCurrent('comic', value)
    navigateTo(`/comic/${value.id}`)
  }
}

const handleViews = (action: string, data?: any) => {
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

  if (action === 'see') {
    currentView.value = 'favorite'
    app.getFavorites.characters.length === 0 &&
      app.getFavorites.series.length === 0 &&
      app.getFavorites.comics.length === 0 &&
      (seeingFavorites.value = false) &&
      alert('Você não tem nenhum favorito!')
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
            isFavorite: app.getFavorites.characters.some((j: any) => j.id === i.id)
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
            isFavorite: app.getFavorites.series.some((j: any) => j.id === i.id)
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
            isFavorite: app.getFavorites.comics.some((j: any) => j.id === i.id)
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
              isFavorite: app.getFavorites.characters.some((j: any) => j.id === i.id)
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
              isFavorite: app.getFavorites.series.some((j: any) => j.id === i.id)
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
              isFavorite: app.getFavorites.comics.some((j: any) => j.id === i.id)
            }))
          ]
        }
      })
  }

  if (action === 'query-character') {
    characters.value = []
    getCharacters({ nameStartsWith: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          characters.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.getFavorites.characters.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'query-serie') {
    series.value = []
    getSeries({ titleStartsWith: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          series.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.getFavorites.series.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'query-comic') {
    comics.value = []
    getComics({ titleStartsWith: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          comics.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.getFavorites.comics.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'characters-order') {
    characters.value = []
    getCharacters({ orderBy: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          characters.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.getFavorites.characters.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'series-order') {
    series.value = []
    getSeries({ orderBy: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          series.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.getFavorites.series.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'comics-order') {
    comics.value = []
    getComics({ orderBy: value })
      .then((res: any) => {
        if (res.code === 200) {
          const data = res.data.results
          comics.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.getFavorites.comics.some((j: any) => j.id === i.id)
          }))
        }
      })
  }

  if (action === 'favorites-characters') {
    characters.value = app.getFavorites.characters
    favoriteTab.value = value
  }

  if (action === 'favorites-series') {
    series.value = app.getFavorites.series
    favoriteTab.value = value
  }

  if (action === 'favorites-comics') {
    comics.value = app.getFavorites.comics
    favoriteTab.value = value
  }
  app.setLoading(false)
}

onMounted(() => {
  app.setLoading(true)
  handleUpdate('characters')
})
</script>
