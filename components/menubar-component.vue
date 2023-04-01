<template>
  <header class="navbar bg-base-100 sticky">
    <div class="flex-none">
      <button @click.prevent="handleDrawer" class="btn btn-square btn-ghost">
        <Icon name="carbon:menu" size="1.5em" />
      </button>
    </div>
    <div class="flex-1">
      <button @click="navigateTo('/')" class="btn btn-ghost normal-case text-xl">
        <span class="ml-3 text-xl">Marvel</span>
      </button>
    </div>
    <div class="ml-auto">
      <button @click="navigateTo('/')" class="btn btn-ghost normal-case text-xl">
        <Icon name="mdi:ab-testing" size="1em" />
      </button>
      <button @click="toggleDarkMode" class="btn btn-ghost normal-case text-xl">
        <Icon v-if="darkModeEnabled" name="line-md:moon-alt-to-sunny-outline-loop-transition" size="1em" />
        <Icon v-else name="line-md:sunny-filled-loop-to-moon-filled-loop-transition" size="1em" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { useAppStore } from '~~/store/app';

const app = useAppStore()
const darkModeEnabled = ref(false)
const handleDrawer = () => {
  app.setDrawer({
    show: true,
    template: 'left-nav',
    data: {}
  })
}

const toggleDarkMode = () => {
  darkModeEnabled.value = !darkModeEnabled.value;
  if (darkModeEnabled.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

</script>