<template>
  <NuxtLayout :data-theme="app.theme">
    <DrawerComponent v-if="app.isDrawer" />
    <LoadingComponent v-if="app.isLoading" />
    <ModalComponent v-if="app.isModal" />
    <ToastComponent v-if="app.isToast" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAppStore } from './store/app'

const app = useAppStore()

watchEffect(() => {
  if (app.toast.show === true) {
    setTimeout(() => {
      app.setToast({ show: false })
      clearTimeout()
    }, 3000)
  }
})

onMounted(() => {
  watchEffect(() => {
    if (app.favorites.length === 0 && window.localStorage.getItem('favorites')) {
      localStorage.removeItem('favorites')
    }

    if (app.favorites.length > 0) {
      window.localStorage.setItem('favorites', JSON.stringify(app.favorites))
    }
  })
})

</script>
