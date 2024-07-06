<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
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

watch(() => store.state.latestSearchResults, (newValue, oldValue) => {
	listSearchData()
})

const listSearchData = () => {
	data.list = JSON.parse(store.state.latestSearchResults)
}

if (store.state.latestSearchResults == "") {
	fetch(url + '/items').then((result) => {
		result.json().then((json) => {
			data.list = json
		})
	})
} else {
	listSearchData()
}


</script>

<template>
	<div class="col-12">
		<div class="row products-list">
			<div v-for="item in data.list" class="col-xl-3 col-md-6 col-sm-12 product-card-entry" :key="item.code">
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


</style>