<template>
  <section class="text-gray-600 body-font">
    <div class="flex flex-col">
      <div class="m-12 p-12 mx-auto prose rounded h-1/2">
        <img :src="currentSerie.thumbnail.path + '.' + currentSerie.thumbnail.extension" class="rounded-full w-32 h-32 my-8 mx-auto">
        <span class="text-center">
          <h1>{{ currentSerie.name }}</h1>
          <p>{{ currentSerie.description || 'Sem descrição' }}</p>
        </span>
      </div>
      <div class="m-12  mx-auto prose rounded">
        <div class="btn-group flex justify-center">
          <button data-tip="Quadrinhos" :class="[currentTab === 'comics' && 'btn-active', 'btn tooltip']" @click="currentTab = 'comics'">
            <p class="text-white">
              <Icon name="material-symbols:auto-stories-outline" size="1.5em" />
              {{ currentSerie.stories.available }}
            </p>
          </button>
          <button data-tip="Séries" :class="[currentTab === 'series' && 'btn-active', 'btn tooltip']" @click="currentTab = 'series'">
            <p class="text-white">
              <Icon name="material-symbols:live-tv-outline" size="1.5em" />
              {{ currentSerie.series.available }}
            </p>
          </button>
        </div>
        <div v-if="currentTab === 'comics'" class="mt-8">
          <h3 class="text-center">
            Edições em que participa
          </h3>
          <div class="carousel carousel-center w-full space-x-4 bg-neutral rounded-box">
            <div v-for="comic, index in characterComics" :key="comic.title" class="carousel-item">
              <img
                id="comic-{{ index }}"
                :class="handleScroll(index)"
                :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                tabindex="0"
                class="w-40 h-70 px-2 focus:ring-2 ring-lime-200"
                @touchmove="handleScroll(index)"
                @click="handleScroll(index)"
              >
            </div>
          </div>
        </div>
        <div v-if="currentTab === 'series'" class="mt-8">
          <h3>Séries em que participa</h3>
          <div class="carousel carousel-center w-full space-x-4 bg-neutral rounded-box">
            <div v-for="serie in characterSeries" :key="serie.title" class="carousel-item">
              <img :src="serie.thumbnail.path + '.' + serie.thumbnail.extension" class="w-40 h-40">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from '~/store/app'
import { MarvelCharacter } from '~/types/character'

definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})

const app = useAppStore()
const currentTab = ref('comics')
const currentImage = ref('comic-0')
const characterComics = ref([{
  title: '',
  thumbnail: {
    path: '',
    extension: ''
  }
}])
const characterSeries = ref([
  {
    title: '',
    thumbnail: {
      path: '',
      extension: ''
    }
  }
])
const currentSerie = ref({
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

const handleScroll = (index: number) => {
  currentImage.value = `comic-${index}`
}

onMounted(() => {
  if (app.current !== null) {
    currentSerie.value = {
      ...currentSerie.value,
      ...app.current
    }
  } else { navigateTo('/') }
})
</script>