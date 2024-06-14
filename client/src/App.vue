<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { defineConfig, loadEnv } from 'vite';
import 'material-design-icons-iconfont/dist/material-design-icons.css'


console.log(import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_API_PATH)

</script>

<template>
  <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <div class="appBody">
    <div>
      <RouterView/>
    </div>
  </div>
</template>