<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

import store from '@/store'
import type { Cycle } from '@/code/cycle/Cycle'
import ShoppingListEntry from './ShoppingListEntry.vue'
import ShoppingListButton from './ShoppingListButton.vue'
import { OhVueIcon } from 'oh-vue-icons'
import 'vue3-select-component/dist/style.css'

import VueSelect from 'vue3-select-component'
</script>

<template>
    <div class="col shopping-list-selector">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-3 col-lg-3 pb-2">
                        <ShoppingListButton type="today-week"></ShoppingListButton>
                    </div>
                    <div class="col-3 col-lg-3">
                        <ShoppingListButton type="tomorrow"></ShoppingListButton>
                    </div>
                    <div class="col-3 col-lg-3">
                        <ShoppingListButton type="today"></ShoppingListButton>
                    </div>
                    <div class="col-3 col-lg-3">
                        <ShoppingListButton ref="full_week_btn" type="full-week"></ShoppingListButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.shopping-list-selector {
    z-index: 100;
    background-color: white;
    padding: 3%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    transition: 1s;
    width: 100%;
}
</style>
