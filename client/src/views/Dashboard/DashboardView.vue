<script setup lang="ts">
import { reactive } from 'vue'

import store from '@/store'
import ShoppingList from './ShoppingList.vue';
import CycleSelectionHeader from '../CycleHeader/CycleSelectionHeader.vue';
import ShoppingListSelector from './ShoppingListSelector.vue';
import ShoppingListActions from './ShoppingListActions.vue';


</script>

<template>
	<div class="col-12">
		<div class="row pt-4">
			<div class="col-8">
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
	</div>
</template>

<style>
.sticky {
	position: absolute;
	margin-right: 2%;
}
</style>