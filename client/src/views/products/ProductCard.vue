<script setup lang="ts">
import Header from '@/views/header/HeaderProfile.vue';
import $ from 'jquery';
import { Cycle, CycleType } from '@/code/cycle/Cycle';
import "../../code/items/AmountType"
import ItemAmountType, { getStringItemType } from '../../code/items/AmountType';
const props = defineProps(['item'])


const productName = props.item["name"]
const productAmount = props.item["amount"]

const productAmountText = getStringItemType(props.item["amountType"], productAmount)
const productImageUrl = __STATIC_DATA_PATH__ + props.item["pictureUrl"]

</script>

<template>
	<div class="d-flex flex-row">
		<div class="col-4" style="padding-right: 20%;">
			<img class="product-image rounded" :src="productImageUrl" />
		</div>
		<div class="col-8" style="text-align:left; padding-right: 10%;">
			<div class="row">
				<div class="col-12" style="margin-bottom: 0; padding-bottom: 0;">
					<label style="font-size: x-large;" class="m-2">{{ productName }}</label>
				</div>
				<div class="col-3">
					<label style="font-size: larger; text-align: left" class="m-2">{{ productAmount }}</label>
				</div>
				<div class="col-4" style="text-align: left;">
					<label style="font-size: large; text-align: left;" class="m-2">{{ productAmountText }}</label>
				</div>
			</div>
		</div>
	</div>

</template>

<style>
#calender-page {
	background-color: #36a5913b;
	width: 100vw;
	height: 100vh;
}

#calender-bot {
	height: calc(100vh - 300px);
}

.amount-small {

}

.product-image {
	width: 75px;
	height: 75px;
}

/*_______Progressbar______*/
.progress {
	width: 100px;
	height: 100px;
	background: none;
	position: relative;
}

.progress::after {
	content: "";
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 6px solid #eee;
	position: absolute;
	top: 0;
	left: 0;
}

.progress>span {
	width: 50%;
	height: 100%;
	overflow: hidden;
	position: absolute;
	top: 0;
	z-index: 1;
}

.progress .progress-left {
	left: 0;
}

.progress .progress-bar {
	width: 100%;
	height: 100%;
	background: none;
	border-width: 6px;
	border-style: solid;
	position: absolute;
	top: 0;
}

.progress .progress-left .progress-bar {
	left: 100%;
	border-top-right-radius: 80px;
	border-bottom-right-radius: 80px;
	border-left: 0;
	-webkit-transform-origin: center left;
	transform-origin: center left;
}

.progress .progress-right {
	right: 0;
}

.progress .progress-right .progress-bar {
	left: -100%;
	border-top-left-radius: 80px;
	border-bottom-left-radius: 80px;
	border-right: 0;
	-webkit-transform-origin: center right;
	transform-origin: center right;
}

.progress .progress-value {
	position: absolute;
	top: 0;
	left: 0;
}
</style>