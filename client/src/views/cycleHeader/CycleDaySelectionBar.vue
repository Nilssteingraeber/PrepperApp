<script setup lang="ts">
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch } from 'vue'

import dash from '@/assets/dash.svg'

const props = defineProps(["amountDays", "selected"])
const emit = defineEmits(['update:selected'])


const text = reactive({ amount: 7, select: props.selected })

const a = computed(() => {
  const b = []
  for (var i = 0; i < text.amount; i++) {
    b.push({"id": i, "className": i === text.select ? "day-selected day-item" : "day-item"})
  }
  return b
})

watch(() => props.selected, (newVal) => {
  text.select = newVal
})

const handleClick = (id: number) => {
  text.select = id
}


</script>

<template>
    <div class="d-flex flex-row">
      <div class="col-3"/>
      <div class="col-6">
        <div class="d-flex flex-row day-container">
          <div v-for="item in a" :key="item.id" class="col">
            <button :class="item.className" @click="handleClick(item.id)"/>
          </div>
        </div>
      </div>
      <div class="col-3"/>
    </div>
</template>

<style>

.day-selected {
  background-color: rgb(103, 177, 128) !important;
  border-style: none !important;
  border-width: 2px;
  min-width: 25px !important;
  min-height: 35px !important;
  height: 70%;
  margin-bottom: 5px !important;
}

.day-item:hover { background-color: #49416D;}

.day-item {
  background-color: rgb(162, 185, 182, 0);
  border-color: #49416D;
  border-width: 2px;
  border-style: solid;
  min-width: 15px;
  min-height: 15px;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  opacity: 0.7;
  transition: 0.1s;
}

.day-container {
  padding-top: 15px;
}

</style>
