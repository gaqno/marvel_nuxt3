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

      <div class="mt-8 block lg:hidden">
        <button class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
          <span class="text-sm font-medium">
            Filters & Sorting
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
        <div class="hidden space-y-4 lg:block">
          <div>
            <label for="SortBy" class="block text-xs font-medium">
              {{ $t('filter') }}
            </label>

            <select
              id="SortBy"
              v-model="query"
              class="mt-1 rounded border-gray-300 text-sm"
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
            <p class="block text-xs font-medium">
              Filters
            </p>
            <div class="flex flex-col gap-y-3 mt-4">
              <button class="btn btn-primary block w-full">
                {{ $t('characters') }}
              </button>
              <button class="btn btn-primary block w-full">
                {{ $t('series') }}
              </button>
              <button class="btn btn-primary block w-full">
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
const emit = defineEmits(['filter-orderBy'])
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
  }
})
</script>
