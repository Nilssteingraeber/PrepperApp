<script setup lang="ts">
import Header from '@/views/header/HeaderProfile.vue'
import $ from 'jquery'
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import '../../code/items/AmountType'
import ItemAmountType, { getStringItemType } from '../../code/items/AmountType'
import { OhVueIcon } from 'oh-vue-icons'
import store from '@/store'
const props = defineProps(['item'])

const productName = String(props.item['product_name']).split("&quot;").join('""')
const productAmount = props.item['amount']
let productImageUrlWeb = props.item['code']

//401/235/911/4303/1.jpg
let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
pPath += String(productImageUrlWeb).substring(0, 3) + '/'
pPath += String(productImageUrlWeb).substring(3, 6) + '/'
pPath += String(productImageUrlWeb).substring(6, 9) + '/'
pPath += String(productImageUrlWeb).substring(9) + '/1.jpg'

let style = 'background-image: url(' + pPath + ');'

const productAmountText = getStringItemType(props.item['amountType'], productAmount).substring(0, 9)
const productImageUrl = __STATIC_DATA_PATH__ + props.item['pictureUrl']
const amount = '500'
const amountType = 'Grams'

const sendAddRequest = () => {
	const url = 'http://localhost:5173/api'

	fetch("http://localhost:5173/api/entries/", {
		method: "POST",
		body: JSON.stringify({
			item: props.item._id,
			dates: [{startDate: store.state.cycleObject.getSelectedDateStarting(), endDate: store.state.cycleObject.getSelectedDateEnding()}]
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		});
}

</script>
<!-- <div class="col-1 product-name">
	<OhVueIcon name="bi-bookmark-plus" scale="2" class="bookmark-no" />
</div> -->
<template>
	<div class="product-card row" :style="style">
		<div class="col-12 top-part">
			<div class="row">
				<div class="col-9">
					<div class="row">
						<div class="col-12 product-name">
							<label style="font-size: x-large" class="m-2">{{ productName }}</label>
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
				<div class="col-3 text-center">
					<OhVueIcon name="bi-bookmark-plus" scale="2" class="bookmark-no" />
				</div>
			</div>
		</div>
		<div class="col-12 middle-part"></div>
		<div class="col-12 align-items-center">
			<div class="row button-row">
				<div class="col-6">
					<div class="row planned-this-cycle m-0">
						<div class="col-6" style="text-align: start;">
							<div class="d-flex flex-row text-center">
								<!-- <div class="col-6" style="width: 100%; height: 100%; margin: 2%; margin-top: 15%;">
									<OhVueIcon name="bi-calendar3-week" scale="1" class="current-cycle-planned" />
								</div> -->
								<div class="col-12">
									<div class="already-planned-amount">10</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-6">
					<button class="btn rounded bg-white buy-button " type="button" @click="sendAddRequest">
						<OhVueIcon name="bi-basket-fill" scale="2" class="product-buy-icon" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

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
	box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.5);
}

.product-card {
	transition: 0.2s;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	box-shadow: 0px 0px 5px rgb(5, 5, 5, 0.1);
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}

.buy-button:hover {
	box-shadow: 3px 3px 10px rgb(0, 0, 0, 1);
	color: rgb(73, 65, 109);
	transform: scale(1.1);
}

.buy-button {
	width: 50%;
	height: 100%;
	margin-left: 50%;
	transition: 0.1s;
	box-shadow: 1px 1px 10px rgb(0, 0, 0, 1);
}

.product-name {
	overflow: hidden;
}
</style>
