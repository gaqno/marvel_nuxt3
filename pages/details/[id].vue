<template>
  <section class="text-gray-600 body-font">
    <div class="flex flex-row">
      <div class="m-12 p-12 mx-auto prose border rounded h-1/2">
        <img :src="currentCharacter.thumbnail.path + '.' + currentCharacter.thumbnail.extension" class="rounded-full w-32 h-32 my-8 mx-auto" />
        <span class="text-center">
          <h1>{{ currentCharacter.name }}</h1>
          <p>{{ currentCharacter.description || 'Sem descrição' }}</p>
        </span>
      
      </div>
      <div class="m-12 p-12 mx-auto prose border rounded h-1/2">
        <div class="btn-group flex justify-center">
          <button @click="currentTab = 'comics'" data-tip="Histórias" :class="[currentTab === 'comics' && 'btn-active', 'btn tooltip']">
            <p class="text-white">
              <Icon name="material-symbols:auto-stories-outline" size="1.5em" />
              {{ currentCharacter.stories.available }}
            </p>
          </button>
          <button @click="currentTab = 'series'" data-tip="Histórias" :class="[currentTab === 'series' && 'btn-active', 'btn tooltip']">
            <p class="text-white">
              <Icon name="material-symbols:live-tv-outline" size="1.5em" />
              {{ currentCharacter.series.available }}
            </p>
          </button>
          </div>
        <div v-if="currentTab === 'comics'" class="mt-8 p-4 overflow-y-auto scrollbar scrollbar-thin h-3/4">
          <h3>Edições em que participa</h3>
          <p v-for="comic in currentCharacter.comics.items" :key="comic.name">
            {{ comic.name }}
          </p>
        </div>
        <div v-if="currentTab === 'series'" class="mt-8 p-4 overflow-y-auto scrollbar scrollbar-thin h-1/2">
          <h3>Séries em que participa</h3>
          <p v-for="serie in currentCharacter.series.items" :key="serie.name">
            {{ serie.name }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import { useAppStore } from '~~/store/app';

definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})

const app = useAppStore()
const currentTab = ref('comics')
const currentCharacter = ref({
  name: '',
  description: '',
  series: {
    available: 0
  },
  stories: {
    available: 0
  },
  comics: {
    available: 0
  },
  thumbnail: {
    path: '',
    extension: ''
  }
} as MarvelCharacter)

onMounted(() => {
  if (app.currentCharacter !== null) {
    currentCharacter.value = { ...currentCharacter.value, ...app.currentCharacter }
  } 
})

</script>