<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import store from '@/store'
import type Recipe from '@/code/recipe/Recipe';

const props = defineProps(['item'])

let itemEntry = { name: "Item", qnt: 0, qntname: "Kilo" }
let className = "loading"

const currentRecipe = reactive({ "data": {} });
const url = 'http://localhost:5173/api'



fetch(url + '/recipes', {
    method: "GET", headers: {
        'Content-Type': 'application/json',
        "recipe_id": props.item.recipe_id,
    },
}).then(result => result.json().then((json) => {
    currentRecipe.data = json as Recipe;
}));


const recipeTitle = computed(() => {
    return currentRecipe.data.recipeTitle
})


const data = computed(() => {
    if (props.item) {
        className = "false"
        itemEntry = { name: (props.item.product_name as string)?.substring(0, 20) ?? "Hi", qnt: 2, qntname: "Pieces" }
    } else {
        className = "loading"
    }
    return { className, itemEntry }

})

const itemList = computed(() => {
    return props.item.items
})

</script>

<template>
    <div class="col-12">
        <div class="row justify-content-center align-items-center entry text-center" :class="data.className">
            <div class="col-4"> <hr> </div>
            <div class="col-auto"> {{ recipeTitle }}</div>
            <div class="col-4"> <hr> </div>
        </div>
        <div v-for="itemlistEntry in itemList" class="row justify-content-start align-items-center entry"
            :class="data.className">
            <div class="col-3">
                <div class="row text-center">
                    <div class="col-12">
                        <div class="checkbox">
                            <input type="checkbox">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="itemname">{{ itemlistEntry.product_name }}</div>
            </div>
            <div class="col-1"> {{ }}</div>
            <div class="col-3"> {{ }}</div>
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

.entry {
    margin-top: 20px;
    margin-bottom: 20px;
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