<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, onUnmounted, reactive, ref, watch } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';
import RecipeStep from './RecipeStep.vue';
import store from '@/store';

import ItemDisplay from '../ItemDisplay/ItemIngredientDisplay.vue'
import Ingredient from './../../code/ingredient/Ingredient'
import Recipe, { Step } from '@/code/recipe/Recipe';
import ItemIngredientDisplay from '../ItemDisplay/ItemIngredientDisplay.vue';
import type { Item } from '@/code/item/Item';
import router from '@/router';


const url = 'http://localhost:5173/api'

const currentRecipe = reactive({ data: store.state.currentlyCreatingRecipe })
const getCurrentRecipe = (): Recipe => {
    return currentRecipe.data as Recipe
}

const currentRecipeName = ref(getCurrentRecipe().recipeTitle ? getCurrentRecipe().recipeTitle : "Name of Recipe");
const currentRecipeAmountPeople = ref(getCurrentRecipe().recipeAmountPeople);
const currentNewRecipeStepString = ref("");
const isAddBtnDisabled = ref(true);
const peopleIconRef = ref("io-person-sharp");
const imageUrl = ref(getCurrentRecipe().imageUrl ?? "https://upload.wikimedia.org/wikipedia/commons/b/b9/Spaghetti_Bolognese_-_Pizzeria_Bella_Italia_%28Cr%C3%A9pieux-la-Pape%29_en_f%C3%A9vrier_2022.jpg")

const reset = () => {
    console.log("Reset")
    getCurrentRecipe().ingredients.length = 0
    getCurrentRecipe().recipeAmountPeople = 0
    getCurrentRecipe().recipeCreateData = {}
    getCurrentRecipe().recipeSteps.length = 0
    getCurrentRecipe().recipeTitle = "Name of Recipe"
    getCurrentRecipe().imageUrl = ""


    router.go(0)
}

onUnmounted(() => {
    getCurrentRecipe().recipeTitle = currentRecipeName.value
    getCurrentRecipe().recipeAmountPeople = currentRecipeAmountPeople.value
    getCurrentRecipe().imageUrl = imageUrl.value;
    store.commit("setCurrentlyCreatingRecipe", getCurrentRecipe())
})

const deleteRecipe = () => {
    fetch(url + '/recipes', {
        method: "DELETE", body: JSON.stringify(currentRecipe.data), headers: {
            'Content-Type': 'application/json',
            "recipe_id": String(getCurrentRecipe()._id),
        },
    }).then((result) => {
        reset()
    })
}

const addToList = watch(() => store.state.searchbarClickedAddItem, (newValue, oldValue) => {

    if (newValue === undefined)
        return;

    const addedItem = store.state.searchbarClickedAddItem;
    const newIngredient = new Ingredient((addedItem as Item).code, 1, (addedItem as Item).quantity_value, (addedItem as Item).quantity_type);

    const findSameIngredient = getCurrentRecipe().ingredients.find((ingredient: Ingredient) => {
        return addedItem.code === ingredient.itemCode
    })

    if (findSameIngredient) {
        (findSameIngredient as Ingredient).amountItem += 1;
    } else {
        getCurrentRecipe().ingredients.push(newIngredient)
    }

    store.commit("setSearchResultAddToRecipe", undefined)
})


// Saving

// Speichern, welche Animation
// gezeigt werden soll
const showSaveAni = ref(false)
const showNoSaveAni = ref(false)

const showSaveAniText = computed(() => {
    if(showSaveAni.value) {
        return "show-glow-ani-no-mv"
    }

    if(showNoSaveAni.value) {
        return "show-glow-ani-red-no-mv"
    }
    return ""
})


const doSave = async () => {

    getCurrentRecipe().recipeTitle = currentRecipeName.value
    getCurrentRecipe().recipeAmountPeople = currentRecipeAmountPeople.value
    getCurrentRecipe().imageUrl = imageUrl.value

    await fetch(url + '/recipes', {
        method: "POST", body: JSON.stringify(currentRecipe.data), headers: {
            'Content-Type': 'application/json'
        },
    }).then((result) => {
        if(result.ok === true) {
            showSaveAni.value = true;
            setTimeout(() => {
                showSaveAni.value = false;
            }, 500)
        } else {
            showNoSaveAni.value = true;
            setTimeout(() => {
                showNoSaveAni.value = false;
            }, 500)
        }
    })
}


//////////////
// COMPUTED //

const recipeModeButtonClass = computed(() => {
    return store.state.isRecipeItemSelectModeActive ? " select-mode-active " : ""
})

const amountItemsInCurrentRecipe = computed(() => {
    return getCurrentRecipe().recipeSteps.length > 0 ? getCurrentRecipe().recipeSteps.length : "None";
});


//////////////
// WATCHED  //
watch(() => currentNewRecipeStepString.value, () => {
    isAddBtnDisabled.value = currentNewRecipeStepString.value.length === 0;
});

