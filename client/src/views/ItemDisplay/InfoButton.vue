<script setup lang="ts">
import { computed, reactive, ref, watch, defineEmits } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item } from '@/code/item/Item';

import ItemImage from './ItemImage.vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps(["item"])

const openItem = () => {
    store.commit("setCurrentlyViewingItemCode", (props.item as Item).code)
    router.push("/itemreview")
}

</script>

<template>
    <div class="row relative">
        <div class="col">
            <button @click="openItem" class="info-btn" type="button">
                <OhVueIcon class="info-icon">
                    <OhVueIcon name="fa-square" scale="2.5" />
                    <OhVueIcon name="bi-info-square-fill" scale="1.7" fill="#462255" class="info-icon" />
                </OhVueIcon>
            </button>
        </div>
    </div>
</template>

<style>
.relative {
    position: relative;
    height: 100%;
}

.info-icon:hover {
    transform: scale(1.2);
}

.info-icon {
    transform: scale(1);
    transition: 0.15s;
}

.info-btn:hover {
    border: none;
    background-color: rgb(255, 255, 255, 0);
    color: rgb(255, 255, 255);
    position: absolute;
}

.info-btn {
    border: none;
    background-color: rgb(255, 255, 255, 0);
    color: rgb(255, 255, 255);
    position: absolute;
    transition: 0.2s;
    right: 5px;
    top: -100%;
}
</style>