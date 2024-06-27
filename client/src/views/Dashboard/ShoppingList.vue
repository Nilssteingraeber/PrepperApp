<script setup lang="ts">
import { reactive } from 'vue'

import store from '@/store'
import ShoppingListEntry from "./ShoppingListEntry.vue"


const itemEntries = [{ name: "Holland Käse", qnt: 2, qntname: "Pieces" }, { name: "Holland Käse", qnt: 2, qntname: "Pieces" }, { name: "Holland Käse", qnt: 2, qntname: "Pieces" }]

</script>

<template>
    <div class="row">
        <div>Currently showing everything in this week.</div>
    </div>
    <div class="row">
        <div class="col-12" v-for="item in itemEntries">
            <div class="row">
                <ShoppingListEntry :a="item"></ShoppingListEntry>
            </div>
        </div>
    </div>
</template>

<style>
.shopping-list {
    z-index: 100;
}
</style>