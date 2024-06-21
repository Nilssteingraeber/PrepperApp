<script setup lang="ts">
import Header from '@/views/header/HeaderProfile.vue';
import $ from 'jquery';
import { Cycle, CycleType } from '@/code/cycle/Cycle';
import NutritionBars from "@/views/NutritionDisplay/NutritionBars.vue"
import { OhVueIcon } from 'oh-vue-icons';
import { BiNutFill } from "oh-vue-icons/icons";
import RecipeAmountSelector from './RecipeAmountSelector.vue';

const props = defineProps(['item', "addHandle"])


const productName = props.item["name"]
const subText = props.item["subtext"]
const isVegan = props.item["isVegan"]
const productImageUrl = __STATIC_DATA_PATH__ + props.item["url"]



</script>

<template>
	<div class="d-flex flex-row">
		<div class="col-7 shadow recipe-left bg-white rounded" id="calender-calories">
			<div class="flex-row">
				<div class="col-12">
					<img class="recipe-image rounded " :src="productImageUrl"></img>
				</div>
			</div>
		</div>
		<div class="col-5 recipe-right">
			<div class="d-flex flex-row">
				<div class="col-12 shadow recipe-right bg-white rounded recipe-name-container" id="calender-calories">
					<div class="d-flex flex-row">
						<div class="col-10">
							<label style="font-size: xx-large;" class="m-2">{{ productName }} </label>
						</div>
						<div v-if="isVegan" class="col-2 m-2">
							<OhVueIcon name="ri-plant-fill" scale="2" color="darkgreen" class="m-2" />
						</div>
					</div>
					<div class="d-flex flex-row">
						<label style="font-size: large;" class="m-2">{{ subText }} </label>
					</div>
				</div>
			</div>
			<div class="d-flex flex-row">
				<div class="col-12 shadow recipe-right bg-white rounded recipe-name-container" id="calender-calories">
					<div class="row">
						<div class="col-12">
							<NutritionBars></NutritionBars>
						</div>
						<div class="col-12">
							<hr>
						</div>
						<div class="col-12">
							<div class="row">
								<p class="m-1" style="font-size: small; text-align: center;">May contain:</p>
							</div>
							<div class="row">
								<div class="col">
									<OhVueIcon name="fa-cheese" scale="2" class="m-2" />
									<OhVueIcon name="fa-bread-slice" scale="2" class="m-2" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex flex-row">
				<div class="col-12 shadow recipe-right bg-white rounded" id="calender-calories">
					<div class="d-flex flex-row">
						<div class="col-12">
							<RecipeAmountSelector />
						</div>
					</div>
					<hr>
					<div class="d-flex flex-row">
						<div class="col-10"></div>
						<div class="col-2">
							<button class="btn btn-outline-secondary m-2 p-2" @click="props.addHandle()" type="button">
								<OhVueIcon name="bi-basket-fill" scale="2" />
								<OhVueIcon class="ghost" name="bi-basket-fill" scale="2" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
@keyframes basket-move-ani {
	0% {
		transform: matrix(1, 0, 0, 1, -100%, 0);
		opacity: 1.0;
	}

	100% {
		transform: matrix(.1, 0, 0, .1, -100%, -500);
		opacity: 0.0;
	}
}


.ghost {

	position: absolute;
	transform: translate(-100%, 0px);

	animation-name: basket-move-ani;
	animation-duration: 1.0s;
	animation-iteration-count: infinite;
	animation-delay: 2s;
}

.recipe-left {
	margin: 2%;
	padding: 2%;
	margin-right: 0%;
}

.allergies-container {
	margin-bottom: 2.5%;
}

.recipe-name-container {
	margin-bottom: 2.5%;
}

.recipe-right {
	padding: 2%;
	padding-right: 3%;
}

.vertical-divider {
	min-height: 90%;
	border-left: 3px solid rgb(148, 200, 166);
	border-radius: 10px;
	width: 2px;
}

.recipe-image {
	max-width: 100%;
	--image-height: attr(height px);
}

.recipe-image-ghost {
	max-width: 100%;
	top: calc(-1 * var(--image-height) * 0.5);
}


@keyframes img-put-in-ani {
	0% {
		transform: matrix(1, 0, 0, 1, 0, 0);
		opacity: 1.0;
	}

	100% {
		transform: matrix(.1, 0, 0, .1, 100, -500);
		opacity: 0.0;
	}
}

.img-put-in-animation {
	animation-name: img-put-in-ani;
	animation-duration: 1.0s;
	animation-iteration-count: infinite;
	animation-delay: 2s;
}
</style>