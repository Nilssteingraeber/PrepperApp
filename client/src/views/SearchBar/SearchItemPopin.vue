<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { useRoute, useRouter } from 'vue-router';
import type { Item } from '@/code/item/Item';

const props = defineProps(["searchedItem", "searchIndex", "showAddBtn"])

const router = useRouter()
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


const imageData = computed(() => {
    //401/235/911/4303/1.jpg
    const preffered_image = (props.searchedItem as Item).preffered_image ?? 1
    let productImageUrlWeb = props.searchedItem.code
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

    return 'background-image: url(' + pPath + ');';
})


const addItemToRecipe = () => {
    store.commit("setSearchResultAddToRecipe", props.searchedItem)
}

const openItem = () => {
    store.commit("setCurrentlyViewingItemCode", (props.searchedItem as Item).code)
    router.push("/itemreview")
}

</script>

<template>
    <div :class="classText" v-on:click="">
        <div class="row">
            <div class="col-6 p-2">
                <div class="row">
                    <div class="col-12">
                        {{ props.searchedItem.product_name }}
                    </div>
                    <div class="col-12">
                        <div class="row justify-content-center">
                            <div class="col-6 mt-3">
                                <button @click="addItemToRecipe" class="addToRecipeBtn btn btn-outline-secondary"
                                    type="button">
                                    <OhVueIcon name="md-addcircle-round" scale="1.3"></OhVueIcon>
                                </button>
                            </div>
                            <div class="col-6 mt-3">
                                <button @click="openItem" class="addToRecipeBtn btn btn-outline-secondary"
                                    type="button">
                                    <OhVueIcon name="io-search-sharp" scale="1.3"></OhVueIcon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 popin-image search-item-image" :style="imageData">
            </div>
        </div>
    </div>
</template>

<style>
.addToRecipeBtn {
    width: 100%;
}

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
}

.search-item:hover {
    margin-left: 5px;
}

.search-item {
    padding: 0px;

}

.search-item-1 {
    top: 80%;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    transition: opacity .1s, padding .1s;
    width: 31.5%;
    padding-left: 20px
}

.search-item-2 {
    top: 145%;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    transition: opacity .25s, padding .1s;
    width: 31.5%;
    padding-left: 20px
}

.search-item-3 {
    top: 210%;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    transition: opacity .5s, padding .1s;
    width: 31.5%;
    padding-left: 20px
}

.popin-image {
    transition: 0.2s;
    border-radius: 5px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>import type { Item } from '@/code/item/Item';
