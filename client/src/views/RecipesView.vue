<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from './header/HeaderProfile.vue'
import RecipeCard from './Recipes/RecipeCard.vue'
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import CycleSelectionHeader from './CycleHeader/CycleSelectionHeader.vue'
import store from '@/store'
import Sidebar from './Sidebar/Sidebar.vue'

const array: string[] = []

const currentCycle = store.state.cycleObject

const childCycleRef = ref(null)

const handleAddToToday = () => {
	childCycleRef.value.showInputAnimation()
}

const list = [
	{ name: 'Spagetti', subtext: 'with Bolognese & Cheese', isVegan: true, url: '/static/recipes/SpagettiBolog.jpg' },
	{ name: 'Crispy Potatoes', url: '/static/recipes/Bratkartoffeln_Low.jpg' },
	{ name: 'Spagetti', url: '/static/recipes/SpagettiBolog.jpg' }
]
</script>

<template>
	<div class="page">
		<div class="header stickybar">
			<Header></Header>
		</div>
		<div class="d-flex flex-row">
			<Sidebar></Sidebar>
			<div class="col-10">
				<div class="row">
					<div class="cyclebar">
						<CycleSelectionHeader :cycle="store.state.cycleObject" ref="childCycleRef">
						</CycleSelectionHeader>
					</div>
				</div>
				<div class="d-flex flex-row" style="margin-right: 5px;">
					<div v-for="item in list" class="col-6">
						<RecipeCard :item="item" :addHandle="handleAddToToday"></RecipeCard>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
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
