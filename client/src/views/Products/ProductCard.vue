<script setup lang="ts">
import Header from '@/views/header/HeaderProfile.vue'
import $ from 'jquery'
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import '../../code/items/AmountType'
import ItemAmountType, { getStringItemType } from '../../code/items/AmountType'
import { OhVueIcon } from 'oh-vue-icons'
import store from '@/store'
import type Recipe from '@/code/recipe/Recipe'
import Ingredient from '@/code/ingredient/Ingredient'

import InfoButton from '../ItemDisplay/InfoButton.vue'
import type { Item } from '@/code/item/Item'
import EntryItem from '@/code/item/EntryItem'
const props = defineProps(['item'])

const productName = String(props.item['product_name']).split("&quot;").join('""')
const productAmount = props.item['amount']
let productImageUrlWeb = props.item['code']

const preffered_image = (props.item as Item).preffered_image ?? 1

//401/235/911/4303/1.jpg
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


let style = 'background-image: url(' + pPath + ');'

const productAmountText = getStringItemType(props.item['amountType'], productAmount).substring(0, 9)
const productImageUrl = __STATIC_DATA_PATH__ + props.item['pictureUrl']
const amount = '500'
const amountType = 'Grams'

const sendAddRequest = () => {

	// Selection Mode
	if(store.state.isRecipeItemSelectModeActive) {
		(store.state.currentlyCreatingRecipe as Recipe).ingredients.push(
			new Ingredient((props.item as Item).code, 
			1, 
			(props.item as Item).quantity_value ?? 1, 
			(props.item as Item).quantity_type ?? "KG"))
		store.commit("addItemInSelectionMode", props.item)
		return;
	}

	const url = 'http://localhost:5173/api'

	const entryItem = new EntryItem(props.item.code, (props.item as Item).quantity_type, (props.item as Item).quantity_value, "0")

	fetch("http://localhost:5173/api/entries/", {
		method: "POST",
		body: JSON.stringify({
			entryItems: [entryItem],
			dates: [{startDate: store.state.cycleObject.getSelectedDateStarting(), endDate: store.state.cycleObject.getSelectedDateEnding()}],
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	}).then((result) => {
		if(result.ok) {
			store.commit("playInputAni")
		}
	});
}

</script>
<template>
	<div class="product-card row" :style="style">
		<div class="col-12 top-part">
			<div class="row">
				<div>
					<InfoButton :item="props.item"></InfoButton>
				</div>
				<div class="col-11">
					<div class="row">
						<div class="col-12 product-name">
							<label style="font-size: large" class="m-2">{{ productName }}</label>
						</div>
						<div class="col-12">
							<div class="row quantity-part">
								<div class="col-auto">
									<div style="font-size: larger; text-align: left" class="m-2">
										{{ amount }} {{ amountType }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 middle-part"></div>
		<div class="col-12 align-items-center">
			<div class="row button-row justify-content-center align-items-center text-center">
				<div class="col-6">
				</div>
				<div class="col-6">
					<button class="btn rounded bg-white buy-button " type="button" @click="sendAddRequest">
						<OhVueIcon v-if="!store.state.isRecipeItemSelectModeActive" name="bi-basket-fill" scale="2" class="product-buy-icon" />
						<OhVueIcon v-if="store.state.isRecipeItemSelectModeActive" class="sparkle-icon" name="io-sparkles" scale="1"/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

.sparkle-icon {
	position: relative;
}

.product-buy-icon {
	width: 100%;
	height: 100%;
}

.already-planned-amount {
	text-align: start;
	font-size: x-large;
}

.current-cycle-planned {
	width: 100%;
	height: 100%;
}

.bookmark-no:hover {
	overflow: visible;
	transform: matrix(1.2, 0, 0, 1.2, 15, 5);
}

.bookmark-no {
	transition: 0.2s;
	overflow: visible;
	transform: matrix(1, 0, 0, 1, 15, 5);
	text-shadow: black;
}

.planned-this-cycle {
	background-color: whitesmoke;
	height: 100%;
	border-radius: 7px;
	box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.4);
}

.button-row {
	margin-left: 0%;
	margin-right: 0%;
	margin-bottom: 6%;
}

.middle-part {
	min-height: 25em;
}

.bottom-part {
	margin-top: 150%;
	background-color: rgb(255, 255, 255, 0);
	border-radius: 15px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}

.quantity-part {
	padding-bottom: 0px;
	transform: translate(0, -20px);
	margin-bottom: -20px;
}

.top-part:hover {
	background-color: rgb(255, 255, 255, 0.5);
	border-radius: 15px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
}

.top-part {
	transition: 0.5s;
	background-color: rgb(255, 255, 255, 0.98);
	border-radius: 10px;
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	box-shadow: 0px 0px -1px rgb(5, 5, 5, 0.1);
}

.product-view-full {
	background-size: contain;
}

.product-card:hover {
	transform: scale(1.01, 1.01);
	box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.1);
}

.product-card {
	transition: 0.2s;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	box-shadow: 0px 0px 5px 2px rgb(0, 0, 0, 0.1);
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	background-color: white;
}

.buy-button:hover {
	box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.1);
	color: rgb(73, 65, 109);
	transform: scale(1.1);
}

.buy-button {
	width: 50%;
	height: 100%;
	margin-left: 50%;
	transition: 0.1s;
	box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.1);
}

.product-name {
	overflow: hidden;
}
</style>
