<template>
  <NuxtLayout>
    <NuxtPage />
    <!-- <DrawerComponent v-if="app.isDrawer"/> -->
    <LoadingComponent v-if="app.isLoading"/>
    <ModalComponent v-if="app.isModal"/>
    <ToastComponent v-if="app.isToast"/>
  </NuxtLayout>
</template>

<script setup>

import { useAppStore } from './store/app';

const { isMobile } = useDevice()
const app = useAppStore();
const route = useRoute()

watchEffect(() => {
  if (isMobile.value === true) {
    console.log('isMobile')
  }
})
</script>