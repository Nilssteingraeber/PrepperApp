<script setup lang="ts">
import { reactive } from 'vue'
import Header from './header/HeaderProfile.vue'
import ProductCard from '@/views/Products/ProductCard.vue'
import Sidebar from './Sidebar/Sidebar.vue';
import store from '@/store'
import CycleDaySelectionBar from './CycleHeader/CycleDaySelectionBar.vue';
import CycleSelectionHeader from './CycleHeader/CycleSelectionHeader.vue';

const productsLists = []

const url = 'http://localhost:5173/api'
const array: string[] = []
const data = reactive({ list: array })

fetch(url + '/items').then((result) => {
	result.json().then((json) => {
		data.list = json
		console.log(json)
	})
})
</script>

<template>
	<div class="col-12">
		<div class="row products-list">
			<div v-for="item in data.list" class="col-xl-3 col-md-6 col-sm-12 product-card-entry">
				<ProductCard :item="item"></ProductCard>
			</div>
		</div>
	</div>
</template>

<style>
.product-card-entry {
	margin-bottom: 2%;
	padding: 2%;
}

.products-list {
	width: 98%;
	margin-left: 2.5%;
}

.puffer {
	margin: auto;
	max-height: 9px;
}

.cyclebar {
	position: sticky;
	top: 0%;
	z-index: 101;
}

.stickysidebar {
	position: sticky;
	top: 62px;
	z-index: 100;
}

.stickybar {
	position: sticky;
	top: 0;
	z-index: 100;
}
</style>