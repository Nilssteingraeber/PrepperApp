<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import CardComp from './CardComp.vue'
import type Recipe from '@/code/recipe/Recipe';
import Ingredient from '@/code/ingredient/Ingredient';
import store from '@/store';
import EntryItem from '@/code/item/EntryItem';
import { computed, onMounted, ref, watch } from 'vue';
import router from '@/router';

const props = defineProps(["recipe"])

const getRecipe = () => {
    return props.recipe as Recipe
}


const canAdd = ref(true)

const handleAdd = () => {

    if (canAdd.value === false) {
        return;
    }
    canAdd.value = false;
    setTimeout(() => {
        canAdd.value = true;
    }, 500)


    const entryItems: EntryItem[] = []

    getRecipe().ingredients.forEach((ingredient) => {
        entryItems.push(new EntryItem(ingredient.itemCode, ingredient.amountType, ingredient.amountValue, "0"))
    })

    fetch("http://localhost:5173/api/entries/", {
        method: "POST",
        body: JSON.stringify({
            entryItems,
            recipe_id: getRecipe()._id,
            dates: [{ startDate: store.state.cycleObject.getSelectedDateStarting(), endDate: store.state.cycleObject.getSelectedDateEnding() }],
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(() => {
		store.commit("playInputAni")
    });

}


const imageUrl = computed(() => {
    console.log(getRecipe().imageUrl ?? "@/assets/bild1.png")
    return ` background-image: url(${getRecipe().imageUrl ?? "@/assets/bild1.png"}) `;
})

const openRecipe = () => {
    console.log(getRecipe())
    store.commit("setCurrentlyCreatingRecipe", getRecipe())
    router.push("/recipecreator")
}

</script>


<template>
    <div class="container pt-4">
        <div class="row">
            <div class="row ">
                <div class="recipeCardMainTop">
                    <div :style="imageUrl" class="recipeCardImg">
                        <div class="row recipeCardInfoHover">
                            <div class="col-12 justify-content-between">
                                <div class="row">
                                    <div class="col-12 m-2">
                                        <div class="recipeNameText">{{ getRecipe().recipeTitle }}</div>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-12 hrdivider m-2">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 m-2">
                                        <div class="recipeNameText">{{ getRecipe().recipeAmountPeople }}× <OhVueIcon
                                                name="bi-person" scale="2"></OhVueIcon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="row recipeCardBody">
                <div class="col-12">
                    <div class="row recipeCardMainBottom">
                        <div class="col-8">
                            <button @click="handleAdd" class="addButton btn btn-outline-secondary my-3" type="button">
                                Add Recipe
                            </button>
                        </div>
                        <div class="col-4">
                            <button @click="openRecipe" class="addButton btn btn-outline-secondary my-3" type="button">
                                <OhVueIcon name="fa-cog" scale="1"></OhVueIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hrdivider {
    background-color: currentColor;
    opacity: 0.5;
    width: 80%;
    height: 1px;
}

.recipeNameText {
    font-size: x-large;
}

.addButton {
    width: 100%;
}

.recipeCardInfoHover:hover {
    color: rgb(255, 255, 255, 1);
    background-color: rgb(57, 180, 159, 0.85);
    transform: scale(calc(1/1.2));
}

.recipeCardInfoHover {
    transition: 0.1s;
    height: 100%;
    color: rgb(0, 0, 0, 0);
    background-color: rgb(57, 180, 159, 0);
}

.recipeCardBody {
    width: 100%;
}

.recipeCardImg:hover {
    position: relative;
    width: 100%;
    height: 50vh;
    transform: scale(1.2);
}

.recipeCardImg {
    transition: 0.1s;
    position: relative;
    width: 100%;
    height: 50vh;
    background-size: cover;
    background-clip: padding-box;
    background-position: center;
    background-repeat: no-repeat;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: scale(1);
}

.recipeCardMainTop {
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    padding: 0px;
    overflow: hidden;
}

.recipeCardMainBottom {
    background-color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}
</style>
