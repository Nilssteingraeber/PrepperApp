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
	<div class="page">
		<div class="header stickybar">
			<Header></Header>
		</div>
		<div class="d-flex flex-row">
			<Sidebar></Sidebar>
			<div class="col-10">
				<div class="row cyclebar">
					<CycleSelectionHeader></CycleSelectionHeader>
				</div>
				<div class="row products-list">
					<div v-for="item in data.list" class="col-xl-3 col-md-6 col-sm-12 product-card-entry">
						<ProductCard :item="item"></ProductCard>
					</div>
				</div>
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
	margin-right: 4%;
	margin-left: 2%;
	margin-top: 2%;
}

.puffer {
	margin: auto;
	max-height: 9px;
}

.cyclebar {
	position: sticky;
	top: 7%;
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

.page {
	height: 100%;
	width: 100%;
	background-color: #36a5913b;
}
</style>