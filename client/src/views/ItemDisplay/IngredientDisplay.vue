<script setup lang="ts">
import { computed, reactive, ref, watch, defineEmits } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item } from '@/code/item/Item';

import ItemImage from './ItemImage.vue'

const props = defineProps(["ingredient"])


const code = props.ingredient.item.code;

//401/235/911/4303/1.jpg
let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
if(String(code).length <= 8) {
	pPath += String(code) + "/1.jpg"
} else {
	pPath += String(code).substring(0, 3) + '/'
	pPath += String(code).substring(3, 6) + '/'
	pPath += String(code).substring(6, 9) + '/'
	pPath += String(code).substring(9) + '/1.jpg'
}

</script>

<template>
    <div class="row">
        <div class="col-7">
            <div class="row">
                <div class="col-6" style="font-size: larger;">
                    {{ props.ingredient.item.product_name }}
                </div>
                <div class="col-6">
                    {{ props.ingredient.amountItem }}
                </div>
            </div>
        </div>
        <div class="col-5">
            <ItemImage :item="props.ingredient.item"></ItemImage>
        </div>
    </div>
</template>

<style>
.step-card {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    transition: 1s;
}
</style>