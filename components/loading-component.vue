<template>
  <div class="modal modal-open">
    <Icon name="line-md:loading-twotone-loop" size="10em" />
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app';

const app = useAppStore();
</script>