<template>
  <div class="container mx-auto">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <section class="overflow-hidden rounded bg-[url(https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center bg-no-repeat">
        <div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="glassmorphism md:text-center p-4 text-center sm:text-left">
            <h2 class="text-2xl font-bold text-red-600 sm:text-3xl md:text-5xl">
              MARVEL 🤖
            </h2>

            <span class="hidden max-w-lg mx-auto text-white/90 md:mt-6 md:block md:text-lg ">
              Bem vindo ao MarvelDetails, um projeto que visa mostrar os detalhes de personagens da Marvel.
            </span>

            <div class="flex flex-row float-right my-8 gap-4">
              <button @click.prevent="currentView = 'characters'" data-tip="Personagens"
                :class="[currentView === 'characters' ? 'ring-2 ring-yellow-400' : '', 'tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button">
                <Icon name="mdi:bug" size="2em" :class="currentView === 'characters' ? 'text-yellow-400' : ''" />
                <span class="inline-flex px-2">Personagens</span>
              </button>
              <button @click.prevent="currentView = 'series'" data-tip="Séries"
                :class="[currentView === 'series' ? 'ring-2 ring-yellow-400' : '','tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button">
                <Icon name="fluent:movies-and-tv-16-regular" size="2em" :class="currentView === 'characters'" />
                <span class="inline-flex px-2">Séries</span>
              </button>
              <button @click.prevent="currentView = 'comics'" data-tip="Quadrinhos"
                :class="[currentView === 'comics' ? 'ring-2 ring-yellow-400' : '','tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button">
                <Icon name="material-symbols:menu-book-outline-sharp" size="2em" :class="currentView === 'characters'" />
                <span class="inline-flex px-2">Quadrinhos</span>
              </button>
              <button v-if="currentView !== 'favorite'" @click.prevent="handleFavorite('see')" data-tip="Ver favoritos"
                :class="[currentView === 'favorite' ? 'ring-2 ring-yellow-400' : '','tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                type="button">
                <Icon name="mdi:heart-box" size="2em" />
                <span class="inline-flex px-2">Favoritos</span>
              </button>
              <button v-else @click="handleFavorite('unsee')" data-tip="Voltar"
                  :class="[currentView === 'favorite' ? 'ring-2 ring-yellow-400' : '', 'tooltip block rounded-full bg-red-800 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring']"
                  type="button">
                <Icon name="mdi:heart-box" size="2em" />
                <span class="inline-flex px-2">Voltar</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <input 
      @keydown.enter="handleUpdate('query', query)" 
      v-model="query" 
      type="text"
      class="flex rounded-lg mx-auto w-[3/4] md:w-[50vw] h-10 px-4" 
      placeholder="Procure por personagens!" />

    <section v-if="app.isLoading === true">
      <div v-for="_i, ind in 4" :key="'skeleton_1_'+ind" class="grid grid-cols-1 md:grid-cols-3 m-8 gap-10">
        <div v-for="_i, ind2 in 3" :key="'skeleton_2_'+ind2" class="col-span-1 flex flex-col justify-center items-center border rounded">
          <progress class="progress rounded-full h-[8em] w-[8em] my-14" />
          <progress class="progress rounded-full h-50 w-20 " />
          <div class="m-4">
            <progress class="progress rounded-full h-[2em] w-[2em] mb-4" />
            <span class="mx-2" />
            <progress class="progress rounded-full h-[2em] w-[2em] mb-4" />
          </div>
        </div>
      </div>
    </section>

    <div v-else class="flex flex-col md:grid md:grid-cols-3 gap-8 m-8 mt-20 max">
      <div v-for="character in characters" :key="character.id" class="card border rounded glassmorphism">
        <div class="flex flex-col justify-center items-center py-12">
          <progress v-if="!character.thumbnail" class="progress rounded-full h-[2em] w-[2em] mb-4" />
          <img v-else :src="character.thumbnail.path + '.' + character.thumbnail.extension" class="rounded-full w-32 h-32 my-8" />
          <div class="flex flex-col justify-center items-center">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
              {{ character.name }}
            </h2>
            <div class="flex gap-x-4 my-4">
              <p data-tip="Histórias" class="tooltip tooltip-left ">
                <Icon name="material-symbols:auto-stories-outline" size="1.5em" />
                {{  character.stories.available || 0 }}
              </p>
              <p data-tip="Séries" class="tooltip tooltip-right ">
                <Icon name="material-symbols:live-tv-outline" size="1.5em" />
                {{  character.series.available || 0 }}
              </p>
            </div>
            <div class="flex flex-row justify-center items-center gap-2">
              <button v-if="character.isFavorite" @click="handleFavorite('remove', character)"
                data-tip="Desfavoritar" class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                type="button">
                <Icon name="mdi:heart" size="2em" :class="currentView === 'characters'" class="text-white"/>
              </button>
              <button v-else @click="handleFavorite('add', character)"
                data-tip="Favoritar" class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                type="button">
                <Icon name="mdi:heart-outline" size="2em" :class="currentView === 'characters'" class="text-white" />
              </button>
              <button @click="redirect(character)"
                data-tip="Ver sobre" class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium  transition hover:bg-red-700 focus:outline-none focus:ring"
                type="button">
                <Icon name="mdi:arrow-right" size="2em" :class="currentView === 'characters'" class="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="characters.length <= 0" class="flex justify-center col-span-3">
        <button type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <Icon name="line-md:emoji-frown" size="5em" />
          <span class="mt-2 block text-sm font-semibold">Meio vázio por aqui...</span>
        </button>
      </div>
      
      <div v-if="currentView !== 'favorite'" class="col-span-3 mx-auto">
        <button @click="handleUpdate('more')" class="animate-pulse  ring-2 ring-lime-300 rounded-full mb-6">
          <Icon name="mdi:arrow-down" size="3em" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import { useAppStore } from '~/store/app';
