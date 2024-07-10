<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

import store from '@/store'
import ShoppingList from './ShoppingList.vue';
import CycleSelectionHeader from '../CycleHeader/CycleSelectionHeader.vue';
import ShoppingListSelector from './ShoppingListSelector.vue';
import ShoppingListActions from './ShoppingListActions.vue';

const windowWidth = ref(window.innerWidth);

const isLargeScreen = computed(() => {
	return windowWidth.value >= 992;
});

const handleResize = () => {
	windowWidth.value = window.innerWidth;
};

onMounted(() => {
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
});

</script>

<template>
	<div class="col-12">
		<div v-if="isLargeScreen" class="row pt-4">
			<div class="col-12 col-lg-8">
				<ShoppingList></ShoppingList>
			</div>
			<div class="col-4">
				<div class="sticky">
					<div class="row pb-3">
						<div class="col-12">
							<ShoppingListSelector></ShoppingListSelector>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<ShoppingListActions></ShoppingListActions>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!isLargeScreen" class="row pt-4">
			<div class="col-12">
				<div class="row pb-3">
					<div class="col-12">
							<ShoppingListSelector></ShoppingListSelector>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<ShoppingListActions></ShoppingListActions>
					</div>
				</div>
			</div>
			<div class="pb-3"></div>
			<div class="col-12 col-lg-8">
				<ShoppingList></ShoppingList>
			</div>
		</div>
	</div>
</template>

<style>
.full-width {
	width: 100%;
}
.sticky {
	position: absolute;
	margin-right: 2%;
}
</style>