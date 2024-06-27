<script setup lang="ts">
import CalendarComp from '@/components/widgets/CalendarComp.vue'
import CardComp from '@/components/widgets/CardComp.vue'
</script>

<template>
  <CardComp>
    <template #body>
      <CalendarComp />
    </template>
  </CardComp>
</template>