import { getCharacters } from '~~/helpers/marvel-api';

const app = useAppStore();
const query = ref('');
const seeingFavorites = ref(false);
const currentView = ref('characters');
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
}] as MarvelCharacter[]);
const offset = ref(0);

// create a computed that returns all the isFavorite property of the current character
const favorites = computed(() => characters.value.filter((i: any) => i.isFavorite));
console.log(favorites)

const redirect = (character: any) => {
  characters.value.filter((i: any) => i.id === character.id ? app.setCurrentCharacter({ ...i }) : null)
  navigateTo(`/details/${character.id}`)
}

const handleFavorite = (action: string, character?: any) => {
  if (action === 'add') {
    character.isFavorite = true;
    app.setFavorites(character)
  }
  if (action === 'remove') {
    character.isFavorite = false;
    app.removeFavoriteCharacter(character)
  }

  if (action === 'see') {
    if (app.favorites.length === 0) {
      seeingFavorites.value = false;
      alert('Você não tem nenhum character favorito!')
    } else {
      currentView.value = 'favorite'
      characters.value = app.favorites as never;
      console.log(app.favorites)
    }

  }
  if (action === 'unsee') {
    currentView.value = 'characters';
    seeingFavorites.value = false;
    handleUpdate('fetch')
  }
}

const handleUpdate = (action: string, value?: any) => {
  if (action === 'query' && value === '') { action = 'fetch'; }

  if (action === 'fetch') {
    getCharacters()
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data.results
          characters.value = data.map((i: any) => ({
            ...i,
            thumbnail: i.thumbnail,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      });
  }
  
  if (action === 'more') {
    offset.value += 20;
    getCharacters({ offset: offset.value})
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data.results
          characters.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      });
  }

  if (action === 'query') {
    getCharacters({ nameStartsWith: value })
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data.results
          characters.value = data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))
        }
      });
  } else return
};

onMounted(() => {
  handleUpdate('fetch');
})

</script>