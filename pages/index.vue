<template>
  <div class="container mx-auto">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <div class="">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900">
            MARVEL API
          </h1>
          <p class="mt-1.5 text-sm text-gray-500">
            É hora de ver alguns personagens! 🎉
          </p>
        </div>

        <div class="mt-4 flex flex-col gap-4">
          <button v-if="!seeingFavorites" @click="handleFavorite('see')" data-tip="Ver favoritos"
            class="tooltip block rounded-full bg-indigo-600 p-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button">
            <Icon name="mdi:heart-box" size="2em" />
            <span class="inline-flex px-2">Favoritos</span>
          </button>
          <button v-else @click="handleFavorite('unsee')" data-tip="Voltar"
            class="tooltip block rounded-full bg-indigo-600 p-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button">
            <Icon name="mdi:heart-box" size="2em" />
            <span class="inline-flex px-2">Voltar</span>
          </button>
          <button @click="handleDrawer" data-tip="Filtrar busca"
            class="tooltip block rounded-full bg-indigo-600 p-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button">
            <Icon name="mdi:filter-outline" size="2em" />
            <span class="inline-flex px-2">Filtros</span>
          </button>
        </div>
      </div>
    </div>

    <input 
      @keydown.enter="handleUpdate('query', query)" 
      v-model="query" 
      type="text"
      class="flex rounded-lg w-1/2 h-10 mx-auto px-4" 
      placeholder="Procure por personagens!" />

    <section v-if="app.isLoading === true">
      <div v-for="_i, ind in 4" :key="'skeleton_1_'+ind" class="grid grid-cols-3 m-8 gap-10">
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

    <div v-else class="flex flex-col gap-8 m-8 mt-20 max">
      <div v-for="character in characters" :key="character.id" class="border rounded">
        <div class="flex flex-col justify-center items-center py-12">
          <progress v-if="!character.thumbnail.path" class="progress" />
          <img v-else :src="character.thumbnail.path + '.' + character.thumbnail.extension" class="rounded-full w-32 h-32 my-8" />
          <div class="flex flex-col justify-center items-center">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              {{ character.name }}
            </h2>
            <div class="flex gap-x-4 my-4">
              <p data-tip="Histórias" class="tooltip tooltip-left text-white">
                <Icon name="material-symbols:auto-stories-outline" size="1.5em" />
                {{  character.stories.available }}
              </p>
              <p data-tip="Séries" class="tooltip tooltip-right text-white">
                <Icon name="material-symbols:live-tv-outline" size="1.5em" />
                {{  character.series.available }}
              </p>
            </div>
            <div class="flex flex-row justify-center items-center gap-2">
              <button v-if="character.isFavorite" @click="handleFavorite('remove', character)"
                data-tip="Desfavoritar" class="tooltip block rounded-full bg-red-600 p-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring"
                type="button">
                <Icon name="mdi:heart" size="2em" />
              </button>
              <button v-else @click="handleFavorite('add', character)"
                data-tip="Favoritar" class="tooltip block rounded-full bg-indigo-600 p-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button">
                <Icon name="mdi:heart-outline" size="2em" />
              </button>
              <button @click="redirect(character)"
                data-tip="Ver sobre" class="tooltip block rounded-full bg-indigo-600 p-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button">
                <Icon name="mdi:arrow-right" size="2em" />
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
      
      <div class="col-span-3 mx-auto">
        <button @click="handleUpdate('more')" class="animate-pulse text-white ring-2 ring-lime-300 rounded-full mb-6">
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
const characters = ref([] as MarvelCharacter[]);
const offset = ref(0);

const redirect = (character: any) => {
  characters.value.filter((i: any) => i.id === character.id ? app.setCurrentCharacter({ ...i }) : null)
  navigateTo(`/details/${character.id}`)
}

const handleFavorite = (action: 'add' | 'remove' | 'see' | 'unsee', character?: any) => {
  if (action === 'add') {
    character.isFavorite = true;
    app.setFavoriteCharacter(character)
  }
  if (action === 'remove') {
    character.isFavorite = false;
    app.removeFavoriteCharacter(character)
  }
  if (action === 'see') {
    if (app.favorites.length === 0) {
      alert('Você não tem nenhum character favorito!')
      return
    } else {
      seeingFavorites.value = true;
      characters.value = app.favorites
    }
  }
  if (action === 'unsee') {
    seeingFavorites.value = false;
    handleUpdate('fetch')
  }
}

const handleUpdate = (action: 'fetch' | 'more' | 'query', value?: any) => {
  console.log('passei-handleUpdate')
  if (action === 'query' && value === '') {
    action = 'fetch';
  }

  if (action === 'fetch') {
    getCharacters()
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
  if (action === 'more') {
    offset.value += 20;
    getCharacters({ offset: offset.value})
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data.results
          characters.value = [...characters.value, ...data.map((i: any) => ({
            ...i,
            isFavorite: app.favorites.some((j: any) => j.id === i.id)
          }))]
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



const handleDrawer = () => {
  app.setDrawer({
    show: app.drawer.show ? false : true,
    template: app.drawer.show ? 'filters' : '',
    data: {}
  })
}

onMounted(() => {
  handleUpdate('fetch');
  // app.setModal({
  //   show: false,
  //   template: 'landing',
  //   data: {}
  // })
})

</script>