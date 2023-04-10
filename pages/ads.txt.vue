<template>
  <div>
    <!-- <pre>{{ runtimeConfig.public['google-adsense'] }}</pre> -->
    <pre>{{ runtimeConfig.public.adsTxt }}</pre>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
</script>
