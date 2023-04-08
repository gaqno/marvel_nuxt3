<template>
  <header class="navbar bg-base-100 sticky">
    <div class="flex-none">
      <button class="btn drawer-button btn-square btn-ghost" @click.prevent="handleDrawer">
        <Icon name="carbon:menu" size="1.5em" />
      </button>
    </div>
    <div class="flex-1">
      <button class="btn btn-ghost normal-case text-xl" @click="navigateTo('/')">
        <span class="ml-3 text-xl">
          Marvel
        </span>
      </button>
    </div>
    <div class="ml-auto">
      <button class="btn btn-ghost normal-case text-xl" @click="navigateTo('/')">
        <Icon name="mdi:ab-testing" size="1em" />
      </button>
      <button class="btn btn-ghost normal-case text-xl" @click="toggleDarkMode">
        <Icon v-if="!darkModeEnabled" name="line-md:moon-alt-to-sunny-outline-loop-transition" size="1em" />
        <Icon v-else name="line-md:sunny-filled-loop-to-moon-filled-loop-transition" size="1em" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { useAppStore } from '~~/store/app'

const app = useAppStore()
const darkModeEnabled = ref(false)
const handleDrawer = () =>
  app.setDrawer({
    show: true,
    template: 'navigation',
    data: {}
  })

const toggleDarkMode = () => {
  darkModeEnabled.value = !darkModeEnabled.value
  if (darkModeEnabled.value) { app.$patch({ theme: 'light' }) } else { app.$patch({ theme: 'dark' }) }
}

</script>
