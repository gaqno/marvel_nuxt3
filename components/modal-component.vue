<template>
  <div class="modal modal-open">
    <div class="modal-box relative prose">
      <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2" @click="app.closeModal">
        ✕
      </label>
      <section v-if="app.modal.template === 'landing'">
        <h2>Bem vindo ao Marvel Heroes!</h2>
        <p>Esta aplicação foi feita utilizando as tecnologias:</p>
        <ul>
          <li>Vue 3</li>
          <li>Nuxt 3</li>
          <li>TailwindCSS</li>
          <li>NodeJS 18</li>
        </ul>
      </section>
      <section v-if="app.modal.template === 'jaba'">
        <h2>Jaba</h2>
        <img src="/assets/jaba.png">
        <AdsByGoogle />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '~~/store/app'

const app = useAppStore()
</script>
