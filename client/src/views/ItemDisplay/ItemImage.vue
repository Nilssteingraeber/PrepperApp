<script setup lang="ts">
import { computed, reactive, ref, watch, defineEmits } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item } from '@/code/item/Item';
import { useRouter } from 'vue-router';
import InfoButton from './InfoButton.vue'

const router = useRouter()
const props = defineProps(["item"])
const code = props.item?.code;

const preffered_image = props.item?.preffered_image ?? 1

const path = computed(() => {

	console.log(preffered_image.toString())

	if(props.item == undefined) {
		return;
	}

	//401/235/911/4303/1.jpg
	let productImageUrlWeb = props.item.code 
	let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
	if (String(productImageUrlWeb).length <= 8) {
		pPath += String(productImageUrlWeb) + "/"
	} else {
		pPath += String(productImageUrlWeb).substring(0, 3) + '/'
		pPath += String(productImageUrlWeb).substring(3, 6) + '/'
		pPath += String(productImageUrlWeb).substring(6, 9) + '/'
		pPath += String(productImageUrlWeb).substring(9) + '/'
	}
	pPath += preffered_image.toString() + ".jpg"

	return pPath;
})




</script>

<template>
	<div class="row">
		<div class="col">
			<img class="small-product-image" :src="path">
			<InfoButton :item="props.item" /></img>
		</div>
	</div>
</template>

<style>
.small-product-image {
	width: 100%;
	border-radius: 5px;
}
</style>