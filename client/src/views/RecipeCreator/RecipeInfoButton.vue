<script setup lang="ts">
import { computed, reactive, ref, watch, defineEmits } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item } from '@/code/item/Item';

import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps(["recipe"])

const openRecipe = () => {
    store.commit("setCurrentlyCreatingRecipe",props.recipe)
    router.push("/recipecreator")
}

</script>

<template>
    <div class="row relative">
        <div class="col">
            <button @click="openRecipe" class="recipe-info-btn" type="button">
                <OhVueIcon class="recipe-info-icon">
                    <OhVueIcon name="fa-square" scale="2.5" />
                    <OhVueIcon name="bi-info-square-fill" scale="1.7" fill="#462255" class="recipe-info-icon" />
                </OhVueIcon>
            </button>
        </div>
    </div>
</template>

<style>
.relative {
    position: relative;
    height: 100%;
}

.recipe-info-icon:hover {
    transform: scale(1.2);
}

.recipe-info-icon {
    transform: scale(1);
    transition: 0.15s;
}

.recipe-info-btn:hover {
    border: none;
    background-color: rgb(255, 255, 255, 0);
    color: rgb(255, 255, 255);
}

.recipe-info-btn {
    border: none;
    background-color: rgb(255, 255, 255, 0);
    color: rgb(255, 255, 255);
    transition: 0.2s;
}
</style>