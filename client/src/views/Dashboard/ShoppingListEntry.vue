<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import store from '@/store'
import type EntryItem from '@/code/item/EntryItem'
import type { Item } from '@/code/item/Item';
import RecipeInfoButton from '../RecipeCreator/RecipeInfoButton.vue';

const props = defineProps(['entryObject'])
const url = 'http://localhost:5173/api'

const currentItems = reactive<{ items: any[] }>({ items: [] })

const loadCurrentItem = async () => {
    const allItems = props.entryObject.entry.entryItems.map(async (entryItem: EntryItem) => {
        const itemId = entryItem.itemId
        const result = await fetch(`${url}/items`, { headers: { "itemId": itemId } });
        const item = await result.json();
        const entryItemWithItemObject = { ...entryItem, itemObject: item, checked: entryItem.status === "1" }
        return entryItemWithItemObject;
    });

    const itemArray = await Promise.all(allItems);
    currentItems.items = itemArray;

    loadDataSupplier()

};

const getAmountItemsNeeded = (index: number) => {

    console.log(currentSupplier.recipe)

    console.log(currentItems.items[index].amountValueNeeded, currentItems.items[index].itemObject.quantity_value,
        currentItems.items[index].amountValueNeeded / currentItems.items[index].itemObject.quantity_value)

    console.log(currentItems.items[index])

    return Math.ceil(currentItems.items[index].amountValueNeeded / currentItems.items[index].itemObject.quantity_value ?? "0")
}


const currentSupplier = reactive({ "recipe": {} })

const loadDataSupplier = () => {

    if (!props.entryObject.entry.dataSupplier.recipeId) {
        return;
    }

    console.log(props.entryObject.entry.dataSupplier.recipeId)
    fetch(url + '/recipes', {
        method: "GET", headers: {
            "recipe_id": props.entryObject.entry.dataSupplier.recipeId
        },
    }).then((result) => {
        result.json().then((json) => {
            currentSupplier.recipe = json
        })
    })
}



const saveEntry = async () => {

    const ob = { ...props.entryObject }
    ob.entry.entryItems = currentItems.items;

    ob.entry.entryItems = currentItems.items.map(item => {
        const { itemObject, checked, ...rest } = item;
        return rest;
    });

    const result = await fetch(`${url}/entries`, {
        method: "PUT",
        body: JSON.stringify({ entry: ob.entry }),
        headers: { 'Content-Type': 'application/json' }
    })
}

loadCurrentItem();

const isCrossed = (index: number) => {
    if (currentItems?.items[index])
        return currentItems.items[index].status === "2"
    else {
        return false
    }
}

const crossedClasstext = (index: number) => {
    return isCrossed(index) ? "crossed" : ""
}


const showSupplier = computed(() => {
    console.log(currentSupplier.recipe.imageUrl)
    return Boolean(currentSupplier.recipe.recipeTitle)
})

// Watch individual checkbox states
const updateCheckboxes = () => {
    currentItems.items.forEach(async entry => {

        if (entry.status === "0" && entry.checked === true) {
            entry.status = "1"
        } else if (entry.status === "1" && entry.checked === false) {
            entry.status = "0"
        }
    });
    saveEntry()
}

const openRecipe = () => {
    console.log(currentSupplier.recipe)
    // store.commit("setCurrentlyCreatingRecipe", getRecipe())
    // router.push("/recipecreator")
}

const imageUrl = computed(() => {
    console.log(currentSupplier.recipe.imageUrl ?? "@/assets/bild1.png")
    return ` background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, )),url(${currentSupplier.recipe.imageUrl ?? "@/assets/bild1.png"}); background-position: center;`;
})

</script>

<template>
    <div class="col-12">
        <div class="row justify-content-center align-items-center">
            <div v-if="showSupplier" class="col-12 mt-2 ">
                <div class="row justify-content-center align-items-center">
                    <div class="col-3 mt-5">
                        <hr>
                    </div>
                    <div class="col-4 supplier-text-title">
                        <div class="bg-white rounded px-3 py-1">{{ currentSupplier.recipe.recipeTitle ?? "Rezeptname" }}
                        </div>
                    </div>
                    <div class="col-2 supplier-text-title text-start">
                        <RecipeInfoButton :recipe="currentSupplier.recipe"></RecipeInfoButton>
                    </div>
                    <div class="col-3 mt-5">
                        <hr>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-12" v-for="(entryObject, index) in currentItems.items" :key="entryObject.itemId">
                        <div class="row justify-content-start align-items-center entry"
                            :class="crossedClasstext(index)">
                            <div class="col-3">
                                <div class="row text-center">
                                    <div class="col-12">
                                        <div class="checkbox">
                                            <input :disabled="isCrossed(index)" @change="updateCheckboxes"
                                                v-model="entryObject.checked" type="checkbox">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="itemname">{{ entryObject.itemObject.product_name }}</div>
                            </div>
                            <div class="col-2"> {{ getAmountItemsNeeded(index) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
@keyframes loading-ani {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 0.1;
    }

    100% {
        opacity: 0.5;
    }
}

.recipe-image-row {

    background-position: center;
    background-size: cover;
    border-radius: 5px;
    margin-left: 4%;
    margin-right: 4%;
}

.supplier-text-title {
    opacity: 1.0;
    font-size: x-large;
    padding-top: 4%;
    color: black;
}

.entry {
    margin-top: 20px;
    margin-bottom: 20px;
}

.crossed {
    color: rgb(0, 0, 0, 0.6);
}

.loading {
    background-color: rgb(100, 100, 150);
    animation: loading-ani;
    animation-iteration-count: infinite;
    animation-duration: 0.66s;
}

.itemname {
    font-size: larger;
}

.checkbox {
    transform: scale(2);
}

.entry-input {
    outline: solid;
    margin: 50%;
}

#entry-container {
    outline: solid;
}
</style>
