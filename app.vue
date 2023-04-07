<template>
  <NuxtLayout :data-theme="app.theme === 'light' ? 'dark' : 'light'">
    <DrawerComponent v-if="app.isDrawer"/>
    <LoadingComponent v-if="app.isLoading"/>
    <ModalComponent v-if="app.isModal"/>
    <ToastComponent v-if="app.isToast"/>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import "./global.css"
import { useAppStore } from './store/app';

const { isMobile } = useDevice()
const app = useAppStore();
const route = useRoute()

watchEffect(() => {
  if (isMobile.value === true) {
    console.log('isMobile')
  }

  if (app.toast.show === true) {
    console.log('toast')
    setTimeout(() => {
      app.setToast({ show: false })
      clearTimeout()
    }, 3000)
  }
})

onMounted(() => {
  watchEffect(() => {
    if (app.favorites.length === 0 && window.localStorage.getItem('favorites')) {
      console.log('favorites === 0')
      localStorage.removeItem('favorites')
    }
    
    if (app.favorites.length > 0) {
      console.log('favorites')
      window.localStorage.setItem('favorites', JSON.stringify(app.favorites))
    } 

  
  })
})

</script>