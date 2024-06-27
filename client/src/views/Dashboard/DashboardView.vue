<script setup lang="ts">
import { reactive } from 'vue'

import store from '@/store'
import ShoppingList from './ShoppingList.vue';
import CycleSelectionHeader from '../CycleHeader/CycleSelectionHeader.vue';


</script>

<template>
	<div class="col-12">
		<div class="row">
			<div class="col-6">
				<ShoppingList></ShoppingList>
			</div>
			<div class="col-6">
				<ShoppingList></ShoppingList>
			</div>
		</div>
	</div>
</template>

<style>

</style>