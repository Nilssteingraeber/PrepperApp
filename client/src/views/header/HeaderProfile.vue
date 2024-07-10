<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CycleSelectionHeader from '../CycleHeader/CycleSelectionHeader.vue';
import { OhVueIcon } from 'oh-vue-icons';
import SearchBar from '../SearchBar/SearchBar.vue'
</script>

<template>
	<div class="row justify-content-center pt-2 pb-3">
		<div class="col-12 col-lg-7">
			<div class="row cyclebar">
				<CycleSelectionHeader></CycleSelectionHeader>
			</div>
		</div>
		<div class="col-12 col-lg-5 align-self-center">
			<SearchBar></SearchBar>
		</div>
	</div>
</template>

<style>
#brand-name {
	font-size: 26px;
	font-weight: bold;
	color: #49416D;
}

#header-link {
	text-decoration: none;
}
</style>