watch(() => currentRecipeAmountPeople.value, (newValue: number, oldValue: number) => {
    if (currentRecipeAmountPeople.value < 1) {
        peopleIconRef.value = "fa-child";
        return;
    }
    if (currentRecipeAmountPeople.value < 2) {
        peopleIconRef.value = "io-person-sharp";
        return;
    }
    if (currentRecipeAmountPeople.value >= 2) {
        peopleIconRef.value = "io-people-sharp";
        return;
    }
});

///////////////
// FUNCTIONS //

const deleteStep = (index: number) => {
    getCurrentRecipe().recipeSteps = getCurrentRecipe().recipeSteps.filter(step => step.index !== index);
    for (var i = 0; i < getCurrentRecipe().recipeSteps.length; i++) {
        getCurrentRecipe().recipeSteps[i].index = i;
    }
};
const handleDeleteStep = (index: number) => {
    deleteStep(index);
};

const deleteItem = (code: string) => {
    getCurrentRecipe().ingredients = getCurrentRecipe().ingredients.filter(ingredient => (ingredient as Ingredient).item.code !== code);
}

const handleDeleteItem = (code: string) => {
    deleteItem(code)
}

const handleStepUp = (index: number) => {

    if (index <= 0) {
        return;
    }
    const itemAbove = getCurrentRecipe().recipeSteps[index - 1];
    const currentItem = getCurrentRecipe().recipeSteps[index];
    getCurrentRecipe().recipeSteps[index - 1] = currentItem;
    getCurrentRecipe().recipeSteps[index] = itemAbove;
    for (var i = 0; i < getCurrentRecipe().recipeSteps.length; i++) {
        getCurrentRecipe().recipeSteps[i].index = i;
    }
};
const handleStepDown = (index: number) => {
    if (index >= getCurrentRecipe().recipeSteps.length - 1) {
        return;
    }

    const itemAbove = getCurrentRecipe().recipeSteps[index + 1];
    const currentItem = getCurrentRecipe().recipeSteps[index];

    getCurrentRecipe().recipeSteps[index + 1] = currentItem;
    getCurrentRecipe().recipeSteps[index] = itemAbove;

    for (var i = 0; i < getCurrentRecipe().recipeSteps.length; i++) {
        getCurrentRecipe().recipeSteps[i].index = i;
    }
};
const createNewRecipeStep = (text: string) => {
    const step = { index: getCurrentRecipe().recipeSteps.length, name: "default_step", text: text };
    return step;
};
const appendCurrentStep = () => {
    const step = createNewRecipeStep(currentNewRecipeStepString.value);
    getCurrentRecipe().recipeSteps.push(step);
};



// Recipe Mode //
const toggleRecipeMode = () => {
    store.commit("toggleRecipeItemSelectModeActive")
}

const deleteIngredients = () => {
    getCurrentRecipe().ingredients = []
}

const deleteIngredient = (code: string) => {
    getCurrentRecipe().ingredients = getCurrentRecipe().ingredients.filter((ingredient) => {
        return ((ingredient as Ingredient).itemCode !== code)
    })
}

const setIngredientAmountValue = (code: string, value: number) => {
    console.log("set", code, "to", value)
    getCurrentRecipe().ingredients.forEach((ingredient) => {
        if ((ingredient as Ingredient).itemCode === code) {
            ingredient.amountValue = value.toString()
        }
    })
}

</script>

