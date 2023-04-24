<template>
  <section>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header>
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
          {{ props.title }}
        </h2>

        <p class="mt-4 max-w-md text-gray-500">
          {{ props.description }}
        </p>
      </header>

      <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
        <div class="space-y-4">
          <div>
            <label for="SortBy" class="block text-xs font-medium">
              {{ $t('filter') }}
            </label>

            <select
              id="SortBy"
              v-model="query"
              class="my-2 rounded border-gray-300 text-sm"
              @change="emit('filter-orderBy', query)"
            >
              <option value="modified">
                {{ $t('modified_asc') }}
              </option>
              <option value="-modified">
                {{ $t('modified_desc') }}
              </option>
              <option v-if="template === 'characters'" value="name">
                {{ $t('name_asc') }}
              </option>
              <option v-if="template === 'characters'" value="-name">
                {{ $t('name_desc') }}
              </option>
              <option v-if="template === 'default'" value="title">
                {{ $t('title_asc') }}
              </option>
              <option v-if="template === 'default'" value="-title">
                {{ $t('title_desc') }}
              </option>
            </select>
          </div>

          <div v-if="props.template === 'favorites'">
            <div class="flex flex-col gap-y-3 mt-4">
              <button class="btn bg-red-700 block w-full" @click="emit('favorites-characters', 'characters')">
                {{ $t('characters') }}
              </button>
              <button class="btn bg-red-700 block w-full" @click="emit('favorites-series', 'series')">
                {{ $t('series') }}
              </button>
              <button class="btn bg-red-700 block w-full" @click="emit('favorites-comics', 'comics')">
                {{ $t('comics') }}
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <slot name="options"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['filter-orderBy', 'favorites-characters', 'favorites-series', 'favorites-comics'])
const query = ref('name')
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  template: {
    type: String,
    required: false,
    default: 'characters'
  },
  selected: {
    type: String,
    required: false,
    default: 'character'
  }
})
</script>
