<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from './header/HeaderProfile.vue'
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import CycleSelectionHeader from './CycleHeader/CycleSelectionHeader.vue'
import store from '@/store'
import Sidebar from './Sidebar/Sidebar.vue'
import CardRecipeComp from './RecipeList/CardRecipeComp.vue'
import RecipeCard from './RecipeList/RecipeCard.vue'

const array: string[] = []

const currentCycle = store.state.cycleObject

const childCycleRef = ref(null)

const handleAddToToday = () => {
	childCycleRef.value.showInputAnimation()
}

const recipesList = reactive({ list: [] })

const url = 'http://localhost:5173/api'

fetch(url + '/recipes', {
	method: "GET", headers: {
		'Content-Type': 'application/json'
	},
}).then((result) => {
	result.json().then((json) => {
		console.log(json)
		recipesList.list = json
	})
})

</script>

<template>
	<div class="container"></div>
	<div class="row">
		<div class="col-3 pb-4" v-for="(recipe, index) in recipesList.list" :key="recipe._id">
			<RecipeCard :recipe="recipe"></RecipeCard>
		</div>
	</div>
	<div class="row">
		<div class="col-12 pt-5 the-end">

		</div>
	</div>
</template>

<style>
/* .the-end {
	background-color: rgb(0, 0, 0, 0.1);
} */

.puffer {
	margin: auto;
	max-height: 50px;
}

.cyclebar {
	position: sticky;
	top: 7%;
	z-index: 101;
}

.stickysidebar {
	position: sticky;
	top: 6.5%;
	z-index: 100;
}

.stickybar {
	position: sticky;
	top: 0;
	z-index: 100;
}

.page {
	height: 100%;
	width: 100%;
	background-color: #3e69613b;
}
</style>
