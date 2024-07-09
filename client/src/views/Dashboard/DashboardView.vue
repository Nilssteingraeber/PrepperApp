<script setup lang="ts">
import { reactive } from 'vue'

import store from '@/store'
import ShoppingList from './ShoppingList.vue'
import CycleSelectionHeader from '../CycleHeader/CycleSelectionHeader.vue'
import ShoppingListSelector from './ShoppingListSelector.vue'
import ShoppingListActions from './ShoppingListActions.vue'
</script>

<template>
  <div class="row pt-5">
    <div class="col-xxl-8">
      <ShoppingList class="mb-3" />
    </div>
    <div class="col-xxl-4">
      <ShoppingListSelector class="mb-3" />
      <ShoppingListActions />
    </div>
  </div>
</template>

<style></style>
