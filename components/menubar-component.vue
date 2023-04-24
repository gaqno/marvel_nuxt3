<template>
  <header class="navbar bg-base-100 sticky">
    <!-- <div class="flex-none">
      <button class="btn drawer-button btn-square btn-ghost" @click.prevent="handleDrawer">
        <Icon name="carbon:menu" size="1.5em" />
      </button>
    </div> -->
    <div class="flex-1">
      <button class="btn btn-ghost normal-case text-xl" @click.prevent="navigateTo('/')">
        <span class="ml-3 text-xl">
          <Icon name="ic:round-precision-manufacturing" size="1.5em" class="mr-4" />
          Marvel
        </span>
      </button>
    </div>
    <div class="ml-auto">
      <button class="btn btn-ghost normal-case text-xl" @click="toggleDarkMode">
        <Icon v-if="!darkModeEnabled" name="line-md:moon-alt-to-sunny-outline-loop-transition" size="1em" />
        <Icon v-else name="line-md:sunny-filled-loop-to-moon-filled-loop-transition" size="1em" />
      </button>
    </div>
    <div class="relative">
      <button
        :disabled="app.drawer.show"
        class="bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        @click="popoverLanguage = !popoverLanguage"
      >
        {{ $t('language') }}
      </button>
      <div v-show="popoverLanguage" class="absolute z-10 top-0 right-0 mt-12 w-fit h-fit rounded-md shadow-lg bg-white ring-1 ring-indigo-800 ring-opacity-5">
        <div class="p-2">
          <span class="flex flex-row md:flex-col text-gray-700">
            <NuxtLink :to="switchLocalePath('pt')" class="btn btn-ghost normal-case text-base" @click="popoverLanguage = false">
              <Icon name="game-icons:brazil" size="1em" />
            </NuxtLink>
            <NuxtLink :to="switchLocalePath('cn')" class="btn btn-ghost normal-case text-base" @click="popoverLanguage = false">
              <Icon name="material-symbols:language-chinese-cangjie" size="1em" />
            </NuxtLink>
            <NuxtLink :to="switchLocalePath('kr')" class="btn btn-ghost normal-case text-base" @click="popoverLanguage = false">
              <Icon name="material-symbols:language-korean-latin" size="1em" />
            </NuxtLink>
            <NuxtLink :to="switchLocalePath('en')" class="btn btn-ghost normal-case text-base" @click="popoverLanguage = false">
              <Icon name="icon-park-outline:english" size="1em" />
            </NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAppStore } from '~~/store/app'
const app = useAppStore()
const popoverLanguage = ref(false)
const darkModeEnabled = ref(false)

const toggleDarkMode = () => {
  darkModeEnabled.value = !darkModeEnabled.value
  app.$patch({ theme: darkModeEnabled.value ? 'dark' : 'light' })
}

</script>
