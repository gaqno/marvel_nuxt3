<template>
  <div class="toast">
    <div v-if="app.modal.template === 'info'" class="alert alert-info">
      <div>
        <Icon :name="app.toast.icon" size="2em" />
        <span>{{ app.toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'
const app = useAppStore();
</script>