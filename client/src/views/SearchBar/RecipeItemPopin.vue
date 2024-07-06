<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item } from '@/code/item/Item';
import { useRoute } from 'vue-router';

const props = defineProps(["searchedItem", "searchIndex"])

const router = useRoute()
const classText = computed(() => {

    let text = "col-12 mouse-clickable search-item "
    if (!store.state.searchbarFocused) {
        text = "hide-search "
    }

    switch (props.searchIndex) {

        case 0: {
            text += "search-item-1"
            break;
        }
        case 1: {
            text += "search-item-2"
            break;
        }
        case 2: {
            text += "search-item-3"
            break;
        }
    }

    return text;
})

//401/235/911/4303/1.jpg
let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
if (String(props.searchedItem.code).length <= 8) {
    pPath += String(props.searchedItem.code) + "/1.jpg"
} else {
    pPath += String(props.searchedItem.code).substring(0, 3) + '/'
    pPath += String(props.searchedItem.code).substring(3, 6) + '/'
    pPath += String(props.searchedItem.code).substring(6, 9) + '/'
    pPath += String(props.searchedItem.code).substring(9) + '/1.jpg'
}

const style = 'background-image: url(' + pPath + ');'

const doWork = () => {
    
}
</script>

<template>
    <div :class="classText" v-on:click="doWork">
        <div class="row">
            <div class="col-6 p-2">
                {{ props.searchedItem.product_name }}
            </div>
            <div class="col-6 popin-image search-item-image" :style="style">

            </div>
        </div>
    </div>
</template>

<style>

.mouse-clickable {
    cursor: pointer;
}

.hide-search {
    opacity: 0%;
}

.search-item-image:hover {
    padding: 100px;
    z-index: 5000;
}

.search-item-image {
    padding: 0px;
    transition: 3s;
}

.search-item:hover {
    margin-left: 3px;
}

.search-item {
    padding: 0px;

}

.search-item-1 {
    top: 80%;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    transition: .1s;
    width: 31.5%;
    padding-left: 20px
}

.search-item-2 {
    top: 145%;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    transition: .25s;
    width: 31.5%;
    padding-left: 20px
}

.search-item-3 {
    top: 210%;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    transition: .5s;
    width: 31.5%;
    padding-left: 20px
}

.popin-image {
    transition: 0.2s;
    border-radius: 5px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>