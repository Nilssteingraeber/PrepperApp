<script setup lang="ts">
import Header from '@/views/header/HeaderProfile.vue';
import $ from 'jquery';
import {Cycle, CycleType} from '@/code/cycle/Cycle';

const props = defineProps(['item'])


const productName = props.item["name"] 

const productImageUrl = __STATIC_DATA_PATH__ + props.item["pictureUrl"]

</script>

<template>
    <div class="col-11 shadow p-3 m-3 bg-white rounded" style="text-align: center" id="calender-calories">
      <div class="d-flex flex-row">
        <img class="product-image" :src="productImageUrl"></img>
		<label style="font-size: x-large;" class="m-2">{{ productName }}</label>
      </div>
    </div>
    
</template>

<style>
#calender-page{
	background-color: #36a5913b;
	width: 100vw;
	height: 100vh;
}

#calender-bot{
	height: calc(100vh - 300px);
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