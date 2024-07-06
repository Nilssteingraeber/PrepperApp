<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import store from '@/store'
import type { Cycle } from '@/code/cycle/Cycle'
import ShoppingListEntry from './ShoppingListEntry.vue';
import { OhVueIcon } from 'oh-vue-icons';

const handleTickAll = () => {
    store.commit("setShoppingListClicked", 1)
}

const handleCrossSelected = () => {
    store.commit("setShoppingListClicked", 2)
}

const handleDeleteAll = () => {
    store.commit("setShoppingListClicked", 3)
}

</script>

<template>
    <div class="shopping-list-creator">
        <div class="row">
            <div class="col-12">
                <div class="row mx-1 my-2">
                    <div class="col-4">
                        <button @click="handleTickAll" class="selection-btn btn btn-outline-secondary" type="button">
                            <div class="row">
                                <div class="col-12">
                                    <OhVueIcon name="fa-check" scale="1.5"></OhVueIcon>
                                </div>
                                <div class="col-12">
                                    Tick all
                                </div>
                            </div>
                        </button>
                    </div>
                    <div class="col-4">
                        <button @click="handleCrossSelected" class="selection-btn btn btn-outline-secondary" type="button">
                            <div class="row">
                                <div class="col-12">
                                    <OhVueIcon name="md-strikethroughs-twotone" scale="1.5"></OhVueIcon>
                                </div>
                                <div class="col-12">
                                    Cross ticked
                                </div>
                            </div>
                        </button>
                    </div>
                    <div class="col-4">
                        <button @click="handleDeleteAll" class="selection-btn btn btn-outline-secondary" type="button">
                            <div class="row">
                                <div class="col-12">
                                    <OhVueIcon name="fa-trash" scale="1.5"></OhVueIcon>
                                </div>
                                <div class="col-12">
                                    Delete crossed
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.selection-btn {
    width: 100%;
    height: 100%;
}

.shopping-list-creator {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    transition: 1s;
}
</style>