<template>
    <div class="pt-4">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="row justify-content-between align-items-center tile-card m-2" :class="showSaveAniText">
                        <div class="col-6">
                            <input v-model="currentRecipeName" type="text"
                                class="recipe-title border rounded outline full-w form-control"></input>
                        </div>
                        <div class="col-2 col-md-2 col-lg-1">
                            <button @click="doSave" class="save-btn btn btn-outline-secondary" :class="showSaveAniText"
                                type="button">
                                <OhVueIcon name="fa-save" scale="1.3"></OhVueIcon>
                            </button>
                        </div>
                        <div class="col-2"></div>
                        <div class="col-2 col-md-2 col-lg-1">
                            <button @click="reset" class="save-btn btn btn-outline-secondary" type="button">
                                <OhVueIcon name="md-refresh" scale="1.3"></OhVueIcon>
                            </button>
                        </div>
                        <div class="col-2 col-md-2 col-lg-1">
                            <button @click="deleteRecipe" class="save-btn btn btn-outline-secondary" type="button">
                                <OhVueIcon name="bi-trash-fill" scale="1.3"></OhVueIcon>
                            </button>
                        </div>
                        <div class="col-12 pt-4">
                            <input v-model="imageUrl" type="text"
                                class="url-text border rounded outline full-w form-control"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="row tile-card m-2 ">
                        <div class="col-7">
                            <a>List of ingredients</a>
                        </div>
                        <div class="col-5">
                            <div class="row justify-content-between">
                                <div class="col-4">
                                    <button @click="deleteIngredients" class="trash-button" type="button">
                                        <OhVueIcon style="color: rgb(200, 0, 0, 1)" name="bi-trash-fill" scale="1.3">
                                        </OhVueIcon>
                                    </button>
                                </div>
                                <div class="col-8">
                                    <button @click="toggleRecipeMode" :class="recipeModeButtonClass"
                                        class="select-mode-button" type="button">
                                        <OhVueIcon name="fa-shopping-cart" scale="1.3"></OhVueIcon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row tile-card-animatable m-2"
                        v-for="(ingredient, index) in currentRecipe.data.ingredients" :key="ingredient.itemCode"
                        :id="index.toString()">
                        <div class="col-12" :id="index.toString()">
                            <ItemIngredientDisplay :ingredient="ingredient" @delete-ingredient="deleteIngredient"
                                @set-amount="setIngredientAmountValue" />
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row tile-card m-2">
                        <div class="col-12">
                            <div class="row align-items-center">
                                <div class="col-3">
                                    For how many people?
                                </div>
                                <div class="col-8">
                                    <input lang="en" min="0.5" step="0.5" v-model="currentRecipeAmountPeople"
                                        type="number" class="inputclass border outline text-center form-control">
                                </div>
                                <div class="col-1">
                                    <OhVueIcon :name="peopleIconRef" scale="1.3"></OhVueIcon>
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                    </div>
                    <div class="row tile-card m-2 mt-3">
                        <div class="col-12">
                            <div class="row align-items-center">
                                <div class="col-12">
                                    Please define a steps of this recipe below. Click "add" to append to the list.
                                </div>
                            </div>
                            <div class="my-4"></div>
                            <div class="row align-items-top">
                                <div class="col-10">
                                    <textarea lang="en" min="0.5" step="0.5" v-model="currentNewRecipeStepString"
                                        type="number" class="form-control inputclass border outline"></textarea>
                                </div>
                                <div class="col-2">
                                    <button @click="appendCurrentStep" class="save-btn btn btn-outline-secondary"
                                        :disabled="isAddBtnDisabled" type="button">
                                        <OhVueIcon name="md-addcircle-round" scale="1.3"></OhVueIcon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="(step, index) in getCurrentRecipe().recipeSteps">
                        <RecipeStep :stepObject="step" @delete-step="handleDeleteStep(index)"
                            @step-up="handleStepUp(index)" @step-down="handleStepDown(index)"></RecipeStep>
                    </div>
                    <div class="mb-5"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>



.select-mode-active {
    background-color: rgb(57, 180, 159) !important;
    outline: none !important;
    border: none !important;
    color: white !important;
}

.select-mode-button:hover {
    background-color: rgb(57, 180, 159, 0.2);
}

.select-mode-button {
    transition: 0.25s;
    width: 100%;

    border: none;
    outline: none;
    background-color: white;
    outline: rgb(0, 0, 0, 0.9) solid 1px;
    border-radius: 5px;
}

.trash-button {
    transition: 0.25s;
    width: 100%;

    border: none;
    outline: none;
    background-color: white;
}

.sticky-item {
    position: absolute;
}

.recipe-title {
    font-size: x-large;
}

.full-w {
    width: 100%;
}

.productImage {
    max-width: 100%;
    height: auto;
}

.inputclass {
    width: 100%;
}

.save-btn {
    width: 100%;
}

@keyframes tile-card-ani {
    0% {
        opacity: 0.0;
    }

    100% {
        opacity: 1.0;
    }
}

.tile-card-animatable {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    opacity: 1;
    animation: tile-card-ani 1.3s;
    transition: 0.3s;
}

.tile-card {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    transition: 0.3s;
}

@keyframes show-glow-ani-red-no-mv-ani {
    0% {
        box-shadow: 0px 0px 0px 2px rgb(57, 180, 159, 0.0), 0px 0px 2px rgba(0, 0, 0, 0.25);
    }

    20% {
        box-shadow: 0px 0px 0px 6px rgba(235, 47, 40, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.25);
        transform: scale(1.01);
    }

    100% {
        box-shadow: 0px 0px 0px 5px rgb(57, 180, 159, 0.0), 0px 0px 2px rgba(0, 0, 0, 0.25);
    }
}

.show-glow-ani-red-no-mv {
    animation: show-glow-ani-red-no-mv-ani 0.6s;
    animation-iteration-count: 1;
}

@keyframes show-glow-ani-no-mv-ani {
    0% {
        box-shadow: 0px 0px 0px 2px rgb(57, 180, 159, 0.0), 0px 0px 2px rgba(0, 0, 0, 0.25);
    }

    20% {
        box-shadow: 0px 0px 0px 6px rgb(57, 180, 159, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.25);
        transform: scale(1.01);
    }

    100% {
        box-shadow: 0px 0px 0px 5px rgb(57, 180, 159, 0.0), 0px 0px 2px rgba(0, 0, 0, 0.25);
    }
}

.show-glow-ani-no-mv {
    animation: show-glow-ani-no-mv-ani 0.6s;
    animation-iteration-count: 1;
}
</style>