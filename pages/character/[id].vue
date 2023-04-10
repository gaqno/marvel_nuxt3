<template>
  <section class="text-gray-600 body-font">
    <div class="flex flex-col">
      <div class="m-12 p-12 mx-auto prose rounded h-1/2">
        <img
          :src="currentCharacter.thumbnail.path + '.' + currentCharacter.thumbnail.extension"
          class="w-62 h-auto rounded my-8 mx-auto"
        >
        <span class="text-center">
          <dt>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Quadrinhos
            </h3>
          </dt>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MarvelCharacter } from '~/types/character'
import { useAppStore } from '~/store/app'

const app = useAppStore()
definePageMeta({
  title: 'Detalhes do personagem',
  description: 'Detalhes do personagem'
})

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
  if (app.current !== null) {
    currentCharacter.value = {
      ...currentCharacter.value,
      ...app.current
    }
  } else { navigateTo('/') }
})
</script>
