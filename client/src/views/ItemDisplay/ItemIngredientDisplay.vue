<script setup lang="ts">
import { computed, reactive, ref, watch, defineEmits, onBeforeMount } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item, getQuantityString, getQuantityTypeString } from '@/code/item/Item';

import ItemImage from './ItemImage.vue'
import type Ingredient from '@/code/ingredient/Ingredient';

const props = defineProps(["ingredient"])
const ingredient = props.ingredient as Ingredient
const url = 'http://localhost:5173/api'

const currentlyShowingItem = reactive({ "data": {} })
const itemNeededInput = ref(ingredient.amountValue ?? 1)

const getCurrentlyShowingItem = (): Item => {
    return currentlyShowingItem.data as Item 
}

onBeforeMount(() => {
    fetch(url + '/items', { headers: { "itemId": ingredient.itemCode }, method: "GET" }).then((result) => {
        result.json().then((json) => {
            currentlyShowingItem.data = json as Item
            updateNeeded()
        })
    })
})

// WATCH
watch(() => itemNeededInput.value, () => {
    updateNeeded()
})


// METHODS
const updateNeeded = () => {
    ingredient.amountItem = Math.ceil(itemNeededInput.value / (parseFloat(getCurrentlyShowingItem()?.quantity_value ?? "0")))
    ingredient.amountValue = itemNeededInput.value
    emits('set-amount', getCurrentlyShowingItem().code, itemNeededInput.value);
}


// EMITS
const emits = defineEmits(['delete-ingredient', 'set-amount']);
const handleDelete = () => {
    emits('delete-ingredient', getCurrentlyShowingItem().code);
};


// COMPUTED 
const quantity_value = computed(() => {
    if(getCurrentlyShowingItem())
    return getQuantityString(getCurrentlyShowingItem().quantity_value, getCurrentlyShowingItem().quantity_type)
})

const ingredientItemName = computed(() => {
    if(getCurrentlyShowingItem())
        return getCurrentlyShowingItem().product_name
})

const quantityTypeNeeded = computed(() => {
    if(!getCurrentlyShowingItem()) {
        return "";
    }
    return getQuantityTypeString(getCurrentlyShowingItem().quantity_type ?? 1)
})

updateNeeded()

</script>

<template>
    <div class="row">
        <div class="col-7">
            <div class="row p-1 align-items-center">
                <div class="col-6" style="font-size: larger;">
                    {{ ingredientItemName }}
                </div>
                <div class="col-3">
                    {{ ingredient.amountItem }}×
                </div>
                <div class="col-3">
                    {{ quantity_value }}
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-4">
                    <hr>
                </div>
                <div class="col-4">
                    You need:
                </div>
                <div class="col-4">
                    <hr>
                </div>
            </div>


            <div class="row align-items-center">
                <div class="col-6">
                    <input lang="en" min="0.01" step="0.1" v-model="itemNeededInput" type="number"
                        class="inputclass border outline text-center form-control">
                </div>
                <div class="col-3">
                    {{ quantityTypeNeeded }}
                </div>
            </div>

            <div class="my-5"></div>
            <hr>
            <div class="row justify-content-end">
                <div class="col-4">
                    <button @click="handleDelete" class="delete-recipe-item-btn btn btn-outline-secondary"
                        type="button">
                        <OhVueIcon name="bi-trash" scale="1.5"></OhVueIcon>
                    </button>
                </div>
            </div>
        </div>
        <div class="col-5">
            <ItemImage :item="getCurrentlyShowingItem()"></ItemImage>
        </div>
    </div>
</template>

<style>
.delete-recipe-item-btn {
    height: 100%;
    width: 100%;
}

.step-card {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    transition: 1s;
}
</style>