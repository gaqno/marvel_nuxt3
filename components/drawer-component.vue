<template>
  <div className="drawer">
    <input
      id="my-drawer"
      v-model="app.drawer.show"
      type="checkbox"
      className="drawer-toggle"
    >
    <div className="drawer-content">
      <!-- Page content here -->
      <NuxtPage />
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <section v-if="app.drawer.template === 'navigation'" class="prose">
          <h3>{{ $t('thanksForVisiting') }}</h3>
          <p>{{ $t('siteBuild') }}</p>
          <ul class="menu bg-base-100 w-56 p-2 rounded-box prose">
            <li class="menu-title">
              <span class="text-gray-700">
                {{ $t('franeworks') }}
              </span>
            </li>
            <span class="ml-4">
              <Icon name="carbon:logo-vue" />
              Vue 3
            </span>
            <span class="ml-4">
              <Icon name="simple-icons:nuxtdotjs" />
              Nuxt 3
            </span>
            <span class="ml-4">
              <Icon name="simple-icons:tailwindcss" />
              TailwindCSS
            </span>
            <span class="ml-4">
              <Icon name="fluent-emoji-flat:pineapple" />
              Pinia
            </span>
          </ul>
          <h3 class="text-center">
            {{ $t('repository') }}
          </h3>
          <a href="https://github.com/gaqno" target="_blank" class="btn w-full">
            <Icon name="carbon:logo-github" size="2em" />
            <span class="ml-2">
              gaqno
            </span>
          </a>
          <a href="https://linkedin.com/inw/gaqno" target="_blank" class="btn w-full mt-4">
            <Icon name="mdi:linkedin" size="2em" />
            <span class="ml-2">
              Gabriel Aquino
            </span>
          </a>
        </section>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '~~/store/app'
const app = useAppStore()

</script>
