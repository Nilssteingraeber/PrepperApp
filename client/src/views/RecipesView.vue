<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from './header/HeaderProfile.vue'
import RecipeCard from './Recipes/RecipeCard.vue'
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import CycleSelectionHeader from './CycleHeader/CycleSelectionHeader.vue'

const array: string[] = []

const currentCycle = new Cycle(CycleType.ONE_WEEK)

const childCycleRef = ref(null)

const handleAddToToday = () => {
	childCycleRef.value.showInputAnimation()
}

const list = [
	{ name: 'Spagetti', url: '/static/recipes/SpagettiBolog.jpg' },
	{ name: 'Crispy Potatoes', url: '/static/recipes/Bratkartoffeln_Low.jpg' },
	{ name: 'Spagetti', url: '/static/recipes/SpagettiBolog.jpg' }
]
</script>

<template>
	<div class="recipes-page">
		<div class="header stickybar">
			<Header></Header>
		</div>
		<div class="d-flex flex-row">
			<div class="col-2 stickysidebar" id="sidebar">
				<div class="vstack gap-2 m-2">
					<a class="p-3 rounded" href="/profile" id="profile-link">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
							class="bi bi-house-fill" viewBox="0 0 16 16" style="margin-right: 2%">
							<path
								d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
							<path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
						</svg>Profile</a>
					<a class="p-3 rounded" href="/products" id="profile-link">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
							class="bi bi-cart-check-fill" viewBox="0 0 16 16" style="margin-right: 2%">
							<path
								d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
						</svg>Products</a>
					<a class="p-3 rounded" href="/recipes" id="current-link">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#49416D"
							class="bi bi-collection-fill" viewBox="0 0 16 16" style="margin-right: 2%">
							<path
								d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1" />
						</svg>Recipes</a>
					<a class="p-3 rounded" href="/calender" id="profile-link">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
							class="bi bi-calendar2-event-fill" viewBox="0 0 16 16" style="margin-right: 2%">
							<path
								d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
						</svg>Calender</a>
					<a class="p-3 rounded" href="/settings" id="profile-link">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
							class="bi bi-gear-fill" viewBox="0 0 16 16" style="margin-right: 2%">
							<path
								d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
						</svg>Settings</a>
				</div>
			</div>
			<div class="col-10">
				<div class="cyclebar">
					<CycleSelectionHeader :cycle="currentCycle" ref="childCycleRef"></CycleSelectionHeader>
				</div>
				<div class="row" style="margin-right: 5px;">
					<div v-for="item in list">
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

.recipes-page {
	height: 100%;
	width: 100%;
	background-color: #36a5913b;
}
</style>
