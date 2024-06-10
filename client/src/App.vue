<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { defineConfig, loadEnv } from 'vite';


console.log(import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_API_PATH)

</script>

<template>
  <div class="appBody">
    <div>
      <RouterView/>
    </div>
  </div>
</template>